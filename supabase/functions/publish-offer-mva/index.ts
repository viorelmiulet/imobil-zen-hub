import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BASE_URL = "https://gfobqeycviqckzjyokxf.supabase.co/functions/v1/public-api/offers";

type Action = "create" | "update" | "delete";

interface OfferPayload {
  title: string;
  description: string;
  location: string;
  price_min: number;
  rooms: number;
  // Accept extra fields but only the above are required
  [key: string]: unknown;
}

function validateOffer(offer: any): { valid: boolean; msg?: string } {
  if (!offer || typeof offer !== "object") return { valid: false, msg: "Payload invalid" };
  const required = ["title", "description", "location", "price_min", "rooms"] as const;
  for (const key of required) {
    if (offer[key] === undefined || offer[key] === null || (typeof offer[key] === "string" && offer[key].trim() === "")) {
      return { valid: false, msg: `Câmp lipsă sau invalid: ${key}` };
    }
  }
  if (typeof offer.price_min !== "number") return { valid: false, msg: "price_min trebuie să fie number" };
  if (typeof offer.rooms !== "number") return { valid: false, msg: "rooms trebuie să fie number" };
  return { valid: true };
}

serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("MVA_IMOBILIARE_API_KEY");
    if (!apiKey) {
      console.error("Missing MVA_IMOBILIARE_API_KEY secret");
      return new Response(JSON.stringify({ error: "Server config missing API key" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const action: Action = (body?.action as Action) || "create";
    const id: string | undefined = body?.id ? String(body.id) : undefined;
    const offer: OfferPayload | undefined = body?.offer;

    let target = BASE_URL;
    let method: "POST" | "PUT" | "DELETE" = "POST";

    switch (action) {
      case "create":
        method = "POST";
        if (!offer) {
          return new Response(JSON.stringify({ error: "Lipsește offer pentru create" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        {
          const v = validateOffer(offer);
          if (!v.valid) {
            return new Response(JSON.stringify({ error: v.msg }), {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
        }
        break;
      case "update":
        method = "PUT";
        if (!id) {
          return new Response(JSON.stringify({ error: "Lipsește id pentru update" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        target = `${BASE_URL}/${encodeURIComponent(id)}`;
        if (!offer) {
          return new Response(JSON.stringify({ error: "Lipsește offer pentru update" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        {
          const v = validateOffer(offer);
          if (!v.valid) {
            return new Response(JSON.stringify({ error: v.msg }), {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
        }
        break;
      case "delete":
        method = "DELETE";
        if (!id) {
          return new Response(JSON.stringify({ error: "Lipsește id pentru delete" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        target = `${BASE_URL}/${encodeURIComponent(id)}`;
        break;
      default:
        return new Response(JSON.stringify({ error: "Acțiune necunoscută" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    const forwardInit: RequestInit = {
      method,
      headers: {
        "x-api-key": apiKey,
        ...(method !== "DELETE" ? { "Content-Type": "application/json" } : {}),
      },
      ...(method !== "DELETE" ? { body: JSON.stringify(offer) } : {}),
    };

    const forwardResp = await fetch(target, forwardInit);

    const data = await forwardResp.json().catch(() => ({ ok: forwardResp.ok }));

    const response = {
      ok: forwardResp.ok,
      status: forwardResp.status,
      data,
    };

    return new Response(JSON.stringify(response), {
      status: forwardResp.ok ? 200 : forwardResp.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("publish-offer-mva error:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
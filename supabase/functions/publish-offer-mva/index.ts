import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TARGET_URL = "https://gfobqeycviqckzjyokxf.supabase.co/functions/v1/public-api/offers";

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

    // Forward payload as-is, but prefer { offer } if provided
    const payload = body?.offer ? { offer: body.offer } : body;

    const forwardResp = await fetch(TARGET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });

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
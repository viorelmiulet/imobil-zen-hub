import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const EXTERNAL_API_BASE = "https://gfobqeycviqckzjyokxf.supabase.co/functions/v1/public-api";

interface PropertyData {
  title: string;
  description: string;
  location: string;
  price_min: number;
  rooms: number;
  source: string;
  price_max?: number;
  surface_min?: number;
  surface_max?: number;
  project_name?: string;
  images?: string[];
  features?: string[];
  amenities?: string[];
  availability_status?: string;
  currency?: string;
  is_featured?: boolean;
}

serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("EXTERNAL_CRM_API_KEY");
    if (!apiKey) {
      console.error("Missing EXTERNAL_CRM_API_KEY secret");
      return new Response(JSON.stringify({ error: "Server config missing API key" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json().catch(() => ({}));
    const action = body?.action || "fetch";

    if (action === "test") {
      // Test connection to external API
      const testResponse = await fetch(`${EXTERNAL_API_BASE}/offers`, {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      });

      return new Response(JSON.stringify({
        ok: true,
        status: 200,
        forward_status: testResponse.status,
        forward_ok: testResponse.ok,
        message: testResponse.ok ? "Conexiune reușită" : "Eroare de conexiune",
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "import") {
      // Fetch properties from external API
      const fetchResponse = await fetch(`${EXTERNAL_API_BASE}/offers`, {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      });

      if (!fetchResponse.ok) {
        throw new Error(`API request failed: ${fetchResponse.status}`);
      }

      const externalData = await fetchResponse.json();
      console.log("Fetched external data:", externalData);

      // Transform external data to match our property structure
      const properties = Array.isArray(externalData) ? externalData : [externalData];
      const importedProperties = [];

      for (const item of properties) {
        try {
          // Map external data to our property format
          const propertyData = {
            title: item.title || 'Proprietate importată',
            price: item.price_min || 0,
            location: item.location || 'Necunoscut',
            type: item.project_name || 'Apartament',
            status: item.availability_status || 'Disponibil',
            area: item.surface_min || 0,
            bedrooms: item.rooms || 1,
            bathrooms: 1, // Default since not provided
            description: item.description || '',
            images: item.images || [],
            source: 'import_external',
            external_id: item.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };

          // Insert into our database
          const { data: inserted, error } = await supabase
            .from('properties')
            .insert([propertyData])
            .select()
            .single();

          if (error) {
            console.error("Error inserting property:", error);
            continue;
          }

          importedProperties.push(inserted);
        } catch (itemError) {
          console.error("Error processing property item:", itemError);
          continue;
        }
      }

      return new Response(JSON.stringify({
        ok: true,
        imported_count: importedProperties.length,
        total_fetched: properties.length,
        properties: importedProperties,
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("import-properties error:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
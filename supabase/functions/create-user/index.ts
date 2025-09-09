// supabase/functions/create-user/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type AppRole = "admin" | "manager" | "agent" | "user";

type CreateUserBody = {
  email: string;
  password: string;
  full_name?: string;
  role?: AppRole;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_ANON = Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
      global: { headers: { Authorization: req.headers.get("Authorization")! } },
    });
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Authenticate caller
    const { data: userData, error: getUserError } = await supabase.auth.getUser();
    if (getUserError || !userData.user) {
      return new Response(JSON.stringify({ error: "not_authenticated" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const callerId = userData.user.id;

    const body = (await req.json()) as CreateUserBody;
    const email = body.email?.trim();
    const password = body.password;
    const full_name = body.full_name?.trim() || null;
    const role: AppRole = (body.role || "user") as AppRole;

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "missing_fields" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Check permissions: admin can assign any role; manager can only assign agent/user
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: callerId, _role: "admin" });
    const { data: isManager } = await supabase.rpc("has_role", { _user_id: callerId, _role: "manager" });

    if (!isAdmin && !isManager) {
      return new Response(JSON.stringify({ error: "forbidden" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (isManager && !isAdmin && !(role === "agent" || role === "user")) {
      return new Response(JSON.stringify({ error: "invalid_role", message: "Managers pot atribui doar rolurile agent sau user" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Create user via admin API
    const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name },
    });

    if (createErr || !created.user) {
      return new Response(JSON.stringify({ error: createErr?.message || "cannot_create_user" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const newUserId = created.user.id;

    // Assign requested role if different than default
    if (role && role !== "user") {
      const { error: insertRoleErr } = await supabaseAdmin.from("user_roles").insert({ user_id: newUserId, role, assigned_by: callerId });
      if (insertRoleErr) {
        // Not fatal: user was created; return warning
        return new Response(JSON.stringify({ user: { id: newUserId, email }, warning: "role_not_assigned", message: insertRoleErr.message }), { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    return new Response(JSON.stringify({ user: { id: newUserId, email } }), { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e: any) {
    console.error(e);
    return new Response(JSON.stringify({ error: "internal_error", message: e?.message || String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

const ROLES = ["admin", "manager", "agent", "user"] as const;

type AppRole = typeof ROLES[number];

type UserRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  roles: AppRole[];
};

export function UserManagement() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [roleToAdd, setRoleToAdd] = useState<Record<string, AppRole>>({});

  // Create user form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [initialRole, setInitialRole] = useState<AppRole>("agent");

  const canSubmit = useMemo(() => email && password && fullName && initialRole, [email, password, fullName, initialRole]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, email, full_name")
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;

      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id, role");

      if (rolesError) throw rolesError;

      const rolesMap = new Map<string, AppRole[]>();
      roles?.forEach((r: any) => {
        const list = rolesMap.get(r.user_id) || [];
        if (!list.includes(r.role)) list.push(r.role);
        rolesMap.set(r.user_id, list);
      });

      const rows: UserRow[] = (profiles || []).map((p: any) => ({
        id: p.id,
        email: p.email,
        full_name: p.full_name,
        roles: (rolesMap.get(p.id) || []) as AppRole[],
      }));

      setUsers(rows);
    } catch (error: any) {
      console.error(error);
      toast({ title: "Eroare", description: error.message || "Nu s-au putut încărca utilizatorii.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-user", {
        body: { email, password, full_name: fullName, role: initialRole },
      });
      if (error) throw error;

      toast({ title: "Utilizator creat", description: `Cont creat pentru ${email}` });
      setEmail("");
      setPassword("");
      setFullName("");
      setInitialRole("agent");
      await loadUsers();
    } catch (error: any) {
      console.error(error);
      toast({ title: "Eroare crearea contului", description: error.message || "Nu s-a putut crea utilizatorul.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleAddRole = async (userId: string) => {
    const role = roleToAdd[userId];
    if (!role) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("user_roles").insert({ user_id: userId, role });
      if (error) throw error;
      toast({ title: "Rol adăugat", description: `Rolul ${role} a fost atribuit.` });
      await loadUsers();
    } catch (error: any) {
      console.error(error);
      toast({ title: "Eroare la atribuirea rolului", description: error.message || "Nu s-a putut atribui rolul.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveRole = async (userId: string, role: AppRole) => {
    setLoading(true);
    try {
      const { error } = await supabase.from("user_roles").delete().match({ user_id: userId, role });
      if (error) throw error;
      toast({ title: "Rol eliminat", description: `Rolul ${role} a fost eliminat.` });
      await loadUsers();
    } catch (error: any) {
      console.error(error);
      toast({ title: "Eroare la eliminare", description: error.message || "Nu s-a putut elimina rolul.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-card animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center">Administrare Utilizatori</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Create user form */}
        <form onSubmit={handleCreateUser} className="grid gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="email@exemplu.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Parolă</Label>
            <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Nume complet</Label>
            <Input placeholder="Nume Prenume" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Rol inițial</Label>
            <Select value={initialRole} onValueChange={(v) => setInitialRole(v as AppRole)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <Button type="submit" disabled={loading || !canSubmit} className="bg-gradient-primary hover:opacity-90">
              Creează cont
            </Button>
          </div>
        </form>

        {/* Users table */}
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilizator</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Roluri</TableHead>
                <TableHead className="w-[280px]">Atribuie rol</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.full_name || "-"}</TableCell>
                  <TableCell>{u.email || "-"}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {u.roles.length === 0 && <span className="text-muted-foreground text-sm">fără rol</span>}
                      {u.roles.map((r) => (
                        <Badge key={r} variant="secondary" className="inline-flex items-center gap-1">
                          {r}
                          <button type="button" aria-label={`Elimină rol ${r}`} onClick={() => handleRemoveRole(u.id, r)} className="ml-1 opacity-70 hover:opacity-100">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Select value={roleToAdd[u.id]} onValueChange={(v) => setRoleToAdd((prev) => ({ ...prev, [u.id]: v as AppRole }))}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Selectează rol" />
                        </SelectTrigger>
                        <SelectContent>
                          {ROLES.filter((r) => !u.roles.includes(r)).map((r) => (
                            <SelectItem key={r} value={r}>{r}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button variant="outline" disabled={loading || !roleToAdd[u.id]} onClick={() => handleAddRole(u.id)}>
                        Adaugă
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

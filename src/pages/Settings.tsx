import { 
  Settings as SettingsIcon, 
  User, 
  Building, 
  Palette, 
  Bell, 
  Shield, 
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Save,
  Monitor,
  Sun,
  Moon,
  Megaphone,
  Key,
  Globe
} from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagement } from "@/components/settings/UserManagement";
import ApiKeySetting from "@/components/settings/ApiKeySetting";
import AddApiKeyDialog from "@/components/settings/AddApiKeyDialog";
import { useTheme } from "@/components/theme-provider";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  // API keys stocate local pentru prototip (localStorage)
  const getApiKey = (platformId: string) => localStorage.getItem(`api_key_${platformId}`) || "";

  const [apiKeyStatuses, setApiKeyStatuses] = useState({
    storia: false,
    imobiliare: false,
    'mva-imobiliare': false,
    publi24: false,
    homezz: false,
  });

  const refreshApiKeyStatuses = () =>
    setApiKeyStatuses({
      storia: !!getApiKey("storia"),
      imobiliare: !!getApiKey("imobiliare"),
      'mva-imobiliare': true, // Always configured since we have the secret
      publi24: !!getApiKey("publi24"),
      homezz: !!getApiKey("homezz"),
    });

  useEffect(() => {
    refreshApiKeyStatuses();
  }, []);

  const saveApiKey = (id: string, value: string) => {
    if (!id) return;
    if (value) {
      localStorage.setItem(`api_key_${id}`, value);
      toast({ title: "API key salvat", description: `Cheia pentru ${id} a fost salvată local.` });
    } else {
      localStorage.removeItem(`api_key_${id}`);
      toast({ title: "API key eliminat", description: `Cheia pentru ${id} a fost ștearsă.` });
    }
    refreshApiKeyStatuses();
  };

  const [keyDialogOpen, setKeyDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<{ id: string; name: string }>({ id: "", name: "" });

  const handleAddApiKey = (platform: { id: string; name: string }) => {
    setSelectedPlatform(platform);
    setKeyDialogOpen(true);
  };

  const handleTestConnection = async (platform: string) => {
    if (platform === 'mva-imobiliare') {
      const { data, error } = await supabase.functions.invoke('publish-offer-mva', {
        body: { action: 'test' }
      });
      if (error) throw new Error((error as any)?.message || 'Eroare funcție edge');
      // Considerăm conexiunea OK dacă ajungem la endpoint și cheia NU e respinsă
      if (data?.forward_status === 401 || data?.forward_status === 403) {
        throw new Error('Cheie API invalidă sau lipsă');
      }
      console.log('[MVA TEST]', data);
      return true;
    }
    const key = getApiKey(platform);
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (key) return true;
    throw new Error("No key");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Setări
        </h1>
        <p className="text-muted-foreground">
          Configurează preferințele și setările contului tău.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="promotion" className="flex items-center gap-2">
            <Megaphone className="h-4 w-4" />
            Promovare
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Aspect
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Securitate
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Settings */}
            <div className="lg:col-span-2 space-y-6">
              <UserManagement />
              
              {/* Profile Settings */}
              <Card className="shadow-card animate-slide-up">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-primary" />
                    Profil Personal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prenume</Label>
                      <Input id="firstName" placeholder="Prenumele tău" defaultValue="Ion" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nume</Label>
                      <Input id="lastName" placeholder="Numele tău" defaultValue="Popescu" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@exemplu.com" defaultValue="ion.popescu@realestate.ro" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" placeholder="+40 123 456 789" defaultValue="+40 722 123 456" />
                  </div>
                </CardContent>
              </Card>

              {/* Agency Settings */}
              <Card className="shadow-card animate-slide-up" style={{ animationDelay: "100ms" }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="h-5 w-5 mr-2 text-primary" />
                    Setări Agenție
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="agencyName">Numele Agenției</Label>
                    <Input id="agencyName" placeholder="Numele agenției" defaultValue="RealEstate Pro București" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agencyAddress">Adresa</Label>
                    <Input id="agencyAddress" placeholder="Adresa completă" defaultValue="Strada Victoriei Nr. 123, București" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="agencyPhone">Telefon Agenție</Label>
                      <Input id="agencyPhone" placeholder="+40 123 456 789" defaultValue="+40 21 123 4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="agencyEmail">Email Agenție</Label>
                      <Input id="agencyEmail" type="email" placeholder="contact@agenție.ro" defaultValue="contact@realestatepro.ro" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agencyWebsite">Website</Label>
                    <Input id="agencyWebsite" placeholder="https://website.ro" defaultValue="https://realestatepro.ro" />
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card className="shadow-card animate-slide-up" style={{ animationDelay: "200ms" }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-primary" />
                    Notificări
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificări Email</Label>
                      <p className="text-sm text-muted-foreground">Primește notificări pe email pentru lead-uri noi</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificări Push</Label>
                      <p className="text-sm text-muted-foreground">Notificări în browser pentru actualizări importante</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Rapoarte Săptămânale</Label>
                      <p className="text-sm text-muted-foreground">Primește un raport săptămânal cu activitatea</p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS pentru Lead-uri Urgente</Label>
                      <p className="text-sm text-muted-foreground">SMS pentru lead-uri cu prioritate înaltă</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Subscription */}
              <Card className="shadow-card animate-slide-up" style={{ animationDelay: "300ms" }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-primary" />
                    Abonament
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-primary text-white text-sm font-medium">
                      Plan Premium
                    </div>
                    <p className="text-2xl font-bold text-foreground">€29/lună</p>
                    <p className="text-sm text-muted-foreground">Se reînnoiește pe 15 decembrie</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Gestionează Abonamentul
                  </Button>
                  <Button variant="outline" className="w-full">
                    Vezi Facturi
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="promotion" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-primary" />
                Platforme de Promovare
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Configurează API keys pentru a publica automat proprietățile pe platformele imobiliare populare.
              </p>
            </CardHeader>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <ApiKeySetting
              platform="storia"
              name="Storia.ro"
              description="Cea mai mare platformă imobiliară din România"
              website="https://storia.ro"
              isConfigured={apiKeyStatuses.storia}
              onAddKey={() => handleAddApiKey({ id: "storia", name: "Storia.ro" })}
              onTestConnection={() => handleTestConnection("storia")}
            />

            <ApiKeySetting
              platform="imobiliare"
              name="Imobiliare.ro"
              description="Portal imobiliar cu tradiție în România"
              website="https://imobiliare.ro"
              isConfigured={apiKeyStatuses.imobiliare}
              onAddKey={() => handleAddApiKey({ id: "imobiliare", name: "Imobiliare.ro" })}
              onTestConnection={() => handleTestConnection("imobiliare")}
            />

            <ApiKeySetting
              platform="mva-imobiliare"
              name="MVA IMOBILIARE"
              description="Platforma MVA pentru publicarea automată a ofertelor"
              website="https://mvaimobiliare.ro"
              isConfigured={apiKeyStatuses['mva-imobiliare']}
              onAddKey={() => handleAddApiKey({ id: "mva-imobiliare", name: "MVA IMOBILIARE" })}
              onTestConnection={() => handleTestConnection("mva-imobiliare")}
            />

            <ApiKeySetting
              platform="publi24"
              name="Publi24"
              description="Platformă de anunturi cu secțiune imobiliară"
              website="https://publi24.ro"
              isConfigured={apiKeyStatuses.publi24}
              onAddKey={() => handleAddApiKey({ id: "publi24", name: "Publi24" })}
              onTestConnection={() => handleTestConnection("publi24")}
            />

            <ApiKeySetting
              platform="homezz"
              name="HomeZZ"
              description="Platformă modernă pentru proprietăți premium"
              website="https://homezz.ro"
              isConfigured={apiKeyStatuses.homezz}
              onAddKey={() => handleAddApiKey({ id: "homezz", name: "HomeZZ" })}
              onTestConnection={() => handleTestConnection("homezz")}
            />
          </div>

          <Card className="shadow-card border-info/20 bg-info/5">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-info mt-2"></div>
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Cum funcționează publicarea automată?</h4>
                  <p className="text-sm text-muted-foreground">
                    După configurarea API keys-urilor, proprietățile noi vor fi publicate automat pe platformele selectate. 
                    Poți gestiona setările de publicare pentru fiecare proprietate individual.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="shadow-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2 text-primary" />
                Aspect și Interfață
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-sm font-medium">Temă aplicație</Label>
                <div className="inline-flex items-center p-0.5 bg-muted rounded-lg border shadow-sm w-fit">
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 min-w-[70px] justify-center ${
                      theme === "light" 
                        ? "bg-background text-foreground shadow-sm border" 
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    }`}
                  >
                    <Sun className="h-3 w-3" />
                    <span>Luminos</span>
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 min-w-[70px] justify-center ${
                      theme === "dark" 
                        ? "bg-background text-foreground shadow-sm border" 
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    }`}
                  >
                    <Moon className="h-3 w-3" />
                    <span>Întunecat</span>
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Alege aspectul interfaței aplicației
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Limbă</Label>
                <Select defaultValue="ro">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ro">Română</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Monedă</Label>
                <Select defaultValue="eur">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="ron">RON (lei)</SelectItem>
                    <SelectItem value="usd">USD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="shadow-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Securitate și Confidențialitate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Schimbă Parola
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Activează Autentificarea în Doi Pași
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm">Conectări Automate</Label>
                  <p className="text-xs text-muted-foreground">Rămâi conectat pe dispozitiv</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Sesiuni Active</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Chrome pe Windows</p>
                      <p className="text-xs text-muted-foreground">Acum activ - București, România</p>
                    </div>
                    <Button variant="outline" size="sm">Deconectează</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddApiKeyDialog
        open={keyDialogOpen}
        onOpenChange={setKeyDialogOpen}
        platformName={selectedPlatform.name}
        platformId={selectedPlatform.id}
        initialValue={getApiKey(selectedPlatform.id)}
        onSave={(value) => {
          saveApiKey(selectedPlatform.id, value);
          setKeyDialogOpen(false);
        }}
      />

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-gradient-primary hover:opacity-90 shadow-elegant">
          <Save className="h-4 w-4 mr-2" />
          Salvează Modificările
        </Button>
      </div>
    </div>
  );
}
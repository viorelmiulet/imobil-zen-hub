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
  Save
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
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

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
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
              <div className="space-y-2">
                <Label htmlFor="bio">Biografie</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Descrie-te pe scurt..." 
                  defaultValue="Agent imobiliar cu peste 5 ani de experiență în București. Specializat în proprietăți rezidențiale și comerciale."
                />
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

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Theme Settings */}
          <Card className="shadow-card animate-slide-up" style={{ animationDelay: "300ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2 text-primary" />
                Aspect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Temă</Label>
                <Select defaultValue="system">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Luminos</SelectItem>
                    <SelectItem value="dark">Întunecat</SelectItem>
                    <SelectItem value="system">Sistem</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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

          {/* Security Settings */}
          <Card className="shadow-card animate-slide-up" style={{ animationDelay: "400ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Securitate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Schimbă Parola
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Activează 2FA
              </Button>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm">Conectări Automate</Label>
                  <p className="text-xs text-muted-foreground">Rămâi conectat pe dispozitiv</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Subscription */}
          <Card className="shadow-card animate-slide-up" style={{ animationDelay: "500ms" }}>
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
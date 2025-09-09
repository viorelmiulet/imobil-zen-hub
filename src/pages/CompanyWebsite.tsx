import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Building2, Users, TrendingUp, Star, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompanyWebsite = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/src/assets/mva-logo.png" alt="MVA IMOBILIARE" className="h-12 w-12" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">MVA</span>
                <span className="text-sm text-muted-foreground -mt-1">IMOBILIARE</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Servicii</a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">Despre noi</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
              <Link to="/crm">
                <Button variant="outline" className="ml-4">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Acces CRM
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            #1 Agenție Imobiliară de Încredere
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            MVA IMOBILIARE<br />
            <span className="text-3xl md:text-4xl">Partenerul tău de încredere</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Experință, profesionalism și dedicare în serviciile imobiliare. Vă ajutăm să găsiți casa perfectă sau să vânzați la prețul optim cu echipa noastră de specialiști.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8">
              Vezi Proprietăți
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              <Phone className="mr-2 h-5 w-5" />
              Sună Acum
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Proprietăți Vândute</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">Clienți Mulțumiți</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10+</div>
              <div className="text-muted-foreground">Ani Experiență</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.9</div>
              <div className="text-muted-foreground flex items-center justify-center">
                <Star className="h-4 w-4 fill-warning text-warning mr-1" />
                Rating Client
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Serviciile Noastre</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Oferim o gamă completă de servicii imobiliare pentru toate nevoile tale
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <Building2 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Vânzare Proprietăți</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Evaluare gratuită, marketing profesional și negociere optimă pentru vânzarea proprietății tale.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Cumpărare Proprietăți</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Te ajutăm să găsești proprietatea perfectă și să obții cele mai bune condiții de achiziție.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Consultanță Imobiliară</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Analiză de piață, evaluări profesionale și consiliere strategică pentru investiții imobiliare.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Despre MVA IMOBILIARE</h2>
              <p className="text-lg text-muted-foreground mb-6">
                MVA IMOBILIARE este o agenție imobiliară de top, specializată în tranzacții imobiliare de calitate superioară. Cu o echipă de consultanți experimentați, oferim servicii complete pentru proprietăți rezidențiale și comerciale.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span>Transparență totală în toate tranzacțiile</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span>Evaluări profesionale certificate</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span>Suport juridic complet</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span>Marketing inovator pentru proprietăți</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="shadow-hover">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">€2.5M+</div>
                    <div className="text-muted-foreground mb-4">Valoare tranzacții 2024</div>
                    <div className="text-2xl font-bold text-primary mb-2">95%</div>
                    <div className="text-muted-foreground">Rata de succes</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contactează-ne</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Suntem aici să te ajutăm. Contactează-ne pentru o consultație gratuită.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-card text-center">
              <CardContent className="p-8">
                <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Telefon</h3>
                <p className="text-muted-foreground mb-4">Sună-ne pentru informații rapide</p>
                <Button variant="outline" className="w-full">
                  +40 21 123 4567
                </Button>
              </CardContent>
            </Card>
            
            <Card className="shadow-card text-center">
              <CardContent className="p-8">
                <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground mb-4">Trimite-ne un mesaj detaliat</p>
                <Button variant="outline" className="w-full">
                  contact@mvaimobiliare.ro
                </Button>
              </CardContent>
            </Card>
            
            <Card className="shadow-card text-center">
              <CardContent className="p-8">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Biroul</h3>
                <p className="text-muted-foreground mb-4">Vizitează-ne pentru o întâlnire</p>
                <Button variant="outline" className="w-full">
                  Str. Victoriei Nr. 123
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/src/assets/mva-logo.png" alt="MVA IMOBILIARE" className="h-8 w-8" />
                <span className="text-lg font-bold">MVA IMOBILIARE</span>
              </div>
              <p className="text-muted-foreground">
                Partenerul tău de încredere în domeniul imobiliar.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Servicii</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Vânzare proprietăți</li>
                <li>Cumpărare proprietăți</li>
                <li>Consultanță imobiliară</li>
                <li>Evaluări profesionale</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Zonele noastre</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>București Centru</li>
                <li>Pipera</li>
                <li>Băneasa</li>
                <li>Herastrau</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>+40 21 123 4567</li>
                <li>contact@mvaimobiliare.ro</li>
                <li>Str. Victoriei Nr. 123</li>
                <li>București, România</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 MVA IMOBILIARE. Toate drepturile rezervate.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CompanyWebsite;
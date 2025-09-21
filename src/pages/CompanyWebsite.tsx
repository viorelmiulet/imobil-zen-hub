import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Building2, Users, TrendingUp, Star, Phone, Mail, MapPin, ExternalLink, Award, Shield, Clock, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from "@/assets/hero-image.jpg";
import mvaLogo from "@/assets/mva-logo-new.png";

const CompanyWebsite = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full glass-nav z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={mvaLogo} alt="MVA IMOBILIARE" className="h-6 w-6 sm:h-8 sm:w-8" />
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold neon-text">MVA</span>
                <span className="text-xs text-accent font-medium tracking-widest -mt-1">IMOBILIARE</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#servicii" className="text-foreground/80 hover:text-primary transition-colors font-medium">Servicii</a>
              <a href="#despre" className="text-foreground/80 hover:text-primary transition-colors font-medium">Despre noi</a>
              <a href="#contact" className="text-foreground/80 hover:text-primary transition-colors font-medium">Contact</a>
              <Link to="/crm">
                <Button className="bg-gradient-primary shadow-elegant hover:shadow-hover transition-all duration-300">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Acces Zen CRM
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </nav>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-primary/20">
              <div className="flex flex-col space-y-4 pt-4">
                <a 
                  href="#servicii" 
                  className="text-foreground/80 hover:text-primary transition-colors font-medium py-2 px-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Servicii
                </a>
                <a 
                  href="#despre" 
                  className="text-foreground/80 hover:text-primary transition-colors font-medium py-2 px-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Despre noi
                </a>
                <a 
                  href="#contact" 
                  className="text-foreground/80 hover:text-primary transition-colors font-medium py-2 px-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
                <Link to="/crm" className="py-2 px-2">
                  <Button className="w-full bg-gradient-primary shadow-elegant hover:shadow-hover transition-all duration-300">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Acces Zen CRM
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center text-white">
          <Badge className="mb-6 sm:mb-8 luxury-card text-primary border-primary/30 px-4 sm:px-6 py-2 text-sm sm:text-base">
            <span className="neon-text mr-2">◆</span>
            <span className="hidden sm:inline">Agenția #1 în Satisfacția Clienților</span>
            <span className="sm:hidden">Agenția #1</span>
          </Badge>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
            <span className="neon-text">MVA IMOBILIARE</span>
            <br />
            <span className="text-lg sm:text-2xl md:text-4xl font-light text-accent neon-accent">
              <span className="hidden sm:inline">Excelența în servicii imobiliare premium</span>
              <span className="sm:hidden">Servicii imobiliare premium</span>
            </span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl mb-8 sm:mb-12 max-w-4xl mx-auto text-white/90 leading-relaxed px-2">
            <span className="hidden sm:inline">
              Transformăm visurile în realitate prin servicii imobiliare premium. 
              Cu o echipă de experți și tehnologie de ultimă generație, vă oferim 
              cele mai bune soluții pentru investițiile dumneavoastră.
            </span>
            <span className="sm:hidden">
              Transformăm visurile în realitate prin servicii imobiliare premium. 
              Experți și tehnologie pentru investițiile dumneavoastră.
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button size="lg" className="bg-accent text-white hover:bg-accent/90 text-base sm:text-lg px-6 sm:px-8 py-3 shadow-luxury font-medium">
              <span className="hidden sm:inline">Descoperă Proprietăți</span>
              <span className="sm:hidden">Proprietăți</span>
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white/60 hover:bg-white/20 text-base sm:text-lg px-6 sm:px-8 py-3 backdrop-blur-sm font-medium">
              <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Consultație Gratuită</span>
              <span className="sm:hidden">Consultație</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold neon-text mb-2 sm:mb-3">750+</div>
              <div className="text-muted-foreground font-medium text-xs sm:text-sm md:text-base">
                <span className="hidden sm:inline">Proprietăți Vândute</span>
                <span className="sm:hidden">Proprietăți</span>
              </div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 sm:mb-3">1500+</div>
              <div className="text-muted-foreground font-medium text-xs sm:text-sm md:text-base">
                <span className="hidden sm:inline">Clienți Mulțumiți</span>
                <span className="sm:hidden">Clienți</span>
              </div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 sm:mb-3">15+</div>
              <div className="text-muted-foreground font-medium text-xs sm:text-sm md:text-base">
                <span className="hidden sm:inline">Ani Experiență</span>
                <span className="sm:hidden">Ani</span>
              </div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300 col-span-2 lg:col-span-1">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 sm:mb-3">4.9</div>
              <div className="text-muted-foreground font-medium flex items-center justify-center text-xs sm:text-sm md:text-base">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-accent text-accent mr-1" />
                <span className="hidden sm:inline">Rating Excelență</span>
                <span className="sm:hidden">Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicii" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <Badge className="mb-4 sm:mb-6 bg-primary/10 text-primary border-primary/20">Servicii Premium</Badge>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-primary bg-clip-text text-transparent px-2">
              <span className="hidden sm:inline">Serviciile Noastre de Excelență</span>
              <span className="sm:hidden">Serviciile Noastre</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              <span className="hidden sm:inline">
                Oferim o gamă completă de servicii imobiliare premium, 
                adaptate nevoilor dumneavoastră specifice
              </span>
              <span className="sm:hidden">
                Servicii imobiliare premium adaptate nevoilor dumneavoastră
              </span>
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            <Card className="glass-card hover:shadow-elegant transition-all duration-500 group border-white/20 hover:border-primary/30">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Vânzare Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Marketing profesional 360°, evaluări certificate și negocieri experte 
                  pentru maximizarea valorii proprietății dumneavoastră.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card hover:shadow-elegant transition-all duration-500 group border-white/20 hover:border-primary/30">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Achiziție Inteligentă</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Analiză de piață avansată, selecție personalizată și asistență 
                  completă pentru investiții imobiliare de succes.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card hover:shadow-elegant transition-all duration-500 group border-white/20 hover:border-primary/30">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Consultanță Strategică</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Strategie de investiții personalizată, analiză de rentabilitate 
                  și planificare pe termen lung pentru portofoliul dumneavoastră.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="despre" className="py-24 px-6 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">Despre Noi</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
                MVA IMOBILIARE
                <br />
                <span className="text-3xl text-foreground">Liderii pieței imobiliare</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Cu peste 15 ani de experiență și o echipă de specialiști certificați, 
                MVA IMOBILIARE este partenerul de încredere pentru cele mai importante 
                decizii imobiliare ale dumneavoastră. Tehnologie inovatoare și servicii personalizate.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 glass-card rounded-xl">
                  <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-sm font-medium">Certificări</div>
                  <div className="text-xs text-muted-foreground">Internaționale</div>
                </div>
                <div className="text-center p-4 glass-card rounded-xl">
                  <Shield className="h-8 w-8 text-accent mx-auto mb-2" />
                  <div className="text-sm font-medium">Transparență</div>
                  <div className="text-xs text-muted-foreground">100% Garantată</div>
                </div>
                <div className="text-center p-4 glass-card rounded-xl">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-sm font-medium">Disponibilitate</div>
                  <div className="text-xs text-muted-foreground">24/7 Support</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Card className="shadow-elegant bg-gradient-primary text-white p-8">
                <CardContent className="text-center">
                  <div className="text-5xl font-bold mb-4">€5.2M+</div>
                  <div className="text-white/90 mb-6">Valoare tranzacții 2024</div>
                  <div className="text-3xl font-bold mb-2">98%</div>
                  <div className="text-white/90 mb-6">Rata de succes în vânzări</div>
                  <div className="text-2xl font-bold mb-2">&#60; 30 zile</div>
                  <div className="text-white/90">Timp mediu de vânzare</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">Contact</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Să Discutăm Proiectul Tău
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Echipa noastră de experți este pregătită să vă ofere o consultație personalizată 
              și să răspundă la toate întrebările dumneavoastră.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <Card className="glass-card hover:shadow-elegant transition-all duration-500 text-center group border-white/20">
              <CardContent className="p-10">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Telefon Direct</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Răspuns imediat pentru urgențe și consultații rapide
                </p>
                <Button className="w-full bg-gradient-primary shadow-card hover:shadow-hover">
                  +40 21 456 7890
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass-card hover:shadow-elegant transition-all duration-500 text-center group border-white/20">
              <CardContent className="p-10">
                <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Email Premium</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Comunicare detaliată și documentație completă
                </p>
                <Button className="w-full bg-gradient-accent shadow-card hover:shadow-hover">
                  office@mvaimobiliare.ro
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass-card hover:shadow-elegant transition-all duration-500 text-center group border-white/20">
              <CardContent className="p-10">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Showroom Exclusiv</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Vizită programată în sediul nostru premium
                </p>
                <Button className="w-full bg-gradient-primary shadow-card hover:shadow-hover">
                  Calea Victoriei 120, București
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img src={mvaLogo} alt="MVA IMOBILIARE" className="h-10 w-10 brightness-0 invert" />
                <div className="flex flex-col">
                  <span className="text-xl font-bold">MVA IMOBILIARE</span>
                  <span className="text-sm text-background/70">Premium Real Estate</span>
                </div>
              </div>
              <p className="text-background/80 leading-relaxed">
                Excelența în servicii imobiliare premium. 
                Partenerul tău de încredere pentru investiții de succes.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">Servicii Premium</h4>
              <ul className="space-y-3 text-background/80">
                <li className="hover:text-background transition-colors cursor-pointer">Vânzare Proprietăți</li>
                <li className="hover:text-background transition-colors cursor-pointer">Achiziție Inteligentă</li>
                <li className="hover:text-background transition-colors cursor-pointer">Consultanță Strategică</li>
                <li className="hover:text-background transition-colors cursor-pointer">Management Proprietăți</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">Zone de Activitate</h4>
              <ul className="space-y-3 text-background/80">
                <li className="hover:text-background transition-colors cursor-pointer">București Premium</li>
                <li className="hover:text-background transition-colors cursor-pointer">Pipera & Băneasa</li>
                <li className="hover:text-background transition-colors cursor-pointer">Herastrau & Aviatorilor</li>
                <li className="hover:text-background transition-colors cursor-pointer">Primaverii & Kiseleff</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">Contact Premium</h4>
              <ul className="space-y-3 text-background/80">
                <li>+40 21 456 7890</li>
                <li>office@mvaimobiliare.ro</li>
                <li>Calea Victoriei 120</li>
                <li>București, România</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-12 pt-8 text-center text-background/70">
            <p>&copy; 2024 MVA IMOBILIARE. Toate drepturile rezervate. | Licența ANCPI Nr. 12345</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CompanyWebsite;
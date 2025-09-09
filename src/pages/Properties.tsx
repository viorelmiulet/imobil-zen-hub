import { useState } from "react";
import { 
  Building2, 
  Plus, 
  Search, 
  Filter,
  MapPin,
  Bed,
  Bath,
  Square,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const properties = [
  {
    id: 1,
    title: "Apartament Modern Pipera",
    price: "€120,000",
    location: "Pipera, București",
    type: "Apartament",
    status: "Nou",
    image: property1,
    bedrooms: 3,
    bathrooms: 2,
    area: "85 mp",
    description: "Apartament modern cu finisaje premium, parcare inclusă.",
    views: 24,
  },
  {
    id: 2,
    title: "Casă Contemporană Băneasa",
    price: "€280,000",
    location: "Băneasa, București",
    type: "Casă",
    status: "Activ",
    image: property2,
    bedrooms: 4,
    bathrooms: 3,
    area: "150 mp",
    description: "Casă cu design contemporan, grădină și garaj pentru 2 mașini.",
    views: 47,
  },
  {
    id: 3,
    title: "Penthouse Centru Vechi",
    price: "€450,000",
    location: "Centrul Vechi, București",
    type: "Penthouse",
    status: "Rezervat",
    image: property3,
    bedrooms: 3,
    bathrooms: 2,
    area: "120 mp",
    description: "Penthouse de lux cu terasă generoasă și vedere panoramică.",
    views: 89,
  },
  {
    id: 4,
    title: "Studio Central Plaza",
    price: "€65,000",
    location: "Centru, București",
    type: "Studio",
    status: "Activ",
    image: property1,
    bedrooms: 1,
    bathrooms: 1,
    area: "35 mp",
    description: "Studio complet mobilat în zonă centrală, ideal pentru investiție.",
    views: 12,
  },
  {
    id: 5,
    title: "Vilă Herastrau",
    price: "€750,000",
    location: "Herastrau, București",
    type: "Vilă",
    status: "Premium",
    image: property2,
    bedrooms: 5,
    bathrooms: 4,
    area: "300 mp",
    description: "Vilă de lux cu piscină, aproape de Parcul Herăstrău.",
    views: 156,
  },
  {
    id: 6,
    title: "Apartament Floreasca",
    price: "€180,000",
    location: "Floreasca, București",
    type: "Apartament",
    status: "Negociere",
    image: property3,
    bedrooms: 2,
    bathrooms: 2,
    area: "70 mp",
    description: "Apartament elegant cu balcon generos, zone verzi în apropiere.",
    views: 33,
  },
];

export default function Properties() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || property.status === statusFilter;
    const matchesType = typeFilter === "all" || property.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Nou": return "bg-accent text-accent-foreground";
      case "Activ": return "bg-primary text-primary-foreground";
      case "Rezervat": return "bg-warning text-warning-foreground";
      case "Premium": return "bg-gradient-primary text-white";
      case "Negociere": return "bg-info text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Proprietăți
          </h1>
          <p className="text-muted-foreground">
            Gestionează portofoliul de proprietăți al agenției tale.
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-elegant">
          <Plus className="h-4 w-4 mr-2" />
          Adaugă Proprietate
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Caută după nume sau locație..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate statusurile</SelectItem>
                <SelectItem value="Nou">Nou</SelectItem>
                <SelectItem value="Activ">Activ</SelectItem>
                <SelectItem value="Rezervat">Rezervat</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
                <SelectItem value="Negociere">Negociere</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Tip proprietate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate tipurile</SelectItem>
                <SelectItem value="Apartament">Apartament</SelectItem>
                <SelectItem value="Casă">Casă</SelectItem>
                <SelectItem value="Penthouse">Penthouse</SelectItem>
                <SelectItem value="Studio">Studio</SelectItem>
                <SelectItem value="Vilă">Vilă</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filtre Avansate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Properties Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProperties.map((property, index) => (
          <Card key={property.id} className="overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 animate-slide-up group" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Badge 
                className={`absolute top-3 right-3 ${getStatusColor(property.status)} shadow-card`}
              >
                {property.status}
              </Badge>
              <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-md px-2 py-1">
                <Eye className="h-3 w-3 text-white" />
                <span className="text-xs text-white">{property.views}</span>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-foreground line-clamp-1">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {property.location}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {property.description}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Bed className="h-3 w-3 mr-1" />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-3 w-3 mr-1" />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-3 w-3 mr-1" />
                      <span>{property.area}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {property.price}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Nu au fost găsite proprietăți
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              Încearcă să modifici filtrele sau să adaugi o proprietate nouă.
            </p>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Adaugă Prima Proprietate
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
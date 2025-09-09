import { 
  Building2, 
  Users, 
  TrendingUp, 
  DollarSign,
  Eye,
  Calendar,
  MapPin,
  Phone
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const stats = [
  {
    title: "Proprietăți Active",
    value: "142",
    change: "+12.5%",
    icon: Building2,
    color: "text-primary",
  },
  {
    title: "Lead-uri Noi",
    value: "28",
    change: "+8.3%",
    icon: Users,
    color: "text-accent",
  },
  {
    title: "Vânzări Luna Aceasta",
    value: "8",
    change: "+25%",
    icon: TrendingUp,
    color: "text-success",
  },
  {
    title: "Comision Total",
    value: "€45,280",
    change: "+18.2%",
    icon: DollarSign,
    color: "text-warning",
  },
];

const recentProperties = [
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
  },
  {
    id: 2,
    title: "Casă Contemporană Baneasa",
    price: "€280,000",
    location: "Băneasa, București",
    type: "Casă",
    status: "Activ",
    image: property2,
    bedrooms: 4,
    bathrooms: 3,
    area: "150 mp",
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
  },
];

const recentLeads = [
  {
    id: 1,
    name: "Maria Popescu",
    email: "maria.popescu@email.com",
    phone: "+40 722 123 456",
    interest: "Apartament 2-3 camere",
    budget: "€80,000 - €120,000",
    status: "Hot",
    date: "Azi, 14:30",
  },
  {
    id: 2,
    name: "Alexandru Dumitrescu",
    email: "alex.dumitrescu@email.com",
    phone: "+40 733 987 654",
    interest: "Casă cu grădină",
    budget: "€200,000 - €300,000",
    status: "Warm",
    date: "Ieri, 16:45",
  },
  {
    id: 3,
    name: "Elena Stoica",
    email: "elena.stoica@email.com",
    phone: "+40 744 555 333",
    interest: "Apartament în centru",
    budget: "€150,000 - €250,000",
    status: "Cold",
    date: "2 zile în urmă",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Bine ai venit! Iată o privire de ansamblu asupra activității tale.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="shadow-card hover:shadow-hover transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-success flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} față de luna trecută
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Properties */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Proprietăți Recente</CardTitle>
              <Button variant="outline" size="sm">
                Vezi Toate
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProperties.map((property) => (
              <div key={property.id} className="flex space-x-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-20 h-20 rounded-lg object-cover shadow-card"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium text-foreground line-clamp-1">
                      {property.title}
                    </h3>
                    <Badge variant={property.status === "Nou" ? "default" : property.status === "Rezervat" ? "secondary" : "outline"}>
                      {property.status}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {property.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-primary">
                      {property.price}
                    </span>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{property.bedrooms} cam</span>
                      <span>•</span>
                      <span>{property.area}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Lead-uri Recente</CardTitle>
              <Button variant="outline" size="sm">
                Vezi Toate
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{lead.name}</h3>
                    <p className="text-sm text-muted-foreground">{lead.email}</p>
                  </div>
                  <Badge variant={lead.status === "Hot" ? "destructive" : lead.status === "Warm" ? "secondary" : "outline"}>
                    {lead.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-3 w-3 mr-2" />
                    {lead.phone}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Interes:</span> {lead.interest}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Buget:</span> {lead.budget}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    {lead.date}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
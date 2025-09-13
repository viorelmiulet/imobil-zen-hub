import { useState, useEffect } from "react";
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
  Trash2,
  Copy
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AddPropertyDialog } from "@/components/AddPropertyDialog";
import { EditPropertyDialog } from "@/components/EditPropertyDialog";
import { PropertyPreviewDialog } from "@/components/PropertyPreviewDialog";
import { ImportPropertiesDialog } from "@/components/ImportPropertiesDialog";
import { useToast } from "@/hooks/use-toast";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
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
    agentId: "user1", // Mock agent ID
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
    agentId: "user2",
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
    agentId: "user1",
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
    agentId: "user2",
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
    agentId: "user1",
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
    agentId: "user2",
  },
];

export default function Properties() {
  const { toast } = useToast();
  const permissions = useUserRole();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [propertiesList, setPropertiesList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [previewProperty, setPreviewProperty] = useState<any>(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);

  // Fetch properties from Supabase
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
        toast({
          title: "Eroare",
          description: "Nu s-au putut încărca proprietățile",
          variant: "destructive",
        });
        // Fallback to mock data if database fetch fails
        setPropertiesList(properties);
      } else {
        // Map database data to display format
        const mappedProperties = data.map(prop => ({
          ...prop,
          price: `€${prop.price?.toLocaleString() || 0}`,
          area: `${prop.area || 0} mp`,
          image: prop.images?.[0] || property1, // Use first image or fallback
          views: Math.floor(Math.random() * 100), // Mock views for now
          agentId: prop.user_id || permissions.userId,
        }));
        setPropertiesList(mappedProperties);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      setPropertiesList(properties); // Fallback to mock data
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProperties = propertiesList.filter((property) => {
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

  const handleEditProperty = (property: any) => {
    setEditingProperty(property);
    setEditDialogOpen(true);
  };

  const handleUpdateProperty = (updatedProperty: any) => {
    fetchProperties(); // Refresh the list after update
  };

  const canEditProperty = (property: any) => {
    return permissions.canEditAny || (permissions.canEditOwn && property.agentId === permissions.userId);
  };

  const canDeleteProperty = (property: any) => {
    return permissions.canDeleteAny || (permissions.canDeleteOwn && property.agentId === permissions.userId);
  };

  const handleDeleteProperty = async (propertyId: string) => {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId);

      if (error) {
        console.error('Error deleting property:', error);
        toast({
          title: "Eroare",
          description: "Nu s-a putut șterge proprietatea",
          variant: "destructive",
        });
        return;
      }

      // Remove from local state
      setPropertiesList(prev => prev.filter(p => p.id !== propertyId));
      toast({
        title: "Proprietate ștearsă",
        description: "Proprietatea a fost ștearsă cu succes.",
      });
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut șterge proprietatea",
        variant: "destructive",
      });
    }
  };

  const handlePreviewProperty = (property: any) => {
    setPreviewProperty(property);
    setPreviewDialogOpen(true);
  };

  const handleCloneProperty = async (property: any) => {
    try {
      const clonedProperty = {
        title: `${property.title} (Copie)`,
        price: parseFloat(property.price.replace(/[€,]/g, '')) || 0,
        location: property.location,
        type: property.type,
        status: "Nou",
        area: parseFloat(property.area) || 0,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        description: property.description,
        images: property.images || [],
        source: 'clone',
        user_id: permissions.userId,
      };

      const { error } = await supabase
        .from('properties')
        .insert([clonedProperty]);

      if (error) {
        console.error('Error cloning property:', error);
        toast({
          title: "Eroare",
          description: "Nu s-a putut clona proprietatea",
          variant: "destructive",
        });
        return;
      }

      fetchProperties(); // Refresh the list
      toast({
        title: "Proprietate clonată",
        description: "Proprietatea a fost clonată cu succes.",
      });
    } catch (error) {
      console.error('Error cloning property:', error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut clona proprietatea",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {editingProperty && (
        <EditPropertyDialog
          property={editingProperty}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onPropertyUpdated={handleUpdateProperty}
        />
      )}

      {previewProperty && (
        <PropertyPreviewDialog
          property={previewProperty}
          open={previewDialogOpen}
          onOpenChange={setPreviewDialogOpen}
        />
      )}

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
        <div className="flex items-center gap-2">
          <ImportPropertiesDialog 
            onImportComplete={() => {
              fetchProperties(); // Refresh the list after import
              toast({
                title: "Import finalizat",
                description: "Proprietățile au fost importate cu succes",
              });
            }}
          />
          <AddPropertyDialog 
            onPropertyAdded={(newProperty) => {
              fetchProperties(); // Refresh the list after adding
            }}
          />
        </div>
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
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden shadow-card">
              <div className="w-full h-48 bg-muted animate-pulse" />
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="h-6 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                  <div className="h-16 bg-muted animate-pulse rounded" />
                  <div className="flex justify-between">
                    <div className="h-8 bg-muted animate-pulse rounded w-24" />
                    <div className="flex gap-1">
                      <div className="h-8 w-8 bg-muted animate-pulse rounded" />
                      <div className="h-8 w-8 bg-muted animate-pulse rounded" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredProperties.length > 0 ? (
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
                    <div className="flex items-center space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10"
                        onClick={() => handlePreviewProperty(property)}
                        title="Vezi detalii"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-success hover:bg-success/10"
                        onClick={() => handleCloneProperty(property)}
                        title="Clonează anunțul"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      {canEditProperty(property) && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-info hover:bg-info/10"
                          onClick={() => handleEditProperty(property)}
                          title="Editează proprietatea"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {canDeleteProperty(property) && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                              title="Șterge proprietatea"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-card border border-border shadow-hover">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-foreground">Șterge proprietatea</AlertDialogTitle>
                              <AlertDialogDescription className="text-muted-foreground">
                                Ești sigur că vrei să ștergi această proprietate? Această acțiune nu poate fi anulată.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-background border-border text-foreground hover:bg-muted">
                                Anulează
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteProperty(property.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-card"
                              >
                                Șterge
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="shadow-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Nu au fost găsite proprietăți
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              Încearcă să modifici filtrele sau să adaugi o proprietate nouă.
            </p>
            <AddPropertyDialog 
              onPropertyAdded={() => fetchProperties()}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
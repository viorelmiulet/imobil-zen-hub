import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Square, Eye } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface PropertyPreviewDialogProps {
  property: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PropertyPreviewDialog({ property, open, onOpenChange }: PropertyPreviewDialogProps) {
  if (!property) return null;

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

  const images = property.images || [property.image];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Previzualizare Anunț</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Image Carousel */}
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {images.map((image: string, index: number) => (
                  <CarouselItem key={index}>
                    <div className="relative">
                      <img
                        src={image}
                        alt={`${property.title} - ${index + 1}`}
                        className="w-full h-64 md:h-80 object-cover rounded-lg"
                      />
                      <Badge 
                        className={`absolute top-3 right-3 ${getStatusColor(property.status)} shadow-card`}
                      >
                        {property.status}
                      </Badge>
                      <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-md px-2 py-1">
                        <Eye className="h-3 w-3 text-white" />
                        <span className="text-xs text-white">{property.views || 0} vizualizări</span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {images.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          </div>

          {/* Property Details */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{property.title}</h2>
                <div className="flex items-center text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </div>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-primary">{property.price}</span>
                <div className="text-sm text-muted-foreground">{property.type}</div>
              </div>
            </div>

            {/* Property Features */}
            <div className="flex items-center space-x-6 text-muted-foreground">
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-2" />
                <span className="font-medium">{property.bedrooms}</span>
                <span className="ml-1">dormitoare</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-2" />
                <span className="font-medium">{property.bathrooms}</span>
                <span className="ml-1">băi</span>
              </div>
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-2" />
                <span className="font-medium">{property.area}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Descriere</h3>
              <p className="text-muted-foreground leading-relaxed">
                {property.description || "Nu există descriere disponibilă pentru această proprietate."}
              </p>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <h4 className="font-medium text-foreground mb-2">Detalii Proprietate</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>Tip: <span className="text-foreground">{property.type}</span></div>
                  <div>Status: <span className="text-foreground">{property.status}</span></div>
                  <div>Suprafață: <span className="text-foreground">{property.area}</span></div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Contact & Statistici</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>Vizualizări: <span className="text-foreground">{property.views || 0}</span></div>
                  <div>ID Anunț: <span className="text-foreground">#{property.id}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
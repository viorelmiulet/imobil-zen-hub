import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddPropertyDialogProps {
  onPropertyAdded?: (property: any) => void;
}

export function AddPropertyDialog({ onPropertyAdded }: AddPropertyDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    type: "",
    status: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.price || !formData.location || !formData.type) {
      toast({
        title: "Eroare",
        description: "Te rugăm să completezi toate câmpurile obligatorii.",
        variant: "destructive",
      });
      return;
    }

    // Create new property object
    const newProperty = {
      id: Date.now(), // Simple ID generation
      ...formData,
      bedrooms: parseInt(formData.bedrooms) || 0,
      bathrooms: parseInt(formData.bathrooms) || 0,
      image: "/placeholder.svg", // Default image
      views: 0,
    };

    // Call the callback if provided
    onPropertyAdded?.(newProperty);

    toast({
      title: "Succes",
      description: "Proprietatea a fost adăugată cu succes!",
    });

    // Reset form and close dialog
    setFormData({
      title: "",
      price: "",
      location: "",
      type: "",
      status: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      description: "",
    });
    setOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-elegant">
          <Plus className="h-4 w-4 mr-2" />
          Adaugă Proprietate
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adaugă Proprietate Nouă</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titlu *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Apartament Modern Pipera"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Preț *</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="€120,000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Locație *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Pipera, București"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tip Proprietate *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selectează tipul" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Apartament">Apartament</SelectItem>
                  <SelectItem value="Casă">Casă</SelectItem>
                  <SelectItem value="Penthouse">Penthouse</SelectItem>
                  <SelectItem value="Studio">Studio</SelectItem>
                  <SelectItem value="Vilă">Vilă</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selectează statusul" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nou">Nou</SelectItem>
                  <SelectItem value="Activ">Activ</SelectItem>
                  <SelectItem value="Rezervat">Rezervat</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Negociere">Negociere</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Suprafață</Label>
              <Input
                id="area"
                value={formData.area}
                onChange={(e) => handleInputChange("area", e.target.value)}
                placeholder="85 mp"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Dormitoare</Label>
              <Input
                id="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                placeholder="3"
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Băi</Label>
              <Input
                id="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                placeholder="2"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descriere</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Apartament modern cu finisaje premium, parcare inclusă..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Anulează
            </Button>
            <Button type="submit" className="bg-gradient-primary hover:opacity-90">
              Adaugă Proprietate
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
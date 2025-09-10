import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Upload, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PlatformSelector from "@/components/settings/PlatformSelector";

interface AddPropertyDialogProps {
  onPropertyAdded?: (property: any) => void;
}

export function AddPropertyDialog({ onPropertyAdded }: AddPropertyDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
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

  // Platform publishing settings
  const [platforms, setPlatforms] = useState([
    {
      id: 'storia',
      name: 'Storia.ro',
      description: 'Cea mai mare platformă imobiliară din România',
      isConfigured: false, // This would come from API key settings
      enabled: false
    },
    {
      id: 'imobiliare',
      name: 'Imobiliare.ro',
      description: 'Portal imobiliar cu tradiție în România',
      isConfigured: true, // Mock - configured
      enabled: true
    },
    {
      id: 'mva-imobiliare',
      name: 'MVA IMOBILIARE',
      description: 'Platforma MVA pentru publicarea automată a ofertelor',
      isConfigured: true, // API key is configured
      enabled: true
    },
    {
      id: 'publi24',
      name: 'Publi24',
      description: 'Platformă de anunturi cu secțiune imobiliară',
      isConfigured: false,
      enabled: false
    },
    {
      id: 'homezz',
      name: 'HomeZZ',
      description: 'Platformă modernă pentru proprietăți premium',
      isConfigured: false,
      enabled: false
    }
  ]);
  
  // Map property to MVA required payload
  const mapPropertyToOffer = (p: any) => {
    const numericPrice = typeof p.price === 'number'
      ? p.price
      : parseInt(String(p.price || '').replace(/[^0-9]/g, ''), 10) || 0;
    const rooms = typeof p.bedrooms === 'number' ? p.bedrooms : parseInt(String(p.bedrooms || 0), 10) || 0;

    const offer = {
      title: p.title,
      description: p.description || '',
      location: p.location,
      price_min: numericPrice,
      rooms,
    };
    return offer;
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + selectedImages.length > 5) {
      toast({
        title: "Prea multe imagini",
        description: "Poți adăuga maximum 5 imagini per proprietate.",
        variant: "destructive",
      });
      return;
    }
    setSelectedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handlePlatformToggle = (platformId: string, enabled: boolean) => {
    setPlatforms(prev => 
      prev.map(platform => 
        platform.id === platformId 
          ? { ...platform, enabled: enabled && platform.isConfigured }
          : platform
      )
    );
  };

  const uploadImages = async (): Promise<string[]> => {
    if (selectedImages.length === 0) return [];

    const uploadedUrls: string[] = [];

    for (const file of selectedImages) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('property-images')
        .upload(fileName, file);

      if (error) {
        console.error('Upload error:', error);
        throw new Error(`Failed to upload ${file.name}`);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(fileName);

      uploadedUrls.push(publicUrl);
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price || !formData.location || !formData.type) {
      toast({
        title: "Eroare",
        description: "Te rugăm să completezi toate câmpurile obligatorii.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const imageUrls = await uploadImages();

      const newProperty = {
        id: Date.now(),
        ...formData,
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        images: imageUrls,
        image: imageUrls[0] || "/placeholder.svg",
        views: 0,
        publishPlatforms: platforms.filter(p => p.enabled).map(p => p.id),
      };

      onPropertyAdded?.(newProperty);

      // Publish to mvaimobiliare.ro via Edge Function (does not expose secret to frontend)
      try {
        await supabase.functions.invoke('publish-offer-mva', {
          body: { action: 'create', offer: mapPropertyToOffer(newProperty) }
        });
      } catch (err) {
        console.error('Publish to MVA failed:', err);
      }

      toast({
        title: "Succes",
        description: `Proprietatea a fost adăugată și va fi publicată pe ${platforms.filter(p => p.enabled).length} platforme.`,
      });

      // Reset form
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
      setSelectedImages([]);
      setPlatforms(prev => prev.map(p => ({ ...p, enabled: false })));
      setOpen(false);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Eroare",
        description: "A apărut o eroare la adăugarea proprietății.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adaugă Proprietate Nouă</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <Label>Imagini Proprietate</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
              <div className="text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <div className="text-sm text-muted-foreground mb-4">
                  Adaugă până la 5 imagini (JPG, PNG, WebP)
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Selectează Imagini
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>
            </div>

            {/* Selected Images Preview */}
            {selectedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {selectedImages.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titlu *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Apartament Modern Pipera"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Preț *</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="€120,000"
                disabled={loading}
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
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tip Proprietate *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)} disabled={loading}>
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
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)} disabled={loading}>
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
              disabled={loading}
            />
          </div>

          {/* Platform Selector */}
          <PlatformSelector
            platforms={platforms}
            onPlatformToggle={handlePlatformToggle}
            disabled={loading}
          />

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Anulează
            </Button>
            <Button type="submit" className="bg-gradient-primary hover:opacity-90" disabled={loading}>
              {loading ? "Se adaugă..." : "Adaugă Proprietate"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
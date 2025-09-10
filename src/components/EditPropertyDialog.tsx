import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PlatformSelector from "@/components/settings/PlatformSelector";

interface EditPropertyDialogProps {
  property: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPropertyUpdated?: (property: any) => void;
}

export function EditPropertyDialog({ property, open, onOpenChange, onPropertyUpdated }: EditPropertyDialogProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(property.images || [property.image]);
  const [formData, setFormData] = useState({
    title: property.title || "",
    price: property.price || "",
    location: property.location || "",
    type: property.type || "",
    status: property.status || "",
    bedrooms: property.bedrooms?.toString() || "",
    bathrooms: property.bathrooms?.toString() || "",
    area: property.area || "",
    description: property.description || "",
  });

  // Platform publishing settings - initialize with property's current settings
  const [platforms, setPlatforms] = useState([
    {
      id: 'storia',
      name: 'Storia.ro',
      description: 'Cea mai mare platformă imobiliară din România',
      isConfigured: false,
      enabled: property.publishPlatforms?.includes('storia') || false
    },
    {
      id: 'imobiliare',
      name: 'Imobiliare.ro',
      description: 'Portal imobiliar cu tradiție în România',
      isConfigured: true,
      enabled: property.publishPlatforms?.includes('imobiliare') || true
    },
    {
      id: 'mva-imobiliare',
      name: 'MVA IMOBILIARE',
      description: 'Platforma MVA pentru publicarea automată a ofertelor',
      isConfigured: true,
      enabled: property.publishPlatforms?.includes('mva-imobiliare') || true
    },
    {
      id: 'publi24',
      name: 'Publi24',
      description: 'Platformă de anunturi cu secțiune imobiliară',
      isConfigured: false,
      enabled: property.publishPlatforms?.includes('publi24') || false
    },
    {
      id: 'homezz',
      name: 'HomeZZ',
      description: 'Platformă modernă pentru proprietăți premium',
      isConfigured: false,
      enabled: property.publishPlatforms?.includes('homezz') || false
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
    const totalImages = existingImages.length + selectedImages.length + files.length;
    
    if (totalImages > 5) {
      toast({
        title: "Prea multe imagini",
        description: "Poți avea maximum 5 imagini per proprietate.",
        variant: "destructive",
      });
      return;
    }
    setSelectedImages(prev => [...prev, ...files]);
  };

  const removeNewImage = (index: number) => {
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

  const removeExistingImage = async (imageUrl: string, index: number) => {
    try {
      // Extract filename from URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      // Delete from storage
      const { error } = await supabase.storage
        .from('property-images')
        .remove([fileName]);

      if (error) {
        console.error('Error deleting image:', error);
      }

      setExistingImages(prev => prev.filter((_, i) => i !== index));
      
      toast({
        title: "Imagine ștearsă",
        description: "Imaginea a fost ștearsă cu succes.",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Eroare",
        description: "Nu s-a putut șterge imaginea.",
        variant: "destructive",
      });
    }
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
      const newImageUrls = await uploadImages();
      const allImages = [...existingImages, ...newImageUrls];

      const updatedProperty = {
        ...property,
        ...formData,
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        images: allImages,
        image: allImages[0] || "/placeholder.svg",
        publishPlatforms: platforms.filter(p => p.enabled).map(p => p.id),
      };

      onPropertyUpdated?.(updatedProperty);

      // Publish updated offer to mvaimobiliare.ro via Edge Function
      try {
        await supabase.functions.invoke('publish-offer-mva', {
          body: { action: 'update', id: String(updatedProperty.id), offer: mapPropertyToOffer(updatedProperty) }
        });
      } catch (err) {
        console.error('Publish to MVA (update) failed:', err);
      }

      toast({
        title: "Succes",
        description: `Proprietatea a fost actualizată și va fi publicată pe ${platforms.filter(p => p.enabled).length} platforme.`,
      });

      setSelectedImages([]);
      onOpenChange(false);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Eroare",
        description: "A apărut o eroare la actualizarea proprietății.",
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editează Proprietatea</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Management Section */}
          <div className="space-y-4">
            <Label>Imagini Proprietate</Label>
            
            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div>
                <div className="text-sm text-muted-foreground mb-2">Imagini existente:</div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  {existingImages.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={imageUrl}
                        alt={`Existing ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeExistingImage(imageUrl, index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Images */}
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
              <div className="text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <div className="text-sm text-muted-foreground mb-4">
                  Adaugă imagini noi (maximum {5 - existingImages.length} imagini)
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading || existingImages.length >= 5}
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

            {/* New Images Preview */}
            {selectedImages.length > 0 && (
              <div>
                <div className="text-sm text-muted-foreground mb-2">Imagini noi:</div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {selectedImages.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`New ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeNewImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form fields - same as AddPropertyDialog */}
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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Anulează
            </Button>
            <Button type="submit" className="bg-gradient-primary hover:opacity-90" disabled={loading}>
              {loading ? "Se salvează..." : "Salvează Modificările"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

-- Create storage bucket for property images
INSERT INTO storage.buckets (id, name, public) VALUES ('property-images', 'property-images', true);

-- Create RLS policies for property images
CREATE POLICY "Public can view property images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'property-images');

CREATE POLICY "Anyone can upload property images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'property-images');

CREATE POLICY "Anyone can update property images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'property-images');

CREATE POLICY "Anyone can delete property images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'property-images');
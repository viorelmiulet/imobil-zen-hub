import React from 'react';
import { Globe, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface Platform {
  id: string;
  name: string;
  description: string;
  isConfigured: boolean;
  enabled: boolean;
}

interface PlatformSelectorProps {
  platforms: Platform[];
  onPlatformToggle: (platformId: string, enabled: boolean) => void;
  disabled?: boolean;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  platforms,
  onPlatformToggle,
  disabled = false
}) => {
  return (
    <Card className="border-info/20 bg-info/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Globe className="h-5 w-5 mr-2 text-primary" />
          Platforme de Publicare
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Selectează pe ce platforme să fie publicată această proprietate
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
              platform.isConfigured 
                ? 'bg-background border-border hover:bg-muted/50' 
                : 'bg-muted/30 border-muted'
            }`}
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2">
                <Label className="font-medium text-sm">{platform.name}</Label>
                {platform.isConfigured ? (
                  <Badge variant="default" className="bg-primary text-primary-foreground text-xs">
                    <Check className="h-3 w-3 mr-1" />
                    Configurat
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground text-xs">
                    <X className="h-3 w-3 mr-1" />
                    Neconfigurat
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{platform.description}</p>
              {!platform.isConfigured && (
                <p className="text-xs text-warning">
                  Adaugă API key în Setări → Promovare pentru a activa
                </p>
              )}
            </div>
            <Switch
              checked={platform.enabled && platform.isConfigured}
              onCheckedChange={(enabled) => onPlatformToggle(platform.id, enabled)}
              disabled={disabled || !platform.isConfigured}
              className="ml-3"
            />
          </div>
        ))}
        
        {platforms.filter(p => !p.isConfigured).length > 0 && (
          <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 rounded-full bg-warning mt-1.5"></div>
              <div className="text-sm">
                <p className="font-medium text-foreground mb-1">Configurează platformele</p>
                <p className="text-muted-foreground text-xs">
                  Pentru a publica automat pe platformele marcate, configurează API keys-urile în 
                  <span className="font-medium text-foreground"> Setări → Promovare</span>.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlatformSelector;
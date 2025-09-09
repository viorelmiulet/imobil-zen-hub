import React, { useState } from 'react';
import { 
  ExternalLink,
  Key,
  Eye,
  EyeOff,
  Check,
  X,
  Save,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ApiKeySettingProps {
  platform: string;
  name: string;
  description: string;
  website: string;
  isConfigured?: boolean;
  onAddKey: () => void;
  onTestConnection?: () => void;
}

const ApiKeySetting: React.FC<ApiKeySettingProps> = ({
  platform,
  name,
  description,
  website,
  isConfigured = false,
  onAddKey,
  onTestConnection
}) => {
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTestConnection = async () => {
    if (!onTestConnection) return;
    
    setIsLoading(true);
    try {
      await onTestConnection();
      toast({
        title: "Conexiune reușită",
        description: `Conexiunea cu ${name} a fost testată cu succes.`,
      });
    } catch (error) {
      toast({
        title: "Eroare de conexiune",
        description: `Nu s-a putut conecta la ${name}. Verifică API key-ul.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {name}
              {isConfigured ? (
                <Badge variant="default" className="bg-primary text-primary-foreground">
                  <Check className="h-3 w-3 mr-1" />
                  Configurat
                </Badge>
              ) : (
                <Badge variant="outline" className="text-muted-foreground">
                  <X className="h-3 w-3 mr-1" />
                  Nu este configurat
                </Badge>
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(website, '_blank')}
            className="text-muted-foreground hover:text-primary"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isConfigured ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <div className="relative">
                  <Input
                    type={showKey ? "text" : "password"}
                    value="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    readOnly
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => setShowKey(!showKey)}
                  >
                    {showKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onAddKey}
                className="flex-1"
              >
                <Key className="h-4 w-4 mr-2" />
                Actualizează Key
              </Button>
              {onTestConnection && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTestConnection}
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? "Testez..." : "Testează Conexiunea"}
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start space-x-2 p-3 bg-muted/50 rounded-lg">
              <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
              <div className="text-sm text-muted-foreground">
                Pentru a publica automat proprietățile pe {name}, adaugă API key-ul tău.
              </div>
            </div>
            <Button
              onClick={onAddKey}
              className="w-full"
              variant="default"
            >
              <Key className="h-4 w-4 mr-2" />
              Adaugă API Key pentru {name}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiKeySetting;
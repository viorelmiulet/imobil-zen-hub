import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Download, CheckCircle, XCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ImportPropertiesDialogProps {
  onImportComplete?: () => void;
}

export function ImportPropertiesDialog({ onImportComplete }: ImportPropertiesDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [importResult, setImportResult] = useState<any>(null);
  const { toast } = useToast();

  const testConnection = async () => {
    setIsTesting(true);
    setConnectionStatus('idle');
    
    try {
      const { data, error } = await supabase.functions.invoke('import-properties', {
        body: { action: 'test' }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.forward_status === 401 || data?.forward_status === 403) {
        throw new Error('Cheie API invalidă sau lipsă');
      }

      setConnectionStatus('success');
      toast({
        title: "Conexiune reușită",
        description: "API-ul extern este accesibil",
      });
    } catch (error) {
      console.error('Test connection error:', error);
      setConnectionStatus('error');
      toast({
        title: "Eroare conexiune",
        description: error instanceof Error ? error.message : "Nu se poate conecta la API",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleImport = async () => {
    setIsLoading(true);
    setImportResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('import-properties', {
        body: { action: 'import' }
      });

      if (error) {
        throw new Error(error.message);
      }

      setImportResult(data);
      
      toast({
        title: "Import complet",
        description: `Au fost importate ${data.imported_count} din ${data.total_fetched} proprietăți`,
      });

      if (onImportComplete) {
        onImportComplete();
      }
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: "Eroare import",
        description: error instanceof Error ? error.message : "Nu s-au putut importa proprietățile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetDialog = () => {
    setConnectionStatus('idle');
    setImportResult(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetDialog();
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Importă Proprietăți
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Importă Proprietăți din API Extern</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Connection Test Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status conexiune:</span>
              {connectionStatus === 'idle' && (
                <Badge variant="secondary">Netestat</Badge>
              )}
              {connectionStatus === 'success' && (
                <Badge variant="default" className="gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Conectat
                </Badge>
              )}
              {connectionStatus === 'error' && (
                <Badge variant="destructive" className="gap-1">
                  <XCircle className="h-3 w-3" />
                  Eroare
                </Badge>
              )}
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={testConnection}
              disabled={isTesting}
              className="w-full"
            >
              {isTesting ? "Se testează..." : "Testează Conexiunea"}
            </Button>
          </div>

          {/* Import Section */}
          {connectionStatus === 'success' && (
            <div className="space-y-3">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Acest proces va importa toate proprietățile disponibile din API-ul extern.
                </AlertDescription>
              </Alert>
              
              <Button 
                onClick={handleImport}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Se importă..." : "Importă Proprietăți"}
              </Button>
            </div>
          )}

          {/* Import Results */}
          {importResult && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Rezultate Import:</h4>
              <div className="text-sm space-y-1">
                <p>✅ Importate: {importResult.imported_count}</p>
                <p>📋 Total găsite: {importResult.total_fetched}</p>
                {importResult.imported_count !== importResult.total_fetched && (
                  <p className="text-amber-600">
                    ⚠️ Unele proprietăți nu au putut fi importate
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
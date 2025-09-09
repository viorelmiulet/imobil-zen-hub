import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platformName: string;
  platformId: string;
  initialValue?: string;
  onSave: (value: string) => void;
}

const AddApiKeyDialog: React.FC<AddApiKeyDialogProps> = ({
  open,
  onOpenChange,
  platformName,
  platformId,
  initialValue = "",
  onSave,
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>API Key pentru {platformName}</DialogTitle>
          <DialogDescription>
            Introdu cheia API pentru a permite publicarea automată. Notă: momentan cheia este stocată local (doar pe acest browser).
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="text"
              placeholder={`Cheia pentru ${platformName}`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Cheia se salvează în siguranță local (localStorage). Pentru utilizare pe server și integrare 100% securizată, recomandăm configurarea prin Supabase Secrets.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Anulează</Button>
          <Button onClick={() => onSave(value)} disabled={!value}>Salvează</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddApiKeyDialog;

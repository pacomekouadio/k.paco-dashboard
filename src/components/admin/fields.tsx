import React, { useRef, useState } from 'react';
import { Loader2, Upload, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { uploadSiteImage } from '@/lib/uploadImage';
import { toast } from 'sonner';

export const TextField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}> = ({ label, value, onChange, placeholder }) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
    <Input value={value ?? ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
  </div>
);

export const AreaField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  hint?: string;
}> = ({ label, value, onChange, rows = 4, hint }) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
    <Textarea rows={rows} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
    {hint ? <p className="text-[11px] text-muted-foreground">{hint}</p> : null}
  </div>
);

export const ImageField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
}> = ({ label, value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadSiteImage(file);
      onChange(url);
      toast.success('Image mise en ligne');
    } catch (err) {
      console.error(err);
      toast.error("Échec de l'envoi de l'image");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <div className="flex items-start gap-3">
        <div className="h-20 w-28 shrink-0 overflow-hidden rounded-md border bg-muted">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
              Aucune image
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <Input value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder="URL de l'image" />
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => void handleFile(e.target.files?.[0])}
          />
          <Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => inputRef.current?.click()}>
            {busy ? <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" /> : <Upload className="mr-2 h-3.5 w-3.5" />}
            Téléverser une image
          </Button>
        </div>
      </div>
    </div>
  );
};

export function ListEditor<T>({
  label,
  items,
  onChange,
  create,
  title,
  render,
}: {
  label: string;
  items: T[];
  onChange: (items: T[]) => void;
  create: () => T;
  title: (item: T, index: number) => string;
  render: (item: T, update: (patch: Partial<T>) => void) => React.ReactNode;
}) {
  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [it] = next.splice(from, 1);
    next.splice(to, 0, it);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold">{label}</Label>
        <Button type="button" variant="outline" size="sm" onClick={() => onChange([...items, create()])}>
          <Plus className="mr-1.5 h-3.5 w-3.5" /> Ajouter
        </Button>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border bg-card p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {title(item, i)}
              </span>
              <div className="flex items-center gap-1">
                <Button type="button" variant="ghost" size="icon" onClick={() => move(i, i - 1)}>
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="icon" onClick={() => move(i, i + 1)}>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onChange(items.filter((_, idx) => idx !== i))}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
            {render(item, (patch) =>
              onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it))),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

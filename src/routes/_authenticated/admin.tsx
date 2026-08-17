import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';
import { Loader2, Save, LogOut, ExternalLink, RotateCcw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { AreaField, ImageField, ListEditor, TextField } from '@/components/admin/fields';
import { defaultContent, mergeContent, type IconName, type SiteContent } from '@/content/schema';
import { fetchSiteContent, saveSiteContent } from '@/content/SiteContentProvider';

export const Route = createFileRoute('/_authenticated/admin')({
  head: () => ({
    meta: [
      { title: 'Tableau de bord | Ocean Crown Shipping Services' },
      {
        name: 'description',
        content: 'Tableau de bord d’administration du site Ocean Crown : textes, images et sections.',
      },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: AdminPage,
});

const ICONS: IconName[] = ['plane', 'truck', 'ship', 'package', 'anchor'];

function IconSelect({ value, onChange }: { value: IconName; onChange: (v: IconName) => void }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">Icône</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as IconName)}
        className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
      >
        {ICONS.map((icon) => (
          <option key={icon} value={icon}>
            {icon}
          </option>
        ))}
      </select>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

function AdminPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    void (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (uid) {
        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', uid)
          .eq('role', 'admin')
          .maybeSingle();
        setIsAdmin(Boolean(roles));
      } else {
        setIsAdmin(false);
      }
      setContent(await fetchSiteContent());
      setLoading(false);
    })();
  }, []);

  const set = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) =>
    setContent((prev) => ({ ...prev, [key]: value }));

  const patch = <K extends keyof SiteContent>(key: K, value: Partial<SiteContent[K]>) =>
    setContent((prev) => ({ ...prev, [key]: { ...(prev[key] as object), ...value } as SiteContent[K] }));

  const save = async () => {
    setSaving(true);
    try {
      await saveSiteContent(content);
      toast.success('Modifications enregistrées');
    } catch (err) {
      console.error(err);
      toast.error("Échec de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  const resetSection = (key: keyof SiteContent) => {
    setContent((prev) => mergeContent({ ...prev, [key]: undefined }));
    toast.info('Section réinitialisée (pensez à enregistrer)');
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    void navigate({ to: '/auth' });
  };

  const tabs = useMemo(
    () => [
      { value: 'brand', label: 'Marque & Menu' },
      { value: 'hero', label: 'Bannière' },
      { value: 'services', label: 'Services' },
      { value: 'why', label: 'Pourquoi nous' },
      { value: 'about', label: 'À propos' },
      { value: 'difference', label: 'Différence' },
      { value: 'unmatched', label: 'Excellence' },
      { value: 'footer', label: 'Pied de page' },
    ],
    [],
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div>
            <h1 className="font-montserrat text-lg font-extrabold tracking-tight">Tableau de bord du site</h1>
            <p className="text-xs text-muted-foreground">Ocean Crown Shipping Services L.L.C</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => window.open('/', '_blank')}>
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Voir le site
            </Button>
            <Button size="sm" onClick={save} disabled={saving || isAdmin === false}>
              {saving ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Save className="mr-1.5 h-3.5 w-3.5" />}
              Enregistrer
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {isAdmin === false && (
          <div className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            Votre compte n’a pas les droits administrateur : les modifications ne pourront pas être enregistrées.
          </div>
        )}

        <Tabs defaultValue="brand" className="space-y-4">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
            {tabs.map((t) => (
              <TabsTrigger key={t.value} value={t.value} className="text-xs">
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* MARQUE & MENU */}
          <TabsContent value="brand" className="space-y-4">
            <Section title="Marque" description="Nom affiché dans l’en-tête et le pied de page.">
              <TextField label="Nom" value={content.brand.name} onChange={(v) => patch('brand', { name: v })} />
              <TextField
                label="Sous-titre"
                value={content.brand.tagline}
                onChange={(v) => patch('brand', { tagline: v })}
              />
            </Section>
            <Section title="Barre de navigation">
              <div className="grid gap-4 sm:grid-cols-3">
                <TextField label="Téléphone" value={content.nav.phone} onChange={(v) => patch('nav', { phone: v })} />
                <TextField
                  label="Libellé téléphone"
                  value={content.nav.phoneLabel}
                  onChange={(v) => patch('nav', { phoneLabel: v })}
                />
                <TextField
                  label="Libellé suivi de colis"
                  value={content.nav.trackLabel}
                  onChange={(v) => patch('nav', { trackLabel: v })}
                />
              </div>
              <ListEditor
                label="Liens du menu"
                items={content.nav.items}
                onChange={(items) => patch('nav', { items })}
                create={() => ({ id: `link-${Date.now()}`, title: 'NOUVEAU', subtitle: '', href: '#home' })}
                title={(item) => item.title}
                render={(item, update) => (
                  <div className="grid gap-3 sm:grid-cols-3">
                    <TextField label="Titre" value={item.title} onChange={(v) => update({ title: v })} />
                    <TextField label="Sous-titre" value={item.subtitle} onChange={(v) => update({ subtitle: v })} />
                    <TextField label="Lien (ancre)" value={item.href} onChange={(v) => update({ href: v })} />
                  </div>
                )}
              />
            </Section>
          </TabsContent>

          {/* HERO */}
          <TabsContent value="hero" className="space-y-4">
            <Section title="Bannière d’accueil">
              <TextField label="Surtitre" value={content.hero.eyebrow} onChange={(v) => patch('hero', { eyebrow: v })} />
              <TextField label="Titre principal" value={content.hero.title} onChange={(v) => patch('hero', { title: v })} />
              <TextField label="Texte du bouton" value={content.hero.ctaLabel} onChange={(v) => patch('hero', { ctaLabel: v })} />
              <ImageField label="Image de fond" value={content.hero.image} onChange={(v) => patch('hero', { image: v })} />
              <TextField
                label="Texte alternatif de l’image"
                value={content.hero.imageAlt}
                onChange={(v) => patch('hero', { imageAlt: v })}
              />
              <Button variant="ghost" size="sm" onClick={() => resetSection('hero')}>
                <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Réinitialiser cette section
              </Button>
            </Section>
          </TabsContent>

          {/* SERVICES */}
          <TabsContent value="services" className="space-y-4">
            <Section title="Cartes de services (haut de page)">
              <ListEditor
                label="Services"
                items={content.services}
                onChange={(items) => set('services', items)}
                create={() => ({
                  id: `service-${Date.now()}`,
                  title: 'NOUVEAU SERVICE',
                  subtitle: '',
                  iconName: 'ship' as IconName,
                  description: '',
                })}
                title={(item) => item.title}
                render={(item, update) => (
                  <div className="space-y-3">
                    <div className="grid gap-3 sm:grid-cols-3">
                      <TextField label="Titre" value={item.title} onChange={(v) => update({ title: v })} />
                      <TextField label="Sous-titre" value={item.subtitle} onChange={(v) => update({ subtitle: v })} />
                      <IconSelect value={item.iconName} onChange={(v) => update({ iconName: v })} />
                    </div>
                    <AreaField
                      label="Description"
                      rows={2}
                      value={item.description}
                      onChange={(v) => update({ description: v })}
                    />
                  </div>
                )}
              />
            </Section>
          </TabsContent>

          {/* WHY */}
          <TabsContent value="why" className="space-y-4">
            <Section title="Pourquoi nous choisir">
              <TextField label="Titre de la section" value={content.why.heading} onChange={(v) => patch('why', { heading: v })} />
              <ListEditor
                label="Étapes"
                items={content.why.steps}
                onChange={(steps) => patch('why', { steps })}
                create={() => ({ id: `step-${Date.now()}`, title: 'Nouveau', description: '' })}
                title={(item) => item.title.replace('\n', ' ')}
                render={(item, update) => (
                  <div className="space-y-3">
                    <AreaField
                      label="Titre (retour à la ligne autorisé)"
                      rows={2}
                      value={item.title}
                      onChange={(v) => update({ title: v })}
                    />
                    <AreaField label="Description" rows={3} value={item.description} onChange={(v) => update({ description: v })} />
                  </div>
                )}
              />
            </Section>
          </TabsContent>

          {/* ABOUT */}
          <TabsContent value="about" className="space-y-4">
            <Section title="Section « À propos »">
              <AreaField label="Paragraphe 1" value={content.about.paragraph1} onChange={(v) => patch('about', { paragraph1: v })} />
              <AreaField label="Paragraphe 2" value={content.about.paragraph2} onChange={(v) => patch('about', { paragraph2: v })} />
              <ImageField label="Image" value={content.about.image} onChange={(v) => patch('about', { image: v })} />
              <TextField label="Texte alternatif" value={content.about.imageAlt} onChange={(v) => patch('about', { imageAlt: v })} />
              <div className="grid gap-3 sm:grid-cols-2">
                <TextField label="Badge — titre" value={content.about.badgeTitle} onChange={(v) => patch('about', { badgeTitle: v })} />
                <TextField
                  label="Badge — sous-titre"
                  value={content.about.badgeSubtitle}
                  onChange={(v) => patch('about', { badgeSubtitle: v })}
                />
              </div>
              <ListEditor
                label="Bureaux / hubs"
                items={content.about.hubs}
                onChange={(hubs) => patch('about', { hubs })}
                create={() => ({ city: 'Ville', country: 'Pays', role: 'Rôle' })}
                title={(item) => item.city}
                render={(item, update) => (
                  <div className="grid gap-3 sm:grid-cols-3">
                    <TextField label="Ville" value={item.city} onChange={(v) => update({ city: v })} />
                    <TextField label="Pays" value={item.country} onChange={(v) => update({ country: v })} />
                    <TextField label="Rôle" value={item.role} onChange={(v) => update({ role: v })} />
                  </div>
                )}
              />
            </Section>
          </TabsContent>

          {/* DIFFERENCE */}
          <TabsContent value="difference" className="space-y-4">
            <Section title="Section « Freight Company With a Difference »">
              <div className="grid gap-3 sm:grid-cols-3">
                <TextField label="Titre ligne 1" value={content.difference.titleLine1} onChange={(v) => patch('difference', { titleLine1: v })} />
                <TextField label="Titre ligne 2" value={content.difference.titleLine2} onChange={(v) => patch('difference', { titleLine2: v })} />
                <TextField label="Mot mis en avant" value={content.difference.titleHighlight} onChange={(v) => patch('difference', { titleHighlight: v })} />
              </div>
              <AreaField label="Description" value={content.difference.description} onChange={(v) => patch('difference', { description: v })} />
              <div className="grid gap-3 sm:grid-cols-2">
                <TextField label="Nom du dirigeant" value={content.difference.founderName} onChange={(v) => patch('difference', { founderName: v })} />
                <TextField label="Fonction" value={content.difference.founderRole} onChange={(v) => patch('difference', { founderRole: v })} />
                <TextField label="Texte du bouton" value={content.difference.ctaLabel} onChange={(v) => patch('difference', { ctaLabel: v })} />
                <TextField label="Lien du bouton" value={content.difference.ctaHref} onChange={(v) => patch('difference', { ctaHref: v })} />
              </div>
              <ListEditor
                label="Cartes"
                items={content.difference.cards}
                onChange={(cards) => patch('difference', { cards })}
                create={() => ({ id: `card-${Date.now()}`, title: 'NOUVELLE CARTE', description: '', image: '', alt: '' })}
                title={(item) => item.title}
                render={(item, update) => (
                  <div className="space-y-3">
                    <TextField label="Titre" value={item.title} onChange={(v) => update({ title: v })} />
                    <AreaField label="Description" rows={3} value={item.description} onChange={(v) => update({ description: v })} />
                    <ImageField label="Image" value={item.image} onChange={(v) => update({ image: v })} />
                    <TextField label="Texte alternatif" value={item.alt} onChange={(v) => update({ alt: v })} />
                  </div>
                )}
              />
            </Section>
          </TabsContent>

          {/* UNMATCHED */}
          <TabsContent value="unmatched" className="space-y-4">
            <Section title="Section sombre « Unmatched Services »">
              <AreaField
                label="Titre"
                rows={4}
                hint="Un retour à la ligne = une nouvelle ligne affichée."
                value={content.unmatched.title}
                onChange={(v) => patch('unmatched', { title: v })}
              />
              <AreaField label="Note en bas à gauche" rows={2} value={content.unmatched.note} onChange={(v) => patch('unmatched', { note: v })} />
              <ListEditor
                label="Services détaillés"
                items={content.unmatched.services}
                onChange={(services) => patch('unmatched', { services })}
                create={() => ({
                  id: `unmatched-${Date.now()}`,
                  title: 'NOUVEAU SERVICE',
                  subtitle: '',
                  iconName: 'ship' as IconName,
                  description: '',
                })}
                title={(item) => item.title}
                render={(item, update) => (
                  <div className="space-y-3">
                    <div className="grid gap-3 sm:grid-cols-3">
                      <TextField label="Titre" value={item.title} onChange={(v) => update({ title: v })} />
                      <TextField label="Sous-titre" value={item.subtitle} onChange={(v) => update({ subtitle: v })} />
                      <IconSelect value={item.iconName} onChange={(v) => update({ iconName: v })} />
                    </div>
                    <AreaField label="Description" rows={3} value={item.description} onChange={(v) => update({ description: v })} />
                  </div>
                )}
              />
            </Section>
          </TabsContent>

          {/* FOOTER */}
          <TabsContent value="footer" className="space-y-4">
            <Section title="Pied de page">
              <AreaField label="Description" value={content.footer.description} onChange={(v) => patch('footer', { description: v })} />
              <div className="grid gap-3 sm:grid-cols-3">
                <TextField label="Titre colonne services" value={content.footer.servicesTitle} onChange={(v) => patch('footer', { servicesTitle: v })} />
                <TextField label="Titre colonne outlook" value={content.footer.outlookTitle} onChange={(v) => patch('footer', { outlookTitle: v })} />
                <TextField label="Titre newsletter" value={content.footer.subscribeTitle} onChange={(v) => patch('footer', { subscribeTitle: v })} />
              </div>
              <AreaField label="Texte newsletter" rows={2} value={content.footer.subscribeText} onChange={(v) => patch('footer', { subscribeText: v })} />
              <TextField label="Mention de copyright" value={content.footer.copyright} onChange={(v) => patch('footer', { copyright: v })} />
              <div className="grid gap-3 sm:grid-cols-2">
                <TextField label="Twitter / X" value={content.footer.socials.twitter} onChange={(v) => patch('footer', { socials: { ...content.footer.socials, twitter: v } })} />
                <TextField label="Facebook" value={content.footer.socials.facebook} onChange={(v) => patch('footer', { socials: { ...content.footer.socials, facebook: v } })} />
                <TextField label="YouTube" value={content.footer.socials.youtube} onChange={(v) => patch('footer', { socials: { ...content.footer.socials, youtube: v } })} />
                <TextField label="LinkedIn" value={content.footer.socials.linkedin} onChange={(v) => patch('footer', { socials: { ...content.footer.socials, linkedin: v } })} />
              </div>
              <ListEditor
                label="Liens services"
                items={content.footer.servicesLinks.map((label) => ({ label }))}
                onChange={(items) => patch('footer', { servicesLinks: items.map((i) => i.label) })}
                create={() => ({ label: 'Nouveau lien' })}
                title={(item) => item.label}
                render={(item, update) => (
                  <TextField label="Libellé" value={item.label} onChange={(v) => update({ label: v })} />
                )}
              />
              <ListEditor
                label="Liens légaux"
                items={content.footer.legalLinks}
                onChange={(legalLinks) => patch('footer', { legalLinks })}
                create={() => ({ label: 'Nouveau lien', href: '#home' })}
                title={(item) => item.label}
                render={(item, update) => (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <TextField label="Libellé" value={item.label} onChange={(v) => update({ label: v })} />
                    <TextField label="Lien" value={item.href} onChange={(v) => update({ href: v })} />
                  </div>
                )}
              />
            </Section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

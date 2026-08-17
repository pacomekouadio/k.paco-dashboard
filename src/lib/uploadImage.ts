import { supabase } from '@/integrations/supabase/client';

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

export async function uploadSiteImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage.from('site-images').upload(path, file, {
    cacheControl: '31536000',
    upsert: false,
  });
  if (error) throw error;

  const { data, error: signError } = await supabase.storage
    .from('site-images')
    .createSignedUrl(path, TEN_YEARS);
  if (signError || !data?.signedUrl) throw signError ?? new Error('Impossible de générer le lien de l’image');

  return data.signedUrl;
}

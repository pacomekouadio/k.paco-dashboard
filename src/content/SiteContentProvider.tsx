import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { defaultContent, mergeContent, type SiteContent } from './schema';

export const CONTENT_KEY = 'site';

interface Ctx {
  content: SiteContent;
  loading: boolean;
  refresh: () => Promise<void>;
}

const SiteContentContext = createContext<Ctx>({
  content: defaultContent,
  loading: false,
  refresh: async () => {},
});

export async function fetchSiteContent(): Promise<SiteContent> {
  const { data, error } = await supabase
    .from('site_content')
    .select('value')
    .eq('key', CONTENT_KEY)
    .maybeSingle();
  if (error) {
    console.error('Failed to load site content', error);
    return defaultContent;
  }
  return mergeContent(data?.value ?? null);
}

export async function saveSiteContent(content: SiteContent) {
  const { error } = await supabase
    .from('site_content')
    .upsert({ key: CONTENT_KEY, value: content as unknown as never, updated_at: new Date().toISOString() });
  if (error) throw error;
}

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const next = await fetchSiteContent();
    setContent(next);
    setLoading(false);
  };

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <SiteContentContext.Provider value={{ content, loading, refresh }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export function useSiteContent() {
  return useContext(SiteContentContext).content;
}

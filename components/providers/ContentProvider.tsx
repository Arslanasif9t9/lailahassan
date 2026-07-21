"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { defaultContent, mergeContent, type SiteContent } from "@/data/content";
import { getSupabase } from "@/lib/supabase";

/**
 * Holds the live site content. Initial value === the baked defaults, so the
 * static HTML (and first client render) match perfectly — no hydration flash.
 * After mount we fetch the admin-edited document from Supabase and swap it in.
 */
const ContentContext = createContext<SiteContent>(defaultContent);

export function useContent(): SiteContent {
  return useContext(ContentContext);
}

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;

    let active = true;
    sb.from("site_content")
      .select("data")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active || error || !data?.data) return;
        setContent(mergeContent(data.data as Partial<SiteContent>));
      });

    return () => {
      active = false;
    };
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

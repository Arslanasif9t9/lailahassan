import { ContentProvider } from "@/components/providers/ContentProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";

/**
 * Layout for the public marketing site. Everything here reads live content from
 * Supabase via ContentProvider (with the baked defaults as the initial value).
 * The /admin route lives outside this group, so it gets none of this chrome.
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContentProvider>
      <LenisProvider>
        <Navbar />
        {children}
        <Footer />
        <BottomNav />
      </LenisProvider>
    </ContentProvider>
  );
}

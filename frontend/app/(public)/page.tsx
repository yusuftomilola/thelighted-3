import { headers } from "next/headers";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { Hero } from "@/app/components/home/Hero";
import { TrendingSection } from "@/app/components/features/TrendingSection";
import { AboutSection } from "@/app/components/features/AboutSection";
import { Gallery } from "@/app/components/features/Gallery";
import { InstagramFeed } from "@/app/components/features/InstagramFeed";
import { TestimonialsSection } from "@/app/components/features/TestimonialsSection";
import { ContactForm } from "@/app/components/features/ContactForm";

function getFirstSubdomain(host: string | null): string | null {
  if (!host) {
    return null;
  }

  const hostname = host.split(":")[0].trim().toLowerCase();

  if (!hostname) {
    return null;
  }

  const segments = hostname.split(".").filter(Boolean);

  if (hostname.includes("localhost")) {
    return segments.length > 1 ? segments[0] : null;
  }

  return segments.length > 2 ? segments[0] : null;
}

export default async function PublicHomepage() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  const subdomain = getFirstSubdomain(host);

  return (
    <div data-subdomain={subdomain ?? undefined}>
      <Header />
      <main>
        <Hero />
        <TrendingSection />
        <AboutSection />
        <Gallery />
        <InstagramFeed />
        <TestimonialsSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

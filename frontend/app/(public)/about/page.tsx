import type { Metadata } from "next";
import { AboutSection } from "@/components/features/AboutSection";
import { OpeningHours } from "@/components/features/OpeningHours";

export const metadata: Metadata = {
  title: "About Us | Savoria Restaurant",
  description:
    "Learn the story behind Savoria Restaurant and plan your visit with our opening hours and location details.",
  openGraph: {
    title: "About Savoria Restaurant",
    description:
      "Discover our story, our passion for hospitality, and the best time to visit Savoria Restaurant.",
    type: "website",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <main>
      <AboutSection />

      <section className="bg-gradient-to-b from-orange-50 via-white to-amber-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
              Visit Us
            </p>
            <h2 className="font-serif text-4xl font-bold text-slate-900 md:text-5xl">
              Come By and Make Yourself at Home
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
              Stop in for a relaxed meal, a special occasion, or your next favorite
              dish. Here are our opening hours so you can plan the perfect visit.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            <OpeningHours />
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/Button";
import { Container } from "@/app/components/ui/Container";

export default function NotFound(): React.JSX.Element {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-100 text-slate-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[-6rem] top-16 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl" />
          <div className="absolute right-[-5rem] top-20 h-80 w-80 rounded-full bg-rose-300/20 blur-3xl" />
          <div className="absolute bottom-[-7rem] left-1/3 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
        </div>

        <Container className="flex min-h-screen items-center justify-center py-16">
          <motion.section
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full max-w-3xl rounded-[2rem] border border-white/60 bg-white/80 p-8 text-center shadow-2xl shadow-orange-200/40 backdrop-blur md:p-12"
          >
            <div className="mb-6 text-5xl md:text-6xl" aria-hidden="true">
              🍕 🍔 🌮
            </div>

            <h1 className="bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 bg-clip-text font-serif text-7xl font-bold text-transparent md:text-9xl">
              404
            </h1>

            <h2 className="mt-6 font-serif text-3xl font-bold text-slate-900 md:text-4xl">
              Oops! Page Not Found
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              This page seems to have wandered off before the meal was served.
              Let&apos;s get you back to something delicious.
            </p>

            <div
              className="mt-8 flex flex-wrap items-center justify-center gap-3 text-2xl"
              aria-hidden="true"
            >
              <span>🍝</span>
              <span>🥗</span>
              <span>🍜</span>
              <span>🍰</span>
              <span>☕</span>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                type="button"
                size="lg"
                onClick={() => router.push("/")}
                className="min-w-44"
              >
                Back to Home
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={() => router.push("/menu")}
                className="min-w-44 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white"
              >
                View Menu
              </Button>
            </div>
          </motion.section>
        </Container>
      </div>
    </main>
  );
}

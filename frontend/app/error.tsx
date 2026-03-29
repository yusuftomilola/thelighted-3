"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ChevronDown, Home, RotateCcw } from "lucide-react";
import { Container } from "@/app/components/ui/Container";
import { Button } from "@/app/components/ui/Button";

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const isDevelopment = process.env.NODE_ENV === "development";

export default function Error({
  error,
  reset,
}: ErrorBoundaryProps) {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-100 text-slate-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[-8rem] top-12 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl" />
          <div className="absolute right-[-5rem] top-24 h-80 w-80 rounded-full bg-red-300/20 blur-3xl" />
          <div className="absolute bottom-[-6rem] left-1/3 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
        </div>

        <Container className="flex min-h-screen items-center justify-center py-16">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full max-w-3xl rounded-[2rem] border border-white/60 bg-white/80 p-8 shadow-2xl shadow-orange-200/40 backdrop-blur md:p-12"
          >
            <div className="mx-auto max-w-2xl text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-200"
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <AlertTriangle className="h-10 w-10" />
                </motion.div>
              </motion.div>

              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
                Service Interruption
              </p>
              <h1 className="font-serif text-4xl font-bold text-slate-900 md:text-5xl">
                Something went wrong
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
                We hit an unexpected issue while loading this page. Please try again,
                or head back home and continue exploring the restaurant.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  type="button"
                  size="lg"
                  onClick={() => reset()}
                  className="min-w-44"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Try Again
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => router.push("/")}
                  className="min-w-44 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Button>
              </div>

              {isDevelopment && (
                <div className="mt-10 rounded-2xl border border-orange-200 bg-orange-50/70 text-left">
                  <button
                    type="button"
                    onClick={() => setShowDetails((current) => !current)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-orange-900"
                    aria-expanded={showDetails}
                  >
                    <span>Developer Details</span>
                    <motion.span
                      animate={{ rotate: showDetails ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {showDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-orange-200 px-5 py-4 text-sm text-slate-700">
                          <p className="font-semibold text-slate-900">
                            Message
                          </p>
                          <p className="mt-1 break-words">
                            {error.message || "No error message provided."}
                          </p>
                          <p className="mt-4 font-semibold text-slate-900">
                            Digest
                          </p>
                          <p className="mt-1 break-all">
                            {error.digest ?? "No digest available."}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.section>
        </Container>
      </div>
    </main>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface AdminErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AdminErrorBoundary({ error, reset }: AdminErrorBoundaryProps) {
  const router = useRouter();
  const showDevDetails = process.env.NODE_ENV === "development";

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-gray-50 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
        className="text-red-500"
      >
        <AlertTriangle size={72} />
      </motion.div>

      <div className="max-w-xl space-y-3">
        <h1 className="text-3xl font-semibold text-gray-900">Something went wrong</h1>
        <p className="text-sm text-gray-600">
          We hit a snag while loading this admin page. You can try to continue below or head back to a safer place.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-transparent bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Try Again
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/dashboard")}
          className="rounded-lg border border-blue-600 px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          Go to Dashboard
        </button>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          Go to Main Site
        </button>
      </div>

      {showDevDetails && (
        <details className="w-full max-w-2xl rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm">
          <summary className="cursor-pointer text-sm font-semibold text-gray-800">
            Development details
          </summary>
          <div className="mt-3 space-y-1 text-xs text-gray-700">
            <p>
              <span className="font-semibold">Message:</span> {error.message}
            </p>
            <p>
              <span className="font-semibold">Digest:</span> {error.digest ?? "N/A"}
            </p>
          </div>
        </details>
      )}
    </div>
  );
}

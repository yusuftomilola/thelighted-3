"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminNotFound() {
  const router = useRouter();

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-950 text-white px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-8xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
        404 🔒
      </h1>
      <p className="text-xl text-gray-400 text-center max-w-md">
        This page doesn&apos;t exist in the admin panel.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => router.push("/admin/dashboard")}
          className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
        >
          Go to Dashboard
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
        >
          Main Site
        </button>
        <button
          onClick={() => router.back()}
          className="px-5 py-2 rounded-lg border border-gray-600 hover:bg-gray-800 transition"
        >
          Go Back
        </button>
      </div>
    </motion.div>
  );
}

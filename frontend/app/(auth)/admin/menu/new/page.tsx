"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/api/admin";
import { MenuForm } from "@/app/components/admin/menu/MenuForm";

export default function NewMenuItemPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await adminApi.createMenuItem(data);
      router.push("/admin/menu");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add Menu Item</h1>
      <MenuForm onSubmit={handleSubmit} isSubmitting={isSubmitting} submitLabel="Create Menu Item" />
    </div>
  );
}

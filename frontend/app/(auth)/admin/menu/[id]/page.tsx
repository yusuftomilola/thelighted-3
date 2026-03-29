"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/admin";
import { MenuForm } from "@/app/components/admin/menu/MenuForm";

export default function EditMenuItemPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: item, isLoading, isError } = useQuery({
    queryKey: ["menu-item", id],
    queryFn: () => adminApi.getMenuItem(id),
  });

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await adminApi.updateMenuItem(id, data);
      router.push("/admin/menu");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p className="p-8 text-center">Loading...</p>;
  if (isError || !item) return <p className="p-8 text-center text-red-500">Failed to load menu item.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Menu Item</h1>
      <MenuForm initialData={item} onSubmit={handleSubmit} isSubmitting={isSubmitting} submitLabel="Update Menu Item" />
    </div>
  );
}

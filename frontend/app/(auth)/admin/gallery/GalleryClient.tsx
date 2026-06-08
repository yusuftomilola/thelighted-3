"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { ImageIcon, Eye, EyeOff, Tag, Plus } from "lucide-react";
import { adminApi, GalleryImage } from "@/lib/api/admin";
import { AdminRole } from "@/lib/types/user";
import { RoleProtectedPage } from "@/app/components/admin/RoleProtectedPage";
import { GalleryTable } from "@/app/components/admin/gallery/GalleryTable";
import DeleteConfirmDialog from "@/app/components/admin/gallery/DeleteConfirmDialog";

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className="p-3 bg-orange-100 rounded-lg">
          <Icon className="w-6 h-6 text-orange-600" />
        </div>
      </div>
    </div>
  );
}

export default function GalleryClient() {
  const queryClient = useQueryClient();
  const [deleteTarget, setDeleteTarget] = useState<GalleryImage | null>(null);

  const { data: images = [], isLoading, isError } = useQuery({
    queryKey: ["galleryImages"],
    queryFn: () => adminApi.getAllGalleryImages(),
  });

  const toggleMutation = useMutation({
    mutationFn: (id: string) => adminApi.toggleGalleryImageVisibility(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["galleryImages"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteGalleryImage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galleryImages"] });
      setDeleteTarget(null);
    },
  });

  const total = images.length;
  const visible = images.filter((img: GalleryImage) => img.isVisible).length;
  const hidden = images.filter((img: GalleryImage) => !img.isVisible).length;
  const categories = new Set(images.map((img: GalleryImage) => img.category)).size;

  return (
    <RoleProtectedPage
      allowedRoles={[
        AdminRole.SUPER_ADMIN,
        AdminRole.ADMIN,
        AdminRole.MANAGER,
        AdminRole.STAFF,
      ]}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
          <Link
            href="/admin/gallery/new"
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Image
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : isError ? (
          <p className="text-red-500">Failed to load gallery images.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Images" value={total} icon={ImageIcon} />
              <StatCard label="Visible" value={visible} icon={Eye} />
              <StatCard label="Hidden" value={hidden} icon={EyeOff} />
              <StatCard label="Categories" value={categories} icon={Tag} />
            </div>

            <GalleryTable
              images={images}
              onToggleVisibility={(id) => toggleMutation.mutate(id)}
              onDelete={async (id) => setDeleteTarget(images.find((img) => img.id === id) ?? null)}
            />
          </>
        )}
      </div>

      <DeleteConfirmDialog
        isOpen={!!deleteTarget}
        imageAlt={deleteTarget?.alt ?? ""}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
        onCancel={() => setDeleteTarget(null)}
        isDeleting={deleteMutation.isPending}
      />
    </RoleProtectedPage>
  );
}

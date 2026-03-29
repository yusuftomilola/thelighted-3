"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GalleryForm, GalleryFormData } from "./GalleryForm";
import { adminApi } from "@/lib/api/admin";
import type { GalleryImage } from "@/lib/api/admin";

interface GalleryFormWrapperProps {
  mode: "create" | "edit";
  initialData?: Partial<GalleryFormData>;
  imageId?: string;
}

export default function GalleryFormWrapper({ 
  mode, 
  initialData,
  imageId 
}: GalleryFormWrapperProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // For edit mode, fetch the image data
  const { data: imageResponse, isLoading, error } = useQuery({
    queryKey: ["gallery-image", imageId],
    queryFn: () => adminApi.getGalleryImage(imageId!),
    enabled: mode === "edit" && !!imageId,
  });

  const image = imageResponse;

  const createMutation = useMutation({
    mutationFn: adminApi.createGalleryImage,
    onSuccess: () => {
      router.push("/admin/gallery");
    },
    onError: (error) => {
      console.error("Failed to create gallery image:", error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<GalleryImage> }) =>
      adminApi.updateGalleryImage(id, data),
    onSuccess: () => {
      router.push("/admin/gallery");
    },
    onError: (error) => {
      console.error("Failed to update gallery image:", error);
    },
  });

  const handleSubmit = async (data: GalleryFormData) => {
    setIsSubmitting(true);
    try {
      if (mode === "create") {
        await createMutation.mutateAsync(data);
      } else if (mode === "edit" && imageId) {
        await updateMutation.mutateAsync({ id: imageId, data });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (mode === "edit" && isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-orange-600 border-t-transparent"></div>
          <p className="text-sm font-medium text-gray-700">Loading gallery image...</p>
        </div>
      </div>
    );
  }

  if (mode === "edit" && error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium text-red-600">
            Failed to load gallery image. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const submitLabel = mode === "create" ? "Add to Gallery" : "Update Image";
  const formData = mode === "edit" && image ? image : initialData;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {mode === "create" ? "Add to Gallery" : "Update Image"}
        </h1>
        <p className="mt-2 text-gray-600">
          {mode === "create" 
            ? "Add a new image to your gallery collection."
            : "Update the gallery image details."
          }
        </p>
      </div>

      <GalleryForm
        initialData={formData}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel={submitLabel}
      />
    </div>
  );
}

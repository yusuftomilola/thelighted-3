"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { InstagramForm, InstagramFormData } from "./InstagramForm";
import { instagramApi } from "@/lib/api/api";
import { InstagramPost } from "@/lib/types";

interface InstagramFormWrapperProps {
  mode: "create" | "edit";
  initialData?: Partial<InstagramFormData>;
  postId?: string;
}

export default function InstagramFormWrapper({ 
  mode, 
  initialData,
  postId 
}: InstagramFormWrapperProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // For edit mode, fetch the post data
  const { data: postResponse, isLoading, error } = useQuery({
    queryKey: ["instagram-post", postId],
    queryFn: () => instagramApi.getById(postId!),
    enabled: mode === "edit" && !!postId,
  });

  const post = postResponse?.data;

  const createMutation = useMutation({
    mutationFn: (data: InstagramFormData) => instagramApi.create(data),
    onSuccess: () => {
      router.push("/admin/instagram");
    },
    onError: (error) => {
      console.error("Failed to create Instagram post:", error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InstagramPost> }) =>
      instagramApi.update(id, data),
    onSuccess: () => {
      router.push("/admin/instagram");
    },
    onError: (error) => {
      console.error("Failed to update Instagram post:", error);
    },
  });

  const handleSubmit = async (data: InstagramFormData) => {
    setIsSubmitting(true);
    try {
      if (mode === "create") {
        await createMutation.mutateAsync(data);
      } else if (mode === "edit" && postId) {
        await updateMutation.mutateAsync({ id: postId, data });
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
          <p className="text-sm font-medium text-gray-700">Loading Instagram post...</p>
        </div>
      </div>
    );
  }

  if (mode === "edit" && error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium text-red-600">
            Failed to load Instagram post. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const submitLabel = mode === "create" ? "Create Post" : "Update Post";
  const formData = mode === "edit" && post ? post : initialData;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {mode === "create" ? "Add Instagram Post" : "Edit Instagram Post"}
        </h1>
        <p className="mt-2 text-gray-600">
          {mode === "create" 
            ? "Add a new Instagram post to display on your website."
            : "Update the Instagram post details."
          }
        </p>
      </div>

      <InstagramForm
        initialData={formData}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel={submitLabel}
      />
    </div>
  );
}

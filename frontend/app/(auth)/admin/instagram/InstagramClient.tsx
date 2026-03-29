"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Plus, Instagram as InstagramIcon, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { adminApi } from "@/lib/api/admin";
import { InstagramTable } from "@/components/admin/instagram/InstagramTable";
import { Button } from "@/components/ui/Button";
import type { InstagramPost } from "@/lib/api/admin";

export default function InstagramClient() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch Instagram posts
  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["instagram-posts"],
    queryFn: () => adminApi.getAllInstagramPosts(),
  });

  // Toggle visibility mutation
  const toggleVisibilityMutation = useMutation({
    mutationFn: adminApi.toggleInstagramPostVisibility,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instagram-posts"] });
      toast.success("Post visibility updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update post visibility");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteInstagramPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instagram-posts"] });
      toast.success("Instagram post deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete post");
    },
  });

  // Calculate stats
  const stats = {
    total: posts.length,
    visible: posts.filter((post: InstagramPost) => post.isVisible).length,
    hidden: posts.filter((post: InstagramPost) => !post.isVisible).length,
  };

  const handleToggleVisibility = (id: string) => {
    toggleVisibilityMutation.mutate(id);
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Instagram Posts</h1>
            <p className="mt-2 text-gray-600">Manage your Instagram feed</p>
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Stats skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Table skeleton */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <InstagramIcon className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Failed to load Instagram posts
          </h3>
          <p className="text-gray-600 mb-4">
            Please check your connection and try again.
          </p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Instagram Posts</h1>
          <p className="mt-2 text-gray-600">Manage your Instagram feed</p>
        </div>
        <Button
          onClick={() => router.push("/admin/instagram/new")}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <InstagramIcon className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Posts</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Visible</p>
              <p className="text-2xl font-bold text-gray-900">{stats.visible}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <EyeOff className="w-4 h-4 text-gray-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Hidden</p>
              <p className="text-2xl font-bold text-gray-900">{stats.hidden}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <InstagramTable
          posts={posts}
          onToggleVisibility={handleToggleVisibility}
          onDelete={handleDelete}
        />
      </motion.div>

      {/* Empty state */}
      {posts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <InstagramIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Instagram posts yet
          </h3>
          <p className="text-gray-600 mb-6">
            Get started by adding your first Instagram post to the feed.
          </p>
          <Button
            onClick={() => router.push("/admin/instagram/new")}
            className="flex items-center gap-2 mx-auto"
          >
            <Plus className="w-4 h-4" />
            Add Your First Post
          </Button>
        </motion.div>
      )}
    </div>
  );
}

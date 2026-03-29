"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { ImageUpload } from "../../ui/ImageUpload";
import { cn } from "@/lib/utils";
import type { GalleryCategory } from "@/lib/api/admin";

const galleryImageSchema = z.object({
  imageUrl: z.string().min(1, "Image is required"),
  alt: z.string().min(1, "Alt text is required"),
  category: z.enum(["food", "ambiance", "kitchen", "events", "drinks"]),
  isVisible: z.boolean().optional(),
  displayOrder: z.number().min(0).optional(),
});

export type GalleryFormData = z.infer<typeof galleryImageSchema>;

interface GalleryFormProps {
  initialData?: Partial<GalleryFormData>;
  onSubmit: (data: GalleryFormData) => Promise<void>;
  isSubmitting: boolean;
  submitLabel?: string;
}

const categories: { value: GalleryCategory; label: string }[] = [
  { value: "food", label: "Food" },
  { value: "ambiance", label: "Ambiance" },
  { value: "kitchen", label: "Kitchen" },
  { value: "events", label: "Events" },
  { value: "drinks", label: "Drinks" },
];

export function GalleryForm({
  initialData,
  onSubmit,
  isSubmitting,
  submitLabel = "Save Image",
}: GalleryFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<GalleryFormData>({
    resolver: zodResolver(galleryImageSchema),
    defaultValues: {
      isVisible: true,
      displayOrder: 0,
      imageUrl: "",
      alt: "",
      category: "food",
      ...initialData,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Image Upload */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery Image</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image *
            </label>
            <Controller
              name="imageUrl"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.imageUrl?.message}
                  disabled={isSubmitting}
                />
              )}
            />
            <p className="mt-2 text-xs text-gray-500">
              Upload a high-quality image. Recommended: 1920x1080px (16:9 ratio)
              for gallery display.
            </p>
          </div>
        </div>
      </div>

      {/* Image Details */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Image Details
        </h3>

        <div className="space-y-6">
          {/* Alt Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alt Text *
            </label>
            <Input
              {...register("alt")}
              placeholder="Describe the image for accessibility..."
              error={errors.alt?.message}
              disabled={isSubmitting}
            />
            <p className="mt-1 text-xs text-gray-500">
              This description helps with SEO and accessibility for visually impaired users.
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              {...register("category")}
              disabled={isSubmitting}
              className={cn(
                "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent",
                errors.category?.message
                  ? "border-red-300"
                  : "border-gray-300"
              )}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.category?.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.category.message}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Select the category that best describes this image.
            </p>
          </div>

          {/* Display Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Order
            </label>
            <Input
              type="number"
              min="0"
              {...register("displayOrder", { valueAsNumber: true })}
              placeholder="0"
              disabled={isSubmitting}
            />
            <p className="mt-1 text-xs text-gray-500">
              Lower numbers appear first. Use this to manually order your gallery images.
            </p>
          </div>

          {/* Visibility Toggle */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("isVisible")}
                disabled={isSubmitting}
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 disabled:opacity-50"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">
                  Visible on Website
                </span>
                <p className="text-xs text-gray-500">
                  Uncheck to hide this image from the gallery section
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="min-w-[200px]"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Saving...
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  );
}

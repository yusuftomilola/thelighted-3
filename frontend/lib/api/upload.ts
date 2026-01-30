import { useAuthStore } from "@/lib/store/authStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9001/api";

export interface UploadImageResponse {
  message: string;
  data: {
    url: string;
    publicId: string;
    width: number;
    height: number;
    format: string;
  };
}

export class UploadError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any,
  ) {
    super(message);
    this.name = "UploadError";
  }
}

export const uploadApi = {
  uploadImage: async (file: File): Promise<UploadImageResponse> => {
    const token = useAuthStore.getState().token;

    if (!token) {
      throw new UploadError("Authentication required", 401);
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      throw new UploadError(
        "Invalid file type. Only JPEG, PNG, and WebP images are allowed",
        400,
      );
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new UploadError("File size must be less than 5MB", 400);
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/upload/image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new UploadError(
          errorData.message || "Failed to upload image",
          response.status,
          errorData,
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof UploadError) {
        throw error;
      }
      throw new UploadError(
        error instanceof Error ? error.message : "Upload failed",
        500,
      );
    }
  },
};

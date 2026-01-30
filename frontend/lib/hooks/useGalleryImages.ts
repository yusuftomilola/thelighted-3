import { useQuery } from "@tanstack/react-query";
import { galleryApi } from "@/lib/api/api";
import { GalleryImage } from "@/lib/api/admin";

export function useGalleryImages() {
return useQuery({
queryKey: ["gallery-images"],
queryFn: async () => {
const response = await galleryApi.getImages();
if (response.success && response.data) {
return response.data;
}
throw new Error(response.error || "Failed to load gallery images");
},
staleTime: 5 _ 60 _ 1000,
gcTime: 30 _ 60 _ 1000,
retry: 2,
});
}
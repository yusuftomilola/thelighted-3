import { Metadata } from "next";
import GalleryFormWrapper from "@/components/admin/gallery/GalleryFormWrapper";
import { RoleProtectedPage } from "@/components/admin/RoleProtectedPage";
import { AdminRole } from "@/lib/types/user";

export const metadata: Metadata = {
  title: "Add Gallery Image",
};

export default function NewGalleryImagePage() {
  return (
    <RoleProtectedPage allowedRoles={[AdminRole.ADMIN, AdminRole.SUPER_ADMIN, AdminRole.MANAGER]}>
      <GalleryFormWrapper mode="create" />
    </RoleProtectedPage>
  );
}

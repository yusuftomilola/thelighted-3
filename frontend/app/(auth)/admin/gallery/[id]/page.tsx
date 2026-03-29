"use client";

import { useParams } from "next/navigation";
import GalleryFormWrapper from "@/components/admin/gallery/GalleryFormWrapper";
import { RoleProtectedPage } from "@/components/admin/RoleProtectedPage";
import { AdminRole } from "@/lib/types/user";

export default function EditGalleryImagePage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <RoleProtectedPage allowedRoles={[AdminRole.ADMIN, AdminRole.SUPER_ADMIN, AdminRole.MANAGER]}>
      <GalleryFormWrapper mode="edit" imageId={id} />
    </RoleProtectedPage>
  );
}

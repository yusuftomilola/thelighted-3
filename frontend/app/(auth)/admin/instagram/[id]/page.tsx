"use client";

import { useParams } from "next/navigation";
import InstagramFormWrapper from "../../../../components/admin/instagram/InstagramFormWrapper";
import { RoleProtectedPage } from "../../../../components/admin/RoleProtectedPage";
import { AdminRole } from "@/lib/types/user";

export default function EditInstagramPostPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <RoleProtectedPage allowedRoles={[AdminRole.ADMIN, AdminRole.SUPER_ADMIN, AdminRole.MANAGER]}>
      <InstagramFormWrapper mode="edit" postId={id} />
    </RoleProtectedPage>
  );
}

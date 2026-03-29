import { Metadata } from "next";
import InstagramFormWrapper from "../../../../components/admin/instagram/InstagramFormWrapper";
import { RoleProtectedPage } from "../../../../components/admin/RoleProtectedPage";
import { AdminRole } from "@/lib/types/user";

export const metadata: Metadata = {
  title: "Add Instagram Post",
};

export default function NewInstagramPostPage() {
  return (
    <RoleProtectedPage allowedRoles={[AdminRole.ADMIN, AdminRole.SUPER_ADMIN, AdminRole.MANAGER]}>
      <InstagramFormWrapper mode="create" />
    </RoleProtectedPage>
  );
}

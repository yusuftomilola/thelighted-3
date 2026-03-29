import { Metadata } from "next";
import InstagramClient from "./InstagramClient";
import { RoleProtectedPage } from "@/components/admin/RoleProtectedPage";
import { AdminRole } from "@/lib/types/user";

export const metadata: Metadata = {
  title: "Instagram",
};

export default function InstagramManagementPage() {
  return (
    <RoleProtectedPage allowedRoles={[AdminRole.ADMIN, AdminRole.SUPER_ADMIN, AdminRole.MANAGER]}>
      <InstagramClient />
    </RoleProtectedPage>
  );
}

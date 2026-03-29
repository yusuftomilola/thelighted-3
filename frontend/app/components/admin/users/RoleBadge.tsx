import { AdminRole } from "@/lib/types/user";
import { cn } from "@/lib/utils";

const roleStyles: Record<AdminRole, string> = {
  [AdminRole.SUPER_ADMIN]: "bg-purple-900 text-purple-200",
  [AdminRole.ADMIN]: "bg-blue-900 text-blue-200",
  [AdminRole.MANAGER]: "bg-green-900 text-green-200",
  [AdminRole.STAFF]: "bg-gray-700 text-gray-200",
};

const roleLabels: Record<AdminRole, string> = {
  [AdminRole.SUPER_ADMIN]: "Super Admin",
  [AdminRole.ADMIN]: "Admin",
  [AdminRole.MANAGER]: "Manager",
  [AdminRole.STAFF]: "Staff",
};

interface RoleBadgeProps {
  role: AdminRole;
  className?: string;
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  return (
    <span className={cn("px-2 py-0.5 rounded-full text-xs font-semibold", roleStyles[role], className)}>
      {roleLabels[role]}
    </span>
  );
}

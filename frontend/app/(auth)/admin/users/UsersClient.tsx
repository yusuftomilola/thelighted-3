"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { adminApi } from "@/lib/api/admin";
import { useAuthStore } from "@/lib/store/authStore";
import { AdminRole, AdminUser } from "@/lib/types/user";
import RoleProtectedPage from "@/app/components/admin/RoleProtectedPage";
import UserTable from "@/app/components/admin/users/UserTable";

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

export default function UsersClient() {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const isSuperAdmin = user?.role === AdminRole.SUPER_ADMIN;

  const { data: allUsers = [], isLoading, error } = useQuery<AdminUser[]>({
    queryKey: ["admin-users"],
    queryFn: adminApi.getAdmins,
    staleTime: 60_000,
  });

  const users = isSuperAdmin
    ? allUsers
    : allUsers.filter((u) => u.role !== AdminRole.SUPER_ADMIN);

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      adminApi.toggleAdminStatus(id, isActive),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
  });

  const roleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: AdminRole }) =>
      adminApi.updateAdminRole(id, role),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
  });

  const total = users.length;
  const active = users.filter((u) => u.isActive).length;
  const inactive = total - active;
  const adminCount = users.filter(
    (u) => u.role === AdminRole.ADMIN || u.role === AdminRole.SUPER_ADMIN
  ).length;

  return (
    <RoleProtectedPage
      allowedRoles={[AdminRole.SUPER_ADMIN, AdminRole.ADMIN, AdminRole.MANAGER]}
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
          {isSuperAdmin && (
            <Link
              href="/admin/users/new"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Add User
            </Link>
          )}
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
            Failed to load users.
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl bg-gray-200" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard label="Total Users" value={total} />
            <StatCard label="Active" value={active} />
            <StatCard label="Inactive" value={inactive} />
            <StatCard label="Admin Count" value={adminCount} />
          </div>
        )}

        {isLoading ? (
          <div className="h-64 animate-pulse rounded-xl bg-gray-200" />
        ) : (
          <UserTable
            users={users}
            currentUserId={user?.id ?? ""}
            onToggleStatus={(id, isActive) => toggleMutation.mutate({ id, isActive })}
            onRoleChange={(id, role) => roleMutation.mutate({ id, role })}
          />
        )}
      </div>
    </RoleProtectedPage>
  );
}

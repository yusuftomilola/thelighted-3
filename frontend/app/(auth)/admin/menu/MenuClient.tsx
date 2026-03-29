"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { adminApi } from "@/lib/api/admin";
import MenuTable from "@/app/components/admin/menu/MenuTable";

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

export default function MenuClient() {
  const queryClient = useQueryClient();

  const { data: items = [], isLoading, error } = useQuery({
    queryKey: ["admin-menu-items"],
    queryFn: adminApi.getAllMenuItems,
    staleTime: 60_000,
  });

  const toggleMutation = useMutation({
    mutationFn: (id: string) => adminApi.toggleMenuItemAvailability(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-menu-items"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteMenuItem(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-menu-items"] }),
  });

  const total = items.length;
  const available = items.filter((i: any) => i.isAvailable).length;
  const unavailable = total - available;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Menu Management</h1>
        <Link
          href="/admin/menu/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Add Item
        </Link>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          Failed to load menu items.
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-gray-200" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Total Items" value={total} />
          <StatCard label="Available" value={available} />
          <StatCard label="Unavailable" value={unavailable} />
        </div>
      )}

      {isLoading ? (
        <div className="h-64 animate-pulse rounded-xl bg-gray-200" />
      ) : (
        <MenuTable
          items={items}
          onToggleAvailability={(id) => toggleMutation.mutate(id)}
          onDelete={(id) => deleteMutation.mutateAsync(id)}
        />
      )}
    </div>
  );
}

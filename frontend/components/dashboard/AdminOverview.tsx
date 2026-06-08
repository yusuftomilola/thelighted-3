"use client";
export default function AdminOverview({ stats }: { stats: any }) {
  if (!stats) return null;
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-white rounded-xl border p-4">
        <h3 className="font-semibold mb-2">Users</h3>
        <p className="text-sm text-gray-500">Total: {stats.users?.total ?? 0}</p>
        <p className="text-sm text-gray-500">Active: {stats.users?.active ?? 0}</p>
      </div>
      <div className="bg-white rounded-xl border p-4">
        <h3 className="font-semibold mb-2">Newsletter</h3>
        <p className="text-sm text-gray-500">Total: {stats.newsletter?.total ?? 0}</p>
        <p className="text-sm text-gray-500">Verified: {stats.newsletter?.verified ?? 0}</p>
      </div>
    </div>
  );
}

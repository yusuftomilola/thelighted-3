"use client";
export default function AdminUserTable({
  initialData,
  meta,
  onRefresh,
}: {
  initialData: any[];
  meta: any;
  onRefresh: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border">
      <div className="p-4 flex justify-between items-center border-b">
        <h3 className="font-semibold">Users ({meta?.total ?? 0})</h3>
        <button onClick={onRefresh} className="text-sm text-gray-500 hover:text-gray-900">
          Refresh
        </button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3 text-gray-500">Name</th>
            <th className="text-left p-3 text-gray-500">Email</th>
            <th className="text-left p-3 text-gray-500">Role</th>
          </tr>
        </thead>
        <tbody>
          {(initialData || []).map((u) => (
            <tr key={u.id} className="border-b last:border-0">
              <td className="p-3">
                {u.firstname} {u.lastname}
              </td>
              <td className="p-3 text-gray-500">{u.email}</td>
              <td className="p-3 capitalize">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

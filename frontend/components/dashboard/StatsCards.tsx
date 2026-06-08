"use client";
export default function StatsCards({ stats }: { stats: any }) {
  if (!stats) return null;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Object.entries(stats).map(([k, v]) => (
        <div key={k} className="bg-white rounded-xl border p-4">
          <p className="text-sm text-gray-500">{k}</p>
          <p className="text-2xl font-bold">{String(v)}</p>
        </div>
      ))}
    </div>
  );
}

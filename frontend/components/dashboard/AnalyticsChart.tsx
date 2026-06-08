"use client";
export default function AnalyticsChart({ data }: { data: { month: string; count: number }[] }) {
  return (
    <div className="bg-white rounded-xl border p-4">
      <h3 className="font-semibold mb-3">Registrations</h3>
      <div className="flex items-end gap-2 h-24">
        {(data || []).map((d) => (
          <div key={d.month} className="flex flex-col items-center gap-1">
            <div
              className="w-6 bg-gray-900 rounded"
              style={{ height: `${Math.min(d.count * 4, 80)}px` }}
            />
            <span className="text-xs text-gray-400">{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

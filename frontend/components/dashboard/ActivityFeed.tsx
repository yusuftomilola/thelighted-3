"use client";
export default function ActivityFeed({ activities }: { activities: any[] }) {
  return (
    <div className="bg-white rounded-xl border p-4">
      <h3 className="font-semibold mb-3">Recent Activity</h3>
      <ul className="space-y-2">
        {(activities || []).map((a) => (
          <li key={a.id} className="text-sm text-gray-600">
            {a.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

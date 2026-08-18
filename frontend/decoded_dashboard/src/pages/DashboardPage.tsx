import { useEffect, useState } from "react";
import { Users, Store, Hotel, ShoppingBag, ShoppingBag as CartIcon } from "lucide-react";
import StatCard from "../components/shared/StatCard";
import { fetchEntityCounts, fetchAuditLogs } from "../services/data";

export default function DashboardPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [c, a] = await Promise.all([
        fetchEntityCounts(),
        fetchAuditLogs(0, 10).then(r => r.content),
      ]);
      if (cancelled) return;
      setCounts(c);
      setActivity(a);
      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>Loading platform data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Decoded Platform at a glance</p>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Users" value={String(counts.users || 0)} icon={Users} />
        <StatCard title="Restaurants" value={String(counts.restaurants || 0)} icon={Store} />
        <StatCard title="Guesthouses" value={String(counts.guesthouses || 0)} icon={Hotel} />
        <StatCard title="Products" value={String(counts.products || 0)} icon={ShoppingBag} />
        <StatCard title="Orders" value={String(counts.orders || 0)} icon={CartIcon} />
      </div>

      {activity.length > 0 && (
        <div className="card" style={{ marginTop: 20 }}>
          <h2>Recent Activity</h2>
          <ul className="activity-list">
            {activity.slice(0, 8).map((a) => (
              <li key={a.id} className="activity-item">
                <span className="activity-dot green" />
                <span className="activity-text">
                  <strong>{a.action}</strong>: {a.details}
                </span>
                <span className="activity-time">{a.actorEmail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { fetchEntityCounts } from '../../services/data';

export default function AnalyticsPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const c = await fetchEntityCounts();
      if (cancelled) return;
      setCounts(c);
      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>Data Overview</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const maxVal = Math.max(...Object.values(counts), 1);
  const labels: Record<string, string> = {
    users: 'Users',
    restaurants: 'Restaurants',
    guesthouses: 'Guesthouses',
    products: 'Products',
    orders: 'Orders',
  };
  const colors = ['#3b82f6', '#22c55e', '#eab308', '#ec4899', '#8b5cf6'];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Data Overview</h1>
        <p>Entity counts from the database</p>
      </div>

      <div className="card">
        <div className="chart-container" style={{ padding: 24 }}>
          {Object.entries(counts).map(([key, val], i) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
                <span>{labels[key] || key}</span>
                <strong>{val}</strong>
              </div>
              <div style={{ height: 24, background: '#f1f5f9', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(val / maxVal) * 100}%`,
                  background: colors[i % colors.length],
                  borderRadius: 6,
                  transition: 'width 0.5s ease',
                  minWidth: val > 0 ? 4 : 0,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

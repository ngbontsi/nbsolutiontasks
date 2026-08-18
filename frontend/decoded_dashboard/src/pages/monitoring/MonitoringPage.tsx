import { useEffect, useState } from 'react';
import { CheckCircle, AlertTriangle, Activity } from 'lucide-react';
import api from '../../services/api';

interface HealthStatus {
  name: string;
  status: 'healthy' | 'unhealthy' | 'checking';
  detail: string;
}

const services = [
  { name: 'Auth Service', url: '/api/auth/roles' },
  { name: 'Restaurant Service', url: '/api/restaurant/restaurants' },
  { name: 'Guesthouse Service', url: '/api/guesthouse/guesthouses' },
  { name: 'Marketplace Service', url: '/api/marketplace/products' },
];

export default function MonitoringPage() {
  const [statuses, setStatuses] = useState<HealthStatus[]>(
    services.map(s => ({ name: s.name, status: 'checking', detail: '' }))
  );

  useEffect(() => {
    let cancelled = false;
    async function checkAll() {
      const results = await Promise.all(
        services.map(async (svc) => {
          const start = performance.now();
          try {
            const res = await api.get(svc.url, { timeout: 5000 });
            if (cancelled) return null;
            const ms = Math.round(performance.now() - start);
            return {
              name: svc.name,
              status: 'healthy' as const,
              detail: `Responded in ${ms}ms (${res.data.length} records)`,
            };
          } catch {
            if (cancelled) return null;
            return {
              name: svc.name,
              status: 'unhealthy' as const,
              detail: 'No response or error',
            };
          }
        })
      );
      if (cancelled) return;
      setStatuses(results.filter(Boolean) as HealthStatus[]);
    }
    checkAll();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Service Monitoring</h1>
        <p>Live health checks against each service</p>
      </div>

      <div className="monitoring-grid">
        {statuses.map((svc) => (
          <div key={svc.name} className="card service-card">
            <div className="service-card-header">
              <div className="service-title">
                {svc.status === 'checking' ? (
                  <Activity size={20} className="spin text-muted" />
                ) : svc.status === 'healthy' ? (
                  <CheckCircle size={20} className="text-green" />
                ) : (
                  <AlertTriangle size={20} className="text-red" />
                )}
                <h3>{svc.name}</h3>
              </div>
              <span className={`status-badge ${svc.status}`}>
                {svc.status.charAt(0).toUpperCase() + svc.status.slice(1)}
              </span>
            </div>
            <div className="service-metrics">
              <div className="metric">
                <span className="metric-label">Status</span>
                <span className="metric-value">{svc.detail}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { History, Search, Clock, UserCheck, UserX, UserPlus, Shield } from "lucide-react";
import { fetchAuditLogs } from "../../services/data";
import type { AuditLog } from "../../types";

const actionIcons: Record<string, typeof History> = {
  LOGIN: Clock,
  REGISTER: UserPlus,
  UPDATE_ROLE: Shield,
  ENABLE_USER: UserCheck,
  DISABLE_USER: UserX,
};

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const load = () => {
    setLoading(true);
    fetchAuditLogs().then((data) => {
      setLogs(data.content);
      setTotal(data.totalElements);
      setLoading(false);
    });
  };

  useEffect(load, []);

  const filtered = logs.filter((l) => {
    const matchSearch =
      l.actorEmail.toLowerCase().includes(search.toLowerCase()) ||
      l.details.toLowerCase().includes(search.toLowerCase());
    const matchAction = filter === "ALL" || l.action === filter;
    return matchSearch && matchAction;
  });

  const actions = ["LOGIN", "REGISTER", "UPDATE_ROLE", "ENABLE_USER", "DISABLE_USER"];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Audit Trail</h1>
        <p>{total} events recorded</p>
      </div>

      <div className="card">
        <div className="toolbar">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by email or details..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <Search size={18} />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="ALL">All Actions</option>
              {actions.map((a) => (
                <option key={a} value={a}>{a.replace("_", " ")}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          {loading ? (
            <p style={{ padding: "20px", color: "var(--text-muted)", fontSize: "13px" }}>
              Loading audit log...
            </p>
          ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Actor</th>
                <th>Action</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => {
                const Icon = actionIcons[log.action] || History;
                return (
                  <tr key={log.id}>
                    <td style={{ whiteSpace: "nowrap", fontSize: "12px", color: "var(--text-muted)" }}>
                      {log.createdAt ? log.createdAt.replace("T", " ").slice(0, 19) : ""}
                    </td>
                    <td>{log.actorEmail}</td>
                    <td>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <Icon size={14} />
                        {log.action.replace("_", " ")}
                      </span>
                    </td>
                    <td style={{ color: "var(--text-secondary)" }}>{log.details}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          )}
        </div>
      </div>
    </div>
  );
}

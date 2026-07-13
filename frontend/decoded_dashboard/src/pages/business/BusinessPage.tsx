import { useState, useEffect } from "react";
import { fetchRestaurants, fetchGuesthouses } from "../../services/data";
import type { Restaurant, Guesthouse } from "../../types";

type Tab = "restaurants" | "guesthouses";

export default function BusinessPage() {
  const [tab, setTab] = useState<Tab>("restaurants");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [guesthouses, setGuesthouses] = useState<Guesthouse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const [r, g] = await Promise.all([
        fetchRestaurants(),
        fetchGuesthouses(),
      ]);
      if (cancelled) return;
      setRestaurants(r);
      setGuesthouses(g);
      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Business Data</h1>
        <p>Restaurants and guesthouses from the database</p>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === "restaurants" ? "active" : ""}`} onClick={() => setTab("restaurants")}>
          Restaurants {!loading && `(${restaurants.length})`}
        </button>
        <button className={`tab ${tab === "guesthouses" ? "active" : ""}`} onClick={() => setTab("guesthouses")}>
          Guesthouses {!loading && `(${guesthouses.length})`}
        </button>
      </div>

      <div className="card">
        <div className="table-wrapper">
          {loading ? (
            <p style={{ padding: "20px", color: "var(--text-muted)", fontSize: "13px" }}>Loading...</p>
          ) : tab === "restaurants" ? (
            restaurants.length === 0 ? (
              <p style={{ padding: "20px", color: "var(--text-muted)" }}>No restaurants found.</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurants.map((r) => (
                    <tr key={r.id}>
                      <td>{r.name}</td>
                      <td>{r.address || '-'}</td>
                      <td>
                        <span className={`status-indicator ${r.active ? "enabled" : "disabled"}`}>
                          {r.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          ) : guesthouses.length === 0 ? (
            <p style={{ padding: "20px", color: "var(--text-muted)" }}>No guesthouses found.</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {guesthouses.map((g) => (
                  <tr key={g.id}>
                    <td>{g.name}</td>
                    <td>{g.address || '-'}</td>
                    <td>
                      <span className={`status-indicator ${g.active ? "enabled" : "disabled"}`}>
                        {g.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

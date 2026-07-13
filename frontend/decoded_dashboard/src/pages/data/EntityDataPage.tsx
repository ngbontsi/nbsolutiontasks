import { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, Search, X, ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { getEntityConfig, type EntityConfig, type FieldDef } from "../../config/entityConfigs";

export default function EntityDataPage() {
  const { entityKey } = useParams();
  const navigate = useNavigate();
  const config = entityKey ? getEntityConfig(entityKey) : undefined;

  if (!config) {
    return (
      <div className="page">
        <h2>Unknown entity: {entityKey}</h2>
        <button className="btn btn-secondary" onClick={() => navigate("/app/data")}>Back to Data</button>
      </div>
    );
  }

  return <EntityManager config={config} onBack={() => navigate("/app/data")} />;
}

function EntityManager({ config, onBack }: { config: EntityConfig; onBack: () => void }) {
  const { user } = useAuth();
  const canModify = user?.role === "ADMIN" || ["RESTAURANT_OWNER", "GUESTHOUSE_OWNER", "MARKETPLACE_VENDOR"].includes(user?.role ?? "");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [deleteItem, setDeleteItem] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(config.apiBase);
      setItems(res.data || []);
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [config.apiBase]);

  useEffect(() => { load(); }, [load]);

  const filtered = items.filter((item) => {
    if (!search) return true;
    const val = item[config.searchField];
    return val && String(val).toLowerCase().includes(search.toLowerCase());
  });

  const visibleFields = config.fields.filter((f) => !f.hidden);

  const handleSave = async (data: any) => {
    setSaving(true);
    setError("");
    try {
      if (editItem) {
        await api.put(`${config.apiBase}/${editItem[config.idField]}`, data);
      } else {
        await api.post(config.apiBase, data);
      }
      setShowForm(false);
      setEditItem(null);
      await load();
    } catch (e: any) {
      setError(e.response?.data?.message || e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    setSaving(true);
    try {
      await api.delete(`${config.apiBase}/${deleteItem[config.idField]}`);
      setDeleteItem(null);
      await load();
    } catch (e: any) {
      setError(e.response?.data?.message || e.message || "Delete failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-row">
          <button className="btn-icon btn-icon-ghost" onClick={onBack} title="Back">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1>{config.labelPlural}</h1>
            <p>Manage {config.labelPlural.toLowerCase()}</p>
          </div>
        </div>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <Search size={16} />
          <input
            placeholder={`Search ${config.labelPlural.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={() => { setEditItem(null); setShowForm(true); }} style={canModify ? {} : { display: 'none' }}>
          <Plus size={16} /> Add {config.label}
        </button>
      </div>

      {error && <div className="error-banner"><X size={14} /> {error} <button onClick={() => setError("")} className="btn-icon btn-icon-sm"><X size={12} /></button></div>}

      <div className="card">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">No {config.labelPlural.toLowerCase()} found.</div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  {visibleFields.map((f) => (
                    <th key={f.name} style={f.width ? { width: f.width } : undefined}>{f.label}</th>
                  ))}
                  {canModify && <th style={{ width: 80 }}>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item[config.idField]}>
                    {visibleFields.map((f) => (
                      <td key={f.name}>
                        {f.type === "boolean" ? (
                          <span className={`status-indicator ${item[f.name] ? "enabled" : "disabled"}`}>
                            {item[f.name] ? "Yes" : "No"}
                          </span>
                        ) : f.type === "number" ? (
                          Number(item[f.name] || 0).toLocaleString()
                        ) : (
                          String(item[f.name] ?? "")
                        )}
                      </td>
                    ))}
                    <td>
                      <div className="actions">
                        {canModify && (
                          <>
                            <button className="btn-icon" title="Edit" onClick={() => { setEditItem(item); setShowForm(true); }}>
                              <Edit2 size={14} />
                            </button>
                            <button className="btn-icon btn-icon-danger" title="Delete" onClick={() => setDeleteItem(item)}>
                              <Trash2 size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <EntityForm
          config={config}
          editItem={editItem}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditItem(null); }}
          saving={saving}
        />
      )}

      {deleteItem && (
        <div className="modal-overlay" onClick={() => setDeleteItem(null)}>
          <div className="modal modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Delete {config.label}</h2>
              <button className="btn-icon" onClick={() => setDeleteItem(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this {config.label.toLowerCase()}? This action cannot be undone.</p>
              {deleteItem[config.searchField] && (
                <p className="text-muted" style={{ marginTop: 4 }}>
                  "{deleteItem[config.searchField]}"
                </p>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteItem(null)} disabled={saving}>Cancel</button>
              <button className="btn btn-danger" onClick={handleDelete} disabled={saving}>
                {saving ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EntityForm({ config, editItem, onSave, onCancel, saving }: {
  config: EntityConfig;
  editItem: any | null;
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<any>(() => {
    if (editItem) {
      const initial: any = {};
      for (const f of config.fields) {
        initial[f.name] = editItem[f.name] ?? "";
      }
      return initial;
    }
    const initial: any = {};
    for (const f of config.fields) {
      initial[f.name] = f.type === "boolean" ? false : "";
    }
    return initial;
  });

  const editableFields = config.fields.filter((f) => f.editable !== false);
  const [formError, setFormError] = useState("");

  const setVal = (name: string, val: any) => setForm((prev: any) => ({ ...prev, [name]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    for (const f of editableFields) {
      if (f.required && (form[f.name] === "" || form[f.name] === undefined || form[f.name] === null)) {
        setFormError(`${f.label} is required`);
        return;
      }
    }

    const payload: any = {};
    for (const f of editableFields) {
      payload[f.name] = f.type === "boolean" ? !!form[f.name] : form[f.name];
    }

    await onSave(payload);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editItem ? "Edit" : "Add"} {config.label}</h2>
          <button className="btn-icon" onClick={onCancel}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {formError && <div className="login-error">{formError}</div>}
            {editableFields.map((f) => (
              <FormField key={f.name} field={f} value={form[f.name]} onChange={(v) => setVal(f.name, v)} />
            ))}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={saving}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Saving..." : editItem ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({ field, value, onChange }: { field: FieldDef; value: any; onChange: (v: any) => void }) {
  const id = `field-${field.name}`;

  if (field.type === "boolean") {
    return (
      <div className="form-group">
        <label className="checkbox-label">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
          {field.label}
        </label>
      </div>
    );
  }

  if (field.type === "select" && field.options) {
    return (
      <div className="form-group">
        <label htmlFor={id}>{field.label}{field.required && " *"}</label>
        <select id={id} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select...</option>
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className="form-group">
        <label htmlFor={id}>{field.label}{field.required && " *"}</label>
        <textarea id={id} value={value ?? ""} onChange={(e) => onChange(e.target.value)} rows={3} />
      </div>
    );
  }

  const inputType = field.type === "number" ? "number" : field.type === "email" ? "email" : "text";

  return (
    <div className="form-group">
      <label htmlFor={id}>{field.label}{field.required && " *"}</label>
      <input
        id={id}
        type={inputType}
        value={value ?? ""}
        onChange={(e) => onChange(field.type === "number" ? Number(e.target.value) : e.target.value)}
        step={field.type === "number" ? "0.01" : undefined}
      />
    </div>
  );
}

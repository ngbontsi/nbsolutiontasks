import { useState, useEffect } from "react";
import { Search, Filter, UserCheck, UserX, Edit2, Trash2, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import type { User, Role } from "../../types";
import { fetchUsers, fetchRoles } from "../../services/data";

const roleBadgeClass: Record<string, string> = {
  ADMIN: "badge-admin",
  USER: "badge-user",
  RESTAURANT_OWNER: "badge-restaurant",
  GUESTHOUSE_OWNER: "badge-guesthouse",
  MARKETPLACE_VENDOR: "badge-marketplace",
};

function RoleBadge({ role }: { role: string }) {
  return (
    <span className={`badge ${roleBadgeClass[role] || "badge-user"}`}>
      {role.replace("_", " ")}
    </span>
  );
}

export default function UsersPage() {
  const { user: currentUser } = useAuth();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editRole, setEditRole] = useState("");
  const [editEnabled, setEditEnabled] = useState(true);
  const [editFullAccess, setEditFullAccess] = useState(false);
  const [editModify, setEditModify] = useState(false);
  const [editReadOnly, setEditReadOnly] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => {
    setLoading(true);
    Promise.all([fetchUsers(), fetchRoles()]).then(([u, r]) => {
      setUsers(u);
      setRoles(r);
      setLoading(false);
    });
  };

  useEffect(load, []);

  const isAdmin = currentUser?.role === "ADMIN";

  const selectedRole = roles.find((r) => r.name === editRole);

  const openEdit = (u: User) => {
    setEditUser(u);
    setEditRole(u.role);
    setEditEnabled(u.enabled);
    const r = roles.find((x) => x.name === u.role);
    setEditFullAccess(r?.fullAccess ?? false);
    setEditModify(r?.modify ?? false);
    setEditReadOnly(r?.readOnly ?? false);
  };

  const saveEdit = async () => {
    if (!editUser) return;
    try {
      if (editRole !== editUser.role)
        await api.put(`/api/auth/users/${editUser.id}/role`, { role: editRole });

      if (editEnabled !== editUser.enabled)
        await api.put(`/api/auth/users/${editUser.id}/enabled`, { enabled: editEnabled });

      const origRole = roles.find((r) => r.name === editUser.role);
      const newRole = roles.find((r) => r.name === editRole);
      if (origRole && newRole) {
        const changed =
          editFullAccess !== newRole.fullAccess ||
          editModify !== newRole.modify ||
          editReadOnly !== newRole.readOnly;
        if (changed) {
          await api.put(`/api/auth/roles/${newRole.id}`, {
            name: newRole.name,
            description: newRole.description,
            fullAccess: editFullAccess,
            modify: editModify,
            readOnly: editReadOnly,
          });
        }
      }

      setEditUser(null);
      load();
    } catch {
      alert("Failed to update user");
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/api/auth/users/${deleteTarget.id}`);
      setDeleteTarget(null);
      load();
    } catch {
      alert("Failed to delete user");
    } finally {
      setDeleting(false);
    }
  };

  const filtered = users.filter((u) => {
    const matchSearch =
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="page">
      <div className="page-header">
        <h1>User Management</h1>
        <p>Manage platform users and permissions</p>
      </div>

      <div className="card">
        <div className="toolbar">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <Filter size={18} />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="ALL">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
              <option value="RESTAURANT_OWNER">Restaurant Owner</option>
              <option value="GUESTHOUSE_OWNER">Guesthouse Owner</option>
              <option value="MARKETPLACE_VENDOR">Marketplace Vendor</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          {loading ? (
            <p style={{ padding: "20px", color: "var(--text-muted)", fontSize: "13px" }}>
              Loading users...
            </p>
          ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <RoleBadge role={user.role} />
                  </td>
                  <td>
                    <span
                      className={`status-indicator ${user.enabled ? "enabled" : "disabled"}`}
                    >
                      {user.enabled ? (
                        <UserCheck size={14} />
                      ) : (
                        <UserX size={14} />
                      )}
                      {user.enabled ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td>{user.createdAt}</td>
                  <td className="actions">
                    {isAdmin && (
                      <>
                        <button className="btn-icon" title="Edit" onClick={() => openEdit(user)}>
                          <Edit2 size={16} />
                        </button>
                        <button className="btn-icon btn-icon-danger" title="Delete" onClick={() => setDeleteTarget(user)}>
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>

      {editUser && (
        <div className="modal-overlay" onClick={() => setEditUser(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit User</h2>
              <button className="btn-icon" onClick={() => setEditUser(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <p><strong>{editUser.firstName} {editUser.lastName}</strong> ({editUser.email})</p>
              <div className="form-group">
                <label>Role</label>
                <select value={editRole} onChange={e => {
                  setEditRole(e.target.value);
                  const r = roles.find(x => x.name === e.target.value);
                  if (r) {
                    setEditFullAccess(r.fullAccess);
                    setEditModify(r.modify);
                    setEditReadOnly(r.readOnly);
                  }
                }}>
                  {roles.map(r => (
                    <option key={r.id} value={r.name}>{r.name.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Role Permissions</label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" checked={editFullAccess} onChange={e => setEditFullAccess(e.target.checked)} />
                    <span>Full Access</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" checked={editModify} onChange={e => setEditModify(e.target.checked)} />
                    <span>Modify</span>
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" checked={editReadOnly} onChange={e => setEditReadOnly(e.target.checked)} />
                    <span>Read Only</span>
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={editEnabled ? "true" : "false"} onChange={e => setEditEnabled(e.target.value === "true")}>
                  <option value="true">Active</option>
                  <option value="false">Disabled</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setEditUser(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="modal-overlay" onClick={() => !deleting && setDeleteTarget(null)}>
          <div className="modal modal-sm" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Delete User</h2>
              <button className="btn-icon" onClick={() => setDeleteTarget(null)} disabled={deleting}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>{deleteTarget.firstName} {deleteTarget.lastName}</strong> ({deleteTarget.email})?</p>
              <p className="text-muted">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteTarget(null)} disabled={deleting}>Cancel</button>
              <button className="btn btn-danger" onClick={confirmDelete} disabled={deleting}>
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";

const initialEmployees = [
  { id: 1, name: "Arun Kumar", department: "Engineering", avatar: "AK" },
  { id: 2, name: "Priya Sharma", department: "Design", avatar: "PS" },
  { id: 3, name: "Rahul Mehta", department: "Marketing", avatar: "RM" },
  { id: 4, name: "Divya Nair", department: "HR", avatar: "DN" },
  { id: 5, name: "Karthik Raja", department: "Finance", avatar: "KR" },
];

const leaveTypes = ["Sick Leave", "Casual Leave", "Annual Leave", "Maternity/Paternity", "Emergency Leave"];

const initialLeaves = [
  { id: 1, employeeId: 1, type: "Sick Leave", from: "2025-07-01", to: "2025-07-03", days: 3, reason: "Fever and cold", status: "Approved", applied: "2025-06-28" },
  { id: 2, employeeId: 2, type: "Annual Leave", from: "2025-07-10", to: "2025-07-15", days: 6, reason: "Family vacation", status: "Pending", applied: "2025-06-29" },
  { id: 3, employeeId: 3, type: "Casual Leave", from: "2025-07-05", to: "2025-07-05", days: 1, reason: "Personal work", status: "Rejected", applied: "2025-06-27" },
  { id: 4, employeeId: 4, type: "Emergency Leave", from: "2025-07-02", to: "2025-07-04", days: 3, reason: "Family emergency", status: "Approved", applied: "2025-07-01" },
  { id: 5, employeeId: 5, type: "Casual Leave", from: "2025-07-08", to: "2025-07-09", days: 2, reason: "Local festival", status: "Pending", applied: "2025-06-30" },
];

const statusConfig = {
  Approved: { color: "#10b981", bg: "#d1fae5", icon: "✓" },
  Rejected: { color: "#ef4444", bg: "#fee2e2", icon: "✗" },
  Pending:  { color: "#f59e0b", bg: "#fef3c7", icon: "⏳" },
};

const selectStyle = {
  padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0",
  background: "#f8fafc", fontSize: 14, color: "#1e293b", cursor: "pointer", outline: "none",
};

const inputStyle = {
  width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0",
  fontSize: 14, color: "#1e293b", background: "#f8fafc", outline: "none",
  boxSizing: "border-box", fontFamily: "inherit",
};

const labelStyle = {
  display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6,
};

function LeaveTable({ leaves, getEmployee, onStatusChange, showActions }) {
  if (leaves.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "48px 0", color: "#94a3b8" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
        <div style={{ fontWeight: 600 }}>No leave records found</div>
        <div style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your filters</div>
      </div>
    );
  }
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 6px", fontSize: 13 }}>
        <thead>
          <tr>
            {["Employee", "Leave Type", "Duration", "Days", "Reason", "Applied", "Status", showActions ? "Action" : null]
              .filter(Boolean).map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "8px 14px", color: "#94a3b8", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: ".05em" }}>{h}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => {
            const emp = getEmployee(leave.employeeId);
            const s = statusConfig[leave.status];
            return (
              <tr key={leave.id} style={{ background: "#f8fafc" }}>
                <td style={{ padding: "12px 14px", borderRadius: "10px 0 0 10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 8,
                      background: "linear-gradient(135deg, #1e40af, #6366f1)",
                      color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 800, fontSize: 11, flexShrink: 0,
                    }}>{emp?.avatar}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#1e293b" }}>{emp?.name}</div>
                      <div style={{ fontSize: 11, color: "#94a3b8" }}>{emp?.department}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <span style={{ background: "#eef2ff", color: "#4338ca", borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{leave.type}</span>
                </td>
                <td style={{ padding: "12px 14px", color: "#475569", fontSize: 12 }}>{leave.from} → {leave.to}</td>
                <td style={{ padding: "12px 14px", fontWeight: 700, color: "#1e293b" }}>{leave.days}d</td>
                <td style={{ padding: "12px 14px", color: "#64748b", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{leave.reason}</td>
                <td style={{ padding: "12px 14px", color: "#94a3b8" }}>{leave.applied}</td>
                <td style={{ padding: "12px 14px" }}>
                  <span style={{ background: s.bg, color: s.color, borderRadius: 6, padding: "4px 10px", fontWeight: 700, fontSize: 12 }}>
                    {s.icon} {leave.status}
                  </span>
                </td>
                {showActions && (
                  <td style={{ padding: "12px 14px", borderRadius: "0 10px 10px 0" }}>
                    {leave.status === "Pending" ? (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => onStatusChange(leave.id, "Approved")} style={{ background: "#d1fae5", color: "#059669", border: "none", borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>Approve</button>
                        <button onClick={() => onStatusChange(leave.id, "Rejected")} style={{ background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>Reject</button>
                      </div>
                    ) : (
                      <span style={{ color: "#cbd5e1", fontSize: 12 }}>—</span>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function HRLeaveManagement() {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [filterEmployee, setFilterEmployee] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ employeeId: "", type: "", from: "", to: "", reason: "" });
  const [formError, setFormError] = useState("");
  const [toast, setToast] = useState(null);

  const getEmployee = (id) => initialEmployees.find((e) => e.id === id);

  const filtered = leaves.filter((l) => {
    const emp = getEmployee(l.employeeId);
    const matchEmp = filterEmployee === "All" || emp?.name === filterEmployee;
    const matchStatus = filterStatus === "All" || l.status === filterStatus;
    return matchEmp && matchStatus;
  });

  const stats = {
    total: leaves.length,
    approved: leaves.filter((l) => l.status === "Approved").length,
    pending: leaves.filter((l) => l.status === "Pending").length,
    rejected: leaves.filter((l) => l.status === "Rejected").length,
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleStatusChange = (id, status) => {
    setLeaves((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    showToast(`Leave ${status.toLowerCase()} successfully.`);
  };

  const calcDays = (from, to) => {
    if (!from || !to) return 0;
    const diff = (new Date(to) - new Date(from)) / (1000 * 60 * 60 * 24);
    return Math.max(0, diff + 1);
  };

  const handleSubmit = () => {
    if (!form.employeeId || !form.type || !form.from || !form.to || !form.reason) {
      setFormError("All fields are required.");
      return;
    }
    if (new Date(form.to) < new Date(form.from)) {
      setFormError("End date must be after start date.");
      return;
    }
    const newLeave = {
      id: Date.now(),
      employeeId: parseInt(form.employeeId),
      type: form.type,
      from: form.from,
      to: form.to,
      days: calcDays(form.from, form.to),
      reason: form.reason,
      status: "Pending",
      applied: new Date().toISOString().split("T")[0],
    };
    setLeaves((prev) => [newLeave, ...prev]);
    setForm({ employeeId: "", type: "", from: "", to: "", reason: "" });
    setFormError("");
    setShowForm(false);
    showToast("Leave application submitted!");
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#f0f4ff", color: "#1e293b" }}>
      {toast && (
        <div style={{
          position: "fixed", top: 24, right: 24, zIndex: 999,
          background: "#10b981", color: "#fff", padding: "12px 22px", borderRadius: 10,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)", fontWeight: 600, fontSize: 14,
        }}>{toast}</div>
      )}

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <aside style={{
          width: 220, background: "linear-gradient(160deg, #1e40af 0%, #3730a3 100%)",
          color: "#fff", display: "flex", flexDirection: "column", padding: "32px 0",
          position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 100,
        }}>
          <div style={{ padding: "0 24px 32px", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px" }}>LeaveDesk</div>
            <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>HR Management Portal</div>
          </div>
          {[
            { key: "dashboard", label: "Dashboard", icon: "📊" },
            { key: "leaves", label: "Leave Requests", icon: "📋" },
            { key: "employees", label: "Employees", icon: "👥" },
          ].map((item) => (
            <button key={item.key} onClick={() => setActiveTab(item.key)} style={{
              background: activeTab === item.key ? "rgba(255,255,255,0.15)" : "transparent",
              border: "none", color: "#fff", textAlign: "left",
              padding: "14px 24px", cursor: "pointer", fontWeight: activeTab === item.key ? 700 : 400,
              fontSize: 14, display: "flex", alignItems: "center", gap: 10,
              borderLeft: activeTab === item.key ? "3px solid #93c5fd" : "3px solid transparent",
              transition: "all .2s",
            }}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.12)", fontSize: 12, opacity: 0.5 }}>
            HR Admin Panel v1.0
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ marginLeft: 220, flex: 1, padding: 32 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#1e293b" }}>
                {activeTab === "dashboard" ? "Dashboard" : activeTab === "leaves" ? "Leave Requests" : "Employees"}
              </h1>
              <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>
                {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
            <button onClick={() => setShowForm(true)} style={{
              background: "linear-gradient(135deg, #1e40af, #3730a3)", color: "#fff",
              border: "none", borderRadius: 10, padding: "12px 22px", fontWeight: 700,
              fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
              boxShadow: "0 4px 14px rgba(30,64,175,0.35)",
            }}>
              + Apply Leave
            </button>
          </div>

          {activeTab === "dashboard" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 32 }}>
                {[
                  { label: "Total Applications", value: stats.total, color: "#6366f1", bg: "#eef2ff", icon: "📁" },
                  { label: "Approved", value: stats.approved, color: "#10b981", bg: "#d1fae5", icon: "✅" },
                  { label: "Pending", value: stats.pending, color: "#f59e0b", bg: "#fef3c7", icon: "⏳" },
                  { label: "Rejected", value: stats.rejected, color: "#ef4444", bg: "#fee2e2", icon: "❌" },
                ].map((s) => (
                  <div key={s.label} style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{s.icon}</div>
                    <div>
                      <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
                      <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <h3 style={{ margin: "0 0 20px", fontWeight: 700, fontSize: 16 }}>Recent Applications</h3>
                <LeaveTable leaves={leaves.slice(0, 5)} getEmployee={getEmployee} onStatusChange={handleStatusChange} showActions />
              </div>
            </>
          )}

          {activeTab === "leaves" && (
            <div style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
                <select value={filterEmployee} onChange={(e) => setFilterEmployee(e.target.value)} style={selectStyle}>
                  <option value="All">All Employees</option>
                  {initialEmployees.map((e) => <option key={e.id} value={e.name}>{e.name}</option>)}
                </select>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={selectStyle}>
                  <option value="All">All Statuses</option>
                  <option>Approved</option>
                  <option>Pending</option>
                  <option>Rejected</option>
                </select>
                <div style={{ fontSize: 13, color: "#64748b", alignSelf: "center" }}>
                  Showing {filtered.length} record{filtered.length !== 1 ? "s" : ""}
                </div>
              </div>
              <LeaveTable leaves={filtered} getEmployee={getEmployee} onStatusChange={handleStatusChange} showActions />
            </div>
          )}

          {activeTab === "employees" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
              {initialEmployees.map((emp) => {
                const empLeaves = leaves.filter((l) => l.employeeId === emp.id);
                return (
                  <div key={emp.id} style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 12,
                        background: "linear-gradient(135deg, #1e40af, #6366f1)",
                        color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 800, fontSize: 14,
                      }}>{emp.avatar}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{emp.name}</div>
                        <div style={{ fontSize: 12, color: "#64748b" }}>{emp.department}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {["Approved", "Pending", "Rejected"].map((s) => {
                        const c = statusConfig[s];
                        const count = empLeaves.filter((l) => l.status === s).length;
                        return (
                          <div key={s} style={{ flex: 1, background: c.bg, borderRadius: 8, padding: "8px 4px", textAlign: "center" }}>
                            <div style={{ fontWeight: 800, fontSize: 18, color: c.color }}>{count}</div>
                            <div style={{ fontSize: 10, color: c.color, fontWeight: 600 }}>{s}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      {showForm && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(15,23,42,0.55)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 500,
        }} onClick={() => setShowForm(false)}>
          <div style={{
            background: "#fff", borderRadius: 20, padding: 36, width: 480, maxWidth: "95vw",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h2 style={{ margin: 0, fontWeight: 800, fontSize: 20 }}>Apply for Leave</h2>
                <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 13 }}>Fill in the details below</p>
              </div>
              <button onClick={() => setShowForm(false)} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>✕</button>
            </div>
            {formError && (
              <div style={{ background: "#fee2e2", color: "#dc2626", borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>{formError}</div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelStyle}>Employee</label>
                <select value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} style={inputStyle}>
                  <option value="">Select employee</option>
                  {initialEmployees.map((e) => <option key={e.id} value={e.id}>{e.name} — {e.department}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Leave Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} style={inputStyle}>
                  <option value="">Select type</option>
                  {leaveTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>From Date</label>
                  <input type="date" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>To Date</label>
                  <input type="date" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} style={inputStyle} />
                </div>
              </div>
              {form.from && form.to && new Date(form.to) >= new Date(form.from) && (
                <div style={{ background: "#eef2ff", borderRadius: 8, padding: "8px 14px", fontSize: 13, color: "#4338ca", fontWeight: 600 }}>
                  📅 {calcDays(form.from, form.to)} day(s) of leave
                </div>
              )}
              <div>
                <label style={labelStyle}>Reason</label>
                <textarea value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  placeholder="Briefly describe the reason..." rows={3}
                  style={{ ...inputStyle, resize: "vertical" }} />
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                <button onClick={() => setShowForm(false)} style={{
                  flex: 1, padding: "12px", borderRadius: 10, border: "1.5px solid #e2e8f0",
                  background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14, color: "#64748b",
                }}>Cancel</button>
                <button onClick={handleSubmit} style={{
                  flex: 2, padding: "12px", borderRadius: 10, border: "none",
                  background: "linear-gradient(135deg, #1e40af, #3730a3)", color: "#fff",
                  cursor: "pointer", fontWeight: 700, fontSize: 14,
                  boxShadow: "0 4px 14px rgba(30,64,175,0.35)",
                }}>Submit Application</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

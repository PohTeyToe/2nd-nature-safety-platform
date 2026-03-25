"use client";

import { useState, useEffect, useMemo } from "react";
import { Employee, Certification, POSITION_TEMPLATES, getEmployees, saveEmployees } from "@/lib/data";

const STATUS_COLORS: Record<string, string> = {
  Valid: "bg-green-100 text-green-800 border-green-200",
  "Expiring Soon": "bg-yellow-100 text-yellow-800 border-yellow-200",
  Expired: "bg-red-100 text-red-800 border-red-200",
  "Not Started": "bg-gray-100 text-gray-600 border-gray-200",
};

const STATUS_DOT: Record<string, string> = {
  Valid: "bg-green-500",
  "Expiring Soon": "bg-yellow-500",
  Expired: "bg-red-500",
  "Not Started": "bg-gray-400",
};

export default function CertificationsPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [editingCert, setEditingCert] = useState<{ empId: string; certId: string } | null>(null);

  // Add form state
  const [newName, setNewName] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newCompany, setNewCompany] = useState("");

  useEffect(() => {
    setEmployees(getEmployees());
    setLoaded(true);
  }, []);

  const stats = useMemo(() => {
    const totalEmployees = employees.length;
    const allCerts = employees.flatMap((e) => e.certifications);
    const valid = allCerts.filter((c) => c.status === "Valid").length;
    const expiringSoon = allCerts.filter((c) => c.status === "Expiring Soon").length;
    const expired = allCerts.filter((c) => c.status === "Expired").length;
    const notStarted = allCerts.filter((c) => c.status === "Not Started").length;
    const total = allCerts.length;
    const compliant = total > 0 ? Math.round(((valid + expiringSoon) / total) * 100) : 0;
    return { totalEmployees, valid, expiringSoon, expired, notStarted, total, compliant };
  }, [employees]);

  function addEmployee() {
    if (!newName.trim() || !newPosition) return;

    const certs: Certification[] = (POSITION_TEMPLATES[newPosition] || []).map((name, i) => ({
      id: `new-${Date.now()}-${i}`,
      name,
      status: "Not Started" as const,
      issueDate: "",
      expiryDate: "",
    }));

    const emp: Employee = {
      id: `emp-${Date.now()}`,
      name: newName.trim(),
      position: newPosition,
      company: newCompany.trim() || "Unspecified",
      certifications: certs,
    };

    const updated = [...employees, emp];
    setEmployees(updated);
    saveEmployees(updated);
    setNewName("");
    setNewPosition("");
    setNewCompany("");
    setShowAddForm(false);
  }

  function updateCertification(empId: string, certId: string, updates: Partial<Certification>) {
    const updated = employees.map((emp) => {
      if (emp.id !== empId) return emp;
      return {
        ...emp,
        certifications: emp.certifications.map((c) => (c.id === certId ? { ...c, ...updates } : c)),
      };
    });
    setEmployees(updated);
    saveEmployees(updated);
  }

  function deleteEmployee(empId: string) {
    if (!confirm("Remove this employee?")) return;
    const updated = employees.filter((e) => e.id !== empId);
    setEmployees(updated);
    saveEmployees(updated);
    if (selectedEmployee === empId) setSelectedEmployee(null);
  }

  if (!loaded) {
    return <div className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-500">Loading...</div>;
  }

  const selectedEmp = employees.find((e) => e.id === selectedEmployee);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Certification Tracker</h1>
          <p className="text-gray-600">Monitor employee training compliance and certification status.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Employee
        </button>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-primary">
          <div className="text-2xl font-bold text-primary">{stats.totalEmployees}</div>
          <div className="text-sm text-gray-500">Employees</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div className="text-2xl font-bold text-blue-600">{stats.compliant}%</div>
          <div className="text-sm text-gray-500">Compliant</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-600">{stats.valid}</div>
          <div className="text-sm text-gray-500">Valid</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <div className="text-2xl font-bold text-yellow-600">{stats.expiringSoon}</div>
          <div className="text-sm text-gray-500">Expiring Soon</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <div className="text-2xl font-bold text-red-600">{stats.expired}</div>
          <div className="text-sm text-gray-500">Expired</div>
        </div>
      </div>

      {/* Add Employee Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6 border-2 border-primary/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Employee</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <select
                value={newPosition}
                onChange={(e) => setNewPosition(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
              >
                <option value="">Select a position...</option>
                {Object.keys(POSITION_TEMPLATES).map((pos) => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
              {newPosition && (
                <p className="text-xs text-gray-500 mt-1">
                  Required certs: {POSITION_TEMPLATES[newPosition]?.join(", ")}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                placeholder="Company name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={addEmployee}
              disabled={!newName.trim() || !newPosition}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Employee
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Employee List */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">Employees</h3>
            </div>
            <div className="divide-y">
              {employees.map((emp) => {
                const valid = emp.certifications.filter((c) => c.status === "Valid").length;
                const total = emp.certifications.length;
                const hasIssues = emp.certifications.some((c) => c.status === "Expired" || c.status === "Not Started");

                return (
                  <button
                    key={emp.id}
                    onClick={() => setSelectedEmployee(emp.id)}
                    className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                      selectedEmployee === emp.id ? "bg-primary/5 border-l-4 border-primary" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{emp.name}</div>
                        <div className="text-sm text-gray-500">{emp.position}</div>
                        <div className="text-xs text-gray-400">{emp.company}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${hasIssues ? "text-red-600" : "text-green-600"}`}>
                          {valid}/{total}
                        </div>
                        <div className="text-xs text-gray-400">valid</div>
                      </div>
                    </div>
                    {/* Mini status bar */}
                    <div className="flex gap-0.5 mt-2">
                      {emp.certifications.map((c) => (
                        <div
                          key={c.id}
                          className={`h-1.5 flex-1 rounded-full ${STATUS_DOT[c.status]}`}
                          title={`${c.name}: ${c.status}`}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Certification Details */}
        <div className="md:col-span-2">
          {selectedEmp ? (
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{selectedEmp.name}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedEmp.position} at {selectedEmp.company}
                  </p>
                </div>
                <button
                  onClick={() => deleteEmployee(selectedEmp.id)}
                  className="text-red-400 hover:text-red-600 p-2 rounded hover:bg-red-50 transition-colors"
                  title="Remove employee"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <div className="p-4 space-y-3">
                {selectedEmp.certifications.map((cert) => {
                  const isEditing = editingCert?.empId === selectedEmp.id && editingCert?.certId === cert.id;

                  return (
                    <div
                      key={cert.id}
                      className={`border rounded-lg p-4 ${STATUS_COLORS[cert.status]}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${STATUS_DOT[cert.status]}`} />
                          <span className="font-medium text-gray-900">{cert.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium">{cert.status}</span>
                          <button
                            onClick={() =>
                              setEditingCert(
                                isEditing ? null : { empId: selectedEmp.id, certId: cert.id }
                              )
                            }
                            className="p-1 rounded hover:bg-black/5 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {isEditing ? (
                        <div className="grid grid-cols-3 gap-3 mt-3 bg-white/70 rounded-lg p-3">
                          <div>
                            <label className="block text-[10px] font-medium text-gray-500 mb-1">STATUS</label>
                            <select
                              value={cert.status}
                              onChange={(e) =>
                                updateCertification(selectedEmp.id, cert.id, {
                                  status: e.target.value as Certification["status"],
                                })
                              }
                              className="w-full text-xs px-2 py-1.5 border rounded"
                            >
                              <option value="Valid">Valid</option>
                              <option value="Expiring Soon">Expiring Soon</option>
                              <option value="Expired">Expired</option>
                              <option value="Not Started">Not Started</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-gray-500 mb-1">ISSUE DATE</label>
                            <input
                              type="date"
                              value={cert.issueDate}
                              onChange={(e) =>
                                updateCertification(selectedEmp.id, cert.id, { issueDate: e.target.value })
                              }
                              className="w-full text-xs px-2 py-1.5 border rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-gray-500 mb-1">EXPIRY DATE</label>
                            <input
                              type="date"
                              value={cert.expiryDate}
                              onChange={(e) =>
                                updateCertification(selectedEmp.id, cert.id, { expiryDate: e.target.value })
                              }
                              className="w-full text-xs px-2 py-1.5 border rounded"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-gray-600">
                          {cert.issueDate
                            ? `Issued: ${cert.issueDate} | Expires: ${cert.expiryDate}`
                            : "No dates recorded"}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>Select an employee to view their certifications</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

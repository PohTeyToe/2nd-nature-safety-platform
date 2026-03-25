"use client";

import { useState, useEffect, useMemo } from "react";
import { Partnership, getPartnerships, savePartnerships } from "@/lib/data";

const STATUS_OPTIONS: Partnership["status"][] = [
  "Not Contacted",
  "Reached Out",
  "Meeting Scheduled",
  "Partnered",
  "Not Interested",
];

const CATEGORY_OPTIONS = ["All", "Construction", "Industrial", "Union", "Government", "Business", "Gateway/Labour"];

const STATUS_COLORS: Record<string, string> = {
  "Not Contacted": "bg-gray-100 text-gray-700",
  "Reached Out": "bg-blue-100 text-blue-700",
  "Meeting Scheduled": "bg-yellow-100 text-yellow-800",
  "Partnered": "bg-green-100 text-green-700",
  "Not Interested": "bg-red-100 text-red-700",
};

const CATEGORY_COLORS: Record<string, string> = {
  Construction: "bg-orange-100 text-orange-800",
  Industrial: "bg-purple-100 text-purple-800",
  Union: "bg-blue-100 text-blue-800",
  Government: "bg-teal-100 text-teal-800",
  Business: "bg-indigo-100 text-indigo-800",
  "Gateway/Labour": "bg-pink-100 text-pink-800",
};

export default function PartnershipsPage() {
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"priority" | "name" | "fitScore" | "category" | "status">("priority");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setPartnerships(getPartnerships());
    setLoaded(true);
  }, []);

  function updatePartnership(id: string, updates: Partial<Partnership>) {
    const updated = partnerships.map((p) => (p.id === id ? { ...p, ...updates } : p));
    setPartnerships(updated);
    savePartnerships(updated);
  }

  const filtered = useMemo(() => {
    let result = [...partnerships];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.contactPerson.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.notes.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== "All") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (statusFilter !== "All") {
      result = result.filter((p) => p.status === statusFilter);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "priority":
          if (a.priority !== b.priority) return a.priority === "top" ? -1 : 1;
          return b.fitScore - a.fitScore;
        case "fitScore":
          return b.fitScore - a.fitScore;
        case "name":
          return a.name.localeCompare(b.name);
        case "category":
          return a.category.localeCompare(b.category);
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return result;
  }, [partnerships, search, categoryFilter, statusFilter, sortBy]);

  const stats = useMemo(() => {
    const total = partnerships.length;
    const contacted = partnerships.filter((p) => p.status !== "Not Contacted").length;
    const meetings = partnerships.filter((p) => p.status === "Meeting Scheduled").length;
    const partnered = partnerships.filter((p) => p.status === "Partnered").length;
    return { total, contacted, meetings, partnered };
  }, [partnerships]);

  if (!loaded) {
    return <div className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Partnership Outreach CRM</h1>
        <p className="text-gray-600">Track association partnerships for 2nd Nature Safety&apos;s growth strategy.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-primary">
          <div className="text-2xl font-bold text-primary">{stats.total}</div>
          <div className="text-sm text-gray-500">Total Targets</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div className="text-2xl font-bold text-blue-600">{stats.contacted}</div>
          <div className="text-sm text-gray-500">Contacted</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <div className="text-2xl font-bold text-yellow-600">{stats.meetings}</div>
          <div className="text-sm text-gray-500">Meetings Set</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <div className="text-2xl font-bold text-green-600">{stats.partnered}</div>
          <div className="text-sm text-gray-500">Partnered</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search associations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
          >
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
          >
            <option value="All">All Statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
          >
            <option value="priority">Sort: Priority</option>
            <option value="fitScore">Sort: Fit Score</option>
            <option value="name">Sort: Name</option>
            <option value="category">Sort: Category</option>
            <option value="status">Sort: Status</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Association</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Category</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Members</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Fit</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Contact</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Notes</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className={`border-b hover:bg-gray-50 transition-colors ${p.priority === "top" ? "bg-orange-50/40" : ""}`}
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">
                      {p.priority === "top" && <span className="text-accent mr-1" title="Top Priority">&#9733;</span>}
                      {p.name}
                    </div>
                    <div className="text-xs text-gray-500">{p.location}</div>
                    {p.website && (
                      <a
                        href={`https://${p.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        {p.website}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${CATEGORY_COLORS[p.category] || "bg-gray-100 text-gray-700"}`}>
                      {p.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{p.memberCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span key={n} className={`text-sm ${n <= p.fitScore ? "text-accent" : "text-gray-300"}`}>
                          &#9733;
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {editingId === p.id ? (
                      <select
                        value={p.status}
                        onChange={(e) => updatePartnership(p.id, { status: e.target.value as Partnership["status"] })}
                        className="text-xs px-2 py-1 border rounded"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    ) : (
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[p.status]}`}>
                        {p.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">
                    {p.contactPerson && <div className="font-medium">{p.contactPerson}</div>}
                    {p.contactEmail && (
                      <a href={`mailto:${p.contactEmail}`} className="text-primary hover:underline block">{p.contactEmail}</a>
                    )}
                    {p.contactPhone && <div>{p.contactPhone}</div>}
                    {editingId === p.id && (
                      <div className="mt-2">
                        <label className="block text-[10px] text-gray-400 mb-0.5">Last Contacted</label>
                        <input
                          type="date"
                          value={p.lastContacted}
                          onChange={(e) => updatePartnership(p.id, { lastContacted: e.target.value })}
                          className="text-xs px-2 py-1 border rounded w-full"
                        />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editingId === p.id ? (
                      <textarea
                        value={p.notes}
                        onChange={(e) => updatePartnership(p.id, { notes: e.target.value })}
                        className="text-xs px-2 py-1 border rounded w-full min-w-[150px]"
                        rows={2}
                        placeholder="Add notes..."
                      />
                    ) : (
                      <span className="text-xs text-gray-500">{p.notes || "—"}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setEditingId(editingId === p.id ? null : p.id)}
                      className={`p-1.5 rounded transition-colors ${
                        editingId === p.id
                          ? "bg-primary text-white"
                          : "text-gray-400 hover:text-primary hover:bg-gray-100"
                      }`}
                      title={editingId === p.id ? "Save" : "Edit"}
                    >
                      {editingId === p.id ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">No associations match your filters.</div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

type ContentType = "services" | "equipment" | "packages" | "testimonials" | "faq" | "team" | "settings" | "enquiries";

const contentTypes: { key: ContentType; label: string; icon: string }[] = [
  { key: "enquiries", label: "Enquiries", icon: "📩" },
  { key: "services", label: "Services", icon: "🛎️" },
  { key: "equipment", label: "Equipment", icon: "🦽" },
  { key: "packages", label: "Packages", icon: "🏖️" },
  { key: "testimonials", label: "Testimonials", icon: "⭐" },
  { key: "faq", label: "FAQ", icon: "❓" },
  { key: "team", label: "Team", icon: "👥" },
  { key: "settings", label: "Site Settings", icon: "⚙️" },
];

export default function AdminDashboard({ user }: { user?: { name?: string | null; email?: string | null } } = {}) {
  const [activeTab, setActiveTab] = useState<ContentType>("services");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchItems(activeTab);
  }, [activeTab]);

  const fetchItems = async (type: ContentType) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${type}`);
      if (res.ok) {
        const data = await res.json();
        setItems(Array.isArray(data) ? data : [data].filter(Boolean));
      }
    } catch (e) {
      console.error("Failed to fetch:", e);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const method = editing._id ? "PUT" : "POST";
      const url = `/api/admin/${activeTab}`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (res.ok) {
        setEditing(null);
        fetchItems(activeTab);
      }
    } catch (e) {
      console.error("Failed to save:", e);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await fetch(`/api/admin/${activeTab}?id=${id}`, { method: "DELETE" });
      fetchItems(activeTab);
    } catch (e) {
      console.error("Failed to delete:", e);
    }
  };

  return (
    <div className="min-h-screen bg-sand">
      {/* Header */}
      <header className="bg-white border-b border-sand-dark px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted">Manage your website content</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted">{user?.email}</span>
            <a
              href="/studio"
              className="bg-ocean text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-ocean-dark transition-colors"
            >
              Open CMS Studio
            </a>
            <Link
              href="/"
              className="border border-sand-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-sand transition-colors"
            >
              View Website
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="text-red-500 text-sm font-medium hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <nav className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-sand-dark overflow-hidden">
              <div className="p-4 border-b border-sand-dark">
                <h2 className="font-semibold text-sm text-foreground">Content Types</h2>
              </div>
              <ul>
                {contentTypes.map((ct) => (
                  <li key={ct.key}>
                    <button
                      onClick={() => {
                        setActiveTab(ct.key);
                        setEditing(null);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                        activeTab === ct.key
                          ? "bg-ocean/5 text-ocean font-medium border-l-2 border-ocean"
                          : "text-foreground hover:bg-sand"
                      }`}
                    >
                      <span>{ct.icon}</span>
                      {ct.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-sand-dark">
              {/* Toolbar */}
              <div className="flex items-center justify-between p-4 border-b border-sand-dark">
                <h2 className="font-bold text-foreground">
                  {contentTypes.find((c) => c.key === activeTab)?.icon}{" "}
                  {contentTypes.find((c) => c.key === activeTab)?.label}
                </h2>
                {activeTab !== "settings" && activeTab !== "enquiries" && (
                  <button
                    onClick={() => setEditing({ _type: getSanityType(activeTab) })}
                    className="bg-ocean text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-ocean-dark transition-colors"
                  >
                    + Add New
                  </button>
                )}
              </div>

              {/* Content area */}
              <div className="p-4">
                {editing ? (
                  <EditForm
                    type={activeTab}
                    item={editing}
                    onChange={setEditing}
                    onSave={handleSave}
                    onCancel={() => setEditing(null)}
                    saving={saving}
                  />
                ) : loading ? (
                  <div className="text-center py-12 text-muted">Loading...</div>
                ) : activeTab === "settings" ? (
                  <SettingsForm />
                ) : activeTab === "enquiries" ? (
                  <EnquiriesList items={items} />
                ) : items.length === 0 ? (
                  <div className="text-center py-12 text-muted">
                    No items yet. Click &quot;+ Add New&quot; to create one.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item: any) => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between p-4 border border-sand-dark rounded-lg hover:bg-sand/50 transition-colors"
                      >
                        <div>
                          <div className="font-medium text-foreground">
                            {item.title || item.name || item.question || "Untitled"}
                          </div>
                          <div className="text-sm text-muted">
                            {item.description || item.role || item.category || ""}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditing(item)}
                            className="text-ocean text-sm font-medium hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-red-500 text-sm font-medium hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getSanityType(tab: ContentType): string {
  const map: Record<ContentType, string> = {
    services: "service",
    equipment: "equipment",
    packages: "holidayPackage",
    testimonials: "testimonial",
    faq: "faqItem",
    team: "teamMember",
    settings: "siteSettings",
    enquiries: "enquiry",
  };
  return map[tab];
}

// Edit Form for each content type
function EditForm({
  type,
  item,
  onChange,
  onSave,
  onCancel,
  saving,
}: {
  type: ContentType;
  item: any;
  onChange: (item: any) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const update = (field: string, value: any) => {
    onChange({ ...item, [field]: value });
  };

  const fields = getFieldsForType(type);

  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-foreground mb-1">
            {field.label}
          </label>
          {field.type === "text" && (
            <input
              type="text"
              value={item[field.name] || ""}
              onChange={(e) => update(field.name, e.target.value)}
              className="w-full border border-sand-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
            />
          )}
          {field.type === "textarea" && (
            <textarea
              value={item[field.name] || ""}
              onChange={(e) => update(field.name, e.target.value)}
              rows={3}
              className="w-full border border-sand-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
            />
          )}
          {field.type === "number" && (
            <input
              type="number"
              value={item[field.name] || ""}
              onChange={(e) => update(field.name, Number(e.target.value))}
              className="w-full border border-sand-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
            />
          )}
          {field.type === "boolean" && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!item[field.name]}
                onChange={(e) => update(field.name, e.target.checked)}
                className="accent-ocean w-4 h-4"
              />
              <span className="text-sm text-muted">{field.hint || "Yes"}</span>
            </label>
          )}
          {field.type === "list" && (
            <ListEditor
              items={item[field.name] || []}
              onChange={(val: string[]) => update(field.name, val)}
            />
          )}
        </div>
      ))}

      <div className="flex gap-3 pt-4 border-t border-sand-dark">
        <button
          onClick={onSave}
          disabled={saving}
          className="bg-ocean text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-ocean-dark transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          onClick={onCancel}
          className="border border-sand-dark px-6 py-2 rounded-lg text-sm font-medium hover:bg-sand transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// List editor for array fields
function ListEditor({
  items,
  onChange,
}: {
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const addItem = () => onChange([...items, ""]);
  const removeItem = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const updateItem = (i: number, val: string) => {
    const next = [...items];
    next[i] = val;
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => updateItem(i, e.target.value)}
            className="flex-1 border border-sand-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
          />
          <button
            onClick={() => removeItem(i)}
            className="text-red-500 text-sm px-2 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
      <button onClick={addItem} className="text-ocean text-sm font-medium hover:underline">
        + Add item
      </button>
    </div>
  );
}

// Settings form
function SettingsForm() {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings(data || {});
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
  };

  if (loading) return <div className="text-center py-8 text-muted">Loading...</div>;

  return (
    <div className="space-y-4">
      {[
        { name: "siteName", label: "Site Name", type: "text" },
        { name: "tagline", label: "Tagline", type: "text" },
        { name: "description", label: "Site Description (SEO)", type: "textarea" },
        { name: "phone", label: "Phone Number", type: "text" },
        { name: "email", label: "Email", type: "text" },
        { name: "address", label: "Address", type: "textarea" },
        { name: "whatsappNumber", label: "WhatsApp Number", type: "text" },
        { name: "whatsappMessage", label: "WhatsApp Default Message", type: "text" },
        { name: "businessHours", label: "Business Hours", type: "textarea" },
      ].map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-foreground mb-1">
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              value={settings[field.name] || ""}
              onChange={(e) => setSettings({ ...settings, [field.name]: e.target.value })}
              rows={3}
              className="w-full border border-sand-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
            />
          ) : (
            <input
              type="text"
              value={settings[field.name] || ""}
              onChange={(e) => setSettings({ ...settings, [field.name]: e.target.value })}
              className="w-full border border-sand-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
            />
          )}
        </div>
      ))}
      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-ocean text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-ocean-dark transition-colors disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
}

// Field definitions for each content type
function getFieldsForType(type: ContentType) {
  const fieldMap: Record<string, any[]> = {
    services: [
      { name: "title", label: "Title", type: "text" },
      { name: "icon", label: "Icon (emoji)", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "details", label: "What's Included", type: "list" },
      { name: "ctaText", label: "CTA Button Text", type: "text" },
      { name: "ctaLink", label: "CTA Link", type: "text" },
      { name: "order", label: "Display Order", type: "number" },
    ],
    equipment: [
      { name: "name", label: "Name", type: "text" },
      { name: "icon", label: "Icon (emoji)", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "features", label: "Features", type: "list" },
      { name: "rateDaily", label: "Rate Daily (IDR)", type: "text" },
      { name: "rateWeekly", label: "Rate Weekly (IDR)", type: "text" },
      { name: "rateHoliday", label: "Rate Holiday (IDR)", type: "text" },
      { name: "rateDailyAud", label: "Rate Daily (AUD)", type: "text" },
      { name: "rateWeeklyAud", label: "Rate Weekly (AUD)", type: "text" },
      { name: "rateHolidayAud", label: "Rate Holiday (AUD)", type: "text" },
      { name: "bestFor", label: "Best For", type: "textarea" },
      { name: "order", label: "Display Order", type: "number" },
    ],
    packages: [
      { name: "name", label: "Name", type: "text" },
      { name: "nights", label: "Number of Nights", type: "number" },
      { name: "priceAud", label: "Price (AUD)", type: "number" },
      { name: "priceGbp", label: "Price (GBP)", type: "number" },
      { name: "priceUsd", label: "Price (USD)", type: "number" },
      { name: "popular", label: "Most Popular?", type: "boolean" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "included", label: "What's Included", type: "list" },
      { name: "excluded", label: "Not Included", type: "list" },
      { name: "itinerary", label: "Sample Itinerary", type: "list" },
      { name: "order", label: "Display Order", type: "number" },
    ],
    testimonials: [
      { name: "name", label: "Guest Name", type: "text" },
      { name: "location", label: "Location", type: "text" },
      { name: "rating", label: "Rating (1-5)", type: "number" },
      { name: "text", label: "Testimonial Text", type: "textarea" },
      { name: "featured", label: "Show on Homepage?", type: "boolean" },
    ],
    faq: [
      { name: "category", label: "Category", type: "text" },
      { name: "question", label: "Question", type: "text" },
      { name: "answer", label: "Answer", type: "textarea" },
      { name: "order", label: "Display Order", type: "number" },
    ],
    team: [
      { name: "name", label: "Name", type: "text" },
      { name: "role", label: "Role / Title", type: "text" },
      { name: "bio", label: "Bio", type: "textarea" },
      { name: "order", label: "Display Order", type: "number" },
    ],
    settings: [],
    enquiries: [],
  };
  return fieldMap[type] || [];
}

// Enquiries list component
function EnquiriesList({ items }: { items: any[] }) {
  const [selected, setSelected] = useState<any>(null);

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-muted">
        No enquiries yet. They&apos;ll appear here when customers submit the contact form.
      </div>
    );
  }

  if (selected) {
    return (
      <div>
        <button
          onClick={() => setSelected(null)}
          className="text-ocean text-sm font-medium hover:underline mb-4"
        >
          ← Back to all enquiries
        </button>
        <div className="border border-sand-dark rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">
              {selected.firstName} {selected.lastName}
            </h3>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                selected.status === "new"
                  ? "bg-blue-100 text-blue-700"
                  : selected.status === "contacted"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {selected.status || "new"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><strong>Email:</strong> {selected.email}</div>
            <div><strong>Phone:</strong> {selected.phone || "N/A"}</div>
            <div><strong>Contact method:</strong> {selected.contactMethod}</div>
            <div><strong>People:</strong> {selected.people}</div>
            <div><strong>Dates:</strong> {selected.dateFrom || "TBD"} to {selected.dateTo || "TBD"}</div>
            <div><strong>Accommodation:</strong> {selected.accommodation || "N/A"}</div>
            <div><strong>Mobility:</strong> {selected.mobilityLevel || "N/A"}</div>
            <div><strong>Submitted:</strong> {selected.submittedAt ? new Date(selected.submittedAt).toLocaleDateString() : "N/A"}</div>
          </div>
          {selected.services?.length > 0 && (
            <div className="mt-4">
              <strong className="text-sm">Services:</strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {selected.services.map((s: string) => (
                  <span key={s} className="bg-sand text-xs px-2 py-1 rounded">{s}</span>
                ))}
              </div>
            </div>
          )}
          {selected.specificNeeds && (
            <div className="mt-4">
              <strong className="text-sm">Specific needs:</strong>
              <p className="text-sm text-muted mt-1">{selected.specificNeeds}</p>
            </div>
          )}
          {selected.message && (
            <div className="mt-4">
              <strong className="text-sm">Message:</strong>
              <p className="text-sm text-muted mt-1">{selected.message}</p>
            </div>
          )}
          <div className="mt-6 flex gap-3">
            <a
              href={`mailto:${selected.email}`}
              className="bg-ocean text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-ocean-dark transition-colors"
            >
              Reply via Email
            </a>
            {selected.phone && (
              <a
                href={`https://wa.me/${selected.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item: any) => (
        <div
          key={item._id}
          onClick={() => setSelected(item)}
          className="flex items-center justify-between p-4 border border-sand-dark rounded-lg hover:bg-sand/50 transition-colors cursor-pointer"
        >
          <div>
            <div className="font-medium text-foreground">
              {item.firstName} {item.lastName}
            </div>
            <div className="text-sm text-muted">
              {item.email} • {item.services?.join(", ") || "No services specified"}
            </div>
            <div className="text-xs text-muted mt-1">
              {item.submittedAt ? new Date(item.submittedAt).toLocaleString() : ""}
            </div>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              item.status === "new"
                ? "bg-blue-100 text-blue-700"
                : item.status === "contacted"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {item.status || "new"}
          </span>
        </div>
      ))}
    </div>
  );
}

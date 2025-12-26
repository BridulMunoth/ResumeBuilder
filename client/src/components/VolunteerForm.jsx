import { HandHeart, Plus, Trash2, Lightbulb } from "lucide-react";
import React, { useState } from "react";
import TipsPanel from "./TipsPanel";

const VolunteerForm = ({ data = [], onChange }) => {
  const [showTips, setShowTips] = useState(false);

  const addItem = () => {
    onChange([
      ...(data || []),
      {
        role: "",
        organization: "",
        location: "",
        start_date: "",
        end_date: "",
        description: "",
        link: "",
      },
    ]);
  };

  const removeItem = (index) => {
    onChange((data || []).filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const updated = [...(data || [])];
    updated[index][field] = value;
    onChange(updated);
  };

  const baseInputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm " +
    "text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 " +
    "focus:ring-1 focus:ring-sky-500 transition shadow-sm";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-slate-200 text-pink-500 shadow-sm">
              <HandHeart className="h-4 w-4" />
            </span>
            Volunteer & Extra-curricular
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Include clubs, NGOs, leadership roles, and events.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowTips(true)}
            aria-label="Get tips"
            title="Get tips"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-yellow-200 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition"
          >
            <Lightbulb className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition"
          >
            <Plus className="h-4 w-4" />
            Add activity
          </button>
        </div>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50">
            <HandHeart className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-sm font-medium text-slate-900">
            No volunteer activity added yet.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Click <span className="font-semibold">“Add activity”</span> to get
            started.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6 transition-all hover:shadow-md"
            >
              {/* Card header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-pink-500">
                    Activity #{index + 1}
                  </p>
                  {(item.role || item.organization) && (
                    <p className="text-sm font-semibold text-slate-900">
                      {item.role || "Role not set"}
                      {item.organization && (
                        <span className="text-slate-500">
                          {" "}
                          · {item.organization}
                        </span>
                      )}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => removeItem(index)}
                  className="group inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-slate-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition"
                  aria-label="Remove activity"
                  title="Remove activity"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-slate-100" />

              {/* Fields layout */}
              <div className="grid gap-5">
                {/* Row 1: Role + Organization */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Role
                    </label>
                    <input
                      value={item.role}
                      onChange={(e) =>
                        updateItem(index, "role", e.target.value)
                      }
                      type="text"
                      className={baseInputClass}
                      placeholder="e.g., Volunteer Lead"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Organization
                    </label>
                    <input
                      value={item.organization}
                      onChange={(e) =>
                        updateItem(index, "organization", e.target.value)
                      }
                      type="text"
                      className={baseInputClass}
                      placeholder="e.g., Red Cross, NSS"
                    />
                  </div>
                </div>

                {/* Row 2: Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Location
                  </label>
                  <input
                    value={item.location}
                    onChange={(e) =>
                      updateItem(index, "location", e.target.value)
                    }
                    type="text"
                    className={baseInputClass}
                    placeholder="City, Country"
                  />
                </div>

                {/* Row 3: Start & End date (own row) */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Start date
                    </label>
                    <input
                      value={item.start_date}
                      onChange={(e) =>
                        updateItem(index, "start_date", e.target.value)
                      }
                      type="month"
                      className={baseInputClass}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      End date
                    </label>
                    <input
                      value={item.end_date}
                      onChange={(e) =>
                        updateItem(index, "end_date", e.target.value)
                      }
                      type="month"
                      className={baseInputClass}
                    />
                  </div>
                </div>

                {/* Row 4: Link */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Link (optional)
                  </label>
                  <input
                    value={item.link}
                    onChange={(e) => updateItem(index, "link", e.target.value)}
                    type="url"
                    className={baseInputClass}
                    placeholder="Event / organization link"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={item.description}
                  onChange={(e) =>
                    updateItem(index, "description", e.target.value)
                  }
                  className={`${baseInputClass} min-h-[100px] resize-none`}
                  placeholder="Describe your contribution and impact"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tips Panel */}
      <TipsPanel
        open={showTips}
        onClose={() => setShowTips(false)}
        title="Volunteer Tips"
        sections={[
          {
            heading: "What to include",
            points: [
              "Focus on role, responsibilities, and impact.",
              "Include clubs, cultural committees, NGOs, and college events.",
              "Add measurable results if possible (people helped, events organized, funds raised).",
            ],
          },
        ]}
      />
    </div>
  );
};

export default VolunteerForm;

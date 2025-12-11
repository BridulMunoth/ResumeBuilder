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

  // shared input style
  const baseInputClass =
    "w-full rounded-2xl border border-white/80 bg-white/95 px-3.5 py-3 text-sm " +
    "text-slate-900 placeholder:text-slate-400 shadow-[0_8px_22px_rgba(15,23,42,0.08)] " +
    "backdrop-blur-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-400/60 outline-none transition";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <HandHeart className="h-5 w-5 text-pink-600" />
            Volunteer & Extra-curricular
          </h3>
          <p className="text-sm text-slate-600">
            Include clubs, NGOs, leadership roles, and events.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowTips(true)}
            aria-label="Get tips"
            title="Get tips"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full 
              border border-yellow-300/80 bg-yellow-50/90 
              text-yellow-600 shadow-[0_0_10px_rgba(250,204,21,0.35)] 
              backdrop-blur-md transition hover:bg-yellow-100"
          >
            <Lightbulb className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center gap-2 rounded-xl 
              bg-emerald-50 border border-emerald-300/60 
              px-5 py-2.5 text-sm font-medium text-emerald-700
              hover:bg-emerald-100 transition"
          >
            <Plus className="h-4 w-4" />
            Add activity
          </button>
        </div>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200/80 bg-white/70 py-10 text-center shadow-inner backdrop-blur-xl">
          <HandHeart className="mx-auto mb-3 h-10 w-10 text-slate-300" />
          <p className="text-sm font-medium text-slate-700">
            No volunteer activity added yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/80 bg-white/90 p-6 
              shadow-[0_18px_46px_rgba(15,23,42,0.12)] backdrop-blur-xl space-y-6"
            >
              {/* Card header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pink-500">
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
                  className="inline-flex h-8 w-8 items-center justify-center 
                    rounded-xl bg-rose-50 border border-rose-300/60 
                    text-rose-600 hover:bg-rose-100 transition"
                  aria-label="Remove activity"
                  title="Remove activity"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-100 to-transparent" />

              {/* Fields layout */}
              <div className="grid gap-4">
                {/* Row 1: Role + Organization */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
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
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
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
                  <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
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
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
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
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
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
                  <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                    Link (optional)
                  </label>
                  <input
                    value={item.link}
                    onChange={(e) =>
                      updateItem(index, "link", e.target.value)
                    }
                    type="url"
                    className={baseInputClass}
                    placeholder="Event / organization link"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-100 to-transparent" />

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={item.description}
                  onChange={(e) =>
                    updateItem(index, "description", e.target.value)
                  }
                  className={`${baseInputClass} min-h-[120px] resize-none`}
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

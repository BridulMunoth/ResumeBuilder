import { ListChecks, Plus, Trash2 } from "lucide-react";
import React from "react";

const CustomSectionsForm = ({ data = [], onChange }) => {
  const addSection = () => {
    onChange([
      ...(data || []),
      { id: Date.now().toString(), title: "", items: "", link: "" }, // items as string
    ]);
  };

  const removeSection = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateSection = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    onChange(updated);
  };

  const baseInputClass =
    "w-full rounded-2xl border border-white/80 bg-white/95 px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-[0_8px_22px_rgba(15,23,42,0.08)] backdrop-blur-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-400/60 outline-none transition";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <ListChecks className="h-5 w-5 text-indigo-600" />
            Custom Sections
          </h3>
          <p className="text-sm text-slate-600">
            Add flexible sections like Publications, Workshops, Hackathons, etc.
          </p>
        </div>

        <button
          onClick={addSection}
          className="inline-flex items-center gap-2 rounded-xl 
            bg-emerald-50 border border-emerald-300/60 
            px-5 py-2.5 text-sm font-medium text-emerald-700 
            hover:bg-emerald-100 transition"
        >
          <Plus className="h-4 w-4" /> Add section
        </button>
      </div>

      {/* Empty */}
      {data.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200/80 bg-white/70 py-10 text-center shadow-inner backdrop-blur-xl">
          <ListChecks className="mx-auto mb-3 h-10 w-10 text-slate-300" />
          <p className="text-sm text-slate-700">No custom sections yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((section, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-[0_18px_46px_rgba(15,23,42,0.12)] backdrop-blur-xl space-y-6"
            >
              {/* Header Row */}
              <div className="flex items-start justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-500">
                  Section #{index + 1}
                </p>

                <button
                  onClick={() => removeSection(index)}
                  className="inline-flex h-8 w-8 items-center justify-center 
                    rounded-xl bg-rose-50 border border-rose-300/60 
                    text-rose-600 hover:bg-rose-100 transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                  Section Title
                </label>
                <input
                  value={section.title || ""}
                  onChange={(e) =>
                    updateSection(index, "title", e.target.value)
                  }
                  type="text"
                  className={baseInputClass}
                  placeholder="e.g., Publications, Workshops, Hackathons"
                />
              </div>

              {/* Items */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                  Items (one per line)
                </label>
                <textarea
                  rows={4}
                  value={section.items || ""} // plain string
                  onChange={(e) =>
                    updateSection(index, "items", e.target.value)
                  }
                  className={`${baseInputClass} min-h-[120px] resize-none`}
                  placeholder="Add each item on a new line"
                />
              </div>

              {/* Link */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                  Section link (optional)
                </label>
                <input
                  value={section.link || ""}
                  onChange={(e) => updateSection(index, "link", e.target.value)}
                  type="url"
                  className={baseInputClass}
                  placeholder="External link to documentation / website"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSectionsForm;

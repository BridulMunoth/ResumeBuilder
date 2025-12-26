import { Trophy, Plus, Trash2, Lightbulb } from "lucide-react";
import React, { useState } from "react";
import TipsPanel from "./TipsPanel";

const AchievementsForm = ({ data = [], onChange }) => {
  const [showTips, setShowTips] = useState(false);

  const addItem = () => {
    onChange([
      ...(data || []),
      { title: "", issuer: "", date: "", description: "", link: "" },
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
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4">
        <div className="space-y-1">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-slate-200 text-sky-500 shadow-sm">
              <Trophy className="h-4 w-4" />
            </span>
            Achievements & Awards
          </h3>
          <p className="text-sm text-slate-600">
            Highlight notable achievements, prizes, and recognitions.
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
            Add achievement
          </button>
        </div>
      </div>

      {/* EMPTY STATE */}
      {(data || []).length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50">
            <Trophy className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-sm font-medium text-slate-900">
            No achievements added yet.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Click <span className="font-semibold">“Add achievement”</span> to
            highlight your wins.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {(data || []).map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6 transition-all hover:shadow-md"
            >
              {/* CARD HEADER */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                    Achievement #{index + 1}
                  </p>
                  {(item.title || item.issuer) && (
                    <p className="text-sm font-semibold text-slate-900">
                      {item.title || "Achievement title not set"}
                      {item.issuer && (
                        <span className="text-slate-500"> · {item.issuer}</span>
                      )}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="group inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-slate-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition"
                  aria-label="Remove achievement"
                  title="Remove achievement"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* DIVIDER */}
              <div className="h-px w-full bg-slate-100" />

              {/* BODY */}
              <div className="space-y-6">
                {/* Title / Issuer */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Title
                    </label>
                    <input
                      value={item.title || ""}
                      onChange={(e) =>
                        updateItem(index, "title", e.target.value)
                      }
                      type="text"
                      placeholder="e.g., 1st Prize – WebWorks Expo"
                      className={baseInputClass}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Issuer / organization
                    </label>
                    <input
                      value={item.issuer || ""}
                      onChange={(e) =>
                        updateItem(index, "issuer", e.target.value)
                      }
                      type="text"
                      placeholder="e.g., College name, Company, Event"
                      className={baseInputClass}
                    />
                  </div>
                </div>

                {/* Date / Link */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Date
                    </label>
                    <input
                      value={item.date || ""}
                      onChange={(e) =>
                        updateItem(index, "date", e.target.value)
                      }
                      type="month"
                      className={baseInputClass}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Link (proof / article)
                    </label>
                    <input
                      value={item.link || ""}
                      onChange={(e) =>
                        updateItem(index, "link", e.target.value)
                      }
                      type="url"
                      placeholder="Certificate, article, or portfolio link"
                      className={baseInputClass}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Short description
                  </label>
                  <textarea
                    value={item.description || ""}
                    onChange={(e) =>
                      updateItem(index, "description", e.target.value)
                    }
                    rows={3}
                    className={`${baseInputClass} min-h-[110px] resize-none align-top`}
                    placeholder="Explain what this achievement was for and what made it significant."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <TipsPanel
        open={showTips}
        onClose={() => setShowTips(false)}
        title="Achievement Tips"
        sections={[
          {
            heading: "What stands out",
            points: [
              "Quantify rank or scale (e.g., 1st out of 120 teams).",
              "Mention level: college, state, national, or international.",
              "Link to proof (certificate, article, event page) when possible.",
            ],
          },
          {
            heading: "How to phrase",
            points: [
              "Keep the title short and powerful.",
              "Use the description for 1–2 lines of context and impact.",
            ],
          },
        ]}
      />
    </div>
  );
};

export default AchievementsForm;

import { GraduationCap, Plus, Trash2, Lightbulb } from "lucide-react";
import React, { useState } from "react";
import TipsPanel from "./TipsPanel";

const EducationForm = ({ data = [], onChange }) => {
  const [showTips, setShowTips] = useState(false);

  const addEducation = () => {
    const newEducation = {
      school: "",
      degree: "",
      field: "",
      location: "",
      start_date: "",
      end_date: "",
      is_current: false,
      description: "",
      link: "",
      grade: "",
    };
    onChange([...(data || []), newEducation]);
  };

  const removeEducation = (index) => {
    const updated = (data || []).filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...(data || [])];

    // Special handling for description so spaces & newlines are preserved
    if (field === "description") {
      const desc = String(value ?? "");
      const pursuingPattern = /\(?\s*pursu(?:ing)?\s*\)?/gi;

      // Detect "pursuing" and mark as current
      if (pursuingPattern.test(desc)) {
        updated[index].is_current = true;
      }

      // Remove the word "pursuing" but DO NOT trim spaces/newlines
      const cleaned = desc.replace(pursuingPattern, "");
      updated[index].description = cleaned;

      onChange(updated);
      return;
    }

    // Normal fields
    updated[index][field] = value;
    onChange(updated);
  };

  // spacious clean inputs (same system as ExperienceForm)
  const baseInputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-3.5 py-3 text-sm " +
    "text-slate-900 placeholder:text-slate-400 shadow-sm " +
    "focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 hover:border-sky-300 " +
    "outline-none transition";

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 rounded-2xl bg-white border border-gray-200 p-5">
        <div className="space-y-1">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
              <GraduationCap className="h-4 w-4" />
            </span>
            Education
          </h3>
          <p className="text-sm text-slate-600">
            Add your academic background, from school to university.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowTips(true)}
            aria-label="Get tips"
            title="Get tips"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-yellow-200 bg-yellow-50 text-yellow-600 shadow-sm transition hover:bg-yellow-100"
          >
            <Lightbulb className="h-4 w-4" />
          </button>

          {/* pastel add button */}
          <button
            type="button"
            onClick={addEducation}
            className="inline-flex items-center gap-2 rounded-xl 
                       bg-emerald-50 border border-emerald-200 
                       px-5 py-2.5 text-sm font-medium text-emerald-700
                       hover:bg-emerald-100 transition shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add education
          </button>
        </div>
      </div>

      {/* EMPTY STATE */}
      {(data || []).length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50/50 py-10 text-center">
          <GraduationCap className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          <p className="text-sm font-medium text-slate-800">
            No education added yet.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Click <span className="font-semibold">“Add education”</span> to
            start with your latest degree.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {(data || []).map((education, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6"
            >
              {/* CARD HEADER */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-500">
                    Education #{index + 1}
                  </p>
                  {(education.degree || education.school) && (
                    <p className="text-sm font-semibold text-slate-900">
                      {education.degree || "Degree not set"}
                      {education.school && (
                        <span className="text-slate-500">
                          {" "}
                          · {education.school}
                        </span>
                      )}
                    </p>
                  )}
                </div>

                {/* delete button */}
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="inline-flex h-8 w-8 items-center justify-center 
                             rounded-xl bg-rose-50 border border-rose-300/70 
                             text-rose-600 hover:bg-rose-100 transition"
                  aria-label="Remove education"
                  title="Remove education"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-100 to-transparent" />

              {/* BODY */}
              <div className="space-y-6">
                {/* DEGREE + FIELD */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Degree
                    </label>
                    <input
                      value={
                        education.degree ||
                        [education.level, education.program, education.field]
                          .filter(Boolean)
                          .join(" ") ||
                        ""
                      }
                      onChange={(e) =>
                        updateEducation(index, "degree", e.target.value)
                      }
                      type="text"
                      placeholder="e.g., BCA, B.Tech in CSE"
                      className={baseInputClass}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Field of study
                    </label>
                    <input
                      value={education.field || ""}
                      onChange={(e) =>
                        updateEducation(index, "field", e.target.value)
                      }
                      type="text"
                      placeholder="e.g., Computer Science, Mechanical Engineering"
                      className={baseInputClass}
                    />
                  </div>
                </div>

                {/* SCHOOL + LINK */}
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      School / University
                    </label>
                    <input
                      value={education.school || education.institution || ""}
                      onChange={(e) =>
                        updateEducation(index, "school", e.target.value)
                      }
                      type="text"
                      placeholder="e.g., XYZ College of Engineering"
                      className={baseInputClass}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Link (opt)
                    </label>
                    <input
                      value={education.link || ""}
                      onChange={(e) =>
                        updateEducation(index, "link", e.target.value)
                      }
                      type="url"
                      placeholder="College / program reference link"
                      className={baseInputClass}
                    />
                  </div>
                </div>

                {/* GRADE */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                    Grade / Percentage / GPA
                  </label>
                  <input
                    value={
                      education.grade ||
                      education.gpa ||
                      education.percentage ||
                      ""
                    }
                    onChange={(e) =>
                      updateEducation(index, "grade", e.target.value)
                    }
                    type="text"
                    placeholder="e.g., 8.5 CGPA / 86%"
                    className={baseInputClass}
                  />
                </div>

                {/* DATES + LOCATION + CURRENTLY STUDYING */}
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Start date
                    </label>
                    <input
                      value={education.start_date || ""}
                      onChange={(e) =>
                        updateEducation(index, "start_date", e.target.value)
                      }
                      type="month"
                      className={baseInputClass}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                        End date
                      </label>
                      <input
                        value={
                          education.end_date || education.graduation_date || ""
                        }
                        onChange={(e) =>
                          updateEducation(index, "end_date", e.target.value)
                        }
                        type="month"
                        disabled={!!education.is_current}
                        className={`${baseInputClass} disabled:bg-slate-100/80 disabled:text-slate-400`}
                      />
                    </div>

                    <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-600">
                      <div className="relative inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={!!education.is_current}
                          onChange={(e) =>
                            updateEducation(
                              index,
                              "is_current",
                              e.target.checked
                            )
                          }
                          className="peer sr-only"
                        />
                        <div className="h-5 w-9 rounded-full bg-slate-300/80 shadow-inner transition-colors duration-200 peer-checked:bg-emerald-500/90" />
                        <span className="pointer-events-none absolute left-1 top-[3px] h-3 w-3 rounded-full bg-white shadow-[0_4px_10px_rgba(15,23,42,0.25)] transition-transform duration-200 ease-in-out peer-checked:translate-x-4" />
                      </div>
                      Currently studying
                    </label>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Location
                    </label>
                    <input
                      value={
                        education.location || education.board_university || ""
                      }
                      onChange={(e) =>
                        updateEducation(index, "location", e.target.value)
                      }
                      type="text"
                      placeholder="City, Country"
                      className={baseInputClass}
                    />
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-100 to-transparent" />

                {/* DESCRIPTION */}
                <div className="space-y-2.5">
                  <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                    Description / Highlights
                  </label>
                  <textarea
                    rows={3}
                    value={education.description || ""}
                    onChange={(e) =>
                      updateEducation(index, "description", e.target.value)
                    }
                    className={`${baseInputClass} min-h-[120px] resize-none align-top`}
                    placeholder="Activities, societies, key subjects, scholarships, and achievements"
                  />
                  <p className="text-[11px] text-slate-400">
                    Tip: If you type &quot;pursuing&quot; here, we&apos;ll
                    automatically mark this as current.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TIPS PANEL */}
      <TipsPanel
        open={showTips}
        onClose={() => setShowTips(false)}
        title="Education Tips"
        sections={[
          {
            heading: "What to include",
            points: [
              "List your most recent or most relevant education first.",
              "Include program, field, institution, board/university, and location.",
              "Add your score (GPA/%) only if it strengthens your profile.",
            ],
          },
          {
            heading: "Description ideas",
            points: [
              "Mention key subjects, academic projects, or research topics.",
              "Add leadership roles in clubs, committees, or student bodies.",
              "Highlight scholarships, awards, or academic achievements.",
            ],
          },
        ]}
      />
    </div>
  );
};

export default EducationForm;

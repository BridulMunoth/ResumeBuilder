import {
  Briefcase,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
  Lightbulb,
} from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import TipsPanel from "./TipsPanel";

const ExperienceForm = ({ data = [], onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [generatingIndex, setGeneratingIndex] = useState(-1);
  const [showTips, setShowTips] = useState(false);

  const addExperience = () => {
    const newExperience = {
      title: "",
      company: "",
      employment_type: "",
      location: "",
      start_date: "",
      end_date: "",
      is_current: false,
      description: "",
      achievements: "",   // <-- store as string
      technologies: "",   // <-- store as string
      link: "",
    };
    onChange([...(data || []), newExperience]);
  };

  const removeExperience = (index) => {
    const updated = (data || []).filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...(data || [])];
    updated[index][field] = value;
    onChange(updated);
  };

  const generateDescription = async (index) => {
    setGeneratingIndex(index);
    const experience = data[index];
    const prompt = `enhance this job description ${experience.description} for the position of ${experience.title} at ${experience.company}.`;

    try {
      const { data } = await api.post(
        "api/ai/enhance-job-desc",
        { userContent: prompt },
        { headers: { Authorization: token } }
      );
      updateExperience(index, "description", data.enhancedContent);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setGeneratingIndex(-1);
    }
  };

  // spacious glassy input style
  const baseInputClass =
    "w-full rounded-2xl border border-white/80 bg-white/95 px-3.5 py-3 text-sm " +
    "text-slate-900 placeholder:text-slate-400 shadow-[0_10px_26px_rgba(15,23,42,0.08)] " +
    "backdrop-blur-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-400/60 " +
    "outline-none transition";

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 rounded-3xl bg-gradient-to-r from-sky-50 via-white to-emerald-50/80 px-5 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-white/80">
        <div className="space-y-1">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-sky-500 to-indigo-500 shadow-[0_8px_20px_rgba(56,189,248,0.55)] ring-2 ring-white/80">
              <Briefcase className="h-4 w-4 text-white" />
            </span>
            Professional Experience
          </h3>
          <p className="text-sm text-slate-600">
            Add your internships, jobs, and freelance projects.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowTips(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-yellow-300/80 bg-yellow-50/90 text-yellow-600 shadow-[0_0_10px_rgba(250,204,21,0.35)] hover:bg-yellow-100"
          >
            <Lightbulb className="h-4 w-4" />
          </button>

          {/* Add experience button */}
          <button
            type="button"
            onClick={addExperience}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-300/70 px-5 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition"
          >
            <Plus className="h-4 w-4" />
            Add experience
          </button>
        </div>
      </div>

      {/* EMPTY STATE */}
      {(data || []).length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200/90 bg-gradient-to-b from-sky-50/95 via-white/95 to-indigo-50/90 py-10 text-center shadow-[0_16px_38px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <Briefcase className="mx-auto mb-3 h-10 w-10 text-slate-300" />
          <p className="text-sm font-medium text-slate-800">
            No work experience added yet.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Click <span className="font-semibold">“Add experience”</span> to
            start with your latest role.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {(data || []).map((experience, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.14)] backdrop-blur-2xl space-y-6"
            >
              {/* CARD HEADER */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-500">
                    Experience #{index + 1}
                  </p>

                  {(experience.title || experience.company) && (
                    <p className="text-sm font-semibold text-slate-900">
                      {experience.title || "Role not set"}
                      {experience.company && (
                        <span className="text-slate-500">
                          {" "}
                          · {experience.company}
                        </span>
                      )}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 border border-rose-300/70 text-rose-600 hover:bg-rose-100 transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* DIVIDER */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-100 to-transparent" />

              {/* BODY */}
              <div className="space-y-6">
                {/* COMPANY / TITLE */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Company
                    </label>
                    <input
                      type="text"
                      value={experience.company || ""}
                      onChange={(e) =>
                        updateExperience(index, "company", e.target.value)
                      }
                      placeholder="e.g., Acme Pvt. Ltd."
                      className={baseInputClass}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Job title
                    </label>
                    <input
                      type="text"
                      value={experience.title || ""}
                      onChange={(e) =>
                        updateExperience(index, "title", e.target.value)
                      }
                      placeholder="e.g., Frontend Developer"
                      className={baseInputClass}
                    />
                  </div>
                </div>

                {/* EMPLOYMENT TYPE / LOCATION */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Employment type
                    </label>
                    <select
                      value={experience.employment_type || ""}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "employment_type",
                          e.target.value
                        )
                      }
                      className={`${baseInputClass} bg-white/95 pr-10`}
                    >
                      <option value="" disabled hidden>
                        Select employment
                      </option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Self-employed">Self-employed</option>
                      <option value="Apprenticeship">Apprenticeship</option>
                      <option value="Seasonal">Seasonal</option>
                      <option value="Temporary">Temporary</option>
                      <option value="Volunteer">Volunteer</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Location
                    </label>
                    <input
                      type="text"
                      value={experience.location || ""}
                      onChange={(e) =>
                        updateExperience(index, "location", e.target.value)
                      }
                      placeholder="City, Country or Remote"
                      className={baseInputClass}
                    />
                  </div>
                </div>

                {/* DATES + CURRENT */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Start date
                    </label>
                    <input
                      type="month"
                      value={experience.start_date || ""}
                      onChange={(e) =>
                        updateExperience(index, "start_date", e.target.value)
                      }
                      className={baseInputClass}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                        End date
                      </label>
                      <input
                        type="month"
                        disabled={experience.is_current}
                        value={experience.end_date || ""}
                        onChange={(e) =>
                          updateExperience(index, "end_date", e.target.value)
                        }
                        className={`${baseInputClass} disabled:bg-slate-100/80 disabled:text-slate-400`}
                      />
                    </div>

                    <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-600">
                      <div className="relative inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={experience.is_current || false}
                          onChange={(e) =>
                            updateExperience(
                              index,
                              "is_current",
                              e.target.checked
                            )
                          }
                          className="peer sr-only"
                        />
                        <div className="h-5 w-9 rounded-full bg-slate-300/80 shadow-inner peer-checked:bg-emerald-500/90 transition" />
                        <span className="pointer-events-none absolute left-1 top-[3px] h-3 w-3 rounded-full bg-white shadow-[0_4px_10px_rgba(15,23,42,0.25)] peer-checked:translate-x-4 transition-transform" />
                      </div>
                      Currently working here
                    </label>
                  </div>
                </div>

                {/* LINK */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                    Company / role link (optional)
                  </label>
                  <input
                    type="url"
                    value={experience.link || ""}
                    onChange={(e) =>
                      updateExperience(index, "link", e.target.value)
                    }
                    placeholder="Portfolio / company / role URL"
                    className={baseInputClass}
                  />
                </div>

                {/* DIVIDER */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-100 to-transparent" />

                {/* DESCRIPTION */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Job description
                    </label>
                    <button
                      disabled={
                        generatingIndex === index ||
                        !experience.description ||
                        experience.description.length < 10 ||
                        !experience.company ||
                        !experience.title
                      }
                      onClick={() => generateDescription(index)}
                      type="button"
                      className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-[0_10px_24px_rgba(139,92,246,0.65)] hover:brightness-110 disabled:opacity-60"
                    >
                      {generatingIndex === index ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          Enhancing…
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-3.5 w-3.5" />
                          Enhance with AI
                        </>
                      )}
                    </button>
                  </div>

                  <textarea
                    rows={4}
                    value={experience.description || ""}
                    onChange={(e) =>
                      updateExperience(index, "description", e.target.value)
                    }
                    placeholder="Describe your key responsibilities and impact."
                    className={`${baseInputClass} min-h-[130px] resize-none`}
                  />
                </div>

                {/* TECHNOLOGIES + ACHIEVEMENTS */}
                <div className="grid gap-4 md:grid-cols-2">
                  
                  {/* TECHNOLOGIES AS STRING */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Technologies (comma separated)
                    </label>
                    <input
                      type="text"
                      value={experience.technologies || ""}
                      onChange={(e) =>
                        updateExperience(index, "technologies", e.target.value)
                      }
                      placeholder="React, MongoDB, Express, AWS"
                      className={baseInputClass}
                    />
                  </div>

                  {/* ACHIEVEMENTS AS STRING */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Achievements (one per line)
                    </label>
                    <textarea
                      rows={3}
                      value={experience.achievements || ""}
                      onChange={(e) =>
                        updateExperience(index, "achievements", e.target.value)
                      }
                      placeholder={"e.g., Increased conversion by 18%\nReduced load time by 30%" }
                      className={`${baseInputClass} min-h-[110px] resize-none`}
                    />
                  </div>

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
        title="Experience Tips"
        sections={[
          {
            heading: "How to write strong experience",
            points: [
              "Use action verbs: Led, Built, Shipped, Improved, Optimized.",
              "Quantify results: % improvements, revenue impact, time saved.",
              "Focus more on recent and relevant roles.",
              "Keep 3–5 strong bullet points per role.",
            ],
          },
          {
            heading: "Tech & achievements",
            points: [
              "List core technologies used so ATS can match your profile.",
              "Highlight one or two standout achievements per role.",
              "Connect achievements to business or user impact.",
            ],
          },
        ]}
      />
    </div>
  );
};

export default ExperienceForm;

import { ClipboardList, Plus, Trash2, Lightbulb } from "lucide-react";
import React, { useState } from "react";
import TipsPanel from "./TipsPanel";

const ProjectForm = ({ data = [], onChange }) => {
  const [showTips, setShowTips] = useState(false);

  const addProject = () => {
    const newProject = {
      name: "",
      role: "",
      type: "",
      description: "",
      technologies: "", // <-- string in the form
      link: "",
      start_date: "",
      end_date: "",
      highlights: "", // <-- string in the form
    };
    onChange([...(data || []), newProject]);
  };

  const removeProject = (index) => {
    const updated = (data || []).filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...(data || [])];
    updated[index][field] = value;
    onChange(updated);
  };

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
              <ClipboardList className="h-4 w-4" />
            </span>
            Projects
          </h3>
          <p className="text-sm text-slate-600">
            Showcase academic, personal, and freelance projects.
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

          <button
            type="button"
            onClick={addProject}
            className="inline-flex items-center gap-2 rounded-xl 
                       bg-emerald-50 border border-emerald-200 
                       px-5 py-2.5 text-sm font-medium text-emerald-700
                       hover:bg-emerald-100 transition shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add project
          </button>
        </div>
      </div>

      {/* EMPTY STATE */}
      {(data || []).length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 py-10 text-center">
          <ClipboardList className="mx-auto mb-3 h-10 w-10 text-gray-400" />
          <p className="text-sm font-medium text-slate-800">
            No projects added yet.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Click <span className="font-semibold">“Add project”</span> to get
            started.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {(data || []).map((project, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-6 space-y-6"
            >
              {/* CARD HEADER */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-500">
                    Project #{index + 1}
                  </p>
                  {(project.name || project.role) && (
                    <p className="text-sm font-semibold text-slate-900">
                      {project.name || "Project name not set"}
                      {project.role && (
                        <span className="text-slate-500">
                          {" "}
                          · {project.role}
                        </span>
                      )}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="inline-flex h-8 w-8 items-center justify-center 
                             rounded-lg bg-rose-50 border border-rose-200 
                             text-rose-600 hover:bg-rose-100 transition"
                  aria-label="Remove project"
                  title="Remove project"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* DIVIDER */}
              <div className="h-px w-full bg-gray-100" />

              {/* BODY */}
              <div className="space-y-6">
                {/* Name / Role / Type */}
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1.5 md:col-span-1">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Project name
                    </label>
                    <input
                      value={project.name || ""}
                      onChange={(e) =>
                        updateProject(index, "name", e.target.value)
                      }
                      type="text"
                      placeholder="e.g., JobGeni – Job search site"
                      className={baseInputClass}
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-1">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Role
                    </label>
                    <input
                      value={project.role || ""}
                      onChange={(e) =>
                        updateProject(index, "role", e.target.value)
                      }
                      type="text"
                      placeholder="e.g., Frontend Developer, Team Lead"
                      className={baseInputClass}
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-1">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Project type
                    </label>
                    <input
                      value={project.type || ""}
                      onChange={(e) =>
                        updateProject(index, "type", e.target.value)
                      }
                      type="text"
                      placeholder="e.g., Academic, Personal, Freelance"
                      className={baseInputClass}
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Start date
                    </label>
                    <input
                      value={project.start_date || ""}
                      onChange={(e) =>
                        updateProject(index, "start_date", e.target.value)
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
                      value={project.end_date || ""}
                      onChange={(e) =>
                        updateProject(index, "end_date", e.target.value)
                      }
                      type="month"
                      className={baseInputClass}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2.5">
                  <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                    Project description
                  </label>
                  <textarea
                    rows={4}
                    value={project.description || ""}
                    onChange={(e) =>
                      updateProject(index, "description", e.target.value)
                    }
                    placeholder="Explain what the project does, who it's for, and what you contributed."
                    className={`${baseInputClass} min-h-[130px] resize-none align-top`}
                  />
                </div>

                {/* Tech + Link */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Technologies (comma separated)
                    </label>
                    <input
                      value={project.technologies || ""} // <-- plain string
                      onChange={(e) =>
                        updateProject(index, "technologies", e.target.value)
                      }
                      type="text"
                      placeholder="e.g., React, Node.js, MongoDB, Tailwind"
                      className={baseInputClass}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Project link (live / GitHub)
                    </label>
                    <input
                      value={project.link || ""}
                      onChange={(e) =>
                        updateProject(index, "link", e.target.value)
                      }
                      type="url"
                      placeholder="Live demo or repository URL"
                      className={baseInputClass}
                    />
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-2.5">
                  <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                    Highlights (one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={project.highlights || ""} // <-- plain string
                    onChange={(e) =>
                      updateProject(index, "highlights", e.target.value)
                    }
                    placeholder="e.g., Handled 5,000+ monthly visitors; Implemented responsive UI; Integrated payment gateway"
                    className={`${baseInputClass} min-h-[110px] resize-none align-top`}
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
        title="Project Tips"
        sections={[
          {
            heading: "What to highlight",
            points: [
              "State your role, tech stack, and the problem your project solves.",
              "Mention users, scale, or impact if possible.",
              "Link to GitHub or live demo so employers can explore.",
            ],
          },
          {
            heading: "Good structure",
            points: [
              "1–2 lines: What the project is.",
              "2–3 lines: What you did specifically.",
              "1 line: Result or measurable impact.",
            ],
          },
        ]}
      />
    </div>
  );
};

export default ProjectForm;

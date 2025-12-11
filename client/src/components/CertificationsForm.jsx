import { Award, Plus, Trash2, Lightbulb } from "lucide-react";
import React, { useState } from "react";
import TipsPanel from "./TipsPanel";

const CertificationsForm = ({ data = [], onChange }) => {
  const [showTips, setShowTips] = useState(false);

  const addCertification = () => {
    const newItem = {
      name: "",
      issuer: "",
      issue_date: "",
      expiry_date: "",
      credential_id: "",
      credential_url: "",
      link: "",
    };
    onChange([...(data || []), newItem]);
  };

  const removeCertification = (index) => {
    onChange((data || []).filter((_, i) => i !== index));
  };

  const updateCertification = (index, field, value) => {
    const updated = [...(data || [])];
    updated[index][field] = value;
    onChange(updated);
  };

  const baseInputClass =
    "w-full rounded-2xl border border-white/80 bg-white/95 px-3.5 py-3 text-sm " +
    "text-slate-900 placeholder:text-slate-400 shadow-[0_10px_26px_rgba(15,23,42,0.08)] " +
    "backdrop-blur-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-400/60 " +
    "outline-none transition";

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 rounded-3xl bg-gradient-to-r from-sky-50 via-white to-indigo-50/80 px-5 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)] border border-white/80">
        <div className="space-y-1">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-sky-500 to-indigo-500 shadow-[0_8px_20px_rgba(56,189,248,0.55)] ring-2 ring-white/80">
              <Award className="h-4 w-4 text-white" />
            </span>
            Certifications & Courses
          </h3>
          <p className="text-sm text-slate-600">
            Add professional certifications, online courses, and credentials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowTips(true)}
            aria-label="Get tips"
            title="Get tips"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-yellow-300/80 bg-yellow-50/90 text-yellow-600 shadow-[0_0_10px_rgba(250,204,21,0.35)] backdrop-blur-md transition hover:bg-yellow-100"
          >
            <Lightbulb className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={addCertification}
            className="inline-flex items-center gap-2 rounded-xl 
                       bg-emerald-50 border border-emerald-300/70 
                       px-5 py-2.5 text-sm font-medium text-emerald-700
                       hover:bg-emerald-100 transition"
          >
            <Plus className="h-4 w-4" />
            Add certification
          </button>
        </div>
      </div>

      {/* EMPTY STATE */}
      {(data || []).length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200/90 bg-gradient-to-b from-sky-50/95 via-white/95 to-indigo-50/90 py-10 text-center shadow-[0_16px_38px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <Award className="mx-auto mb-3 h-10 w-10 text-slate-300" />
          <p className="text-sm font-medium text-slate-800">
            No certifications added yet.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Click <span className="font-semibold">“Add certification”</span> to
            get started.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {(data || []).map((cert, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.14)] backdrop-blur-2xl space-y-6"
            >
              {/* CARD HEADER */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-500">
                    Certification #{index + 1}
                  </p>
                  {(cert.name || cert.issuer) && (
                    <p className="text-sm font-semibold text-slate-900">
                      {cert.name || "Certification title not set"}
                      {cert.issuer && (
                        <span className="text-slate-500">
                          {" "}
                          · {cert.issuer}
                        </span>
                      )}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeCertification(index)}
                  className="inline-flex h-8 w-8 items-center justify-center 
                             rounded-xl bg-rose-50 border border-rose-300/70 
                             text-rose-600 hover:bg-rose-100 transition"
                  aria-label="Remove certification"
                  title="Remove certification"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* DIVIDER */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-100 to-transparent" />

              {/* BODY */}
              <div className="space-y-6">
                {/* Name / Issuer */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Certification / course name
                    </label>
                    <input
                      value={cert.name || ""}
                      onChange={(e) =>
                        updateCertification(index, "name", e.target.value)
                      }
                      type="text"
                      placeholder="e.g., AWS Certified Cloud Practitioner"
                      className={baseInputClass}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Issuer
                    </label>
                    <input
                      value={cert.issuer || ""}
                      onChange={(e) =>
                        updateCertification(index, "issuer", e.target.value)
                      }
                      type="text"
                      placeholder="e.g., Coursera, Udemy, AWS"
                      className={baseInputClass}
                    />
                  </div>
                </div>

                {/* Issue / Expiry dates */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Issue date
                    </label>
                    <input
                      value={cert.issue_date || ""}
                      onChange={(e) =>
                        updateCertification(index, "issue_date", e.target.value)
                      }
                      type="month"
                      className={baseInputClass}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Expiry date (if any)
                    </label>
                    <input
                      value={cert.expiry_date || ""}
                      onChange={(e) =>
                        updateCertification(index, "expiry_date", e.target.value)
                      }
                      type="month"
                      className={baseInputClass}
                    />
                  </div>
                </div>

                {/* Credential ID / URL */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Credential ID
                    </label>
                    <input
                      value={cert.credential_id || ""}
                      onChange={(e) =>
                        updateCertification(
                          index,
                          "credential_id",
                          e.target.value
                        )
                      }
                      type="text"
                      placeholder="e.g., ABCD-1234-XYZ"
                      className={baseInputClass}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Credential URL
                    </label>
                    <input
                      value={cert.credential_url || ""}
                      onChange={(e) =>
                        updateCertification(
                          index,
                          "credential_url",
                          e.target.value
                        )
                      }
                      type="url"
                      placeholder="Verification / certificate URL"
                      className={baseInputClass}
                    />
                  </div>
                </div>

                {/* Extra Link */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                    Additional link (optional)
                  </label>
                  <input
                    value={cert.link || ""}
                    onChange={(e) =>
                      updateCertification(index, "link", e.target.value)
                    }
                    type="url"
                    placeholder="Portfolio, course page, or related link"
                    className={baseInputClass}
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
        title="Certification Tips"
        sections={[
          {
            heading: "What to add",
            points: [
              "Include issuer and credential URL for verification.",
              "Show issue date and expiry if applicable.",
              "Prioritize certifications relevant to your target role.",
            ],
          },
          {
            heading: "How to order",
            points: [
              "List latest or most advanced credentials first.",
              "Group similar platforms (e.g., AWS, Azure, GCP).",
            ],
          },
        ]}
      />
    </div>
  );
};

export default CertificationsForm;

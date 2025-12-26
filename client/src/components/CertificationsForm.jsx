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
              <Award className="h-4 w-4" />
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-yellow-200 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition"
          >
            <Lightbulb className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={addCertification}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition"
          >
            <Plus className="h-4 w-4" />
            Add certification
          </button>
        </div>
      </div>

      {/* EMPTY STATE */}
      {(data || []).length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50">
            <Award className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-sm font-medium text-slate-900">
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
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6 transition-all hover:shadow-md"
            >
              {/* CARD HEADER */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                    Certification #{index + 1}
                  </p>
                  {(cert.name || cert.issuer) && (
                    <p className="text-sm font-semibold text-slate-900">
                      {cert.name || "Certification title not set"}
                      {cert.issuer && (
                        <span className="text-slate-500"> · {cert.issuer}</span>
                      )}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeCertification(index)}
                  className="group inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-slate-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition"
                  aria-label="Remove certification"
                  title="Remove certification"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* DIVIDER */}
              <div className="h-px w-full bg-slate-100" />

              {/* BODY */}
              <div className="space-y-6">
                {/* Name / Issuer */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
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
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
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
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
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
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Expiry date (if any)
                    </label>
                    <input
                      value={cert.expiry_date || ""}
                      onChange={(e) =>
                        updateCertification(
                          index,
                          "expiry_date",
                          e.target.value
                        )
                      }
                      type="month"
                      className={baseInputClass}
                    />
                  </div>
                </div>

                {/* Credential ID / URL */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
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
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
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
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
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

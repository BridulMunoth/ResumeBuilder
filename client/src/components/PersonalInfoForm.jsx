import {
  BriefcaseBusiness,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
  Lightbulb,
  Github,
  Calendar,
  Flag,
} from "lucide-react";
import React from "react";
import TipsPanel from "./TipsPanel";

const fields = [
  { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
  { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
  { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
  { key: "location", label: "Location", icon: MapPin, type: "text" },
  { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
  { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
  { key: "github", label: "GitHub Profile", icon: Github, type: "url" },
  { key: "website", label: "Personal Website", icon: Globe, type: "url" },
  { key: "date_of_birth", label: "Date of Birth", icon: Calendar, type: "date" },
  { key: "nationality", label: "Nationality", icon: Flag, type: "text" },
];

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const [errors, setErrors] = React.useState({});
  const [showTips, setShowTips] = React.useState(false);
  const firstRequiredRef = React.useRef(null);

  React.useEffect(() => {
    if (firstRequiredRef.current) {
      firstRequiredRef.current.focus();
    }
  }, []);

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });

    if (["full_name", "email", "phone"].includes(field)) {
      validateField(field, value);
    }
  };

  const validateField = (key, value) => {
    let error = "";

    switch (key) {
      case "full_name":
        if (!value.trim()) {
          error = "Full name is required.";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Enter a valid email address.";
        }
        break;

      case "phone": {
        const digits = value.replace(/\D/g, "");
        if (value && (digits.length < 10 || digits.length > 15)) {
          error = "Enter a valid phone number.";
        }
        break;
      }

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [key]: error }));
    return !error;
  };

  // glassy input (same system as SkillsForm)
  const baseInputClass =
    "w-full rounded-2xl border border-white/60 bg-white/70 px-3.5 py-2.5 text-sm " +
    "text-slate-900 placeholder:text-slate-400 shadow-[0_10px_30px_rgba(15,23,42,0.08)] " +
    "backdrop-blur-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 " +
    "outline-none transition";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Personal Information
          </h3>
          <p className="text-sm text-slate-500">
            Get started with your core personal details.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowTips(true)}
          aria-label="Get tips"
          title="Get tips"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-yellow-300/70 bg-white/80 text-yellow-600 shadow-[0_0_18px_rgba(250,204,21,0.6)] backdrop-blur-md transition hover:bg-yellow-50"
        >
          <Lightbulb className="h-4 w-4" />
        </button>
      </div>

      {/* Image + remove background — glass card */}
      <div className="mt-2 rounded-2xl border border-white/60 bg-white/70 p-4 shadow-[0_14px_35px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:flex sm:items-center sm:justify-between sm:gap-6">
        <label className="flex cursor-pointer items-center gap-3">
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="user"
              className="h-16 w-16 rounded-2xl object-cover ring-2 ring-white/80 shadow-[0_10px_25px_rgba(15,23,42,0.35)]"
            />
          ) : (
            <div className="inline-flex items-center gap-3 text-slate-600 hover:text-slate-800">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-slate-300/80 bg-white/70 shadow-[0_8px_20px_rgba(15,23,42,0.06)] backdrop-blur">
                <User className="h-6 w-6 text-slate-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-800">
                  Upload profile image
                </span>
                <span className="text-xs text-slate-500">
                  JPG or PNG · up to 5MB
                </span>
              </div>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleChange("image", e.target.files[0]);
              }
            }}
          />
        </label>

        {typeof data.image === "object" && (
          <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-800 sm:mt-0">
            <div className="flex flex-col">
              <span className="font-medium">Remove Background</span>
              <span className="text-xs text-slate-500">
                Make your photo cleaner and resume-friendly.
              </span>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                onChange={() => setRemoveBackground((prev) => !prev)}
                checked={removeBackground}
              />
              <div className="h-6 w-11 rounded-full bg-slate-300/80 shadow-inner transition-colors duration-200 peer-checked:bg-emerald-500/80" />
              <span className="pointer-events-none absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-[0_4px_10px_rgba(15,23,42,0.25)] transition-transform duration-200 ease-in-out peer-checked:translate-x-5" />
            </label>
          </div>
        )}
      </div>

      {/* Text fields */}
      <div className="space-y-4">
        {fields.map((field) => {
          const Icon = field.icon;
          const hasError = Boolean(errors[field.key]);

          const inputClass = `${baseInputClass} ${
            hasError
              ? "border-red-400/90 focus:border-red-500 focus:ring-red-400/60"
              : ""
          }`;

          return (
            <div key={field.key} className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-sky-50 via-white to-indigo-50 shadow-[0_4px_10px_rgba(15,23,42,0.08)]">
                  <Icon className="h-3.5 w-3.5 text-slate-500" />
                </span>
                <span>
                  {field.label}
                  {field.required && <span className="text-red-500"> *</span>}
                </span>
              </label>

              <input
                ref={field.key === "full_name" ? firstRequiredRef : null}
                type={field.type}
                value={data[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                onBlur={(e) => validateField(field.key, e.target.value)}
                className={inputClass}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                required={field.required}
              />

              {hasError && (
                <p className="mt-1 text-xs text-red-500">{errors[field.key]}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Tips Panel */}
      <TipsPanel
        open={showTips}
        onClose={() => setShowTips(false)}
        title="Personal Info Tips"
        sections={[
          {
            heading: "Contact details",
            points: [
              "Use a professional email and a reachable phone number.",
              "Keep your location high-level (City, Country).",
              "Include LinkedIn / GitHub / Portfolio if relevant to the role.",
            ],
          },
          {
            heading: "Profile image",
            points: [
              "Use a clear, front-facing photo with good lighting.",
              "Preferred formats: JPG / JPEG / PNG up to ~5MB.",
              "Avoid heavy filters and distracting backgrounds.",
            ],
          },
        ]}
      />
    </div>
  );
};

export default PersonalInfoForm;

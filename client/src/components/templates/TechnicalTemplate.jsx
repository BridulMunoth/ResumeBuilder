/**  ============================
 *   TECHNICAL TEMPLATE — V3
 *   Fully redesigned & polished
 *   ============================
 */

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  ExternalLink,
  Github,
  Calendar,
  Flag,
  Briefcase,
  Code,
  Award,
  Trophy,
  Heart,
  Cpu,
  Sparkles,
  FileText,
  Languages as LanguagesIcon,
} from "lucide-react";

/* ==========================================================================
   UTILITIES
   ========================================================================== */

const cx = (...cls) => cls.filter(Boolean).join(" ");

const getFontFamily = (font) => {
  if (!font) return "font-sans";
  if (font.type === "serif") return "font-serif";
  if (font.type === "mono") return "font-mono";
  return "font-sans";
};

const formatDate = (d) => {
  if (!d) return "";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return "";
  return dt.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const formatRange = (start, end, isCurrent) => {
  const a = formatDate(start);
  const b = isCurrent ? "Present" : formatDate(end);
  if (!a && !b) return "";
  if (!a) return b;
  if (!b) return a;
  return `${a} — ${b}`;
};

/* ==========================================================================
   CONTACT ITEM
   ========================================================================== */

const ContactItem = ({ icon: Icon, value, accent }) =>
  value ? (
    <div className="flex items-center gap-2 text-sm text-white">
      <Icon size={14} style={{ color: accent }} />
      <span className="break-all">{value}</span>
    </div>
  ) : null;

/* ==========================================================================
   SECTION HEADING
   ========================================================================== */

const SectionHeading = ({ title, icon: Icon, formatting }) => {
  const accent = formatting.colors?.accent || "#3B82F6";
  const heading = formatting.heading || {};

  return (
    <div className="flex items-center gap-2 mt-8 mb-3">
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-md text-white"
        style={{ backgroundColor: accent }}
      >
        {Icon && <Icon size={14} />}
        <span className="font-semibold tracking-wide">
          {heading.caps === "uppercase" ? title.toUpperCase() : title}
        </span>
      </div>
    </div>
  );
};

/* ==========================================================================
   SKILLS — Grouped by Categories
   ========================================================================== */

const renderGroupedSkills = (skills, accent) => {
  if (!skills?.length) return null;

  const normalized = skills.map((s) =>
    typeof s === "string" ? { name: s, category: "General" } : s
  );

  const groups = {};
  normalized.forEach((s) => {
    const cat = s.category || "General";
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(s);
  });

  return (
    <div className="space-y-4">
      {Object.entries(groups).map(([cat, list]) => (
        <div key={cat}>
          <p className="text-xs font-bold uppercase" style={{ color: accent }}>
            {cat}
          </p>
          <ul className="mt-1 space-y-1">
            {list.map((s, i) => (
              <li
                key={i}
                className="text-sm border-l-2 pl-3"
                style={{ borderColor: accent }}
              >
                {s.name}
                {s.level && <span className="text-gray-600"> ({s.level})</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

/* ==========================================================================
   TIMELINE / EXPERIENCE / EDUCATION BLOCKS
   ========================================================================== */

const TimelineItem = ({ item, accent }) => {
  if (!item) return null;

  const range = formatRange(item.start_date, item.end_date, item.is_current);

  const tech =
    typeof item.technologies === "string"
      ? item.technologies.split(",").map((t) => t.trim())
      : item.technologies || [];

  const achievements =
    typeof item.achievements === "string"
      ? item.achievements.split("\n").map((a) => a.trim())
      : item.achievements || [];

  return (
    <div
      className="pl-4 space-y-2 border-l-4 rounded-md pb-4 pt-1"
      style={{ borderColor: accent }}
    >
      <div className="flex justify-between">
        <h3 className="font-bold text-gray-900">{item.title}</h3>
        {range && (
          <span className="text-xs text-gray-600 font-mono">{range}</span>
        )}
      </div>

      {item.company && (
        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold" style={{ color: accent }}>
            {item.company}
          </span>
          {item.link && (
            <a href={item.link} target="_blank">
              <ExternalLink size={14} className="text-gray-500" />
            </a>
          )}
        </div>
      )}

      {item.description && (
        <p className="text-sm text-gray-700 whitespace-pre-line">
          {item.description}
        </p>
      )}

      {achievements.length > 0 && (
        <ul className="space-y-1">
          {achievements.map((a, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: accent }}
              ></span>
              {a}
            </li>
          ))}
        </ul>
      )}

      {tech.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1">
          {tech.map((t, i) => (
            <span
              key={i}
              className="px-2 py-0.5 border rounded-full text-xs"
              style={{ borderColor: accent, color: accent }}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

/* ==========================================================================
   FINAL TEMPLATE
   ========================================================================== */

const TechnicalTemplate = ({ data, formatting }) => {
  const accent = formatting.colors?.accent || "#3B82F6";
  const fontFamily = getFontFamily(formatting.font);

  /* -------------------------------- HEADER -------------------------------- */

  const Header = () => (
    <div
      className="w-full p-6 rounded-b-2xl"
      style={{ backgroundColor: "#0F1B3D" }}
    >
      <h1 className="text-3xl font-bold text-white">
        {data.name || data.personal_info?.full_name}
      </h1>

      <p className="text-lg text-white opacity-80">
        {data.role || data.personal_info?.profession}
      </p>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <ContactItem
          icon={Mail}
          value={data.email || data.personal_info?.email}
          accent={accent}
        />
        <ContactItem
          icon={Phone}
          value={data.phone || data.personal_info?.phone}
          accent={accent}
        />
        <ContactItem
          icon={MapPin}
          value={data.location || data.personal_info?.location}
          accent={accent}
        />
        <ContactItem
          icon={Linkedin}
          value={data.linkedin || data.personal_info?.linkedin}
          accent={accent}
        />
        <ContactItem
          icon={Globe}
          value={data.website || data.personal_info?.website}
          accent={accent}
        />
        <ContactItem
          icon={Github}
          value={data.github || data.personal_info?.github}
          accent={accent}
        />
      </div>
    </div>
  );

  /* ----------------------------- SECTION MAP ------------------------------ */

  const Sections = {
    summary: () =>
      data.summary || data.professional_summary ? (
        <section>
          <SectionHeading
            title="Summary"
            icon={FileText}
            formatting={formatting}
          />
          <p className="text-sm leading-relaxed text-gray-800">
            {data.summary || data.professional_summary}
          </p>
        </section>
      ) : null,

    skills: () =>
      data.skills?.length ? (
        <section>
          <SectionHeading
            title="Skills"
            icon={Cpu}
            formatting={formatting}
          />
          {renderGroupedSkills(data.skills, accent)}
        </section>
      ) : null,

    languages: () =>
      data.languages?.length ? (
        <section>
          <SectionHeading
            title="Languages"
            icon={LanguagesIcon}
            formatting={formatting}
          />
          <ul className="text-sm space-y-1">
            {data.languages.map((l, i) => (
              <li key={i}>• {typeof l === "string" ? l : l.name}</li>
            ))}
          </ul>
        </section>
      ) : null,

    hobbies: () =>
      (data.hobbies?.length || data.interests?.length) ? (
        <section>
          <SectionHeading
            title="Hobbies & Interests"
            icon={Sparkles}
            formatting={formatting}
          />
          <p className="text-sm">
            {(data.hobbies || data.interests)
              .map((h) => (typeof h === "string" ? h : h.name))
              .join(", ")}
          </p>
        </section>
      ) : null,

    experience: () =>
      data.experience?.length ? (
        <section>
          <SectionHeading
            title="Experience"
            icon={Briefcase}
            formatting={formatting}
          />
          <div className="space-y-6 mt-3">
            {data.experience.map((e, i) => (
              <TimelineItem key={i} item={e} accent={accent} />
            ))}
          </div>
        </section>
      ) : null,

    projects: () =>
      data.projects?.length ? (
        <section>
          <SectionHeading
            title="Projects"
            icon={Code}
            formatting={formatting}
          />
          <div className="space-y-4">
            {data.projects.map((p, i) => (
              <div
                key={i}
                className="p-4 border rounded-xl shadow-sm"
                style={{ borderLeftColor: accent, borderLeftWidth: 4 }}
              >
                <TimelineItem item={p} accent={accent} />
              </div>
            ))}
          </div>
        </section>
      ) : null,

    education: () =>
      data.education?.length ? (
        <section>
          <SectionHeading
            title="Education"
            icon={Flag}
            formatting={formatting}
          />
          <div className="space-y-6">
            {data.education.map((e, i) => (
              <TimelineItem key={i} item={e} accent={accent} />
            ))}
          </div>
        </section>
      ) : null,

    certifications: () =>
      data.certifications?.length ? (
        <section>
          <SectionHeading
            title="Certifications"
            icon={Award}
            formatting={formatting}
          />
          <ul className="text-sm space-y-1 mt-2">
            {data.certifications.map((c, i) => (
              <li key={i}>• {typeof c === "string" ? c : c.name}</li>
            ))}
          </ul>
        </section>
      ) : null,

    achievements: () =>
      data.achievements?.length ? (
        <section>
          <SectionHeading
            title="Achievements"
            icon={Trophy}
            formatting={formatting}
          />
          <ul className="text-sm space-y-1 mt-2">
            {data.achievements.map((a, i) => (
              <li key={i}>• {typeof a === "string" ? a : a.title}</li>
            ))}
          </ul>
        </section>
      ) : null,

    volunteer: () =>
      data.volunteer_experience?.length ? (
        <section>
          <SectionHeading
            title="Volunteer Experience"
            icon={Heart}
            formatting={formatting}
          />
          <div className="space-y-6">
            {data.volunteer_experience.map((v, i) => (
              <TimelineItem key={i} item={v} accent={accent} />
            ))}
          </div>
        </section>
      ) : null,
  };

  /* --------------------------- FINAL RENDER UI --------------------------- */

  return (
    <div
      className={cx("w-full", fontFamily)}
      style={{
        fontSize: formatting.spacing?.font_size || 11,
        lineHeight: formatting.spacing?.line_height || 1.4,
        padding: formatting.spacing?.margin_horizontal || 16,
      }}
    >
      <Header />

      <div className="grid grid-cols-3 gap-8 mt-10">
        {/* LEFT COLUMN */}
        <div className="col-span-1 space-y-8">
          {Sections.skills()}
          {Sections.languages()}
          {Sections.hobbies()}
          {Sections.achievements()}
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-2 space-y-10">
          {Sections.summary()}
          {Sections.experience()}
          {Sections.projects()}
          {Sections.education()}
          {Sections.certifications()} 
          {Sections.volunteer()}
        </div>
      </div>
    </div>
  );
};

export default TechnicalTemplate;

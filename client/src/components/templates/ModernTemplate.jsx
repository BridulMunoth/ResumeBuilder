import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Github,
  ExternalLink,
  Calendar,
  Flag,
} from "lucide-react";

import {
  formatDate,
  formatDateRange,
  parseList,
  getFontFallback,
  getSectionTitle,
  isSectionVisible,
} from "./TemplateHelpers";

/* ==========================================================================
   CONSTANTS
   ========================================================================== */

const DEFAULT_SECTION_ORDER = [
  "personal",
  "summary",
  "experience",
  "education",
  "projects",
  "skills",
  "certifications",
  "languages",
  "achievements",
  "volunteer",
  "hobbies",
];

/* ==========================================================================
   NORMALIZERS (MATCH TECHNICAL TEMPLATE)
   ========================================================================== */

const normalizeLevel = (val) => {
  if (!val) return 0;
  if (typeof val === "number") return val > 5 ? Math.round(val / 20) : val;

  const map = {
    beginner: 1,
    basic: 1,
    amateur: 2,
    intermediate: 3,
    proficient: 4,
    advanced: 4,
    expert: 5,
    native: 5,
    master: 5,
  };
  return map[String(val).toLowerCase()] || 3;
};

const normalizeLeveledItems = (items, nameKey = "name") =>
  Array.isArray(items)
    ? items.map((i) =>
        typeof i === "string"
          ? { [nameKey]: i, level: null, category: "General" }
          : {
              ...i,
              level: normalizeLevel(i.level || i.proficiency),
              category: i.category || "General",
            }
      )
    : [];

/* ==========================================================================
   TEMPLATE
   ========================================================================== */

const ModernTemplate = ({ data = {}, formatting = {}, accentColor }) => {
  /* ---------------- Formatting ---------------- */

  const colors = {
    text: formatting.colors?.text || "#1F2937",
    secondary: formatting.colors?.secondary || "#6B7280",
    accent: formatting.colors?.accent || accentColor || "#3B82F6",
    background: formatting.colors?.background || "#FFFFFF",
  };

  const spacing = {
    fontSize: formatting.spacing?.font_size ?? 11,
    lineHeight: formatting.spacing?.line_height ?? 1.4,
    marginH: formatting.spacing?.margin_horizontal ?? 10,
    marginV: formatting.spacing?.margin_vertical ?? 10,
    sectionGap: formatting.spacing?.section_spacing ?? 6,
  };

  const fontFamily = formatting.font?.family
    ? `'${formatting.font.family}', ${getFontFallback(formatting.font)}`
    : getFontFallback(formatting.font);

  const sectionOrder =
    formatting.section_order?.length > 0
      ? formatting.section_order
      : DEFAULT_SECTION_ORDER;

  /* ---------------- Styles ---------------- */

  const rootStyle = {
    fontFamily,
    fontSize: `${spacing.fontSize}pt`,
    lineHeight: spacing.lineHeight,
    color: colors.text,
    backgroundColor: colors.background,
    padding: `${spacing.marginV}mm ${spacing.marginH}mm`,
    minHeight: "100vh",
  };

  const sectionStyle = {
    marginBottom: `${spacing.sectionGap}mm`,
  };

  const headingStyle = {
    fontSize: "1.25em",
    fontWeight: 500,
    borderBottom: `1px solid ${colors.secondary}40`,
    paddingBottom: "4px",
    marginBottom: "8px",
  };

  const subHeadingStyle = {
    fontWeight: 600,
    color: colors.text,
  };

  const metaStyle = {
    color: colors.secondary,
    fontSize: "0.9em",
  };

  /* ==========================================================================
     SECTION RENDERERS
     ========================================================================== */

  const renderPersonal = () => {
    if (!data.personal_info) return null;
    const p = data.personal_info;

    const items = [
      { v: p.email, i: Mail },
      { v: p.phone, i: Phone },
      { v: p.location, i: MapPin },
      { v: p.linkedin, i: Linkedin },
      { v: p.website, i: Globe },
      { v: p.github, i: Github },
      { v: p.nationality, i: Flag },
      {
        v: p.date_of_birth ? formatDate(p.date_of_birth) : null,
        i: Calendar,
      },
    ].filter((x) => x.v);

    return (
      <section style={sectionStyle}>
        <h1 style={{ fontSize: "2em", fontWeight: 600 }}>
          {p.full_name}
        </h1>

        {p.headline && (
          <p style={{ color: colors.accent, fontWeight: 500 }}>
            {p.headline}
          </p>
        )}

        <div className="flex flex-wrap gap-4 mt-2 text-sm">
          {items.map(({ v, i: Icon }, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <Icon size={14} color={colors.accent} />
              <span>{v}</span>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderSummary = () =>
    data.professional_summary && (
      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          {getSectionTitle(formatting, "summary", "Summary")}
        </h2>
        <p className="whitespace-pre-line">
          {data.professional_summary}
        </p>
      </section>
    );

  const renderTimelineSection = (items, titleId, defaultTitle) =>
    Array.isArray(items) &&
    items.length > 0 && (
      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          {getSectionTitle(formatting, titleId, defaultTitle)}
        </h2>

        {items.map((e, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between">
              <div>
                <div style={subHeadingStyle}>
                  {e.title || e.position || e.name}
                </div>
                {e.company && (
                  <div style={{ color: colors.accent }}>
                    {e.company}
                    {e.link && (
                      <a href={e.link} target="_blank" rel="noreferrer">
                        <ExternalLink size={12} className="inline ml-1" />
                      </a>
                    )}
                  </div>
                )}
              </div>
              <div style={metaStyle}>
                {formatDateRange(e.start_date, e.end_date, e.is_current)}
              </div>
            </div>

            {e.location && (
              <div className="text-xs opacity-70">{e.location}</div>
            )}

            {e.description && (
              <p className="mt-1 whitespace-pre-line">
                {e.description}
              </p>
            )}

            {parseList(e.technologies).length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {parseList(e.technologies).map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-xs rounded border"
                    style={{ borderColor: colors.accent }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    );

  const renderLeveledSection = (items, id, defaultTitle) => {
    const normalized = normalizeLeveledItems(items);
    if (!normalized.length) return null;

    const groups = {};
    normalized.forEach((s) => {
      groups[s.category] ||= [];
      groups[s.category].push(s);
    });

    return (
      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          {getSectionTitle(formatting, id, defaultTitle)}
        </h2>

        {Object.entries(groups).map(([cat, list]) => (
          <div key={cat} className="mb-3">
            {cat !== "General" && (
              <p className="text-xs uppercase opacity-60 mb-1">
                {cat}
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              {list.map((s, i) => (
                <div key={i} className="text-sm">
                  {s.name || s.language}
                  {s.level ? (
                    <span className="opacity-60 ml-1">
                      ({s.level})
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    );
  };

  /* ==========================================================================
     MAIN DISPATCH
     ========================================================================== */

  const renderSection = (id) => {
    if (!isSectionVisible(formatting, id)) return null;

    switch (id) {
      case "personal":
        return renderPersonal();
      case "summary":
        return renderSummary();
      case "experience":
        return renderTimelineSection(
          data.experience,
          "experience",
          "Experience"
        );
      case "education":
        return renderTimelineSection(
          data.education,
          "education",
          "Education"
        );
      case "projects":
        return renderTimelineSection(
          data.projects,
          "projects",
          "Projects"
        );
      case "skills":
        return renderLeveledSection(data.skills, "skills", "Skills");
      case "languages":
        return renderLeveledSection(
          data.languages,
          "languages",
          "Languages"
        );
      case "certifications":
        return renderTimelineSection(
          data.certifications,
          "certifications",
          "Certifications"
        );
      case "achievements":
        return renderTimelineSection(
          data.achievements,
          "achievements",
          "Achievements"
        );
      case "volunteer":
        return renderTimelineSection(
          data.volunteer,
          "volunteer",
          "Volunteer"
        );
      case "hobbies":
        return renderLeveledSection(
          data.hobbies,
          "hobbies",
          "Hobbies"
        );
      default:
        return null;
    }
  };

  return (
    <div style={rootStyle}>
      {sectionOrder.map((id) => (
        <React.Fragment key={id}>
          {renderSection(id)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ModernTemplate;

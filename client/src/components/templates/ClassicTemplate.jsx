import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  ExternalLink,
  Github,
  Ban,
  Circle,
  Disc,
  Square,
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
   CONSTANTS & DEFAULTS
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

const normalizeLevel = (val) => {
  if (!val) return 0;
  if (typeof val === "number") return val > 5 ? Math.round(val / 20) : val;
  const map = {
    beginner: 1,
    amateur: 2,
    basic: 1,
    competent: 3,
    intermediate: 3,
    proficient: 4,
    advanced: 4,
    expert: 5,
    master: 5,
    native: 5,
  };
  return map[String(val).toLowerCase()] || 3;
};

/* ==========================================================================
   CLASSIC TEMPLATE COMPONENT
   ========================================================================== */

const ClassicTemplate = ({ data, formatting = {} }) => {
  // --- 1. Formatting Parsing ---
  const colors = {
    text: formatting.colors?.text || "#1F2937",
    accent: formatting.colors?.accent || "#3B82F6",
    secondary: formatting.colors?.secondary || "#4B5563",
    background: formatting.colors?.background || "#FFFFFF",
    ...formatting.colors,
  };

  const spacing = {
    margin_v: formatting.spacing?.margin_vertical ?? 12,
    margin_h: formatting.spacing?.margin_horizontal ?? 12,
    line_height: formatting.spacing?.line_height ?? 1.4,
    font_size: formatting.spacing?.font_size ?? 11,
    section_gap: formatting.spacing?.section_spacing ?? 6,
  };

  const font = formatting.font || {};
  const fontFamilyVal = font.family
    ? `'${font.family}', ${getFontFallback(font)}`
    : "serif";

  // Force 1-Column Layout (Classic template is always single column)
  // eslint-disable-next-line no-unused-vars
  const isTwoColumn = false;

  // --- 2. Styles Objects ---
  const rootStyle = {
    fontFamily: fontFamilyVal,
    color: colors.text,
    backgroundColor: colors.background,
    fontSize: `${spacing.font_size}pt`,
    lineHeight: spacing.line_height,
    padding: `${spacing.margin_v}mm ${spacing.margin_h}mm`,
    minHeight: "100vh",
  };

  const sectionContainerStyle = {
    marginBottom: `${spacing.section_gap}mm`,
  };

  // --- 3. Heading Renderer ---
  const renderHeading = (id, defaultTitle) => {
    const title = getSectionTitle(formatting, id, defaultTitle);
    const styleOpt = formatting.heading || {};
    const styleMode = styleOpt.style || "underline"; // boxed, plain, underline, leftLine, modern
    const capsMode = styleOpt.caps || "uppercase"; // uppercase, capitalize
    const align = styleOpt.align || "left";
    const sizeMap = { S: "1em", M: "1.1em", L: "1.25em", XL: "1.5em" };
    const fontSize = sizeMap[styleOpt.size] || "1.1em";

    const baseStyle = {
      color: colors.accent,
      fontSize,
      fontWeight: "bold",
      textTransform: capsMode,
      marginBottom: "12px",
      textAlign: align,
      letterSpacing: "0.05em",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      // Reset borders
      border: "none",
      padding: 0,
    };

    // Icon
    const Icon = styleOpt.icon === "none" ? null : null; // Icons in heading not explicitly implemented mapped to ID yet

    if (align === "center") baseStyle.justifyContent = "center";
    if (align === "right") baseStyle.justifyContent = "flex-end";

    // Style Variations
    let extraStyle = {};
    if (styleMode === "underline") {
      extraStyle = {
        borderBottom: `2px solid ${colors.accent}`,
        paddingBottom: "4px",
      };
    } else if (styleMode === "boxed") {
      extraStyle = {
        border: `1px solid ${colors.accent}`,
        padding: "4px 8px",
        borderRadius: "4px",
        backgroundColor: `${colors.accent}10`,
      };
    } else if (styleMode === "leftLine") {
      extraStyle = {
        borderLeft: `4px solid ${colors.accent}`,
        paddingLeft: "8px",
      };
    } else if (styleMode === "modern") {
      extraStyle = {
        backgroundColor: `${colors.accent}15`,
        padding: "4px 8px",
        borderRadius: "4px",
        color: colors.accent,
      };
    } else if (styleMode === "highlight") {
      extraStyle = {
        backgroundColor: colors.accent,
        color: "white",
        padding: "4px 8px",
      };
    }

    return <h2 style={{ ...baseStyle, ...extraStyle }}>{title}</h2>;
  };

  // --- 4. Section Renderers ---

  // -> Personal Info Header
  const renderHeader = () => {
    if (!isSectionVisible(formatting, "personal")) return null;
    const { personal_info } = data;
    if (!personal_info) return null;

    const pOpt = formatting.personal || {};
    const align = pOpt.align || "left"; // left, center, right
    const arrange = pOpt.arrangement || "stacked"; // stacked, inline, spread
    const imageAlign = pOpt.imageAlign || "hidden";
    const iconStyle = pOpt.iconStyle || "none";

    const hasImage = imageAlign !== "hidden" && personal_info.image;

    // Contact Items
    const formatFullDate = (d) => {
      if (!d) return "";
      const dt = new Date(d);
      if (isNaN(dt.getTime())) return "";
      return dt.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    };

    const items = [
      {
        val: personal_info.email,
        icon: Mail,
        link: "mailto:" + personal_info.email,
      },
      {
        val: personal_info.phone,
        icon: Phone,
        link: "tel:" + personal_info.phone,
      },
      { val: personal_info.location, icon: MapPin },
      {
        val: personal_info.linkedin,
        icon: Linkedin,
        link: personal_info.linkedin,
      },
      { val: personal_info.website, icon: Globe, link: personal_info.website },
      { val: personal_info.github, icon: Github, link: personal_info.github },
      { val: personal_info.nationality, icon: Flag },
      {
        val: formatFullDate(personal_info.date_of_birth),
        icon: Calendar,
      },
    ].filter((i) => i.val);

    const renderContactItem = (item, i) => {
      return (
        <div
          key={i}
          className="flex items-center gap-1.5"
          style={{ color: colors.secondary }}
        >
          {iconStyle !== "none" && (
            <span
              className={`flex items-center justify-center ${
                iconStyle === "filled" ? "bg-slate-200 rounded p-0.5" : ""
              }`}
            >
              <item.icon size={14} style={{ color: colors.accent }} />
            </span>
          )}
          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {item.val.replace(/^https?:\/\/(www\.)?/, "")}
            </a>
          ) : (
            <span>{item.val}</span>
          )}
        </div>
      );
    };

    const infoBlock = (
      <div
        className={`flex flex-col ${
          align === "center"
            ? "items-center"
            : align === "right"
            ? "items-end"
            : "items-start"
        }`}
      >
        <h1
          className="text-4xl font-bold mb-2 tracking-tight"
          style={{ color: colors.accent }}
        >
          {personal_info.full_name}
        </h1>
        {personal_info.profession && (
          <p
            className="text-xl font-medium mb-4"
            style={{ color: colors.secondary }}
          >
            {personal_info.profession}
          </p>
        )}

        <div
          className={`flex flex-wrap gap-x-6 gap-y-2 text-sm ${
            align === "center"
              ? "justify-center"
              : align === "right"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          {arrange === "stacked"
            ? items.map(renderContactItem)
            : items.map((item, i) => (
                <React.Fragment key={i}>
                  {renderContactItem(item, i)}
                  {i < items.length - 1 && arrange === "inline" && (
                    <span className="opacity-50">•</span>
                  )}
                </React.Fragment>
              ))}
          {
            arrange === "spread" && items.length > 0 && (
              <span className="w-full hidden print:block"></span>
            ) /* Force break if needed in spread? No, Flex wrap handled it */
          }
        </div>
      </div>
    );

    let containerClass = "mb-8 pb-6 border-b-2";
    let containerStyle = { borderColor: colors.accent };
    if (formatting.heading?.style === "plain") containerStyle.border = "none";

    if (!hasImage) {
      return (
        <header
          className={`text-${align} ${containerClass}`}
          style={containerStyle}
        >
          {infoBlock}
        </header>
      );
    }

    // With Image
    const imgNode = (
      <div className="w-32 h-32 shrink-0 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
        <img
          src={personal_info.image}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
    );

    // Layout with Image
    if (imageAlign === "center") {
      return (
        <header
          className="text-center mb-8 pb-6 border-b-2"
          style={containerStyle}
        >
          {imgNode}
          <div className="mt-4">{infoBlock}</div>
        </header>
      );
    }

    // Left or Right Image
    return (
      <header
        className={`flex items-center gap-6 mb-8 pb-6 border-b-2 ${
          imageAlign === "right"
            ? "flex-row-reverse text-right"
            : "flex-row text-left"
        }`}
        style={containerStyle}
      >
        {imgNode}
        <div className="flex-1">
          {/* Only force align logic to follow image side if desired, but user align setting overrides */}
          {infoBlock}
        </div>
      </header>
    );
  };

  // -> Summary
  const renderSummary = () => {
    if (!data.professional_summary || !isSectionVisible(formatting, "summary"))
      return null;
    return (
      <section style={sectionContainerStyle}>
        {renderHeading("summary", "Professional Summary")}
        <p className="whitespace-pre-line text-justify">
          {data.professional_summary}
        </p>
      </section>
    );
  };

  // -> Experience
  const renderExperience = () => {
    if (!data.experience?.length || !isSectionVisible(formatting, "experience"))
      return null;
    return (
      <section style={sectionContainerStyle}>
        {renderHeading("experience", "Work Experience")}
        <div className="space-y-6">
          {data.experience.map((exp, i) => {
            const techs = parseList(exp.technologies);
            const achievements = parseList(exp.achievements);
            return (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3
                    className="font-bold text-lg"
                    style={{ color: colors.primary }}
                  >
                    {exp.title}
                  </h3>
                  <span
                    className="text-sm font-medium whitespace-nowrap"
                    style={{ color: colors.secondary }}
                  >
                    {formatDateRange(
                      exp.start_date,
                      exp.end_date,
                      exp.is_current
                    )}
                  </span>
                </div>

                <div
                  className="flex items-center gap-2 mb-2 italic"
                  style={{ color: colors.secondary }}
                >
                  <span className="font-semibold">{exp.company}</span>
                  {exp.location && <span>• {exp.location}</span>}
                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={12} className="inline ml-1" />
                    </a>
                  )}
                </div>

                {/* Sub-info layout line if needed */}
                <div
                  className="mb-2 text-sm"
                  style={{ color: colors.secondary }}
                >
                  {[exp.employment_type].filter(Boolean).join(" • ")}
                </div>

                {exp.description && (
                  <p className="mb-2 whitespace-pre-line">{exp.description}</p>
                )}

                {achievements.length > 0 && (
                  <ul className="list-disc ml-5 space-y-1 mb-2 marker:text-gray-400">
                    {achievements.map((ach, idx) => (
                      <li key={idx} className="pl-1">
                        {ach}
                      </li>
                    ))}
                  </ul>
                )}

                {techs.length > 0 && (
                  <p className="text-sm mt-2">
                    <span
                      className="font-semibold"
                      style={{ color: colors.secondary }}
                    >
                      Tech Stack:{" "}
                    </span>
                    {techs.join(", ")}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  // -> Skills / Languages Render Logic
  const renderGridCompactSections = (type, items, titleDefault) => {
    const opts = type === "skills" ? formatting.skills : formatting.languages;
    const layout = opts?.layout || "grid"; // grid, compact
    const compactMode = opts?.compactMode || "bullet"; // bullet, pipe, comma
    const levelMode = opts?.levelMode || "text"; // text, dots, bar, hide

    if (!items?.length) return null;

    // Grouping logic for skills
    let groups = {};
    let ungrouped = [];

    const processItem = (item) => {
      const name = typeof item === "string" ? item : item.name;
      if (!name) return null;
      // level from item (legacy or structured)
      const level =
        typeof item === "object" ? item.level || item.proficiency || 0 : 0;
      // category
      const cat =
        typeof item === "object" && item.category ? item.category : "Other";
      return { name, level, cat };
    };

    if (type === "skills") {
      // Skills grouping logic
      items.forEach((raw) => {
        const p = processItem(raw);
        if (!p) return;
        if (p.cat === "Other") ungrouped.push(p);
        else {
          if (!groups[p.cat]) groups[p.cat] = [];
          groups[p.cat].push(p);
        }
      });
    } else {
      // Languages usually ungrouped
      items.forEach((raw) => {
        const p = processItem(raw);
        if (p) ungrouped.push(p);
      });
    }

    const allGroups = Object.entries(groups);

    const renderItem = (item) => (
      <div className="flex items-center justify-between w-full">
        <span className="font-medium mr-2">{item.name}</span>
        {levelMode !== "hide" &&
          (levelMode === "text" ? (
            <span className="text-sm italic opacity-75">{item.level}</span>
          ) : (
            <div className="ml-2 shrink-0">
              {/* Dots/Bar rendering */}
              {levelMode === "bar" && (
                <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-current"
                    style={{
                      width: `${normalizeLevel(item.level) * 20}%`,
                      backgroundColor: colors.accent,
                    }}
                  />
                </div>
              )}
              {levelMode === "dots" && (
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i <= normalizeLevel(item.level) ? "" : "opacity-20"
                      }`}
                      style={{ backgroundColor: colors.accent }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    );

    return (
      <section style={sectionContainerStyle}>
        {renderHeading(type, titleDefault)}

        {/* COMPACT MODE (Comma/Pipe list) */}
        {layout === "compact" ? (
          <div className="text-sm leading-relaxed text-justify">
            {/* Flatten all if grouped */}
            {[...allGroups.flatMap(([, gItems]) => gItems), ...ungrouped].map(
              (item, idx, arr) => (
                <span key={idx}>
                  <span className="font-medium">{item.name}</span>
                  {levelMode === "text" && item.level && (
                    <span className="text-xs opacity-70 ml-1">
                      ({item.level})
                    </span>
                  )}
                  {idx < arr.length - 1 && (
                    <span className="opacity-50 mx-1">
                      {compactMode === "pipe"
                        ? "|"
                        : compactMode === "bullet"
                        ? "•"
                        : ","}
                    </span>
                  )}
                </span>
              )
            )}
          </div>
        ) : (
          /* GRID MODE */
          <div className="space-y-4">
            {allGroups.map(([cat, gItems]) => (
              <div key={cat}>
                <h4
                  className="font-bold text-xs uppercase tracking-wider mb-2 border-b border-gray-100 pb-1"
                  style={{ color: colors.secondary }}
                >
                  {cat}
                </h4>
                <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                  {gItems.map((item, i) => (
                    <div key={i}>{renderItem(item)}</div>
                  ))}
                </div>
              </div>
            ))}
            {ungrouped.length > 0 && (
              <div>
                {allGroups.length > 0 && (
                  <h4
                    className="font-bold text-xs uppercase tracking-wider mb-2 border-b border-gray-100 pb-1"
                    style={{ color: colors.secondary }}
                  >
                    Other
                  </h4>
                )}
                <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                  {ungrouped.map((item, i) => (
                    <div key={i}>{renderItem(item)}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    );
  };

  // -> Custom
  const renderCustomSection = (section) => {
    if (!section || !isSectionVisible(formatting, `custom_${section.id}`))
      return null;
    let rawItems = section.items || [];
    if (typeof rawItems === "string") rawItems = rawItems.split("\n");
    const items = Array.isArray(rawItems)
      ? rawItems
          .map((i) =>
            typeof i === "string"
              ? i.trim()
              : typeof i === "object"
              ? i.title || i.name
              : ""
          )
          .filter(Boolean)
      : [];

    if (items.length === 0) return null;

    return (
      <section style={sectionContainerStyle} key={section.id}>
        {/* Custom heading render manually logic since ID is dynamic */}
        <h2
          style={{
            color: colors.accent,
            fontSize: "1.1em",
            fontWeight: "bold",
            marginBottom: "12px",
            borderBottom: `2px solid ${colors.accent}`,
            paddingBottom: "4px",
          }}
        >
          {section.title}
          {section.link && (
            <a
              href={section.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-block"
            >
              <ExternalLink size={12} style={{ color: colors.accent }} />
            </a>
          )}
        </h2>
        <ul className="list-disc ml-5 space-y-1">
          {items.map((item, i) => (
            <li key={i} className="pl-1">
              {item}
            </li>
          ))}
        </ul>
      </section>
    );
  };

  // --- 5. Main Render Loop ---

  const renderSectionById = (id) => {
    if (id.startsWith("custom_")) {
      const secId = id.replace("custom_", "");
      const sec = data.custom_sections?.find((s) => s.id === secId);
      return renderCustomSection(sec);
    }

    switch (id) {
      case "personal":
        return null; // handled at top
      case "summary":
        return renderSummary();
      case "experience":
        return renderExperience();
      case "education":
        if (
          !data.education?.length ||
          !isSectionVisible(formatting, "education")
        )
          return null;
        return (
          <section style={sectionContainerStyle}>
            {renderHeading("education", "Education")}
            <div className="space-y-6">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3
                        className="font-bold text-lg leading-tight"
                        style={{ color: colors.primary }}
                      >
                        {edu.institution || edu.school}
                      </h3>
                      <div className="text-sm mt-0.5">
                        <span className="font-semibold">
                          {edu.level || edu.degree}
                        </span>
                        {edu.program && <span> in {edu.program}</span>}
                        {edu.field && !edu.program && <span> in {edu.field}</span>}
                        {edu.location && (
                          <span className="text-gray-500">
                            {" "}
                            • {edu.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <span
                      className="text-sm font-medium whitespace-nowrap shrink-0 ml-4"
                      style={{ color: colors.secondary }}
                    >
                      {formatDateRange(
                        edu.start_date,
                        edu.end_date,
                        edu.is_current
                      )}
                    </span>
                  </div>
                  {(edu.score || edu.gpa) && (
                    <p
                      className="text-sm font-medium italic mt-1"
                      style={{ color: colors.secondary }}
                    >
                      Grade: {edu.score || edu.gpa}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      case "projects":
        return renderProjects && renderProjects();
      case "skills":
        return renderGridCompactSections("skills", data.skills, "Skills");
      case "languages":
        return renderGridCompactSections(
          "languages",
          data.languages,
          "Languages"
        );
      case "achievements":
        if (
          !data.achievements?.length ||
          !isSectionVisible(formatting, "achievements")
        )
          return null;
        return (
          <section style={sectionContainerStyle}>
            {renderHeading("achievements", "Achievements")}
            <ul className="list-disc ml-5 space-y-2 marker:text-gray-400">
              {data.achievements.map((a, i) => {
                // Handle both string and structured object achievements
                if (typeof a === "string") {
                  return <li key={i}>{a}</li>;
                }
                
                const title = a.title || a.name;
                const organization = a.organization || a.issuer;
                const date = a.start_date || a.date;
                const description = a.description;
                const link = a.link;

                return (
                  <li key={i}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                      <span className="font-semibold">
                        {title}
                        {link && (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 inline-block"
                          >
                            <ExternalLink
                              size={12}
                              style={{ color: colors.accent }}
                            />
                          </a>
                        )}
                      </span>
                      {date && (
                        <span className="text-sm text-gray-500 whitespace-nowrap ml-2">
                          ({formatDate(date)})
                        </span>
                      )}
                    </div>
                    {organization && (
                      <div className="text-sm italic text-gray-500 mt-0.5">
                        {organization}
                      </div>
                    )}
                    {description && (
                      <div className="text-sm text-gray-700 mt-1">
                        {description}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      case "certifications":
        if (
          !data.certifications?.length ||
          !isSectionVisible(formatting, "certifications")
        )
          return null;
        return (
          <section style={sectionContainerStyle}>
            {renderHeading("certifications", "Certifications")}
            <ul className="list-disc ml-5 space-y-2 marker:text-gray-400">
              {data.certifications.map((c, i) => (
                <li key={i}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <span className="font-semibold">{c.name}</span>
                    {c.date && (
                      <span className="text-sm text-gray-500 whitespace-nowrap ml-2">
                        ({formatDate(c.date)})
                      </span>
                    )}
                  </div>
                  {c.issuer && (
                    <div className="text-sm italic text-gray-500">
                      {c.issuer}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        );
      case "volunteer":
        if (
          !data.volunteer_experience?.length ||
          !isSectionVisible(formatting, "volunteer")
        )
          return null;
        return (
          <section style={sectionContainerStyle}>
            {renderHeading("volunteer", "Volunteering")}
            <div className="space-y-5">
              {data.volunteer_experience.map((v, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3
                      className="font-bold text-lg"
                      style={{ color: colors.primary }}
                    >
                      {v.role}
                    </h3>
                    <span
                      className="text-sm font-medium whitespace-nowrap ml-4"
                      style={{ color: colors.secondary }}
                    >
                      {formatDateRange(v.start_date, v.end_date)}
                    </span>
                  </div>
                  <div
                    className="text-sm font-semibold italic mb-2"
                    style={{ color: colors.secondary }}
                  >
                    {v.organization}
                  </div>
                  <p className="whitespace-pre-line">{v.description}</p>
                </div>
              ))}
            </div>
          </section>
        );
      case "hobbies": {
        if (!data.hobbies?.length || !isSectionVisible(formatting, "hobbies"))
          return null;
        const hobbies = parseList(data.hobbies);
        return (
          <section style={sectionContainerStyle}>
            {renderHeading("hobbies", "Interests")}
            <p>{hobbies.join(", ")}</p>
          </section>
        );
      }
      default:
        return null;
    }
  };

  // Ensure 'projects' helper is defined if I missed it
  const renderProjectsHelper = () => {
    // Renamed to avoid collision if defined before
    if (!data.projects?.length || !isSectionVisible(formatting, "projects"))
      return null;
    return (
      <section style={sectionContainerStyle}>
        {renderHeading("projects", "Projects")}
        <div className="space-y-5">
          {data.projects.map((proj, i) => {
            const techs = parseList(proj.technologies);
            const highlights = parseList(proj.highlights);
            return (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3
                    className="font-bold text-lg"
                    style={{ color: colors.primary }}
                  >
                    {proj.name}
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-block"
                      >
                        <ExternalLink
                          size={14}
                          style={{ color: colors.accent }}
                        />
                      </a>
                    )}
                  </h3>
                  <span
                    className="text-sm font-medium whitespace-nowrap"
                    style={{ color: colors.secondary }}
                  >
                    {formatDateRange(proj.start_date, proj.end_date)}
                  </span>
                </div>
                {(proj.role || proj.type) && (
                  <p
                    className="text-sm italic mb-2"
                    style={{ color: colors.secondary }}
                  >
                    {[proj.role, proj.type].filter(Boolean).join(" • ")}
                  </p>
                )}
                {proj.description && (
                  <p className="mb-2 whitespace-pre-line">{proj.description}</p>
                )}
                {highlights.length > 0 && (
                  <ul className="list-disc ml-5 space-y-1 mb-2">
                    {highlights.map((h, idx) => (
                      <li key={idx} className="pl-1">
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                {techs.length > 0 && (
                  <p className="text-sm">
                    <span
                      className="font-semibold"
                      style={{ color: colors.secondary }}
                    >
                      Technologies:
                    </span>
                    <span className="italic"> {techs.join(", ")}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  // Override local variable usage in switch
  const renderProjects = renderProjectsHelper;

  // Order
  let sectionOrder = formatting.section_order?.length
    ? formatting.section_order
    : DEFAULT_SECTION_ORDER;
  if (data.custom_sections?.length) {
    const customIds = data.custom_sections.map((s) => `custom_${s.id}`);
    const existing = new Set(sectionOrder);
    customIds.forEach((id) => {
      if (!existing.has(id)) sectionOrder.push(id);
    });
  }
  sectionOrder = [...new Set(sectionOrder)].filter((id) => id !== "personal");

  return (
    <div
      className="w-full bg-white print:p-0 shadow-lg print:shadow-none min-h-screen flex flex-col"
      style={rootStyle}
    >
      {renderHeader()}
      <div className="w-full flex-grow">
        {sectionOrder.map((id) => (
          <div key={id}>{renderSectionById(id)}</div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 border-t border-gray-200 flex items-center justify-between text-xs text-gray-400 print:py-2 print:border-t-0 break-inside-avoid">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-white border border-gray-200 flex items-center justify-center p-0.5">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="font-medium text-slate-500">NBY Resume Builder</span>
        </div>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </div>
  );
};

export default ClassicTemplate;

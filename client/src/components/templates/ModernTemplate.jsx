/**
 * ============================================================================
 * MODERN TEMPLATE — V6 (DESIGN-REFRESH + PARITY)
 * STUNNING, MINIMALIST, HIGH-END AESTHETIC
 * FULL FEATURE PARITY WITH TECHNICAL TEMPLATE (ENGINE)
 * ============================================================================
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
  BookOpen,
  Star,
  Circle,
  Hash,
  Link as LinkIcon,
} from "lucide-react";

import {
  formatDateRange as formatRange,
  getFontFallback,
} from "./TemplateHelpers";

/* ============================================================================
   UTILITIES
   ========================================================================== */

const cx = (...cls) => cls.filter(Boolean).join(" ");

const getFontFamily = (font) => {
  if (font?.family) return "";
  if (!font) return "font-sans";
  if (font.type === "serif") return "font-serif";
  if (font.type === "mono") return "font-mono";
  return "font-sans";
};

// Normalize skill / language level
const normalizeLevel = (val) => {
  if (!val) return 0;
  const map = {
    beginner: 1,
    basic: 1,
    amateur: 2,
    elementary: 2,
    competent: 3,
    intermediate: 3,
    proficient: 4,
    advanced: 4,
    expert: 5,
    native: 5,
    master: 5,
  };
  if (typeof val === "string") return map[val.toLowerCase()] || 3;
  if (val > 5) return Math.round(val / 20);
  return val;
};

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/* ============================================================================
   CONTACT ITEM (SLEEK & MINIMAL)
   ========================================================================== */

const ContactItem = ({
  icon: Icon,
  value,
  accent,
  formatting,
  forceWhiteIcon,
}) => {
  if (!value) return null;

  const style = formatting?.personal?.iconStyle || "outline"; // Default to cleaner outline for Modern V6
  const size = 16;
  const baseClass = "shrink-0 flex items-center justify-center transition-all";

  const renderIcon = () => {
    if (style === "none") return null;

    if (forceWhiteIcon) {
      if (style === "outline") return <Icon size={size} className="text-white" strokeWidth={1.5} />;
      if (style === "filled")
        return (
          <div className={`${baseClass} w-6 h-6 rounded bg-white text-black bg-opacity-90 mr-1.5`}>
            <Icon size={14} strokeWidth={2} style={{ color: accent }} />
          </div>
        );
      return <Icon size={size} className="text-white" strokeWidth={1.5} />;
    }

    // Normal Mode (White Background typically)
    if (style === "filled")
      return (
        <div
          className={`${baseClass} w-6 h-6 rounded mr-1.5`}
          style={{ backgroundColor: accent, color: "white" }}
        >
          <Icon size={14} strokeWidth={2} />
        </div>
      );

    if (style === "soft")
      return (
        <div
          className={`${baseClass} w-6 h-6 rounded mr-1.5`}
          style={{ backgroundColor: hexToRgba(accent, 0.1), color: accent }}
        >
          <Icon size={14} strokeWidth={2} />
        </div>
      );
      
    if (style === "glowing" || style === "glow")
      return (
        <div
          className={`${baseClass} w-6 h-6 rounded-full mr-1.5 shadow-sm`}
          style={{ backgroundColor: "white", color: accent, boxShadow: `0 2px 8px ${hexToRgba(accent, 0.25)}` }}
        >
          <Icon size={14} strokeWidth={2} />
        </div>
      );

    // Default & Outline
    return (
      <Icon
        size={size}
        strokeWidth={1.5}
        style={{ color: accent }}
        className="mr-1.5"
      />
    );
  };

  return (
    <div
      className="flex items-center text-sm font-medium transition-opacity hover:opacity-100 opacity-90"
      style={{ color: forceWhiteIcon ? "white" : formatting.colors?.text || "inherit" }}
    >
      {renderIcon()}
      <span className="break-all tracking-tight">{value}</span>
    </div>
  );
};

/* ============================================================================
   SECTION HEADING (SOPHISTICATED)
   ========================================================================== */

const SectionHeading = ({ title, icon: Icon, formatting }) => {
  const accent = formatting.colors?.accent || "#3B82F6";
  const style = formatting.heading?.style || "modern";
  const caps = formatting.heading?.caps || "uppercase";
  const iconStyle = formatting.heading?.iconStyle || "filled";

  const fontSizeVal =
    formatting.heading?.size === "XL"
      ? "1.5em"
      : formatting.heading?.size === "L"
      ? "1.25em"
      : formatting.heading?.size === "S"
      ? "0.9em"
      : "1em";

  const align = formatting.heading?.align || "left";
  const alignClass =
    align === "center"
      ? "justify-center"
      : align === "right"
      ? "justify-end"
      : "justify-start";

  const renderIcon = () => {
    if (!Icon || iconStyle === "none") return null;
    if (iconStyle === "outline") {
      return <Icon size={18} style={{ color: accent }} className="mr-2" />;
    }
    if (iconStyle === "soft") {
      return (
        <div
          className="p-1 rounded mr-2"
          style={{ backgroundColor: hexToRgba(accent, 0.1), color: accent }}
        >
          <Icon size={14} strokeWidth={2} />
        </div>
      );
    }
    // Default to Filled (Solid)
    return (
      <div
        className="p-1 rounded mr-2"
        style={{ backgroundColor: accent, color: "white" }}
      >
        <Icon size={12} className="text-white" />
      </div>
    );
  };

  if (style === "boxed") {
    return (
      <div
        className={cx(
          "flex items-center gap-2 px-3 py-1.5 rounded-md mb-4",
          caps,
          alignClass
        )}
        style={{
          backgroundColor: accent,
          color: "white",
          fontSize: fontSizeVal,
        }}
      >
        {Icon && iconStyle !== "none" && (
          <Icon size={16} className="text-white" />
        )}
        <span className="font-bold tracking-wide">{title}</span>
      </div>
    );
  }

  if (style === "leftLine") {
    return (
      <div
        className={cx(
          "flex items-center gap-3 mb-4 pl-3 border-l-4",
          caps,
          alignClass
        )}
        style={{ borderColor: accent, fontSize: fontSizeVal }}
      >
        <span
          className="font-bold tracking-wide"
          style={{ color: formatting.colors?.text }}
        >
          {title}
        </span>
      </div>
    );
  }

  // V6 MODERN STYLE INJECTED HERE
  if (style === "modern") {
    return (
      <div className={cx("flex items-center gap-3 mb-6 mt-2", alignClass)}>
        <div className="flex flex-col">
          <h2
            className={cx(
              "font-bold tracking-widest leading-none flex items-center",
              caps
            )}
            style={{ color: formatting.colors?.text, fontSize: fontSizeVal }}
          >
            {renderIcon()}
            {title}
          </h2>
          <div
            className="h-1 w-12 rounded-full mt-2"
            style={{ backgroundColor: accent, opacity: 0.8 }}
          />
        </div>
      </div>
    );
  }

  if (style === "highlight") {
    return (
      <div className={cx("mb-4 flex", alignClass)}>
        <div className="relative inline-block">
          <span
            className={cx(
              "absolute bottom-1 left-0 w-full h-3 z-0 opacity-40 transform -rotate-1",
              "rounded-sm"
            )}
            style={{ backgroundColor: accent }}
          />
          <div
            className={cx("relative z-10 flex items-center gap-2 px-1", caps)}
            style={{ fontSize: fontSizeVal }}
          >
            {renderIcon()}
            <span
              className="font-bold tracking-wide"
              style={{ color: formatting.colors?.text }}
            >
              {title}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (style === "shading") {
    return (
      <div
        className={cx(
          "flex items-center gap-2 mb-4 px-3 py-1.5 border-b-2",
          caps,
          alignClass
        )}
        style={{
          borderColor: accent,
          backgroundColor: `${accent}10`,
        }}
      >
        {renderIcon()}
        <span
          className="font-bold tracking-wide"
          style={{ color: formatting.colors?.text, fontSize: fontSizeVal }}
        >
          {title}
        </span>
      </div>
    );
  }

  if (style === "pill") {
    return (
      <div className={cx("mb-4 flex", alignClass)}>
        <div
          className={cx(
            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border",
            caps
          )}
          style={{
            borderColor: accent,
            backgroundColor: `${accent}08`,
            color: formatting.colors?.text,
            fontSize: fontSizeVal,
          }}
        >
          {Icon && <Icon size={16} style={{ color: accent }} />}
          <span className="font-bold tracking-wide">{title}</span>
        </div>
      </div>
    );
  }

  // Fallback / Underline
  return (
    <div className={cx("mb-4 flex", alignClass)}>
      <div
        className={cx("inline-flex items-center gap-2 pb-2 pr-4", caps)}
        style={{
          borderBottom: style === "underline" ? `2px solid ${accent}` : "none",
          backgroundColor: style === "shading" ? `${accent}10` : "transparent",
          fontSize: fontSizeVal,
        }}
      >
        {renderIcon()}
        <span className="font-bold tracking-wide" style={{ color: accent }}>
          {title}
        </span>
      </div>
    </div>
  );
};

/* ============================================================================
   TIMELINE ITEM (CLEAN & AIRY)
   ========================================================================== */

const TimelineItem = ({
  item,
  accent,
  showGrade = false,
  showLocation = true,
}) => {
  if (!item) return null;

  const range = formatRange(item.start_date, item.end_date, item.is_current);
  const displayDate =
    range || (typeof item.start_date === "string" ? item.start_date : "");

  const tech =
    typeof item.technologies === "string"
      ? item.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : (item.technologies || []).filter(Boolean);

  const achievements =
    typeof item.achievements === "string"
      ? item.achievements
          .split("\n")
          .map((a) => a.trim())
          .filter(Boolean)
      : (item.achievements || []).filter(Boolean);

  const title = item.title || item.degree || item.position;
  const subtitle =
    item.company ||
    item.school ||
    item.institution ||
    item.organization ||
    item.issuer;
  const location = item.location || item.board_university;
  const link = item.link || item.url || item.credential_url;
  const grade = item.grade || item.gpa || item.percentage;

  return (
    <div className="timeline-item mb-6 group break-inside-avoid relative">
      {/* Header Row: Flex Wrap allows date to drop down in narrow columns (sidebar) instead of crushing the title */}
      <div className="flex flex-wrap justify-between items-baseline gap-x-2 gap-y-0.5 mb-1.5">
        <div className="flex flex-col min-w-[40%] flex-1">
          <h4 className="font-bold text-gray-900 leading-snug text-[1.05em]">
            {title}
          </h4>
          <div
            className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[0.95em] font-medium mt-0.5"
            style={{ color: accent }}
          >
            {subtitle && <span className="">{subtitle}</span>}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center opacity-70 hover:opacity-100 transition-opacity shrink-0"
              >
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

        <div className="text-right text-sm opacity-60 font-medium shrink-0 ml-auto">
          {displayDate && (
            <div className="whitespace-nowrap leading-tight">{displayDate}</div>
          )}
          {showLocation && location && (
            <div className="text-xs opacity-75 mt-0.5 leading-tight">
              {location}
            </div>
          )}
        </div>
      </div>
      {item.employment_type && (
        <div className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">
          {item.employment_type}
        </div>
      )}
      {showGrade && grade && (
        <div className="text-sm font-medium text-gray-600 mb-2">
          Grade: {grade}
        </div>
      )}

      {item.description && (
        <p className="text-sm text-gray-700 leading-relaxed opacity-90 mb-3 whitespace-pre-line">
          {item.description}
        </p>
      )}

      {/* Achievements - Modern styling (no heavy bullets if possible, or sleek ones) */}
      {achievements.length > 0 && (
        <ul className="mb-3 space-y-1.5">
          {achievements.map((a, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed"
            >
              <div
                className="mt-2 h-1 w-1 rounded-full shrink-0"
                style={{ backgroundColor: accent }}
              />
              <span>{a}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Tech Stack - Modern Chips */}
      {tech.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {tech.map((t, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md text-[0.7rem] font-medium tracking-wide uppercase"
              style={{
                backgroundColor: `${accent}08`,
                color: accent,
                border: `1px solid ${accent}15`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

/* ============================================================================
   SKILLS & LANGUAGES (MODERN CHIPS)
   ========================================================================== */

const renderLevelSection = (items, formatting, type) => {
  if (!items?.length) return null;

  const normalized = items.map((item) => {
    if (typeof item === "string")
      return { name: item, level: null, category: "General" };
    return {
      name: item.name || item.language,
      level: item.level || item.proficiency || null,
      category: item.category || "General",
    };
  });

  const config = formatting[type] || {};
  const layout = config.layout || "grid"; // grid, dots, bars, bubble
  const accent = formatting.colors?.accent || "#3B82F6";
  const compactMode = config.compactMode || "comma"; // comma, pipe, bullet, newline

  // Helper for Bars/Dots
  const renderLevelIndicator = (levelVal, score) => {
    // If bars
    if (layout === "bars") {
      return (
        <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1.5 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${score * 20}%`, backgroundColor: accent }}
          />
        </div>
      );
    }
    // If dots
    if (layout === "dots") {
      return (
        <div className="flex gap-1 mt-1.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i <= score ? "" : "bg-gray-200"
              }`}
              style={{ backgroundColor: i <= score ? accent : undefined }}
            />
          ))}
        </div>
      );
    }
    // If text (custom)
    if (levelVal && layout === "grid") {
      return (
        <span
          className="text-xs font-semibold uppercase tracking-wider opacity-60 ml-auto"
          style={{ color: formatting.colors?.secondary }}
        >
          {levelVal}
        </span>
      );
    }
    return null;
  };

  // --- BUBBLE RENDERER (Modern Default) ---
  if (layout === "bubble" || !layout) {
    const groups = {};
    normalized.forEach((item) => {
      const cat = item.category || "General";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });

    const isFlat =
      Object.keys(groups).length === 1 && Object.keys(groups)[0] === "General";

    const renderBubbleItem = (item, i) => (
      <div
        key={i}
        className="px-3 py-1.5 rounded-lg inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium max-w-full transition-all hover:bg-opacity-20"
        style={{
          backgroundColor: `${accent}10`,
          color: formatting.colors?.text,
          borderLeft: `2px solid ${accent}80`,
        }}
      >
        <span className="break-words leading-tight">{item.name}</span>
        {item.level && (
          <span
            className="text-[0.65rem] opacity-70 uppercase tracking-widest border-l pl-2 ml-auto shrink-0"
            style={{ borderColor: `${accent}40` }}
          >
            {item.level}
          </span>
        )}
      </div>
    );

    if (isFlat) {
      return (
        <div className="flex flex-wrap gap-2.5">
          {groups["General"].map((item, i) => renderBubbleItem(item, i))}
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {Object.entries(groups).map(([cat, list]) => (
          <div key={cat} className="break-inside-avoid">
            <h4 className="font-bold text-xs uppercase tracking-widest mb-3 opacity-60 flex items-center gap-2 mt-1">
              <span className="w-1 h-1 rounded-full bg-current" />
              {cat}
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {list.map((item, i) => renderBubbleItem(item, i))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // --- STANDARD GRID / DOTS / BARS ---
  if (layout === "grid" || layout === "dots" || layout === "bars") {
    const groups = {};
    normalized.forEach((item) => {
      const cat = item.category || "General";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });

    const isFlat =
      Object.keys(groups).length === 1 && Object.keys(groups)[0] === "General";

    const renderGridItem = (item, i) => {
      const score = normalizeLevel(item.level);
      return (
        <div
          key={i}
          className="flex flex-wrap items-center gap-1.5 min-w-[120px] max-w-full mb-1"
        >
          <div
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: accent }}
          />
          <span className="font-medium break-words">{item.name}</span>
          {renderLevelIndicator(item.level, score)}
        </div>
      );
    };

    if (isFlat) {
      return (
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {groups["General"].map(renderGridItem)}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {Object.entries(groups).map(([cat, list]) => (
          <div key={cat}>
            <p
              className="font-bold uppercase mb-1.5 opacity-80 text-xs tracking-wider"
              style={{ color: accent }}
            >
              {cat}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {list.map(renderGridItem)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // --- COMPACT MODE ---
  if (layout === "compact") {
    const separatorMap = {
      comma: ", ",
      pipe: " | ",
      bullet: " • ",
      newline: <br />,
    };
    const sep = separatorMap[compactMode] || ", ";
    return (
      <div className="leading-relaxed">
        {normalized.map((item, i) => {
          const score = normalizeLevel(item.level);
          return (
            <span key={i}>
              <span className="font-medium">{item.name}</span>
              {renderLevelIndicator(item.level, score)}
              {i < normalized.length - 1 && (
                <span className="text-gray-400 mx-1">{sep}</span>
              )}
            </span>
          );
        })}
      </div>
    );
  }

  return null;
};

/* ============================================================================
   MAIN COMPONENT
   ========================================================================== */

const ModernTemplate = ({ data, formatting = {} }) => {
  const accent = formatting.colors?.accent || "#3B82F6";
  const textColor = formatting.colors?.text || "#1F2937";

  /* ---------------- FONT HANDLING ---------------- */
  const currentFont = formatting.font || {};
  const fontFamilyClass = getFontFamily(currentFont);
  // Use a sleek line-height by default
  const sysFont = {
    fontFamily: currentFont.family
      ? `'${currentFont.family}', ${getFontFallback(currentFont)}`
      : getFontFallback(currentFont),
    ...currentFont,
  };

  React.useEffect(() => {
    if (!currentFont.family) return;
    const id = "modern-font-loader";
    let link = document.getElementById(id);
    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    const fontName = currentFont.family.replace(/\s+/g, "+");
    link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@300;400;500;600;700;800&display=swap`;
  }, [currentFont.family]);

  // Layout Logic Matches Technical (Engine Parity)
  const colVal = formatting.layout?.columns;
  const isTwoColumn =
    (typeof colVal === "number" && colVal >= 2) ||
    (typeof colVal === "string" && (colVal === "2" || colVal === "two"));
  const sectionPositions = formatting.section_positions || {};

  const mapId = (id) => (id === "custom" ? "custom_sections" : id);
  const sectionOrder = (
    formatting.section_order || [
      "summary",
      "skills",
      "experience",
      "projects",
      "education",
      "languages",
      "achievements",
      "custom_sections",
      "hobbies",
    ]
  ).map(mapId);
  const sectionVisibility = Object.fromEntries(
    Object.entries(formatting.section_visibility || {}).map(([k, v]) => [
      mapId(k),
      v,
    ])
  );

  // Sidebar Personal Block support
  const personal = formatting.personal || {};
  const personalPositionRaw =
    personal.position || formatting.section_positions?.personal || "header";
  const personalPosition =
    typeof personalPositionRaw === "string"
      ? personalPositionRaw.toLowerCase()
      : "header";
  const movePersonalToSidebar = isTwoColumn && personalPosition === "sidebar";

  // Sidebar Date Formatting
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

  /* ---------------- HEADER (MODERN HERO + FULL CUSTOMIZATION) ---------------- */
  const Header = () => {
    const align = formatting.personal?.align || "left";
    const arrange = formatting.personal?.arrangement || "stacked"; // stacked, inline, spread
    const imageAlign = formatting.personal?.imageAlign || "hidden";
    const hasImage = !!data.image && imageAlign !== "hidden";

    const alignClass =
      align === "center"
        ? "items-center text-center"
        : align === "right"
        ? "items-end text-right"
        : "items-start text-left";
    const flexAlignClass =
      align === "center"
        ? "justify-center"
        : align === "right"
        ? "justify-end"
        : "justify-start";

    // Re-use ContactItem but adapt formatting on the fly if needed
    const contactList = [
      { icon: Mail, value: data.email || data.personal_info?.email },
      { icon: Phone, value: data.phone || data.personal_info?.phone },
      { icon: MapPin, value: data.location || data.personal_info?.location },
      { icon: Linkedin, value: data.linkedin || data.personal_info?.linkedin },
      { icon: Github, value: data.github || data.personal_info?.github },
      { icon: Globe, value: data.website || data.personal_info?.website },
    ].filter((i) => i.value);

    const renderContacts = (className) => (
      <div className={className}>
        {contactList.map((item, i) => (
          <ContactItem
            key={i}
            icon={item.icon}
            value={item.value}
            accent={accent}
            formatting={formatting}
          />
        ))}
      </div>
    );

    return (
      <header
        className={cx(
          "mb-12 flex relative",
          alignClass,
          hasImage && imageAlign === "right"
            ? "flex-row-reverse gap-8"
            : hasImage && imageAlign === "left"
            ? "flex-row gap-8"
            : "flex-col"
        )}
      >
        {hasImage && imageAlign !== "center" && (
          <div className="shrink-0">
            <img
              src={data.image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              style={{ borderColor: `${accent}20` }}
            />
          </div>
        )}

        <div
          className={cx(
            "flex flex-col flex-1",
            alignClass,
            hasImage && imageAlign === "center" && "items-center"
          )}
        >
          {hasImage && imageAlign === "center" && (
            <img
              src={data.image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mb-6"
              style={{ borderColor: `${accent}20` }}
            />
          )}

          <div
            className={cx(
              "w-full relative z-10",
              arrange === "spread" ? "flex justify-between items-start" : ""
            )}
          >
            <div>
              <h1
                className="text-5xl font-extrabold tracking-tight leading-none mb-3"
                style={{ color: formatting.colors?.primary || "#111827" }}
              >
                {data.name || data.personal_info?.full_name || "Your Name"}
              </h1>
              {(data.role || data.personal_info?.profession) && (
                <div
                  className="flex items-center gap-3 mb-4"
                  style={{ color: accent }}
                >
                  {align !== "left" && arrange !== "spread" && (
                    <div className="h-px w-8 bg-current opacity-50" />
                  )}
                  <p className="text-xl font-medium tracking-wide uppercase text-opacity-90">
                    {data.role || data.personal_info?.profession}
                  </p>
                  {align === "left" && arrange !== "spread" && (
                    <div className="h-px w-12 bg-current opacity-50" />
                  )}
                </div>
              )}
            </div>

            {/* Spread Mode contacts (Right Aligned) */}
            {arrange === "spread" &&
              renderContacts(
                "flex flex-col items-end gap-1.5 opacity-80 text-sm"
              )}
          </div>

          {/* Standard Contacts (Stacked or Inline) */}
          {arrange !== "spread" &&
            renderContacts(
              cx(
                "flex opacity-80 text-sm mt-2 font-medium max-w-4xl",
                arrange === "inline"
                  ? "flex-wrap gap-x-6 gap-y-3"
                  : "flex-col gap-2",
                flexAlignClass
              )
            )}
        </div>
      </header>
    );
  };

  /* ---------------- RENDER CONTENT (ENGINE) ---------------- */
  const renderSectionContent = (id) => {
    switch (id) {
      case "summary":
        return (
          (data.summary || data.professional_summary) && (
            <p className="leading-7 opacity-90 text-[1.05em] whitespace-pre-line text-gray-700">
              {data.summary || data.professional_summary}
            </p>
          )
        );

      case "experience":
        return data.experience?.map((item, i) => (
          <TimelineItem key={i} item={item} accent={accent} />
        ));

      case "education":
        return data.education?.map((item, i) => (
          <TimelineItem key={i} item={item} accent={accent} showGrade />
        ));

      case "projects":
        if (!data.projects?.length) return null;
        return data.projects.map((item, i) => {
          const mappedItem = {
            ...item,
            title: item.name || item.title,
            company: item.role || item.company,
            employment_type: item.type,
            achievements: item.highlights || item.achievements || [],
          };
          return <TimelineItem key={i} item={mappedItem} accent={accent} />;
        });

      case "volunteer":
        return data.volunteer_experience?.map((item, i) => (
          <TimelineItem
            key={i}
            item={{ ...item, title: item.role || item.title }}
            accent={accent}
          />
        ));

      case "skills":
        return renderLevelSection(data.skills, formatting, "skills");
      case "languages":
        return renderLevelSection(data.languages, formatting, "languages");

      case "certifications":
        return (
          <div className="space-y-4">
            {data.certifications?.map((c, i) => {
              const link = c.credential_url || c.link;
              const item = {
                title: typeof c === "string" ? c : c.name,
                company: c.issuer,
                start_date: c.issue_date,
                end_date: c.expiry_date,
                description: c.credential_id ? (
                  <span>ID: {c.credential_id}</span>
                ) : (
                  ""
                ),
                link: link,
              };
              return <TimelineItem key={i} item={item} accent={accent} />;
            })}
          </div>
        );

      case "achievements":
        if (!data.achievements?.length) return null;
        return (
          <div className="space-y-2">
            {data.achievements.map((a, i) => {
              if (typeof a === "string")
                return (
                  <div key={i} className="flex gap-2 items-center">
                    <Trophy size={14} className="text-yellow-500 shrink-0" />
                    <span>{a}</span>
                  </div>
                );
              const item = {
                title: a.title || a.name,
                company: a.organization || a.issuer,
                start_date: a.start_date || a.date,
                achievements: a.description ? [a.description] : [],
                link: a.link,
              };
              if (
                !item.company &&
                !item.link &&
                !item.achievements.length &&
                !item.start_date
              ) {
                return (
                  <div key={i} className="flex gap-2 items-center">
                    <Trophy size={14} className="text-yellow-500 shrink-0" />
                    <span className="font-medium">{item.title}</span>
                  </div>
                );
              }
              return <TimelineItem key={i} item={item} accent={accent} />;
            })}
          </div>
        );

      case "custom_sections":
        if (!data.custom_sections?.length) return null;
        return (
          <div className="space-y-8">
            {data.custom_sections.map((section, idx) => {
              let rawItems = section.items || [];
              if (typeof rawItems === "string") rawItems = rawItems.split("\n");
              const itemsList = Array.isArray(rawItems)
                ? rawItems.filter(Boolean)
                : [];
              return (
                <div key={idx}>
                  <h4 className="font-bold text-sm uppercase tracking-wider opacity-60 mb-3 flex items-center gap-2">
                    {section.title}
                    {section.link && (
                      <a
                        href={section.link}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: accent }}
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </h4>
                  <ul className="space-y-2 ml-1">
                    {itemsList.map((str, ii) => (
                      <li key={ii} className="flex items-start gap-3 text-sm">
                        <div className="mt-1.5 h-1 w-1 rounded-full shrink-0 bg-gray-400" />
                        <span className="opacity-90">
                          {typeof str === "string" ? str.trim() : str}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        );

      case "hobbies":
        if (!data.hobbies?.length) return null;
        return (
          <div className="flex flex-wrap gap-2">
            {data.hobbies
              .map((it) => (typeof it === "string" ? it : it?.name || ""))
              .filter(Boolean)
              .map((name, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full border text-sm font-medium"
                  style={{ borderColor: `${accent}40`, color: textColor }}
                >
                  {name}
                </span>
              ))}
          </div>
        );

      default:
        return null;
    }
  };

  const SectionWrapper = ({ id }) => {
    if (sectionVisibility[id] === false) return null;
    const title =
      formatting.section_titles?.[id] || id.replace(/_/g, " ").toUpperCase();
    const icons = {
      summary: FileText,
      experience: Briefcase,
      education: Flag,
      projects: Code,
      skills: Cpu,
      languages: LanguagesIcon,
      certifications: Award,
      achievements: Trophy,
      volunteer: Heart,
      hobbies: Sparkles,
      custom_sections: Star,
    };
    const content = renderSectionContent(id);
    if (!content) return null;

    return (
      <section
        style={{ marginBottom: (formatting.spacing?.section_spacing || 6) * 3 }}
      >
        <SectionHeading
          title={title}
          icon={icons[id]}
          formatting={formatting}
        />
        <div style={{ color: textColor }}>{content}</div>
      </section>
    );
  };

  /* ---------------- FINAL RENDER ---------------- */
  let mainColNodes = [];
  let sidebarNodes = [];

  if (movePersonalToSidebar) {
    sidebarNodes.push(
      <div key="personal-sidebar" className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2 leading-none">
          {data.name}
        </h1>
        <p className="opacity-75 mb-6 text-lg" style={{ color: accent }}>
          {data.role}
        </p>
        <div className="space-y-3 text-sm opacity-90">
          {[
            { icon: Mail, value: data.email },
            { icon: Phone, value: data.phone },
            { icon: Linkedin, value: data.linkedin },
            { icon: Globe, value: data.website },
          ]
            .filter((i) => i.value)
            .map((item, i) => (
              <div key={i} className="flex gap-2 items-center">
                <item.icon size={14} />
                <span>{item.value}</span>
              </div>
            ))}
        </div>
      </div>
    );
  }

  const sectionsToRender = [...sectionOrder];

  if (isTwoColumn) {
    sectionsToRender.forEach((id) => {
      const pos = sectionPositions[id];
      const isSidebarDefault = [
        "skills",
        "languages",
        "hobbies",
        "certifications",
        "achievements",
      ].includes(id);
      if (pos === "sidebar" || (pos !== "main" && isSidebarDefault)) {
        sidebarNodes.push(<SectionWrapper key={id} id={id} />);
      } else {
        mainColNodes.push(<SectionWrapper key={id} id={id} />);
      }
    });
  } else {
    mainColNodes = sectionsToRender.map((id) => (
      <SectionWrapper key={id} id={id} />
    ));
  }

  return (
    <div
      className={cx(
        "w-full bg-white min-h-[inherit] relative",
        fontFamilyClass
      )}
      style={{
        ...sysFont,
        lineHeight: 1.6, // Airy line height
        padding: `${formatting.spacing?.margin_vertical || 12}mm ${
          formatting.spacing?.margin_horizontal || 12
        }mm`, // Generous default padding
      }}
    >
      {/* Decorative Top Accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 opacity-60"
        style={{ background: `linear-gradient(90deg, ${accent}, white)` }}
      />

      {!movePersonalToSidebar && <Header />}

      {isTwoColumn ? (
        <div className="grid grid-cols-12 gap-12">
          <div
            className="col-span-4 flex flex-col pt-2 border-t-2 border-transparent"
            style={{ borderTopColor: `${accent}10` }}
          >
            {sidebarNodes}
          </div>
          <div
            className="col-span-8 flex flex-col pt-2 border-t-2 border-transparent"
            style={{ borderTopColor: `${accent}10` }}
          >
            {mainColNodes}
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto">{mainColNodes}</div>
      )}

      {/* FOOTER */}
      <footer
        className="mt-16 pt-8 border-t text-center text-[0.65rem] uppercase tracking-widest opacity-40 flex items-center justify-center gap-2"
        style={{ borderColor: `${accent}20` }}
      >
        <span>Created with NBY Resume Builder</span>
      </footer>
    </div>
  );
};

export default ModernTemplate;

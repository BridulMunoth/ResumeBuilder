/**  ============================
 *   TECHNICAL TEMPLATE — V5 Ultimate (Patched)
 *   1-Col/2-Col Support, Full Customization, All Fields
 *   Enhanced Header & Level Renderers (Skills/Languages)
 *   Dynamic Font Loading & Layout Fixes
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
  BookOpen,
  Star,
  Circle,
} from "lucide-react";
import {
  formatDateRange as formatRange,
  getFontFallback,
} from "./TemplateHelpers";

/* ==========================================================================
   UTILITIES
   ========================================================================== */

const cx = (...cls) => cls.filter(Boolean).join(" ");

// Tailwind font utility for basic fallback when no explicit family is chosen
const getFontFamily = (font) => {
  if (font?.family) return ""; // Let inline style handle the custom family
  if (!font) return "font-sans";
  if (font.type === "serif") return "font-serif";
  if (font.type === "mono") return "font-mono";
  return "font-sans";
};

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

// Map numeric level (0-5 or 0-100) to simple 1-5 scale for dots
const normalizeLevel = (val) => {
  if (!val) return 0;
  // If string (e.g. "Expert"), map to number
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
  if (val > 5) return Math.round(val / 20); // assume 100 base
  return val;
};

/* ==========================================================================
   HELPERS
   ========================================================================== */
const ContactItem = ({
  icon: Icon,
  value,
  accent,
  formatting,
  forceWhiteIcon,
}) => {
  if (!value) return null;

  const style = formatting?.personal?.iconStyle || "filled";

  const renderIcon = () => {
    if (style === "none") return null;

    const size = 15;
    const baseClass = "shrink-0 flex items-center justify-center shadow-sm";

    // High Contrast Mode (Header)
    if (forceWhiteIcon) {
      if (style === "outline") {
        return (
          <Icon
            size={size}
            className="text-white drop-shadow-md"
            strokeWidth={2}
          />
        );
      }
      if (style === "glow") {
        return (
          <Icon
            size={size}
            className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            strokeWidth={2}
          />
        );
      }
      if (style === "filled") {
        // "Filled" = Solid White Tile with Border
        return (
          <div
            className={`${baseClass} w-7 h-7 rounded bg-white border border-black/25`}
            style={{ color: accent }}
          >
            <Icon size={14} strokeWidth={2.5} />
          </div>
        );
      }
      if (style === "soft") {
        // Glassy look
        return (
          <div
            className={`${baseClass} w-7 h-7 rounded-full`}
            style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white" }}
          >
            <Icon size={14} strokeWidth={2} />
          </div>
        );
      }
      if (style === "diamond") {
        return (
          <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-white opacity-20 transform rotate-45 rounded-sm" />
            <div className="relative z-10 text-white">
              <Icon size={14} strokeWidth={2} />
            </div>
          </div>
        );
      }
      if (style === "round" || style === "square") {
        // Sticker look
        return (
          <div
            className={`${baseClass} w-7 h-7 ${
              style === "round" ? "rounded-full" : "rounded"
            } bg-white`}
            style={{ color: accent }}
          >
            <Icon size={14} strokeWidth={2.5} />
          </div>
        );
      }
      return <Icon size={size} className="text-white" />;
    }

    // Normal Mode
    const bgSoft = `${accent}20`;
    if (style === "outline")
      return <Icon size={size} style={{ color: accent }} strokeWidth={2} />;
    if (style === "glow")
      return (
        <Icon
          size={size}
          style={{ color: accent, filter: `drop-shadow(0 0 4px ${accent})` }}
          strokeWidth={2}
        />
      );

    if (style === "filled") {
      return (
        <div
          className={`${baseClass} w-7 h-7 rounded bg-white border border-gray-200`}
          style={{ color: accent }}
        >
          <Icon size={14} strokeWidth={2} />
        </div>
      );
    }

    if (style === "soft") {
      return (
        <div
          className={`${baseClass} w-7 h-7 rounded-full`}
          style={{ backgroundColor: bgSoft, color: accent }}
        >
          <Icon size={14} strokeWidth={2} />
        </div>
      );
    }

    if (style === "diamond") {
      return (
        <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
          <div
            className="absolute inset-0 opacity-20 transform rotate-45 rounded-sm"
            style={{ backgroundColor: accent }}
          />
          <div className="relative z-10 text-white" style={{ color: accent }}>
            <Icon size={14} strokeWidth={2} />
          </div>
        </div>
      );
    }

    if (style === "round" || style === "square") {
      return (
        <div
          className={`${baseClass} w-7 h-7 ${
            style === "round" ? "rounded-full" : "rounded"
          }`}
          style={{ backgroundColor: bgSoft, color: accent }}
        >
          <Icon size={14} strokeWidth={2} />
        </div>
      );
    }
    return <Icon size={size} style={{ color: accent }} />;
  };

  return (
    <div
      className="flex items-center gap-2.5 font-medium tracking-wide"
      style={{
        color: forceWhiteIcon ? "white" : "inherit",
        textShadow: forceWhiteIcon ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
        fontSize: "0.9em",
      }}
    >
      {style !== "none" && renderIcon()}
      <span className="break-all opacity-95 hover:opacity-100 transition-opacity">
        {value}
      </span>
    </div>
  );
};

/* ==========================================================================
   SECTION HEADING
   ========================================================================== */

const SectionHeading = ({ title, icon: Icon, formatting }) => {
  const accent = formatting.colors?.accent || "#3B82F6";
  const style = formatting.heading?.style || "underline";
  const caps = formatting.heading?.caps || "capitalize";
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
      return <Icon size={18} style={{ color: accent }} />;
    }
    return (
      <div
        className="p-1 rounded bg-opacity-10 mr-2"
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

  if (style === "modern") {
    return (
      <div
        className={cx(
          "flex items-center gap-3 mb-4 pl-3 py-1 border-l-4",
          caps,
          alignClass
        )}
        style={{
          borderColor: accent,
          background: `linear-gradient(90deg, ${accent}15 0%, transparent 100%)`,
          fontSize: fontSizeVal,
        }}
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
          backgroundColor: `${accent}10`, // 10% opacity
        }}
      >
        {renderIcon()}
        <span
          className="font-bold tracking-wide"
          style={{ color: formatting.colors?.text }}
        >
          {title}
        </span>
      </div>
    );
  }

  if (style === "circleLine") {
    return (
      <div className={cx("flex items-center gap-3 mb-4", alignClass)}>
        {/* Icon Circle */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: accent, color: "white" }}
        >
          {Icon ? (
            <Icon size={16} />
          ) : (
            <span className="font-bold" style={{ fontSize: "0.9em" }}>
              #
            </span>
          )}
        </div>
        {/* Title */}
        <span
          className={cx("font-bold tracking-wide", caps)}
          style={{ color: formatting.colors?.text, fontSize: fontSizeVal }}
        >
          {title}
        </span>
        {/* Line */}
        <div
          className="h-[2px] flex-1 opacity-20"
          style={{ backgroundColor: formatting.colors?.text || "#000" }}
        />
      </div>
    );
  }

  if (style === "diamondLine") {
    return (
      <div className={cx("flex items-center gap-4 mb-4", alignClass)}>
        {/* Diamond Container */}
        <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
          <div
            className="absolute inset-0 transform rotate-45 rounded-sm"
            style={{ backgroundColor: accent }}
          />
          <div className="relative z-10 text-white">
            {Icon ? (
              <Icon size={14} />
            ) : (
              <span className="font-bold" style={{ fontSize: "0.9em" }}>
                #
              </span>
            )}
          </div>
        </div>
        {/* Title */}
        <span
          className={cx("font-bold tracking-wide", caps)}
          style={{ color: formatting.colors?.text, fontSize: fontSizeVal }}
        >
          {title}
        </span>
        {/* Line */}
        <div
          className="h-[1px] flex-1 opacity-20"
          style={{ backgroundColor: formatting.colors?.text || "#000" }}
        />
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
            backgroundColor: `${accent}08`, // very light bg
            color: formatting.colors?.text,
            fontSize: fontSizeVal,
          }}
        >
          {/* Use specific colored icon for Pill/clean look */}
          {Icon && <Icon size={16} style={{ color: accent }} />}
          <span className="font-bold tracking-wide">{title}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cx("mb-3 flex", alignClass)}>
      <div
        className={cx("inline-flex items-center gap-2 pb-2 pr-4", caps)}
        style={{
          borderBottom: style === "underline" ? `2px solid ${accent}` : "none",
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

/* ==========================================================================
   CONTENT RENDERERS
   ========================================================================== */

// Unified renderer for Skills and Languages
const renderLevelSection = (items, formatting, type) => {
  if (!items?.length) return null;

  // Normalize items to { name, level, category? }
  const normalized = items.map((item) => {
    if (typeof item === "string")
      return { name: item, level: null, category: "General" };
    return {
      name: item.name || item.language,
      // Accept both 'level' and 'proficiency' (common in languages)
      level: item.level || item.proficiency || null,
      category: item.category || "General",
    };
  });

  const config = formatting[type] || {};
  // Old layout 'level' or 'bubble' maps to fallback if needed, but we essentially rely on grid/compact + toggles
  // We treat "grid" as default if layout is invalid
  let layout = config.layout || "grid";
  // If user has old "level" or "bubble" layout stored, defaults:
  if (layout === "level") layout = "grid";
  if (layout === "bubble") layout = "compact"; // bubble usually wraps, so compact (flex) is closest

  const levelMode = config.levelMode || "text"; // text, dots, bar, hide
  const compactMode = config.compactMode || "bullet"; // comma, pipe, bullet
  const enableBubble = config.enableBubble || false; // New boolean toggle

  // Actually, if Layout=Grid, we already have columns.
  // If Layout=Compact, we wrap.
  // The previous request said: "when bubble is on it must it's layout must be as the selected option that is either grid or compact"
  // So if Grid -> Grid Bubbles. If Compact -> Wrapping Bubbles.

  const subinfo = config.subinfo || "dash"; // dash, colon, bracket
  const accent = formatting.colors?.accent || "#3B82F6";

  // Subinfo Formatter
  const formatSubinfo = (level) => {
    if (!level) return null;
    if (subinfo === "bracket")
      return (
        <span
          className="opacity-75 ml-1.5 font-normal"
          style={{ fontSize: "0.85em" }}
        >
          ({level})
        </span>
      );
    if (subinfo === "colon")
      return (
        <span
          className="opacity-75 ml-1.5 font-normal"
          style={{ fontSize: "0.85em" }}
        >
          : {level}
        </span>
      );
    return (
      <span
        className="opacity-75 ml-1.5 font-normal"
        style={{ fontSize: "0.85em" }}
      >
        – {level}
      </span>
    ); // dash default
  };

  // Helper to render level indicator (Dots, Bar, or Text)
  // Only renders if levelMode is NOT "hide"
  const renderLevelIndicator = (level, score) => {
    if (levelMode === "hide") return null;
    // Do not render any indicator if this item has no level/proficiency
    if (level == null || level === "") return null;

    if (levelMode === "bar") {
      // Use smaller bar for bubbles or if requested "shorter" generally
      const barWidth = enableBubble ? "w-10" : "w-12";
      const margin = enableBubble ? "" : "ml-1.5";

      return (
        <div
          className={cx(
            barWidth,
            "h-1.5 bg-gray-200 rounded-full overflow-hidden shrink-0 align-middle inline-block",
            margin
          )}
        >
          <div
            className="h-full rounded-full"
            style={{ width: `${score * 20}%`, backgroundColor: accent }}
          />
        </div>
      );
    }

    if (levelMode === "dots") {
      return (
        <div
          className={cx(
            "flex gap-0.5 shrink-0 align-middle inline-flex",
            enableBubble ? "" : "ml-1.5"
          )}
        >
          {[1, 2, 3, 4, 5].map((dot) => (
            <Circle
              key={dot}
              size={7}
              className={dot <= score ? "fill-current" : "text-gray-300"}
              style={dot <= score ? { color: accent } : {}}
            />
          ))}
        </div>
      );
    }

    // Default: Text
    // Use custom level label if available
    let displayLevel = level;
    if (
      config.customLevels &&
      Array.isArray(config.customLevels) &&
      score >= 1 &&
      score <= 5
    ) {
      // score is 1-5, customLevels is 0-indexed
      const customLabel = config.customLevels[score - 1];
      if (customLabel) displayLevel = customLabel;
    }

    return formatSubinfo(displayLevel);
  };

  // --- BUBBLE MODE RENDERER ---
  if (enableBubble) {
    // If Layout is Grid, use Grid logic but with Bubble styling
    // If Layout is Compact, use Flex Wrap logic with Bubble styling

    const isGrid = layout === "grid";

    // Render common bubble content
    const renderBubbleItem = (item, i, extraClass = "") => {
      const score = normalizeLevel(item.level);
      return (
        <div
          key={i}
          className={cx(
            "px-3 py-1.5 rounded-xl font-medium border flex items-center flex-wrap gap-2 shadow-sm hover:shadow transition-all",
            extraClass
          )}
          style={{
            backgroundColor: `${accent}12`,
            borderColor: `${accent}35`,
            color: formatting.colors?.text,
            fontSize: "0.9em",
          }}
        >
          <span className="break-words whitespace-normal leading-snug">
            {item.name}
          </span>
          {renderLevelIndicator(item.level, score)}
        </div>
      );
    };

    if (isGrid) {
      // Grid Layout + Bubble
      // Group by category if needed
      const groups = {};
      normalized.forEach((item) => {
        const cat = item.category || "General";
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(item);
      });
      const isFlat =
        Object.keys(groups).length === 1 &&
        Object.keys(groups)[0] === "General";

      if (isFlat) {
        return (
          <div className="flex flex-wrap gap-2">
            {groups["General"].map((item, i) => renderBubbleItem(item, i))}
          </div>
        );
      }
      return (
        <div className="space-y-4">
          {Object.entries(groups).map(([cat, list]) => (
            <div key={cat}>
              <p
                className="font-bold uppercase mb-1.5 opacity-80"
                style={{ color: accent, fontSize: "0.85em" }}
              >
                {cat}
              </p>
              <div className="flex flex-wrap gap-2">
                {list.map((item, i) => renderBubbleItem(item, i))}
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      // Compact Layout + Bubble => Flex Wrap
      return (
        <div className="flex flex-wrap gap-2">
          {normalized.map((item, i) => renderBubbleItem(item, i, ""))}
        </div>
      );
    }
  }

  // --- STANDARD RENDERERS (No Bubble) ---

  // Standard Grid
  if (layout === "grid" || layout === "level") {
    // Treat old 'level' layout as grid for fallback
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
          className="flex flex-wrap items-center gap-1.5 min-w-[120px] max-w-full"
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
              className="font-bold uppercase mb-1.5 opacity-80"
              style={{ color: accent, fontSize: "0.85em" }}
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

  // Standard Compact (Inline sentences)
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

/* ==========================================================================
   TIMELINE ITEM
   ========================================================================== */

const TimelineItem = ({
  item,
  accent,
  showLocation = true,
  showGrade = false,
}) => {
  if (!item) return null;

  const range = formatRange(item.start_date, item.end_date, item.is_current);
  // Fallback: if the provided date string isn't parseable, display it as-is
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
    <div
      className="timeline-item relative pl-4 border-l-2 pb-3 last:pb-0"
      style={{ borderColor: `${accent}40` }}
    >
      <div
        className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 bg-white"
        style={{ borderColor: accent }}
      ></div>

      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 mb-1">
        <h3
          className="font-bold text-gray-900 leading-tight"
          style={{ fontSize: "1.1em" }}
        >
          {title}
        </h3>
        <div className="flex items-center gap-2">
          {displayDate && (
            <span
              className="font-mono text-gray-500"
              style={{ fontSize: "0.85em" }}
            >
              {displayDate}
            </span>
          )}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex align-middle focus:outline-none opacity-80 hover:opacity-100"
              style={{ color: accent }}
              title={link}
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-x-2 mb-2">
        <div
          className="flex flex-wrap items-center gap-x-2 font-semibold"
          style={{ color: accent, fontSize: "0.9em" }}
        >
          {subtitle && <span>{subtitle}</span>}
          {location && showLocation && subtitle && (
            <span
              className="text-gray-400 font-normal"
              style={{ fontSize: "0.85em" }}
            >
              •
            </span>
          )}
          {showLocation && location && (
            <span
              className="text-gray-400 font-normal"
              style={{ fontSize: "0.85em" }}
            >
              {location}
            </span>
          )}
        </div>
        {item.employment_type && (
          <span
            className="text-gray-400 font-medium text-xs whitespace-nowrap"
            style={{ fontSize: "0.85em" }}
          >
            {item.employment_type}
          </span>
        )}
      </div>

      <div
        className="flex flex-wrap items-center gap-2 mb-2"
        style={{ fontSize: "0.85em" }}
      >
        {showGrade && grade && (
          <div className="text-gray-600 font-medium">Grade: {grade}</div>
        )}
        {item.field && <div className="text-gray-500">Field: {item.field}</div>}
      </div>
      {item.description && (
        <div className="text-gray-700 whitespace-pre-line leading-relaxed mb-2 opacity-90">
          {item.description}
        </div>
      )}

      {achievements.length > 0 && (
        <ul className="flex flex-wrap gap-x-4 gap-y-1 my-2 list-none p-0">
          {achievements.map((a, i) => (
            <li
              key={i}
              className="inline-flex items-center gap-2 text-gray-700 m-0"
            >
              <span
                className="h-1.5 w-1.5 rounded-full shrink-0"
                style={{ backgroundColor: accent }}
              />
              <span className="leading-tight">{a}</span>
            </li>
          ))}
        </ul>
      )}

      {tech.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {tech.map((t, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded font-medium border text-white"
              style={{
                fontSize: "0.8em",
                backgroundColor: accent,
                borderColor: accent,
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

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */

const TechnicalTemplate = ({ data, formatting = {} }) => {
  const accent = formatting.colors?.accent || "#3B82F6";
  const textColor = formatting.colors?.text || "#1F2937";

  // Font handling ------------------------------------------------------------
  const currentFont = formatting.font || {};
  const fontFamily = getFontFamily(currentFont);

  // If the user picked a concrete font family in the customization panel,
  // apply it to the whole template and fall back to a sensible generic family
  const selectedFont = currentFont.family;
  const fontStyle = selectedFont
    ? {
        fontFamily: `'${selectedFont}', ${getFontFallback(currentFont)}`,
      }
    : {
        fontFamily: getFontFallback(currentFont),
      };

  const isTwoColumn = formatting.layout?.columns === 2;
  // Map UI ids -> template ids (builder uses 'custom', template uses 'custom_sections')
  const mapId = (id) => (id === "custom" ? "custom_sections" : id);
  const mappedOrder = (formatting.section_order || []).map(mapId);
  const mappedVisibility = Object.fromEntries(
    Object.entries(formatting.section_visibility || {}).map(([k, v]) => [
      mapId(k),
      v,
    ])
  );
  const sectionPositions = Object.fromEntries(
    Object.entries(formatting.section_positions || {}).map(([k, v]) => [
      mapId(k),
      v,
    ])
  );

  // Dynamic Font Loader
  React.useEffect(() => {
    if (selectedFont) {
      const linkId = "dynamic-font-loader";
      let link = document.getElementById(linkId);
      if (!link) {
        link = document.createElement("link");
        link.id = linkId;
        link.rel = "stylesheet";
        document.head.appendChild(link);
      }
      const fontName = selectedFont.replace(/\s+/g, "+");
      link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@300;400;500;600;700&display=swap`;
    }
  }, [selectedFont]);

  // ----------------------------------------------------------------------
  // Header
  // ----------------------------------------------------------------------
  const Header = () => {
    const personal = formatting.personal || {};
    const alignClass =
      personal.align === "center"
        ? "items-center text-center"
        : personal.align === "right"
        ? "items-end text-right"
        : "items-start text-left";

    const arrange = personal.arrangement || "stacked";
    const imageAlign = personal.imageAlign || "hidden";
    const hasImage = !!data.image && imageAlign !== "hidden";

    // Define all contact items
    const contactItems = [
      { icon: Mail, value: data.email || data.personal_info?.email },
      { icon: Phone, value: data.phone || data.personal_info?.phone },
      { icon: MapPin, value: data.location || data.personal_info?.location },
      {
        icon: Linkedin,
        value: data.linkedin || data.personal_info?.linkedin,
      },
      { icon: Github, value: data.github || data.personal_info?.github },
      { icon: Globe, value: data.website || data.personal_info?.website },
      {
        icon: Flag,
        value: data.nationality || data.personal_info?.nationality,
      },
      {
        icon: Calendar,
        value: formatFullDate(
          data.date_of_birth || data.personal_info?.date_of_birth
        ),
      },
    ].filter((item) => item.value); // Filter out empty items

    return (
      <div
        className="w-full text-white relative overflow-hidden"
        style={{
          backgroundColor: "#0F1B3D",
          background: `linear-gradient(135deg, #0F1B3D 0%, ${accent} 100%)`,
        }}
      >
        <div className="relative z-10 p-8">
          <div
            className={cx(
              "flex gap-6",
              imageAlign === "right"
                ? "flex-row"
                : imageAlign === "center"
                ? "flex-col items-center"
                : "flex-row-reverse", // Left image = row-reverse checking alignment? No.
              // Logic check:
              // If align is left, text is left. If image is left, it should be Image -> Text.
              // If align is right, text is right. Image right: Text -> Image.
              // Simplest is to handle image placement manually or via order.
              imageAlign === "left" ? "flex-row" : "",
              imageAlign === "center" ? "text-center" : ""
            )}
          >
            {/* Image Section */}
            {hasImage && (
              <div
                className={cx(
                  "shrink-0",
                  imageAlign === "center" ? "mb-4" : "",
                  imageAlign === "right" ? "order-last ml-auto" : "order-first"
                )}
              >
                <img
                  src={data.image}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-white/20 shadow-lg"
                />
              </div>
            )}

            {/* Content Section */}
            <div
              className={cx(
                "flex flex-col flex-1",
                alignClass,
                imageAlign === "center" ? "items-center" : ""
              )}
            >
              <div
                className={cx(
                  "w-full",
                  arrange === "spread" && "flex justify-between items-start"
                )}
              >
                <div>
                  <h1 className="text-4xl font-extrabold tracking-tight mb-1">
                    {data.name || data.personal_info?.full_name || "Your Name"}
                  </h1>
                  <p className="text-xl opacity-90 font-light">
                    {data.role || data.personal_info?.profession || "Your Role"}
                  </p>
                </div>

                {/* SPREAD MODE: Contact Details (Right Aligned) */}
                {arrange === "spread" && (
                  <div className="flex flex-col items-end gap-1.5 text-sm opacity-90 mt-1">
                    {contactItems.map((item, i) => (
                      <ContactItem
                        key={i}
                        icon={item.icon}
                        value={item.value}
                        accent={accent}
                        formatting={formatting}
                        forceWhiteIcon={true}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* NON-SPREAD MODE: Contact Details */}
              {arrange !== "spread" && (
                <div
                  className={cx(
                    "flex text-sm opacity-90 mt-3",
                    arrange === "inline"
                      ? "flex-wrap gap-x-6 gap-y-2"
                      : "flex-col gap-1.5",
                    arrange === "inline" && personal.align === "center"
                      ? "justify-center"
                      : "",
                    arrange === "inline" && personal.align === "right"
                      ? "justify-end"
                      : ""
                  )}
                >
                  {contactItems.map((item, i) => (
                    <ContactItem
                      key={i}
                      icon={item.icon}
                      value={item.value}
                      accent={accent}
                      formatting={formatting}
                      forceWhiteIcon={true}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSectionContent = (id) => {
    switch (id) {
      case "summary":
        if (!data.summary && !data.professional_summary) return null;
        return (
          (data.summary || data.professional_summary) && (
            <p
              className="leading-relaxed whitespace-pre-line"
              style={{ color: textColor }}
            >
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
          <TimelineItem key={i} item={item} accent={accent} showGrade={true} />
        ));
      case "projects":
        if (!data.projects?.length) return null;
        return data.projects.map((item, i) => {
          // Map fields correctly: name -> title, role -> company(subtitle), highlights -> achievements
          const mappedItem = {
            ...item,
            title: item.name || item.title,
            company: item.role || item.company,
            employment_type: item.type, // Map type -> employment_type (rendered in subtitle row)
            achievements: item.highlights || item.achievements || [],
          };
          return <TimelineItem key={i} item={mappedItem} accent={accent} />;
        });
      case "volunteer":
        if (!data.volunteer_experience?.length) return null;
        return data.volunteer_experience.map((item, i) => {
          // Map role -> title
          const mappedItem = {
            ...item,
            title: item.role || item.title,
          };
          return <TimelineItem key={i} item={mappedItem} accent={accent} />;
        });

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
                company: (
                  <span className="flex items-center gap-1.5 align-middle">
                    {c.issuer}
                    {c.link && (
                      <a
                        href={c.link}
                        target="_blank"
                        rel="noreferrer"
                        className="opacity-70 hover:opacity-100 transition inline-flex items-center align-middle"
                        style={{ color: accent }}
                        title={c.link}
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </span>
                ),
                start_date: c.issue_date,
                end_date: c.expiry_date,
                // Do NOT pass link for the title to avoid external link icon near course name
                // Keep issuer/credential links rendered separately below
                description: c.credential_id ? (
                  <span>
                    Credential ID: {c.credential_id}
                    {link && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex align-middle ml-1.5 opacity-80 hover:opacity-100"
                        style={{ color: accent }}
                        title={link}
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </span>
                ) : (
                  ""
                ),
              };
              return <TimelineItem key={i} item={item} accent={accent} />;
            })}
          </div>
        );

      case "custom_sections":
        // Handle custom sections
        // CustomSections data is array of objects: { title, items: string, link }
        if (!data.custom_sections?.length) return null;

        return (
          <div className="space-y-6">
            {data.custom_sections.map((section, idx) => {
              // Convert items string (newline separated) to simple bullets or TimelineItems
              // Convert items to array safely (handle both string and array inputs)
              let rawItems = section.items || [];
              if (typeof rawItems === "string") {
                rawItems = rawItems.split("\n");
              }

              const itemsList = Array.isArray(rawItems)
                ? rawItems
                    .map((line) =>
                      typeof line === "string" ? line.trim() : ""
                    )
                    .filter(Boolean)
                : [];

              // We render each custom section as a mini-section with its own header
              return (
                <div key={idx} className="space-y-3">
                  <h4 className="font-bold text-sm uppercase tracking-wider opacity-90 border-b pb-1 mb-2 border-slate-200">
                    {section.title || `Section ${idx + 1}`}
                    {section.link && (
                      <a
                        href={section.link}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 inline-flex align-top opacity-60 hover:opacity-100"
                        style={{ color: accent }}
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </h4>

                  {/* Render items as simple bullets */}
                  <ul className="space-y-1.5 ml-1">
                    {itemsList.map((itemStr, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: accent }}
                        />
                        <span className="opacity-90">{itemStr}</span>
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
        // Apply Interests formatting (compactMode) for separator rendering
        {
          const interestsCfg = formatting.interests || {};
          const mode = interestsCfg.compactMode || "comma"; // bullet | pipe | newline | comma
          const items = data.hobbies
            .map((it) => (typeof it === "string" ? it : it?.name || ""))
            .filter(Boolean);

          // Bubble mode for interests (no levels)
          if (interestsCfg.enableBubble) {
            return (
              <div className="flex flex-wrap gap-2">
                {items.map((name, i) => (
                  <div
                    key={i}
                    className="px-3 py-1.5 rounded-xl font-medium border flex items-center flex-wrap gap-2 shadow-sm hover:shadow transition-all"
                    style={{
                      backgroundColor: `${accent}12`,
                      borderColor: `${accent}35`,
                      color: formatting.colors?.text,
                      fontSize: "0.9em",
                    }}
                  >
                    <span className="break-words whitespace-normal leading-snug">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            );
          }

          if (mode === "newline") {
            return (
              <div className="space-y-1.5">
                {items.map((name, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: accent }}
                    />
                    <span className="font-medium leading-snug">{name}</span>
                  </div>
                ))}
              </div>
            );
          }

          const sep =
            mode === "bullet" ? " • " : mode === "pipe" ? " | " : ", ";

          return (
            <div className="leading-relaxed">
              {items.map((name, i) => (
                <span key={i} className="font-medium">
                  {name}
                  {i < items.length - 1 && (
                    <span className="text-gray-400 mx-1">{sep}</span>
                  )}
                </span>
              ))}
            </div>
          );
        }

      case "achievements":
        if (!data.achievements?.length) return null;

        return (
          <div className="space-y-1.5">
            {data.achievements.map((a, i) => {
              if (typeof a === "string") {
                return (
                  <div key={i} className="flex gap-2">
                    <Trophy
                      size={14}
                      className="text-yellow-500 shrink-0 mt-0.5"
                    />
                    <span>{a}</span>
                  </div>
                );
              }

              // Fix: Explicitly structured item for TimelineItem
              const item = {
                title: a.title || a.name,
                // Support both normalized key `organization` and original `issuer`
                company: a.organization || a.issuer,
                // Support both `start_date` (normalized) and legacy `date`
                start_date: a.start_date || a.date,
                achievements: a.description ? [a.description] : [],
                link: a.link,
              };

              // If it's just a simple title, render simply
              if (
                !item.company &&
                !item.link &&
                !item.achievements.length &&
                !item.start_date
              ) {
                return (
                  <div key={i} className="flex gap-2">
                    <Trophy
                      size={14}
                      className="text-yellow-500 shrink-0 mt-0.5"
                    />
                    <span className="font-medium">{item.title}</span>
                  </div>
                );
              }

              return <TimelineItem key={i} item={item} accent={accent} />;
            })}
          </div>
        );
      default:
        return null;
    }
  };

  const SectionWrapper = ({ id }) => {
    const title =
      formatting.section_titles?.[id] ||
      id.charAt(0).toUpperCase() + id.slice(1);
    const icons = {
      summary: FileText,
      experience: Briefcase,
      education: Flag,
      projects: Code,
      skills: Cpu,
      languages: LanguagesIcon,
      interests: Sparkles,
      hobbies: Sparkles,
      certifications: Award,
      achievements: Trophy,
      volunteer: Heart,
      custom_sections: Star, // Default to Star or generic icon
    };
    const Icon = icons[id] || Star;
    const content = renderSectionContent(id);

    if (!content || (Array.isArray(content) && content.length === 0))
      return null;

    const spacingMb =
      formatting.spacing?.section_spacing !== undefined
        ? formatting.spacing.section_spacing * 2
        : 24;

    return (
      <section style={{ marginBottom: spacingMb }}>
        <SectionHeading title={title} icon={Icon} formatting={formatting} />
        <div style={{ color: textColor }}>{content}</div>
      </section>
    );
  };

  // Base order
  let allSections = (mappedOrder && mappedOrder.length
    ? mappedOrder
    : null) || [
    "summary",
    "skills",
    "experience",
    "projects",
    "education",
    "languages",
    "achievements",
    "custom_sections",
    "hobbies",
  ];

  // Guarantee sections with data are included even if older saved orders omit them
  const ensureIfHasData = (id, hasData) => {
    if (!hasData) return;
    if (!allSections.includes(id)) allSections.push(id);
  };

  ensureIfHasData(
    "achievements",
    Array.isArray(data.achievements) && data.achievements.length > 0
  );
  ensureIfHasData(
    "custom_sections",
    Array.isArray(data.custom_sections) && data.custom_sections.length > 0
  );

  const visibleSections = allSections.filter(
    (id) => mappedVisibility?.[id] !== false
  );

  let mainColNodes = [];
  let sidebarNodes = [];
  if (isTwoColumn) {
    visibleSections.forEach((id) => {
      const pos = sectionPositions[id];
      const isSidebarDefault = [
        "skills",
        "languages",
        "interests",
        "hobbies",
        "certifications",
        "achievements",
      ].includes(id);
      if (pos === "sidebar" || (!pos && isSidebarDefault)) {
        sidebarNodes.push(<SectionWrapper key={id} id={id} />);
      } else {
        mainColNodes.push(<SectionWrapper key={id} id={id} />);
      }
    });
  } else {
    mainColNodes = visibleSections.map((id) => (
      <SectionWrapper key={id} id={id} />
    ));
  }

  return (
    <div
      className={cx(
        "w-full bg-white min-h-[inherit] resume-font-root",
        fontFamily
      )}
      style={{
        ...fontStyle,
        fontSize: `${formatting.spacing?.font_size || 11}pt`,
        lineHeight: formatting.spacing?.line_height || 1.4,
        color: textColor,
      }}
    >
      <Header />
      <div
        className={cx(
          "p-5",
          isTwoColumn ? "grid grid-cols-12 gap-8" : "block space-y-6"
        )}
        style={{
          padding: formatting.spacing?.margin_horizontal
            ? `${formatting.spacing.margin_vertical}mm ${formatting.spacing.margin_horizontal}mm`
            : undefined,
        }}
      >
        {isTwoColumn ? (
          <>
            <div className="col-span-4 space-y-6">{sidebarNodes}</div>
            <div className="col-span-8 space-y-6">{mainColNodes}</div>
          </>
        ) : (
          <div className="max-w-3xl mx-auto">{mainColNodes}</div>
        )}
      </div>

      {/* Professional Footer */}
      <div
        className="w-full py-3 px-5 border-t flex items-center justify-center gap-2 print:py-1 print:border-gray-200"
        style={{
          borderTopColor: `${accent}20`,
          fontSize: "8pt",
          color: "#64748b",
        }}
      >
        <span>Created with</span>
        <img
          src="/logo.jpg"
          alt="NBY Resume Builder"
          className="h-6 w-auto rounded-sm object-contain"
          style={{
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
          }}
          onError={(e) => (e.target.style.display = "none")}
        />
        <span className="font-bold" style={{ color: accent }}>
          NBY Resume Builder
        </span>
        <span style={{ fontSize: "7pt", color: "#94a3b8" }}>
          © {new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
};

export default TechnicalTemplate;

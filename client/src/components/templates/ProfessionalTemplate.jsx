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
    if (style === "none" || !Icon) return null;

    const size = 15;
    const baseClass = "shrink-0 flex items-center justify-center shadow-sm";

    // High Contrast / Professional Header Mode
    // Professional header is usually white, so icons should be colored or customized
    // Unless we use a dark header variation.

    // For Professional template, header is typically white bg.
    // If we use 'forceWhiteIcon' it means we are in a dark block.

    if (forceWhiteIcon) {
      if (style === "outline")
        return (
          <Icon
            size={size}
            className="text-white drop-shadow-md"
            strokeWidth={2}
          />
        );
      if (style === "glow")
        return (
          <Icon
            size={size}
            className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            strokeWidth={2}
          />
        );
      if (style === "filled")
        return (
          <div
            className={`${baseClass} w-7 h-7 rounded bg-white border border-black/25`}
            style={{ color: accent }}
          >
            <Icon size={14} strokeWidth={2.5} />
          </div>
        );
      if (style === "soft")
        return (
          <div
            className={`${baseClass} w-7 h-7 rounded-full`}
            style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white" }}
          >
            <Icon size={14} strokeWidth={2} />
          </div>
        );
      if (style === "diamond")
        return (
          <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-white opacity-20 transform rotate-45 rounded-sm" />
            <div className="relative z-10 text-white">
              <Icon size={12} strokeWidth={2} />
            </div>
          </div>
        );
      if (style === "round" || style === "square")
        return (
          <div
            className={`${baseClass} w-6 h-6 ${
              style === "round" ? "rounded-full" : "rounded"
            } bg-white`}
            style={{ color: accent }}
          >
            <Icon size={12} strokeWidth={2.5} />
          </div>
        );
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
    if (style === "filled")
      return (
        <div
          className={`${baseClass} w-7 h-7 rounded bg-white border border-gray-200`}
          style={{ color: accent }}
        >
          <Icon size={14} strokeWidth={2} />
        </div>
      );
    if (style === "soft")
      return (
        <div
          className={`${baseClass} w-7 h-7 rounded-full`}
          style={{ backgroundColor: bgSoft, color: accent }}
        >
          <Icon size={14} strokeWidth={2} />
        </div>
      );
    if (style === "diamond")
      return (
        <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
          <div
            className="absolute inset-0 opacity-20 transform rotate-45 rounded-sm"
            style={{ backgroundColor: accent }}
          />
          <div className="relative z-10 text-white" style={{ color: accent }}>
            <Icon size={12} strokeWidth={2} />
          </div>
        </div>
      );
    if (style === "round" || style === "square")
      return (
        <div
          className={`${baseClass} w-6 h-6 ${
            style === "round" ? "rounded-full" : "rounded"
          }`}
          style={{ backgroundColor: bgSoft, color: accent }}
        >
          <Icon size={12} strokeWidth={2} />
        </div>
      );
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
          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: accent, color: "white" }}
        >
          {Icon ? (
            <Icon size={14} />
          ) : (
            <span className="font-bold" style={{ fontSize: "0.8em" }}>
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
        <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
          <div
            className="absolute inset-0 transform rotate-45 rounded-sm"
            style={{ backgroundColor: accent }}
          />
          <div className="relative z-10 text-white">
            {Icon ? (
              <Icon size={12} />
            ) : (
              <span className="font-bold" style={{ fontSize: "0.8em" }}>
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
          {Icon && <Icon size={16} style={{ color: accent }} />}
          <span className="font-bold tracking-wide">{title}</span>
        </div>
      </div>
    );
  }

  // Default / Underline
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
   CONTENT RENDERERS (Core Logic Reuse)
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
  let layout = config.layout || "grid";
  if (layout === "level") layout = "grid";
  if (layout === "bubble") layout = "compact";

  const levelMode = config.levelMode || "text"; // text, dots, bar, hide
  const compactMode = config.compactMode || "bullet"; // comma, pipe, bullet
  const enableBubble = config.enableBubble || false;
  const subinfo = config.subinfo || "dash"; // dash, colon, bracket
  const accent = formatting.colors?.accent || "#3B82F6";

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
    );
  };

  const renderLevelIndicator = (level, score) => {
    if (levelMode === "hide") return null;
    if (level == null || level === "") return null;

    if (levelMode === "bar") {
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

    let displayLevel = level;
    if (
      config.customLevels &&
      Array.isArray(config.customLevels) &&
      score >= 1 &&
      score <= 5
    ) {
      const customLabel = config.customLevels[score - 1];
      if (customLabel) displayLevel = customLabel;
    }
    return formatSubinfo(displayLevel);
  };

  // Bubble mode logic
  if (enableBubble) {
    const isGrid = layout === "grid";
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
      const groups = {};
      normalized.forEach((item) => {
        const cat = item.category || "General";
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(item);
      });
      const isFlat =
        Object.keys(groups).length === 1 &&
        Object.keys(groups)[0] === "General";

      if (isFlat)
        return (
          <div className="flex flex-wrap gap-2">
            {groups["General"].map((item, i) => renderBubbleItem(item, i))}
          </div>
        );
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
      return (
        <div className="flex flex-wrap gap-2">
          {normalized.map((item, i) => renderBubbleItem(item, i))}
        </div>
      );
    }
  }

  // Standard (Non-Bubble)
  if (layout === "grid" || layout === "level") {
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

    if (isFlat)
      return (
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {groups["General"].map(renderGridItem)}
        </div>
      );
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

  // Compact
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
      className="timeline-item relative border-l-2 pl-4 pb-4 last:pb-0"
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
              className="inline-flex align-middle opacity-80 hover:opacity-100"
              style={{ color: accent }}
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
            <span className="text-gray-400 font-normal">•</span>
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

const ProfessionalTemplate = ({ data, formatting = {}, accentColor }) => {
  const effectiveFormatting = {
    ...formatting,
    colors: {
      ...formatting.colors,
      accent: formatting.colors?.accent || accentColor || "#2563EB",
    },
  };

  const accent = effectiveFormatting.colors?.accent || "#2563EB";
  const textColor = effectiveFormatting.colors?.text || "#4B5563";
  const primaryColor = effectiveFormatting.colors?.primary || "#111827";
  const secondaryColor = effectiveFormatting.colors?.secondary || "#374151";

  const currentFont = effectiveFormatting.font || {};
  const fontFamily = getFontFamily(currentFont);
  const selectedFont = currentFont.family;
  const fontStyle = selectedFont
    ? { fontFamily: `'${selectedFont}', ${getFontFallback(currentFont)}` }
    : { fontFamily: getFontFallback(currentFont) || "Georgia, serif" };

  React.useEffect(() => {
    if (selectedFont) {
      const linkId = "dynamic-font-loader-professional";
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

  const spacing = effectiveFormatting.spacing || {
    font_size: 11,
    line_height: 1.3,
    margin_horizontal: 10,
    margin_vertical: 10,
    section_spacing: 6,
  };
  const isTwoColumn = effectiveFormatting.layout?.columns === 2;
  const mapId = (id) => (id === "custom" ? "custom_sections" : id);
  const mappedOrder = (effectiveFormatting.section_order || []).map(mapId);
  const mappedVisibility = Object.fromEntries(
    Object.entries(effectiveFormatting.section_visibility || {}).map(
      ([k, v]) => [mapId(k), v]
    )
  );
  const sectionPositions = Object.fromEntries(
    Object.entries(effectiveFormatting.section_positions || {}).map(
      ([k, v]) => [mapId(k), v]
    )
  );
  const getSectionTitle = (id, defaultTitle) =>
    effectiveFormatting.section_titles?.[id] || defaultTitle;
  const isVisible = (id) => mappedVisibility?.[id] !== false;

  const sectionIcons = {
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

  const renderSectionContent = (id) => {
    switch (id) {
      case "summary":
        if (!isVisible("summary")) return null;
        if (!data.summary && !data.professional_summary) return null;
        return (
          <p
            className="leading-relaxed whitespace-pre-line"
            style={{ color: textColor }}
          >
            {data.summary || data.professional_summary}
          </p>
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
        if (!data.volunteer_experience?.length) return null;
        return data.volunteer_experience.map((item, i) => {
          const mappedItem = {
            ...item,
            title: item.role || item.title,
          };
          return <TimelineItem key={i} item={mappedItem} accent={accent} />;
        });
      case "skills":
        return renderLevelSection(data.skills, effectiveFormatting, "skills");
      case "languages":
        return renderLevelSection(
          data.languages,
          effectiveFormatting,
          "languages"
        );
      case "certifications":
        if (!data.certifications?.length) return null;
        return (
          <div className="space-y-4">
            {data.certifications.map((c, i) => {
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
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </span>
                ) : undefined,
                // link: link -- removed to avoid double linking on title
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
                  <div key={i} className="flex gap-2">
                    <Trophy
                      size={14}
                      className="text-yellow-500 shrink-0 mt-0.5"
                    />
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
      case "hobbies":
      case "interests":
        return renderLevelSection(
          data.hobbies,
          {
            ...effectiveFormatting,
            [id]: { ...effectiveFormatting.interests, layout: "compact" },
          },
          id
        ); // Hobbies usually compact/bubble
      case "custom_sections":
        if (!data.custom_sections?.length) return null;
        return (
          <div className="space-y-6">
            {data.custom_sections.map((section, idx) => {
              let rawItems = section.items || [];
              if (typeof rawItems === "string") rawItems = rawItems.split("\n");
              const itemsList = Array.isArray(rawItems)
                ? rawItems.filter(Boolean)
                : [];
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
      default:
        return null;
    }
  };

  const SectionWrapper = ({ id }) => {
    const title = getSectionTitle(id, id.charAt(0).toUpperCase() + id.slice(1));
    const Icon = sectionIcons[id] || Star;
    const content = renderSectionContent(id);
    if (!content || (Array.isArray(content) && content.length === 0))
      return null;

    const spacingMb =
      formatting.spacing?.section_spacing !== undefined
        ? formatting.spacing.section_spacing * 2
        : 24;

    return (
      <section style={{ marginBottom: spacingMb }}>
        <SectionHeading
          title={title}
          icon={Icon}
          formatting={effectiveFormatting}
        />
        <div style={{ color: textColor }}>{content}</div>
      </section>
    );
  };

  const defaultOrder = [
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
  let allSections = mappedOrder.length ? mappedOrder : defaultOrder;
  const ensureIfHasData = (id, hasData) => {
    if (hasData && !allSections.includes(id)) allSections.push(id);
  };

  ensureIfHasData(
    "achievements",
    Array.isArray(data.achievements) && data.achievements.length > 0
  );
  ensureIfHasData(
    "custom_sections",
    Array.isArray(data.custom_sections) && data.custom_sections.length > 0
  );

  const visibleSections = allSections.filter((id) => isVisible(id));

  let mainColNodes = [];
  let sidebarNodes = [];

  const renderNodes = () => {
    if (isTwoColumn) {
      visibleSections.forEach((id) => {
        const pos = sectionPositions[id];
        // Sidebar default candidates
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
  };
  renderNodes();

  // Header Logic
  const personal = effectiveFormatting.personal || {};
  const personalAlign = personal.align || "left";
  const personalArrangement = personal.arrangement || "grid";
  const contactItems = [
    { icon: Mail, value: data.email || data.personal_info?.email },
    { icon: Phone, value: data.phone || data.personal_info?.phone },
    { icon: MapPin, value: data.location || data.personal_info?.location },
    { icon: Linkedin, value: data.linkedin || data.personal_info?.linkedin },
    { icon: Github, value: data.github || data.personal_info?.github },
    { icon: Globe, value: data.website || data.personal_info?.website },
    {
      icon: Calendar,
      value: formatFullDate(
        data.date_of_birth || data.personal_info?.date_of_birth
      ),
    },
    { icon: Flag, value: data.nationality || data.personal_info?.nationality },
  ].filter((item) => item.value);

  const contentPadding = spacing.margin_horizontal
    ? `${spacing.margin_vertical}mm ${spacing.margin_horizontal}mm ${spacing.margin_vertical}mm max(${spacing.margin_horizontal}mm, 20mm)`
    : "20px 20px 20px 24mm";

  return (
    <div
      className={cx("bg-white min-h-[inherit] resume-font-root", fontFamily)}
      style={{
        ...fontStyle,
        fontSize: `${spacing.font_size}pt`,
        lineHeight: spacing.line_height,
      }}
    >
      {/* Accent Bar - Full Width */}
      <div className="h-1.5 w-full" style={{ backgroundColor: accent }}></div>

      <div style={{ padding: contentPadding }}>
        {/* Header (Professional Style) */}
        <header
          className="mb-8 pb-6 border-b"
          style={{ borderColor: `${secondaryColor}40` }}
        >
          <div
            className={cx(
              "flex gap-6",
              personalAlign === "center"
                ? "flex-col items-center text-center"
                : personalAlign === "right"
                ? "flex-row-reverse text-right"
                : "flex-row"
            )}
          >
            {data.image && (
              <div className="shrink-0 mb-4 md:mb-0">
                <img
                  src={data.image}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 shadow-sm"
                  style={{ borderColor: accent }}
                />
              </div>
            )}

            <div className="flex-1">
              <h1
                className="text-3xl font-bold mb-2"
                style={{ color: primaryColor }}
              >
                {data.name || data.personal_info?.full_name || "Your Name"}
              </h1>
              {(data.role || data.personal_info?.profession) && (
                <p
                  className="text-lg font-medium"
                  style={{ color: secondaryColor }}
                >
                  {data.role || data.personal_info?.profession}
                </p>
              )}

              <div
                className={cx(
                  "mt-4 text-sm",
                  personalArrangement === "grid" && "grid grid-cols-2 gap-3",
                  personalArrangement === "inline" &&
                    "flex flex-wrap gap-x-6 gap-y-2",
                  personalArrangement === "stacked" && "flex flex-col gap-2",
                  personalAlign === "center" && "justify-center",
                  personalAlign === "right" && "justify-end"
                )}
                style={{ color: textColor }}
              >
                {contactItems.map((item, i) => (
                  <ContactItem
                    key={i}
                    icon={item.icon}
                    value={item.value}
                    accent={accent}
                    formatting={effectiveFormatting}
                  />
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="mt-8">
          {isTwoColumn ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1 space-y-6 md:order-1 order-2">
                {sidebarNodes}
              </div>
              <div className="col-span-2 space-y-6 md:order-2 order-1">
                {mainColNodes}
              </div>
            </div>
          ) : (
            <div className="space-y-6">{mainColNodes}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;

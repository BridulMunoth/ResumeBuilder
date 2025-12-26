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
   UTILITIES & HELPERS
   ========================================================================== */

const cx = (...cls) => cls.filter(Boolean).join(" ");

const getFontFamily = (font) => {
  if (font?.family) return "";
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
  if (val > 5) return Math.round(val / 20);
  return val;
};

/* ==========================================================================
   COMPONENTS
   ========================================================================== */

const ContactItem = ({
  icon: Icon,
  value,
  accent,
  formatting,
  forceWhiteIcon = false,
}) => {
  if (!value) return null;

  const style = formatting.design?.icon_style || "modern"; // modern, outline, solid, soft, round, square, diamond, glow, none
  const size = formatting.design?.icon_size || 16;
  const baseClass =
    "flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110";

  const renderIcon = () => {
    // Header Mode (Dark/Accent background)
    if (forceWhiteIcon) {
      if (style === "solid")
        return (
          <div
            className={`${baseClass} w-7 h-7 rounded bg-white/20 backdrop-blur-sm border border-white/30`}
            style={{ color: "white" }}
          >
            <Icon size={14} strokeWidth={2} />
          </div>
        );
      if (style === "soft" || style === "round")
        return (
          <div
            className={`${baseClass} w-7 h-7 rounded-full bg-white/10`}
            style={{ color: "white" }}
          >
            <Icon size={14} strokeWidth={2.5} />
          </div>
        );
      if (style === "outline")
        return (
          <div
            className={`${baseClass} w-7 h-7 rounded-full border border-white/40`}
            style={{ color: "white" }}
          >
            <Icon size={12} strokeWidth={2.5} />
          </div>
        );
      return <Icon size={size} className="text-white" />;
    }

    // Normal Mode (White background)
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

const SectionHeading = ({ title, icon: Icon, formatting }) => {
  const accent = formatting.colors?.accent || "#8B5CF6";
  const style = formatting.heading?.style || "underline";
  const caps = formatting.heading?.caps || "uppercase";
  const iconStyle = formatting.heading?.iconStyle || "filled";
  const fontSizeVal =
    formatting.heading?.size === "XL"
      ? "1.5em"
      : formatting.heading?.size === "L"
      ? "1.25em"
      : formatting.heading?.size === "S"
      ? "0.9em"
      : "1.1em";
  const align = formatting.heading?.align || "left";
  const alignClass =
    align === "center"
      ? "justify-center"
      : align === "right"
      ? "justify-end"
      : "justify-start";

  const renderIcon = () => {
    if (!Icon || iconStyle === "none") return null;
    if (iconStyle === "outline")
      return <Icon size={18} style={{ color: accent }} />;
    return (
      <div
        className="p-1 rounded bg-opacity-10 mr-2"
        style={{ backgroundColor: accent, color: "white" }}
      >
        <Icon size={12} className="text-white" />
      </div>
    );
  };

  if (style === "boxed")
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
  if (style === "leftLine")
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
  if (style === "modern")
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
  if (style === "highlight")
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
  if (style === "shading")
    return (
      <div
        className={cx(
          "flex items-center gap-2 mb-4 px-3 py-1.5 border-b-2",
          caps,
          alignClass
        )}
        style={{ borderColor: accent, backgroundColor: `${accent}10` }}
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
  if (style === "circleLine")
    return (
      <div className={cx("flex items-center gap-3 mb-4", alignClass)}>
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
        <span
          className={cx("font-bold tracking-wide", caps)}
          style={{ color: formatting.colors?.text, fontSize: fontSizeVal }}
        >
          {title}
        </span>
        <div
          className="h-[2px] flex-1 opacity-20"
          style={{ backgroundColor: formatting.colors?.text || "#000" }}
        />
      </div>
    );
  if (style === "diamondLine")
    return (
      <div className={cx("flex items-center gap-4 mb-4", alignClass)}>
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
        <span
          className={cx("font-bold tracking-wide", caps)}
          style={{ color: formatting.colors?.text, fontSize: fontSizeVal }}
        >
          {title}
        </span>
        <div
          className="h-[1px] flex-1 opacity-20"
          style={{ backgroundColor: formatting.colors?.text || "#000" }}
        />
      </div>
    );
  if (style === "pill")
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

  return (
    <div className={cx("mb-3 flex", alignClass)}>
      <div
        className={cx("inline-flex items-center gap-2 pb-2", caps)}
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

  const levelMode = config.levelMode || "text";
  const compactMode = config.compactMode || "bullet";
  const enableBubble = config.enableBubble || false;
  const subinfo = config.subinfo || "dash";
  const accent = formatting.colors?.accent || "#8B5CF6";

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
      className="relative p-4 pb-4 last:pb-0 border rounded-xl shadow-md overflow-hidden mb-6"
      style={{
        borderColor: `${accent}35`,
        background: `linear-gradient(180deg, ${accent}05, transparent)`,
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute left-0 top-0 h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${accent}, ${accent}80)` }}
      />

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
              className="px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: accent, fontSize: "0.75em" }}
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
   MAIN TEMPLATE
   ========================================================================== */

const CreativeImageTemplate = ({ data, formatting = {} }) => {
  const effectiveFormatting = {
    ...formatting,
    colors: {
      ...formatting.colors,
      accent: formatting.colors?.accent || "#3B82F6",
      primary: formatting.colors?.primary || "#111827",
      secondary: formatting.colors?.secondary || "#4B5563",
      text: formatting.colors?.text || "#374151",
    },
  };

  const accent = effectiveFormatting.colors.accent;
  const primaryColor = effectiveFormatting.colors.primary;
  const secondaryColor = effectiveFormatting.colors.secondary;
  const textColor = effectiveFormatting.colors.text;

  const currentFont = effectiveFormatting.font || {};
  const selectedFont = currentFont.family;
  const fontFamily = getFontFamily(currentFont);
  const fontStyle = selectedFont
    ? {
        fontFamily: `'${selectedFont}', ${getFontFallback(currentFont)}`,
      }
    : {
        fontFamily: getFontFallback(currentFont),
      };

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

  const spacing = effectiveFormatting.spacing || {
    font_size: 10.5,
    line_height: 1.5,
    margin_horizontal: 10,
    margin_vertical: 10,
    section_spacing: 6,
  };
  const colVal = effectiveFormatting.layout?.columns;
  const isTwoColumn =
    (typeof colVal === "number" && colVal >= 2) ||
    (typeof colVal === "string" && (colVal === "2" || colVal === "two"));
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

  // Initialize nodes arrays
  let mainColNodes = [];
  let sidebarNodes = [];

  // Profile Image Logic unique to this template
  const imageUrl = data.image || data.personal_info?.image;

  // Personal formatting - define early to avoid reference errors
  const personal = effectiveFormatting.personal || {};

  // Sidebar personal block support
  const personalPositionRaw =
    personal.position ||
    effectiveFormatting.section_positions?.personal ||
    "header";
  const personalPosition =
    typeof personalPositionRaw === "string"
      ? personalPositionRaw.toLowerCase()
      : "header"; // 'header' | 'sidebar'
  const movePersonalToSidebar = isTwoColumn && personalPosition === "sidebar";

  const PersonalBlock = () => (
    <div className="space-y-3">
      {imageUrl && (
        <div className="flex justify-start">
          <img
            src={imageUrl}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-2 shadow-sm"
            style={{ borderColor: accent }}
          />
        </div>
      )}
      <h1 className="text-2xl font-bold" style={{ color: primaryColor }}>
        {data.name || data.personal_info?.full_name || "Your Name"}
      </h1>
      {(data.role || data.personal_info?.profession) && (
        <p className="font-medium" style={{ color: secondaryColor }}>
          {data.role || data.personal_info?.profession}
        </p>
      )}
      <div className="text-sm" style={{ color: textColor }}>
        {[
          { icon: Mail, value: data.email || data.personal_info?.email },
          { icon: Phone, value: data.phone || data.personal_info?.phone },
          {
            icon: MapPin,
            value: data.location || data.personal_info?.location,
          },
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
        ]
          .filter((item) => item.value)
          .map((item, i) => (
            <ContactItem
              key={i}
              icon={item.icon}
              value={item.value}
              accent={accent}
              formatting={effectiveFormatting}
            />
          ))}
      </div>
      <div
        className="h-px w-full"
        style={{ backgroundColor: `${secondaryColor}30` }}
      />
    </div>
  );

  const renderSectionContent = (id) => {
    switch (id) {
      case "summary":
        if (!isVisible("summary")) return null;
        if (!data.summary && !data.professional_summary) return null;
        return (
          <p className="leading-relaxed whitespace-pre-line">
            {data.summary || data.professional_summary}
          </p>
        );
      case "experience":
        if (!isVisible("experience")) return null;
        if (!data.experience?.length) return null;
        return (
          <div className="space-y-4">
            {data.experience.map((item, i) => (
              <TimelineItem key={i} item={item} accent={accent} />
            ))}
          </div>
        );
      case "education":
        if (!isVisible("education")) return null;
        if (!data.education?.length) return null;
        return (
          <div className="space-y-4">
            {data.education.map((item, i) => (
              <TimelineItem key={i} item={item} accent={accent} />
            ))}
          </div>
        );
      case "projects":
        if (!isVisible("projects")) return null;
        if (!data.projects?.length) return null;
        return (
          <div className="space-y-4">
            {data.projects.map((item, i) => (
              <TimelineItem key={i} item={item} accent={accent} />
            ))}
          </div>
        );
      case "skills":
        if (!isVisible("skills")) return null;
        if (!data.skills?.length) return null;
        return renderLevelSection(data.skills, effectiveFormatting, "skills");
      case "languages":
        if (!isVisible("languages")) return null;
        if (!data.languages?.length) return null;
        return renderLevelSection(
          data.languages,
          effectiveFormatting,
          "languages"
        );
      case "certifications":
        if (!isVisible("certifications")) return null;
        if (!data.certifications?.length) return null;
        return (
          <div className="space-y-3">
            {data.certifications.map((cert, i) => (
              <div
                key={i}
                className="border-l-2 pl-4"
                style={{ borderColor: accent }}
              >
                <h4 className="font-bold">{cert.name}</h4>
                <p className="text-sm text-gray-600">{cert.issuer}</p>
                {cert.date && (
                  <p className="text-xs text-gray-500">{cert.date}</p>
                )}
              </div>
            ))}
          </div>
        );
      case "achievements":
        if (!isVisible("achievements")) return null;
        if (!data.achievements?.length) return null;
        return (
          <div className="space-y-2">
            {data.achievements.map((achievement, i) => (
              <div key={i} className="flex items-start gap-2">
                <Trophy size={16} className="text-yellow-500 shrink-0 mt-0.5" />
                <span className="text-sm">
                  {typeof achievement === "string"
                    ? achievement
                    : achievement.title}
                </span>
              </div>
            ))}
          </div>
        );
      case "volunteer":
        if (!isVisible("volunteer")) return null;
        if (!data.volunteer_experience?.length) return null;
        return (
          <div className="space-y-4">
            {data.volunteer_experience.map((item, i) => (
              <TimelineItem key={i} item={item} accent={accent} />
            ))}
          </div>
        );
      case "hobbies":
        if (!isVisible("hobbies")) return null;
        if (!data.hobbies?.length) return null;
        return (
          <div className="flex flex-wrap gap-2">
            {data.hobbies.map((hobby, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: `${accent}10`,
                  color: accent,
                  border: `1px solid ${accent}30`,
                }}
              >
                {typeof hobby === "string" ? hobby : hobby.name}
              </span>
            ))}
          </div>
        );
      case "custom_sections":
        if (!isVisible("custom_sections")) return null;
        if (!data.custom_sections?.length) return null;
        return (
          <div className="space-y-4">
            {data.custom_sections.map((section, i) => (
              <div key={i}>
                <h4 className="font-bold mb-2">{section.title}</h4>
                <div className="text-sm text-gray-700 whitespace-pre-line">
                  {section.items}
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const SectionWrapper = ({ id }) => {
    const title = getSectionTitle(id, id.charAt(0).toUpperCase() + id.slice(1));
    const Icon = sectionIcons[id];
    const content = renderSectionContent(id);

    if (!content) return null;

    return (
      <section style={{ marginBottom: `${spacing.section_spacing * 4}px` }}>
        <SectionHeading
          title={title}
          icon={Icon}
          formatting={effectiveFormatting}
        />
        <div style={{ color: textColor }}>{content}</div>
      </section>
    );
  };

  if (movePersonalToSidebar) {
    sidebarNodes.unshift(<PersonalBlock key="__personal_block__" />);
  }

  // Section rendering logic
  const allSections = (mappedOrder && mappedOrder.length
    ? mappedOrder
    : null) || [
    "summary",
    "experience",
    "education",
    "projects",
    "skills",
    "languages",
    "certifications",
    "achievements",
    "volunteer",
    "hobbies",
    "custom_sections",
  ];

  const visibleSections = allSections.filter((id) => isVisible(id));

  if (isTwoColumn) {
    visibleSections.forEach((id) => {
      const pos = sectionPositions[id];
      const isSidebarDefault = [
        "skills",
        "languages",
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
        color: textColor,
      }}
    >
      {!movePersonalToSidebar && (
        <>
          {/* Dynamic Header Layout */}

          {/* 1. Header Block (Red Context) */}
          <div className="relative mb-20">
            {" "}
            {/* mb-20 (5rem) clears the h-64 background with a nice gap */}
            <div
              className="absolute inset-x-0 top-0 h-64"
              style={{
                background: `linear-gradient(135deg, ${accent} 0%, ${accent}e6 100%)`,
                clipPath: "ellipse(170% 100% at 50% 0%)",
              }}
            />
            <div
              className={cx(
                "relative z-10 max-w-5xl mx-auto px-8 min-h-[13rem]", // Force min-height to match bg
                personal.imageAlign === "left" ||
                  personal.imageAlign === "right"
                  ? "flex items-center gap-8 py-12"
                  : "flex flex-col items-center pt-12 pb-4" // Removed center text alignment here to control inner blocks
              )}
            >
              {/* Image */}
              {personal.imageAlign !== "hidden" && (
                <div
                  className={cx(
                    "shrink-0 flex justify-center",
                    personal.imageAlign === "right" && "order-last",
                    personal.imageAlign === "center" && "mb-0" // No margin needed, flow handles it
                  )}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg bg-white"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center shadow-lg">
                      <span className="text-3xl font-bold opacity-30">
                        {data.initials}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Name & Role - Render HERE if NOT Center (Inside Red) */}
              {personal.imageAlign !== "center" && (
                <div
                  className={cx(
                    personal.imageAlign === "left" ||
                      personal.imageAlign === "right"
                      ? "text-left"
                      : "text-center"
                  )}
                >
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                    {data.name || data.personal_info?.full_name || "Your Name"}
                  </h1>

                  {(data.role || data.personal_info?.profession) && (
                    <p className="text-lg md:text-xl mt-1 text-white/90">
                      {data.role || data.personal_info?.profession}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 2. Body Start Block (White Context) - Starts after the 208px Header Block */}
          <div className="px-8 pb-12 text-center">
            {/* Name & Role - Render HERE if Center (Below Red) */}
            {personal.imageAlign === "center" && (
              <div className="mb-6 pt-4">
                {" "}
                {/* Added pt-4 to give breathing room from image */}
                <h1
                  className="text-4xl md:text-5xl font-bold leading-tight"
                  style={{ color: primaryColor }}
                >
                  {data.name || data.personal_info?.full_name || "Your Name"}
                </h1>
                {(data.role || data.personal_info?.profession) && (
                  <p
                    className="text-lg md:text-xl mt-1 opacity-90"
                    style={{ color: secondaryColor }}
                  >
                    {data.role || data.personal_info?.profession}
                  </p>
                )}
              </div>
            )}

            {/* Contact Bar - Always Here (Dark Text) */}
            <div
              className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm opacity-95 md:max-w-3xl mx-auto"
              style={{ color: textColor }}
            >
              {contactItems.map((item, i) => (
                <ContactItem
                  key={i}
                  icon={item.icon}
                  value={item.value}
                  accent={accent}
                  formatting={effectiveFormatting}
                  forceWhiteIcon={false}
                />
              ))}
            </div>
          </div>
        </>
      )}

      <div
        style={{
          padding: contentPadding,
        }}
      >
        {isTwoColumn ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6 md:order-1 order-2">
              {sidebarNodes}
            </div>
            <div className="md:col-span-2 space-y-6 md:order-2 order-1">
              {mainColNodes}
            </div>
          </div>
        ) : (
          <div className="space-y-6">{mainColNodes}</div>
        )}
      </div>
    </div>
  );
};

export default CreativeImageTemplate;

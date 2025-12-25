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
   HELPERS & COMPONENTS
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

const SectionHeading = ({ title, icon: Icon, formatting }) => {
  const accent = formatting.colors?.accent || "#3B82F6";
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
  }

  if (style === "diamondLine") {
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

  // Default / Underline
  return (
    <div className={cx("mb-3 flex", alignClass)}>
      <div
        className={cx("inline-flex items-center gap-2 pb-1 w-full", caps)}
        style={{
          borderBottom: `2px solid ${accent}`,
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
  const accent = formatting.colors?.accent || "#3B82F6";

  const formatSubinfo = (level) => {
    if (!level) return null;
    if (subinfo === "bracket")
      return <span className="opacity-75 ml-1.5 font-normal">({level})</span>;
    if (subinfo === "colon")
      return <span className="opacity-75 ml-1.5 font-normal">: {level}</span>;
    return <span className="opacity-75 ml-1.5 font-normal">– {level}</span>;
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
    return formatSubinfo(level);
  };

  // Bubble / Compact / Grid Logic
  const groups = {};
  normalized.forEach((item) => {
    const cat = item.category || "General";
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(item);
  });
  const isFlat =
    Object.keys(groups).length === 1 && Object.keys(groups)[0] === "General";

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
        {normalized.map((item, i) => (
          <span key={i}>
            <span className="font-medium">{item.name}</span>
            {renderLevelIndicator(item.level, normalizeLevel(item.level))}
            {i < normalized.length - 1 && (
              <span className="text-gray-400 mx-1">{sep}</span>
            )}
          </span>
        ))}
      </div>
    );
  }

  // Fallback Grid
  return (
    <div className="space-y-4">
      {Object.entries(groups).map(([cat, list]) => (
        <div key={cat}>
          {!isFlat && (
            <p
              className="font-bold uppercase mb-1.5 opacity-80"
              style={{ color: accent, fontSize: "0.85em" }}
            >
              {cat}
            </p>
          )}
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {list.map((item, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center gap-1.5 min-w-[120px]"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: accent }}
                />
                <span className="font-medium break-words">{item.name}</span>
                {renderLevelIndicator(item.level, normalizeLevel(item.level))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
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
    <div className="mb-4 last:mb-0">
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
              className="font-mono text-gray-500 font-bold"
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
          style={{ color: accent, fontSize: "0.95em" }}
        >
          {subtitle && <span>{subtitle}</span>}
          {location && showLocation && subtitle && (
            <span className="text-gray-400 font-normal">•</span>
          )}
          {showLocation && location && (
            <span className="text-gray-500 font-normal italic">{location}</span>
          )}
        </div>
        {item.employment_type && (
          <span className="text-gray-400 font-medium text-xs whitespace-nowrap">
            {item.employment_type}
          </span>
        )}
      </div>

      {showGrade && grade && (
        <div className="text-gray-600 font-medium text-sm mb-1">
          Grade: {grade}
        </div>
      )}
      {item.field && (
        <div className="text-gray-500 text-sm mb-1">Field: {item.field}</div>
      )}

      {item.description && (
        <div className="text-gray-700 whitespace-pre-line leading-relaxed mb-2 opacity-90">
          {item.description}
        </div>
      )}

      {achievements.length > 0 && (
        <ul className="list-disc ml-5 space-y-1 mb-2 text-gray-700">
          {achievements.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      )}

      {tech.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          <span className="font-bold text-xs uppercase opacity-70">Tech:</span>
          {tech.map((t, i) => (
            <span
              key={i}
              className="text-sm text-gray-600 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100"
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

const ExecutiveTemplate = ({ data, formatting = {}, accentColor }) => {
  const effectiveFormatting = {
    ...formatting,
    colors: {
      ...formatting.colors,
      accent: formatting.colors?.accent || accentColor || "#1f2937",
    },
  };
  const accent = effectiveFormatting.colors.accent;
  const textColor = effectiveFormatting.colors?.text || "#374151";

  // Font config
  const currentFont = effectiveFormatting.font || {};
  const fontFamily = getFontFamily(currentFont) || "font-serif";
  const selectedFont = currentFont.family || "Merriweather";

  React.useEffect(() => {
    if (selectedFont) {
      const linkId = "dynamic-font-loader-executive";
      let link = document.getElementById(linkId);
      if (!link) {
        link = document.createElement("link");
        link.id = linkId;
        link.rel = "stylesheet";
        document.head.appendChild(link);
      }
      const fontName = selectedFont.replace(/\s+/g, "+");
      link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@300;400;700;900&display=swap`;
    }
  }, [selectedFont]);

  const fontStyle = {
    fontFamily: `'${selectedFont}', ${getFontFallback(currentFont)}`,
  };

  const spacing = effectiveFormatting.spacing || {
    font_size: 11,
    line_height: 1.5,
    margin_horizontal: 14,
    margin_vertical: 14,
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
        if (
          !isVisible("summary") ||
          (!data.summary && !data.professional_summary)
        )
          return null;
        return (
          <p className="whitespace-pre-line leading-relaxed text-justify">
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
        return data.projects?.map((item, i) => {
          const mapped = {
            ...item,
            title: item.name || item.title,
            company: item.role || item.company,
            achievements: item.highlights || item.achievements || [],
          };
          return <TimelineItem key={i} item={mapped} accent={accent} />;
        });
      case "skills":
        return renderLevelSection(data.skills, effectiveFormatting, "skills");
      case "languages":
        return renderLevelSection(
          data.languages,
          effectiveFormatting,
          "languages"
        );
      case "hobbies":
        return renderLevelSection(
          data.hobbies,
          {
            ...effectiveFormatting,
            hobbies: { ...effectiveFormatting.hobbies, layout: "compact" },
          },
          "hobbies"
        );
      case "volunteer":
        return data.volunteer_experience?.map((item, i) => {
          const mapped = { ...item, title: item.role || item.title };
          return <TimelineItem key={i} item={mapped} accent={accent} />;
        });
      case "certifications":
        if (!data.certifications?.length) return null;
        return (
          <div className="space-y-4">
            {data.certifications.map((c, i) => {
              const link = c.credential_url || c.link;
              const credentialId = c.credential_id || c.id;
              const item = {
                title: typeof c === "string" ? c : c.name,
                company: (
                  <span className="flex items-center gap-1.5 align-middle">
                    {c.issuer}
                    {link && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="opacity-70 hover:opacity-100 transition inline-flex items-center align-middle"
                        style={{ color: accent }}
                        title={link}
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </span>
                ),
                start_date: c.date || c.issue_date,
                end_date: c.expiry_date,
                description: credentialId ? (
                  <span>
                    Credential ID: {credentialId}
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
                // link: link, // Removed to avoid double linking on title/date
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
                achievements: a.highlights || a.achievements || [], // Use rich achievements/highlights
                description: a.description, // Use description if available
                location: a.location, // Pass location
                link: a.link || a.url,
              };
              if (
                !item.company &&
                !item.link &&
                !item.achievements.length &&
                !item.start_date &&
                !item.description &&
                !item.location
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
      case "custom_sections":
        if (!data.custom_sections?.length) return null;
        return data.custom_sections.map((sec, idx) => (
          <div key={idx} className="mb-4">
            <h4 className="font-bold uppercase text-sm mb-2 opacity-80">
              {sec.title}
            </h4>
            <ul className="list-disc ml-5">
              {(typeof sec.items === "string"
                ? sec.items.split("\n")
                : sec.items || []
              ).map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </div>
        ));
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
    "experience",
    "education",
    "skills",
    "projects",
    "certifications",
    "languages",
    "volunteer",
    "achievements",
    "hobbies",
    "custom_sections",
  ];
  let allSections = mappedOrder.length ? mappedOrder : defaultOrder;
  const visibleSections = allSections.filter((id) => isVisible(id));

  let mainColNodes = [];
  let sidebarNodes = [];

  if (isTwoColumn) {
    visibleSections.forEach((id) => {
      const pos = sectionPositions[id];
      const isSidebarDefault = [
        "skills",
        "languages",
        "education",
        "certifications",
        "hobbies",
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

  const contentPadding = spacing.margin_horizontal
    ? `${spacing.margin_vertical}mm ${spacing.margin_horizontal}mm`
    : "20px";

  // Header Logic
  const headerConfig = effectiveFormatting.personal || {
    align: "left",
    arrangement: "inline",
  };
  const contactItems = [
    { icon: Mail, value: data.email || data.personal_info?.email },
    { icon: Phone, value: data.phone || data.personal_info?.phone },
    { icon: MapPin, value: data.location || data.personal_info?.location },
    { icon: Linkedin, value: data.linkedin || data.personal_info?.linkedin },
    { icon: Github, value: data.github || data.personal_info?.github },
    { icon: Globe, value: data.website || data.personal_info?.website },
  ].filter((item) => item.value);

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
      <div className="border-t-8" style={{ borderColor: accent }}>
        <div style={{ padding: contentPadding }}>
          {/* Header */}
          <div
            className={`mb-6 ${
              headerConfig.align === "center"
                ? "text-center"
                : headerConfig.align === "right"
                ? "text-right"
                : "text-left"
            }`}
          >
            <h1
              className="text-4xl font-bold tracking-tight mb-2"
              style={{ color: effectiveFormatting.colors.primary || "#111827" }}
            >
              {data.name || data.personal_info?.full_name || "Your Name"}
            </h1>
            {(data.role || data.personal_info?.profession) && (
              <p
                className="text-xl font-light"
                style={{
                  color: effectiveFormatting.colors.secondary || "#4B5563",
                }}
              >
                {data.role || data.personal_info?.profession}
              </p>
            )}
          </div>

          {/* Contact */}
          <div
            className={`
                    mb-8 flex flex-wrap gap-4 text-sm border-y border-gray-200 py-4
                    ${
                      headerConfig.arrangement === "stacked"
                        ? "flex-col"
                        : headerConfig.arrangement === "spread"
                        ? "justify-between"
                        : "justify-start gap-x-6"
                    }
                    ${
                      headerConfig.align === "center"
                        ? "justify-center"
                        : headerConfig.align === "right"
                        ? "justify-end"
                        : ""
                    } 
                `}
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

          {/* Body */}
          {isTwoColumn ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1 md:col-span-2">{mainColNodes}</div>
              <div className="col-span-1">{sidebarNodes}</div>
            </div>
          ) : (
            <div className="space-y-6">{mainColNodes}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTemplate;

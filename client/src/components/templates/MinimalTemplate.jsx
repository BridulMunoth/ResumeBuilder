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
  if (font?.family) return "";
  if (!font) return "font-sans";
  if (font.type === "serif") return "font-serif";
  if (font.type === "mono") return "font-mono";
  return "font-sans";
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
   HELPERS
   ========================================================================== */

const ContactItem = ({ icon: Icon, value, accent, formatting }) => {
  if (!value) return null;
  const style = formatting?.personal?.iconStyle || "outline";
  const size = 14;

  const renderIcon = () => {
    if (style === "none" || !Icon) return null;
    return (
      <Icon
        size={size}
        style={{
          color: style === "outline" ? accent : "inherit",
          opacity: 0.8,
        }}
      />
    );
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      {renderIcon()}
      <span className="opacity-90 hover:opacity-100 transition-opacity break-all">
        {value}
      </span>
    </div>
  );
};

/* ==========================================================================
   SECTION HEADING
   ========================================================================== */

const SectionHeading = ({ title, icon: Icon, formatting }) => {
  const accent = formatting.colors?.accent || "#000000";
  const style = formatting.heading?.style || "simple";
  const caps = formatting.heading?.caps || "uppercase";
  const align = formatting.heading?.align || "left";
  // Force icons off for Minimal
  const iconStyle = "none";

  const fontSizeVal =
    formatting.heading?.size === "XL"
      ? "1.5em"
      : formatting.heading?.size === "L"
      ? "1.25em"
      : formatting.heading?.size === "S"
      ? "0.9em"
      : "1em";

  const alignClass =
    align === "center"
      ? "justify-center"
      : align === "right"
      ? "justify-end"
      : "justify-start";

  // Helper to ensure we don't render icons even if passed
  const renderIcon = () => null;

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
        <span className="font-bold tracking-wide">{title}</span>
      </div>
    );
  }

  if (style === "underline") {
    return (
      <div
        className={cx("mb-4 flex border-b pb-2", alignClass, caps)}
        style={{ borderColor: `${accent}40` }}
      >
        <div className="flex items-center gap-2">
           <span
            className="font-bold tracking-widest"
            style={{ color: formatting.colors?.primary, fontSize: fontSizeVal }}
          >
            {title}
          </span>
        </div>
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
          style={{ color: formatting.colors?.primary }}
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
          style={{ color: formatting.colors?.primary }}
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
          <span className="font-bold tracking-wide">{title}</span>
        </div>
      </div>
    );
  }

  // "Simple" Default or fallback
  return (
    <div className={cx("mb-4 flex", alignClass)}>
      <div className="flex items-center gap-2">
         <span
          className={cx("font-bold tracking-widest", caps)}
          style={{
            color: formatting.colors?.primary || accent,
            fontSize: fontSizeVal,
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
};

/* ==========================================================================
   CONTENT RENDERERS
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
  const accent = formatting.colors?.accent || "#000000";
  const levelMode = config.levelMode || "text"; // text, dots, bar, hide
  const enableBubble = config.enableBubble || false;

  // Helper for level indicator
  const renderLevelIndicator = (level, score) => {
    if (levelMode === "hide") return null;
    if (level == null || level === "") return null;

    if (levelMode === "bar") {
      return (
        <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden shrink-0 inline-block ml-2 align-middle">
          <div
            className="h-full rounded-full"
            style={{ width: `${score * 20}%`, backgroundColor: accent }}
          />
        </div>
      );
    }
    if (levelMode === "dots") {
      return (
        <div className="flex gap-0.5 shrink-0 ml-2 align-middle inline-flex">
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
    // Text default
    return <span className="opacity-60 text-xs ml-1.5">({level})</span>;
  };

  const renderItem = (item, i) => {
    const score = normalizeLevel(item.level);

    // Bubble + Grid/Compact handling logic
    if (enableBubble) {
      return (
        <div
          key={i}
          className="px-3 py-1.5 rounded-lg border flex items-center gap-2 mb-2 mr-2 break-inside-avoid"
          style={{ borderColor: `${accent}40`, backgroundColor: `${accent}05` }}
        >
          <span className="font-medium">{item.name}</span>
          {renderLevelIndicator(item.level, score)}
        </div>
      );
    }

    return (
      <div key={i} className="flex items-center gap-2 min-w-[120px] mb-1">
        <span className="font-medium">{item.name}</span>
        {renderLevelIndicator(item.level, score)}
      </div>
    );
  };

  const groups = {};
  normalized.forEach((item) => {
    const cat = item.category || "General";
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(item);
  });

  return (
    <div className="space-y-4">
      {Object.entries(groups).map(([cat, list]) => (
        <div key={cat}>
          {cat !== "General" && (
            <p className="text-xs font-bold uppercase mb-2 opacity-50 tracking-wider">
              {cat}
            </p>
          )}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {list.map(renderItem)}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ==========================================================================
   TIMELINE ITEM (MINIMAL)
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
    item.school ||
    item.institution ||
    item.organization ||
    item.company ||
    item.issuer;
  const location = item.location || item.board_university;
  const link = item.link || item.url || item.credential_url;
  const grade = item.grade || item.gpa || item.percentage;

  // Use flex-col on small, flex-row on normal to prevent overlap.
  // Use break-words on title.
  return (
    <div className="mb-5 last:mb-0 break-inside-avoid">
      {/* Header Row: Title & Date */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1 gap-1">
        <h3
          className="font-bold text-gray-900 break-words leading-tight pr-2"
          style={{ fontSize: "1.05em" }}
        >
          {title}
        </h3>
        {displayDate && (
          <span className="text-sm font-medium opacity-60 shrink-0 whitespace-nowrap">
            {displayDate}
          </span>
        )}
      </div>

      <div
        className="flex flex-wrap items-center gap-x-3 text-sm mb-2 opacity-80 leading-relaxed"
        style={{ color: accent }}
      >
        {subtitle && (
          <span className="font-medium break-words">{subtitle}</span>
        )}
        {location && showLocation && subtitle && (
          <span className="hidden sm:inline">•</span>
        )}
        {location && showLocation && (
          <span className="break-words">{location}</span>
        )}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-gray-600 shrink-0"
          >
            <ExternalLink size={12} />
          </a>
        )}
      </div>

      {(grade || item.field) && (
        <div className="text-xs flex flex-wrap gap-3 mb-2 opacity-70">
          {item.field && <span>{item.field}</span>}
          {grade && <span>Grade: {grade}</span>}
        </div>
      )}

      {item.description && (
        <div className="text-sm leading-relaxed mb-2 opacity-85 whitespace-pre-line break-words">
          {item.description}
        </div>
      )}

      {achievements.length > 0 && (
        <ul className="text-sm list-disc pl-4 space-y-1 mb-2 opacity-85">
          {achievements.map((a, i) => (
            <li key={i} className="break-words">
              {a}
            </li>
          ))}
        </ul>
      )}

      {tech.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tech.map((t, i) => (
            <span
              key={i}
              className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600"
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

const MinimalTemplate = ({ data, formatting = {}, accentColor }) => {
  const effectiveFormatting = {
    ...formatting,
    colors: {
      ...formatting.colors,
      accent: formatting.colors?.accent || accentColor || "#000000",
      primary: formatting.colors?.primary || "#111827",
      text: formatting.colors?.text || "#374151",
    },
  };

  const accent = effectiveFormatting.colors.accent;
  const textColor = effectiveFormatting.colors.text;
  const primaryColor = effectiveFormatting.colors.primary;

  const currentFont = effectiveFormatting.font || {};
  const fontFamily = getFontFamily(currentFont);
  const selectedFont = currentFont.family;
  const fontStyle = selectedFont
    ? { fontFamily: `'${selectedFont}', ${getFontFallback(currentFont)}` }
    : { fontFamily: getFontFallback(currentFont) || "Inter, sans-serif" };

  React.useEffect(() => {
    if (selectedFont) {
      const linkId = "dynamic-font-loader-minimal";
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
  const isVisible = (id) => mappedVisibility?.[id] !== false;

  const renderSectionContent = (id) => {
    switch (id) {
      case "summary":
        if (!isVisible("summary")) return null;
        if (!data.summary && !data.professional_summary) return null;
        return (
          <p className="whitespace-pre-line break-words">
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
        return data.projects?.map((item, i) => (
          <TimelineItem
            key={i}
            item={{
              ...item,
              title: item.name,
              company: item.role,
              achievements: item.highlights || item.achievements,
            }}
            accent={accent}
          />
        ));
      case "volunteer":
        return data.volunteer_experience?.map((item, i) => (
          <TimelineItem
            key={i}
            item={{ ...item, title: item.role }}
            accent={accent}
          />
        ));
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
        return data.certifications.map((c, i) => (
          <TimelineItem
            key={i}
            item={{
              title: typeof c === "string" ? c : c.name,
              subtitle: c.issuer,
              start_date: c.issue_date,
              end_date: c.expiry_date,
              link: c.credential_url || c.link,
              description: c.credential_id
                ? `Credential ID: ${c.credential_id}`
                : "",
            }}
            accent={accent}
          />
        ));
      case "achievements":
        if (!data.achievements?.length) return null;
        return (
          <ul className="list-disc pl-4 space-y-1">
            {data.achievements.map((a, i) => {
              const txt =
                typeof a === "string"
                  ? a
                  : `${a.title || a.name}${
                      a.description ? " - " + a.description : ""
                    }`;
              return (
                <li key={i} className="break-words">
                  {txt}
                </li>
              );
            })}
          </ul>
        );
      case "custom_sections":
        if (!data.custom_sections?.length) return null;
        return data.custom_sections.map((section, idx) => {
          let rawItems = section.items || [];
          if (typeof rawItems === "string") rawItems = rawItems.split("\n");
          const itemsList = Array.isArray(rawItems)
            ? rawItems.filter(Boolean)
            : [];
          return (
            <div key={idx} className="mb-4 last:mb-0 break-inside-avoid">
              <h4 className="font-bold text-sm uppercase mb-2">
                {section.title}
              </h4>
              <div className="whitespace-pre-line text-sm opacity-90 break-words">
                {itemsList.map((it, i) => (
                  <div key={i} className="mb-1">
                    {"• " + it}
                  </div>
                ))}
              </div>
            </div>
          );
        });
      default:
        return null;
    }
  };

  const SectionWrapper = ({ id }) => {
    const defaultTitles = {
      summary: "Professional Summary",
      experience: "Experience",
      education: "Education",
      projects: "Projects",
      skills: "Skills",
      languages: "Languages",
      certifications: "Certifications",
      achievements: "Achievements",
      volunteer: "Volunteering",
    };
    const title =
      effectiveFormatting.section_titles?.[id] || defaultTitles[id] || id;
    const content = renderSectionContent(id);
    if (!content) return null;
    if (Array.isArray(content) && content.length === 0) return null;
    if (
      id === "custom_sections" &&
      (!data.custom_sections || data.custom_sections.length === 0)
    )
      return null;

    return (
      <section
        style={{ marginBottom: spacing.section_spacing * 2 }}
        className="break-inside-avoid"
      >
        <SectionHeading
          title={title}
          formatting={effectiveFormatting}
          icon={effectiveFormatting.section_icons?.[id]}
        />
        <div className="text-sm leading-relaxed" style={{ color: textColor }}>
          {content}
        </div>
      </section>
    );
  };

  // Section Ordering
  const defaultOrder = [
    "summary",
    "skills",
    "experience",
    "education",
    "projects",
    "languages",
    "certifications",
  ];
  const finalOrder = mappedOrder.length > 0 ? mappedOrder : defaultOrder;
  const uniqueOrder = [...new Set(finalOrder)];
  ["achievements", "volunteer", "custom_sections"].forEach((id) => {
    if (!uniqueOrder.includes(id)) uniqueOrder.push(id);
  });
  const visibleSections = uniqueOrder.filter(isVisible);

  // Layout Columns
  let mainCol = [],
    sideCol = [];
  visibleSections.forEach((id) => {
    const pos = effectiveFormatting.section_positions?.[id];
    if (
      isTwoColumn &&
      (pos === "sidebar" ||
        (!pos &&
          ["skills", "languages", "certifications", "education"].includes(id)))
    ) {
      sideCol.push(<SectionWrapper key={id} id={id} />);
    } else {
      mainCol.push(<SectionWrapper key={id} id={id} />);
    }
  });

  const contentPadding = `${spacing.margin_vertical}mm ${spacing.margin_horizontal}mm`;

  const contactItems = [
    { icon: Mail, value: data.email || data.personal_info?.email },
    { icon: Phone, value: data.phone || data.personal_info?.phone },
    { icon: MapPin, value: data.location || data.personal_info?.location },
    { icon: Linkedin, value: data.linkedin || data.personal_info?.linkedin },
    { icon: Github, value: data.github || data.personal_info?.github },
    { icon: Globe, value: data.website || data.personal_info?.website },
  ].filter((i) => i.value);

  /* Header Alignment & Arrangement */
  const personAlign = effectiveFormatting.personal?.align || "left";
  const personArrangement =
    effectiveFormatting.personal?.arrangement || "inline";

  const headerAlignClass =
    personAlign === "center"
      ? "items-center text-center"
      : personAlign === "right"
      ? "items-end text-right"
      : "items-start text-left";

  const contactContainerClass =
    personArrangement === "stacked"
      ? `flex flex-col gap-1 ${
          personAlign === "center"
            ? "items-center"
            : personAlign === "right"
            ? "items-end"
            : "items-start"
        }`
      : personArrangement === "spread"
      ? "flex w-full justify-between flex-wrap gap-y-2"
      : `flex flex-wrap gap-x-5 gap-y-2 ${
          personAlign === "center"
            ? "justify-center"
            : personAlign === "right"
            ? "justify-end"
            : "justify-start"
        }`;

  return (
    <div
      className={cx("bg-white min-h-[inherit] w-full", fontFamily)}
      style={{
        ...fontStyle,
        fontSize: `${spacing.font_size}pt`,
        lineHeight: spacing.line_height,
        padding: contentPadding,
        color: textColor,
      }}
    >
      <header
        className={cx(
          "mb-8 flex flex-col break-inside-avoid",
          headerAlignClass
        )}
      >
        <h1
          className="text-4xl font-bold tracking-tight mb-2 break-words"
          style={{ color: primaryColor }}
        >
          {data.name || data.personal_info?.full_name || "Your Name"}
        </h1>
        {(data.role || data.personal_info?.profession) && (
          <p
            className="text-xl opacity-75 font-medium mb-4 break-words"
            style={{ color: accent }}
          >
            {data.role || data.personal_info?.profession}
          </p>
        )}

        <div className={cx("text-sm opacity-80 mt-1", contactContainerClass)}>
          {contactItems.map((item, i) => (
            <ContactItem
              key={i}
              {...item}
              accent={accent}
              formatting={effectiveFormatting}
            />
          ))}
        </div>

        <div
          className={cx(
            "w-12 h-1 mt-6 bg-gray-900 opacity-10 rounded",
            personAlign === "center"
              ? "mx-auto"
              : personAlign === "right"
              ? "ml-auto"
              : ""
          )}
        ></div>
      </header>

      {isTwoColumn ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="col-span-1 md:col-span-8 space-y-2">{mainCol}</div>
          <div className="col-span-1 md:col-span-4 space-y-2 pt-2">
            {sideCol}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {mainCol}
          {sideCol}
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;

import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink, Github } from "lucide-react";

const ProfessionalTemplate = ({ data, accentColor, formatting }) => {
    // Default formatting
    const {
        layout = { columns: 2 },
        spacing = {
            font_size: 11,
            line_height: 1.3,
            margin_horizontal: 10,
            margin_vertical: 10,
            section_spacing: 6,
        },
        colors = {
            primary: "#111827",
            secondary: "#374151",
            accent: accentColor || "#2563EB",
            text: "#4B5563",
            background: "#FFFFFF",
        },
        section_order = [],
        section_visibility = {},
        section_titles = {},
    } = formatting || {};

    const getSectionTitle = (id, defaultTitle) => section_titles[id] || defaultTitle;

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        if (Number.isNaN(d.getTime())) return "";
        return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
    };

    const formatDateRange = (start, end, isCurrent) => {
        const startText = formatDate(start);
        const endText = isCurrent ? "Present" : formatDate(end);
        if (!startText && !endText) return "";
        if (!startText) return endText;
        if (!endText) return startText;
        return `${startText} - ${endText}`;
    };

    const getList = (item) => {
        if (!item) return [];
        if (Array.isArray(item)) return item;
        if (typeof item === 'string') return item.split(',').map(i => i.trim()).filter(Boolean);
        return [];
    };

    const isVisible = (id) => section_visibility[id] !== false;

    // Styles
    const containerStyle = {
        fontFamily: "Georgia, serif", // Keeping serif for "Professional"
        color: colors.text,
        fontSize: `${spacing.font_size}pt`,
        lineHeight: spacing.line_height,
        padding: `${spacing.margin_vertical}mm ${spacing.margin_horizontal}mm`,
        backgroundColor: colors.background,
    };

    const sectionStyle = {
        marginBottom: `${spacing.section_spacing}mm`,
    };

    const headingStyle = {
        fontSize: "1.125rem", // text-lg
        fontWeight: 700,
        marginBottom: "1rem",
        textTransform: "uppercase",
        letterSpacing: "0.025em",
        borderBottom: `1px solid ${colors.secondary}`,
        paddingBottom: "0.25rem",
        color: colors.accent,
        borderColor: colors.secondary
    };

    const subHeadingStyle = {
        color: colors.primary,
        fontWeight: 700,
        fontSize: `${spacing.font_size + 1}pt`,
    };

    const metaStyle = {
        color: colors.secondary,
        fontSize: "0.9em",
        fontWeight: 500
    };

    // --- Section Renderers ---

    const renderExperience = () => (
        data.experience && data.experience.length > 0 && isVisible("experience") && (
            <section style={sectionStyle}>
                <h2 style={headingStyle}>{getSectionTitle("experience", "Professional Experience")}</h2>
                <div className="space-y-4">
                    {data.experience.map((exp, index) => {
                        const techList = getList(exp.technologies);
                        return (
                            <div key={index}>
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 style={subHeadingStyle}>{exp.title || exp.position}</h3>
                                            {exp.link && (
                                                <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                                                    <ExternalLink size={14} />
                                                </a>
                                            )}
                                        </div>
                                        <p style={{ ...metaStyle, color: colors.secondary }} className="italic">
                                            {exp.company}
                                            {exp.location && <span> | {exp.location}</span>}
                                        </p>
                                    </div>
                                    <span style={{ ...metaStyle, color: colors.text }}>
                                        {formatDateRange(exp.start_date, exp.end_date, exp.is_current)}
                                    </span>
                                </div>
                                {exp.description && (
                                    <div className="text-sm leading-relaxed mt-2 whitespace-pre-line" style={{ color: colors.text }}>
                                        {exp.description}
                                    </div>
                                )}
                                {techList.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {techList.map((tech, i) => (
                                            <span key={i} className="text-xs px-2 py-0.5 rounded border bg-gray-50" style={{ borderColor: colors.secondary + "40", color: colors.secondary }}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>
        )
    );

    const renderProjects = () => (
        data.projects && data.projects.length > 0 && isVisible("projects") && (
            <section style={sectionStyle}>
                <h2 style={headingStyle}>{getSectionTitle("projects", "Key Projects")}</h2>
                <div className="space-y-4">
                    {data.projects.map((proj, index) => {
                        const techList = getList(proj.technologies);
                        return (
                            <div key={index}>
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <h3 style={subHeadingStyle}>{proj.name}</h3>
                                            {proj.link && (
                                                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                                                    <ExternalLink size={14} />
                                                </a>
                                            )}
                                        </div>
                                        {proj.type && (
                                            <p className="text-xs font-semibold uppercase tracking-wide opacity-80" style={{ color: colors.accent }}>{proj.type}</p>
                                        )}
                                    </div>
                                    <span style={{ ...metaStyle, color: colors.text }}>
                                        {formatDateRange(proj.start_date, proj.end_date, proj.is_current)}
                                    </span>
                                </div>
                                
                                {proj.description && (
                                    <p className="text-sm leading-relaxed mt-1" style={{ color: colors.text }}>
                                        {proj.description}
                                    </p>
                                )}
                                {techList.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1.5">
                                        {techList.map((tech, i) => (
                                            <span key={i} className="text-xs px-2 py-0.5 rounded border bg-gray-50" style={{ borderColor: colors.secondary + "40", color: colors.secondary }}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>
        )
    );

    const renderEducation = () => (
        data.education && data.education.length > 0 && isVisible("education") && (
            <section style={sectionStyle}>
                <h2 style={headingStyle}>{getSectionTitle("education", "Education")}</h2>
                <div className="space-y-4">
                    {data.education.map((edu, index) => (
                        <div key={index}>
                            <h3 style={{ ...subHeadingStyle, fontSize: "1em" }}>
                                {edu.degree}
                            </h3>
                            {edu.field && (
                                <p className="text-sm italic" style={{ color: colors.text }}>{edu.field}</p>
                            )}
                            <div className="flex justify-between items-start mt-1">
                                <p className="text-sm font-semibold flex items-center gap-2" style={{ color: colors.accent }}>
                                    <span>{edu.institution || edu.school}</span>
                                    {edu.link && (
                                        <a href={edu.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                                            <ExternalLink size={12} />
                                        </a>
                                    )}
                                </p>
                                <span className="text-xs" style={{ color: colors.text }}>
                                    {formatDateRange(edu.start_date, edu.end_date, edu.is_current)}
                                </span>
                            </div>
                            {edu.location && <div className="text-xs text-gray-500">{edu.location}</div>}
                            {(edu.grade || edu.gpa) && (
                                <span className="text-xs font-medium block mt-0.5">Grade: {edu.grade || edu.gpa}</span>
                            )}
                            {edu.description && <p className="text-xs mt-1 opacity-90">{edu.description}</p>}
                        </div>
                    ))}
                </div>
            </section>
        )
    );

    const renderSkills = () => {
         if (!data.skills || data.skills.length === 0 || !isVisible("skills")) return null;

        const skillsArray = Array.isArray(data.skills)
            ? data.skills.map((s) => (typeof s === "string" ? { name: s, category: "Uncategorized" } : s)).filter((s) => s && s.name)
            : [];

        const grouped = skillsArray.reduce((acc, skill) => {
            const cat = (skill.category || "Uncategorized").trim() || "Uncategorized";
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(skill);
            return acc;
        }, {});

        return (
            <section style={sectionStyle}>
                <h2 style={headingStyle}>{getSectionTitle("skills", "Core Skills")}</h2>
                <div className="space-y-3">
                    {Object.entries(grouped).map(([category, items]) => (
                        <div key={category}>
                             {category !== "Uncategorized" && (
                                <h4 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: colors.secondary }}>{category}</h4>
                            )}
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm" style={{ color: colors.text }}>
                                {items.map((skill, index) => (
                                    <div key={index} className="flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" style={{ backgroundColor: colors.accent }}></span>
                                        <span>{skill.name}</span>
                                        {skill.level && <span className="text-xs opacity-70">({skill.level})</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    };

    const renderCertifications = () => (
        data.certifications && data.certifications.length > 0 && isVisible("certifications") && (
             <section style={sectionStyle}>
                <h2 style={headingStyle}>{getSectionTitle("certifications", "Certifications")}</h2>
                 <div className="space-y-2">
                    {data.certifications.map((cert, index) => (
                         <div key={index} className="flex justify-between items-baseline border-b border-gray-100 pb-1 last:border-0 last:pb-0">
                             <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-sm" style={{ color: colors.primary }}>{cert.name}</h3>
                                    {cert.link && <a href={cert.link} target="_blank" rel="noreferrer"><ExternalLink size={10} className="text-gray-400"/></a>}
                                </div>
                                {cert.issuer && <span className="text-xs" style={{ color: colors.secondary }}>{cert.issuer}</span>}
                             </div>
                             <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{formatDate(cert.date)}</span>
                         </div>
                    ))}
                 </div>
            </section>
        )
    );

    const renderLanguages = () => (
        data.languages && data.languages.length > 0 && isVisible("languages") && (
             <section style={sectionStyle}>
                <h2 style={headingStyle}>{getSectionTitle("languages", "Languages")}</h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {data.languages.map((lang, index) => (
                         <div key={index} className="flex justify-between text-sm">
                            <span className="font-medium" style={{ color: colors.primary }}>
                                {typeof lang === 'string' ? lang : (lang.name || lang.language)}
                            </span>
                            {(lang.proficiency || lang.level) && (
                                <span className="text-gray-500 text-xs italic">{lang.proficiency || lang.level}</span>
                            )}
                         </div>
                    ))}
                </div>
            </section>
        )
    );

    const renderAchievements = () => (
        data.achievements && data.achievements.length > 0 && isVisible("achievements") && (
             <section style={sectionStyle}>
                <h2 style={headingStyle}>{getSectionTitle("achievements", "Achievements")}</h2>
                <ul className="list-disc pl-4 space-y-1 text-sm" style={{ color: colors.text }}>
                    {data.achievements.map((item, index) => (
                        <li key={index}>
                             {typeof item === 'string' ? item : (
                                <span>
                                    <span className="font-semibold" style={{ color: colors.primary }}>{item.title}</span>
                                    {item.date && <span className="text-xs opacity-70 ml-2">({formatDate(item.date)})</span>}
                                    {item.description && <span className="block mt-0.5 text-xs opacity-90">{item.description}</span>}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
        )
    );

    const renderVolunteer = () => (
         data.volunteer_experience && data.volunteer_experience.length > 0 && isVisible("volunteer") && (
            <section style={sectionStyle}>
                <h2 style={headingStyle}>{getSectionTitle("volunteer", "Volunteer Experience")}</h2>
                 <div className="space-y-4">
                    {data.volunteer_experience.map((vol, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-sm" style={{ color: colors.primary }}>{vol.role}</h3>
                                <span className="text-xs text-gray-500">
                                    {formatDateRange(vol.start_date, vol.end_date, vol.is_current)}
                                </span>
                            </div>
                            <p className="text-xs font-semibold italic mb-1" style={{ color: colors.secondary }}>{vol.organization}</p>
                            {vol.description && (
                                <p className="text-sm leading-relaxed" style={{ color: colors.text }}>{vol.description}</p>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        )
    );

    const renderCustomSection = (section) => {
        if (!section || !section.items || section.items.length === 0 || !isVisible(section.id)) return null;
        return (
            <section key={section.id} style={sectionStyle}>
                <h2 style={headingStyle}>{section.title}</h2>
                <div className="space-y-3">
                    {section.items.map((item, i) => (
                        <div key={i}>
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-sm" style={{ color: colors.primary }}>{item.title}</h3>
                                {item.date && <div className="text-xs text-gray-500">{item.date}</div>}
                            </div>
                            {item.subtitle && <p className="text-xs italic" style={{ color: colors.accent }}>{item.subtitle}</p>}
                            {item.description && <p className="text-sm leading-relaxed mt-1" style={{ color: colors.text }}>{item.description}</p>}
                        </div>
                    ))}
                </div>
            </section>
        );
    };

     const renderSection = (id) => {
        if (id.startsWith("custom_")) {
            const sectionId = id.replace("custom_", "");
            const section = data.custom_sections?.find(s => s.id === sectionId);
            return renderCustomSection(section);
        }
        
        switch (id) {
            case "experience": return renderExperience();
            case "projects": return renderProjects();
            case "education": return renderEducation();
            case "skills": return renderSkills();
            case "certifications": return renderCertifications();
            case "languages": return renderLanguages();
            case "achievements": return renderAchievements();
            case "volunteer": return renderVolunteer();
            default: return null;
        }
    };
    
    const defaultOrder = ["experience", "projects", "education", "skills", "summary", "certifications", "languages", "achievements", "volunteer"];
    let finalOrder = section_order.length > 0 ? section_order : defaultOrder;
    // ensure custom sections
    const customSectionIds = data.custom_sections?.map(s => `custom_${s.id}`) || [];
    const allIds = [...defaultOrder, ...customSectionIds];
    const missingSections = allIds.filter(id => !finalOrder.includes(id));
    finalOrder = [...finalOrder, ...missingSections];

    // Logic for columns based on `layout.columns` preference
    // If user selected 1 column, we stack everything.
    // If 2 columns (default for Professional), we split.
    const mainIds = ["experience", "projects", "summary", ...customSectionIds];
    const sideIds = ["education", "skills", "languages", "certifications", "achievements", "volunteer"];
    
    const currentMainIds = finalOrder.filter(id => mainIds.includes(id) || id.startsWith("custom_"));
    const currentSideIds = finalOrder.filter(id => sideIds.includes(id) && !id.startsWith("custom_"));

    return (
        <div className="bg-white min-h-[1000px] relative" style={{ fontFamily: containerStyle.fontFamily }}>
            {/* Colored header bar */}
            <div className="h-2 w-full absolute top-0 left-0" style={{ backgroundColor: colors.accent }}></div>

            <div style={containerStyle}>
                {/* Header */}
                <header className="mb-8 pb-6 border-b" style={{ borderColor: colors.secondary }}>
                    <h1 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    {data.personal_info?.profession && (
                        <p className="text-lg font-medium" style={{ color: colors.secondary }}>
                            {data.personal_info.profession}
                        </p>
                    )}
                    
                   <div className="grid grid-cols-2 gap-3 mt-4 text-sm" style={{ color: colors.text }}>
                        {data.personal_info?.email && (
                            <div className="flex items-center gap-2">
                                <Mail className="size-4" style={{ color: colors.accent }} />
                                <span>{data.personal_info.email}</span>
                            </div>
                        )}
                        {data.personal_info?.phone && (
                            <div className="flex items-center gap-2">
                                <Phone className="size-4" style={{ color: colors.accent }} />
                                <span>{data.personal_info.phone}</span>
                            </div>
                        )}
                        {data.personal_info?.location && (
                            <div className="flex items-center gap-2">
                                <MapPin className="size-4" style={{ color: colors.accent }} />
                                <span>{data.personal_info.location}</span>
                            </div>
                        )}
                        {data.personal_info?.linkedin && (
                            <a href={data.personal_info.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                                <Linkedin className="size-4" style={{ color: colors.accent }} />
                                <span className="break-all text-xs">{data.personal_info.linkedin}</span>
                            </a>
                        )}
                         {data.personal_info?.website && (
                            <a href={data.personal_info.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                                <Globe className="size-4" style={{ color: colors.accent }} />
                                <span className="break-all text-xs">{data.personal_info.website}</span>
                            </a>
                        )}
                        {data.personal_info?.github && (
                            <a href={data.personal_info.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                                <Github className="size-4" style={{ color: colors.accent }} />
                                <span className="break-all text-xs">{data.personal_info.github}</span>
                            </a>
                        )}
                    </div>
                </header>

                 {data.professional_summary && isVisible("summary") && (
                    <div className="mb-6">
                        <h2 style={headingStyle}>{getSectionTitle("summary", "Professional Summary")}</h2>
                        <p className="leading-relaxed text-sm">{data.professional_summary}</p>
                    </div>
                )}

                {/* Content */}
                {layout.columns === 2 ? (
                    <div className="grid grid-cols-3 gap-8">
                         <div className="col-span-2 space-y-6">
                            {currentMainIds.filter(id => id !== "summary").map(id => renderSection(id))}
                         </div>
                         <div className="col-span-1 space-y-6">
                            {currentSideIds.map(id => renderSection(id))}
                         </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                         {finalOrder.filter(id => id !== "summary").map(id => renderSection(id))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfessionalTemplate;

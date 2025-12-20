import React from "react";
import { ExternalLink, Mail, Phone, MapPin, Linkedin, Globe, Github, Calendar, Flag } from "lucide-react";

const MinimalTemplate = ({ data, accentColor, formatting }) => {
    const {
        layout = { columns: 1 },
        spacing = {
            font_size: 10, // Minimal often smaller, cleaner
            line_height: 1.6,
            margin_horizontal: 10,
            margin_vertical: 10,
            section_spacing: 8,
        },
        colors = {
            primary: "#111827",
            secondary: "#4B5563",
            accent: accentColor || "#000000", // Minimal defaults to black often
            text: "#374151",
            background: "#FFFFFF",
        },
        section_order = [],
        section_visibility = {},
        section_titles = {},
    } = formatting || {};

    const getSectionTitle = (id, defaultTitle) => section_titles[id] || defaultTitle;
    const isVisible = (id) => section_visibility[id] !== false;

    // Safe date formatter
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        if (Number.isNaN(d.getTime())) return "";
        return d.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
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

    // Styling
    const containerStyle = {
        fontFamily: "'Inter', 'Segoe UI', sans-serif", // Clean sans
        color: colors.text,
        backgroundColor: colors.background,
        fontSize: `${spacing.font_size}pt`,
        lineHeight: spacing.line_height,
        padding: `${spacing.margin_vertical}mm ${spacing.margin_horizontal}mm`,
    };

    const sectionHeadingStyle = {
        color: colors.accent,
        fontWeight: "500", // Medium weight for minimal
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        fontSize: "0.85rem",
        marginBottom: "1.25rem",
    };

    const sectionContainerStyle = {
        marginBottom: `${spacing.section_spacing}mm`,
    };

    // Group skills logic
    const skillsArray = Array.isArray(data?.skills)
        ? data.skills.map((s) => (typeof s === "string" ? { name: s } : s)).filter((s) => s && s.name)
        : [];
    const groupedSkills = skillsArray.reduce((acc, s) => {
        const cat = (s.category || "Other").trim() || "Other";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(s);
        return acc;
    }, {});
    const groupedEntries = Object.entries(groupedSkills).sort(([a], [b]) => a.localeCompare(b));

    // Renderers
    const renderSkills = () => {
         if (!data.skills || data.skills.length === 0 || !isVisible("skills")) return null;
         return (
            <section style={sectionContainerStyle}>
                <h2 style={sectionHeadingStyle}>{getSectionTitle("skills", "Skills")}</h2>
                 <div className="space-y-4">
                    {groupedEntries.map(([category, items]) => (
                        <div key={category}>
                             {category !== "Other" && (
                                <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: colors.secondary }}>
                                    {category}
                                </h3>
                            )}
                            <div className="flex flex-wrap gap-x-4 gap-y-2">
                                {items.map((s, idx) => (
                                    <span key={idx} className="text-sm">
                                         {s.name}{s.level ? <span className="text-gray-400 text-xs ml-1">({s.level})</span> : ""}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
         );
    };

    const renderEducation = () => (
        data.education && data.education.length > 0 && isVisible("education") && (
            <section style={sectionContainerStyle}>
                <h2 style={sectionHeadingStyle}>{getSectionTitle("education", "Education")}</h2>
                <div className="space-y-5">
                    {data.education.map((edu, index) => (
                         <div key={index}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-semibold text-base" style={{ color: colors.primary }}>{edu.institution}</h3>
                                <span className="text-sm text-gray-500">{formatDateRange(edu.start_date, edu.end_date, edu.is_current)}</span>
                            </div>
                            <div className="flex flex-col text-sm">
                                 <span className="italic" style={{ color: colors.secondary }}>
                                    {[edu.degree, edu.field].filter(Boolean).join(", ")}
                                 </span>
                                 {(edu.grade || edu.gpa) && <span className="text-xs text-gray-400 mt-0.5">Grade: {edu.grade || edu.gpa}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )
    );

    const renderExperience = () => (
        data.experience && data.experience.length > 0 && isVisible("experience") && (
            <section style={sectionContainerStyle}>
                <h2 style={sectionHeadingStyle}>{getSectionTitle("experience", "Experience")}</h2>
                <div className="space-y-8">
                    {data.experience.map((exp, index) => {
                        const techList = getList(exp.technologies);
                        return (
                             <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold text-lg" style={{ color: colors.primary }}>{exp.title}</h3>
                                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                                        {formatDateRange(exp.start_date, exp.end_date, exp.is_current)}
                                    </span>
                                </div>
                                <div className="mb-2">
                                     <span className="text-base font-medium" style={{ color: colors.accent }}>{exp.company}</span>
                                     {exp.location && <span className="text-sm text-gray-400 ml-2">• {exp.location}</span>}
                                </div>
                                {exp.description && (
                                    <div className="text-sm leading-relaxed whitespace-pre-line mb-3 text-gray-600">
                                        {exp.description}
                                    </div>
                                )}
                                {techList.length > 0 && (
                                    <div className="text-xs mt-2 flex flex-wrap gap-2">
                                        {techList.map((tech, i) => (
                                            <span key={i} className="px-2 py-0.5 bg-gray-50 rounded text-gray-500">
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
             <section style={sectionContainerStyle}>
                <h2 style={sectionHeadingStyle}>{getSectionTitle("projects", "Projects")}</h2>
                <div className="space-y-6">
                    {data.projects.map((proj, index) => {
                         const techList = getList(proj.technologies);
                         return (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-base" style={{ color: colors.primary }}>{proj.name}</h3>
                                        {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600"><ExternalLink size={12} /></a>}
                                    </div>
                                    <span className="text-sm text-gray-500">{formatDateRange(proj.start_date, proj.end_date, proj.is_current)}</span>
                                </div>
                                {(proj.role || proj.type) && <p className="text-xs uppercase tracking-wider mb-2" style={{ color: colors.secondary }}>{[proj.role, proj.type].filter(Boolean).join(" • ")}</p>}
                                {proj.description && <p className="text-sm leading-relaxed mb-2 text-gray-600">{proj.description}</p>}
                                {techList.length > 0 && (
                                     <div className="text-xs mt-2 flex flex-wrap gap-2">
                                        {techList.map((tech, i) => (
                                            <span key={i} className="px-2 py-0.5 bg-gray-50 rounded text-gray-500">
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

     const renderCertifications = () => (
        data.certifications && data.certifications.length > 0 && isVisible("certifications") && (
             <section style={sectionContainerStyle}>
                <h2 style={sectionHeadingStyle}>{getSectionTitle("certifications", "Certifications")}</h2>
                 <ul className="space-y-3">
                    {data.certifications.map((c, i) => (
                        <li key={i} className="flex justify-between items-baseline text-sm">
                             <span className="font-medium" style={{ color: colors.primary }}>{c.name || c}</span>
                             <div className="text-right">
                                {c.issuer && <span className="text-gray-500 mr-2">{c.issuer}</span>}
                                {c.date && <span className="text-xs text-gray-400">{formatDate(c.date)}</span>}
                             </div>
                        </li>
                    ))}
                 </ul>
            </section>
        )
    );

     const renderLanguages = () => (
        data.languages && data.languages.length > 0 && isVisible("languages") && (
             <section style={sectionContainerStyle}>
                 <h2 style={sectionHeadingStyle}>{getSectionTitle("languages", "Languages")}</h2>
                <div className="flex flex-wrap gap-6 text-sm">
                    {data.languages.map((lang, index) => (
                         <div key={index} className="flex flex-col">
                            <span className="font-medium" style={{ color: colors.primary }}>
                                {typeof lang === 'string' ? lang : (lang.name || lang.language)}
                            </span>
                            {(lang.proficiency || lang.level) && (
                                <span className="text-xs text-gray-500 mt-0.5">{lang.proficiency || lang.level}</span>
                            )}
                         </div>
                    ))}
                </div>
            </section>
        )
    );

    const renderAchievements = () => (
        data.achievements && data.achievements.length > 0 && isVisible("achievements") && (
             <section style={sectionContainerStyle}>
                 <h2 style={sectionHeadingStyle}>{getSectionTitle("achievements", "Achievements")}</h2>
                <ul className="space-y-3 text-sm">
                    {data.achievements.map((item, index) => (
                        <li key={index}>
                             {typeof item === 'string' ? item : (
                                <div>
                                    <div className="flex justify-between">
                                        <span className="font-medium" style={{ color: colors.primary }}>{item.title}</span>
                                        {item.date && <span className="text-xs text-gray-400">{formatDate(item.date)}</span>}
                                    </div>
                                    {item.description && <p className="text-gray-600 mt-0.5">{item.description}</p>}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
        )
    );

    const renderVolunteer = () => (
         data.volunteer_experience && data.volunteer_experience.length > 0 && isVisible("volunteer") && (
            <section style={sectionContainerStyle}>
                 <h2 style={sectionHeadingStyle}>{getSectionTitle("volunteer", "Volunteer")}</h2>
                 <div className="space-y-4">
                    {data.volunteer_experience.map((vol, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-semibold text-sm" style={{ color: colors.primary }}>{vol.role}</h3>
                                <p className="text-xs text-gray-500">{formatDateRange(vol.start_date, vol.end_date, vol.is_current)}</p>
                            </div>
                            <p className="text-xs mb-1 italic" style={{ color: colors.secondary }}>{vol.organization}</p>
                             {vol.description && <p className="text-sm leading-relaxed text-gray-600">{vol.description}</p>}
                        </div>
                    ))}
                </div>
            </section>
        )
    );

    const renderHobbies = () => (
        data.hobbies && data.hobbies.length > 0 && isVisible("hobbies") && (
            <section style={sectionContainerStyle}>
                 <h2 style={sectionHeadingStyle}>{getSectionTitle("hobbies", "Interests")}</h2>
                <p className="text-sm text-gray-600">{data.hobbies.join(" • ")}</p>
            </section>
        )
    );

     const renderCustomSection = (section) => {
        if (!section || !section.items || section.items.length === 0 || !isVisible(section.id)) return null;
        return (
            <section key={section.id} style={sectionContainerStyle}>
                 <h2 style={sectionHeadingStyle}>{section.title}</h2>
                <div className="space-y-4">
                    {section.items.map((item, i) => (
                        <div key={i}>
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-semibold text-sm" style={{ color: colors.primary }}>{item.title}</h3>
                                {item.date && <div className="text-xs text-gray-500">{item.date}</div>}
                            </div>
                            {item.subtitle && <p className="text-xs italic mb-1" style={{ color: colors.secondary }}>{item.subtitle}</p>}
                            {item.description && <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>}
                        </div>
                    ))}
                </div>
            </section>
        );
    };

    const renderSummary = () => (
        isVisible("summary") && data.professional_summary && (
            <section className="mb-10" style={{ marginBottom: `${spacing.section_spacing}mm` }}>
                <p className="text-lg font-light leading-relaxed" style={{ color: colors.secondary }}>
                    {data.professional_summary}
                </p>
            </section>
        )
    );


    // Component Routing
     const renderSection = (id) => {
        if (id.startsWith("custom_")) {
            const sectionId = id.replace("custom_", "");
            const section = data.custom_sections?.find(s => s.id === sectionId);
            return renderCustomSection(section);
        }

        switch(id) {
            case "education": return renderEducation();
            case "skills": return renderSkills();
            case "summary": return renderSummary();
            case "experience": return renderExperience();
            case "projects": return renderProjects();
            case "certifications": return renderCertifications();
            case "languages": return renderLanguages();
            case "achievements": return renderAchievements();
            case "volunteer": return renderVolunteer();
            case "hobbies": return renderHobbies();
            default: return null;
        }
    };

     // Layout Logic
    const defaultOrder = ["summary", "experience", "projects", "education", "skills", "certifications", "languages", "volunteer", "achievements", "hobbies"];
    let finalOrder = section_order.length > 0 ? section_order : defaultOrder;
    const customSectionIds = data.custom_sections?.map(s => `custom_${s.id}`) || [];
    const allIds = [...defaultOrder, ...customSectionIds];
    const missingSections = allIds.filter(id => !finalOrder.includes(id));
    finalOrder = [...finalOrder, ...missingSections];

    const defaultMainIds = ["summary", "experience", "projects", "volunteer"];
    const sideIds = ["education", "skills", "certifications", "languages", "achievements", "hobbies"];
    const forceSideIds = sideIds;
    
    const gridMainIds = finalOrder.filter(id => !forceSideIds.includes(id) && id !== "personal" && id !== "summary");
    const gridSideIds = finalOrder.filter(id => forceSideIds.includes(id));


    return (
        <div className="bg-white min-h-[1000px]" style={containerStyle}>
             {/* Header */}
            <div className="mb-12">
                <h1 className="text-5xl font-light tracking-tight mb-2" style={{ color: colors.primary }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                {data.personal_info?.profession && (
                    <p className="text-xl text-gray-400 mb-6 font-light">
                        {data.personal_info.profession}
                    </p>
                )}

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 font-light">
                    {data.personal_info?.email && <div className="flex items-center gap-2"><Mail className="size-4 opacity-70" /> <span>{data.personal_info.email}</span></div>}
                    {data.personal_info?.phone && <div className="flex items-center gap-2"><Phone className="size-4 opacity-70" /> <span>{data.personal_info.phone}</span></div>}
                    {data.personal_info?.location && <div className="flex items-center gap-2"><MapPin className="size-4 opacity-70" /> <span>{data.personal_info.location}</span></div>}
                    {data.personal_info?.linkedin && <a href={data.personal_info.linkedin} className="flex items-center gap-2 hover:underline hover:text-gray-800"><Linkedin className="size-4 opacity-70" /> <span>LinkedIn</span></a>}
                    {data.personal_info?.website && <a href={data.personal_info.website} className="flex items-center gap-2 hover:underline hover:text-gray-800"><Globe className="size-4 opacity-70" /> <span>Portfolio</span></a>}
                    {data.personal_info?.github && <a href={data.personal_info.github} className="flex items-center gap-2 hover:underline hover:text-gray-800"><Github className="size-4 opacity-70" /> <span>GitHub</span></a>}
                </div>
            </div>

            {/* Layout */}
             {layout.columns === 1 ? (
                 <div className="space-y-2">
                     {finalOrder.filter(id => id !== "personal").map(id => renderSection(id))}
                 </div>
             ) : (
                 <>
                    {/* Summary always top for minimal if 2 col? Or configurable. */}
                    {finalOrder.includes("summary") && (
                        <div className="mb-8">{renderSection("summary")}</div>
                    )}
                    
                    <div className="grid grid-cols-12 gap-12">
                        <div className="col-span-12 md:col-span-8 space-y-2">
                             {/* Main */}
                             {gridMainIds.map(id => renderSection(id))}
                        </div>
                        <div className="col-span-12 md:col-span-4 space-y-2">
                             {/* Side */}
                             {gridSideIds.map(id => renderSection(id))}
                        </div>
                    </div>
                 </>
             )}
        </div>
    );
};

export default MinimalTemplate;
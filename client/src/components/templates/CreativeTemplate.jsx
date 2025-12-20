import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink, Github, Calendar, Flag } from "lucide-react";

const CreativeTemplate = ({ data, accentColor, formatting }) => {
    const {
        layout = { columns: 2 },
        spacing = {
            font_size: 10.5,
            line_height: 1.5,
            margin_horizontal: 10,
            margin_vertical: 10,
            section_spacing: 6,
        },
        colors = {
            primary: "#111827",
            secondary: "#4B5563",
            accent: accentColor || "#8B5CF6", // Violet default for creative
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

    // Styling
    const containerStyle = {
        fontFamily: "'Poppins', 'Inter', sans-serif", // A bit more creative font preference if available
        color: colors.text,
        backgroundColor: colors.background,
        fontSize: `${spacing.font_size}pt`,
        lineHeight: spacing.line_height,
        // Margin handling is tricky with the creative header full width.
        // We might want an inner container for margins, or apply margins to the content wrapper.
        // For this template, let's assume the outer div is the page, and we use padding for margins.
    };

    const contentPadding = {
        padding: `${spacing.margin_vertical}mm ${spacing.margin_horizontal}mm`,
    };

    const sectionHeadingStyle = {
        color: colors.accent,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        fontSize: "1.1em",
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
                <div className="flex items-center gap-3 mb-3">
                    <div className="h-1 w-8" style={{ backgroundColor: colors.accent }}></div>
                    <h2 style={sectionHeadingStyle}>{getSectionTitle("skills", "Skills")}</h2>
                </div>
                <div className="space-y-3">
                    {groupedEntries.map(([category, items]) => (
                        <div key={category}>
                             {category !== "Other" && (
                                <h3 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: colors.secondary }}>
                                    {category}
                                </h3>
                            )}
                            <div className="flex flex-wrap gap-2">
                                {items.map((s, idx) => (
                                    <span key={idx} className="px-2 py-1 text-xs font-medium rounded text-white" style={{ backgroundColor: colors.accent }}>
                                        {s.name}{s.level ? ` (${s.level})` : ""}
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
                 <div className="flex items-center gap-3 mb-3">
                    <div className="h-1 w-8" style={{ backgroundColor: colors.accent }}></div>
                    <h2 style={sectionHeadingStyle}>{getSectionTitle("education", "Education")}</h2>
                </div>
                <div className="space-y-4">
                    {data.education.map((edu, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg border-l-4" style={{ borderColor: colors.accent }}>
                            <h3 className="font-bold text-sm" style={{ color: colors.primary }}>{edu.degree}</h3>
                            {edu.field && <p className="text-xs mb-1" style={{ color: colors.secondary }}>{edu.field}</p>}
                            <p className="text-xs font-semibold mb-1" style={{ color: colors.accent }}>{edu.institution}</p>
                            <div className="text-xs text-gray-500">
                                {formatDateRange(edu.start_date, edu.end_date, edu.is_current)}
                            </div>
                            {(edu.grade || edu.gpa) && <div className="text-xs mt-1">Grade: {edu.grade || edu.gpa}</div>}
                        </div>
                    ))}
                </div>
            </section>
        )
    );

    const renderExperience = () => (
        data.experience && data.experience.length > 0 && isVisible("experience") && (
            <section style={sectionContainerStyle}>
                 <div className="flex items-center gap-3 mb-3">
                    <div className="h-1 w-8" style={{ backgroundColor: colors.accent }}></div>
                    <h2 style={sectionHeadingStyle}>{getSectionTitle("experience", "Experience")}</h2>
                </div>
                <div className="space-y-5">
                    {data.experience.map((exp, index) => {
                        const techList = getList(exp.technologies);
                        return (
                             <div key={index} className="relative pl-4 border-l-2" style={{ borderColor: colors.accent }}>
                                <div className="mb-1">
                                    <h3 className="font-bold text-lg" style={{ color: colors.primary }}>{exp.title}</h3>
                                    <div className="flex justify-between items-baseline">
                                        <p className="font-semibold text-sm" style={{ color: colors.accent }}>{exp.company}</p>
                                        <span className="text-xs text-gray-500 font-mono">
                                            {formatDateRange(exp.start_date, exp.end_date, exp.is_current)}
                                        </span>
                                    </div>
                                    {exp.location && <p className="text-xs text-gray-400">{exp.location}</p>}
                                </div>
                                {exp.description && (
                                    <div className="text-sm leading-relaxed whitespace-pre-line mb-2">
                                        {exp.description}
                                    </div>
                                )}
                                {techList.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                        {techList.map((tech, i) => (
                                            <span key={i} className="text-[10px] px-1.5 py-0.5 rounded border border-gray-200 text-gray-600 bg-white">
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
                <div className="flex items-center gap-3 mb-3">
                    <div className="h-1 w-8" style={{ backgroundColor: colors.accent }}></div>
                    <h2 style={sectionHeadingStyle}>{getSectionTitle("projects", "Projects")}</h2>
                </div>
                <div className="space-y-4">
                    {data.projects.map((proj, index) => {
                        const techList = getList(proj.technologies);
                        return (
                            <div key={index}>
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-base" style={{ color: colors.primary }}>{proj.name}</h3>
                                        {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600"><ExternalLink size={14} /></a>}
                                    </div>
                                    <span className="text-xs text-gray-500">{formatDateRange(proj.start_date, proj.end_date, proj.is_current)}</span>
                                </div>
                                {(proj.role || proj.type) && <p className="text-xs font-medium mb-1" style={{ color: colors.accent }}>{[proj.role, proj.type].filter(Boolean).join(" • ")}</p>}
                                {proj.description && <p className="text-sm leading-relaxed mb-2">{proj.description}</p>}
                                {techList.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                        {techList.map((tech, i) => (
                                            <span key={i} className="text-[10px] px-1.5 py-0.5 rounded border border-gray-200 text-gray-600 bg-white">
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
                <div className="flex items-center gap-3 mb-3">
                    <div className="h-1 w-8" style={{ backgroundColor: colors.accent }}></div>
                    <h2 style={sectionHeadingStyle}>{getSectionTitle("certifications", "Certifications")}</h2>
                </div>
                 <ul className="space-y-2 text-sm">
                    {data.certifications.map((c, i) => (
                        <li key={i} className="flex flex-col">
                             <span className="font-medium" style={{ color: colors.primary }}>{c.name || c}</span>
                             <div className="flex justify-between text-xs text-gray-500">
                                {c.issuer && <span>{c.issuer}</span>}
                                {c.date && <span>{formatDate(c.date)}</span>}
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
                 <div className="flex items-center gap-3 mb-3">
                    <div className="h-1 w-8" style={{ backgroundColor: colors.accent }}></div>
                    <h2 style={sectionHeadingStyle}>{getSectionTitle("languages", "Languages")}</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                    {data.languages.map((lang, index) => (
                         <div key={index} className="flex flex-col">
                            <span className="font-medium text-sm" style={{ color: colors.primary }}>
                                {typeof lang === 'string' ? lang : (lang.name || lang.language)}
                            </span>
                            {(lang.proficiency || lang.level) && (
                                <span className="text-xs text-gray-500">{lang.proficiency || lang.level}</span>
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
                 <div className="flex items-center gap-3 mb-3">
                    <div className="h-1 w-8" style={{ backgroundColor: colors.accent }}></div>
                    <h2 style={sectionHeadingStyle}>{getSectionTitle("achievements", "Achievements")}</h2>
                </div>
                <ul className="space-y-2 text-sm">
                    {data.achievements.map((item, index) => (
                        <li key={index}>
                             {typeof item === 'string' ? item : (
                                <div>
                                    <span className="font-semibold" style={{ color: colors.primary }}>{item.title}</span>
                                    {item.date && <span className="opacity-70 ml-1 text-xs">({formatDate(item.date)})</span>}
                                    {item.description && <p className="text-xs mt-0.5 opacity-90">{item.description}</p>}
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
                 <div className="flex items-center gap-3 mb-3">
                    <div className="h-1 w-8" style={{ backgroundColor: colors.accent }}></div>
                    <h2 style={sectionHeadingStyle}>{getSectionTitle("volunteer", "Volunteer")}</h2>
                </div>
                 <div className="space-y-3">
                    {data.volunteer_experience.map((vol, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-sm" style={{ color: colors.primary }}>{vol.role}</h3>
                            <p className="text-xs mb-1" style={{ color: colors.secondary }}>{vol.organization}</p>
                            <p className="text-[10px] text-gray-400 mb-1">
                                {formatDateRange(vol.start_date, vol.end_date, vol.is_current)}
                            </p>
                             {vol.description && <p className="text-xs opacity-90 leading-relaxed">{vol.description}</p>}
                        </div>
                    ))}
                </div>
            </section>
        )
    );

    const renderHobbies = () => (
        data.hobbies && data.hobbies.length > 0 && isVisible("hobbies") && (
            <section style={sectionContainerStyle}>
                 <div className="flex items-center gap-3 mb-3">
                    <div className="h-1 w-8" style={{ backgroundColor: colors.accent }}></div>
                    <h2 style={sectionHeadingStyle}>{getSectionTitle("hobbies", "Interests")}</h2>
                </div>
                <p className="text-sm">{data.hobbies.join(", ")}</p>
            </section>
        )
    );

    const renderCustomSection = (section) => {
        if (!section || !section.items || section.items.length === 0 || !isVisible(section.id)) return null;
        return (
            <section key={section.id} style={sectionContainerStyle}>
                 <div className="flex items-center gap-3 mb-3">
                    <div className="h-1 w-8" style={{ backgroundColor: colors.accent }}></div>
                    <h2 style={sectionHeadingStyle}>{section.title}</h2>
                </div>
                <div className="space-y-3">
                    {section.items.map((item, i) => (
                        <div key={i}>
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-sm" style={{ color: colors.primary }}>{item.title}</h3>
                                {item.date && <div className="text-[10px] text-gray-500">{item.date}</div>}
                            </div>
                            {item.subtitle && <p className="text-[10px] italic" style={{ color: colors.accent }}>{item.subtitle}</p>}
                            {item.description && <p className="text-sm leading-relaxed mt-1">{item.description}</p>}
                        </div>
                    ))}
                </div>
            </section>
        );
    };

    const renderSummary = () => (
        isVisible("summary") && data.professional_summary && (
            <section className="mb-8" style={{ marginBottom: `${spacing.section_spacing}mm` }}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-1 w-16" style={{ backgroundColor: colors.accent }}></div>
                    <h2 className="text-2xl font-bold uppercase tracking-wider" style={{ color: colors.accent }}>
                        {getSectionTitle("summary", "About")}
                    </h2>
                    <div className="flex-1 h-1" style={{ backgroundColor: colors.accent }}></div>
                </div>
                <p className="text-lg leading-relaxed pl-2 md:pl-20 border-l-4 md:border-l-0 border-transparent">
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
             // Summary is handled separately in layout usually, but we can include it if logic dictates
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

    // Layout
    const defaultOrder = ["skills", "education", "languages", "hobbies", "summary", "experience", "projects", "certifications", "achievements", "volunteer"];
    let finalOrder = section_order.length > 0 ? section_order : defaultOrder;
    const customSectionIds = data.custom_sections?.map(s => `custom_${s.id}`) || [];
    const allIds = [...defaultOrder, ...customSectionIds];
    const missingSections = allIds.filter(id => !finalOrder.includes(id));
    finalOrder = [...finalOrder, ...missingSections];

    // Creative template usually has a split. 
    // Left: Experience, Projects (Main content)
    // Right: Education, Skills, specific metadata (Sidebar-ish but usually less wide than main)
    // Actually the previous creative template had: Left (Experience, Projects, Volunteer), Right (Education, Skills, Certs, Languages, Achievements, Interests, Custom)
    
    // Let's preserve that separation logic but allow re-ordering within those buckets.
    const defaultLeftIds = ["experience", "projects", "volunteer"];
    
    // Note: The previous template had Left=Main=Big. Right=Sidebar.
    // Let's classify:
    const mainIds = ["experience", "projects", "volunteer", "summary"]; // Summary handled differently at top usually
    const sideIds = ["education", "skills", "certifications", "languages", "achievements", "hobbies", ...customSectionIds];
    
    // We filter finalOrder
    // If user moves 'Education' to main list via DragDrop (unavailable yet?), we should trust finalOrder?
    // Current app doesn't seem to support drag-drop columns yet, just order.
    // So we stick to bucket logic for columns:
    const currentMainIds = finalOrder.filter(id => defaultLeftIds.includes(id));
    const currentSideIds = finalOrder.filter(id => !defaultLeftIds.includes(id) && id !== "summary" && id !== "personal");


    return (
        <div className="bg-white min-h-[1000px]" style={containerStyle}>
             {/* Header */}
             <div className="relative">
                <div className="h-32" style={{ backgroundColor: colors.accent, opacity: 0.9 }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                            {data.personal_info?.full_name || "Your Name"}
                        </h1>
                        {data.personal_info?.profession && (
                            <p className="text-xl text-white font-light">
                                {data.personal_info.profession}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div style={contentPadding}>
                {/* Contact Bar */}
                <div className="flex flex-wrap justify-center gap-6 mb-8 pb-6 border-b-2 border-gray-100 text-sm">
                     {data.personal_info?.email && <div className="flex items-center gap-2"><Mail className="size-4" style={{ color: colors.accent }} /> <span>{data.personal_info.email}</span></div>}
                     {data.personal_info?.phone && <div className="flex items-center gap-2"><Phone className="size-4" style={{ color: colors.accent }} /> <span>{data.personal_info.phone}</span></div>}
                     {data.personal_info?.location && <div className="flex items-center gap-2"><MapPin className="size-4" style={{ color: colors.accent }} /> <span>{data.personal_info.location}</span></div>}
                     {/* Socials */}
                     {data.personal_info?.linkedin && <a href={data.personal_info.linkedin} className="flex items-center gap-2 hover:underline"><Linkedin className="size-4" style={{ color: colors.accent }} /><span className="break-all">{data.personal_info.linkedin}</span></a>}
                     {data.personal_info?.website && <a href={data.personal_info.website} className="flex items-center gap-2 hover:underline"><Globe className="size-4" style={{ color: colors.accent }} /><span className="break-all">{data.personal_info.website}</span></a>}
                     {data.personal_info?.github && <a href={data.personal_info.github} className="flex items-center gap-2 hover:underline"><Github className="size-4" style={{ color: colors.accent }} /><span className="break-all">{data.personal_info.github}</span></a>}
                </div>

                {/* Summary at top like original */}
                {renderSection("summary")}

                {layout.columns === 1 ? (
                     <div className="space-y-6">
                         {finalOrder.filter(id => id !== "summary" && id !== "personal").map(id => renderSection(id))}
                     </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Main Column (Left in orig) */}
                        <div className="space-y-8">
                             {currentMainIds.map(id => renderSection(id))}
                        </div>
                        {/* Side Column (Right in orig) */}
                        <div className="space-y-8">
                            {currentSideIds.map(id => renderSection(id))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreativeTemplate;

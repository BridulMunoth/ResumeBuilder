import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink, Github, Calendar, Flag } from "lucide-react";

const ExecutiveTemplate = ({ data, accentColor, formatting }) => {
    const {
        layout = { columns: 2 },
        spacing = {
            font_size: 11,
            line_height: 1.5,
            margin_horizontal: 10,
            margin_vertical: 10,
            section_spacing: 6,
        },
        colors = {
            primary: "#111827",
            secondary: "#4B5563",
            accent: accentColor || "#1f2937", // Dark gray default for executive
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
        fontFamily: "'Georgia', 'Times New Roman', serif", // Executive often serif or very clean sans
        color: colors.text,
        backgroundColor: colors.background,
        fontSize: `${spacing.font_size}pt`,
        lineHeight: spacing.line_height,
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
        borderBottom: `2px solid ${colors.accent}`,
        paddingBottom: "0.25rem",
        marginBottom: "1rem",
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
                <h2 style={sectionHeadingStyle}>{getSectionTitle("skills", "Core Competencies")}</h2>
                 <div className="space-y-3">
                    {groupedEntries.map(([category, items]) => (
                        <div key={category}>
                             {category !== "Other" && (
                                <h3 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: colors.secondary }}>
                                    {category}
                                </h3>
                            )}
                            <div className="flex flex-wrap gap-x-4 gap-y-1">
                                {items.map((s, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                         <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.accent }}></div>
                                        <span className="text-sm font-medium" style={{ color: colors.primary }}>
                                            {s.name}{s.level ? ` - ${s.level}` : ""}
                                        </span>
                                    </div>
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
                <div className="space-y-4">
                    {data.education.map((edu, index) => (
                         <div key={index} className="pb-3 border-b border-gray-100 last:border-0">
                            <h3 className="font-bold text-base" style={{ color: colors.primary }}>{edu.degree}</h3>
                            {edu.field && <p className="text-sm italic" style={{ color: colors.secondary }}>{edu.field}</p>}
                            <div className="flex justify-between items-baseline mt-1">
                                <span className="font-semibold text-sm" style={{ color: colors.accent }}>{edu.institution}</span>
                                <span className="text-sm text-gray-500">{formatDateRange(edu.start_date, edu.end_date, edu.is_current)}</span>
                            </div>
                            {(edu.grade || edu.gpa) && <div className="text-sm mt-1">Grade: {edu.grade || edu.gpa}</div>}
                        </div>
                    ))}
                </div>
            </section>
        )
    );

    const renderExperience = () => (
        data.experience && data.experience.length > 0 && isVisible("experience") && (
            <section style={sectionContainerStyle}>
                <h2 style={sectionHeadingStyle}>{getSectionTitle("experience", "Professional Experience")}</h2>
                <div className="space-y-6">
                    {data.experience.map((exp, index) => {
                        const techList = getList(exp.technologies);
                        return (
                             <div key={index}>
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <h3 className="font-bold text-lg" style={{ color: colors.primary }}>{exp.title}</h3>
                                        <p className="font-semibold text-base" style={{ color: colors.accent }}>{exp.company}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-sm font-medium" style={{ color: colors.secondary }}>
                                            {formatDateRange(exp.start_date, exp.end_date, exp.is_current)}
                                        </span>
                                        {exp.location && <span className="block text-xs text-gray-400">{exp.location}</span>}
                                    </div>
                                </div>
                                {exp.description && (
                                    <div className="text-sm leading-relaxed whitespace-pre-line mb-2">
                                        {exp.description}
                                    </div>
                                )}
                                {techList.length > 0 && (
                                    <div className="text-sm mt-2">
                                        <span className="font-bold text-xs uppercase" style={{ color: colors.secondary }}>Technologies: </span>
                                        <span className="italic text-gray-600">{techList.join(", ")}</span>
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
                <h2 style={sectionHeadingStyle}>{getSectionTitle("projects", "Key Projects")}</h2>
                <div className="space-y-5">
                    {data.projects.map((proj, index) => {
                        const techList = getList(proj.technologies);
                        return (
                            <div key={index} className="pl-4 border-l-2 border-gray-200">
                                <div className="flex justify-between items-start mb-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-base" style={{ color: colors.primary }}>{proj.name}</h3>
                                        {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600"><ExternalLink size={14} /></a>}
                                    </div>
                                    <span className="text-sm text-gray-500">{formatDateRange(proj.start_date, proj.end_date, proj.is_current)}</span>
                                </div>
                                {(proj.role || proj.type) && <p className="text-sm font-medium mb-1" style={{ color: colors.accent }}>{[proj.role, proj.type].filter(Boolean).join(" • ")}</p>}
                                {proj.description && <p className="text-sm leading-relaxed mb-2">{proj.description}</p>}
                                {techList.length > 0 && (
                                     <div className="text-sm mt-1">
                                        <span className="font-bold text-xs uppercase" style={{ color: colors.secondary }}>Technologies: </span>
                                        <span className="italic text-gray-600">{techList.join(", ")}</span>
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
                 <h2 style={sectionHeadingStyle}>{getSectionTitle("languages", "Languages")}</h2>
                <div className="space-y-1">
                    {data.languages.map((lang, index) => (
                         <div key={index} className="flex justify-between text-sm">
                            <span className="font-medium" style={{ color: colors.primary }}>
                                {typeof lang === 'string' ? lang : (lang.name || lang.language)}
                            </span>
                            {(lang.proficiency || lang.level) && (
                                <span className="text-gray-500">{lang.proficiency || lang.level}</span>
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
                <ul className="list-disc ml-5 space-y-2 text-sm">
                    {data.achievements.map((item, index) => (
                        <li key={index}>
                             {typeof item === 'string' ? item : (
                                <span>
                                    <span className="font-semibold" style={{ color: colors.primary }}>{item.title}</span>
                                    {item.date && <span className="text-gray-500 text-xs ml-1">({formatDate(item.date)})</span>}
                                    {item.description && <span className="block text-xs mt-0.5">{item.description}</span>}
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
            <section style={sectionContainerStyle}>
                 <h2 style={sectionHeadingStyle}>{getSectionTitle("volunteer", "Volunteer")}</h2>
                 <div className="space-y-3">
                    {data.volunteer_experience.map((vol, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-semibold text-sm" style={{ color: colors.primary }}>{vol.role}</h3>
                                <p className="text-xs text-gray-500">{formatDateRange(vol.start_date, vol.end_date, vol.is_current)}</p>
                            </div>
                            <p className="text-xs mb-1 italic" style={{ color: colors.secondary }}>{vol.organization}</p>
                             {vol.description && <p className="text-xs leading-relaxed">{vol.description}</p>}
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
                <p className="text-sm">{data.hobbies.join(", ")}</p>
            </section>
        )
    );

    const renderCustomSection = (section) => {
        if (!section || !section.items || section.items.length === 0 || !isVisible(section.id)) return null;
        return (
            <section key={section.id} style={sectionContainerStyle}>
                 <h2 style={sectionHeadingStyle}>{section.title}</h2>
                <div className="space-y-3">
                    {section.items.map((item, i) => (
                        <div key={i}>
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-sm" style={{ color: colors.primary }}>{item.title}</h3>
                                {item.date && <div className="text-xs text-gray-500">{item.date}</div>}
                            </div>
                            {item.subtitle && <p className="text-xs italic" style={{ color: colors.accent }}>{item.subtitle}</p>}
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
                <h2 style={sectionHeadingStyle}>
                    {getSectionTitle("summary", "Executive Summary")}
                </h2>
                <p className="text-base leading-relaxed text-justify">
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

    // Layout
    const defaultOrder = ["summary", "experience", "projects", "skills", "education", "certifications", "languages", "volunteer", "achievements", "hobbies"];
    let finalOrder = section_order.length > 0 ? section_order : defaultOrder;
    const customSectionIds = data.custom_sections?.map(s => `custom_${s.id}`) || [];
    const allIds = [...defaultOrder, ...customSectionIds];
    const missingSections = allIds.filter(id => !finalOrder.includes(id));
    finalOrder = [...finalOrder, ...missingSections];

    // Executive layout logic:
    // With 2 columns: Main (8/12) and Side (4/12).
    // Main usually contains text-heavy stuff: Summary, Experience, Projects, Volunteer.
    // Side usually contains lists: Contact (if not in header), Education, Skills, Certs, Languages.
    
    // We can stick to the same grouping logic as before but adapted for Executive feel.
    const defaultMainIds = ["summary", "experience", "projects", "volunteer"];
    
    const currentMainIds = finalOrder.filter(id => defaultMainIds.includes(id) || id.startsWith("custom_")); 
    // ^ Custom sections often can be main or side. Lets assume they are main unless small? 
    // Actually, ProfessionalTemplate puts custom sections in Side by default? Let's check.
    // ProfessionalTemplate put custom sections in SIDE if using 2 columns.
    // Let's stick to consistent logic.
    // The previous Executive code had Main: Exp, Proj. Side: Edu, Skills.
    // Summary was at the top, full width? No, it was in a separate section above columns. (Lines 87-96 of original file).
    // Let's keep Summary full width at top if possible, or part of Main.
    // Original file had Summary separate. I will keep it separate or put it in Main if user orders it there?
    // User order suggests they want to control position. But grid layout is restrictive.
    // Let's create a "Top Section" for Summary if it's the first item?
    // Or just put it in Main.
    // I will put everything not in "Side" into "Main".    
    
    const sideIds = ["education", "skills", "certifications", "languages", "achievements", "hobbies"];
    const forceSideIds = sideIds; // These consistently look better on side in 2-col
    
    const gridMainIds = finalOrder.filter(id => !forceSideIds.includes(id) && id !== "personal" && id !== "summary"); 
    const gridSideIds = finalOrder.filter(id => forceSideIds.includes(id));

    return (
        <div className="bg-white min-h-[1000px]" style={containerStyle}>
             {/* Header */}
            <div className="border-t-8" style={{ borderColor: colors.accent }}>
                <div style={contentPadding}>
                    <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                                {data.personal_info?.full_name || "Your Name"}
                            </h1>
                            {data.personal_info?.profession && (
                                <p className="text-xl text-gray-600 font-light" style={{ color: colors.secondary }}>
                                    {data.personal_info.profession}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Contact Information Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm border-t border-b border-gray-200 py-4 mb-6">
                        {data.personal_info?.email && <div className="flex items-center gap-2"><Mail className="size-4" style={{ color: colors.accent }} /> <span>{data.personal_info.email}</span></div>}
                        {data.personal_info?.phone && <div className="flex items-center gap-2"><Phone className="size-4" style={{ color: colors.accent }} /> <span>{data.personal_info.phone}</span></div>}
                        {data.personal_info?.location && <div className="flex items-center gap-2"><MapPin className="size-4" style={{ color: colors.accent }} /> <span>{data.personal_info.location}</span></div>}
                        {data.personal_info?.linkedin && <a href={data.personal_info.linkedin} className="flex items-center gap-2 hover:underline"><Linkedin className="size-4" style={{ color: colors.accent }} /><span className="break-all">{data.personal_info.linkedin}</span></a>}
                        {data.personal_info?.website && <a href={data.personal_info.website} className="flex items-center gap-2 hover:underline"><Globe className="size-4" style={{ color: colors.accent }} /><span className="break-all">{data.personal_info.website}</span></a>}
                        {data.personal_info?.github && <a href={data.personal_info.github} className="flex items-center gap-2 hover:underline"><Github className="size-4" style={{ color: colors.accent }} /><span className="break-all">{data.personal_info.github}</span></a>}
                    </div>


                     {/* Layout */}
                     {layout.columns === 1 ? (
                         <div className="space-y-6">
                             {/* If 1 column, just render all in order (except personal which is header) */}
                             {finalOrder.filter(id => id !== "personal").map(id => renderSection(id))}
                         </div>
                     ) : (
                         <>
                            {/* If Summary is meant to be at top, render it if it exists and is visible */}
                            {/* But we must respect order. If user moved Summary to bottom, we shouldn't force it top. */}
                            {/* However, the grid layout forces a split. */}
                            {/* Let's see if Summary is in the "Main" list. If so, it renders in Main column. */}
                            
                            <div className="grid grid-cols-12 gap-8">
                                <div className="col-span-12 md:col-span-8 space-y-8">
                                    {/* Summary is usually first in main ids if present */}
                                    {/* We will render all "Main" IDs here */}
                                    {finalOrder.some(id => id === 'summary') && renderSection('summary')} 
                                    {/* Wait, if I render summary specifically here, I should exclude it from the map below if I want it fixed? */}
                                    {/* Or I just trust gridMainIds which I filtered summary out of? */}
                                    {/* I filtered summary out of gridMainIds above. */}
                                    
                                    {gridMainIds.map(id => renderSection(id))}
                                </div>
                                <div className="col-span-12 md:col-span-4 space-y-8">
                                     {gridSideIds.map(id => renderSection(id))}
                                </div>
                            </div>
                         </>
                     )}
                </div>
            </div>
        </div>
    );
};

export default ExecutiveTemplate;

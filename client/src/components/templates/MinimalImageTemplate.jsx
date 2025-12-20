import React from "react";
import { Mail, Phone, MapPin, ExternalLink, Linkedin, Globe, Github, Calendar, Flag } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor, formatting }) => {
    const {
        layout = { columns: 2 },
        spacing = {
            font_size: 10,
            line_height: 1.6,
            margin_horizontal: 10,
            margin_vertical: 10,
            section_spacing: 8,
        },
        colors = {
            primary: "#18181b", // zinc-900
            secondary: "#52525b", // zinc-600
            accent: accentColor || "#27272a", // zinc-800 default
            text: "#3f3f46", // zinc-700
            background: "#FFFFFF",
        },
        section_order = [],
        section_visibility = {},
        section_titles = {},
    } = formatting || {};

    const getSectionTitle = (id, defaultTitle) => section_titles[id] || defaultTitle;
    const isVisible = (id) => section_visibility[id] !== false;

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        if (Number.isNaN(d.getTime())) return "";
        return d.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
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

    const getImageSrc = () => {
        if (!data.personal_info?.image) return null;
        if (typeof data.personal_info.image === 'string') return data.personal_info.image;
        if (typeof data.personal_info.image === 'object' && data.personal_info.image instanceof Blob) {
            return URL.createObjectURL(data.personal_info.image);
        }
        return null;
    };

    // Styling
    const containerStyle = {
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        color: colors.text,
        backgroundColor: colors.background,
        fontSize: `${spacing.font_size}pt`,
        lineHeight: spacing.line_height,
    };

    const sectionHeadingStyle = {
        color: colors.secondary,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        fontSize: "0.85rem",
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
                <h2 style={sectionHeadingStyle}>{getSectionTitle("skills", "Skills")}</h2>
                 <div className="space-y-4">
                    {groupedEntries.map(([category, items]) => (
                        <div key={category}>
                             {category !== "Other" && (
                                <h3 className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: colors.accent }}>
                                    {category}
                                </h3>
                            )}
                            <ul className="space-y-1 text-sm">
                                {items.map((s, idx) => (
                                    <li key={idx}>
                                         {s.name}{s.level ? <span className="text-gray-400 text-xs ml-1">({s.level})</span> : ""}
                                    </li>
                                ))}
                            </ul>
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
                <div className="space-y-4 text-sm">
                    {data.education.map((edu, index) => (
                         <div key={index}>
                            <p className="font-semibold uppercase" style={{ color: colors.primary }}>{edu.level || edu.program || edu.degree}</p>
                            <div className="flex flex-col gap-0.5 mt-0.5">
                                <span className="font-medium" style={{ color: colors.secondary }}>{edu.institution}</span>
                                <span className="text-xs text-gray-500">{formatDate(edu.graduation_date || edu.end_date)}</span>
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
                <div className="space-y-6">
                    {data.experience.map((exp, index) => {
                        const techList = getList(exp.technologies);
                        return (
                             <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-semibold text-lg" style={{ color: colors.primary }}>{exp.title}</h3>
                                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                        {formatDateRange(exp.start_date, exp.end_date, exp.is_current)}
                                    </span>
                                </div>
                                <p className="text-sm font-medium mb-1" style={{ color: colors.accent }}>{exp.company}</p>
                                {exp.description && (
                                    <div className="text-sm leading-relaxed whitespace-pre-line text-gray-600 mb-2">
                                        {exp.description}
                                    </div>
                                )}
                                {techList.length > 0 && (
                                    <div className="text-xs mt-1 flex flex-wrap gap-2 text-gray-500">
                                        {techList.join(" • ")}
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
                <div className="space-y-4">
                    {data.projects.map((proj, index) => {
                        const techList = getList(proj.technologies);
                        return (
                            <div key={index}>
                                <div className="flex items-center gap-2 mt-1">
                                    <h3 className="font-medium text-base" style={{ color: colors.primary }}>{proj.name}</h3>
                                    {proj.link && (
                                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                                            <ExternalLink size={14} />
                                        </a>
                                    )}
                                </div>
                                {(proj.role || proj.type) && <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">{[proj.role, proj.type].filter(Boolean).join(" • ")}</p>}
                                {proj.description && <p className="text-sm leading-relaxed text-gray-600 mb-2">{proj.description}</p>}
                                {techList.length > 0 && (
                                     <div className="text-xs mt-1 text-gray-500">
                                        {techList.join(" • ")}
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
                        <li key={i}>
                             <p className="font-medium" style={{ color: colors.primary }}>{c.name || c}</p>
                             {c.issuer && <span className="text-xs text-gray-500">{c.issuer}</span>}
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
                <ul className="space-y-1 text-sm">
                    {data.languages.map((lang, index) => (
                         <li key={index} className="flex justify-between">
                            <span className="font-medium" style={{ color: colors.primary }}>
                                {typeof lang === 'string' ? lang : (lang.name || lang.language)}
                            </span>
                            {(lang.proficiency || lang.level) && (
                                <span className="text-xs text-gray-500">{lang.proficiency || lang.level}</span>
                            )}
                         </li>
                    ))}
                </ul>
            </section>
        )
    );

    const renderAchievements = () => (
        data.achievements && data.achievements.length > 0 && isVisible("achievements") && (
             <section style={sectionContainerStyle}>
                 <h2 style={sectionHeadingStyle}>{getSectionTitle("achievements", "Achievements")}</h2>
                <ul className="space-y-2 text-sm">
                    {data.achievements.map((item, index) => (
                        <li key={index}>
                             {typeof item === 'string' ? item : (
                                <div>
                                    <span className="font-medium" style={{ color: colors.primary }}>{item.title}</span>
                                    {item.description && <p className="text-xs text-gray-600 mt-0.5">{item.description}</p>}
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
                 <div className="space-y-3">
                    {data.volunteer_experience.map((vol, index) => (
                        <div key={index}>
                            <h3 className="font-medium text-sm" style={{ color: colors.primary }}>{vol.role}</h3>
                            <p className="text-xs italic text-gray-500">{vol.organization}</p>
                             {vol.description && <p className="text-sm mt-0.5 text-gray-600">{vol.description}</p>}
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
                <p className="text-sm text-gray-600">{data.hobbies.join(", ")}</p>
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
                            <h3 className="font-bold text-sm" style={{ color: colors.primary }}>{item.title}</h3>
                            {item.subtitle && <p className="text-xs italic text-gray-500">{item.subtitle}</p>}
                            {item.description && <p className="text-sm leading-relaxed mt-0.5 text-gray-600">{item.description}</p>}
                        </div>
                    ))}
                </div>
            </section>
        );
    };

    const renderSummary = () => (
         isVisible("summary") && data.professional_summary && (
            <section className="mb-8" style={{ marginBottom: `${spacing.section_spacing}mm` }}>
                <h2 style={sectionHeadingStyle}>{getSectionTitle("summary", "Summary")}</h2>
                <p className="text-sm leading-relaxed text-gray-600">
                    {data.professional_summary}
                </p>
            </section>
        )
    );
     const renderContact = () => (
        <section className="mb-8" style={{ marginBottom: `${spacing.section_spacing}mm` }}>
            <h2 style={sectionHeadingStyle}>
                Contact
            </h2>
            <div className="space-y-1.5 text-sm">
                {data.personal_info?.phone && (
                    <div className="flex items-center gap-2">
                        <Phone size={14} style={{ color: colors.accent }} />
                        <span>{data.personal_info.phone}</span>
                    </div>
                )}
                {data.personal_info?.email && (
                    <div className="flex items-center gap-2">
                        <Mail size={14} style={{ color: colors.accent }} />
                        <span className="break-all">{data.personal_info.email}</span>
                    </div>
                )}
                {data.personal_info?.location && (
                    <div className="flex items-center gap-2">
                        <MapPin size={14} style={{ color: colors.accent }} />
                        <span>{data.personal_info.location}</span>
                    </div>
                )}
                {data.personal_info?.linkedin && (
                    <a href={data.personal_info.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                        <Linkedin size={14} style={{ color: colors.accent }} />
                        <span className="break-all text-xs text-gray-500">{data.personal_info.linkedin.replace(/^https?:\/\//, '')}</span>
                    </a>
                )}
                {data.personal_info?.website && (
                    <a href={data.personal_info.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                        <Globe size={14} style={{ color: colors.accent }} />
                        <span className="break-all text-xs text-gray-500">{data.personal_info.website.replace(/^https?:\/\//, '')}</span>
                    </a>
                )}
                {data.personal_info?.github && (
                    <a href={data.personal_info.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                        <Github size={14} style={{ color: colors.accent }} />
                        <span className="break-all text-xs text-gray-500">{data.personal_info.github.replace(/^https?:\/\//, '')}</span>
                    </a>
                )}
            </div>
        </section>
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
            // Contact is handled in sidebar/header usually for this layout
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

    // Minimal Image: Left Col (Image, Contact, Edu, Skills), Right Col (Summary, Exp, Proj, etc)
    const sideIds = ["education", "skills", "certifications", "languages", "achievements", "hobbies"];
    const forceSideIds = sideIds;
    
    // In this specific template, the "Side" is the LEFT side.
    // The "Main" is the Right side.
    const gridMainIds = finalOrder.filter(id => !forceSideIds.includes(id) && id !== "personal" && id !== "contact"); 
    const gridSideIds = finalOrder.filter(id => forceSideIds.includes(id) && id !== "contact"); // Contact is manually placed in side

    return (
        <div className="bg-white min-h-[1000px]" style={containerStyle}>
            <div className={`grid ${layout.columns === 1 ? 'grid-cols-1' : 'grid-cols-3'}`}>
                
                {/* Left Sidebar (Col 1) */}
                 <aside className={`${layout.columns === 1 ? 'block p-8 border-b' : 'col-span-1 border-r border-gray-200 p-8 pt-10'}`}>
                    
                    {/* Image */}
                     <div className="mb-6">
                        {getImageSrc() && (
                             <img 
                                src={getImageSrc()} 
                                alt="Profile" 
                                className="w-32 h-32 object-cover rounded-full mx-auto mb-4" 
                                style={{ borderColor: colors.accent, borderWidth: '2px' }}
                             />
                        )}
                     </div>

                     {/* Name (if 1 col, or if design demands it in sidebar? Original had Name in sidebar? No, original had Name in Top of Main? Actually original had Name in Top of Main/Header area spanning 2 cols? Let's check logic)
                      Original: "col-span-1 py-10" (Image) + "col-span-2 flex flex-col justify-center py-10 px-8" (Name)
                      Wait, the original layout was:
                      Grid Cols 3.
                      Col 1: Image.
                      Col 2 (span 2): Name/Title.
                      Row 2: Left Sidebar (Col 1). Right Content (Col 2).
                      
                      Okay, so it has a Header Row, then a Content Row.
                      My implementation below should reflect that.
                      */}

                </aside>
                
                 {/* Header Area (Top Right) */}
                 <div className={`${layout.columns === 1 ? 'px-8 pb-8' : 'col-span-2 p-8 pt-10 flex flex-col justify-center'}`}>
                    <h1 className="text-4xl font-bold tracking-widest mb-2" style={{ color: colors.primary }}>
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                     <p className="uppercase font-medium text-sm tracking-widest" style={{ color: colors.secondary }}>
                        {data.personal_info?.profession || "Profession"}
                    </p>
                 </div>
                 
                 {/* Sidebar Content (Row 2 Col 1) */}
                 {layout.columns !== 1 && (
                     <aside className="col-span-1 border-r border-gray-200 p-8 pt-0 h-full">
                         {renderContact()}
                         {gridSideIds.map(id => renderSection(id))}
                     </aside>
                 )}

                 {/* Main Content (Row 2 Col 2) */}
                  <main className={`${layout.columns === 1 ? 'p-8 pt-0' : 'col-span-2 p-8 pt-0'}`}>
                        {/* If 1 col, rendering everything here including what would be in sidebar? */}
                        {layout.columns === 1 && (
                            <>
                                {renderContact()}
                                {/* Render everything in order */}
                                {finalOrder.filter(id => id !== "personal" && id !== "contact").map(id => renderSection(id))}
                            </>
                        )}

                        {layout.columns !== 1 && (
                            <div className="space-y-2">
                                {gridMainIds.map(id => renderSection(id))}
                            </div>
                        )}
                  </main>

            </div>
        </div>
    );
};

export default MinimalImageTemplate;
import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink, Github } from "lucide-react";

const ProfessionalImageTemplate = ({ data, accentColor, formatting }) => {
    // Formatting Defaults
    const {
        layout = { columns: 2 },
        spacing = {
            font_size: 10.5,
            line_height: 1.4,
            margin_horizontal: 10,
            margin_vertical: 10,
            section_spacing: 6,
        },
        colors = {
            primary: "#111827",
            secondary: "#4B5563",
            accent: accentColor || "#2563EB",
            text: "#374151",
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

    const getImageSrc = () => {
        if (!data.personal_info?.image) return null;
        if (typeof data.personal_info.image === 'string') return data.personal_info.image;
        if (typeof data.personal_info.image === 'object') return URL.createObjectURL(data.personal_info.image);
        return null;
    };

    // Styles
    const containerStyle = {
        fontFamily: "Inter, sans-serif",
        color: colors.text,
        fontSize: `${spacing.font_size}pt`,
        lineHeight: spacing.line_height,
        padding: `${spacing.margin_vertical}mm ${spacing.margin_horizontal}mm`,
        backgroundColor: colors.background,
    };
    
    const sectionContainerStyle = {
        marginBottom: `${spacing.section_spacing}mm`,
    };

    const headingStyle = {
        fontSize: "0.875rem", // text-sm
        fontWeight: 700,
        marginBottom: "1rem",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        borderBottom: `1px solid ${colors.secondary}`,
        paddingBottom: "0.25rem",
        color: colors.accent,
        borderColor: colors.secondary
    };

    const subHeadingStyle = {
        fontWeight: 600,
        color: colors.primary,
        fontSize: `${spacing.font_size}pt`
    };

    const metaStyle = {
        fontSize: "0.9em",
        color: colors.secondary
    };

    // Renderers
    const renderContact = () => (
        <section style={sectionContainerStyle}>
            <h2 style={headingStyle}>{getSectionTitle("personal", "Contact")}</h2>
            <div className="space-y-3 text-xs">
                {data.personal_info?.email && <div className="flex items-start gap-2"><Mail className="size-3 mt-0.5" style={{ color: colors.accent }} /> <span className="break-all">{data.personal_info.email}</span></div>}
                {data.personal_info?.phone && <div className="flex items-start gap-2"><Phone className="size-3 mt-0.5" style={{ color: colors.accent }} /> <span>{data.personal_info.phone}</span></div>}
                {data.personal_info?.location && <div className="flex items-start gap-2"><MapPin className="size-3 mt-0.5" style={{ color: colors.accent }} /> <span>{data.personal_info.location}</span></div>}
                {/* Socials */}
                {data.personal_info?.linkedin && <a href={data.personal_info.linkedin} className="flex items-start gap-2 hover:underline"><Linkedin className="size-3 mt-0.5" style={{ color: colors.accent }} /><span className="break-all">{data.personal_info.linkedin}</span></a>}
                {data.personal_info?.website && <a href={data.personal_info.website} className="flex items-start gap-2 hover:underline"><Globe className="size-3 mt-0.5" style={{ color: colors.accent }} /><span className="break-all">{data.personal_info.website}</span></a>}
                {data.personal_info?.github && <a href={data.personal_info.github} className="flex items-start gap-2 hover:underline"><Github className="size-3 mt-0.5" style={{ color: colors.accent }} /><span className="break-all">{data.personal_info.github}</span></a>}
            </div>
        </section>
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
            <section style={sectionContainerStyle}>
                <h2 style={headingStyle}>{getSectionTitle("skills", "Core Skills")}</h2>
                <div className="space-y-3 text-xs">
                    {Object.entries(grouped).map(([category, items]) => (
                        <div key={category}>
                             {category !== "Uncategorized" && (
                                <h4 className="font-bold opacity-80 mb-1" style={{ color: colors.secondary }}>{category}</h4>
                            )}
                            <div className="flex flex-wrap gap-1">
                                {items.map((skill, index) => (
                                    <span key={index} className="inline-block px-2 py-0.5 rounded bg-gray-100 text-[10px]" style={{ color: colors.text }}>
                                        {skill.name}{skill.level ? ` (${skill.level})` : ""}
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
                <h2 style={headingStyle}>{getSectionTitle("education", "Education")}</h2>
                <div className="space-y-4">
                    {data.education.map((edu, index) => (
                        <div key={index}>
                            <h3 style={subHeadingStyle}>{edu.degree}</h3>
                            {edu.field && <p className="text-xs mb-1" style={{ color: colors.secondary }}>{edu.field}</p>}
                            <div className="flex justify-between items-start mt-1">
                                <p className="text-xs font-medium" style={{ color: colors.accent }}>{edu.institution}</p>
                                <div className="text-[10px] text-right" style={{ color: colors.secondary }}>
                                    {formatDateRange(edu.start_date, edu.end_date, edu.is_current)}
                                </div>
                            </div>
                            {edu.location && <p className="text-[10px] text-gray-500">{edu.location}</p>}
                            {(edu.grade || edu.gpa) && <p className="text-[10px] mt-0.5">Grade: {edu.grade || edu.gpa}</p>}
                        </div>
                    ))}
                </div>
            </section>
        )
    );

    const renderSummary = () => (
        isVisible("summary") && data.professional_summary && (
            <section style={sectionContainerStyle}>
                <h2 style={{...headingStyle, fontSize: "1.125rem", textTransform: 'none', border: 'none', padding: 0}}>{getSectionTitle("summary", "Professional Summary")}</h2>
                <p className="leading-relaxed text-sm" style={{ color: colors.text }}>{data.professional_summary}</p>
            </section>
        )
    );

    const renderExperience = () => (
        data.experience && data.experience.length > 0 && isVisible("experience") && (
            <section style={sectionContainerStyle}>
                <h2 style={{...headingStyle, fontSize: "1.125rem", textTransform: 'none', border: 'none', padding: 0}}>{getSectionTitle("experience", "Professional Experience")}</h2>
                <div className="space-y-5">
                    {data.experience.map((exp, index) => {
                        const techList = getList(exp.technologies);
                        return (
                            <div key={index} className="relative pl-4 border-l-2" style={{ borderColor: colors.secondary + '40' }}>
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <h3 style={subHeadingStyle}>{exp.title || exp.position}</h3>
                                        <p className="text-sm font-medium" style={{ color: colors.accent }}>
                                            {exp.company}
                                            {exp.location && <span className="opacity-75 font-normal text-xs text-gray-500"> | {exp.location}</span>}
                                        </p>
                                    </div>
                                    <span style={metaStyle}>
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
                                            <span key={i} className="text-[10px] px-1.5 py-0.5 rounded border" style={{ borderColor: colors.secondary + "40", color: colors.secondary }}>
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
                <h2 style={{...headingStyle, fontSize: "1.125rem", textTransform: 'none', border: 'none', padding: 0}}>{getSectionTitle("projects", "Key Projects")}</h2>
                <div className="space-y-4">
                    {data.projects.map((proj, index) => {
                        const techList = getList(proj.technologies);
                        return (
                            <div key={index}>
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        <h3 style={subHeadingStyle}>{proj.name}</h3>
                                        {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600"><ExternalLink size={14} /></a>}
                                    </div>
                                    <span style={metaStyle}>{formatDateRange(proj.start_date, proj.end_date, proj.is_current)}</span>
                                </div>
                                {proj.type && <p className="text-xs mb-1" style={{ color: colors.accent }}>{proj.type}</p>}
                                {proj.description && <p className="text-sm leading-relaxed mt-1" style={{ color: colors.text }}>{proj.description}</p>}
                                {techList.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1.5">
                                        {techList.map((tech, i) => (
                                            <span key={i} className="text-[10px] px-1.5 py-0.5 rounded border" style={{ borderColor: colors.secondary + "40", color: colors.secondary }}>
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
                <h2 style={headingStyle}>{getSectionTitle("certifications", "Certifications")}</h2>
                 <div className="space-y-3">
                    {data.certifications.map((cert, index) => (
                         <div key={index} className="mb-2">
                             <div className="flex items-start justify-between">
                                <h3 className="font-semibold text-xs" style={{ color: colors.primary }}>{cert.name}</h3>
                                <span className="text-[10px] text-gray-500">{formatDate(cert.date)}</span>
                             </div>
                             {cert.issuer && <div className="text-xs" style={{ color: colors.secondary }}>{cert.issuer}</div>}
                         </div>
                    ))}
                 </div>
            </section>
        )
    );

    const renderLanguages = () => (
        data.languages && data.languages.length > 0 && isVisible("languages") && (
             <section style={sectionContainerStyle}>
                <h2 style={headingStyle}>{getSectionTitle("languages", "Languages")}</h2>
                <div className="space-y-1 text-xs">
                    {data.languages.map((lang, index) => (
                         <div key={index} className="flex justify-between">
                            <span style={{ color: colors.primary }}>
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
                <h2 style={headingStyle}>{getSectionTitle("achievements", "Achievements")}</h2>
                <ul className="list-disc pl-3 text-xs space-y-2" style={{ color: colors.text }}>
                    {data.achievements.map((item, index) => (
                        <li key={index}>
                             {typeof item === 'string' ? item : (
                                <span>
                                    <span className="font-semibold" style={{ color: colors.primary }}>{item.title}</span>
                                    {item.date && <span className="opacity-70 ml-1">({formatDate(item.date)})</span>}
                                    {item.description && <span className="block mt-0.5 opacity-90">{item.description}</span>}
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
                <h2 style={headingStyle}>{getSectionTitle("volunteer", "Volunteer")}</h2>
                 <div className="space-y-3">
                    {data.volunteer_experience.map((vol, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-xs" style={{ color: colors.primary }}>{vol.role}</h3>
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

    const renderCustomSection = (section) => {
        if (!section || !section.items || section.items.length === 0 || !isVisible(section.id)) return null;
        return (
            <section key={section.id} style={sectionContainerStyle}>
                <h2 style={headingStyle}>{section.title}</h2>
                <div className="space-y-3">
                    {section.items.map((item, i) => (
                        <div key={i}>
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-xs" style={{ color: colors.primary }}>{item.title}</h3>
                                {item.date && <div className="text-[10px] text-gray-500">{item.date}</div>}
                            </div>
                            {item.subtitle && <p className="text-[10px] italic" style={{ color: colors.accent }}>{item.subtitle}</p>}
                            {item.description && <p className="text-xs leading-relaxed mt-1" style={{ color: colors.text }}>{item.description}</p>}
                        </div>
                    ))}
                </div>
            </section>
        );
    };

    // Helper
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
            case "personal": return renderContact();
            case "certifications": return renderCertifications();
            case "languages": return renderLanguages();
            case "achievements": return renderAchievements();
            case "volunteer": return renderVolunteer();
            default: return null;
        }
    };

    // Columns
    const defaultOrder = ["skills", "education", "experience", "projects", "summary", "certifications", "languages", "achievements", "volunteer"];
    let finalOrder = section_order.length > 0 ? section_order : defaultOrder;
     // ensure all sections including custom
    const customSectionIds = data.custom_sections?.map(s => `custom_${s.id}`) || [];
    const allIds = [...defaultOrder, ...customSectionIds];
    const missingSections = allIds.filter(id => !finalOrder.includes(id));
    finalOrder = [...finalOrder, ...missingSections];

    // For Image Template, we typically use the sidebar for:
    // Image, Contact, Skills, Education, Languages, Certifications
    // Main content: Summary, Experience, Projects, Volunteer, Achievements, Custom
    
    // We can use the user's order to determine left/right if we want, but better to stick to a layout unless we implement full 2-col drag drop.
    // Let's bucket them like ProfessionalTemplate.
    
    const sideIds = ["skills", "education", "personal", "languages", "certifications"];
    const mainIds = ["summary", "experience", "projects", "achievements", "volunteer", ...customSectionIds];
    
    // Dynamically split finalOrder into Left/Right based on these buckets
    // If a section is in finalOrder, we check if it belongs to left or right groups.
    // However, if the user moves "Education" to the very bottom of section_order, it should still be in the sidebar but at the bottom of the sidebar?
    // Or does section_order imply a linear flow?
    // In multi-column, section_order defines the SEQUENCE. We can separate that sequence into two streams.
    
    const currentLeftIds = finalOrder.filter(id => sideIds.includes(id) && !id.startsWith("custom_")); // Custom sections default to main?
    // Actually, let's allow custom sections to be in main for now.
    const currentRightIds = finalOrder.filter(id => mainIds.includes(id) || id.startsWith("custom_"));

    return (
        <div className="bg-white min-h-[1000px] relative" style={{ fontFamily: containerStyle.fontFamily }}>
            {/* Top Bar */}
            <div className="h-2 w-full absolute top-0 left-0" style={{ backgroundColor: colors.accent }}></div>

            <div style={containerStyle}>
                {layout.columns === 1 ? (
                     <div className="space-y-6">
                          {getImageSrc() && (
                             <div className="mb-6 w-32 h-32 mx-auto">
                                 <img src={getImageSrc()} alt="Profile" className="w-full h-full object-cover rounded-full shadow-md" />
                             </div>
                         )}
                        {/* Header Info - Center format for single column */}
                        <header className="text-center pb-6 border-b" style={{ borderColor: colors.secondary }}>
                            <h1 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>{data.personal_info?.full_name || "Your Name"}</h1>
                            {data.personal_info?.profession && <p className="text-lg font-medium" style={{ color: colors.secondary }}>{data.personal_info.profession}</p>}
                        </header>
                        {/* Contact/Personal is now in the loop if in section_order */}
                        {finalOrder.map(id => renderSection(id))}
                     </div>
                ) : (
                    <div className="grid grid-cols-12 gap-8">
                         {/* Sidebar (3 cols) */}
                        <div className="col-span-3 space-y-6 border-r pr-4" style={{ borderColor: colors.secondary + '20' }}>
                            {getImageSrc() && (
                                <div className="mb-6">
                                    <img src={getImageSrc()} alt="Profile" className="w-full aspect-square object-cover rounded-lg shadow-md" />
                                </div>
                            )}
                            {/* Contact is now part of the loop via 'personal' ID */}
                            {currentLeftIds.map(id => renderSection(id))}
                        </div>

                         {/* Main (9 cols) */}
                        <div className="col-span-9 space-y-6">
                            <header className="pb-6 border-b" style={{ borderColor: colors.secondary }}>
                                <h1 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>{data.personal_info?.full_name || "Your Name"}</h1>
                                {data.personal_info?.profession && <p className="text-lg font-medium" style={{ color: colors.secondary }}>{data.personal_info.profession}</p>}
                            </header>

                            {currentRightIds.map(id => renderSection(id))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfessionalImageTemplate;

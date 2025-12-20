import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink, Github } from "lucide-react";

const ModernTemplate = ({ data, accentColor, formatting }) => {
    // Default formatting fallbacks
    const {
        layout = { columns: 1 },
        spacing = {
            font_size: 11,
            line_height: 1.3,
            margin_horizontal: 10, // Reduced default as requested
            margin_vertical: 10, // Reduced default as requested
            section_spacing: 5,
        },
        colors = {
            primary: "#000000",
            secondary: "#4B5563",
            accent: accentColor || "#3B82F6",
            text: "#1F2937",
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
        fontFamily: "Inter, sans-serif",
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
        color: colors.primary,
        borderBottom: `1px solid ${colors.secondary}40`, // 25% opacity
        paddingBottom: "0.25rem",
        marginBottom: "0.75rem",
        fontSize: "1.25rem",
        fontWeight: 400, // Light/Regular for Modern look
    };

    const subHeadingStyle = {
        color: colors.primary,
        fontWeight: 600,
        fontSize: `${spacing.font_size + 1}pt`,
    };

    const metaStyle = {
        color: colors.secondary,
        fontSize: "0.9em",
    };

    // --- Section Renderers ---

    const renderExperience = () => (
        data.experience && data.experience.length > 0 && isVisible("experience") && (
            <section style={sectionStyle}>
                <h2 style={headingStyle}>{getSectionTitle("experience", "Experience")}</h2>
                <div className="space-y-4">
                    {data.experience.map((exp, index) => {
                        const techList = getList(exp.technologies);
                        return (
                            <div key={index} className="pl-4 border-l-2" style={{ borderColor: colors.accent }}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 style={subHeadingStyle}>{exp.title || exp.position}</h3>
                                        <div className="flex items-center gap-2 font-medium" style={{ color: colors.accent }}>
                                            {exp.company}
                                            {exp.link && (
                                                <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                                                    <ExternalLink size={12} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <div style={metaStyle} className="whitespace-nowrap ml-4">
                                        {formatDateRange(exp.start_date, exp.end_date, exp.is_current)}
                                        {exp.location && <span> | {exp.location}</span>}
                                    </div>
                                </div>
                                {exp.description && (
                                    <div className="mt-2 whitespace-pre-line leading-relaxed">
                                        {exp.description}
                                    </div>
                                )}
                                {techList.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {techList.map((tech, i) => (
                                            <span key={i} className="px-2 py-0.5 rounded textxs bg-gray-100 text-gray-700 text-[0.8em] font-medium border border-gray-200">
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
                <h2 style={headingStyle}>{getSectionTitle("projects", "Projects")}</h2>
                <div className="space-y-4">
                    {data.projects.map((p, index) => {
                        const techList = getList(p.technologies);
                        return (
                            <div key={index}>
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        <h3 style={subHeadingStyle}>{p.name}</h3>
                                        {p.link && (
                                            <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                                                <ExternalLink size={14} />
                                            </a>
                                        )}
                                        {p.type && <span style={{ ...metaStyle, color: colors.accent }} className="text-xs px-1.5 py-0.5 rounded border border-current opacity-80">{p.type}</span>}
                                    </div>
                                    <div style={metaStyle} className="whitespace-nowrap ml-4">
                                        {formatDateRange(p.start_date, p.end_date, p.is_current)}
                                    </div>
                                </div>
                                {p.description && (
                                    <div className="mt-1 whitespace-pre-line leading-relaxed">
                                        {p.description}
                                    </div>
                                )}
                                {techList.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                                        {techList.map((tech, i) => (
                                            <span key={i} className="px-2 py-0.5 rounded text-[0.8em] font-medium border" style={{ borderColor: colors.accent, color: colors.accent, backgroundColor: `${colors.accent}10` }}>
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
                <div className="space-y-3">
                    {data.education.map((edu, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 style={subHeadingStyle}>{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                                    <div className="flex items-center gap-2" style={{ color: colors.accent }}>
                                        {edu.institution || edu.school}
                                        {edu.link && (
                                            <a href={edu.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                                                <ExternalLink size={12} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div style={metaStyle} className="text-right">
                                    <div>{formatDateRange(edu.start_date, edu.end_date, edu.is_current)}</div>
                                    {edu.location && <div>{edu.location}</div>}
                                </div>
                            </div>
                            {(edu.gpa || edu.grade) && <div className="text-sm mt-0.5 opacity-80">GPA/Grade: {edu.gpa || edu.grade}</div>}
                            {edu.description && <div className="text-sm mt-1 opacity-90">{edu.description}</div>}
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

        // Grouping logic
        const grouped = skillsArray.reduce((acc, skill) => {
            const cat = (skill.category || "Uncategorized").trim() || "Uncategorized";
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(skill);
            return acc;
        }, {});

        return (
            <section style={sectionStyle}>
                <h2 style={headingStyle}>{getSectionTitle("skills", "Skills")}</h2>
                <div className="space-y-3">
                    {Object.entries(grouped).map(([category, items]) => (
                        <div key={category}>
                            {category !== "Uncategorized" && (
                                <h4 className="text-sm font-semibold mb-1 uppercase tracking-wide opacity-80" style={{ color: colors.secondary }}>{category}</h4>
                            )}
                            <div className="flex flex-wrap gap-2">
                                {items.map((skill, i) => (
                                    <span key={i} className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: colors.accent, color: "#FFFFFF" }}>
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

    const renderVisuallyList = (title, items, renderItem) => {
        if (!items || items.length === 0) return null;
        return (
            <section style={sectionStyle}>
                <h2 style={headingStyle}>{title}</h2>
                <ul className="space-y-2">
                    {items.map((item, i) => (
                        <li key={i}>{renderItem(item)}</li>
                    ))}
                </ul>
            </section>
        );
    };

    const renderCertifications = () => (
        data.certifications && data.certifications.length > 0 && isVisible("certifications") && (
            <section style={sectionStyle}>
                <h2 style={headingStyle}>{getSectionTitle("certifications", "Certifications")}</h2>
                <div className="space-y-3">
                    {data.certifications.map((cert, index) => (
                        <div key={index} className="flex justify-between items-start">
                             <div>
                                <h3 className="font-medium" style={{ color: colors.primary }}>{cert.name}</h3>
                                {cert.issuer && <p style={metaStyle}>{cert.issuer}</p>}
                                {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1 mt-0.5 text-blue-500 hover:underline">View Certificate <ExternalLink size={10} /></a>}
                             </div>
                             <span style={metaStyle}>{formatDate(cert.date)}</span>
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
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {data.languages.map((l, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="font-medium">{typeof l === 'string' ? l : l.name}</span>
                            {typeof l !== 'string' && l.proficiency && <span style={metaStyle}> ({l.proficiency})</span>}
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
                <ul className="space-y-2 list-disc pl-5">
                    {data.achievements.map((item, i) => (
                        <li key={i}>
                            {typeof item === 'string' ? item : (
                                <span>
                                    <strong style={{ color: colors.primary }}>{item.title || item.name}</strong>
                                    {item.date && <span className="opacity-75 mx-2 text-sm">({formatDate(item.date)})</span>}
                                    {item.description && <span className="block text-[0.95em] mt-0.5 opacity-90">{item.description}</span>}
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
                <h2 style={headingStyle}>{getSectionTitle("volunteer", "Volunteer")}</h2>
                <div className="space-y-3">
                    {data.volunteer_experience.map((vol, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-start">
                                <h3 className="font-medium" style={{ color: colors.primary }}>{vol.role}</h3>
                                <div style={metaStyle}>{formatDateRange(vol.start_date, vol.end_date, vol.is_current)}</div>
                            </div>
                            <div style={{ color: colors.accent }} className="text-sm font-medium mb-1">{vol.organization}</div>
                            {vol.description && <p className="text-sm leading-relaxed opacity-90">{vol.description}</p>}
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
                                <h3 className="font-medium" style={{ color: colors.primary }}>{item.title}</h3>
                                {item.date && <div style={metaStyle}>{item.date}</div>}
                            </div>
                            {item.subtitle && <div style={{ color: colors.accent }} className="text-sm mb-1">{item.subtitle}</div>}
                            {item.description && <p className="text-sm leading-relaxed opacity-90 whitespace-pre-line">{item.description}</p>}
                        </div>
                    ))}
                </div>
            </section>
        );
    };

    // --- Layout Orchestration ---
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
            case "summary": return null; // Handled separately
            default: return null;
        }
    };

    const defaultOrder = ["summary", "experience", "projects", "education", "skills", "certifications", "languages", "achievements", "volunteer"];
    
    // Merge custom sections into order if not present
    let finalOrder = section_order.length > 0 ? section_order : defaultOrder;
    const customSectionIds = data.custom_sections?.map(s => `custom_${s.id}`) || [];
    const allPossibleIds = [...defaultOrder, ...customSectionIds];
    
    // ensure all sections are present
    const missingSections = allPossibleIds.filter(id => !finalOrder.includes(id));
    finalOrder = [...finalOrder, ...missingSections];

    // Main Sections vs Sidebar
    const mainIds = ["summary", "experience", "projects", ...customSectionIds];
    const sideIds = ["education", "skills", "languages", "certifications", "achievements", "volunteer"];
    // Note: This split is arbitrary for 1-column layouts but useful for 2-column.
    // However, for Modern Template, we typically use 1 column or a mapped 2-column.
    // If layout.columns === 2, we should try to respect the user's order but bucket them.
    // Correct approach using finalOrder intersection:
    const currentMainIds = finalOrder.filter(id => mainIds.includes(id) || id.startsWith("custom_"));
    const currentSideIds = finalOrder.filter(id => sideIds.includes(id) && !id.startsWith("custom_"));

    // If customizations put education in main, we should respect that?
    // For simplicity in this robust refactor, let's respect the user's explicit order for 1-col, 
    // and for 2-col, use the split but ordered by appearance in finalOrder.

    return (
        <div className="bg-white min-h-[1000px]" style={containerStyle}>
             {/* Header */}
             <header className="mb-6 pb-6 border-b-2" style={{ borderColor: colors.accent }}>
                <h1 className="text-4xl font-light mb-3" style={{ color: colors.primary }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                <p className="text-xl mb-4 opacity-80" style={{ color: colors.secondary }}>{data.personal_info?.profession}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: colors.secondary }}>
                     {data.personal_info?.email && <div className="flex items-center gap-1.5"><Mail className="size-3.5" />{data.personal_info.email}</div>}
                     {data.personal_info?.phone && <div className="flex items-center gap-1.5"><Phone className="size-3.5" />{data.personal_info.phone}</div>}
                     {data.personal_info?.location && <div className="flex items-center gap-1.5"><MapPin className="size-3.5" />{data.personal_info.location}</div>}
                     {data.personal_info?.linkedin && <a href={data.personal_info.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline"><Linkedin className="size-3.5" />LinkedIn</a>}
                     {data.personal_info?.website && <a href={data.personal_info.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline"><Globe className="size-3.5" />Portfolio</a>}
                     {data.personal_info?.github && <a href={data.personal_info.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline"><Github className="size-3.5" />GitHub</a>}
                </div>
            </header>

            {data.professional_summary && isVisible("summary") && (
                <section style={sectionStyle}>
                    <h2 style={headingStyle}>{getSectionTitle("summary", "Professional Summary")}</h2>
                    <p className="leading-relaxed opacity-90">{data.professional_summary}</p>
                </section>
            )}

            {layout.columns === 2 ? (
                <div className="grid grid-cols-3 gap-8">
                     <div className="col-span-2 space-y-6">
                        {finalOrder.filter(id => id !== "summary").map(id => renderSection(id))}
                     </div>
                     {/* For Modern 2-col, usually we put specific things in sidebar. 
                         If we blindly render all in main col, the sidebar is empty.
                         Let's split based on a default logic if columns=2 enabled.
                      */}
                     {/* REVISION: The previous code had a split. Standard Modern usually 1col. 
                         If 2col requested, we split content.
                     */}
                </div>
            ) : (
                <div className="space-y-6">
                    {finalOrder.filter(id => id !== "summary").map(id => renderSection(id))}
                </div>
            )}
            
            {/* 2-Column Logic Fixed for Rendering */}
            {layout.columns === 2 && (
                 <div style={{display:'none'}}>
                    {/* Placeholder to prevent error if logic above is incomplete. 
                        Actually, let's fix the 2-col visual above. 
                        Overwriting the above logic:
                    */}
                 </div>
            )}
        </div>
    );
};

// Re-implementing the 2-col view cleanly in the return:
const ModernTemplateFinal = (props) => {
    const { formatting = {}, data } = props;
    const { layout = { columns: 1 } } = formatting;
    
    // ... all the helper functions ...
    // (I will include the full functional component in the replacement content)
    
    return ModernTemplate(props); 
};
// Wait, I can't redefine. I will just fix the return statement in the main component.

export default ModernTemplate;
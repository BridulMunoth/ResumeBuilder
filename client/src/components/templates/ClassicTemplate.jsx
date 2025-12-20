import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink, Github, Calendar, Flag } from "lucide-react";

const ClassicTemplate = ({ data, accentColor, formatting }) => {
    // Formatting defaults
    const {
        layout = { columns: 1 },
        spacing = {
            font_size: 11,
            line_height: 1.3,
            margin_horizontal: 10,
            margin_vertical: 10,
            section_spacing: 6,
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

    // Helper to robustly get array from string or array
    const getList = (item) => {
        if (!item) return [];
        if (Array.isArray(item)) return item;
        if (typeof item === 'string') return item.split(',').map(i => i.trim()).filter(Boolean);
        return [];
    };
    
    // For achievements/highlights which might be newline separated strings
    const getListFromNewlines = (item) => {
        if (!item) return [];
        if (Array.isArray(item)) return item;
        if (typeof item === 'string') return item.split('\n').map(i => i.trim()).filter(Boolean);
        return [];
    };

    // Style objects
    const containerStyle = {
        fontFamily: "'Inter', sans-serif",
        color: colors.text,
        backgroundColor: colors.background,
        fontSize: `${spacing.font_size}pt`,
        lineHeight: spacing.line_height,
        padding: `${spacing.margin_vertical}mm ${spacing.margin_horizontal}mm`,
    };

    const sectionTitleStyle = {
        color: colors.accent,
        fontSize: "1.25em",
        fontWeight: "bold",
        marginBottom: "0.75rem",
        borderBottom: `2px solid ${colors.accent}`,
        paddingBottom: "0.25rem",
    };

    const sectionStyle = {
        marginBottom: `${spacing.section_spacing}mm`,
    };

    // Group skills
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

    const renderCustomSection = (section) => {
        if (!section || !section.items || section.items.length === 0 || !isVisible(section.id)) return null;
        return (
            <section key={section.id} style={sectionStyle}>
                <h2 style={sectionTitleStyle}>{section.title}</h2>
                <div className="space-y-4">
                    {section.items.map((item, i) => (
                        <div key={i}>
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg" style={{ color: colors.primary }}>{item.title}</h3>
                                {item.date && (
                                    <div className="text-sm font-medium" style={{ color: colors.secondary }}>
                                        {item.date}
                                    </div>
                                )}
                            </div>
                            {item.subtitle && (
                                <div className="font-medium" style={{ color: colors.secondary }}>{item.subtitle}</div>
                            )}
                            {item.description && <p className="mt-1 whitespace-pre-line">{item.description}</p>}
                        </div>
                    ))}
                </div>
            </section>
        );
    };

    // Section Renderers
    const renderSection = (id) => {
        if (id.startsWith("custom_")) {
            const sectionId = id.replace("custom_", "");
            const section = data.custom_sections?.find(s => s.id === sectionId);
            return renderCustomSection(section);
        }

        if (!isVisible(id)) return null;

        switch (id) {
            case "personal":
                return (
                    <header key="personal" className="text-center mb-6 pb-4 border-b-2" style={{ borderColor: colors.accent }}>
                        <h1 className="text-3xl font-bold mb-2" style={{ color: colors.accent }}>
                            {data.personal_info?.full_name || "Your Name"}
                        </h1>
                         {data.personal_info?.profession && (
                            <p className="text-xl font-medium mb-3" style={{ color: colors.secondary }}>{data.personal_info.profession}</p>
                        )}
                        <div className="flex flex-wrap justify-center gap-4 text-sm" style={{ color: colors.secondary }}>
                            {[
                                { val: data.personal_info?.email, icon: Mail },
                                { val: data.personal_info?.phone, icon: Phone },
                                { val: data.personal_info?.location, icon: MapPin },
                            ].map((item, i) => item.val && (
                                <div key={i} className="flex items-center gap-1">
                                    <item.icon className="size-3" />
                                    <span>{item.val}</span>
                                </div>
                            ))}
                            {[
                                { val: data.personal_info?.linkedin, icon: Linkedin },
                                { val: data.personal_info?.website, icon: Globe },
                                { val: data.personal_info?.github, icon: Github },
                            ].map((item, i) => item.val && (
                                <a key={i} href={item.val} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                                    <item.icon className="size-3" />
                                    <span className="break-all">{item.val}</span>
                                </a>
                            ))}
                        </div>
                    </header>
                );

            case "summary":
                if (!data.professional_summary) return null;
                return (
                    <section key="summary" style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>{getSectionTitle("summary", "PROFESSIONAL SUMMARY")}</h2>
                        <p className="whitespace-pre-line">{data.professional_summary}</p>
                    </section>
                );

            case "experience":
                if (!data.experience || data.experience.length === 0) return null;
                return (
                    <section key="experience" style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>{getSectionTitle("experience", "PROFESSIONAL EXPERIENCE")}</h2>
                        <div className="space-y-4">
                            {data.experience.map((exp, index) => {
                                const techs = getList(exp.technologies);
                                const achievements = getListFromNewlines(exp.achievements);
                                return (
                                    <div key={index} className="border-l-2 pl-4" style={{ borderColor: colors.accent }}>
                                        <div className="flex justify-between items-start mb-1">
                                            <div>
                                                <h3 className="font-bold text-lg" style={{ color: colors.primary }}>{exp.title}</h3>
                                                <div className="flex items-center gap-2 font-medium" style={{ color: colors.secondary }}>
                                                    <span>{exp.company}</span>
                                                    {exp.link && (
                                                        <a href={exp.link} target="_blank" rel="noopener noreferrer">
                                                            <ExternalLink size={12} />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-sm font-medium" style={{ color: colors.secondary }}>
                                                {formatDateRange(exp.start_date, exp.end_date, exp.is_current)}
                                            </div>
                                        </div>
                                        <div className="text-sm mb-2" style={{ color: colors.secondary }}>
                                            {[exp.employment_type, exp.location].filter(Boolean).join(" • ")}
                                        </div>
                                        {exp.description && <p className="mb-2 whitespace-pre-line">{exp.description}</p>}
                                        {techs.length > 0 && (
                                            <div className="text-sm mb-2">
                                                <span className="font-semibold">Tech: </span>
                                                {techs.join(", ")}
                                            </div>
                                        )}
                                        {achievements.length > 0 && (
                                            <ul className="list-disc ml-4 space-y-1">
                                                {achievements.map((a, i) => <li key={i}>{a}</li>)}
                                            </ul>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                );

            case "projects":
                if (!data.projects || data.projects.length === 0) return null;
                return (
                    <section key="projects" style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>{getSectionTitle("projects", "PROJECTS")}</h2>
                        <div className="space-y-4">
                            {data.projects.map((proj, index) => {
                                const techs = getList(proj.technologies);
                                const highlights = getListFromNewlines(proj.highlights);
                                return (
                                    <div key={index}>
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-lg" style={{ color: colors.primary }}>{proj.name}</h3>
                                                {proj.link && (
                                                    <a href={proj.link} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink size={14} />
                                                    </a>
                                                )}
                                            </div>
                                            <div className="text-sm font-medium whitespace-nowrap" style={{ color: colors.secondary }}>
                                                 {formatDateRange(proj.start_date, proj.end_date)}
                                            </div>
                                        </div>
                                        {(proj.role || proj.type) && (
                                            <div className="text-sm font-medium mb-1" style={{ color: colors.accent }}>
                                                {[proj.role, proj.type].filter(Boolean).join(" • ")}
                                            </div>
                                        )}
                                        {proj.description && <p className="mb-2 whitespace-pre-line">{proj.description}</p>}
                                        {techs.length > 0 && (
                                            <div className="text-sm mb-2">
                                                <span className="font-semibold">Tech: </span>
                                                {techs.join(", ")}
                                            </div>
                                        )}
                                        {highlights.length > 0 && (
                                            <ul className="list-disc ml-4 space-y-1">
                                                {highlights.map((h, i) => <li key={i}>{h}</li>)}
                                            </ul>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                );

            case "education":
                 if (!data.education || data.education.length === 0) return null;
                 return (
                    <section key="education" style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>{getSectionTitle("education", "EDUCATION")}</h2>
                        <div className="space-y-4">
                            {data.education.map((edu, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg" style={{ color: colors.primary }}>
                                                {[edu.level || edu.degree, edu.program].filter(Boolean).join(" - ")}
                                            </h3>
                                            <div className="font-medium" style={{ color: colors.secondary }}>
                                                {edu.institution || edu.school}
                                                {edu.location && ` • ${edu.location}`}
                                                {edu.board_university && ` • ${edu.board_university}`}
                                            </div>
                                        </div>
                                        <div className="text-sm font-medium text-right" style={{ color: colors.secondary }}>
                                            {formatDateRange(edu.start_date, edu.end_date, edu.is_current)}
                                        </div>
                                    </div>
                                    {(edu.score || edu.grade || edu.gpa || edu.percentage) && (
                                        <div className="text-sm mt-1">
                                             <span className="font-semibold">Grade: </span>
                                             {edu.score || edu.grade || edu.gpa || edu.percentage}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                 );

            case "skills":
                if (skillsArray.length === 0) return null;
                return (
                    <section key="skills" style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>{getSectionTitle("skills", "CORE SKILLS")}</h2>
                        <div className="grid grid-cols-1 gap-3">
                            {groupedEntries.map(([category, items]) => (
                                <div key={category}>
                                    <span className="font-semibold uppercase text-xs tracking-wider" style={{ color: colors.secondary }}>{category}: </span>
                                    <span style={{ color: colors.text }}>
                                        {items.map(s => s.name).join(", ")}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                );

            case "certifications":
                if (!data.certifications || data.certifications.length === 0) return null;
                return (
                    <section key="certifications" style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>{getSectionTitle("certifications", "CERTIFICATIONS")}</h2>
                         <ul className="list-disc ml-4 space-y-1">
                            {data.certifications.map((c, i) => (
                                <li key={i}>
                                    <span className="font-medium">{c.name}</span>
                                    {c.issuer && ` - ${c.issuer}`}
                                    {c.date && ` (${formatDate(c.date)})`}
                                </li>
                            ))}
                        </ul>
                    </section>
                );

            case "languages":
                if (!data.languages || data.languages.length === 0) return null;
                return (
                     <section key="languages" style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>{getSectionTitle("languages", "LANGUAGES")}</h2>
                        <div className="flex flex-wrap gap-4">
                             {data.languages.map((l, i) => (
                                <span key={i}>
                                    <span className="font-medium">{l.name || l}</span>
                                    {l.proficiency || l.level ? ` (${l.proficiency || l.level})` : ""}
                                </span>
                             ))}
                        </div>
                     </section>
                );

            case "achievements":
                if (!data.achievements || data.achievements.length === 0) return null;
                return (
                    <section key="achievements" style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>{getSectionTitle("achievements", "ACHIEVEMENTS")}</h2>
                         <ul className="list-disc ml-4 space-y-1">
                            {data.achievements.map((a, i) => (
                                <li key={i}>
                                     {typeof a === 'string' ? a : (a.title || a.name)}
                                     {a.date && ` - ${formatDate(a.date)}`}
                                     {a.issuer && ` (${a.issuer})`}
                                </li>
                            ))}
                        </ul>
                    </section>
                );
            case "volunteer":
                if (!data.volunteer_experience || data.volunteer_experience.length === 0) return null;
                return (
                    <section key="volunteer" style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>{getSectionTitle("volunteer", "VOLUNTEER EXPERIENCE")}</h2>
                        <div className="space-y-4">
                            {data.volunteer_experience.map((v, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold" style={{ color: colors.primary }}>{v.role}</h3>
                                        <div className="text-sm" style={{ color: colors.secondary }}>
                                             {formatDateRange(v.start_date, v.end_date, v.is_current)}
                                        </div>
                                    </div>
                                    <div className="font-medium" style={{ color: colors.secondary }}>{v.organization}</div>
                                    {v.description && <p className="mt-1">{v.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                );

            case "hobbies":
                if (!data.hobbies || data.hobbies.length === 0) return null;
                return (
                    <section key="hobbies" style={sectionStyle}>
                        <h2 style={sectionTitleStyle}>{getSectionTitle("hobbies", "INTERESTS")}</h2>
                        <p>{data.hobbies.join(", ")}</p>
                    </section>
                );

            default:
                return null;
        }
    };

    // Default order + merge with user order
    const defaultOrder = [
        "personal",
        "summary",
        "experience",
        "education",
        "projects",
        "skills",
        "certifications",
        "languages",
        "achievements",
        "volunteer",
        "hobbies"
    ];

    let finalOrder = section_order.length > 0 ? section_order : defaultOrder;
     const customSectionIds = data.custom_sections?.map(s => `custom_${s.id}`) || [];
    const allIds = [...defaultOrder, ...customSectionIds];
    const missingSections = allIds.filter(id => !finalOrder.includes(id));
    finalOrder = [...finalOrder, ...missingSections];


    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none" style={containerStyle}>
            {finalOrder.map(id => renderSection(id))}
        </div>
    );
};

export default ClassicTemplate;
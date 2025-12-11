import { ExternalLink, Mail, Phone, MapPin, Linkedin, Globe, Github, Calendar, Flag } from "lucide-react";

const MinimalTemplate = ({ data, accentColor }) => {
    // Safe date formatter: avoid "Invalid Date"
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

    // Group skills by category for cleaner display
    const skillsArray = Array.isArray(data?.skills)
        ? data.skills
            .map((s) => (typeof s === "string" ? { name: s } : s))
            .filter((s) => s && s.name)
        : [];
    const groupedSkills = skillsArray.reduce((acc, s) => {
        const cat = (s.category || "Other").trim() || "Other";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(s);
        return acc;
    }, {});
    const groupedEntries = Object.entries(groupedSkills).sort(([a], [b]) => a.localeCompare(b));

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-light">
            {/* Header */}
            <header className="mb-10">
                <h1 className="text-4xl font-thin mb-4 tracking-wide">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    {data.personal_info?.email && (
                        <span className="inline-flex items-center gap-2"><Mail className="size-4" />{data.personal_info.email}</span>
                    )}
                    {data.personal_info?.phone && (
                        <span className="inline-flex items-center gap-2"><Phone className="size-4" />{data.personal_info.phone}</span>
                    )}
                    {data.personal_info?.location && (
                        <span className="inline-flex items-center gap-2"><MapPin className="size-4" />{data.personal_info.location}</span>
                    )}
                    {data.personal_info?.linkedin && (
                        <a href={data.personal_info.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 break-all"><Linkedin className="size-4" /><span>{data.personal_info.linkedin}</span></a>
                    )}
                    {data.personal_info?.website && (
                        <a href={data.personal_info.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 break-all"><Globe className="size-4" /><span>{data.personal_info.website}</span></a>
                    )}
                    {data.personal_info?.github && (
                        <a href={data.personal_info.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 break-all"><Github className="size-4" /><span>{data.personal_info.github}</span></a>
                    )}
                    {data.personal_info?.date_of_birth && (
                        <span className="inline-flex items-center gap-2"><Calendar className="size-4" />{data.personal_info.date_of_birth}</span>
                    )}
                    {data.personal_info?.nationality && (
                        <span className="inline-flex items-center gap-2"><Flag className="size-4" />{data.personal_info.nationality}</span>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-10">
                    <p className=" text-gray-700">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Experience
                    </h2>

                    <div className="space-y-6">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-medium">{exp.title}</h3>
                                    {(() => {
                                        const range = formatDateRange(exp.start_date, exp.end_date, exp.is_current);
                                        return range ? (
                                            <span className="text-sm text-gray-500">{range}</span>
                                        ) : null;
                                    })()}
                                </div>
                                <p className="text-gray-600 mb-2">{exp.company}</p>
                                {exp.description && (
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Projects
                    </h2>

                    <div className="space-y-4">
                        {data.projects.map((proj, index) => (
                            <div key={index} className="flex flex-col gap-2 justify-between items-baseline">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-medium ">{proj.name}</h3>
                                    {proj.link && (
                                        <a 
                                            href={proj.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <ExternalLink size={16} />
                                        </a>
                                    )}
                                </div>
                                {proj.type && (
                                    <p className="text-sm text-gray-500" style={{ color: accentColor }}>{proj.type}</p>
                                )}
                                <p className="text-gray-600">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Education
                    </h2>

                    <div className="space-y-4">
                        {data.education.map((edu, index) => {
                            const range = formatDateRange(edu.start_date, edu.end_date, edu.is_current);
                            const gradeText = edu.grade || edu.gpa || edu.percentage || edu.score;
                            return (
                                <div key={index} className="flex justify-between items-baseline">
                                    <div>
                                        <h3 className="font-medium">
                                            {[(edu.level || edu.degree), edu.program].filter(Boolean).join(" • ")}{edu.field && ` in ${edu.field}`}
                                        </h3>
                                        <p className="text-gray-600 flex items-center gap-2">
                                            <span>{edu.institution}</span>
                                            {edu.link && (
                                                <a
                                                    href={edu.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                                    title="Open link"
                                                >
                                                    <ExternalLink size={12} />
                                                </a>
                                            )}
                                        </p>
                                        {[edu.board_university, edu.location].filter(Boolean).length > 0 && (
                                            <p className="text-sm text-gray-500">{[edu.board_university, edu.location].filter(Boolean).join(" • ")}</p>
                                        )}
                                        {gradeText && (
                                            <p className="text-sm text-gray-500">Grade: {gradeText}</p>
                                        )}
                                    </div>
                                    {range && (
                                        <span className="text-sm text-gray-500">{range}</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Skills (grouped) */}
            {skillsArray.length > 0 && (
                <section>
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Skills
                    </h2>
                    <div className="space-y-2 text-gray-700">
                        {groupedEntries.map(([category, items]) => (
                            <div key={category}>
                                <h3 className="text-xs font-semibold uppercase tracking-widest" style={{ color: accentColor }}>
                                    {category}
                                </h3>
                                <div className="flex flex-wrap gap-3 mt-1">
                                    {items.map((s, idx) => (
                                        <span key={idx}>• {s.name}{s.level ? ` (${s.level})` : ""}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications */}
            {Array.isArray(data.certifications) && data.certifications.length > 0 && (
                <section className="mt-8">
                    <h2 className="text-sm uppercase tracking-widest mb-4 font-medium" style={{ color: accentColor }}>
                        Certifications
                    </h2>
                    <ul className="space-y-1 text-sm text-gray-700">
                        {data.certifications.map((c, i) => {
                            const title = typeof c === "string" ? c : (c?.name || c?.issuer || "");
                            return (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="font-medium">{title}</span>
                                    {c?.issuer && <span className="text-gray-600">– {c.issuer}</span>}
                                    {c?.link && (
                                        <a
                                            href={c.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-gray-600"
                                            title="Open link"
                                        >
                                            <ExternalLink size={14} />
                                        </a>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </section>
            )}

            {/* Languages */}
            {Array.isArray(data.languages) && data.languages.length > 0 && (
                <section className="mt-8">
                    <h2 className="text-sm uppercase tracking-widest mb-4 font-medium" style={{ color: accentColor }}>
                        Languages
                    </h2>
                    <div className="text-gray-700 flex flex-wrap gap-3 text-sm">
                        {data.languages.map((l, i) => {
                            const name = typeof l === "string" ? l : l?.name || "";
                            const level = typeof l === "string" ? "" : l?.level || "";
                            return <span key={i}>• {name}{level ? ` (${level})` : ""}</span>;
                        })}
                    </div>
                </section>
            )}

            {/* Achievements */}
            {Array.isArray(data.achievements) && data.achievements.length > 0 && (
                <section className="mt-8">
                    <h2 className="text-sm uppercase tracking-widest mb-4 font-medium" style={{ color: accentColor }}>
                        Achievements
                    </h2>
                    <div className="space-y-3 text-sm text-gray-700">
                        {data.achievements.map((a, i) => {
                            if (typeof a === "string") return <div key={i}>• {a}</div>;
                            const title = a?.title || a?.name || "";
                            const org = a?.organization || "";
                            const range = formatDateRange(a?.start_date, a?.end_date, a?.is_current);
                            return (
                                <div key={i}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold text-gray-900">{title}</p>
                                            {org && <p className="text-gray-700">{org}</p>}
                                        </div>
                                        {range && <span className="text-xs text-gray-600">{range}</span>}
                                    </div>
                                    {a?.description && (
                                        <p className="mt-1 whitespace-pre-line">{a.description}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Volunteer Experience */}
            {Array.isArray(data.volunteer_experience) && data.volunteer_experience.length > 0 && (
                <section className="mt-8">
                    <h2 className="text-sm uppercase tracking-widest mb-4 font-medium" style={{ color: accentColor }}>
                        Volunteer Experience
                    </h2>
                    <div className="space-y-3 text-sm text-gray-700">
                        {data.volunteer_experience.map((v, idx) => {
                            const range = formatDateRange(v?.start_date, v?.end_date, v?.is_current);
                            return (
                                <div key={idx} className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-gray-900">{v?.role || v?.title}</p>
                                        <p className="text-gray-700">{v?.organization || v?.company}</p>
                                        {v?.description && <p className="whitespace-pre-line">{v.description}</p>}
                                    </div>
                                    {range && <span className="text-xs text-gray-600">{range}</span>}
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Interests / Hobbies */}
            {Array.isArray(data.hobbies) && data.hobbies.length > 0 && (
                <section className="mt-8">
                    <h2 className="text-sm uppercase tracking-widest mb-4 font-medium" style={{ color: accentColor }}>
                        Interests
                    </h2>
                    <p className="text-gray-700 text-sm">
                        {data.hobbies
                            .map((h) => (typeof h === "string" ? h : h?.name || ""))
                            .filter(Boolean)
                            .join(", ")}
                    </p>
                </section>
            )}

            {/* Custom Sections */}
            {Array.isArray(data.custom_sections) && data.custom_sections.length > 0 && (
                <section className="mt-8">
                    <h2 className="text-sm uppercase tracking-widest mb-4 font-medium" style={{ color: accentColor }}>
                        Additional Sections
                    </h2>
                    <div className="space-y-4 text-sm text-gray-700">
                        {data.custom_sections.map((sec, i) => (
                            <div key={i}>
                                {sec?.title && <h3 className="font-semibold text-gray-900 mb-1">{sec.title}</h3>}
                                {Array.isArray(sec?.items) && sec.items.length > 0 && (
                                    <ul className="list-disc ml-5 space-y-1">
                                        {sec.items.map((it, idx) => (
                                            <li key={idx}>{typeof it === "string" ? it : it?.name || ""}</li>
                                        ))}
                                    </ul>
                                )}
                                {sec?.description && !Array.isArray(sec?.items) && (
                                    <p className="whitespace-pre-line">{sec.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default MinimalTemplate;
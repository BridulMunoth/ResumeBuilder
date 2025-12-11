import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink, Github, Calendar, Flag } from "lucide-react";

const CreativeTemplate = ({ data, accentColor }) => {
    // Safe date formatter: no "Invalid Date"
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
        <div className="max-w-5xl mx-auto bg-white text-gray-900">
            {/* Creative Header */}
            <div className="relative">
                <div className="h-32" style={{ backgroundColor: accentColor, opacity: 0.9 }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
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

            <div className="p-10">
                {/* Contact Info Bar */}
                <div className="flex flex-wrap justify-center gap-6 mb-10 pb-6 border-b-2 border-gray-200 text-sm">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-2">
                            <Mail className="size-4" style={{ color: accentColor }} />
                            <span className="text-gray-700">{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-2">
                            <Phone className="size-4" style={{ color: accentColor }} />
                            <span className="text-gray-700">{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-2">
                            <MapPin className="size-4" style={{ color: accentColor }} />
                            <span className="text-gray-700">{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <a href={data.personal_info.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <Linkedin className="size-4" style={{ color: accentColor }} />
                            <span className="text-gray-700 break-all text-xs">{data.personal_info.linkedin}</span>
                        </a>
                    )}
                    {data.personal_info?.website && (
                        <a href={data.personal_info.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <Globe className="size-4" style={{ color: accentColor }} />
                            <span className="text-gray-700 break-all text-xs">{data.personal_info.website}</span>
                        </a>
                    )}
                    {data.personal_info?.github && (
                        <a href={data.personal_info.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <Github className="size-4" style={{ color: accentColor }} />
                            <span className="text-gray-700 break-all text-xs">{data.personal_info.github}</span>
                        </a>
                    )}
                    {data.personal_info?.date_of_birth && (
                        <div className="flex items-center gap-2">
                            <Calendar className="size-4" style={{ color: accentColor }} />
                            <span className="text-gray-700 text-xs">{data.personal_info.date_of_birth}</span>
                        </div>
                    )}
                    {data.personal_info?.nationality && (
                        <div className="flex items-center gap-2">
                            <Flag className="size-4" style={{ color: accentColor }} />
                            <span className="text-gray-700 text-xs">{data.personal_info.nationality}</span>
                        </div>
                    )}
                </div>

                {/* Professional Summary */}
                {data.professional_summary && (
                    <section className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-1 w-16" style={{ backgroundColor: accentColor }}></div>
                            <h2 className="text-2xl font-bold uppercase tracking-wider" style={{ color: accentColor }}>
                                About
                            </h2>
                            <div className="flex-1 h-1" style={{ backgroundColor: accentColor }}></div>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-lg pl-20">
                            {data.professional_summary}
                        </p>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-10">
                    {/* Left Column */}
                    <div className="space-y-8">
                        {/* Experience */}
                        {data.experience && data.experience.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-1 w-12" style={{ backgroundColor: accentColor }}></div>
                                    <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: accentColor }}>
                                        Experience
                                    </h2>
                                </div>

                                <div className="space-y-6">
                                    {data.experience.map((exp, index) => (
                                        <div key={index} className="relative pl-6">
                                            <div className="absolute left-0 top-2 w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }}></div>
                                            <div className="border-l-2 pl-4" style={{ borderColor: accentColor }}>
                                                <div className="mb-2">
                                                    <h3 className="font-bold text-lg text-gray-900">{exp.title}</h3>
                                                    <p className="font-semibold text-sm" style={{ color: accentColor }}>
                                                        {exp.company}
                                                    </p>
                                                    {(() => {
                                                        const range = formatDateRange(exp.start_date, exp.end_date, exp.is_current);
                                                        return range ? (
                                                            <p className="text-xs text-gray-500 mt-1">{range}</p>
                                                        ) : null;
                                                    })()}
                                                </div>
                                                {exp.description && (
                                                    <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                                                        {exp.description}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Projects */}
                        {data.projects && data.projects.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-1 w-12" style={{ backgroundColor: accentColor }}></div>
                                    <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: accentColor }}>
                                        Projects
                                    </h2>
                                </div>

                                <div className="space-y-5">
                                    {data.projects.map((proj, index) => (
                                        <div key={index} className="border-l-4 pl-4" style={{ borderColor: accentColor }}>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-gray-900">{proj.name}</h3>
                                                {proj.link && (
                                                    <a
                                                        href={proj.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                                    >
                                                        <ExternalLink size={14} />
                                                    </a>
                                                )}
                                            </div>
                                            {(proj.type || proj.role) && (
                                                <p className="text-xs mb-2" style={{ color: accentColor }}>
                                                    {[proj.type, proj.role].filter(Boolean).join(" • ")}
                                                </p>
                                            )}
                                            {proj.description && (
                                                <p className="text-sm text-gray-700 leading-relaxed">
                                                    {proj.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Volunteer Experience */}
                        {data.volunteer_experience && data.volunteer_experience.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-1 w-12" style={{ backgroundColor: accentColor }}></div>
                                    <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: accentColor }}>
                                        Volunteer Experience
                                    </h2>
                                </div>

                                <div className="space-y-6">
                                    {data.volunteer_experience.map((exp, index) => (
                                        <div key={index} className="relative pl-6">
                                            <div className="absolute left-0 top-2 w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }}></div>
                                            <div className="border-l-2 pl-4" style={{ borderColor: accentColor }}>
                                                <div className="mb-2">
                                                    <h3 className="font-bold text-lg text-gray-900">{exp.title}</h3>
                                                    <p className="font-semibold text-sm" style={{ color: accentColor }}>
                                                        {exp.organization}
                                                    </p>
                                                    {(() => {
                                                        const range = formatDateRange(exp.start_date, exp.end_date, exp.is_current);
                                                        return range ? (
                                                            <p className="text-xs text-gray-500 mt-1">{range}</p>
                                                        ) : null;
                                                    })()}
                                                </div>
                                                {exp.description && (
                                                    <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                                                        {exp.description}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Education */}
                        {data.education && data.education.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-1 w-12" style={{ backgroundColor: accentColor }}></div>
                                    <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: accentColor }}>
                                        Education
                                    </h2>
                                </div>

                                <div className="space-y-5">
                                    {data.education.map((edu, index) => {
                                        const range = formatDateRange(edu.start_date, edu.end_date, edu.is_current);
                                        const gradeText = edu.grade || edu.gpa || edu.percentage || edu.score;
                                        return (
                                            <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                                <h3 className="font-bold text-gray-900">
                                                    {edu.degree}
                                                </h3>
                                                {edu.field && (
                                                    <p className="text-sm text-gray-600 mb-1">{edu.field}</p>
                                                )}
                                                <p className="font-semibold text-sm mb-2 flex items-center gap-2" style={{ color: accentColor }}>
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
                                                <div className="flex justify-between items-center text-xs text-gray-600">
                                                    {range && <span>{range}</span>}
                                                    {gradeText && <span>Grade: {gradeText}</span>}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {/* Skills - grouped by category */}
                        {skillsArray.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-1 w-12" style={{ backgroundColor: accentColor }}></div>
                                    <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: accentColor }}>
                                        Skills
                                    </h2>
                                </div>

                                <div className="space-y-4">
                                    {groupedEntries.map(([category, items]) => (
                                        <div key={category}>
                                            <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>
                                                {category}
                                            </h3>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {items.map((s, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-4 py-2 text-sm font-medium rounded-full text-white"
                                                        style={{ backgroundColor: accentColor }}
                                                    >
                                                        {s.name}{s.level ? ` (${s.level})` : ""}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Certifications */}
                        {Array.isArray(data.certifications) && data.certifications.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-1 w-12" style={{ backgroundColor: accentColor }}></div>
                                    <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: accentColor }}>
                                        Certifications
                                    </h2>
                                </div>

                                <ul className="space-y-2 text-sm text-gray-800">
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
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-1 w-12" style={{ backgroundColor: accentColor }}></div>
                                    <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: accentColor }}>
                                        Languages
                                    </h2>
                                </div>
                                <div className="flex flex-wrap gap-3 text-sm text-gray-800">
                                    {data.languages.map((l, i) => {
                                        const name = typeof l === "string" ? l : l?.name || "";
                                        const level = typeof l === "string" ? "" : l?.level || "";
                                        return (
                                            <span key={i}>• {name}{level ? ` (${level})` : ""}</span>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {/* Achievements */}
                        {Array.isArray(data.achievements) && data.achievements.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-1 w-12" style={{ backgroundColor: accentColor }}></div>
                                    <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: accentColor }}>
                                        Achievements
                                    </h2>
                                </div>
                                <div className="space-y-4 text-sm text-gray-800">
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
                                                    <div className="flex items-center gap-2">
                                                        {range && <span className="text-xs text-gray-600">{range}</span>}
                                                        {a?.link && (
                                                            <a
                                                                href={a.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-gray-400 hover:text-gray-600"
                                                                title="Open link"
                                                            >
                                                                <ExternalLink size={14} />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                                {a?.description && (
                                                    <p className="text-gray-700 mt-1 whitespace-pre-line">{a.description}</p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {/* Interests / Hobbies */}
                        {Array.isArray(data.hobbies) && data.hobbies.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-1 w-12" style={{ backgroundColor: accentColor }}></div>
                                    <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: accentColor }}>
                                        Interests
                                    </h2>
                                </div>
                                <p className="text-sm text-gray-800">
                                    {data.hobbies
                                        .map((h) => (typeof h === "string" ? h : h?.name || ""))
                                        .filter(Boolean)
                                        .join(", ")}
                                </p>
                            </section>
                        )}

                        {/* Custom Sections */}
                        {Array.isArray(data.custom_sections) && data.custom_sections.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-1 w-12" style={{ backgroundColor: accentColor }}></div>
                                    <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: accentColor }}>
                                        Additional Sections
                                    </h2>
                                </div>
                                <div className="space-y-5 text-sm text-gray-800">
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
                </div>
            </div>
        </div>
    );
}

export default CreativeTemplate;


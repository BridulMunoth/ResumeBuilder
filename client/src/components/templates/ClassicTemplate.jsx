import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink, Github, Calendar, Flag } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
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
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">
            {/* Header */}
            <header className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: accentColor }}>
                <h1 className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="size-4" />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="size-4" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="size-4" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <a href={data.personal_info.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                            <Linkedin className="size-4" />
                            <span className="break-all">{data.personal_info.linkedin}</span>
                        </a>
                    )}
                    {data.personal_info?.website && (
                        <a href={data.personal_info.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                            <Globe className="size-4" />
                            <span className="break-all">{data.personal_info.website}</span>
                        </a>
                    )}
                    {data.personal_info?.github && (
                        <a href={data.personal_info.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                            <Github className="size-4" />
                            <span className="break-all">{data.personal_info.github}</span>
                        </a>
                    )}
                    {data.personal_info?.date_of_birth && (
                        <div className="flex items-center gap-1">
                            <Calendar className="size-4" />
                            <span>{data.personal_info.date_of_birth}</span>
                        </div>
                    )}
                    {data.personal_info?.nationality && (
                        <div className="flex items-center gap-1">
                            <Flag className="size-4" />
                            <span>{data.personal_info.nationality}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
                        PROFESSIONAL SUMMARY
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{data.professional_summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                        PROFESSIONAL EXPERIENCE
                    </h2>

                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="border-l-3 pl-4" style={{ borderColor: accentColor }}>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                                        {exp.link && (
                                            <a
                                                href={exp.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                <ExternalLink size={14} />
                                            </a>
                                        )}
                                        <p className="text-gray-700 font-medium">{exp.company}</p>
                                        {[exp.employment_type, exp.location].filter(Boolean).length > 0 && (
                                            <p className="text-sm text-gray-600">{[exp.employment_type, exp.location].filter(Boolean).join(" • ")}</p>
                                        )}
                                    </div>
                                    <div className="text-right text-sm text-gray-600">
                                        {(() => {
                                            const range = formatDateRange(exp.start_date, exp.end_date, exp.is_current);
                                            return range ? <p>{range}</p> : null;
                                        })()}
                                    </div>
                                </div>
                                {exp.description && (
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {exp.description}
                                    </div>
                                )}
                                {(exp.technologies && exp.technologies.length > 0) && (
                                    <div className="text-xs text-gray-600 mt-1">Tech: {exp.technologies.join(", ")}</div>
                                )}
                                {(exp.achievements && exp.achievements.length > 0) && (
                                    <ul className="list-disc ml-5 mt-2 text-gray-700 text-sm">
                                        {exp.achievements.map((a, i) => (
                                            <li key={i}>{a}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                        PROJECTS
                    </h2>

                    <ul className="space-y-3 ">
                        {data.projects.map((proj, index) => (
                            <div key={index} className="flex justify-between items-start border-l-3 border-gray-300 pl-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <li className="font-semibold text-gray-800 ">{proj.name}</li>
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
                                    {(proj.type || proj.role) && (
                                        <p className="text-sm mb-1" style={{ color: accentColor }}>
                                            {[proj.type, proj.role].filter(Boolean).join(" • ")}
                                        </p>
                                    )}
                                    <p className="text-gray-600 whitespace-pre-line">{proj.description}</p>
                                    {(proj.technologies && proj.technologies.length > 0) && (
                                        <div className="text-xs text-gray-600 mt-1">Tech: {proj.technologies.join(", ")}</div>
                                    )}
                                    {(proj.highlights && proj.highlights.length > 0) && (
                                        <ul className="list-disc ml-5 mt-2 text-gray-700 text-sm">
                                            {proj.highlights.map((h, i) => (
                                                <li key={i}>{h}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </ul>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                        EDUCATION
                    </h2>

                    <div className="space-y-3">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {[
                                            (edu.level || edu.degree),
                                            edu.program
                                        ].filter(Boolean).join(" • ")}
                                        {edu.field && ` in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-700 flex items-center gap-2">
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
                                        <p className="text-sm text-gray-600">{[edu.board_university, edu.location].filter(Boolean).join(" • ")}</p>
                                    )}
                                    {(edu.grade || edu.gpa || edu.percentage || edu.score) && (
                                        <p className="text-sm text-gray-600">Grade: {edu.grade || edu.gpa || edu.percentage || edu.score}</p>
                                    )}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {(() => {
                                        const range = formatDateRange(edu.start_date, edu.end_date, edu.is_current);
                                        return range ? <p>{range}</p> : null;
                                    })()}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skillsArray.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                        CORE SKILLS
                    </h2>

                    <div className="space-y-3">
                        {groupedEntries.map(([category, items]) => (
                            <div key={category}>
                                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-700" style={{ color: accentColor }}>
                                    {category}
                                </h3>
                                <div className="flex gap-4 flex-wrap mt-1">
                                    {items.map((s, idx) => (
                                        <div key={idx} className="text-gray-700">
                                            • {s.name}{s.level ? <span className="text-gray-500"> ({s.level})</span> : null}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications */}
            {Array.isArray(data.certifications) && data.certifications.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                        CERTIFICATIONS
                    </h2>
                    <ul className="space-y-2">
                        {data.certifications.map((c, i) => {
                            const title = typeof c === "string" ? c : (c?.name || c?.issuer || "");
                            return (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="font-medium text-gray-800">{title}</span>
                                    {c?.issuer && <span className="text-gray-600">- {c.issuer}</span>}
                                    {c?.link && (
                                        <a href={c.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600" title="Open link">
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
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                        LANGUAGES
                    </h2>
                    <div className="flex gap-4 flex-wrap text-gray-700">
                        {data.languages.map((l, i) => {
                            const name = typeof l === 'string' ? l : (l?.name || "");
                            const level = typeof l === 'string' ? "" : (l?.level || "");
                            return (
                                <span key={i}>• {name}{level ? ` (${level})` : ""}</span>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Achievements */}
            {Array.isArray(data.achievements) && data.achievements.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                        ACHIEVEMENTS
                    </h2>
                    <ul className="list-disc ml-5 space-y-1 text-gray-700">
                        {data.achievements.map((a, i) => (
                            <li key={i}>{typeof a === 'string' ? a : (a?.title || a?.name || "")}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Volunteer Experience */}
            {Array.isArray(data.volunteer_experience) && data.volunteer_experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                        VOLUNTEER EXPERIENCE
                    </h2>
                    <div className="space-y-4">
                        {data.volunteer_experience.map((v, idx) => {
                            const range = formatDateRange(v?.start_date, v?.end_date, v?.is_current);
                            return (
                                <div key={idx} className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-gray-900">{v?.role || v?.title}</p>
                                        <p className="text-gray-700">{v?.organization || v?.company}</p>
                                        {v?.description && (
                                            <p className="text-gray-700 whitespace-pre-line">{v.description}</p>
                                        )}
                                    </div>
                                    {range && <span className="text-sm text-gray-600">{range}</span>}
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Interests / Hobbies */}
            {Array.isArray(data.hobbies) && data.hobbies.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                        INTERESTS
                    </h2>
                    <p className="text-gray-700">
                        {data.hobbies.map((h) => (typeof h === 'string' ? h : (h?.name || ""))).filter(Boolean).join(', ')}
                    </p>
                </section>
            )}
        </div>
    );
}

export default ClassicTemplate;
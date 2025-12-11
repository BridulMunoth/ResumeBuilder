import {
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Globe,
    ExternalLink,
    Github,
    Calendar,
    Flag,
    Briefcase,
    Code,
    BookOpen,
    Award,
    Trophy,
    Heart,
    ListChecks,
    Cpu,
    FileText,
    Sparkles
} from "lucide-react";

const TechnicalTemplate = ({ data, accentColor }) => {
    // ✅ Safe date formatter: no "Invalid Date"
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

    // 🔹 Reusable heading with icon (keeps ATS keywords in plain text)
    const SectionHeading = ({ icon: Icon, label, inline = false }) => (
        <h2
            className={`text-sm font-bold mb-4 uppercase tracking-widest text-white px-3 py-2 ${inline ? "inline-flex" : "flex"
                } items-center gap-2`}
            style={{ backgroundColor: accentColor }}
        >
            {Icon && <Icon className="size-4" />}
            <span>{label}</span>
        </h2>
    );

    // Group skills by category, preserving order from data.skills
    const skillsArray = Array.isArray(data?.skills)
        ? data.skills
            .map((s) => (typeof s === "string" ? { name: s } : s))
            .filter((s) => s && s.name)
        : [];

    // We'll track categories in the order they FIRST appear in skillsArray
    const categoryOrder = [];
    const groupedSkills = skillsArray.reduce((acc, s) => {
        const raw = (s.category || "").trim();
        const cat = raw || "Uncategorized";

        if (!acc[cat]) {
            acc[cat] = [];
            categoryOrder.push(cat); // remember order of first appearance
        }

        acc[cat].push(s);
        return acc;
    }, {});

    // Entries in the same order as in the form (once data.skills is ordered)
    const groupedEntries = categoryOrder.map((cat) => [cat, groupedSkills[cat]]);


    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-900">
            {/* Header */}
            <div className="bg-gray-900 text-white p-8">
                <h1 className="text-4xl font-mono font-bold mb-2">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                {data.personal_info?.profession && (
                    <p className="text-lg text-gray-300 font-mono">
                        {data.personal_info.profession}
                    </p>
                )}

                <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-2">
                            <Mail className="size-4" style={{ color: accentColor }} />
                            <span className="text-gray-300">
                                {data.personal_info.email}
                            </span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-2">
                            <Phone className="size-4" style={{ color: accentColor }} />
                            <span className="text-gray-300">
                                {data.personal_info.phone}
                            </span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-2">
                            <MapPin className="size-4" style={{ color: accentColor }} />
                            <span className="text-gray-300">
                                {data.personal_info.location}
                            </span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <a
                            href={data.personal_info.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                        >
                            <Linkedin
                                className="size-4"
                                style={{ color: accentColor }}
                            />
                            <span className="text-gray-300 break-all text-xs">
                                {data.personal_info.linkedin}
                            </span>
                        </a>
                    )}
                    {data.personal_info?.website && (
                        <a
                            href={data.personal_info.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                        >
                            <Globe className="size-4" style={{ color: accentColor }} />
                            <span className="text-gray-300 break-all text-xs">
                                {data.personal_info.website}
                            </span>
                        </a>
                    )}
                    {data.personal_info?.github && (
                        <a
                            href={data.personal_info.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                        >
                            <Github className="size-4" style={{ color: accentColor }} />
                            <span className="text-gray-300 break-all text-xs">
                                {data.personal_info.github}
                            </span>
                        </a>
                    )}
                    {data.personal_info?.date_of_birth && (
                        <div className="flex items-center gap-2">
                            <Calendar
                                className="size-4"
                                style={{ color: accentColor }}
                            />
                            <span className="text-gray-300 text-xs">
                                {data.personal_info.date_of_birth}
                            </span>
                        </div>
                    )}
                    {data.personal_info?.nationality && (
                        <div className="flex items-center gap-2">
                            <Flag className="size-4" style={{ color: accentColor }} />
                            <span className="text-gray-300 text-xs">
                                {data.personal_info.nationality}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-8">
                <div className="grid grid-cols-3 gap-8">
                    {/* LEFT COLUMN */}
                    <div className="col-span-1 space-y-6">
                        {/* Skills */}
                        {skillsArray.length > 0 && (
                            <section>
                                <SectionHeading icon={Cpu} label="Skills" />
                                <div className="space-y-4">
                                    {groupedEntries.map(([category, items]) => (
                                        <div key={category}>
                                            <h3
                                                className="text-xs font-bold uppercase tracking-widest"
                                                style={{ color: accentColor }}
                                            >
                                                {category}
                                            </h3>
                                            <ul className="mt-1 space-y-1">
                                                {items.map((s, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="text-sm text-gray-700 border-l-2 pl-3"
                                                        style={{ borderColor: accentColor }}
                                                    >
                                                        {s.name}
                                                        {s.level ? (
                                                            <span className="text-gray-500">
                                                                {" "}
                                                                ({s.level})
                                                            </span>
                                                        ) : null}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}


                        {/* Education */}
                        {data.education && data.education.length > 0 && (
                            <section>
                                <SectionHeading
                                    icon={BookOpen}
                                    label="Education"
                                />
                                <div className="space-y-4">
                                    {data.education.map((edu, index) => {
                                        const rangeText = formatDateRange(
                                            edu.start_date,
                                            edu.end_date,
                                            edu.is_current
                                        );

                                        const gradeText =
                                            edu.grade ||
                                            edu.gpa ||
                                            edu.percentage ||
                                            edu.score;

                                        return (
                                            <div key={index}>
                                                <h3 className="font-semibold text-sm text-gray-900">
                                                    {edu.degree}
                                                </h3>

                                                {edu.field && (
                                                    <p className="text-xs text-gray-600 mb-1">
                                                        {edu.field}
                                                    </p>
                                                )}

                                                <p
                                                    className="text-xs font-medium mb-1 flex items-center gap-2"
                                                    style={{ color: accentColor }}
                                                >
                                                    <span>{edu.school}</span>
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

                                                <div className="text-xs text-gray-600">
                                                    {rangeText && <span>{rangeText}</span>}
                                                    {gradeText && (
                                                        <span className="ml-2">
                                                            • Grade: {gradeText}
                                                        </span>
                                                    )}
                                                </div>

                                                {edu.description && (
                                                    <p className="text-xs text-gray-700 mt-1 leading-relaxed">
                                                        {edu.description}
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {/* Languages */}
                        {Array.isArray(data.languages) &&
                            data.languages.length > 0 && (
                                <section>
                                    <SectionHeading
                                        icon={Globe}
                                        label="Languages"
                                    />
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-800">
                                        {data.languages.map((l, i) => {
                                            const name =
                                                typeof l === "string"
                                                    ? l
                                                    : l?.name || "";
                                            const level =
                                                typeof l === "string"
                                                    ? ""
                                                    : l?.level || "";
                                            return (
                                                <span key={i}>
                                                    • {name}
                                                    {level ? ` (${level})` : ""}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </section>
                            )}

                        {/* Interests */}
                        {Array.isArray(data.hobbies) &&
                            data.hobbies.length > 0 && (
                                <section>
                                    <SectionHeading
                                        icon={Sparkles}
                                        label="Interests"
                                    />
                                    <p className="text-sm text-gray-800">
                                        {data.hobbies
                                            .map((h) =>
                                                typeof h === "string"
                                                    ? h
                                                    : h?.name || ""
                                            )
                                            .filter(Boolean)
                                            .join(", ")}
                                    </p>
                                </section>
                            )}
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="col-span-2 space-y-6">
                        {/* Summary */}
                        {data.professional_summary && (
                            <section>
                                <SectionHeading
                                    icon={FileText}
                                    label="Summary"
                                    inline
                                />
                                <p className="text-gray-700 leading-relaxed text-sm mt-3">
                                    {data.professional_summary}
                                </p>
                            </section>
                        )}

                        {/* Experience */}
                        {data.experience && data.experience.length > 0 && (
                            <section>
                                <SectionHeading
                                    icon={Briefcase}
                                    label="Experience"
                                    inline
                                />
                                <div className="space-y-6 mt-4">
                                    {data.experience.map((exp, index) => {
                                        const expRange = formatDateRange(
                                            exp.start_date,
                                            exp.end_date,
                                            exp.is_current
                                        );

                                        const techList = Array.isArray(
                                            exp.technologies
                                        )
                                            ? exp.technologies
                                            : (exp.technologies || "")
                                                .split(",")
                                                .map((t) => t.trim())
                                                .filter(Boolean);

                                        const achievementList = Array.isArray(
                                            exp.achievements
                                        )
                                            ? exp.achievements
                                                .flatMap((a) =>
                                                    a.split("\n")
                                                )
                                                .map((a) => a.trim())
                                                .filter(Boolean)
                                            : (exp.achievements || "")
                                                .split("\n")
                                                .map((a) => a.trim())
                                                .filter(Boolean);

                                        return (
                                            <div
                                                key={index}
                                                className="border-l-4 pl-4 space-y-2"
                                                style={{
                                                    borderColor: accentColor,
                                                }}
                                            >
                                                {/* Title + Dates */}
                                                <div className="flex justify-between items-start mb-1">
                                                    <div>
                                                        <h3 className="font-bold text-gray-900">
                                                            {exp.title}
                                                        </h3>
                                                    </div>
                                                    {expRange && (
                                                        <span className="text-xs text-gray-600 font-mono whitespace-nowrap ml-4">
                                                            {expRange}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Company + employment type */}
                                                <div className="flex justify-between items-center mb-1">
                                                    <div className="flex items-center gap-1">
                                                        <span
                                                            className="text-sm font-semibold"
                                                            style={{
                                                                color: accentColor,
                                                            }}
                                                        >
                                                            {exp.company}
                                                        </span>
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
                                                    </div>

                                                    {exp.employment_type && (
                                                        <span className="text-xs text-gray-600 font-mono whitespace-nowrap ml-4">
                                                            {
                                                                exp.employment_type
                                                            }
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Description */}
                                                {exp.description && (
                                                    <div className="text-gray-700 text-sm leading-relaxed mt-1 whitespace-pre-line">
                                                        {exp.description}
                                                    </div>
                                                )}

                                                {/* Achievements + Tech */}
                                                {(achievementList.length > 0 ||
                                                    techList.length > 0) && (
                                                        <div className="mt-2 space-y-2">
                                                            {achievementList.length >
                                                                0 && (
                                                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                                                                        {achievementList.map(
                                                                            (
                                                                                ach,
                                                                                i
                                                                            ) => (
                                                                                <div
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                    className="flex items-center gap-1"
                                                                                >
                                                                                    <span
                                                                                        className="h-1.5 w-1.5 rounded-full"
                                                                                        style={{
                                                                                            backgroundColor:
                                                                                                accentColor,
                                                                                        }}
                                                                                    ></span>
                                                                                    <span className="text-sm text-gray-700">
                                                                                        {
                                                                                            ach
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                )}

                                                            {techList.length >
                                                                0 && (
                                                                    <div className="flex flex-wrap gap-1.5">
                                                                        {techList.map(
                                                                            (
                                                                                tech,
                                                                                i
                                                                            ) => (
                                                                                <span
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                    className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/70 border shadow-sm"
                                                                                    style={{
                                                                                        borderColor:
                                                                                            accentColor +
                                                                                            "33",
                                                                                        color: accentColor,
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        tech
                                                                                    }
                                                                                </span>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                )}
                                                        </div>
                                                    )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {/* Projects */}
                        {data.projects && data.projects.length > 0 && (
                            <section>
                                <SectionHeading
                                    icon={Code}
                                    label="Projects"
                                    inline
                                />
                                <div className="space-y-5 mt-4">
                                    {data.projects.map((proj, index) => {
                                        const dateRange =
                                            (proj.start_date ||
                                                proj.end_date) &&
                                                typeof formatDateRange ===
                                                "function"
                                                ? formatDateRange(
                                                    proj.start_date,
                                                    proj.end_date,
                                                    false
                                                )
                                                : "";

                                        let technologies = [];
                                        if (
                                            Array.isArray(
                                                proj.technologies
                                            )
                                        ) {
                                            technologies =
                                                proj.technologies.filter(
                                                    Boolean
                                                );
                                        } else if (
                                            typeof proj.technologies ===
                                            "string"
                                        ) {
                                            technologies = proj.technologies
                                                .split(",")
                                                .map((t) => t.trim())
                                                .filter(Boolean);
                                        }

                                        let highlights = [];
                                        if (
                                            Array.isArray(proj.highlights)
                                        ) {
                                            highlights =
                                                proj.highlights.filter(
                                                    Boolean
                                                );
                                        } else if (
                                            typeof proj.highlights ===
                                            "string"
                                        ) {
                                            highlights = proj.highlights
                                                .split("\n")
                                                .map((h) => h.trim())
                                                .filter(Boolean);
                                        }

                                        return (
                                            <div
                                                key={index}
                                                className="bg-white/90 rounded-xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 border-l-4"
                                                style={{
                                                    borderColor: accentColor,
                                                }}
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                                                                {proj.name}
                                                            </h3>
                                                            {proj.link && (
                                                                <a
                                                                    href={
                                                                        proj.link
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                                                >
                                                                    <ExternalLink size={14} />
                                                                </a>
                                                            )}
                                                        </div>

                                                        {(proj.type ||
                                                            proj.role) && (
                                                                <p
                                                                    className="text-xs mt-1 font-medium"
                                                                    style={{
                                                                        color: accentColor,
                                                                    }}
                                                                >
                                                                    {proj.type}
                                                                    {proj.type &&
                                                                        proj.role &&
                                                                        " · "}
                                                                    {proj.role}
                                                                </p>
                                                            )}
                                                    </div>

                                                    {dateRange && (
                                                        <p className="text-[11px] text-gray-500 whitespace-nowrap">
                                                            {dateRange}
                                                        </p>
                                                    )}
                                                </div>

                                                {proj.description && (
                                                    <p className="text-xs sm:text-sm text-gray-700 mt-2 leading-relaxed">
                                                        {proj.description}
                                                    </p>
                                                )}

                                                {technologies.length >
                                                    0 && (
                                                        <div className="mt-3 flex flex-wrap gap-1.5">
                                                            {technologies.map(
                                                                (tech, i) => (
                                                                    <span
                                                                        key={i}
                                                                        className="text-[11px] px-2 py-0.5 rounded-full border bg-white/70"
                                                                        style={{
                                                                            borderColor:
                                                                                accentColor,
                                                                            color: accentColor,
                                                                        }}
                                                                    >
                                                                        {tech}
                                                                    </span>
                                                                )
                                                            )}
                                                        </div>
                                                    )}

                                                {highlights.length > 0 && (
                                                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                                                        {highlights.map(
                                                            (
                                                                point,
                                                                i
                                                            ) => (
                                                                <div
                                                                    key={i}
                                                                    className="flex items-center gap-1"
                                                                >
                                                                    <span
                                                                        className="h-1.5 w-1.5 rounded-full"
                                                                        style={{
                                                                            backgroundColor:
                                                                                accentColor,
                                                                        }}
                                                                    ></span>
                                                                    <span className="text-xs text-gray-700">
                                                                        {
                                                                            point
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {/* Certifications */}
                        {Array.isArray(data.certifications) &&
                            data.certifications.length > 0 && (
                                <section>
                                    <SectionHeading
                                        icon={Award}
                                        label="Certifications"
                                        inline
                                    />
                                    <ul className="space-y-2 text-sm mt-2">
                                        {data.certifications.map((c, i) => {
                                            const title =
                                                typeof c === "string"
                                                    ? c
                                                    : c?.name ||
                                                    c?.issuer ||
                                                    "";
                                            return (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-2"
                                                >
                                                    <span className="font-medium text-gray-900">
                                                        {title}
                                                    </span>
                                                    {c?.issuer && (
                                                        <span className="text-gray-600">
                                                            – {c.issuer}
                                                        </span>
                                                    )}
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

                        {/* Achievements */}
                        {Array.isArray(data.achievements) &&
                            data.achievements.length > 0 && (
                                <section>
                                    <SectionHeading
                                        icon={Trophy}
                                        label="Achievements"
                                        inline
                                    />
                                    <div className="space-y-4 mt-2">
                                        {data.achievements.map((a, i) => {
                                            if (typeof a === "string") {
                                                return (
                                                    <div
                                                        key={i}
                                                        className="text-sm text-gray-800"
                                                    >
                                                        • {a}
                                                    </div>
                                                );
                                            }
                                            const title =
                                                a?.title || a?.name || "";
                                            const org =
                                                a?.organization ||
                                                a?.issuer ||
                                                a?.institution ||
                                                a?.school ||
                                                "";
                                            const range = formatDateRange(
                                                a?.start_date,
                                                a?.end_date,
                                                a?.is_current
                                            );
                                            return (
                                                <div key={i}>
                                                    <div className="flex justify-between items-start">
                                                        <div className="text-sm">
                                                            <p className="font-semibold text-gray-900">
                                                                {title}
                                                            </p>
                                                            {org && (
                                                                <p className="text-gray-700">
                                                                    {org}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            {range && (
                                                                <span className="text-xs text-gray-600 font-mono whitespace-nowrap">
                                                                    {range}
                                                                </span>
                                                            )}
                                                            {a?.link && (
                                                                <a
                                                                    href={
                                                                        a.link
                                                                    }
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
                                                        <p className="text-gray-700 text-sm mt-1 whitespace-pre-line">
                                                            {a.description}
                                                        </p>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>
                            )}

                        {/* Volunteer Experience */}
                        {Array.isArray(data.volunteer_experience) &&
                            data.volunteer_experience.length > 0 && (
                                <section>
                                    <SectionHeading
                                        icon={Heart}
                                        label="Volunteer Experience"
                                        inline
                                    />
                                    <div className="space-y-4 mt-2">
                                        {data.volunteer_experience.map(
                                            (v, idx) => {
                                                const range = formatDateRange(
                                                    v?.start_date,
                                                    v?.end_date,
                                                    v?.is_current
                                                );
                                                return (
                                                    <div key={idx}>
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <p className="font-semibold text-gray-900 text-sm">
                                                                    {v?.role ||
                                                                        v?.title}
                                                                </p>
                                                                <p className="text-gray-700 text-sm">
                                                                    {v?.organization ||
                                                                        v?.company}
                                                                </p>
                                                            </div>
                                                            {range && (
                                                                <span className="text-xs text-gray-600 font-mono whitespace-nowrap ml-4">
                                                                    {range}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {v?.description && (
                                                            <p className="text-gray-700 text-sm mt-1 whitespace-pre-line">
                                                                {
                                                                    v.description
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </section>
                            )}

                        {/* Custom Sections */}
                        {Array.isArray(data.custom_sections) &&
                            data.custom_sections.length > 0 && (
                                <section>
                                    <SectionHeading
                                        icon={ListChecks}
                                        label="Additional Sections"
                                        inline
                                    />
                                    <div className="space-y-5 mt-2">
                                        {data.custom_sections.map(
                                            (sec, i) => (
                                                <div key={i}>
                                                    {sec?.title && (
                                                        <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                                            {sec.title}
                                                        </h3>
                                                    )}
                                                    {Array.isArray(
                                                        sec?.items
                                                    ) &&
                                                        sec.items.length >
                                                        0 && (
                                                            <ul className="list-disc ml-5 text-sm text-gray-800 space-y-1">
                                                                {sec.items.map(
                                                                    (
                                                                        it,
                                                                        idx
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                idx
                                                                            }
                                                                        >
                                                                            {typeof it ===
                                                                                "string"
                                                                                ? it
                                                                                : it?.name ||
                                                                                ""}
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        )}
                                                    {sec?.description &&
                                                        !Array.isArray(
                                                            sec?.items
                                                        ) && (
                                                            <p className="text-sm text-gray-700 whitespace-pre-line">
                                                                {
                                                                    sec.description
                                                                }
                                                            </p>
                                                        )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </section>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechnicalTemplate;

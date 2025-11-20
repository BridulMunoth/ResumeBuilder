import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink } from "lucide-react";

const CreativeTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

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
                        <div className="flex items-center gap-2">
                            <Linkedin className="size-4" style={{ color: accentColor }} />
                            <span className="text-gray-700 break-all text-xs">{data.personal_info.linkedin}</span>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center gap-2">
                            <Globe className="size-4" style={{ color: accentColor }} />
                            <span className="text-gray-700 break-all text-xs">{data.personal_info.website}</span>
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
                            <div className="flex-1 h-1" style={{ backgroundColor: accentColor, opacity: 0.3 }}></div>
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
                                            <div className="border-l-2 pl-4" style={{ borderColor: accentColor, opacity: 0.3 }}>
                                                <div className="mb-2">
                                                    <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
                                                    <p className="font-semibold text-sm" style={{ color: accentColor }}>
                                                        {exp.company}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                                    </p>
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
                        {data.project && data.project.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-1 w-12" style={{ backgroundColor: accentColor }}></div>
                                    <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: accentColor }}>
                                        Projects
                                    </h2>
                                </div>

                                <div className="space-y-5">
                                    {data.project.map((proj, index) => (
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
                                            {proj.type && (
                                                <p className="text-xs mb-2" style={{ color: accentColor }}>
                                                    {proj.type}
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
                                    {data.education.map((edu, index) => (
                                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-bold text-gray-900">
                                                {edu.degree}
                                            </h3>
                                            {edu.field && (
                                                <p className="text-sm text-gray-600 mb-1">{edu.field}</p>
                                            )}
                                            <p className="font-semibold text-sm mb-2" style={{ color: accentColor }}>
                                                {edu.institution}
                                            </p>
                                            <div className="flex justify-between items-center text-xs text-gray-600">
                                                <span>{formatDate(edu.graduation_date)}</span>
                                                {edu.gpa && <span>GPA: {edu.gpa}</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Skills */}
                        {data.skills && data.skills.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-1 w-12" style={{ backgroundColor: accentColor }}></div>
                                    <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: accentColor }}>
                                        Skills
                                    </h2>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {data.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 text-sm font-medium rounded-full text-white"
                                            style={{ backgroundColor: accentColor }}
                                        >
                                            {skill}
                                        </span>
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


import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink } from "lucide-react";

const TechnicalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-900">
            {/* Technical Header */}
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
                            <span className="text-gray-300">{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-2">
                            <Phone className="size-4" style={{ color: accentColor }} />
                            <span className="text-gray-300">{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-2">
                            <MapPin className="size-4" style={{ color: accentColor }} />
                            <span className="text-gray-300">{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-2">
                            <Linkedin className="size-4" style={{ color: accentColor }} />
                            <span className="text-gray-300 break-all text-xs">{data.personal_info.linkedin}</span>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center gap-2">
                            <Globe className="size-4" style={{ color: accentColor }} />
                            <span className="text-gray-300 break-all text-xs">{data.personal_info.website}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-8">
                <div className="grid grid-cols-3 gap-8">
                    {/* Left Column - Skills First (Technical Focus) */}
                    <div className="col-span-1 space-y-6">
                        {/* Skills - Prominent for Technical Resume */}
                        {data.skills && data.skills.length > 0 && (
                            <section>
                                <h2 className="text-sm font-bold mb-4 uppercase tracking-widest text-white px-3 py-2" style={{ backgroundColor: accentColor }}>
                                    Technical Skills
                                </h2>
                                <div className="space-y-2">
                                    {data.skills.map((skill, index) => (
                                        <div key={index} className="text-sm text-gray-700 border-l-2 pl-3" style={{ borderColor: accentColor }}>
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {data.education && data.education.length > 0 && (
                            <section>
                                <h2 className="text-sm font-bold mb-4 uppercase tracking-widest text-white px-3 py-2" style={{ backgroundColor: accentColor }}>
                                    Education
                                </h2>
                                <div className="space-y-4">
                                    {data.education.map((edu, index) => (
                                        <div key={index}>
                                            <h3 className="font-semibold text-sm text-gray-900">
                                                {edu.degree}
                                            </h3>
                                            {edu.field && (
                                                <p className="text-xs text-gray-600 mb-1">{edu.field}</p>
                                            )}
                                            <p className="text-xs font-medium mb-1" style={{ color: accentColor }}>
                                                {edu.institution}
                                            </p>
                                            <div className="text-xs text-gray-600">
                                                <span>{formatDate(edu.graduation_date)}</span>
                                                {edu.gpa && <span className="ml-2">• GPA: {edu.gpa}</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column - Main Content */}
                    <div className="col-span-2 space-y-6">
                        {/* Professional Summary */}
                        {data.professional_summary && (
                            <section>
                                <h2 className="text-sm font-bold mb-3 uppercase tracking-widest text-white px-3 py-2 inline-block" style={{ backgroundColor: accentColor }}>
                                    Summary
                                </h2>
                                <p className="text-gray-700 leading-relaxed text-sm mt-3">
                                    {data.professional_summary}
                                </p>
                            </section>
                        )}

                        {/* Experience */}
                        {data.experience && data.experience.length > 0 && (
                            <section>
                                <h2 className="text-sm font-bold mb-4 uppercase tracking-widest text-white px-3 py-2 inline-block" style={{ backgroundColor: accentColor }}>
                                    Experience
                                </h2>

                                <div className="space-y-6 mt-4">
                                    {data.experience.map((exp, index) => (
                                        <div key={index} className="border-l-4 pl-4" style={{ borderColor: accentColor }}>
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                                                    <p className="text-sm font-semibold" style={{ color: accentColor }}>
                                                        {exp.company}
                                                    </p>
                                                </div>
                                                <span className="text-xs text-gray-600 font-mono whitespace-nowrap ml-4">
                                                    {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                                </span>
                                            </div>
                                            {exp.description && (
                                                <div className="text-gray-700 text-sm leading-relaxed mt-2 whitespace-pre-line">
                                                    {exp.description}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Projects */}
                        {data.project && data.project.length > 0 && (
                            <section>
                                <h2 className="text-sm font-bold mb-4 uppercase tracking-widest text-white px-3 py-2 inline-block" style={{ backgroundColor: accentColor }}>
                                    Projects
                                </h2>

                                <div className="space-y-5 mt-4">
                                    {data.project.map((proj, index) => (
                                        <div key={index} className="bg-gray-50 p-4 rounded border-l-4" style={{ borderColor: accentColor }}>
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
                                                <p className="text-xs mb-2 font-mono" style={{ color: accentColor }}>
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
                </div>
            </div>
        </div>
    );
}

export default TechnicalTemplate;


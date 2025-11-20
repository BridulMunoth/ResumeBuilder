import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink } from "lucide-react";

const ProfessionalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-800">
            {/* Header with colored bar */}
            <div className="h-2" style={{ backgroundColor: accentColor }}></div>
            
            <div className="p-8">
                {/* Header */}
                <header className="mb-8 pb-6 border-b border-gray-300">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold mb-2 text-gray-900">
                                {data.personal_info?.full_name || "Your Name"}
                            </h1>
                            {data.personal_info?.profession && (
                                <p className="text-lg text-gray-600 font-medium">
                                    {data.personal_info.profession}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-gray-700">
                        {data.personal_info?.email && (
                            <div className="flex items-center gap-2">
                                <Mail className="size-4" style={{ color: accentColor }} />
                                <span>{data.personal_info.email}</span>
                            </div>
                        )}
                        {data.personal_info?.phone && (
                            <div className="flex items-center gap-2">
                                <Phone className="size-4" style={{ color: accentColor }} />
                                <span>{data.personal_info.phone}</span>
                            </div>
                        )}
                        {data.personal_info?.location && (
                            <div className="flex items-center gap-2">
                                <MapPin className="size-4" style={{ color: accentColor }} />
                                <span>{data.personal_info.location}</span>
                            </div>
                        )}
                        {data.personal_info?.linkedin && (
                            <div className="flex items-center gap-2">
                                <Linkedin className="size-4" style={{ color: accentColor }} />
                                <span className="break-all text-xs">{data.personal_info.linkedin}</span>
                            </div>
                        )}
                        {data.personal_info?.website && (
                            <div className="flex items-center gap-2">
                                <Globe className="size-4" style={{ color: accentColor }} />
                                <span className="break-all text-xs">{data.personal_info.website}</span>
                            </div>
                        )}
                    </div>
                </header>

                {/* Professional Summary */}
                {data.professional_summary && (
                    <section className="mb-8">
                        <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: accentColor }}>
                            Professional Summary
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-sm">{data.professional_summary}</p>
                    </section>
                )}

                <div className="grid grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="col-span-2 space-y-6">
                        {/* Experience */}
                        {data.experience && data.experience.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold mb-4 uppercase tracking-wide" style={{ color: accentColor }}>
                                    Professional Experience
                                </h2>

                                <div className="space-y-5">
                                    {data.experience.map((exp, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-start mb-1">
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                                                    <p className="text-sm font-medium" style={{ color: accentColor }}>
                                                        {exp.company}
                                                    </p>
                                                </div>
                                                <span className="text-xs text-gray-600 font-medium">
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
                                <h2 className="text-lg font-bold mb-4 uppercase tracking-wide" style={{ color: accentColor }}>
                                    Key Projects
                                </h2>

                                <div className="space-y-4">
                                    {data.project.map((proj, index) => (
                                        <div key={index}>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-gray-900">{proj.name}</h3>
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
                                                <p className="text-xs mb-1" style={{ color: accentColor }}>
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

                    {/* Right Column - Sidebar */}
                    <div className="col-span-1 space-y-6">
                        {/* Education */}
                        {data.education && data.education.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold mb-4 uppercase tracking-wide" style={{ color: accentColor }}>
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
                                            <p className="text-xs font-medium" style={{ color: accentColor }}>
                                                {edu.institution}
                                            </p>
                                            <div className="flex justify-between items-center mt-1">
                                                <span className="text-xs text-gray-600">
                                                    {formatDate(edu.graduation_date)}
                                                </span>
                                                {edu.gpa && (
                                                    <span className="text-xs text-gray-600">GPA: {edu.gpa}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Skills */}
                        {data.skills && data.skills.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold mb-4 uppercase tracking-wide" style={{ color: accentColor }}>
                                    Core Skills
                                </h2>

                                <div className="space-y-2">
                                    {data.skills.map((skill, index) => (
                                        <div key={index} className="text-sm text-gray-700">
                                            • {skill}
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

export default ProfessionalTemplate;


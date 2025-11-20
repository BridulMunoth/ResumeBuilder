import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink } from "lucide-react";

const ExecutiveTemplate = ({ data, accentColor }) => {
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
            {/* Executive Header */}
            <div className="border-t-4" style={{ borderColor: accentColor }}>
                <div className="p-10">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                                {data.personal_info?.full_name || "Your Name"}
                            </h1>
                            {data.personal_info?.profession && (
                                <p className="text-xl text-gray-600 font-light">
                                    {data.personal_info.profession}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-3 gap-4 text-sm border-t border-b border-gray-300 py-4">
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
                </div>
            </div>

            <div className="p-10 pt-6">
                {/* Professional Summary */}
                {data.professional_summary && (
                    <section className="mb-10">
                        <h2 className="text-lg font-bold mb-4 uppercase tracking-widest border-b-2 pb-2" style={{ borderColor: accentColor, color: accentColor }}>
                            Executive Summary
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-base">
                            {data.professional_summary}
                        </p>
                    </section>
                )}

                <div className="grid grid-cols-12 gap-8">
                    {/* Main Content */}
                    <div className="col-span-8 space-y-8">
                        {/* Experience */}
                        {data.experience && data.experience.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold mb-6 uppercase tracking-widest border-b-2 pb-2" style={{ borderColor: accentColor, color: accentColor }}>
                                    Professional Experience
                                </h2>

                                <div className="space-y-8">
                                    {data.experience.map((exp, index) => (
                                        <div key={index} className="border-l-4 pl-6" style={{ borderColor: accentColor }}>
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                                                    <p className="text-base font-semibold mt-1" style={{ color: accentColor }}>
                                                        {exp.company}
                                                    </p>
                                                </div>
                                                <span className="text-sm text-gray-600 font-medium whitespace-nowrap ml-4">
                                                    {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                                </span>
                                            </div>
                                            {exp.description && (
                                                <div className="text-gray-700 leading-relaxed mt-3 whitespace-pre-line">
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
                                <h2 className="text-lg font-bold mb-6 uppercase tracking-widest border-b-2 pb-2" style={{ borderColor: accentColor, color: accentColor }}>
                                    Key Achievements & Projects
                                </h2>

                                <div className="space-y-5">
                                    {data.project.map((proj, index) => (
                                        <div key={index} className="pl-4 border-l-2 border-gray-300">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-lg text-gray-900">{proj.name}</h3>
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
                                                <p className="text-sm mb-2 font-medium" style={{ color: accentColor }}>
                                                    {proj.type}
                                                </p>
                                            )}
                                            {proj.description && (
                                                <p className="text-gray-700 leading-relaxed">
                                                    {proj.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="col-span-4 space-y-8">
                        {/* Education */}
                        {data.education && data.education.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold mb-4 uppercase tracking-widest border-b-2 pb-2" style={{ borderColor: accentColor, color: accentColor }}>
                                    Education
                                </h2>

                                <div className="space-y-5">
                                    {data.education.map((edu, index) => (
                                        <div key={index} className="pb-4 border-b border-gray-200 last:border-0">
                                            <h3 className="font-bold text-gray-900">
                                                {edu.degree}
                                            </h3>
                                            {edu.field && (
                                                <p className="text-sm text-gray-600 mt-1">{edu.field}</p>
                                            )}
                                            <p className="font-semibold text-sm mt-2" style={{ color: accentColor }}>
                                                {edu.institution}
                                            </p>
                                            <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
                                                <span>{formatDate(edu.graduation_date)}</span>
                                                {edu.gpa && <span className="font-medium">GPA: {edu.gpa}</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Skills */}
                        {data.skills && data.skills.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold mb-4 uppercase tracking-widest border-b-2 pb-2" style={{ borderColor: accentColor, color: accentColor }}>
                                    Core Competencies
                                </h2>

                                <div className="space-y-2">
                                    {data.skills.map((skill, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                                            <span className="text-sm text-gray-700">{skill}</span>
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

export default ExecutiveTemplate;


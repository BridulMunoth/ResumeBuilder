import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink, Github, Calendar, Flag } from "lucide-react";

const ExecutiveImageTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    const getImageSrc = () => {
        if (!data.personal_info?.image) return null;
        if (typeof data.personal_info.image === 'string') {
            return data.personal_info.image;
        }
        if (typeof data.personal_info.image === 'object') {
            return URL.createObjectURL(data.personal_info.image);
        }
        return null;
    };

    return (
        <div className="max-w-5xl mx-auto bg-white text-gray-900">
            {/* Executive Header */}
            <div className="border-t-4" style={{ borderColor: accentColor }}>
                <div className="p-10">
                    <div className="flex gap-8 items-start mb-6">
                        {/* Profile Image */}
                        {getImageSrc() && (
                            <div className="flex-shrink-0">
                                <img 
                                    src={getImageSrc()} 
                                    alt="Profile" 
                                    className="w-32 h-32 object-cover rounded-lg shadow-lg border-4 border-white" 
                                    style={{ borderColor: accentColor }}
                                />
                            </div>
                        )}
                        
                        <div className="flex-1">
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
                                                    <h3 className="text-xl font-bold text-gray-900">{exp.title || exp.position}</h3>
                                                    <p className="text-base font-semibold mt-1" style={{ color: accentColor }}>
                                                        {exp.company}
                                                    </p>
                                                </div>
                                                {([formatDate(exp.start_date), (exp.is_current ? 'Present' : formatDate(exp.end_date))].filter(Boolean).join(' - ') || null) && (
                                                    <span className="text-sm text-gray-600 font-medium whitespace-nowrap ml-4">
                                                        {[formatDate(exp.start_date), (exp.is_current ? 'Present' : formatDate(exp.end_date))].filter(Boolean).join(' - ')}
                                                    </span>
                                                )}
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
                                            <p className="font-semibold text-sm mt-2 flex items-center gap-2" style={{ color: accentColor }}>
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
                                            <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
                                                {([formatDate(edu.start_date), (edu.is_current ? 'Present' : formatDate(edu.end_date || edu.graduation_date))].filter(Boolean).join(' - ') || null) && (
                                                    <span>{[formatDate(edu.start_date), (edu.is_current ? 'Present' : formatDate(edu.end_date || edu.graduation_date))].filter(Boolean).join(' - ')}</span>
                                                )}
                                                {(edu.grade || edu.gpa || edu.percentage || edu.score) && (
                                                    <span className="font-medium">Grade: {edu.grade || edu.gpa || edu.percentage || edu.score}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Skills */}
                        {(data.skills_detailed && data.skills_detailed.length > 0) || (data.skills && data.skills.length > 0) ? (
                            <section>
                                <h2 className="text-lg font-bold mb-4 uppercase tracking-widest border-b-2 pb-2" style={{ borderColor: accentColor, color: accentColor }}>
                                    Core Competencies
                                </h2>

                                <div className="flex flex-wrap gap-2">
                                    {(data.skills_detailed?.length ? data.skills_detailed : (data.skills || []).map(s=>({name:s}))).map((s, index) => (
                                        <span key={index} className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800 ring-1 ring-gray-200">
                                            <span className="font-medium">{s.name}</span>
                                            {s.category && (
                                                <span className="rounded bg-white px-1.5 py-0.5 text-[10px] ring-1 ring-gray-300 text-gray-600">{s.category}</span>
                                            )}
                                            {s.level && (
                                                <span className="rounded px-1.5 py-0.5 text-[10px]" style={{backgroundColor: accentColor + '22', color: accentColor}}>{s.level}</span>
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        ) : null}

                        {/* Languages */}
                        {Array.isArray(data.languages) && data.languages.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold mb-4 uppercase tracking-widest border-b-2 pb-2" style={{ borderColor: accentColor, color: accentColor }}>
                                    Languages
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {data.languages.map((lang, idx) => (
                                        <span key={idx} className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800 ring-1 ring-gray-200">
                                            <span className="font-medium">{lang?.name}</span>
                                            {lang?.proficiency && (
                                                <span className="rounded px-1.5 py-0.5 text-[10px]" style={{backgroundColor: accentColor + '22', color: accentColor}}>{lang.proficiency}</span>
                                            )}
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

export default ExecutiveImageTemplate;


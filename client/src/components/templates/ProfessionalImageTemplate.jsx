import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink } from "lucide-react";

const ProfessionalImageTemplate = ({ data, accentColor }) => {
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
        <div className="max-w-5xl mx-auto bg-white text-gray-800">
            {/* Header with colored bar */}
            <div className="h-2" style={{ backgroundColor: accentColor }}></div>
            
            <div className="grid grid-cols-12 gap-6 p-8">
                {/* Left Sidebar with Image */}
                <div className="col-span-3 space-y-6">
                    {/* Profile Image */}
                    {getImageSrc() && (
                        <div className="mb-6">
                            <img 
                                src={getImageSrc()} 
                                alt="Profile" 
                                className="w-full aspect-square object-cover rounded-lg shadow-md" 
                            />
                        </div>
                    )}

                    {/* Contact Information */}
                    <section>
                        <h2 className="text-sm font-bold mb-4 uppercase tracking-wide" style={{ color: accentColor }}>
                            Contact
                        </h2>
                        <div className="space-y-3 text-xs">
                            {data.personal_info?.email && (
                                <div className="flex items-start gap-2">
                                    <Mail className="size-3 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                    <span className="text-gray-700 break-words">{data.personal_info.email}</span>
                                </div>
                            )}
                            {data.personal_info?.phone && (
                                <div className="flex items-start gap-2">
                                    <Phone className="size-3 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                    <span className="text-gray-700">{data.personal_info.phone}</span>
                                </div>
                            )}
                            {data.personal_info?.location && (
                                <div className="flex items-start gap-2">
                                    <MapPin className="size-3 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                    <span className="text-gray-700">{data.personal_info.location}</span>
                                </div>
                            )}
                            {data.personal_info?.linkedin && (
                                <div className="flex items-start gap-2">
                                    <Linkedin className="size-3 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                    <span className="text-gray-700 break-all text-xs">{data.personal_info.linkedin}</span>
                                </div>
                            )}
                            {data.personal_info?.website && (
                                <div className="flex items-start gap-2">
                                    <Globe className="size-3 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                    <span className="text-gray-700 break-all text-xs">{data.personal_info.website}</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold mb-4 uppercase tracking-wide" style={{ color: accentColor }}>
                                Core Skills
                            </h2>
                            <div className="space-y-2">
                                {data.skills.map((skill, index) => (
                                    <div key={index} className="text-xs text-gray-700">
                                        • {skill}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold mb-4 uppercase tracking-wide" style={{ color: accentColor }}>
                                Education
                            </h2>
                            <div className="space-y-4">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <h3 className="font-semibold text-xs text-gray-900">
                                            {edu.degree}
                                        </h3>
                                        {edu.field && (
                                            <p className="text-xs text-gray-600 mb-1">{edu.field}</p>
                                        )}
                                        <p className="text-xs font-medium mb-1" style={{ color: accentColor }}>
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
                </div>

                {/* Main Content */}
                <div className="col-span-9 space-y-6">
                    {/* Header */}
                    <header className="pb-6 border-b border-gray-300">
                        <h1 className="text-3xl font-bold mb-2 text-gray-900">
                            {data.personal_info?.full_name || "Your Name"}
                        </h1>
                        {data.personal_info?.profession && (
                            <p className="text-lg text-gray-600 font-medium">
                                {data.personal_info.profession}
                            </p>
                        )}
                    </header>

                    {/* Professional Summary */}
                    {data.professional_summary && (
                        <section>
                            <h2 className="text-lg font-bold mb-3 uppercase tracking-wide" style={{ color: accentColor }}>
                                Professional Summary
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-sm">{data.professional_summary}</p>
                        </section>
                    )}

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
            </div>
        </div>
    );
}

export default ProfessionalImageTemplate;


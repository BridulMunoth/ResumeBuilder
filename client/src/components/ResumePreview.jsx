import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import ProfessionalTemplate from './templates/ProfessionalTemplate'
import ProfessionalImageTemplate from './templates/ProfessionalImageTemplate'
import CreativeTemplate from './templates/CreativeTemplate'
import CreativeImageTemplate from './templates/CreativeImageTemplate'
import ExecutiveTemplate from './templates/ExecutiveTemplate'
import ExecutiveImageTemplate from './templates/ExecutiveImageTemplate'
import TechnicalTemplate from './templates/TechnicalTemplate'

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  // Normalize for backward compatibility with templates using legacy keys
  const normalize = (r) => {
    const out = JSON.parse(JSON.stringify(r || {}));
    // skills: preserve objects for modern templates, add legacy string list for older ones
    if (Array.isArray(out.skills)) {
      const detailed = out.skills.map((s) => (typeof s === 'string' ? { name: s } : s)).filter((s) => s && s.name);
      out.skills_detailed = detailed;
      out.skills_legacy = detailed.map((s) => s.name).filter(Boolean);
    } else {
      out.skills_detailed = [];
      out.skills_legacy = [];
    }
    // projects: ensure both keys exist
    if (Array.isArray(out.projects)) {
      out.project = out.projects;
    }
    // interests alias -> hobbies
    if (!Array.isArray(out.hobbies) && Array.isArray(out.interests)) {
      out.hobbies = out.interests;
    }
    if (!Array.isArray(out.interests) && Array.isArray(out.hobbies)) {
      out.interests = out.hobbies;
    }
    // volunteer alias -> volunteer_experience
    if (!Array.isArray(out.volunteer_experience) && Array.isArray(out.volunteer)) {
      out.volunteer_experience = out.volunteer;
    }
    // experience: ensure position key for old templates
    if (Array.isArray(out.experience)) {
      out.experience = out.experience.map((e) => ({
        ...e,
        position: e?.position || e?.title || '',
      }));
    }
    // education: provide legacy keys (institution, degree, level, program, gpa/score, graduation_date) for old templates
    if (Array.isArray(out.education)) {
      out.education = out.education.map((ed) => ({
        ...ed,
        // legacy templates read institution; new form uses school
        institution: ed?.institution || ed?.school || '',
        // degree fallback from old level/program/field
        degree: ed?.degree || ed?.level || ed?.program || (ed?.field ? `${ed.field}` : '') || '',
        // also backfill legacy fields some templates display directly
        level: ed?.level || ed?.degree || '',
        program: ed?.program || '',
        gpa: ed?.gpa || ed?.score || '',
        score: ed?.score || ed?.gpa || '',
        graduation_date: ed?.graduation_date || ed?.end_date || '',
      }));
    }
    // achievements: normalize to objects with common keys
    if (Array.isArray(out.achievements)) {
      out.achievements = out.achievements.map((a) => {
        if (typeof a === 'string') return { title: a };
        const obj = a || {};
        return {
          title: obj.title || obj.name || '',
          organization: obj.organization || obj.issuer || obj.institution || obj.school || '',
          description: obj.description || obj.details || '',
          link: obj.link || obj.url || '',
          start_date: obj.start_date || obj.startDate || '',
          end_date: obj.end_date || obj.endDate || '',
          is_current: typeof obj.is_current === 'boolean' ? obj.is_current : false,
        };
      });
    }
    return out;
  };

  const normalized = normalize(data);

  const renderTemplate = (payload) => {
    switch (template) {
      case "modern":
        return (
          <ModernTemplate
            data={{
              ...payload,
              skills:
                (Array.isArray(payload?.skills_legacy) && payload.skills_legacy.length > 0)
                  ? payload.skills_legacy
                  : (Array.isArray(payload?.skills)
                      ? payload.skills
                          .map((s) => (typeof s === 'string' ? s : s?.name))
                          .filter(Boolean)
                      : []),
            }}
            accentColor={accentColor}
          />
        )
      case "minimal":
        return <MinimalTemplate data={payload} accentColor={accentColor} />
      case "minimal-image":
        return <MinimalImageTemplate data={payload} accentColor={accentColor} />
      case "professional":
        return <ProfessionalTemplate data={payload} accentColor={accentColor} />
      case "professional-image":
        return <ProfessionalImageTemplate data={payload} accentColor={accentColor} />
      case "creative":
        return <CreativeTemplate data={payload} accentColor={accentColor} />
      case "creative-image":
        return (
          <CreativeImageTemplate
            data={{
              ...payload,
              skills:
                (Array.isArray(payload?.skills_legacy) && payload.skills_legacy.length > 0)
                  ? payload.skills_legacy
                  : (Array.isArray(payload?.skills)
                      ? payload.skills
                          .map((s) => (typeof s === 'string' ? s : s?.name))
                          .filter(Boolean)
                      : []),
            }}
            accentColor={accentColor}
          />
        )
      case "executive":
        return <ExecutiveTemplate data={payload} accentColor={accentColor} />
      case "executive-image":
        return <ExecutiveImageTemplate data={payload} accentColor={accentColor} />
      case "technical":
        return <TechnicalTemplate data={payload} accentColor={accentColor} />
      default:
        return <ClassicTemplate data={payload} accentColor={accentColor} />;
    }
  }

  return (
    <div className='w-full bg-gray-100 overflow-x-hidden'>
      <div
        id="resume-preview"
        className={`border border-gray-200 print:shadow-none print:border-none mx-auto ${classes}`}
      >
        {renderTemplate(normalized)}
      </div>

      <style>{`
        @page {
          size: A4;
          margin: 0;
        }
        /* A4 dimensions for screen preview too */
        #resume-preview {
          width: 210mm;
          max-width: 100%;
          min-height: 297mm;
          background: white;
          box-sizing: border-box;
        }
        /* Show page break guides on screen only */
        @media screen {
          #resume-preview {
            background-image: repeating-linear-gradient(
              to bottom,
              transparent,
              transparent calc(297mm - 1px),
              rgba(107,114,128,0.25) calc(297mm - 1px),
              transparent 297mm
            );
            background-clip: padding-box;
          }
        }
        /* Prevent awkward splits in common blocks */
        #resume-preview section,
        #resume-preview header,
        #resume-preview h1,
        #resume-preview h2,
        #resume-preview h3,
        #resume-preview .avoid-break {
          break-inside: avoid;
          page-break-inside: avoid;
        }
        @media print {
          html, body {
            width: 210mm;
            height: 297mm;
            overflow: hidden;
          }
          body * {
            visibility: hidden;
          }
          #resume-preview, #resume-preview * {
            visibility: visible;
          }
          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 210mm;
            height: auto;
            margin: 0;
            padding: 0;
            box-shadow: none !important;
            border: none !important;
          }
          /* Ensure content flows to next A4 page when needed */
          #resume-preview section,
          #resume-preview header,
          #resume-preview h1,
          #resume-preview h2,
          #resume-preview h3,
          #resume-preview .avoid-break {
            break-inside: avoid-page;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  )
}

export default ResumePreview

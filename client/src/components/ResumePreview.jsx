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

const ResumePreview = ({ data, template, formatting, classes = "" }) => {

  /* ---------------- NORMALIZER ---------------- */
  const normalize = (r) => {
    const out = JSON.parse(JSON.stringify(r || {}))

    // skills normalizer
    if (Array.isArray(out.skills)) {
      const detailed = out.skills.map((s) =>
        typeof s === "string" ? { name: s } : s
      ).filter(Boolean)

      out.skills = detailed
      out.skills_legacy = detailed.map((s) => s.name)
    }

    // project alias
    if (Array.isArray(out.projects)) out.project = out.projects

    // hobbies <-> interests
    if (!Array.isArray(out.hobbies) && Array.isArray(out.interests))
      out.hobbies = out.interests

    if (!Array.isArray(out.interests) && Array.isArray(out.hobbies))
      out.interests = out.hobbies

    // volunteer alias
    if (!Array.isArray(out.volunteer_experience) && Array.isArray(out.volunteer))
      out.volunteer_experience = out.volunteer

    // experience enhancements
    if (Array.isArray(out.experience)) {
      out.experience = out.experience.map((e) => ({
        ...e,
        position: e?.position || e?.title || "",
      }))
    }

    // education normalization
    if (Array.isArray(out.education)) {
      out.education = out.education.map((ed) => ({
        ...ed,
        institution: ed?.institution || ed?.school || "",
        degree:
          ed?.degree ||
          ed?.level ||
          ed?.program ||
          ed?.field ||
          "",
        gpa: ed?.gpa || ed?.score || "",
        score: ed?.score || ed?.gpa || "",
        graduation_date: ed?.graduation_date || ed?.end_date || "",
      }))
    }

    // achievements → unify format
    if (Array.isArray(out.achievements)) {
      out.achievements = out.achievements.map((a) => {
        if (typeof a === "string") return { title: a }

        return {
          title: a?.title || a?.name || "",
          organization:
            a?.organization ||
            a?.issuer ||
            a?.institution ||
            a?.school ||
            "",
          description: a?.description || "",
          link: a?.link || "",
          start_date: a?.start_date || "",
          end_date: a?.end_date || "",
          is_current: !!a?.is_current,
        }
      })
    }

    return out
  }

  const normalized = normalize(data)

  /* ---------------- TEMPLATE RENDERER ---------------- */
  const renderTemplate = () => {
    const props = { data: normalized, formatting }

    switch (template) {
      case "modern":              return <ModernTemplate {...props} />
      case "minimal":             return <MinimalTemplate {...props} />
      case "minimal-image":       return <MinimalImageTemplate {...props} />
      case "professional":        return <ProfessionalTemplate {...props} />
      case "professional-image":  return <ProfessionalImageTemplate {...props} />
      case "creative":            return <CreativeTemplate {...props} />
      case "creative-image":      return <CreativeImageTemplate {...props} />
      case "executive":           return <ExecutiveTemplate {...props} />
      case "executive-image":     return <ExecutiveImageTemplate {...props} />
      case "technical":           return <TechnicalTemplate {...props} />
      default:                    return <ClassicTemplate {...props} />
    }
  }

  /* ---------------- RENDER WRAPPER ---------------- */
  return (
    <div className="w-full bg-gray-100 overflow-x-hidden">
      <div
        id="resume-preview"
        className={`border border-gray-200 print:shadow-none print:border-none mx-auto ${classes}`}
      >
        {renderTemplate()}
      </div>

      <style>{`
        @page { size: A4; margin: 0; }

        #resume-preview {
          width: 210mm;
          max-width: 100%;
          min-height: 297mm;
          background: white;
          box-sizing: border-box;
        }

        @media screen {
          #resume-preview {
            background-image: repeating-linear-gradient(
              to bottom,
              transparent,
              transparent calc(297mm - 1px),
              rgba(107,114,128,0.25) calc(297mm - 1px),
              transparent 297mm
            );
          }
        }

        @media print {
          html, body {
            width: 210mm;
            height: 297mm;
            overflow: hidden;
          }
          body * { visibility: hidden; }
          #resume-preview, #resume-preview * {
            visibility: visible;
          }
          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            margin: 0;
            padding: 0;
            width: 210mm;
            border: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default ResumePreview

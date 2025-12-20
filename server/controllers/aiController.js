// controllers/aiController.js
import Resume from "../models/Resume.model.js";
import ai from "../configs/ai.js";

// ---------- Helpers ----------
const safeArray = (val) => (Array.isArray(val) ? val : []);
const firstDefined = (...vals) =>
  vals.find((v) => v !== undefined && v !== null);

const normalizeResumeData = (raw = {}) => {
  // ----- EXPERIENCE -----
  const experience = safeArray(raw.experience).map((exp = {}) => ({
    // your schema requires `title` & `company`
    title: firstDefined(exp.title, exp.position, ""), // map position → title when needed
    company: exp.company || "",
    employment_type: exp.employment_type || "",
    location: exp.location || "",
    start_date: exp.start_date || "",
    end_date: exp.end_date || "",
    is_current: typeof exp.is_current === "boolean" ? exp.is_current : false,
    description: exp.description || "",
    achievements: safeArray(exp.achievements),
    technologies: safeArray(exp.technologies),
    link: exp.link || "",
  }));

  // ----- PROJECTS -----
  const rawProjects = raw.projects || raw.project || []; // support both keys
  const projects = safeArray(rawProjects).map((p = {}) => ({
    name: p.name || "",
    role: p.role || "",
    type: p.type || "",
    description: p.description || "",
    technologies: safeArray(p.technologies),
    link: p.link || "",
    start_date: p.start_date || "",
    end_date: p.end_date || "",
    highlights: safeArray(p.highlights),
  }));

  // ----- EDUCATION -----
  const education = safeArray(raw.education).map((edu = {}) => ({
    degree: edu.degree || "",
    field: edu.field || "",
    school: edu.school || edu.institution || "",
    link: edu.link || "",
    start_date: edu.start_date || edu.startDate || "",
    end_date: edu.end_date || edu.endDate || edu.graduation_date || "",
    is_current: typeof edu.is_current === "boolean" ? edu.is_current : false,
    location: edu.location || edu.board_university || "",
    description: edu.description || "",
    grade: edu.grade || edu.percentage || edu.gpa || "",
  }));

  // ----- CERTIFICATIONS -----
  const certifications = safeArray(raw.certifications).map((c = {}) => ({
    name: c.name || "",
    issuer: c.issuer || "",
    issue_date: c.issue_date || "",
    expiry_date: c.expiry_date || "",
    credential_id: c.credential_id || "",
    credential_url: c.credential_url || "",
    link: c.link || "",
  }));

  // ----- LANGUAGES -----
  const languages = safeArray(raw.languages).map((l = {}) => ({
    name: l.name || "",
    proficiency: l.proficiency || "",
  }));

  // ----- ACHIEVEMENTS -----
  const achievements = safeArray(raw.achievements).map((a = {}) => ({
    title: a.title || "",
    issuer: a.issuer || "",
    date: a.date || "",
    description: a.description || "",
    link: a.link || "",
  }));

  // ----- VOLUNTEER EXPERIENCE -----
  const volunteer_experience = safeArray(
    raw.volunteer_experience
  ).map((v = {}) => ({
    role: v.role || "",
    organization: v.organization || "",
    location: v.location || "",
    start_date: v.start_date || "",
    end_date: v.end_date || "",
    description: v.description || "",
    link: v.link || "",
  }));

  // ----- CUSTOM SECTIONS -----
  const custom_sections = safeArray(raw.custom_sections).map((c = {}) => ({
    title: c.title || "",
    items: safeArray(c.items),
    link: c.link || "",
  }));

  return {
    professional_summary: raw.professional_summary || "",
    headline: raw.headline || "",
    target_role: raw.target_role || "",
    // skills: your schema's `set` will normalize strings → { name }
    skills: raw.skills || [],
    personal_info: {
      image: raw.personal_info?.image || "",
      full_name: raw.personal_info?.full_name || "",
      profession: raw.personal_info?.profession || "",
      email: raw.personal_info?.email || "",
      phone: raw.personal_info?.phone || "",
      location: raw.personal_info?.location || "",
      linkedin: raw.personal_info?.linkedin || "",
      github: raw.personal_info?.github || "",
      website: raw.personal_info?.website || "",
      date_of_birth: raw.personal_info?.date_of_birth || "",
      nationality: raw.personal_info?.nationality || "",
    },
    experience,
    projects,
    education,
    certifications,
    languages,
    achievements,
    volunteer_experience,
    hobbies: safeArray(raw.hobbies),
    custom_sections,
    formatting: {
      layout: { columns: raw.formatting?.layout?.columns || 1 },
      spacing: {
        font_size: raw.formatting?.spacing?.font_size || 11,
        line_height: raw.formatting?.spacing?.line_height || 1.3,
        margin_horizontal: raw.formatting?.spacing?.margin_horizontal || 16,
        margin_vertical: raw.formatting?.spacing?.margin_vertical || 16,
        section_spacing: raw.formatting?.spacing?.section_spacing || 6,
      },
      colors: {
        primary: raw.formatting?.colors?.primary || "#000000",
        secondary: raw.formatting?.colors?.secondary || "#4B5563",
        accent: raw.formatting?.colors?.accent || "#3B82F6",
        text: raw.formatting?.colors?.text || "#1F2937",
        background: raw.formatting?.colors?.background || "#FFFFFF",
      },
      section_order: Array.isArray(raw.formatting?.section_order)
        ? raw.formatting.section_order
        : [
          "personal",
          "summary",
          "experience",
          "education",
          "projects",
          "skills",
          "certifications",
          "languages",
          "achievements",
          "volunteer",
          "hobbies",
          "custom",
        ],
      section_visibility: raw.formatting?.section_visibility || {
        personal: true,
        summary: true,
        experience: true,
        education: true,
        projects: true,
        skills: true,
        certifications: true,
        languages: true,
        achievements: true,
        volunteer: true,
        hobbies: true,
        custom: true,
      },
      section_titles: raw.formatting?.section_titles || {},
    },
  };
};

// -------------------------------------------------------------
// controller for enhancing a resume's professional summary
// POST: /api/ai/enhance-pro-sum
// -------------------------------------------------------------
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res
        .status(400)
        .json({ message: "User content is required" });
    }

    if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_MODEL) {
      return res
        .status(500)
        .json({ message: "AI configuration is missing" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly, and only return text no options or anything else.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content;

    return res.status(200).json({
      message: "Professional summary enhanced successfully",
      enhancedContent,
    });
  } catch (error) {
    const message =
      error?.response?.data?.error?.message ||
      error?.message ||
      "Something went wrong";
    return res.status(400).json({ message });
  }
};

// -------------------------------------------------------------
// controller for enhancing a resume's job description
// POST: /api/ai/enhance-job-desc
// -------------------------------------------------------------
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res
        .status(400)
        .json({ message: "User content is required" });
    }

    if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_MODEL) {
      return res
        .status(500)
        .json({ message: "AI configuration is missing" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be only in 1-2 sentence also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly, and only return text no options or anything else.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content;

    return res.status(200).json({
      message: "Job description enhanced successfully",
      enhancedContent,
    });
  } catch (error) {
    const message =
      error?.response?.data?.error?.message ||
      error?.message ||
      "Something went wrong";
    return res.status(400).json({ message });
  }
};

// -------------------------------------------------------------
// controller for uploading a resume to the database
// POST: /api/ai/upload-resume
// -------------------------------------------------------------
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText || !title || !userId) {
      return res
        .status(400)
        .json({ message: "Missing required fields" });
    }

    if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_MODEL) {
      return res
        .status(500)
        .json({ message: "AI configuration is missing" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: `
You are an expert AI agent that extracts structured data from a resume.

Return ONLY a valid JSON object (no markdown, no comments, no extra text) that matches this shape:

{
  "professional_summary": "",
  "headline": "",
  "target_role": "",
  "skills": [
    {
      "name": "",
      "level": "",
      "category": ""
    }
  ],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "github": "",
    "website": "",
    "date_of_birth": "",
    "nationality": ""
  },
  "experience": [
    {
      "title": "",
      "company": "",
      "employment_type": "",
      "location": "",
      "start_date": "",
      "end_date": "",
      "is_current": false,
      "description": "",
      "achievements": [""],
      "technologies": [""],
      "link": ""
    }
  ],
  "projects": [
    {
      "name": "",
      "role": "",
      "type": "",
      "description": "",
      "technologies": [""],
      "link": "",
      "start_date": "",
      "end_date": "",
      "highlights": [""]
    }
  ],
  "education": [
    {
      "degree": "",
      "school": "",
      "field": "",
      "link": "",
      "start_date": "",
      "end_date": "",
      is_current: "",
      "location": "",
      "description": "",
      "grade": ""
    }
  ],
  "certifications": [
    {
      "name": "",
      "issuer": "",
      "issue_date": "",
      "expiry_date": "",
      "credential_id": "",
      "credential_url": "",
      "link": ""
    }
  ],
  "languages": [
    {
      "name": "",
      "proficiency": ""
    }
  ],
  "achievements": [
    {
      "title": "",
      "issuer": "",
      "date": "",
      "description": "",
      "link": ""
    }
  ],
  "volunteer_experience": [
    {
      "role": "",
      "organization": "",
      "location": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "link": ""
    }
  ],
  "hobbies": [""],
  "custom_sections": [
    {
      "title": "",
      "items": [""],
      "link": ""
    }
  ]
}

If some information is not present in the resume, either omit the field or set it to an empty string/empty array.
          `.trim(),
        },
        {
          role: "user",
          content: `Extract structured resume data from the following resume text:\n\n${resumeText}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const extractedData = response.choices[0]?.message?.content;
    if (!extractedData) {
      return res
        .status(400)
        .json({ message: "AI did not return any data." });
    }

    let parsedResumeData;
    try {
      parsedResumeData = JSON.parse(extractedData);
    } catch (e) {
      return res
        .status(400)
        .json({ message: "Failed to parse resume data." });
    }

    const normalizedData = normalizeResumeData(parsedResumeData);

    const newResume = await Resume.create({
      userId,
      title,
      ...normalizedData,
    });

    return res.status(201).json({
      message: "Resume uploaded successfully",
      resumeId: newResume._id,
    });
  } catch (error) {
    const message =
      error?.response?.data?.error?.message ||
      error?.message ||
      "Something went wrong";
    return res.status(400).json({ message });
  }
};

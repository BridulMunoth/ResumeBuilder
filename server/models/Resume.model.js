// models/Resume.js
import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, default: "Untitled Resume" },
    public: { type: Boolean, default: false },
    template: { type: String, default: "classic" },
    accent_color: { type: String, default: "#3B82F6" },

    professional_summary: { type: String, default: "" },
    headline: { type: String, default: "" },
    target_role: { type: String, default: "" },

    // ---------- SKILLS ----------
    skills: {
      type: [
        {
          name: { type: String, required: true },
          level: { type: String, default: "" },
          category: { type: String, default: "" },
        },
      ],
      default: [],
      set: (val) => {
        // Normalize legacy formats to [{ name, level, category }]
        if (Array.isArray(val)) {
          return val
            .map((s) =>
              typeof s === "string"
                ? { name: s }
                : {
                  name: s.name || "",
                  level: s.level || "",
                  category: s.category || "",
                }
            )
            .filter(
              (s) =>
                s &&
                typeof s.name === "string" &&
                s.name.trim() !== ""
            );
        }
        if (typeof val === "string") {
          return val
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
            .map((name) => ({ name }));
        }
        return [];
      },
    },

    // ---------- PERSONAL INFO ----------
    personal_info: {
      image: { type: String, default: "" },
      full_name: { type: String, default: "" },
      profession: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      website: { type: String, default: "" },
      date_of_birth: { type: String, default: "" },
      nationality: { type: String, default: "" },
    },

    // ---------- EXPERIENCE ----------
    experience: [
      {
        title: { type: String, required: true },
        company: { type: String, required: true },
        employment_type: { type: String, default: "" },
        location: { type: String, default: "" },
        start_date: { type: String, default: "" },
        end_date: { type: String, default: "" },
        is_current: { type: Boolean, default: false },
        description: { type: String, default: "" },
        achievements: { type: [String], default: [] },
        technologies: { type: [String], default: [] },
        link: { type: String, default: "" },
      },
    ],

    // ---------- PROJECTS ----------
    projects: {
      type: [
        {
          name: { type: String, required: true },
          role: { type: String, default: "" },
          type: { type: String, default: "" },
          description: { type: String, default: "" },
          technologies: { type: [String], default: [] },
          link: { type: String, default: "" },
          start_date: { type: String, default: "" },
          end_date: { type: String, default: "" },
          highlights: { type: [String], default: [] },
        },
      ],
      default: [],
    },

    // ---------- EDUCATION ----------
    education: {
      type: [
        {
          // Degree (B.Sc., BCA, etc.)
          degree: { type: String, default: "", trim: true },

          // School / University
          school: { type: String, default: "", trim: true },

          field: { type: String, default: "", trim: true },

          // Link (college / course URL)
          link: { type: String, default: "", trim: true },

          // Start & End Dates
          start_date: { type: String, default: "" },
          end_date: { type: String, default: "" },

          // Currently studying flag
          is_current: { type: Boolean, default: false },

          // Location (city, state)
          location: { type: String, default: "", trim: true },

          // Description
          description: { type: String, default: "" },

          // ✅ NEW: Grade / Percentage / GPA
          grade: { type: String, default: "", trim: true },
        },
      ],
      default: [],

      // Keep a normalizer so older shapes don't break
      set: (arr) => {
        if (!Array.isArray(arr)) return [];

        return arr.map((e) => {
          const edu = e || {};

          const legacyDegreeParts = [
            edu.degree,
            edu.level,
            edu.program
          ].filter(Boolean);

          return {
            degree: legacyDegreeParts.join(" ").trim(),
            school: edu.school || edu.institution || "",
            field: edu.field || "",
            link: edu.link || "",
            start_date: edu.start_date || edu.startDate || "",
            end_date:
              edu.end_date || edu.endDate || edu.graduation_date || "",
            is_current: typeof edu.is_current === "boolean" ? edu.is_current : false,
            location: edu.location || edu.board_university || "",
            description: edu.description || "",
            // ✅ map any legacy grade shapes here
            grade: edu.grade || edu.percentage || edu.gpa || "",
          };
        });
      },
    },


    // ---------- CERTIFICATIONS ----------
    certifications: {
      type: [
        {
          name: { type: String, required: true },
          issuer: { type: String, default: "" },
          issue_date: { type: String, default: "" },
          expiry_date: { type: String, default: "" },
          credential_id: { type: String, default: "" },
          credential_url: { type: String, default: "" },
          link: { type: String, default: "" },
        },
      ],
      default: [],
    },

    // ---------- LANGUAGES ----------
    languages: {
      type: [
        {
          name: { type: String, required: true },
          proficiency: { type: String, default: "" },
        },
      ],
      default: [],
    },

    // ---------- ACHIEVEMENTS ----------
    achievements: {
      type: [
        {
          title: { type: String, required: true },
          issuer: { type: String, default: "" },
          date: { type: String, default: "" },
          description: { type: String, default: "" },
          link: { type: String, default: "" },
        },
      ],
      default: [],
    },

    // ---------- VOLUNTEER EXPERIENCE ----------
    volunteer_experience: {
      type: [
        {
          role: { type: String, default: "" },
          organization: { type: String, default: "" },
          location: { type: String, default: "" },
          start_date: { type: String, default: "" },
          end_date: { type: String, default: "" },
          description: { type: String, default: "" },
          link: { type: String, default: "" },
        },
      ],
      default: [],
    },

    // ---------- HOBBIES ----------
    hobbies: { type: [String], default: [] },

    // ---------- CUSTOM SECTIONS ----------
    custom_sections: {
      type: [
        {
          title: { type: String, required: true },
          items: { type: [String], default: [] },
          link: { type: String, default: "" },
        },
      ],
      default: [],
    },
    // ---------- FORMATTING ----------
    formatting: {
      layout: {
        columns: { type: Number, default: 1 }, // 1 or 2
      },
      spacing: {
        font_size: { type: Number, default: 11 }, // pt
        line_height: { type: Number, default: 1.3 },
        margin_horizontal: { type: Number, default: 16 }, // mm
        margin_vertical: { type: Number, default: 16 }, // mm
        section_spacing: { type: Number, default: 6 }, // mm
      },
      colors: {
        primary: { type: String, default: "#000000" },
        secondary: { type: String, default: "#4B5563" },
        accent: { type: String, default: "#3B82F6" },
        text: { type: String, default: "#1F2937" },
        background: { type: String, default: "#FFFFFF" },
      },
      section_order: {
        type: [String],
        default: [
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
      },
      section_visibility: {
        type: Map,
        of: Boolean,
        default: {
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
      },
      section_titles: {
        type: Map,
        of: String,
        default: {},
      },
    },
  },
  { timestamps: true, minimize: false }
);

const Resume = mongoose.model("Resume", ResumeSchema);
export default Resume;

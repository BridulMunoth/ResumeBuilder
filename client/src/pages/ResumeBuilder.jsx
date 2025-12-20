import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Icon,
  Section,
  Share2Icon,
  Sparkles,
  SparklesIcon,
  User,
  X,
  Palette,
  Languages,
  Trophy,
  Award,
  HeartHandshake,
  Smile,
  Layers, // Added Palette icon
} from "lucide-react";
import CustomizePanel from "../components/CustomizePanel"; // Imported CustomizePanel
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryform from "../components/ProfessionalSummaryform";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import CertificationsForm from "../components/CertificationsForm";
import LanguagesForm from "../components/LanguagesForm";
import AchievementsForm from "../components/AchievementsForm";
import VolunteerForm from "../components/VolunteerForm";
import HobbiesForm from "../components/HobbiesForm";
import CustomSectionsForm from "../components/CustomSectionsForm";
import api from "../configs/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

// Normalize backend data to form-friendly shapes
const normalizeResume = (r) => {
  const out = { ...r };

  // skills: strings -> objects (dedup by name)
  if (Array.isArray(out.skills)) {
    out.skills = out.skills
      .map((s) => (typeof s === "string" ? { name: s } : s))
      .filter((s) => s && typeof s.name === "string" && s.name.trim() !== "");
    const seen = new Set();
    out.skills = out.skills.filter((s) => {
      const key = s.name.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  } else if (!out.skills) {
    out.skills = [];
  }

  // projects: legacy 'project' -> 'projects'
  if (Array.isArray(out.project) && !Array.isArray(out.projects)) {
    out.projects = out.project;
    delete out.project;
  }
  if (!Array.isArray(out.projects)) out.projects = [];

  // projects: arrays -> strings for form fields
  out.projects = out.projects.map((p) => {
    const normalized = { ...p };
    if (Array.isArray(normalized.technologies)) {
      normalized.technologies = normalized.technologies
        .map((t) => (typeof t === "string" ? t.trim() : ""))
        .filter(Boolean)
        .join(", ");
    } else if (typeof normalized.technologies !== "string") {
      normalized.technologies = "";
    }
    if (Array.isArray(normalized.highlights)) {
      normalized.highlights = normalized.highlights
        .map((h) => (typeof h === "string" ? h.trim() : ""))
        .filter(Boolean)
        .join("\n");
    } else if (typeof normalized.highlights !== "string") {
      normalized.highlights = "";
    }
    return normalized;
  });

  // experience: ensure title present and arrays -> strings
  if (Array.isArray(out.experience)) {
    out.experience = out.experience.map((e) => {
      const normalized = { ...e, title: e?.title || e?.position || "" };
      if (Array.isArray(normalized.technologies)) {
        normalized.technologies = normalized.technologies
          .map((t) => (typeof t === "string" ? t.trim() : ""))
          .filter(Boolean)
          .join(", ");
      } else if (typeof normalized.technologies !== "string") {
        normalized.technologies = "";
      }
      if (Array.isArray(normalized.achievements)) {
        normalized.achievements = normalized.achievements
          .map((a) => (typeof a === "string" ? a.trim() : ""))
          .filter(Boolean)
          .join("\n");
      } else if (typeof normalized.achievements !== "string") {
        normalized.achievements = "";
      }
      return normalized;
    });
  } else out.experience = [];

  // education: preserve school/institution and common fallbacks
  if (Array.isArray(out.education)) {
    out.education = out.education.map((ed) => {
      const rawDesc = ed?.description || "";
      const pursuingPattern = /\(?\s*pursu(?:ing)?\s*\)?/gi;
      const hasPursuing = pursuingPattern.test(rawDesc);
      const cleanedDesc = rawDesc.replace(pursuingPattern, "").trim();
      return {
        level: ed?.level || ed?.degree || "",
        program: ed?.program || "",
        field: ed?.field || "",
        // ensure both keys exist for compatibility with form/templates
        school: ed?.school || ed?.institution || "",
        institution: ed?.institution || ed?.school || "",
        board_university: ed?.board_university || "",
        location: ed?.location || ed?.board_university || "",
        start_date: ed?.start_date || ed?.startDate || "",
        end_date: ed?.end_date || ed?.endDate || ed?.graduation_date || "",
        is_current:
          typeof ed?.is_current === "boolean"
            ? ed.is_current
            : hasPursuing
            ? true
            : false,
        // score/grade legacy fallbacks
        score: ed?.score || ed?.gpa || ed?.grade || "",
        grade: ed?.grade || ed?.gpa || ed?.percentage || ed?.score || "",
        description: cleanedDesc,
        link: ed?.link || "",
      };
    });
  } else out.education = [];

  // ensure new arrays exist
  out.certifications = Array.isArray(out.certifications)
    ? out.certifications
    : [];
  out.languages = Array.isArray(out.languages) ? out.languages : [];
  out.achievements = Array.isArray(out.achievements) ? out.achievements : [];
  out.volunteer_experience = Array.isArray(out.volunteer_experience)
    ? out.volunteer_experience
    : [];
  out.hobbies = Array.isArray(out.hobbies) ? out.hobbies : [];

  // custom_sections: items array -> newline string for form
  out.custom_sections = Array.isArray(out.custom_sections)
    ? out.custom_sections.map((sec) => {
        const normalized = { ...sec };
        if (Array.isArray(normalized.items)) {
          normalized.items = normalized.items
            .map((s) => (typeof s === "string" ? s.trim() : ""))
            .filter(Boolean)
            .join("\n");
        } else if (typeof normalized.items !== "string") {
          normalized.items = "";
        }
        return normalized;
      })
    : [];

  return out;
};

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    headline: "",
    target_role: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    certifications: [],
    languages: [],
    achievements: [],
    volunteer_experience: [],
    hobbies: [],
    custom_sections: [],
    template: "classic",
    accent_color: "#3882F6",
    public: false,
    formatting: {
      layout: { columns: 1 },
      spacing: {
        font_size: 11,
        line_height: 1.3,
        margin_horizontal: 16,
        margin_vertical: 16,
        section_spacing: 6,
      },
      colors: {
        primary: "#000000",
        secondary: "#4B5563",
        accent: "#3B82F6",
        text: "#1F2937",
        background: "#FFFFFF",
      },
      section_order: [
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
      section_visibility: {
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
      section_titles: {},
    },
  });

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get(`/api/resumes/get/${resumeId}`, {
        headers: { Authorization: token },
      });

      if (data.resume) {
        const normalized = normalizeResume(data.resume); // ✅ uses top-level helper
        setResumeData(normalized);
        document.title = data.resume.title;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isCustomizeMode, setIsCustomizeMode] = useState(false); // New state for customize mode

  const sections = [
    { id: "personal", name: "Personal Info", Icon: User },
    { id: "summary", name: "Summary", Icon: FileText },
    { id: "experience", name: "Experience", Icon: Briefcase },
    { id: "education", name: "Education", Icon: GraduationCap },
    { id: "projects", name: "Projects", Icon: FolderIcon },
    { id: "skills", name: "Skills", Icon: Sparkles },
    { id: "certifications", name: "Certifications", Icon: Award },
    { id: "languages", name: "Languages", Icon: Languages },
    { id: "achievements", name: "Achievements", Icon: Trophy },
    { id: "volunteer", name: "Volunteer", Icon: HeartHandshake },
    { id: "hobbies", name: "Hobbies", Icon: Smile },
    { id: "custom", name: "Custom Sections", Icon: Layers },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    loadExistingResume();
  }, []);

  const toggleResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append(
        "resumeData",
        JSON.stringify({ public: !resumeData.public })
      );
      const { data } = await api.put(`/api/resumes/update`, formData, {
        headers: { Authorization: token },
      });
      setResumeData({ ...resumeData, public: !resumeData.public });
      toast.success(data.message);
    } catch (error) {
      console.log("Error saving resume visibility", error.message);
    }
  };

  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = frontendUrl + "/view/" + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else {
      alert("Share not supported on this Browser.");
    }
  };

  const downloadResume = () => {
    window.print();
  };

  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData);

      // remove image from updatedResumeData
      if (typeof resumeData.personal_info.image === "object") {
        delete updatedResumeData.personal_info.image;
      }

      // NORMALIZE STRINGS → ARRAYS BEFORE SENDING
      // EXPERIENCE: technologies (comma) + achievements (newline)
      updatedResumeData.experience = (updatedResumeData.experience || []).map(
        (exp) => {
          const out = { ...exp };
          if (typeof out.technologies === "string") {
            out.technologies = out.technologies
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean);
          } else if (!Array.isArray(out.technologies)) {
            out.technologies = [];
          }
          if (typeof out.achievements === "string") {
            out.achievements = out.achievements
              .split("\n")
              .map((a) => a.trim())
              .filter(Boolean);
          } else if (!Array.isArray(out.achievements)) {
            out.achievements = [];
          }
          return out;
        }
      );

      // PROJECTS: technologies (comma) + highlights (newline)
      updatedResumeData.projects = (updatedResumeData.projects || []).map(
        (project) => {
          const out = { ...project };
          if (typeof out.technologies === "string") {
            out.technologies = out.technologies
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean);
          } else if (!Array.isArray(out.technologies)) {
            out.technologies = [];
          }
          if (typeof out.highlights === "string") {
            out.highlights = out.highlights
              .split("\n")
              .map((h) => h.trim())
              .filter(Boolean);
          } else if (!Array.isArray(out.highlights)) {
            out.highlights = [];
          }
          return out;
        }
      );

      // CUSTOM SECTIONS: items (newline)
      updatedResumeData.custom_sections = (
        updatedResumeData.custom_sections || []
      ).map((section) => {
        const out = { ...section };
        if (typeof out.items === "string") {
          out.items = out.items
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean);
        } else if (!Array.isArray(out.items)) {
          out.items = [];
        }
        return out;
      });

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updatedResumeData));
      removeBackground && formData.append("removeBackground", "yes");
      typeof resumeData.personal_info.image === "object" &&
        formData.append("image", resumeData.personal_info.image);
      const { data } = await api.put(`/api/resumes/update`, formData, {
        headers: { Authorization: token },
      });
      const normalizedAfterSave = normalizeResume(data.resume);
      setResumeData(normalizedAfterSave);
      toast.success(data.message);
    } catch (error) {
      console.log("Error saving resume", error.message);
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4" /> Back to DashBoard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Panel - Form */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              {/* progress bar using activeSectionIndex */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000"
                style={{
                  width: `${
                    (activeSectionIndex * 100) / (sections.length - 1)
                  }%`,
                }}
              />

              {/* Section Navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div className="flex  items-center gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />
                </div>
                {/* Customize Toggle */}
                <button
                  onClick={() => setIsCustomizeMode(!isCustomizeMode)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    isCustomizeMode
                      ? "bg-blue-50 text-blue-600 ring-1 ring-blue-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Palette className="size-4" />
                  {isCustomizeMode ? "Back to Edit" : "Customize"}
                </button>

                {!isCustomizeMode && (
                  <div className="flex items-center">
                    {activeSectionIndex !== 0 && (
                      <button
                        onClick={() =>
                          setActiveSectionIndex((previIndex) =>
                            Math.max(previIndex - 1, 0)
                          )
                        }
                        className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                        disabled={activeSectionIndex === 0}
                      >
                        <ChevronLeft className="size-4" /> Previous
                      </button>
                    )}
                    <button
                      onClick={() =>
                        setActiveSectionIndex((previIndex) =>
                          Math.min(previIndex + 1, sections.length - 1)
                        )
                      }
                      className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
                        activeSectionIndex === sections.length - 1 &&
                        "opacity-50"
                      }`}
                      disabled={activeSectionIndex === sections.length - 1}
                    >
                      Next <ChevronRight className="size-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Form Content or Customize Panel */}
              <div className="h-[calc(100vh-300px)] lg:h-auto overflow-y-auto custom-scrollbar">
                {isCustomizeMode ? (
                  <CustomizePanel
                    formatting={resumeData.formatting}
                    onChange={(key, value) => {
                      setResumeData((prev) => {
                        const newFormatting = { ...prev.formatting };
                        if (
                          key === "spacing" ||
                          key === "layout" ||
                          key === "colors"
                        ) {
                          newFormatting[key] = {
                            ...newFormatting[key],
                            ...value,
                          };
                        } else {
                          newFormatting[key] = value;
                        }

                        const updates = { ...prev, formatting: newFormatting };
                        if (key === "colors" && value.accent) {
                          updates.accent_color = value.accent;
                        }
                        return updates;
                      });
                    }}
                    sectionsList={sections}
                  />
                ) : (
                  <div className="space-y-6">
                    {activeSection.id === "personal" && (
                      <PersonalInfoForm
                        data={resumeData.personal_info}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            personal_info: data,
                          }))
                        }
                        removeBackground={removeBackground}
                        setRemoveBackground={setRemoveBackground}
                      />
                    )}
                    {activeSection.id === "summary" && (
                      <ProfessionalSummaryform
                        data={resumeData.professional_summary}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            professional_summary: data,
                          }))
                        }
                        setResumeData={setResumeData}
                      />
                    )}
                    {activeSection.id === "experience" && (
                      <ExperienceForm
                        data={resumeData.experience}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            experience: data,
                          }))
                        }
                      />
                    )}
                    {activeSection.id === "education" && (
                      <EducationForm
                        data={resumeData.education}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            education: data,
                          }))
                        }
                      />
                    )}
                    {activeSection.id === "projects" && (
                      <ProjectForm
                        data={resumeData.projects}
                        onChange={(data) =>
                          setResumeData((prev) => ({ ...prev, projects: data }))
                        }
                      />
                    )}
                    {activeSection.id === "skills" && (
                      <SkillsForm
                        data={resumeData.skills}
                        onChange={(data) =>
                          setResumeData((prev) => ({ ...prev, skills: data }))
                        }
                      />
                    )}
                    {activeSection.id === "certifications" && (
                      <CertificationsForm
                        data={resumeData.certifications}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            certifications: data,
                          }))
                        }
                      />
                    )}
                    {activeSection.id === "languages" && (
                      <LanguagesForm
                        data={resumeData.languages}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            languages: data,
                          }))
                        }
                      />
                    )}
                    {activeSection.id === "achievements" && (
                      <AchievementsForm
                        data={resumeData.achievements}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            achievements: data,
                          }))
                        }
                      />
                    )}
                    {activeSection.id === "volunteer" && (
                      <VolunteerForm
                        data={resumeData.volunteer_experience}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            volunteer_experience: data,
                          }))
                        }
                      />
                    )}
                    {activeSection.id === "hobbies" && (
                      <HobbiesForm
                        data={resumeData.hobbies}
                        onChange={(data) =>
                          setResumeData((prev) => ({ ...prev, hobbies: data }))
                        }
                      />
                    )}
                    {activeSection.id === "custom" && (
                      <CustomSectionsForm
                        data={resumeData.custom_sections}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            custom_sections: data,
                          }))
                        }
                      />
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  toast.promise(saveResume, {
                    loading: "Saving...",
                    success: "Resume Saved Successfully",
                    error: "Failed to Save Resume",
                  });
                }}
                className="bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Right Panel - Preview*/}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                {resumeData.public && (
                  <button
                    onClick={handleShare}
                    className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors"
                  >
                    <Share2Icon className="size-4" /> Share
                  </button>
                )}
                <button
                  onClick={toggleResumeVisibility}
                  className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 ring-purple-300 rounded-lg hover:ring transition-colors"
                >
                  {resumeData.public ? (
                    <EyeIcon className="size-4" />
                  ) : (
                    <EyeOffIcon className="size-4" />
                  )}
                  {resumeData.public ? "Public" : "Private"}
                </button>
                <button
                  onClick={downloadResume}
                  className="flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors"
                >
                  <DownloadIcon className="size-4" /> Download
                </button>
              </div>
            </div>

            <div
              role="button"
              title="Open full preview"
              onClick={() => setPreviewOpen(true)}
              className="group cursor-zoom-in transition outline-none"
            >
              <div className="rounded-md ring-0 ring-blue-200 group-hover:ring-2 group-active:ring-4">
                <ResumePreview
                  data={resumeData}
                  template={resumeData.template}
                  accentColor={resumeData.accent_color}
                  formatting={resumeData.formatting} // Pass formatting
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {previewOpen && (
        <div className="fixed inset-0 z-[200]">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setPreviewOpen(false)}
          />
          <div
            className="absolute inset-0 flex items-center justify-center p-4"
            onClick={() => setPreviewOpen(false)}
          >
            <div
              className="relative max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close preview"
                onClick={() => setPreviewOpen(false)}
                className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow ring-1 ring-gray-300 hover:bg-white hover:text-gray-800"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="bg-white shadow-2xl ring-1 ring-black/10 rounded-xl">
                <ResumePreview
                  data={resumeData}
                  template={resumeData.template}
                  accentColor={resumeData.accent_color}
                  formatting={resumeData.formatting} // Pass formatting
                  classes="bg-white border-0"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;

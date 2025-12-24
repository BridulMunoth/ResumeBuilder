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
  Layers,
  Printer, // Added Printer icon
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
import Loader from "../components/Loader";

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

  const [loading, setLoading] = useState(true);
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
      // Ensure a sane default font config so templates can react immediately
      font: {
        type: "sans",
        family: "Source Sans Pro",
      },
    },
  });

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get(`/api/resumes/get/${resumeId}`, {
        headers: { Authorization: token },
      });

      if (data.resume) {
        const normalized = normalizeResume(data.resume); // ✅ uses top-level helper

        // Ensure formatting + font defaults exist even for older resumes
        const withFormattingDefaults = {
          ...normalized,
          formatting: {
            ...(normalized.formatting || {}),
            font: {
              type: normalized.formatting?.font?.type || "sans",
              family: normalized.formatting?.font?.family || "Source Sans Pro",
            },
          },
        };

        setResumeData(withFormattingDefaults);
        document.title = data.resume.title;
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      // Minimum delay for premium feel
      setTimeout(() => setLoading(false), 800);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // Show loading toast
    toast.loading("Preparing your resume...", { id: "download-toast" });

    // Small delay to ensure rendering is complete
    setTimeout(() => {
      window.print();
      toast.dismiss("download-toast");
    }, 300);
  };

  const downloadAsPDF = async () => {
    const element = document.getElementById("resume-preview");

    if (!element) {
      toast.error("Resume preview not found!");
      return;
    }

    const loadingToast = toast.loading("Generating PDF... Please wait");

    try {
      // Small delay to let UI update before heavy processing
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Clone element
      const clone = element.cloneNode(true);
      clone.style.width = "210mm";
      clone.style.height = "auto";

      // Container for clone
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.appendChild(clone);
      document.body.appendChild(container);

      // 1. Map original elements to cloned elements for style retrieval
      // We can't rely on tree structure alone matching perfectly if we modify clone,
      // but walking both in lock-step is usually safe for this purpose.
      const originalWalker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_ELEMENT
      );
      const cloneWalker = document.createTreeWalker(
        clone,
        NodeFilter.SHOW_ELEMENT
      );

      let currentOriginal = originalWalker.currentNode;
      let currentClone = cloneWalker.currentNode;

      // List of properties that might contain colors
      const propsToConvert = [
        "color",
        "backgroundColor",
        "borderColor",
        "borderTopColor",
        "borderBottomColor",
        "borderLeftColor",
        "borderRightColor",
        "outlineColor",
        "textDecorationColor",
        "fill",
        "stroke",
        "boxShadow",
        "textShadow", // These are complex but getComputedStyle resolves colors inside them
      ];

      while (currentOriginal && currentClone) {
        const computed = window.getComputedStyle(currentOriginal);

        // Inline resolved RGB values
        propsToConvert.forEach((prop) => {
          const val = computed[prop];
          // Only touch it if it looks like it might strictly need resolution or is not empty
          if (
            val &&
            (val.includes("oklch") ||
              val.includes("var(") ||
              val.includes("oklab") ||
              !currentClone.style[prop])
          ) {
            currentClone.style[prop] = val;
          }
        });

        // Also handle generic 'border' or 'background' if specific ones didn't catch it
        // Note: Computed style usually breaks shorthands down, so specific props above are better.
        // But let's safely force color again just in case.
        if (computed.color) currentClone.style.color = computed.color;

        currentOriginal = originalWalker.nextNode();
        currentClone = cloneWalker.nextNode();
      }

      // html2pdf options
      const opt = {
        margin: [0, 0, 0, 0],
        filename: `${resumeData.personal_info?.full_name || "Resume"}_${
          new Date().toISOString().split("T")[0]
        }.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      };

      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf().set(opt).from(clone).save();

      document.body.removeChild(container);
      toast.dismiss(loadingToast);
      toast.success("PDF downloaded successfully! 🎉");
    } catch (error) {
      console.error("PDF generation failed:", error);
      // Clean up if container exists
      const containers = document.querySelectorAll('div[style*="-9999px"]');
      containers.forEach((c) => c.remove());

      toast.dismiss(loadingToast);
      toast.error("PDF failed. Please use the Print button instead.");
    }
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

  if (loading) {
    return <Loader />;
  }

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
          <div className="relative lg:col-span-5 rounded-lg">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              {/* Enhanced Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 rounded-t-lg overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 transition-all duration-500 ease-out shadow-[0_0_12px_rgba(34,197,94,0.6)]"
                  style={{
                    width: `${
                      (activeSectionIndex * 100) / (sections.length - 1)
                    }%`,
                  }}
                >
                  {/* Shimmer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]" />
                </div>
              </div>

              {/* Sparkle Tip Indicator */}
              <div
                className="absolute top-0 -translate-y-1/2 z-10 transition-all duration-500 ease-out pointer-events-none"
                style={{
                  left: `${
                    (activeSectionIndex * 100) / (sections.length - 1)
                  }%`,
                  opacity: activeSectionIndex === 0 ? 0 : 1,
                }}
              >
                <div className="relative -left-2">
                  <Sparkles
                    className="size-4 text-emerald-500 fill-emerald-100 drop-shadow-sm animate-pulse"
                    strokeWidth={2.5}
                  />
                </div>
              </div>

              {/* Section Navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 py-2">
                <div className="flex items-center gap-3">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />
                  <div className="h-6 w-px bg-gray-200 mx-1"></div>
                  <ColorPicker
                    accentColor={resumeData.accent_color}
                    textColor={resumeData.formatting?.colors?.text}
                    onAccentChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                        formatting: {
                          ...prev.formatting,
                          colors: {
                            ...prev.formatting.colors,
                            accent: color,
                          },
                        },
                      }))
                    }
                    onTextChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        formatting: {
                          ...prev.formatting,
                          colors: {
                            ...prev.formatting.colors,
                            text: color,
                          },
                        },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center gap-3">
                  {/* Customize Toggle */}
                  <button
                    onClick={() => setIsCustomizeMode(!isCustomizeMode)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full transition-all border ${
                      isCustomizeMode
                        ? "bg-blue-50 text-blue-600 border-blue-200 shadow-inner"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <Palette className="size-4" />
                    <span className="hidden sm:inline">
                      {isCustomizeMode ? "Back" : "Customize"}
                    </span>
                  </button>

                  {!isCustomizeMode && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          setActiveSectionIndex((previIndex) =>
                            Math.max(previIndex - 1, 0)
                          )
                        }
                        disabled={activeSectionIndex === 0}
                        title="Previous Section"
                        className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <ChevronLeft className="size-6" strokeWidth={2.5} />
                      </button>

                      <button
                        onClick={() =>
                          setActiveSectionIndex((previIndex) =>
                            Math.min(previIndex + 1, sections.length - 1)
                          )
                        }
                        disabled={activeSectionIndex === sections.length - 1}
                        title="Next Section"
                        className={`p-2 rounded-full transition-all disabled:opacity-50 ${
                          activeSectionIndex === sections.length - 1
                            ? "text-gray-300"
                            : "bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg active:scale-95"
                        }`}
                      >
                        <ChevronRight className="size-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Content or Customize Panel */}
              <div className="h-[calc(100vh-300px)] lg:h-auto overflow-y-auto custom-scrollbar scrollbar-stable">
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
                  <div
                    key={activeSection.id}
                    className="space-y-6 animate-fadeInUp"
                  >
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
                  const p = saveResume();
                  toast.promise(p, {
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
                  className="flex items-center gap-2 px-4 py-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors font-medium shadow-sm hover:shadow active:scale-95"
                  title="Print resume"
                >
                  <Printer className="size-4" /> Print
                </button>
                <button
                  onClick={downloadAsPDF}
                  className="flex items-center gap-2 px-4 py-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors font-medium shadow-sm hover:shadow active:scale-95"
                  title="Download as PDF"
                >
                  <DownloadIcon className="size-4" /> PDF
                </button>
              </div>
            </div>

            <div
              role="button"
              title="Open full preview"
              onClick={() => setPreviewOpen(true)}
              className="group cursor-zoom-in transition-all outline-none duration-500 ease-in-out p-12" // Increased padding
            >
              <div className="rounded-xl shadow-2xl ring-1 ring-black/5 group-hover:-translate-y-2 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-500 bg-white">
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
              {/* Sticky close button (no extra wrapper) */}
              <button
                type="button"
                aria-label="Close preview"
                onClick={() => setPreviewOpen(false)}
                className="sticky top-12 z-50 float-right ml-auto mr-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg ring-1 ring-gray-200 hover:bg-gray-100 transition-all transform hover:scale-105"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="shadow-2xl ring-1 ring-black/10">
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

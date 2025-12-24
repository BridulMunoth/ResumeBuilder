import React, { useState } from "react";
import SectionReorder from "./SectionReorder";
import SpacingControls from "./SpacingControls";

import SectionStyleControls from "./SectionStyleControls";

import {
  Layout,
  Palette,
  List,
  Settings,
  TextIcon,
  HeadingIcon,
  UserIcon,
} from "lucide-react";

import FontControls from "./FontControls";
import HeadingStyleControls from "./HeadingStyleControls";
import PersonalDetailsControls from "./PersonalDetailsControls";

/* ---------------------------------------------------------
   DEFAULT FORMATTING (ONLY WHAT YOU ASKED TO ADD)
--------------------------------------------------------- */
const defaultFormatting = {
  font: {
    type: "sans",
    family: "Source Sans Pro",
  },

  heading: {
    style: "underline",
    caps: "capitalize",
    size: "m",
    icon: "filled",
  },

  personal: {
    align: "left",
    arrangement: "stacked",
    bulletStyle: "icon",
    iconStyle: "filled",
  },

  skills: {
    layout: "grid",
    levelMode: "text",
    compactMode: "bullet",
    subinfo: "dash",
    customLevels: ["Beginner", "Amateur", "Competent", "Proficient", "Expert"],
  },

  languages: {
    layout: "grid",
    levelMode: "text",
    compactMode: "bullet",
    subinfo: "dash",
    customLevels: [
      "Basic",
      "Conversational",
      "Proficient",
      "Fluent",
      "Native/Bilingual",
    ],
  },

  interests: {
    layout: "compact",
    compactMode: "comma",
    subinfo: "dash",
  },

  colors: {
    accent: "#3B82F6",
    text: "#1F2937",
  },

  spacing: {},
  layout: {},
  section_order: [],
  section_visibility: {},
  section_titles: {},
};

/* ---------------------------------------------------------
   COMPONENT START
--------------------------------------------------------- */

const CustomizePanel = ({ formatting, onChange, sectionsList }) => {
  const [activeTab, setActiveTab] = useState("sections");

  /* ⭐ Merge formatting with defaults (fix undefined errors) */
  const safeFormatting = {
    ...defaultFormatting,
    ...formatting,

    font: { ...defaultFormatting.font, ...(formatting?.font || {}) },
    heading: { ...defaultFormatting.heading, ...(formatting?.heading || {}) },
    personal: {
      ...defaultFormatting.personal,
      ...(formatting?.personal || {}),
    },

    skills: { ...defaultFormatting.skills, ...(formatting?.skills || {}) },
    languages: {
      ...defaultFormatting.languages,
      ...(formatting?.languages || {}),
    },
    interests: {
      ...defaultFormatting.interests,
      ...(formatting?.interests || {}),
    },
  };

  const tabs = [
    { id: "sections", label: "Sections", icon: List },
    { id: "spacing", label: "Layout", icon: Layout },

    { id: "content", label: "Content", icon: Settings },
    { id: "font", label: "Font", icon: TextIcon },
    { id: "headings", label: "Headings", icon: HeadingIcon },
    { id: "personal", label: "Personal", icon: UserIcon },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center justify-center py-4 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <tab.icon size={20} className="mb-1" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200">
        {/* Sections */}
        {activeTab === "sections" && (
          <SectionReorder
            order={safeFormatting.section_order}
            visibility={safeFormatting.section_visibility}
            sectionTitles={safeFormatting.section_titles}
            sectionPositions={safeFormatting.section_positions || {}}
            layout={safeFormatting.layout || { columns: 1 }}
            sectionsList={sectionsList}
            onOrderChange={(val) => onChange("section_order", val)}
            onVisibilityChange={(id) =>
              onChange("section_visibility", {
                ...safeFormatting.section_visibility,
                [id]: !safeFormatting.section_visibility[id],
              })
            }
            onRename={(id, name) =>
              onChange("section_titles", {
                ...safeFormatting.section_titles,
                [id]: name,
              })
            }
            onPositionChange={(id, pos) =>
              onChange("section_positions", {
                ...(safeFormatting.section_positions || {}),
                [id]: pos,
              })
            }
          />
        )}

        {/* Spacing */}
        {activeTab === "spacing" && (
          <SpacingControls
            spacing={safeFormatting.spacing}
            layout={safeFormatting.layout}
            onChange={onChange}
          />
        )}

        {/* Skills / Languages / Interests */}
        {activeTab === "content" && (
          <>
            <SectionStyleControls
              title="Skills"
              value={safeFormatting.skills}
              onChange={(v) => onChange("skills", v)}
            />

            <SectionStyleControls
              title="Languages"
              value={safeFormatting.languages}
              onChange={(v) => onChange("languages", v)}
            />

            <SectionStyleControls
              title="Interests"
              value={safeFormatting.interests}
              onChange={(v) => onChange("interests", v)}
              hideLevels={true}
              layouts={["compact"]}
            />
          </>
        )}

        {/* Font */}
        {activeTab === "font" && (
          <FontControls
            value={safeFormatting.font}
            onChange={(v) => onChange("font", v)}
          />
        )}

        {/* Headings */}
        {activeTab === "headings" && (
          <HeadingStyleControls
            value={safeFormatting.heading}
            onChange={(v) => onChange("heading", v)}
          />
        )}

        {/* Personal Details */}
        {activeTab === "personal" && (
          <PersonalDetailsControls
            value={safeFormatting.personal}
            onChange={(v) => onChange("personal", v)}
          />
        )}
      </div>
    </div>
  );
};

export default CustomizePanel;

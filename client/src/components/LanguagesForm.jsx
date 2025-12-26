import React, { useState } from "react";
import {
  Plus,
  Sparkles,
  X,
  Lightbulb,
  ChevronDown,
  Check,
  Languages,
} from "lucide-react";
import * as Select from "@radix-ui/react-select";
import TipsPanel from "./TipsPanel";

// 🔽 Language proficiency dropdown (styled like Skills LevelSelect)
const LanguageLevelSelect = ({ value, onChange }) => {
  const levels = [
    "Basic",
    "Conversational",
    "Proficient",
    "Fluent",
    "Native/Bilingual",
  ];

  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        className="
          relative flex w-full items-center justify-between rounded-2xl
          border border-white/60 bg-gradient-to-r from-blue-50/70 via-white/80 to-purple-50/70
          px-4 py-2.5 text-left text-sm text-slate-900
          shadow-[0_10px_30px_rgba(15,23,42,0.10)]
          backdrop-blur-xl outline-none transition
          focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
        "
      >
        <Select.Value placeholder="Select proficiency level" />
        <Select.Icon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          sideOffset={8}
          position="popper"
          className="
            radix-select-content z-50 min-w-[220px] overflow-hidden
            rounded-3xl border border-white/70
            bg-gradient-to-br from-sky-50/95 via-white/95 to-violet-50/95
            shadow-[0_22px_55px_rgba(15,23,42,0.35)]
            backdrop-blur-2xl
          "
        >
          <Select.Viewport className="max-h-60 space-y-1 overflow-auto p-2">
            {levels.map((level) => (
              <Select.Item
                key={level}
                value={level}
                className="
                  group flex cursor-pointer items-center justify-between
                  rounded-2xl px-3 py-2 text-sm text-slate-800
                  transition
                  hover:bg-white/80 hover:shadow-[0_10px_25px_rgba(15,23,42,0.10)]
                  data-[state=checked]:bg-blue-500/10 data-[state=checked]:text-blue-700
                "
              >
                <Select.ItemText>{level}</Select.ItemText>
                <Select.ItemIndicator>
                  <Check className="h-4 w-4 text-blue-600" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const LanguagesForm = ({ data = [], onChange }) => {
  const [showTips, setShowTips] = useState(false);
  const [newLanguage, setNewLanguage] = useState({
    name: "",
    proficiency: "",
  });

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addLanguage();
    }
  };

  const addLanguage = () => {
    const name = newLanguage.name.trim();
    if (!name) return;

    const duplicate = (data || []).some(
      (l) => (l?.name || "").toLowerCase() === name.toLowerCase()
    );
    if (!duplicate) {
      onChange([
        ...(data || []),
        {
          name,
          proficiency: newLanguage.proficiency.trim(),
        },
      ]);
      setNewLanguage({ name: "", proficiency: "" });
    }
  };

  const removeLanguage = (indexToRemove) => {
    onChange((data || []).filter((_, index) => index !== indexToRemove));
  };

  // clean input style
  const baseInputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm " +
    "text-slate-900 placeholder:text-slate-400 shadow-sm " +
    "focus:border-sky-500 focus:ring-2 focus:ring-sky-500/10 hover:border-sky-300 " +
    "outline-none transition";

  return (
    <div className="space-y-6">
      <div className="space-y-6 rounded-2xl border border-gray-200 bg-white px-5 py-5 shadow-sm sm:px-6 sm:py-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
                <Languages className="h-4 w-4" />
              </span>
              Languages
            </h3>
            <p className="text-sm text-slate-500">
              Add languages you speak and how well you know them.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowTips(true)}
            aria-label="Get tips"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-yellow-200 bg-yellow-50 text-yellow-600 shadow-sm transition hover:bg-yellow-100"
          >
            <Lightbulb className="h-4 w-4" />
          </button>
        </div>

        {/* Fields stacked vertically */}
        <div className="space-y-4">
          {/* Language name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Language
            </label>
            <input
              type="text"
              placeholder="e.g., English, Hindi, Japanese"
              className={baseInputClass}
              value={newLanguage.name}
              onChange={(e) =>
                setNewLanguage((prev) => ({ ...prev, name: e.target.value }))
              }
              onKeyDown={handleEnter}
            />
          </div>

          {/* Proficiency (custom dropdown) */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Proficiency
            </label>
            <LanguageLevelSelect
              value={newLanguage.proficiency}
              onChange={(val) =>
                setNewLanguage((prev) => ({ ...prev, proficiency: val }))
              }
            />
          </div>

          {/* Add button */}
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={addLanguage}
              disabled={!newLanguage.name.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-sky-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Plus className="h-4 w-4" />
              Add language
            </button>
          </div>
        </div>

        {/* Added languages */}
        {(data || []).length > 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-slate-50 p-3.5">
            <div className="flex flex-wrap gap-2">
              {data.map((lang, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-slate-800 shadow-sm ring-1 ring-gray-200"
                >
                  <span>{lang?.name}</span>
                  {(lang?.proficiency || lang?.level) && (
                    <span className="text-[11px] text-slate-500">
                      · {lang.proficiency || lang.level}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    className="ml-1 rounded-full p-0.5 text-slate-400 transition hover:bg-slate-100 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 py-7 text-center">
            <Sparkles className="mx-auto mb-2 h-8 w-8 text-gray-300" />
            <p className="text-sm font-medium text-slate-600">
              No languages added yet.
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Add at least 2–3 languages if you&apos;re comfortable speaking
              them.
            </p>
          </div>
        )}

        {/* Static tip */}
        <div className="rounded-xl bg-sky-50 border border-sky-100 px-3.5 py-3">
          <p className="text-sm text-sky-800">
            <strong className="font-semibold text-sky-900">Tip:</strong> Use
            clear levels like &quot;Fluent&quot; or &quot;Conversational&quot;.
            Add proofs (IELTS, JLPT, etc.) elsewhere if needed.
          </p>
        </div>

        {/* Tips Panel */}
        <TipsPanel
          open={showTips}
          onClose={() => setShowTips(false)}
          title="Languages Tips"
          sections={[
            {
              heading: "How to list languages",
              points: [
                "Be honest about your language level.",
                "Use consistent levels (Basic, Conversational, Proficient, Fluent, Native/Bilingual).",
                "Mention official tests elsewhere (IELTS, JLPT, etc.).",
              ],
            },
            {
              heading: "Examples",
              points: [
                "Fluent English (IELTS 7.5)",
                "Native/Bilingual Hindi",
                "Conversational Japanese (JLPT N4)",
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default LanguagesForm;

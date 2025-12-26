import React, { useState, useEffect } from "react";
import {
  Plus,
  Sparkles,
  X,
  Lightbulb,
  ChevronDown,
  Check,
  Pencil,
  GripVertical,
} from "lucide-react";
import * as Select from "@radix-ui/react-select";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TipsPanel from "./TipsPanel";

// 🔽 Custom gradient + glass + animated dropdown
const LevelSelect = ({ value, onChange }) => {
  const levels = ["Beginner", "Amateur", "Competent", "Proficient", "Expert"];

  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        className="
          relative flex w-full items-center justify-between rounded-2xl
          border border-gray-200 bg-white
          px-4 py-2.5 text-left text-sm text-slate-900
          shadow-sm
          outline-none transition
          focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 hover:border-blue-300
        "
      >
        <Select.Value placeholder="Select your proficiency level" />
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
            rounded-2xl border border-gray-100
            bg-white
            shadow-xl
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

// Helpers for IDs
const getCatSortableId = (key) =>
  "cat-" + (key === "" ? "__uncategorized__" : key);
const parseCatKeyFromId = (id) => {
  const raw = String(id).replace(/^cat-/, "");
  return raw === "__uncategorized__" ? "" : raw;
};
const getSkillSortableId = (index) => `skill-${index}`;
const parseSkillIndexFromId = (id) =>
  parseInt(String(id).replace(/^skill-/, ""), 10);

const getCategoryLabel = (raw) =>
  raw && raw.trim() !== "" ? raw.trim() : "Uncategorized";

// 🔽 Sortable category block (whole section draggable)
const SortableCategorySection = ({ id, label, children }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.9 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="inline-flex items-center justify-center rounded-full p-1 text-slate-400 hover:text-slate-700 cursor-grab active:cursor-grabbing"
            title="Drag category to reorder"
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            {label}
          </h4>
        </div>
      </div>
      {children}
    </div>
  );
};

// 🔽 Sortable skill chip
const SortableSkillChip = ({
  id,
  skill,
  index,
  isEditing,
  onEdit,
  onRemove,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.85 : 1,
    boxShadow: isDragging
      ? "0 12px 30px rgba(15,23,42,0.25)"
      : "0 4px 10px rgba(148,163,184,0.35)",
  };

  return (
    <span
      ref={setNodeRef}
      style={style}
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium ring-1 ring-gray-200 transition shadow-sm
        ${
          isEditing
            ? "bg-blue-50 text-blue-900 ring-blue-200"
            : "bg-white text-slate-700 hover:bg-slate-50"
        }`}
    >
      {/* Drag handle for skill */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="inline-flex items-center justify-center rounded-full p-0.5 text-slate-400 hover:text-slate-700 cursor-grab active:cursor-grabbing"
        title="Drag skill to reorder"
      >
        <GripVertical className="h-3.5 w-3.5" />
      </button>

      <span>{skill?.name}</span>
      {skill?.level && (
        <span className="text-[11px] text-slate-600">· {skill.level}</span>
      )}

      <button
        type="button"
        onClick={() => onEdit(index)}
        className="rounded-full p-0.5 text-slate-500 transition hover:bg-white/80 hover:text-slate-900"
        title="Edit skill"
      >
        <Pencil className="h-3 w-3" />
      </button>

      <button
        type="button"
        onClick={() => onRemove(index)}
        className="rounded-full p-0.5 text-slate-500 transition hover:bg-white/80 hover:text-slate-900"
        title="Remove skill"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
};

const SkillsForm = ({ data, onChange }) => {
  const skillsArray = Array.isArray(data) ? data : [];

  const [newSkill, setNewSkill] = useState({
    name: "",
    level: "",
    category: "",
  });

  const [editingIndex, setEditingIndex] = useState(null);

  // non-empty categories for the pills
  const [categories, setCategories] = useState(() => {
    const fromData = Array.from(
      new Set(
        skillsArray.map((s) => (s?.category || "").trim()).filter(Boolean)
      )
    );
    return fromData;
  });

  // order for category blocks (raw keys like "", "Frontend", "Backend")
  const [categoryOrder, setCategoryOrder] = useState(() => {
    const fromData = Array.from(
      new Set(skillsArray.map((s) => (s?.category || "").trim()))
    );
    return fromData;
  });

  const [newCategory, setNewCategory] = useState("");
  const [showTips, setShowTips] = useState(false);

  // dnd-kit sensors
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    })
  );

  // sync categories + categoryOrder when data changes (e.g., load existing resume)
  useEffect(() => {
    const fromDataAll = Array.from(
      new Set(
        (Array.isArray(data) ? data : []).map((s) => (s?.category || "").trim())
      )
    );
    const fromDataNonEmpty = fromDataAll.filter((c) => c !== "");

    setCategories((prev) => {
      const merged = Array.from(new Set([...prev, ...fromDataNonEmpty]));
      return merged;
    });

    setCategoryOrder((prev) => {
      if (prev.length === 0) return fromDataAll;
      const merged = [...prev];
      fromDataAll.forEach((cat) => {
        if (!merged.includes(cat)) merged.push(cat);
      });
      return merged;
    });
  }, [data]);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddOrUpdate();
    }
  };

  const handleAddOrUpdate = () => {
    if (editingIndex !== null) {
      updateSkill();
    } else {
      addSkill();
    }
  };

  const addSkill = () => {
    const name = newSkill.name.trim();
    if (!name) return;

    const level = newSkill.level.trim();
    const category = (newSkill.category || "").trim(); // may be ""

    const duplicate = skillsArray.some(
      (s) =>
        (s?.name || "").toLowerCase() === name.toLowerCase() &&
        (s?.category || "").trim().toLowerCase() === category.toLowerCase()
    );
    if (duplicate) return;

    const updated = [
      ...skillsArray,
      {
        name,
        level,
        category,
      },
    ];

    onChange(updated);

    // ensure categoryOrder has this category key
    setCategoryOrder((prev) => {
      if (prev.includes(category)) return prev;
      return [...prev, category];
    });

    setNewSkill({ name: "", level: "", category: category || "" });
  };

  const updateSkill = () => {
    if (editingIndex === null) return;

    const name = newSkill.name.trim();
    if (!name) return;

    const level = newSkill.level.trim();
    const category = (newSkill.category || "").trim();

    const duplicate = skillsArray.some((s, idx) => {
      if (idx === editingIndex) return false;
      return (
        (s?.name || "").toLowerCase() === name.toLowerCase() &&
        (s?.category || "").trim().toLowerCase() === category.toLowerCase()
      );
    });
    if (duplicate) return;

    const updated = skillsArray.map((s, idx) =>
      idx === editingIndex
        ? {
            ...s,
            name,
            level,
            category,
          }
        : s
    );

    onChange(updated);

    setCategoryOrder((prev) => {
      if (prev.includes(category)) return prev;
      return [...prev, category];
    });

    setEditingIndex(null);
    setNewSkill({ name: "", level: "", category: category || "" });
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setNewSkill({ name: "", level: "", category: "" });
  };

  const removeSkill = (indexToRemove) => {
    const updated = skillsArray.filter((_, index) => index !== indexToRemove);
    onChange(updated);

    if (editingIndex === indexToRemove) {
      cancelEdit();
    } else if (editingIndex !== null && indexToRemove < editingIndex) {
      setEditingIndex((prev) => (prev !== null ? prev - 1 : null));
    }
  };

  const addCategory = () => {
    const cat = newCategory.trim();
    if (!cat) return;

    setCategories((prev) => (prev.includes(cat) ? prev : [...prev, cat]));
    setCategoryOrder((prev) => (prev.includes(cat) ? prev : [...prev, cat]));

    setNewSkill((prev) => ({ ...prev, category: cat }));
    setNewCategory("");
  };

  const selectCategoryForSkill = (cat) => {
    setNewSkill((prev) => ({ ...prev, category: cat }));
  };

  const startEditSkill = (index) => {
    const s = skillsArray[index];
    if (!s) return;

    const category = (s.category || "").trim();
    if (category && !categories.includes(category)) {
      setCategories((prev) => [...prev, category]);
    }
    if (!categoryOrder.includes(category)) {
      setCategoryOrder((prev) => [...prev, category]);
    }

    setNewSkill({
      name: s.name || "",
      level: s.level || "",
      category,
    });
    setEditingIndex(index);
  };

  // 🔁 DnD handler (categories + skills) – updates underlying data.skills
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    // 🔹 Dragging a whole CATEGORY block
    if (activeId.startsWith("cat-") && overId.startsWith("cat-")) {
      const fromKey = parseCatKeyFromId(activeId); // raw category: "" or "Frontend"
      const toKey = parseCatKeyFromId(overId);

      const oldIndex = categoryOrder.indexOf(fromKey);
      const newIndex = categoryOrder.indexOf(toKey);
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

      // 1) Update categoryOrder in state (for UI)
      const newOrder = arrayMove(categoryOrder, oldIndex, newIndex);
      setCategoryOrder(newOrder);

      // 2) Build groups from current skills (preserve order inside each category)
      const grouped = skillsArray.reduce((acc, skill) => {
        const key = (skill.category || "").trim(); // "" for Uncategorized
        if (!acc[key]) acc[key] = [];
        acc[key].push(skill);
        return acc;
      }, {});

      const reorderedSkills = [];

      // Add categories in the new order
      newOrder.forEach((key) => {
        if (grouped[key]) {
          reorderedSkills.push(...grouped[key]);
        }
      });

      // Just in case some categories exist in data but not in categoryOrder
      Object.keys(grouped).forEach((key) => {
        if (!newOrder.includes(key)) {
          reorderedSkills.push(...grouped[key]);
        }
      });

      // 3) Track which skill was being edited (if any)
      const currentEditingSkill =
        editingIndex != null ? skillsArray[editingIndex] : null;

      // 4) Push new skills array up – this is what TechnicalTemplate will read
      onChange(reorderedSkills);

      // 5) Update editingIndex to point to same skill in new array
      if (currentEditingSkill) {
        const newEditingIndex = reorderedSkills.indexOf(currentEditingSkill);
        setEditingIndex(newEditingIndex === -1 ? null : newEditingIndex);
      }

      return;
    }

    // 🔹 Dragging an individual SKILL (within same category only)
    if (activeId.startsWith("skill-") && overId.startsWith("skill-")) {
      const fromIndex = parseSkillIndexFromId(activeId);
      const toIndex = parseSkillIndexFromId(overId);

      const fromSkill = skillsArray[fromIndex];
      const toSkill = skillsArray[toIndex];
      if (!fromSkill || !toSkill) return;

      const fromCat = (fromSkill.category || "").trim();
      const toCat = (toSkill.category || "").trim();

      // Block cross-category drag
      if (fromCat !== toCat) return;

      const reordered = arrayMove(skillsArray, fromIndex, toIndex);
      onChange(reordered);

      // Keep editingIndex in sync
      if (editingIndex !== null) {
        let newEditingIndex = editingIndex;

        if (fromIndex < toIndex) {
          if (editingIndex === fromIndex) newEditingIndex = toIndex;
          else if (editingIndex > fromIndex && editingIndex <= toIndex)
            newEditingIndex = editingIndex - 1;
        } else if (fromIndex > toIndex) {
          if (editingIndex === fromIndex) newEditingIndex = toIndex;
          else if (editingIndex >= toIndex && editingIndex < fromIndex)
            newEditingIndex = editingIndex + 1;
        }

        setEditingIndex(newEditingIndex);
      }
    }
  };

  // clean input
  const baseInputClass =
    "w-full rounded-2xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm " +
    "text-slate-900 placeholder:text-slate-400 shadow-sm " +
    "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 hover:border-blue-300 " +
    "outline-none transition";

  // group skills by raw category key
  const groupedSkills = skillsArray.reduce((acc, s, index) => {
    const key = (s.category || "").trim();
    if (!acc[key]) acc[key] = [];
    acc[key].push({ skill: s, index });
    return acc;
  }, {});

  // compute final category display order
  const presentCategoryKeys = Object.keys(groupedSkills);
  let displayCategoryOrder = categoryOrder.filter((key) =>
    presentCategoryKeys.includes(key)
  );
  presentCategoryKeys.forEach((key) => {
    if (!displayCategoryOrder.includes(key)) displayCategoryOrder.push(key);
  });

  const selectedCategoryLabel = getCategoryLabel(newSkill.category || "");

  return (
    <div className="w-full rounded-3xl bg-white p-[1px] shadow-sm ring-1 ring-gray-200">
      <div className="space-y-6 rounded-3xl bg-white px-5 py-5 sm:px-6 sm:py-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Skills</h3>
            <p className="text-sm text-slate-500">
              Add your technical, tool-based, and soft skills.
            </p>
            {editingIndex !== null && (
              <p className="mt-1 text-xs font-medium text-blue-600">
                Editing skill #{editingIndex + 1} – update and click{" "}
                <span className="underline">Save changes</span>.
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowTips(true)}
            aria-label="Get tips"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-yellow-300/70 bg-white/80 text-yellow-600 shadow-[0_0_18px_rgba(250,204,21,0.6)] backdrop-blur-md transition hover:bg-yellow-50"
          >
            <Lightbulb className="h-4 w-4" />
          </button>
        </div>

        {/* Form fields */}
        <div className="space-y-4">
          {/* CATEGORY SECTION AT TOP */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Categories (optional)
            </label>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="e.g., Frontend, Backend, Tools, Soft Skills"
                  className={baseInputClass}
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCategory();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addCategory}
                  disabled={!newCategory.trim()}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-[0_12px_30px_rgba(59,130,246,0.55)] transition hover:from-sky-600 hover:via-indigo-600 hover:to-purple-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Plus className="h-4 w-4" />
                  Add category
                </button>
              </div>

              {/* Category pills */}
              <div className="space-y-1">
                <p className="text-[11px] text-slate-500">
                  Select a category for the skill you're{" "}
                  {editingIndex !== null ? "editing" : "adding"}, or keep it{" "}
                  <span className="font-medium">Uncategorized</span>.
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {/* Uncategorized pill */}
                  <button
                    type="button"
                    onClick={() => selectCategoryForSkill("")}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-medium border shadow-sm backdrop-blur ${
                      (newSkill.category || "").trim() === ""
                        ? "bg-sky-100/90 border-sky-300 text-sky-800"
                        : "bg-white/80 border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Uncategorized
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => selectCategoryForSkill(cat)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-medium border shadow-sm backdrop-blur ${
                        selectedCategoryLabel === cat
                          ? "bg-sky-100/90 border-sky-300 text-sky-800"
                          : "bg-white/80 border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Skill name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Skill name
            </label>
            <input
              type="text"
              placeholder="e.g., JavaScript, Node.js, UI Design"
              className={baseInputClass}
              value={newSkill.name}
              onChange={(e) =>
                setNewSkill((prev) => ({ ...prev, name: e.target.value }))
              }
              onKeyDown={handleEnter}
            />
          </div>

          {/* Level */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Level
            </label>
            <LevelSelect
              value={newSkill.level}
              onChange={(val) =>
                setNewSkill((prev) => ({ ...prev, level: val }))
              }
            />
          </div>

          {/* Add / Save */}
          <div className="flex justify-between items-center pt-1 gap-3">
            {editingIndex !== null && (
              <button
                type="button"
                onClick={cancelEdit}
                className="text-xs font-medium text-slate-500 hover:text-slate-700 underline"
              >
                Cancel edit
              </button>
            )}

            <div className="flex-1 flex justify-end">
              <button
                type="button"
                onClick={handleAddOrUpdate}
                disabled={!newSkill.name.trim()}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(59,130,246,0.65)] transition hover:from-blue-700 hover:via-indigo-600 hover:to-purple-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {editingIndex !== null ? (
                  <>
                    <Check className="h-4 w-4" />
                    Save changes
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Add skill
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Skills + Categories with DnD */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {skillsArray.length > 0 ? (
            <div className="rounded-2xl border border-white/70 bg-white/55 p-3.5 shadow-inner backdrop-blur-md space-y-4">
              <SortableContext
                items={displayCategoryOrder.map((key) => getCatSortableId(key))}
                strategy={verticalListSortingStrategy}
              >
                {displayCategoryOrder.map((catKey) => {
                  const catSkills = groupedSkills[catKey] || [];
                  const catLabel = getCategoryLabel(catKey);
                  const catId = getCatSortableId(catKey);

                  return (
                    <SortableCategorySection
                      key={catKey || "__uncategorized__"}
                      id={catId}
                      label={catLabel}
                    >
                      <SortableContext
                        items={catSkills.map(({ index }) =>
                          getSkillSortableId(index)
                        )}
                        strategy={rectSortingStrategy}
                      >
                        <div className="flex flex-wrap gap-2">
                          {catSkills.map(({ skill, index }) => (
                            <SortableSkillChip
                              key={index}
                              id={getSkillSortableId(index)}
                              skill={skill}
                              index={index}
                              isEditing={index === editingIndex}
                              onEdit={startEditSkill}
                              onRemove={removeSkill}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </SortableCategorySection>
                  );
                })}
              </SortableContext>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200/80 bg-white/55 py-7 text-center shadow-inner backdrop-blur-md">
              <Sparkles className="mx-auto mb-2 h-8 w-8 text-slate-300" />
              <p className="text-sm font-medium text-slate-700">
                No skills added yet.
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Start by adding your strongest technical and soft skills above.
              </p>
            </div>
          )}
        </DndContext>

        {/* Static tip */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-50/95 via-sky-50/95 to-indigo-50/95 px-3.5 py-3 shadow-sm backdrop-blur">
          <p className="text-sm text-slate-800">
            <strong className="font-semibold text-blue-700">Tip:</strong> Aim
            for 8–12 relevant skills. Group them into categories like
            Frontend/Backend/Tools, and add 2–3 strong soft skills.
          </p>
        </div>

        {/* Tips Panel */}
        <TipsPanel
          open={showTips}
          onClose={() => setShowTips(false)}
          title="Skills Tips"
          sections={[
            {
              heading: "How to choose skills",
              points: [
                "Group skills by category (Frontend, Backend, Tools, Soft skills).",
                "Match skills to the specific role you're targeting.",
                "Be specific when possible (React 18, Next.js 14, Tailwind).",
                "Include 2–3 soft skills you can prove with examples.",
              ],
            },
            {
              heading: "Examples",
              points: [
                "Frontend: React, Next.js, Tailwind CSS",
                "Backend: Node.js, Express, MongoDB",
                "Tools: Git, Docker, Figma",
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default SkillsForm;

import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Eye,
  EyeOff,
  Pencil,
  Check,
  X,
  Sidebar,
  LayoutTemplate,
} from "lucide-react";

// Sortable Item Component
const SortableItem = ({
  id,
  name,
  customTitle,
  isVisible,
  position, // 'main' or 'sidebar'
  isTwoColumn,
  onToggleVisibility,
  onRename,
  onPositionChange,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(customTitle || name);

  // Update edit value if customTitle changes externally or on init
  useEffect(() => {
    setEditValue(customTitle || name);
  }, [customTitle, name]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = () => {
    onRename(id, editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(customTitle || name);
    setIsEditing(false);
  };

  const togglePosition = () => {
    const newPos = position === "sidebar" ? "main" : "sidebar";
    onPositionChange(id, newPos);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md mb-2 shadow-sm ${
        !isVisible ? "opacity-60 bg-gray-50" : ""
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          className="text-gray-400 cursor-grab hover:text-gray-600 active:cursor-grabbing flex-shrink-0"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={18} />
        </button>

        {isEditing ? (
          <div className="flex items-center gap-1 flex-1">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 px-2 py-1 text-sm border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") handleCancel();
              }}
              onPointerDown={(e) => e.stopPropagation()} // Prevent drag start when interacting with input
            />
            <button
              onClick={handleSave}
              className="p-1 text-green-600 hover:bg-green-50 rounded"
            >
              <Check size={14} />
            </button>
            <button
              onClick={handleCancel}
              className="p-1 text-red-500 hover:bg-red-50 rounded"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="flex-1 min-w-0 flex items-center gap-2 group">
            <span
              className="text-sm font-medium text-gray-700 truncate"
              title={customTitle || name}
            >
              {customTitle || name}
            </span>
            <button
              onClick={() => setIsEditing(true)}
              className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-blue-600 transition-opacity"
              title="Rename Section"
            >
              <Pencil size={12} />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 pl-2 border-l ml-2">
        {/* Position Toggle (Only in 2-Column Mode) */}
        {isTwoColumn && (
          <button
            onClick={togglePosition}
            className={`p-1.5 rounded-md transition-colors flex items-center gap-1 ${
              position === "sidebar"
                ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                : "text-gray-400 hover:bg-gray-100"
            }`}
            title={
              position === "sidebar" ? "Move to Main Column" : "Move to Sidebar"
            }
          >
            {position === "sidebar" ? (
              <Sidebar size={16} />
            ) : (
              <LayoutTemplate size={16} />
            )}
          </button>
        )}

        {/* Visibility Toggle */}
        <button
          onClick={() => onToggleVisibility(id)}
          className={`p-1.5 rounded-md transition-colors ${
            isVisible
              ? "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              : "text-gray-400 hover:bg-gray-100"
          }`}
          title={isVisible ? "Hide Section" : "Show Section"}
        >
          {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      </div>
    </div>
  );
};

const SectionReorder = ({
  order,
  visibility,
  sectionTitles,
  sectionPositions = {}, // New Prop: { skills: 'sidebar', experience: 'main' }
  layout = { columns: 1 }, // New Prop: To check if we are in 2-col mode
  onOrderChange,
  onVisibilityChange,
  onRename,
  onPositionChange, // New Handler
  sectionsList, // Full list of available sections with labels
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = order.indexOf(active.id);
      const newIndex = order.indexOf(over.id);
      onOrderChange(arrayMove(order, oldIndex, newIndex));
    }
  };

  const isTwoColumn = layout?.columns === 2;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Manage Sections
      </h3>
      <p className="text-xs text-gray-500 mb-4">
        Drag to reorder. Click the eye icon to toggle visibility.
        {isTwoColumn &&
          " Use the layout icon to switch between Sidebar and Main column."}
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col">
            {order.map((sectionId) => {
              const sectionDef = sectionsList.find((s) => s.id === sectionId);
              const defaultName = sectionDef ? sectionDef.name : sectionId;
              const customTitle = sectionTitles[sectionId];
              const isVisible = visibility[sectionId] ?? true;
              const isSidebarDefault = [
                "skills",
                "languages",
                "interests",
                "hobbies",
                "certifications",
                "achievements",
              ].includes(sectionId);
              const position =
                sectionPositions[sectionId] ||
                (isSidebarDefault ? "sidebar" : "main");

              return (
                <SortableItem
                  key={sectionId}
                  id={sectionId}
                  name={defaultName}
                  customTitle={customTitle}
                  isVisible={isVisible}
                  position={position}
                  isTwoColumn={isTwoColumn}
                  onToggleVisibility={onVisibilityChange}
                  onRename={onRename}
                  onPositionChange={onPositionChange}
                />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default SectionReorder;

import React from "react";
import { Check } from "lucide-react";

const ColorSettings = ({ colors, onChange }) => {
  const PRESET_ACCENT_COLORS = [
    "#000000", "#3B82F6", "#EF4444", "#10B981", "#F59E0B",
    "#6366F1", "#8B5CF6", "#EC4899", "#14B8A6", "#64748B"
  ];

  const PRESET_TEXT_COLORS = [
    "#0F172A", // Slate-900
    "#1E293B", // Slate-800
    "#334155", // Slate-700
    "#475569", // Slate-600
    "#111827", // Gray-900
    "#374151", // Gray-700
    "#1F2937", // Default Gray
    "#4B5563", // Gray-600
    "#000000", // Black
    "#6B7280", // Muted gray (for soft UI)
  ];

  const handleColorChange = (key, value) => {
    onChange("colors", { ...colors, [key]: value });
  };

  return (
    <div className="space-y-8">

      <h3 className="text-lg font-semibold text-gray-800 mb-4">Colors</h3>

      {/* ACCENT COLOR */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-900 block">
          Accent Color
        </label>

        <div className="flex flex-wrap gap-3">
          {PRESET_ACCENT_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => handleColorChange("accent", color)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                colors.accent === color ? "ring-2 ring-offset-2 ring-gray-400" : ""
              }`}
              style={{ backgroundColor: color }}
            >
              {colors.accent === color && (
                <Check size={14} className="text-white" />
              )}
            </button>
          ))}

          {/* Custom Accent Color Picker */}
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-300">
            <input
              type="color"
              value={colors.accent || "#000000"}
              onChange={(e) => handleColorChange("accent", e.target.value)}
              className="absolute inset-0 w-full h-full cursor-pointer transform scale-150"
            />
          </div>
        </div>
      </div>

      {/* TEXT COLOR */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-900 block">
          Text Color
        </label>

        <div className="flex flex-wrap gap-3">
          {PRESET_TEXT_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => handleColorChange("text", color)}
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                colors.text === color
                  ? "ring-2 ring-offset-2 ring-gray-400"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color }}
            >
              {colors.text === color && (
                <Check size={14} className="text-white" />
              )}
            </button>
          ))}

          {/* Custom Text Color Picker */}
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-300">
            <input
              type="color"
              value={colors.text || "#1F2937"}
              onChange={(e) => handleColorChange("text", e.target.value)}
              className="absolute inset-0 w-full h-full cursor-pointer transform scale-150"
            />
          </div>
        </div>

        {/* Text Color Label */}
        <span className="text-xs text-gray-500 uppercase block mt-1">
          {colors.text}
        </span>
      </div>

      {/* INFO BOX */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
        <p>
          <strong>Note:</strong> Accent color applies to headings & icons.
          Text color affects all paragraph, label, and content text.
        </p>
      </div>
    </div>
  );
};

export default ColorSettings;

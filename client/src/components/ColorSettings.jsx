import React from "react";
import { Check } from "lucide-react";

const ColorSettings = ({ colors, onChange }) => {
  const PRESET_ACCENT_COLORS = [
    "#000000",
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#6366F1",
    "#8B5CF6",
    "#EC4899",
    "#14B8A6",
    "#64748B",
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

      {/* TEXT COLOR */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-900 block">
          Text Color
        </label>

        <div className="flex flex-wrap gap-3">
          {["#000000", "#1F2937", "#374151", "#4B5563"].map((color) => (
            <button
              key={color}
              onClick={() => handleColorChange("text", color)}
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                colors.text === color
                  ? "ring-2 ring-offset-2 ring-gray-400"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color }}
              title={color}
            >
              {colors.text === color && (
                <Check size={14} className="text-white" />
              )}
            </button>
          ))}

          {/* Custom Text Color Picker */}
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-300 group">
            <input
              type="color"
              value={colors.text || "#1F2937"}
              onChange={(e) => handleColorChange("text", e.target.value)}
              className="absolute inset-0 w-full h-full cursor-pointer transform scale-150 opacity-0"
              title="Custom Color"
            />
            {/* Visual Indicator for Custom Picker */}
            <div
              className="w-full h-full"
              style={{ backgroundColor: colors.text || "#1F2937" }}
            />
          </div>
        </div>
      </div>

      {/* INFO BOX */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
        <p>
          <strong>Note:</strong> Accent color applies to headings & icons. Text
          color affects all paragraph, label, and content text.
        </p>
      </div>
    </div>
  );
};

export default ColorSettings;

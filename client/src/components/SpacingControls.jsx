import React from "react";
import { Minus, Plus, List, Columns, Maximize2 } from "lucide-react";

const DEFAULT_SPACING = {
  font_size: 11,
  line_height: 1.3,
  margin_horizontal: 16,
  margin_vertical: 16,
  section_spacing: 6,
};

const SpacingControls = ({ spacing, layout, onChange }) => {
  const handleChange = (key, value) => {
    onChange("spacing", { ...spacing, [key]: value });
  };

  const handleLayoutChange = (val) => {
    onChange("layout", { ...layout, columns: val });
  };

  const handleResetSpacing = () => {
    onChange("spacing", { ...DEFAULT_SPACING });
  };

  return (
    <div className="space-y-8">
        
      {/* Layout Selection */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Layout</h3>
        <p className="text-sm text-gray-600 mb-2 font-medium">Columns</p>
        <div className="flex gap-4">
          <button
            onClick={() => handleLayoutChange(1)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all w-28 h-20 ${
              layout.columns === 1
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-gray-200 hover:border-gray-300 text-gray-400"
            }`}
          >
           <div className="flex flex-col gap-1 w-8">
                <div className="h-1 bg-current w-full rounded-full"></div>
                <div className="h-1 bg-current w-full rounded-full"></div>
                <div className="h-1 bg-current w-full rounded-full"></div>
           </div>
            <span className="text-xs font-medium mt-2">One</span>
          </button>
          
          <button
            onClick={() => handleLayoutChange(2)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all w-28 h-20 ${
              layout.columns === 2
                ? "border-blue-500 bg-blue-50 text-blue-600"
                : "border-gray-200 hover:border-gray-300 text-gray-400"
            }`}
          >
             <div className="flex gap-1 w-8">
                <div className="flex flex-col gap-1 w-1/2">
                    <div className="h-1 bg-current w-full rounded-full"></div>
                    <div className="h-1 bg-current w-full rounded-full"></div>
                </div>
                <div className="flex flex-col gap-1 w-1/2">
                    <div className="h-1 bg-current w-full rounded-full"></div>
                    <div className="h-1 bg-current w-full rounded-full"></div>
                </div>
           </div>
            <span className="text-xs font-medium mt-2">Two</span>
          </button>
        </div>
      </section>

      {/* Spacing Controls */}
      <section className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Spacing</h3>
          <button
            type="button"
            onClick={handleResetSpacing}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 px-2 py-1 rounded-full hover:bg-blue-50 border border-blue-100"
          >
            Reset to default
          </button>
        </div>

        {/* Font Size */}
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                 <label className="text-sm font-medium text-gray-900">Font Size</label>
                 <span className="text-xs text-gray-500">{spacing.font_size}pt</span>
            </div>
            <input
                type="range"
                min="8"
                max="16"
                step="0.5"
                value={spacing.font_size}
                onChange={(e) => handleChange("font_size", Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
        </div>

        {/* Line Height */}
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                 <label className="text-sm font-medium text-gray-900">Line Height</label>
                 <span className="text-xs text-gray-500">{spacing.line_height}</span>
            </div>
             <input
                type="range"
                min="1"
                max="2"
                step="0.1"
                value={spacing.line_height}
                onChange={(e) => handleChange("line_height", Number(e.target.value))}
                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
        </div>

        {/* Horizontal Margin */}
        <div className="space-y-2">
             <div className="flex justify-between items-center">
                 <label className="text-sm font-medium text-gray-900">Left & Right Margin</label>
                 <span className="text-xs text-gray-500">{spacing.margin_horizontal}mm</span>
            </div>
            <input
                type="range"
                min="0"
                max="40"
                 step="2"
                value={spacing.margin_horizontal}
                onChange={(e) => handleChange("margin_horizontal", Number(e.target.value))}
                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
        </div>

        {/* Vertical Margin */}
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                 <label className="text-sm font-medium text-gray-900">Top & Bottom Margin</label>
                 <span className="text-xs text-gray-500">{spacing.margin_vertical}mm</span>
            </div>
            <input
                type="range"
                min="0"
                max="40"
                 step="2"
                value={spacing.margin_vertical}
                onChange={(e) => handleChange("margin_vertical", Number(e.target.value))}
                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
        </div>

        {/* Section Spacing */}
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                 <label className="text-sm font-medium text-gray-900">Space between Sections</label>
                  <span className="text-xs text-gray-500">{spacing.section_spacing}mm</span>
            </div>
            <input
                type="range"
                min="0"
                max="30"
                 step="2"
                value={spacing.section_spacing}
                 onChange={(e) => handleChange("section_spacing", Number(e.target.value))}
                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
        </div>
      </section>
    </div>
  );
};

export default SpacingControls;

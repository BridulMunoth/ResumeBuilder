import React, { useState, useRef, useEffect } from "react";
import { Palette, Check, Plus, ChevronLeft } from "lucide-react";
import { HexColorPicker } from "react-colorful";

export default function ColorPicker({
  accentColor,
  textColor,
  onAccentChange,
  onTextChange,
}) {
  // Curated Professional Palette
  const accentColors = [
    { name: "Inter Blue", value: "#3B82F6" },
    { name: "Navy Blue", value: "#1E3A8A" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Violet", value: "#8B5CF6" },
    { name: "Emerald", value: "#10B981" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Cyan", value: "#06B6D4" },
    { name: "Slate", value: "#64748B" },
    { name: "Charcoal", value: "#334155" },
    { name: "Black", value: "#000000" },
    { name: "Rose", value: "#F43F5E" },
    { name: "Crimson", value: "#DC2626" },
    { name: "Amber", value: "#F59E0B" },
    { name: "Orange", value: "#F97316" },
    { name: "Fuchsia", value: "#D946EF" },
  ];

  const textColors = [
    { name: "Pure Black", value: "#000000" },
    { name: "Dark Gray", value: "#1F2937" },
    { name: "Slate Gray", value: "#374151" },
    { name: "Mild Gray", value: "#4B5563" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [showCustom, setShowCustom] = useState(false); // Toggle for Hex Picker
  const [hoveredName, setHoveredName] = useState(null);

  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

  // Click Outside to Close
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setShowCustom(false); // Reset view on close
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper to find name
  const getCurrentName = (val, list) =>
    list.find((c) => c.value === val)?.name || "Custom Color";

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((s) => !s)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-all px-3 py-2 rounded-lg"
      >
        <div
          className="w-4 h-4 rounded-full border border-gray-200"
          style={{ backgroundColor: accentColor || "#000000" }}
        />
        <span className="max-sm:hidden">Colors</span>
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute top-full left-0 mt-2 z-50 p-4 bg-white rounded-xl border border-gray-200 shadow-xl w-72 animate-in fade-in zoom-in-95 duration-200"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100 min-h-[28px]">
            {showCustom ? (
              <button
                onClick={() => setShowCustom(false)}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 transition-colors"
              >
                <ChevronLeft size={14} /> Back
              </button>
            ) : (
              <>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Accent
                </span>
                <span className="text-xs font-medium text-blue-600 truncate max-w-[120px] text-right">
                  {hoveredName || getCurrentName(accentColor, accentColors)}
                </span>
              </>
            )}
          </div>

          {showCustom ? (
            /* --- ADVANCED PICKER (React Colorful) --- */
            <div className="space-y-3">
              <div className="custom-picker-wrapper">
                <HexColorPicker
                  color={accentColor}
                  onChange={onAccentChange}
                  style={{ width: "100%", height: "150px" }}
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-gray-400">#</span>
                <input
                  type="text"
                  value={accentColor.replace("#", "")}
                  onChange={(e) => onAccentChange(`#${e.target.value}`)}
                  className="flex-1 text-sm border border-gray-200 rounded px-2 py-1 font-mono uppercase focus:ring-2 focus:ring-blue-100 outline-none"
                  maxLength={6}
                />
                <div
                  className="w-8 h-8 rounded border border-gray-200"
                  style={{ backgroundColor: accentColor }}
                />
              </div>
            </div>
          ) : (
            /* --- PRESET GRID --- */
            <>
              <div className="grid grid-cols-5 gap-3 mb-5">
                {accentColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => {
                      if (onAccentChange) onAccentChange(color.value);
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setHoveredName(color.name)}
                    onMouseLeave={() => setHoveredName(null)}
                    className="group relative flex items-center justify-center focus:outline-none"
                  >
                    <div
                      className={`relative w-8 h-8 rounded-full transition-transform group-hover:scale-110 shadow-sm ${
                        accentColor === color.value
                          ? "ring-2 ring-blue-500 ring-offset-2"
                          : "border border-gray-100"
                      }`}
                      style={{ backgroundColor: color.value }}
                    >
                      {accentColor === color.value && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check
                            className="w-3 h-3 text-white drop-shadow-sm"
                            strokeWidth={3}
                          />
                        </div>
                      )}
                    </div>
                  </button>
                ))}

                {/* CUSTOM TOGGLE BUTTON */}
                <button
                  onClick={() => setShowCustom(true)}
                  className="relative w-8 h-8 rounded-full overflow-hidden cursor-pointer hover:scale-110 transition-transform ring-1 ring-gray-200 group focus:outline-none"
                  onMouseEnter={() => setHoveredName("Custom Mix")}
                  onMouseLeave={() => setHoveredName(null)}
                >
                  <div className="w-full h-full flex items-center justify-center bg-[conic-gradient(from_0deg,red,yellow,lime,cyan,blue,magenta,red)]">
                    <Plus className="w-3 h-3 text-white drop-shadow-md" />
                  </div>
                </button>
              </div>

              {/* TEXT COLOR SECTION */}
              <div className="bg-gray-50 rounded-lg p-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                  Text Color
                </span>
                <div className="flex gap-3">
                  {textColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => {
                        if (onTextChange) onTextChange(color.value);
                        setIsOpen(false);
                      }}
                      className={`relative w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:scale-110 transition-transform ${
                        textColor === color.value
                          ? "ring-2 ring-gray-400 ring-offset-1"
                          : ""
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      {textColor === color.value && (
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      )}
                    </button>
                  ))}

                  {/* Custom Text Picker (Simple Native for now, or could use same advanced toggle if needed) */}
                  <div className="relative w-6 h-6 rounded-full border border-gray-300 overflow-hidden hover:scale-110 transition-transform bg-white">
                    <input
                      type="color"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      value={textColor || "#1F2937"}
                      onChange={(e) => {
                        if (onTextChange) onTextChange(e.target.value);
                        // don't close immediately for text custom glide
                      }}
                      title="Custom Text"
                    />
                    <div className="w-full h-full flex items-center justify-center">
                      <Plus className="w-3 h-3 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

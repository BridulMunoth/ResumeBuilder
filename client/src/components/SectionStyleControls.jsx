import React from "react";

const buttonBase =
  "px-4 py-2 rounded-xl border text-sm font-medium transition-colors";
const active =
  "bg-purple-50 border-purple-500 text-purple-600 shadow-sm";
const inactive =
  "bg-white border-gray-300 text-gray-600 hover:bg-gray-50";

const SectionStyleControls = ({ title, value = {}, onChange }) => {
    value = {
    layout: value.layout || "grid",
    levelMode: value.levelMode || "text",
    compactMode: value.compactMode || "bullet",
    subinfo: value.subinfo || "dash",
    customLevels: value.customLevels || [
      "Beginner",
      "Amateur",
      "Competent",
      "Proficient",
      "Expert",
    ],
  };
    const set = (key, val) => {
    onChange({
      ...value,
      [key]: val,
    });
  };

  return (
    <div className="mb-10 p-6 rounded-3xl bg-white border border-gray-200 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {title}
      </h3>

      {/* Layout */}
      <div className="mb-4">
        <p className="font-medium mb-2">Layout</p>

        <div className="grid grid-cols-4 gap-2">
          {["grid", "level", "compact", "bubble"].map((layout) => (
            <button
              key={layout}
              className={`${buttonBase} ${
                value.layout === layout ? active : inactive
              }`}
              onClick={() => set("layout", layout)}
            >
              {layout.charAt(0).toUpperCase() + layout.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Under layout → Level */}
      {value.layout === "level" && (
        <div className="mb-4">
          <p className="font-medium mb-2">Display Style</p>
          <div className="grid grid-cols-3 gap-2">
            {["text", "dots", "bar"].map((mode) => (
              <button
                key={mode}
                className={`${buttonBase} ${
                  value.levelMode === mode ? active : inactive
                }`}
                onClick={() => set("levelMode", mode)}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>

          {/* Custom Levels */}
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-1">
              {value.customLevels?.join(", ")}
            </p>
            <button
              className="text-purple-600 underline text-sm"
              onClick={() => alert("Open customize modal here")}
            >
              Customize
            </button>
          </div>
        </div>
      )}

      {/* Under layout → Compact */}
      {value.layout === "compact" && (
        <div className="mb-4">
          <p className="font-medium mb-2">Compact Style</p>
          <div className="grid grid-cols-4 gap-2">
            {["bullet", "pipe", "newline", "comma"].map((mode) => (
              <button
                key={mode}
                className={`${buttonBase} ${
                  value.compactMode === mode ? active : inactive
                }`}
                onClick={() => set("compactMode", mode)}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Subinfo Style */}
      <div>
        <p className="font-medium mb-2">Subinfo Style</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { key: "dash", label: "– Dash" },
            { key: "colon", label: ": Colon" },
            { key: "bracket", label: "() Bracket" },
          ].map((opt) => (
            <button
              key={opt.key}
              className={`${buttonBase} ${
                value.subinfo === opt.key ? active : inactive
              }`}
              onClick={() => set("subinfo", opt.key)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionStyleControls;

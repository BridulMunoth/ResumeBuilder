import React from "react";

const buttonBase =
  "px-4 py-2 rounded-xl border text-sm font-medium transition-colors";
const active = "bg-purple-50 border-purple-500 text-purple-600 shadow-sm";
const inactive = "bg-white border-gray-300 text-gray-600 hover:bg-gray-50";

const SectionStyleControls = ({ title, value = {}, onChange, hideLevels = false, layouts = ["grid", "compact"] }) => {
  const [isEditingLevels, setIsEditingLevels] = React.useState(false);
  // Merge defaults
  value = {
    layout: value.layout || "grid",
    levelMode: value.levelMode || "text",
    compactMode: value.compactMode || "bullet",
    enableBubble: value.enableBubble || false,
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
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>

      {/* Layout: options provided via props */}
      <div className="mb-4">
        <p className="font-medium mb-2">Layout</p>
        <div className="grid grid-cols-2 gap-2">
          {layouts.map((layout) => (
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

      {/* Bubble Toggle */}
      <div className="mb-4 flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50">
        <span className="font-medium text-gray-700">Bubble Style</span>
        <button
          onClick={() => set("enableBubble", !value.enableBubble)}
          className={`relative w-11 h-6 rounded-full transition-colors ${
            value.enableBubble ? "bg-purple-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
              value.enableBubble ? "translate-x-5" : ""
            }`}
          />
        </button>
      </div>

      {/* Display Style (Level Mode) */}
      {!hideLevels && (
        <div className="mb-4">
          <p className="font-medium mb-2">Display Style (Levels)</p>
          <div className="grid grid-cols-4 gap-2">
            {["text", "dots", "bar", "hide"].map((mode) => (
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

          {/* Custom Levels Text Customization */}
          {value.levelMode !== "hide" && (
            <div className="mt-3">
              {isEditingLevels ? (
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-xs font-semibold text-gray-700 mb-2">
                    Edit Level Labels (Low → High)
                  </p>
                  <div className="space-y-2 mb-3">
                    {value.customLevels.map((lvl, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-4 font-mono">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={lvl}
                          onChange={(e) => {
                            const newLevels = [...value.customLevels];
                            newLevels[idx] = e.target.value;
                            set("customLevels", newLevels);
                          }}
                          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditingLevels(false)}
                      className="flex-1 bg-purple-600 text-white text-xs font-bold py-1.5 rounded hover:bg-purple-700"
                    >
                      Done
                    </button>
                    <button
                      onClick={() =>
                        set("customLevels", [
                          "Beginner",
                          "Amateur",
                          "Competent",
                          "Proficient",
                          "Expert",
                        ])
                      }
                      className="px-3 bg-white border border-gray-300 text-gray-600 text-xs font-medium py-1.5 rounded hover:bg-gray-50"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-gray-500 mb-1">
                    {value.customLevels?.join(", ")}
                  </p>
                  <button
                    className="text-purple-600 underline text-sm"
                    onClick={() => setIsEditingLevels(true)}
                  >
                    Customize Labels
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Under layout → Compact Options */}
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

      {/* Subinfo Style - Only valid if Display Style is Text */}
      {!hideLevels && value.levelMode === "text" && (
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
      )}
    </div>
  );
};

export default SectionStyleControls;

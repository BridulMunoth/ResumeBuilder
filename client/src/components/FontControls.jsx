import React from "react";

const fontTypeBtn =
  "px-4 py-3 rounded-xl border text-sm font-medium transition-all flex flex-col items-center gap-1";
const active =
  "border-purple-500 bg-purple-50 text-purple-600";
const inactive =
  "border-gray-300 text-gray-600 bg-white hover:bg-gray-50";

const DEFAULT_FONT = {
  type: "sans",
  family: "Source Sans Pro",
};

const FontControls = ({ value, onChange }) => {
  const set = (key, val) => onChange({ ...value, [key]: val });

  const handleReset = () => {
    onChange(DEFAULT_FONT);
  };

  const FONT_TYPES = ["serif", "sans", "mono"];

  const FONTS = {
    serif: ["Times New Roman", "Lora", "Merriweather", "Cormorant", "Georgia"],
    sans: [
      "Source Sans Pro",
      "Karla",
      "Mulish",
      "Lato",
      "Jost",
      "Fira Sans",
      "Roboto",
      "Rubik",
      "Open Sans",
      "Nunito",
      "IBM Plex Sans",
    ],
    mono: ["JetBrains Mono", "Fira Code", "Roboto Mono"],
  };

  return (
    <div className="p-6 bg-white rounded-3xl border border-gray-200 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Font</h3>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 px-2 py-1 rounded-full hover:bg-blue-50 border border-blue-100"
        >
          Reset to default
        </button>
      </div>

      {/* Font Type */}
      <div className="flex gap-3">
        {FONT_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => set("type", t)}
            className={`${fontTypeBtn} ${
              value.type === t ? active : inactive
            }`}
          >
            <span className="text-xl">Aa</span>
            <span className="text-xs capitalize">{t}</span>
          </button>
        ))}
      </div>

      {/* Font List */}
      <div className="grid grid-cols-3 gap-3">
        {FONTS[value.type]?.map((font) => (
          <button
            key={font}
            onClick={() => set("family", font)}
            className={`px-4 py-2 rounded-xl border text-sm font-medium ${
              value.family === font ? active : inactive
            }`}
          >
            {font}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FontControls;

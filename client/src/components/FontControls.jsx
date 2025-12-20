import React from "react";

const fontTypeBtn =
  "px-4 py-3 rounded-xl border text-sm font-medium transition-all flex flex-col items-center gap-1";
const active =
  "border-purple-500 bg-purple-50 text-purple-600";
const inactive =
  "border-gray-300 text-gray-600 bg-white hover:bg-gray-50";

const FontControls = ({ value, onChange }) => {
  const set = (key, val) => onChange({ ...value, [key]: val });

  const FONT_TYPES = ["serif", "sans", "mono"];

  const FONTS = {
    serif: ["Lora", "Merriweather", "Cormorant", "Georgia"],
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
      <h3 className="text-lg font-semibold text-gray-900">Font</h3>

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

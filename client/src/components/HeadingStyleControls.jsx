import React from "react";

const base =
  "px-3 py-2 rounded-xl border text-sm font-medium transition-all";
const active =
  "bg-purple-50 border-purple-500 text-purple-600";
const inactive =
  "bg-white border-gray-300 text-gray-600 hover:bg-gray-50";

const HeadingStyleControls = ({ value, onChange }) => {
  const set = (k, v) => onChange({ ...value, [k]: v });

  const STYLES = ["line", "boxed", "plain", "underline", "leftLine", "zigzag"];
  const SIZES = ["S", "M", "L", "XL"];
  const ICON_STYLES = ["none", "outline", "filled"];

  return (
    <div className="p-6 bg-white rounded-3xl border space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Section Headings</h3>

      {/* Style */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Style</p>
        <div className="grid grid-cols-3 gap-2">
          {STYLES.map((style) => (
            <button
              key={style}
              onClick={() => set("style", style)}
              className={`${base} ${
                value.style === style ? active : inactive
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Capitalization */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Capitalization</p>
        <div className="flex gap-3">
          <button
            onClick={() => set("caps", "capitalize")}
            className={`${base} ${
              value.caps === "capitalize" ? active : inactive
            }`}
          >
            Capitalize
          </button>
          <button
            onClick={() => set("caps", "uppercase")}
            className={`${base} ${
              value.caps === "uppercase" ? active : inactive
            }`}
          >
            Uppercase
          </button>
        </div>
      </div>

      {/* Size */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Size</p>
        <div className="flex gap-3">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => set("size", s)}
              className={`${base} ${value.size === s ? active : inactive}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Icons */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Icons</p>
        <div className="flex gap-3">
          {ICON_STYLES.map((ic) => (
            <button
              key={ic}
              onClick={() => set("iconStyle", ic)}
              className={`${base} ${
                value.iconStyle === ic ? active : inactive
              }`}
            >
              {ic.charAt(0).toUpperCase() + ic.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeadingStyleControls;

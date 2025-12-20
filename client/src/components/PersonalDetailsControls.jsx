import React from "react";

const btn =
  "px-4 py-2 rounded-xl border text-sm font-medium transition";
const active =
  "bg-purple-50 border-purple-500 text-purple-600";
const inactive =
  "bg-white border-gray-300 text-gray-600 hover:bg-gray-50";

const PersonalDetailsControls = ({ value, onChange }) => {
  const set = (k, v) => onChange({ ...value, [k]: v });

  const ALIGN = ["left", "center", "right"];
  const ARRANGE = ["stacked", "inline", "spread"];
  const LIST_STYLE = ["icon", "bullet", "bar"];
  const ICON_STYLE = ["none", "round", "square", "outline", "filled"];

  return (
    <div className="p-6 bg-white rounded-3xl border space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Personal Details</h3>

      {/* Align */}
      <div>
        <p className="text-sm font-medium mb-2">Align</p>
        <div className="flex gap-3">
          {ALIGN.map((a) => (
            <button
              key={a}
              className={`${btn} ${value.align === a ? active : inactive}`}
              onClick={() => set("align", a)}
            >
              {a.charAt(0).toUpperCase() + a.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Arrangement */}
      <div>
        <p className="text-sm font-medium mb-2">Arrangement</p>
        <div className="flex gap-3">
          {ARRANGE.map((a) => (
            <button
              key={a}
              className={`${btn} ${value.arrangement === a ? active : inactive}`}
              onClick={() => set("arrangement", a)}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* List Style */}
      <div>
        <p className="text-sm font-medium mb-2">Display Style</p>
        <div className="flex gap-3">
          {LIST_STYLE.map((l) => (
            <button
              key={l}
              className={`${btn} ${value.listStyle === l ? active : inactive}`}
              onClick={() => set("listStyle", l)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Icons */}
      <div>
        <p className="text-sm font-medium mb-2">Icon Style</p>
        <div className="flex gap-3">
          {ICON_STYLE.map((i) => (
            <button
              key={i}
              className={`${btn} ${value.iconStyle === i ? active : inactive}`}
              onClick={() => set("iconStyle", i)}
            >
              {i}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsControls;

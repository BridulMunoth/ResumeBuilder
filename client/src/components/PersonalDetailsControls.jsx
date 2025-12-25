import React from "react";
import { Ban, Circle, Disc } from "lucide-react";

const btn = "px-4 py-2 rounded-xl border text-sm font-medium transition";
const active = "bg-purple-50 border-purple-500 text-purple-600";
const inactive = "bg-white border-gray-300 text-gray-600 hover:bg-gray-50";

const PersonalDetailsControls = ({ value, onChange, template }) => {
  const set = (k, v) => onChange({ ...value, [k]: v });

  const ALIGN = ["left", "center", "right"];
  const ARRANGE = ["stacked", "inline", "spread"];
  // Removed LIST_STYLE as requested
  const ICON_STYLE = ["none", "round", "square", "outline", "filled"];

  return (
    <div className="p-6 bg-white rounded-3xl border space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Personal Details</h3>

      {/* Align */}
      <div>
        <p className="text-sm font-medium mb-2">Align</p>
        <div className="flex gap-3">
          {ALIGN.map((a) => {
            const isDisabled = template === "classic" && a !== "left";
            return (
              <button
                key={a}
                className={`${btn} ${
                  value.align === a ? active : inactive
                } ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                    : ""
                }`}
                onClick={() => !isDisabled && set("align", a)}
                disabled={isDisabled}
                title={isDisabled ? "Not available for Classic Template" : a}
              >
                {a.charAt(0).toUpperCase() + a.slice(1)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Arrangement */}
      <div>
        <p className="text-sm font-medium mb-2">Arrangement</p>
        <div className="flex gap-3">
          {ARRANGE.map((a) => {
            const isDisabled = template === "classic" && a !== "stacked";
            return (
              <button
                key={a}
                className={`${btn} ${
                  value.arrangement === a ? active : inactive
                } ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                    : ""
                }`}
                onClick={() => !isDisabled && set("arrangement", a)}
                disabled={isDisabled}
                title={isDisabled ? "Not available for Classic Template" : a}
              >
                {a}
              </button>
            );
          })}
        </div>
      </div>

      {/* Image Alignment */}
      <div>
        <p className="text-sm font-medium mb-2">Image Alignment</p>
        <div className="flex gap-3">
          {["hidden", "left", "center", "right"].map((align) => {
            const isDisabled = template === "classic" && !["hidden", "center"].includes(align);
            return (
              <button
                key={align}
                className={`${btn} ${
                  (value.imageAlign || "hidden") === align ? active : inactive
                } ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                    : ""
                }`}
                onClick={() => !isDisabled && set("imageAlign", align)}
                disabled={isDisabled}
                title={
                  isDisabled
                    ? "Not available for Classic Template"
                    : align.charAt(0).toUpperCase() + align.slice(1)
                }
              >
                {align.charAt(0).toUpperCase() + align.slice(1)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Icons */}
      <div>
        <p className="text-sm font-medium mb-2">Icon Style</p>
        <div className="flex gap-3 flex-wrap">

          {[
            "none",
            "outline",
            "filled",
            "round",
            "soft",
            "diamond",
            "glow",
          ].map((style) => {
             const isDisabled = template === 'classic' && ["soft", "diamond", "glow"].includes(style);
             return (
            <button
              key={style}
              className={`${btn} px-3 py-2 ${
                value.iconStyle === style ? active : inactive
              } ${isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400' : ''}`}
              onClick={() => !isDisabled && set("iconStyle", style)}
              disabled={isDisabled}
              title={isDisabled ? "Not available for Classic Template" : style}
            >
              {style === "none" && <Ban size={18} />}
              {(style === "outline" || style === "glow") && (
                <Circle
                  size={18}
                  className={style === "glow" ? "drop-shadow-md" : ""}
                />
              )}
              {style === "filled" && (
                <div className="w-5 h-5 rounded bg-current opacity-80 border border-current" />
              )}
              {(style === "round" || style === "soft") && (
                <div
                  className={`w-5 h-5 rounded-full bg-current ${
                    style === "soft" ? "opacity-20" : "opacity-80"
                  }`}
                />
              )}
              {style === "diamond" && (
                <div className="w-4 h-4 rounded-sm bg-current opacity-20 transform rotate-45" />
              )}
            </button>
          )})}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsControls;

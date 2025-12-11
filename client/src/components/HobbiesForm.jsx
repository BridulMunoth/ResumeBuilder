import { HeartHandshake, Plus, Trash2, Lightbulb } from "lucide-react";
import React, { useState } from "react";
import TipsPanel from "./TipsPanel";

const HobbiesForm = ({ data = [], onChange }) => {
  const [showTips, setShowTips] = useState(false);

  const addHobby = () => {
    onChange([...(data || []), ""]);
  };

  const removeHobby = (index) => {
    onChange((data || []).filter((_, i) => i !== index));
  };

  const updateHobby = (index, value) => {
    const updated = [...(data || [])];
    updated[index] = value;
    onChange(updated);
  };

  const baseInputClass =
    "w-full rounded-2xl border border-white/80 bg-white/95 px-3.5 py-3 text-sm " +
    "text-slate-900 placeholder:text-slate-400 shadow-[0_8px_22px_rgba(15,23,42,0.08)] " +
    "backdrop-blur-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-400/60 outline-none transition";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <HeartHandshake className="h-5 w-5 text-purple-600" />
            Hobbies & Interests
          </h3>
          <p className="text-sm text-slate-600">
            Optional but adds personality to your profile.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTips(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full 
              border border-yellow-300/80 bg-yellow-50/90 text-yellow-600
              shadow-[0_0_10px_rgba(250,204,21,0.35)] backdrop-blur-md"
          >
            <Lightbulb className="h-4 w-4" />
          </button>

          <button
            onClick={addHobby}
            className="inline-flex items-center gap-2 rounded-xl 
              bg-emerald-50 border border-emerald-300/60 
              px-5 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition"
          >
            <Plus className="h-4 w-4" />
            Add hobby
          </button>
        </div>
      </div>

      {/* Empty */}
      {data.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200/80 bg-white/70 py-8 text-center shadow-inner backdrop-blur-xl">
          <HeartHandshake className="mx-auto mb-3 h-10 w-10 text-slate-300" />
          <p className="text-sm text-slate-700">No hobbies added yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 p-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            >
              <input
                value={item}
                onChange={(e) => updateHobby(index, e.target.value)}
                type="text"
                className={`${baseInputClass}`}
                placeholder="e.g., Reading, Football, Photography"
              />

              <button
                onClick={() => removeHobby(index)}
                className="inline-flex h-9 w-9 items-center justify-center 
                  rounded-xl bg-rose-50 border border-rose-300/60 
                  text-rose-600 hover:bg-rose-100 transition"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <TipsPanel
        open={showTips}
        onClose={() => setShowTips(false)}
        title="Hobbies Tips"
        sections={[
          {
            heading: "Suggestions",
            points: [
              "Pick 3-5 hobbies that reflect personality and soft skills.",
              "Avoid overly controversial or extremely niche hobbies.",
              "Team sports show teamwork; solo activities show discipline or creativity.",
            ],
          },
        ]}
      />
    </div>
  );
};

export default HobbiesForm;

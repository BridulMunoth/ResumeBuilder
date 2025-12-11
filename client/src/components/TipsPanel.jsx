import React from "react";

const TipsPanel = ({ open, onClose, title = "Tips", sections = [] }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl border-l border-gray-200 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="flex-1 overflow-auto">
          {sections.map((sec, idx) => (
            <details key={idx} className="border-b p-4" open={idx === 0}>
              <summary className="cursor-pointer font-medium text-gray-800">
                {sec.heading}
              </summary>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                {(sec.points || []).map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default TipsPanel;

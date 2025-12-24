import React, { useEffect, useState } from "react";
import { X, Lightbulb, ChevronDown, ChevronRight } from "lucide-react";

/**
 * Premium TipsPanel component with slide-over animation and polished UI.
 */
const TipsPanel = ({ open, onClose, title = "Tips", sections = [] }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  // Handle entry/exit animations
  useEffect(() => {
    let timeout;
    if (open) {
      setIsVisible(true);
      // Removed body scroll lock as requested
    } else {
      timeout = setTimeout(() => setIsVisible(false), 300); // Match transition duration
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [open]);

  if (!isVisible && !open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Slide-over Panel */}
      <aside
        className={`relative h-full w-full max-w-md transform bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-50 text-yellow-600 ring-1 ring-yellow-100/50">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                <p className="text-xs font-medium text-slate-500">
                  Expert guidance for your resume
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6">
            <div className="space-y-4">
              {sections.map((sec, idx) => {
                const isActive = activeSection === idx;
                return (
                  <div
                    key={idx}
                    className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? "bg-white border-gray-200 font-medium text-slate-800"
                        : "bg-slate-50 border-transparent text-slate-600 hover:bg-white hover:border-gray-200"
                    }`}
                  >
                    <button
                      onClick={() => setActiveSection(isActive ? -1 : idx)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left"
                    >
                      <h4
                        className={`text-sm font-semibold transition-colors ${
                          isActive ? "text-slate-900" : "text-slate-700"
                        }`}
                      >
                        {sec.heading}
                      </h4>
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300 ${
                          isActive
                            ? "rotate-180 bg-slate-100 text-slate-600"
                            : "text-slate-400"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>

                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-5 pb-5 pt-0">
                        <ul className="space-y-3 border-t border-gray-100 pt-3">
                          {(sec.points || []).map((p, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pro Tip Box */}
            <div className="mt-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 p-5 border border-indigo-100">
              <h5 className="flex items-center gap-2 text-sm font-bold text-indigo-900 mb-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-[10px]">
                  ✨
                </span>
                Did you know?
              </h5>
              <p className="text-sm text-indigo-800/80 leading-relaxed">
                You can now customize the layout, colors, and fonts of this
                section in the
                <span className="font-semibold mx-1 text-indigo-900">
                  Customize
                </span>
                tab above. Try changing the column count!
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default TipsPanel;

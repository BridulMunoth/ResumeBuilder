import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="relative flex flex-col items-center">
        {/* Logo Container with premium shadow and glowing effect */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full animate-pulse"></div>
          <img
            src="/logo.jpg"
            alt="NBY Resume Builder"
            className="relative h-24 w-auto object-contain rounded-xl shadow-2xl animate-pulse"
            style={{ animationDuration: "2s" }}
          />
        </div>

        {/* Elegant spinner */}
        <div className="flex flex-col items-center gap-4">
          <div className="h-1.5 w-48 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-[shimmer_1.5s_infinite] w-full origin-left-right"></div>
          </div>

          <span className="text-sm font-medium text-gray-400 tracking-widest uppercase animate-pulse">
            Loading your workspace...
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;

import React from 'react';

const Loader = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="relative">
      <div className="w-16 h-16 rounded-full border-4 border-t-4 border-gradient-to-tr from-purple-400 via-blue-400 to-green-400 border-t-transparent animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Optional inner icon */}
        <svg
          className="w-7 h-7 text-purple-400 opacity-80 animate-pulse"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
        </svg>
      </div>
    </div>
    <span className="ml-4 text-lg text-gray-600 animate-fade animate-infinite">Loading...</span>
  </div>
);

export default Loader;

import React from "react";

const SidebarSkeleton = () => {
  return (
    <div className="max-w-xs max-h-[calc(100vh-12rem)] w-full bg-base-100 p-4 overflow-y-auto md:mr-6 border-base-200 shadow-[0_0_12px_rgba(0,0,0,0.15)] rounded-2xl">
      <h2 className="text-lg font-semibold mb-4 text-base-content bg-gray-300 animate-pulse h-6 w-32 rounded-md"></h2>
      <ul className="space-y-2">
        {[...Array(6)].map((_, index) => (
          <li key={index} className="flex items-center gap-3 p-2 rounded-lg cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
            <div className="w-24 h-4 bg-gray-300 animate-pulse rounded-md"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarSkeleton;

import React from "react";

const SidebarSkeleton = () => {
  return (
    <div className="max-w-xs min-h-screen w-full bg-base-100 p-4 overflow-y-auto border-base-300 shadow-[0_0_12px_rgba(0,0,0,0.15)] ">
      <ul className="space-y-2">
        {[...Array(6)].map((_, index) => (
          <li key={index} className="flex items-center gap-3 p-2 rounded-lg cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-base-300 animate-pulse"></div>
            <div className="w-24 h-4 bg-base-300 animate-pulse rounded-md"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarSkeleton;

import React from "react";

const SidebarSkeleton = () => {
  return (
    <div className="max-w-xs min-h-screen min-w-full bg-base-300 overflow-y-auto ">
      <ul className="space-y-2">
        {[...Array(6)].map((_, index) => (
          <li key={index} className="flex items-center gap-3 p-2 rounded-lg cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-base-100 animate-pulse"></div>
            <div className="space-y-2">
              <div className="w-30 h-4 bg-base-100 animate-pulse rounded-md"></div>
              <div className="w-34 h-4 bg-base-100 animate-pulse rounded-md"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarSkeleton;

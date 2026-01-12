"use client";

import React from "react";
import { usePathname } from "next/navigation"; // get current path
import { UserCircle } from "lucide-react";

const routeTitleMap: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/projects": "Projects",
  "/admin/skills": "Skills",
  "/admin/docs": "CV / Docs",
  "/admin/blog": "Blog",
  "/admin/page-views": "Page Views",
  "/admin/messages": "Contact Messages",
};

const AdminNav: React.FC = () => {
  const pathname = usePathname();

  // Find the base path match from routeTitleMap
  const basePath = Object.keys(routeTitleMap).find((path) =>
    pathname === path || pathname.startsWith(path + "/")
  );

  const title = basePath ? routeTitleMap[basePath] : "Admin";

  return (
    <header className="bg-gray-900 shadow px-6 py-6 flex justify-between items-center sticky top-0 z-10">
      <h2 className="text-xl text-white font-semibold">{title}</h2>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer">
          <UserCircle size={28} className="text-gray-100" />
          <span className="hidden sm:block text-gray-100 font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default AdminNav;

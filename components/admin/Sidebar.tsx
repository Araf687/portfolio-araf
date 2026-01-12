"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Layers,
  User,
  FileText,
  Edit3,
  BarChart2,
  Mail,
} from "lucide-react";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/admin" },
    { name: "Projects", icon: <Layers size={18} />, path: "/admin/projects" },
    { name: "Skills", icon: <User size={18} />, path: "/admin/skills" },
    { name: "CV / Docs", icon: <FileText size={18} />, path: "/admin/docs" },
    { name: "Blog", icon: <Edit3 size={18} />, path: "/admin/blog" },
    { name: "Page Views", icon: <BarChart2 size={18} />, path: "/admin/page-views" },
    { name: "Contact Messages", icon: <Mail size={18} />, path: "/admin/messages" },
  ];

  return (
    <aside className="bg-gray-900 text-gray-100 w-64 min-h-screen p-4 border-r border-gray-700 flex flex-col">
      <h1 className="text-2xl font-bold mb-10">Portfolio Admin</h1>

      <nav className="flex-1">
        {menu.map((item) => {
          const isActive =
            item.path === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.path);

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-md mb-2
                transition-colors
                hover:bg-gray-800
                ${isActive ? "bg-gray-800 font-semibold" : ""}
              `}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto text-sm text-gray-400">
        &copy; 2026 Your Name
      </div>
    </aside>
  );
};

export default Sidebar;

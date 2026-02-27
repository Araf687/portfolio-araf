"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation"; 
import { Power, UserCircle } from "lucide-react";
import { signOut } from "next-auth/react";
import Tooltip from "../Tooltip";

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
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);

  const basePath = Object.keys(routeTitleMap).find(
    (path) => pathname === path || pathname.startsWith(path + "/"),
  );

  const title = basePath ? routeTitleMap[basePath] : "Admin";

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <>
      <header className="bg-gray-900 shadow px-6 py-6 flex justify-between items-center sticky top-0 z-10">
        <h2 className="text-xl text-white font-semibold">{title}</h2>

        <div className="flex items-center gap-4 pr-2">
          <div className="flex items-center gap-2 cursor-pointer">
            <UserCircle size={28} className="text-gray-100" />
            <span className="hidden sm:block text-gray-100 font-medium">
              Admin
            </span>
          </div>

          <span
            onClick={() => setModalOpen(true)}
            className="mt-2 text-white cursor-pointer"
          >
            <Tooltip content="Logout">
              <Power className="text-red-500" />
            </Tooltip>
          </span>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-gray-900 text-white rounded-lg p-6 w-80 space-y-4">
            <h3 className="text-lg font-semibold">Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNav;

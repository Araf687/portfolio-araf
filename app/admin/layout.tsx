"use client";

import AdminNav from "@/components/admin/AdminNav";
import Sidebar from "@/components/admin/Sidebar";
import { ToastProvider } from "@/context/ToastProvider";
import { log } from "console";

import React, { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
  active?: string;
  title?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  return (
    <ToastProvider>
      <div className="h-auto flex">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <AdminNav />
          <main className="p-6 flex-1 text-white">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
};

export default AdminLayout;

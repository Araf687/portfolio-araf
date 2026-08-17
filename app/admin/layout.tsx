"use client";

import AdminNav from "@/components/admin/AdminNav";
import Sidebar from "@/components/admin/Sidebar";
import { ToastProvider } from "@/context/ToastProvider";

import React, { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
  active?: string;
  title?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  return (
    <ToastProvider>
      <div className="min-h-screen flex bg-gray-950 text-gray-100">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <AdminNav />
          <main className="p-6 flex-1">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
};

export default AdminLayout;

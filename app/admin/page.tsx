"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Folder, Code, MessageSquare, Eye } from "lucide-react";

// Define the shape of our dashboard data
interface DashboardData {
  stats: { label: string; value: number; color: string }[];
  recentMessages: any[];
  featuredProjects: any[];
}

const AdminPage = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/dashboard");
        const result = await res.json();
        console.log("Dashboard Data:", result); 
        setData(result);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
      </div>
    );
  }

  return (
    <div className="text-white space-y-8">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-gray-800 border border-gray-700 p-5 rounded-xl shadow-sm hover:border-indigo-500 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm font-medium">{stat.label}</span>
              {getIcon(stat.label)}
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Messages Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Messages</h2>
          <div className="space-y-4">
            {data?.recentMessages.length ? data.recentMessages.map((msg) => (
              <div key={msg.id} className="border-b border-gray-700 pb-3 last:border-0">
                <p className="font-medium text-indigo-400">{msg.name}</p>
                <p className="text-sm text-gray-400 truncate">{msg.message}</p>
              </div>
            )) : <p className="text-gray-500">No messages yet.</p>}
          </div>
        </div>

        {/* Featured Projects Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Featured Projects</h2>
          <div className="space-y-4">
            {data?.featuredProjects.map((project) => (
              <div key={project.id} className="flex  border-b border-gray-700 pb-1 items-center gap-4">
                {/* {project.thumbnail && (
                  <img src={project.thumbnail} className="w-12 h-12 rounded object-cover" alt="" />
                )} */}
                <span className="font-medium ">{project.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple helper to return icons based on label
const getIcon = (label: string) => {
  const props = { size: 20, className: "text-indigo-500" };
  if (label.includes("Project")) return <Folder {...props} />;
  if (label.includes("Skills")) return <Code {...props} />;
  if (label.includes("Inquiries")) return <MessageSquare {...props} />;
  if (label.includes("Views")) return <Eye {...props} />;
  return null;
};

export default AdminPage;
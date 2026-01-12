"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

type ToastType = "success" | "warning" | "error";

interface Toast {
  id: string;
  type: ToastType;
  description: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (type: ToastType, description: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

// Browser-safe ID generator
const generateId = () => {
  return Math.random().toString(36).substring(2, 10);
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (type: ToastType, description: string, duration = 3000) => {
    const id = generateId();
    setToasts((prev) => [...prev, { id, type, description, duration }]);

    // Auto-remove after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case "error":
        return <XCircle className="w-6 h-6 text-red-500" />;
    }
  };

  const getTitle = (type: ToastType) => {
    switch (type) {
      case "success":
        return "Success!";
      case "warning":
        return "Warning!";
      case "error":
        return "Error!";
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 flex items-start gap-3 text-white cursor-pointer"
              onClick={() => removeToast(toast.id)}
            >
              {getIcon(toast.type)}
              <div className="flex-1">
                <div className="font-semibold">{getTitle(toast.type)}</div>
                <div className="text-sm">{toast.description}</div>
              </div>
              <button onClick={() => removeToast(toast.id)}>
                <X className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, AlertTriangle, XCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "success" | "warning" | "error";

interface StatusToastProps {
  type: ToastType;
  description: string;
  duration?: number; // milliseconds
  onClose?: () => void;
}

export const StatusToast: React.FC<StatusToastProps> = ({
  type,
  description,
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case "error":
        return <XCircle className="w-6 h-6 text-red-500" />;
    }
  };

  const getTitle = () => {
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
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 z-50 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 flex items-start gap-3 text-white"
        >
          {getIcon()}
          <div className="flex-1">
            <div className="font-semibold">{getTitle()}</div>
            <div className="text-sm">{description}</div>
          </div>
          <button
            onClick={() => {
              setVisible(false);
              onClose?.();
            }}
          >
            <X className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

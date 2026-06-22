"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiAlertCircle, FiX } from "react-icons/fi";

export interface Toast {
  id: string;
  type: "success" | "error";
  message: string;
}

interface ToastContextType {
  showToast: (type: "success" | "error", message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (type: "success" | "error", message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Render toast container inline to prevent hydration mismatch */}
      <div className="fixed top-6 right-6 z-[110] flex flex-col gap-3 pointer-events-none max-w-sm w-full font-sans">
          <AnimatePresence>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border bg-card text-foreground backdrop-blur-md shadow-lg ${
                  toast.type === "success"
                    ? "border-emerald-500/30"
                    : "border-rose-500/30"
                }`}
              >
                <div className="mt-0.5">
                  {toast.type === "success" ? (
                    <FiCheck className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <FiAlertCircle className="w-4 h-4 text-rose-500" />
                  )}
                </div>
                <div className="flex-1 text-xs font-semibold leading-relaxed">
                  {toast.message}
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-slate-400 hover:text-slate-200 dark:hover:text-slate-700 cursor-pointer"
                >
                  <FiX className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

import React, { useEffect } from "react";
import { useThemeStore } from "../Stores/ThemeStore";

export const ModalContainer = ({ isOpen, children }) => {
  const { isDark } = useThemeStore();

  return (
    <div
      className={`
        fixed inset-0 z-10 overflow-y-auto transition-opacity duration-300
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`
            relative max-w-5xl w-full mx-auto rounded-lg shadow-xl
            ${isDark ? "bg-gray-800" : "bg-white"}
            p-6 transform transition-all duration-300
            ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          `}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const CloseButton = ({ onClose }) => {
  const { isDark } = useThemeStore();

  return (
    <button
      onClick={onClose}
      className={`p-1 rounded-full hover:bg-opacity-20 ${
        isDark ? "hover:bg-gray-300" : "hover:bg-gray-200"
      }`}
    >
      <svg
        className={`w-6 h-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
};

export const ModalHeader = ({ title, onClose }) => {
  const { isDark } = useThemeStore();

  return (
    <div className="flex justify-between items-start mb-4">
      <h2
        className={`text-xl font-semibold ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      <CloseButton onClose={onClose} />
    </div>
  );
};

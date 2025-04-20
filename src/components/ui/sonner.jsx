"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: ({ type }) =>
            type === "error"
              ? "group toast group-[.toaster]:bg-red-500 group-[.toaster]:text-white group-[.toaster]:border-red-600 group-[.toaster]:shadow-lg"
              : "group toast group-[.toaster]:bg-green-500 group-[.toaster]:text-white group-[.toaster]:border-green-600 group-[.toaster]:shadow-lg",
          description: ({ type }) =>
            type === "error" ? "group-[.toast]:text-red-100" : "group-[.toast]:text-green-100",
          actionButton: ({ type }) =>
            type === "error" ? "group-[.toast]:bg-red-700 group-[.toast]:text-white" : "group-[.toast]:bg-green-700 group-[.toast]:text-white",
          cancelButton: ({ type }) =>
            type === "error" ? "group-[.toast]:bg-red-200 group-[.toast]:text-red-800" : "group-[.toast]:bg-green-200 group-[.toast]:text-green-800",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

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
          toast:
            "group toast group-[.toaster]:bg-green-500 group-[.toaster]:text-white group-[.toaster]:border-green-600 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-green-100",
          actionButton:
            "group-[.toast]:bg-green-700 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-green-200 group-[.toast]:text-green-800",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

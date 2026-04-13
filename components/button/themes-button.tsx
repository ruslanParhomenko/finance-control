"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function ThemesButton() {
  const { theme, setTheme } = useTheme();
  const ThemeIcon = theme === "dark" ? Sun : Moon;

  const changeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={() => changeTheme()}
      className="cursor-pointer"
    >
      <ThemeIcon className="h-4 w-4 text-blue-600" />
    </button>
  );
}

import { useState } from "react";

export type Theme = "volunteer" | "org";

export function useTheme(defaultTheme: Theme = "volunteer") {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);

  function toggleTheme() {
    setCurrentTheme(currentTheme === "org" ? "volunteer" : "org");
  }

  return { currentTheme, setCurrentTheme, toggleTheme };
}

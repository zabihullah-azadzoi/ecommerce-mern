import { useEffect, useState, useCallback } from "react";

// setting filter menu mode for mobile and desktop view based on screen size
const useMenuModeToggler = () => {
  const [menuMode, setMenuMode] = useState("inline");

  const checkWindowSize = useCallback(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth > 599) {
      setMenuMode("inline");
    } else {
      setMenuMode("horizontal");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", checkWindowSize);
    checkWindowSize();
    return () => window.removeEventListener("resize", checkWindowSize);
  }, [checkWindowSize]);

  return { menuMode };
};

export default useMenuModeToggler;

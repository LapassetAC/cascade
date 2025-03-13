import { useState, useEffect } from "react";

const useUserActivity = () => {
  const [isUserActive, setIsUserActive] = useState(true);

  useEffect(() => {
    // Function to handle visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setIsUserActive(true);
      } else {
        setIsUserActive(false);
      }
    };

    // Set initial state based on current visibility
    handleVisibilityChange();

    // Add event listener for visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Add event listener for when window loses focus
    window.addEventListener("blur", () => setIsUserActive(false));

    // Add event listener for when window gains focus
    window.addEventListener("focus", () => setIsUserActive(true));

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", () => setIsUserActive(false));
      window.removeEventListener("focus", () => setIsUserActive(true));
    };
  }, []);

  return isUserActive;
};

export default useUserActivity;

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

    const handleBlur = () => setIsUserActive(false);
    const handleFocus = () => setIsUserActive(true);

    // Add event listener for when window loses focus
    window.addEventListener("blur", handleBlur);

    // Add event listener for when window gains focus
    window.addEventListener("focus", handleFocus);

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return isUserActive;
};

export default useUserActivity;

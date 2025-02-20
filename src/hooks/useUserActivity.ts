import { useState, useEffect, useRef } from "react";

const useUserActivity = (inactivityTimeout = 3000) => {
  const [isUserActive, setIsUserActive] = useState(true);
  const userActivityTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const handleActivity = () => {
      setIsUserActive(true);

      // Reset the timeout
      if (userActivityTimeout.current) {
        clearTimeout(userActivityTimeout.current);
      }

      userActivityTimeout.current = setTimeout(() => {
        setIsUserActive(false);
      }, inactivityTimeout);
    };

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      setIsUserActive(!document.hidden);
    };

    // Add event listeners
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("scroll", handleActivity);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initial activity trigger
    handleActivity();

    // Cleanup
    return () => {
      if (userActivityTimeout.current) {
        clearTimeout(userActivityTimeout.current);
      }
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [inactivityTimeout]);

  return isUserActive;
};

export default useUserActivity;

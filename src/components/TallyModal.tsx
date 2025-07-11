"use client";

import { useEffect, useState } from "react";

interface TallyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TallyModal({ isOpen, onClose }: TallyModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Reset loading state when modal opens
      setIsLoading(true);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-4xl h-[80vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
          aria-label="Fermer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg z-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
              <p className="text-gray-600 font-medium">
                Chargement de l'estimation...
              </p>
            </div>
          </div>
        )}

        <div className="w-full h-full rounded-lg overflow-hidden">
          <iframe
            src="https://tally.so/r/w50Lad"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Estimer mon projet"
            className="rounded-lg"
            onLoad={handleIframeLoad}
          />
        </div>
      </div>
    </div>
  );
}

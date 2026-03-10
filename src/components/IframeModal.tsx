"use client";

import { useEffect, useState, useRef } from "react";

interface IframeModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  title: string;
  loadingLabel: string;
}

export default function IframeModal({
  isOpen,
  onClose,
  src,
  title,
  loadingLabel,
}: IframeModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsLoading(true);
      // Move focus to close button when modal opens
      setTimeout(() => closeButtonRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-4xl h-[80vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
          aria-label="Fermer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg z-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
              <p className="text-gray-600 font-medium">{loadingLabel}</p>
            </div>
          </div>
        )}

        <div className="w-full h-full rounded-lg overflow-hidden">
          <iframe
            src={src}
            width="100%"
            height="100%"
            frameBorder="0"
            title={title}
            className="rounded-lg"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}

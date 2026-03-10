"use client";

import IframeModal from "./IframeModal";

interface CalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalModal({ isOpen, onClose }: CalModalProps) {
  return (
    <IframeModal
      isOpen={isOpen}
      onClose={onClose}
      src="https://cal.com/cascadestudio/prise-de-contact"
      title="Planifier un rendez-vous"
      loadingLabel="Chargement de Cal.com..."
    />
  );
}

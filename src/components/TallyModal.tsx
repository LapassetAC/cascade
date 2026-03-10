"use client";

import IframeModal from "./IframeModal";

interface TallyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TallyModal({ isOpen, onClose }: TallyModalProps) {
  return (
    <IframeModal
      isOpen={isOpen}
      onClose={onClose}
      src="https://tally.so/r/w50Lad"
      title="Estimer mon projet"
      loadingLabel="Chargement de l'estimation..."
    />
  );
}

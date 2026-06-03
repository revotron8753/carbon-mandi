"use client";

import { useContactModal } from "./ContactModalProvider";

/**
 * A button that opens the global contact modal. Drop it in anywhere a CTA
 * ("Join the Mission", "Partner With Us", "Call to Enquire Now") is needed —
 * pass the visual classes via `className` and a `source` label for the email.
 */
export function ContactCtaButton({
  source,
  className,
  children,
  onClick,
}: {
  source?: string;
  className?: string;
  children: React.ReactNode;
  /** Extra side-effect on click (e.g. close a mobile menu). */
  onClick?: () => void;
}) {
  const { open } = useContactModal();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        open(source);
      }}
      className={className}
    >
      {children}
    </button>
  );
}

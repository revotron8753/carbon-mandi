"use client";

import { createContext, useCallback, useContext, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { ContactForm } from "./ContactForm";

type ContactModalContextValue = {
  /** Open the contact modal. `source` labels which CTA triggered it. */
  open: (source?: string) => void;
  close: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error("useContactModal must be used within <ContactModalProvider>");
  }
  return ctx;
}

export function ContactModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string | undefined>();

  const open = useCallback((nextSource?: string) => {
    setSource(nextSource);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ open, close }}>
      {children}

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[100] bg-ink/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[101] max-h-[90vh] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-paper p-6 shadow-[0_40px_120px_-30px_rgba(10,58,38,0.6)] ring-1 ring-line focus:outline-none">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Dialog.Title className="font-display text-xl font-extrabold tracking-tight text-ink">
                  Let&rsquo;s build together
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-[13.5px] leading-relaxed text-ink-soft">
                  {source
                    ? `${source} — share a few details and our team will reach out.`
                    : "Share a few details and our team will reach out."}
                </Dialog.Description>
              </div>
              <Dialog.Close
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-cream hover:text-ink"
              >
                <X size={18} strokeWidth={2} />
              </Dialog.Close>
            </div>

            <div className="mt-5">
              <ContactForm source={source} />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </ContactModalContext.Provider>
  );
}

"use client";

import { useRef, useState } from "react";
import { useToast } from "@/components/Toast";
import ConfirmDialog from "./ConfirmDialog";

export default function AdminForm({
  action,
  successMessage = "Saved.",
  confirmMessage,
  confirmLabel = "Save",
  className,
  children,
}: {
  /** Server action taking FormData, e.g. createVehicle or updateVehicle.bind(null, id). */
  action: (formData: FormData) => Promise<void>;
  successMessage?: string;
  /** If set, shows an "Are you sure?" dialog before the form actually submits. */
  confirmMessage?: string;
  confirmLabel?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { showToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const confirmedRef = useRef(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleAction(formData: FormData) {
    try {
      await action(formData);
      showToast({ kind: "success", title: successMessage });
    } catch (err) {
      showToast({
        kind: "error",
        title: "Something went wrong",
        description: err instanceof Error ? err.message : undefined,
      });
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!confirmMessage || confirmedRef.current) {
      confirmedRef.current = false;
      return;
    }
    e.preventDefault();
    setShowConfirm(true);
  }

  return (
    <>
      <form ref={formRef} action={handleAction} onSubmit={handleSubmit} className={className}>
        {children}
      </form>
      {showConfirm && (
        <ConfirmDialog
          title="Are you sure?"
          description={confirmMessage!}
          confirmLabel={confirmLabel}
          pendingLabel="Saving…"
          tone="default"
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => {
            setShowConfirm(false);
            confirmedRef.current = true;
            formRef.current?.requestSubmit();
          }}
        />
      )}
    </>
  );
}

"use client";

import { useState, useTransition } from "react";
import { useToast } from "@/components/Toast";
import ConfirmDialog from "./ConfirmDialog";

export default function ConfirmDeleteButton({
  action,
  itemLabel = "this item",
  successMessage = "Deleted.",
  className = "text-red-600 hover:underline",
  label = "Delete",
}: {
  /** Zero-arg server action, e.g. deleteVehicle.bind(null, id). */
  action: () => Promise<void>;
  itemLabel?: string;
  successMessage?: string;
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const { showToast } = useToast();

  function handleConfirm() {
    startTransition(async () => {
      try {
        await action();
        setOpen(false);
        showToast({ kind: "success", title: successMessage });
      } catch (err) {
        setOpen(false);
        showToast({
          kind: "error",
          title: "Something went wrong",
          description: err instanceof Error ? err.message : undefined,
        });
      }
    });
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
      </button>
      {open && (
        <ConfirmDialog
          title="Are you sure?"
          description={`This will permanently delete ${itemLabel}. This can't be undone.`}
          pending={pending}
          onCancel={() => setOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}

"use client";

import { useToast } from "@/components/Toast";

export default function AdminForm({
  action,
  successMessage = "Saved.",
  className,
  children,
}: {
  /** Server action taking FormData, e.g. createVehicle or updateVehicle.bind(null, id). */
  action: (formData: FormData) => Promise<void>;
  successMessage?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { showToast } = useToast();

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

  return (
    <form action={handleAction} className={className}>
      {children}
    </form>
  );
}

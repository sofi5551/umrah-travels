"use client";

import { useState } from "react";
import type { Vehicle } from "@/lib/data";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { submitBooking } from "@/lib/bookings";

function todayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60000).toISOString().slice(0, 10);
}

export default function BookingForm({
  fleet,
  whatsappNumber,
  source,
  prefillCar,
  prefillPickup,
  prefillDropoff,
  compact = false,
  saveTo = "quotes",
}: {
  fleet: Vehicle[];
  /** From getSiteSettings() — drives which number the WhatsApp redirect opens. */
  whatsappNumber: string;
  /** Human-readable label for where this submission came from, e.g.
   * "Homepage" or "Fleet – Toyota Camry" — shown as-is in the admin list. */
  source: string;
  prefillCar?: string;
  prefillPickup?: string;
  prefillDropoff?: string;
  compact?: boolean;
  /** Which admin section this submission shows up under. Doesn't change the
   * WhatsApp behavior — only where the silent background save lands. */
  saveTo?: "quotes" | "contacts";
}) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [pickup, setPickup] = useState(prefillPickup ?? "");
  const [dropoff, setDropoff] = useState(prefillDropoff ?? "");
  const [car, setCar] = useState(prefillCar ?? "");
  const [passengers, setPassengers] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const link = buildWhatsAppLink({ name, date, pickup, dropoff, car, passengers }, whatsappNumber);
    submitBooking(
      { name, date, pickup, dropoff, car, passengers, source },
      saveTo === "contacts" ? "contacts" : "bookings"
    ).catch((err) => console.error("Failed to save booking:", err));
    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}
    >
      <Field label="Your name">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          placeholder="Full name"
        />
      </Field>
      <Field label="Travel date">
        <input
          required
          type="date"
          min={todayISO()}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input"
        />
      </Field>
      <Field label="Pickup location">
        <input
          required
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className="input"
          placeholder="e.g. Jeddah Airport"
        />
      </Field>
      <Field label="Drop-off location">
        <input
          required
          value={dropoff}
          onChange={(e) => setDropoff(e.target.value)}
          className="input"
          placeholder="e.g. Makkah hotel"
        />
      </Field>
      <Field label="Preferred car">
        <select
          required
          value={car}
          onChange={(e) => setCar(e.target.value)}
          className="input"
        >
          <option value="" disabled>
            Select your car
          </option>
          {fleet.map((v) => (
            <option key={v.slug} value={`${v.name} – ${v.seats} Seats`}>
              {v.name} – {v.seats} Seats
            </option>
          ))}
        </select>
      </Field>
      <Field label="Number of passengers">
        <input
          required
          type="number"
          min={1}
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          className="input"
          placeholder="e.g. 3"
        />
      </Field>

      <button
        type="submit"
        className="mt-2 w-full rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-goldsoft sm:col-span-2"
      >
        Request a Quick Quote
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-black">
        {label}
      </span>
      {children}
    </label>
  );
}

"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { login, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

export default function AdminLoginPage() {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sand px-4">
      <Link
        href="/"
        className="mb-6 font-display text-2xl text-ink transition-colors hover:text-gold"
      >
        Haramain Ways
      </Link>

      <div className="w-full max-w-sm border border-sandline bg-white p-8 shadow-lg">
        <p className="text-sm font-medium uppercase tracking-widest text-gold">Admin</p>
        <h1 className="mt-2 font-display text-2xl text-ink">Sign in</h1>
        <p className="mt-1 text-sm text-stone">Content management</p>

        <form action={formAction} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-black">
              Email
            </span>
            <input
              required
              type="email"
              name="email"
              autoComplete="username"
              className="input"
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-black">
              Password
            </span>
            <input
              required
              type="password"
              name="password"
              autoComplete="current-password"
              className="input"
              placeholder="••••••••"
            />
          </label>

          {state.error && <p className="text-sm text-red-600">{state.error}</p>}

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-goldsoft disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

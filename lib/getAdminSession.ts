import "server-only";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifyAdminToken, type AdminSession } from "./adminAuth";

/**
 * Reads and verifies the admin session cookie from a Server Component or
 * Server Action. Use this as defense-in-depth alongside middleware.ts —
 * every mutating action should call this before touching supabaseAdmin.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminToken(token);
}

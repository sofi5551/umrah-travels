"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabaseAdmin";
import { signAdminToken, adminCookieOptions, ADMIN_COOKIE_NAME } from "@/lib/adminAuth";

export type LoginState = { error: string | null };

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return { error: "Admin auth isn't configured yet — missing Supabase service role key." };
  }

  const { data: user, error } = await supabaseAdmin
    .from("admin_users")
    .select("id, email, password_hash")
    .eq("email", email)
    .single();

  if (error || !user) {
    return { error: "Invalid email or password." };
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return { error: "Invalid email or password." };
  }

  const token = await signAdminToken({ sub: user.id, email: user.email });
  cookies().set(ADMIN_COOKIE_NAME, token, adminCookieOptions);

  redirect("/admin");
}

export async function logout() {
  cookies().delete(ADMIN_COOKIE_NAME);
  redirect("/admin/login");
}

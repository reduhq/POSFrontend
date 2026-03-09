"use server";

import { cookies } from "next/headers";

export async function loginAction(token: string, tenantId: string) {
  const cookieStore = await cookies();
  
  // Set the auth token as an HTTP-Only cookie, valid for 1 day
  // In production, you would add `secure: process.env.NODE_ENV === 'production'`
  cookieStore.set({
    name: "authToken",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
    sameSite: "lax",
  });

  // The tenantId is less sensitive, but good to store in a cookie
  // so the server knows which tenant the user belongs to
  cookieStore.set({
    name: "tenantId",
    value: tenantId,
    httpOnly: true, // Still good practice
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
    sameSite: "lax",
  });
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("authToken");
  cookieStore.delete("tenantId");
}

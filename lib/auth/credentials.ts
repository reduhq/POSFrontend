"use server";

import { cookies } from "next/headers";

/**
 * Server action to retrieve the current auth credentials from cookies.
 * Used by client components to make authenticated API calls.
 */
export async function getAuthCredentials() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value || "";
  const tenantId = cookieStore.get("tenantId")?.value || "";
  return { authToken, tenantId };
}

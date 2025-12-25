"use server";

import { authAdmin } from "@/lib/firebase";


export async function resetPassword(email: string) {
  const link = await authAdmin.generatePasswordResetLink(email);
  return true;
}

"use server";

import { signIn } from "next-auth/react";

export async function loginAction(email: string, password: string) {
  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (res?.error) {
    throw new Error("Неверный email или пароль");
  }

  return true;
}

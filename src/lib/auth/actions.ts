"use server";

import { redirect } from "next/navigation";
import { clearSessionCookie } from "./session.server";

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/login");
}

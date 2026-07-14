import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session.server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "admin") redirect("/dashboard");

  return <div className="space-y-6">{children}</div>;
}

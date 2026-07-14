import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session.server";
import { NavBar } from "@/components/nav-bar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-muted/20">
      <NavBar session={session} />
      <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
    </div>
  );
}

import Link from "next/link";
import { LogOut } from "lucide-react";
import { logoutAction } from "@/lib/auth/actions";
import type { SessionClaims } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TEAM_SHORT_LABELS } from "@/types/db";

export function NavBar({ session }: { session: SessionClaims }) {
  return (
    <header className="sticky top-0 z-10 bg-primary text-primary-foreground shadow-sm">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-5">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <span className="flex size-12 items-center justify-center rounded-full bg-white p-1">
              <img
                src="/sejong-emblem.png"
                alt="세종대학교 엠블럼"
                className="size-full object-contain"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-brand text-xl font-bold tracking-tight">
                VISE
              </span>
              <span className="hidden text-[0.7rem] text-primary-foreground/75 sm:block">
                세종대 바이브코딩 소모임
              </span>
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/me"
              className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
            >
              마이페이지
            </Link>
            <Link
              href="/teams"
              className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
            >
              팀
            </Link>
            {session.role === "admin" && (
              <>
                <Link
                  href="/admin/weeks"
                  className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                >
                  커리큘럼 관리
                </Link>
                <Link
                  href="/admin/members"
                  className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                >
                  멤버 관리
                </Link>
              </>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/me">
            <Badge className="gap-1.5 border-white/20 bg-white/15 text-primary-foreground">
              {TEAM_SHORT_LABELS[session.team]}팀 · {session.name}
            </Badge>
          </Link>
          <form action={logoutAction}>
            <Button
              type="submit"
              size="sm"
              className="border border-white/25 bg-white/10 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground"
            >
              <LogOut />
              로그아웃
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}

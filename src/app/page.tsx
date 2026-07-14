import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Lightbulb,
  GraduationCap,
  Compass,
  Flag,
  Heart,
  Rocket,
  PartyPopper,
  Palette,
  ClipboardList,
  Code2,
  ExternalLink,
} from "lucide-react";
import { getSession } from "@/lib/auth/session.server";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChatWidget } from "@/components/chat-widget";

const APPLICATION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdfkhLvfL3QspV-Os_3zDRBAcTPFlQ7qy8ivR4ts3ocW9ZjIA/viewform?usp=header";

const AUDIENCE_ITEMS = [
  {
    icon: Lightbulb,
    text: "“이런 앱이나 웹 서비스 있으면 좋겠다”는 아이디어가 있는 사람",
  },
  {
    icon: GraduationCap,
    text: "컴공이 아니어서 코딩은 남 일이라고 생각했던 사람",
  },
  {
    icon: Compass,
    text: "내 전공·내 관심사에서만 보이는 불편함을 해결하고 싶은 사람",
  },
  {
    icon: Flag,
    text: "개발은 잘 몰라도, 끝까지 만들어보고 싶은 사람",
  },
];

const WHAT_WE_DO_ITEMS = [
  {
    icon: Heart,
    title: "비사업적 프로젝트",
    text: "광고·수익화 없이, 순수하게 만들어보는 경험",
  },
  {
    icon: Rocket,
    title: "무료 스택으로 실배포",
    text: "내 계정으로 배포, 나만의 포트폴리오 링크",
  },
  {
    icon: PartyPopper,
    title: "학기 말 데모데이",
    text: "4팀이 각자 완성한 서비스를 발표",
  },
];

const TEAM_ROLES = [
  { icon: Palette, role: "디자인", count: "1명" },
  { icon: ClipboardList, role: "기획", count: "1명" },
  { icon: Code2, role: "개발", count: "2명" },
];

const RECRUIT_STATS = [
  { value: "16명", label: "모집 인원 (4팀 × 4인)" },
  { value: "무관", label: "학년·전공 (세종대 재학생)" },
  { value: "15주", label: "한 학기, 주 1회 정기 모임" },
  { value: "무료", label: "참가비 없음" },
];

export default async function Home() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="bg-primary text-primary-foreground shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-5">
          <div className="flex items-center gap-2.5">
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
          </div>
          <Button
            nativeButton={false}
            render={<Link href="/login">로그인</Link>}
            className="border border-white/25 bg-white/10 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground"
          />
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-16 px-4 py-16">
        <section className="relative space-y-4 overflow-hidden text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-24 -z-10 mx-auto h-72 w-72 rounded-full bg-gold/25 blur-3xl"
          />
          <Badge className="mx-auto">세종대학교 바이브코딩 소모임 1기 모집</Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            코딩은 전공자만? 아니요.
            <br />
            아이디어가 있는 모든 전공에게.
          </h1>
          <p className="mx-auto max-w-xl text-muted-foreground">
            머릿속에만 있던 앱이나 웹 서비스, 이번 학기에 진짜로 배포까지
            해봅니다. 컴공 아니어도 됩니다. 코딩 0에서 시작해도 됩니다.
            만드는 법을 처음부터 같이 배웁니다.
          </p>
          <div className="pt-2">
            <Button
              size="lg"
              className="h-12 px-8 text-base shadow-lg shadow-primary/30 transition-transform hover:scale-105 hover:shadow-xl hover:shadow-primary/40"
              nativeButton={false}
              render={
                <a
                  href={APPLICATION_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  지원하기
                </a>
              }
            />
          </div>
        </section>

        <section className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12 sm:py-16">
          <p className="text-2xl font-bold tracking-tight sm:text-4xl">
            오히려 다양한 전공을 찾습니다.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
            체육과가 보는 세상, 예체능이 보는 세상, 인문·경영이 보는 세상은
            개발자가 보는 세상과 다릅니다. 좋은 서비스는 코드가 아니라
            &ldquo;이런 게 필요했는데&rdquo;라는 시각에서 나옵니다. 남들과
            다른 관점을 가진 당신의 아이디어가, 이 소모임엔 가장 필요합니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            이런 사람을 찾습니다
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {AUDIENCE_ITEMS.map(({ icon: Icon, text }) => (
              <Card key={text}>
                <CardContent className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-gold-icon shadow-[0_0_14px_rgba(255,242,204,0.6)]">
                    <Icon
                      className="size-5 drop-shadow-[0_0_5px_rgba(255,242,204,0.9)]"
                      strokeWidth={2.5}
                    />
                  </span>
                  <p className="pt-1.5 text-sm">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="border-l-4 border-l-gold">
            <CardContent className="text-sm">
              전공도 실력도 상관없습니다.{" "}
              <strong className="text-gold shimmer">아이디어와 끈기</strong>만
              있으면 됩니다. 학기 끝까지 완주할 의지만 있으면 충분합니다.
            </CardContent>
          </Card>
          <p className="text-center text-xs text-muted-foreground">
            VISE는 세종대학교 학생들이 자율적으로 운영하는 비영리 코딩 소모임이며,
            특정 종교·정치 단체와 무관합니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            무엇을 하나요
          </h2>
          <p className="text-sm text-muted-foreground">
            한 학기 동안 <strong className="text-gold shimmer">4인 1팀</strong>
            으로 실제 서비스 하나를 기획부터 배포까지 완성합니다. 앱과 웹 중
            팀이 원하는 방향을 골라 만들 수 있습니다. 운영진이 GitHub ·
            개발환경 세팅 · 개발 기초 · 배포까지 처음부터 끝까지 함께합니다.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {WHAT_WE_DO_ITEMS.map(({ icon: Icon, title, text }) => (
              <Card key={title}>
                <CardContent className="space-y-2">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-gold-icon shadow-[0_0_14px_rgba(255,242,204,0.6)]">
                    <Icon
                      className="size-5 drop-shadow-[0_0_5px_rgba(255,242,204,0.9)]"
                      strokeWidth={2.5}
                    />
                  </span>
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            팀 구성 (4인 1조)
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {TEAM_ROLES.map(({ icon: Icon, role, count }) => (
              <Card key={role}>
                <CardContent className="flex flex-col items-center gap-2 text-center">
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary text-gold-icon shadow-[0_0_16px_rgba(255,242,204,0.6)]">
                    <Icon
                      className="size-6 drop-shadow-[0_0_5px_rgba(255,242,204,0.9)]"
                      strokeWidth={2.5}
                    />
                  </span>
                  <p className="font-medium">{role}</p>
                  <p className="text-xs text-muted-foreground">{count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            디자인 1명 · 기획 1명 · 개발 2명(소프트웨어 계열 권장)으로
            구성됩니다. 바이브코딩은 전원에게 가르치고, 경험이 없어도 역할별
            기초부터 배웁니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">만든 사람</h2>
          <Card>
            <CardContent className="flex flex-col gap-2">
              <p className="text-sm">
                <strong>김성일</strong> · 세종대학교 지능기전공학부
                스마트기기전공 22학번 (컴퓨터공학 복수전공)
              </p>
              <p className="text-sm text-muted-foreground">
                이 웹사이트를 포함해 VISE를 혼자 기획·개발하고 있습니다.
              </p>
              <a
                href="https://github.com/KIMSE0NG1L"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="size-4" />
                github.com/KIMSE0NG1L
              </a>
            </CardContent>
          </Card>
        </section>

        <section id="지원" className="space-y-4">
          <h2 className="text-xl font-semibold">모집 개요</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {RECRUIT_STATS.map(({ value, label }) => (
              <Card key={label}>
                <CardContent className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardContent className="space-y-2">
              <p className="font-medium">지원 방법</p>
              <p className="text-sm text-muted-foreground">
                마감일·문의 채널은 추후 공지됩니다.
              </p>
              <Button
                variant="outline"
                nativeButton={false}
                render={
                  <a
                    href={APPLICATION_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    지원서 작성하기
                  </a>
                }
              />
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-card">
        <div className="mx-auto max-w-4xl space-y-4 px-4 py-12 text-center">
          <p className="text-lg font-semibold">
            코딩을 몰라서 미뤄뒀던 아이디어, 이번 학기에 같이 배포까지
            해봅시다.
          </p>
          <Button
            size="lg"
            nativeButton={false}
            render={
              <a
                href={APPLICATION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                지원하기
              </a>
            }
          />
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}

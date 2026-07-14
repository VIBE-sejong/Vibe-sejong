import Link from "next/link";
import { redirect } from "next/navigation";
import { Sparkles } from "lucide-react";
import { getSession } from "@/lib/auth/session.server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const APPLICATION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdfkhLvfL3QspV-Os_3zDRBAcTPFlQ7qy8ivR4ts3ocW9ZjIA/viewform?usp=header";

export default async function Home() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-5">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-white/15">
              <Sparkles className="size-5" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-heading text-xl font-bold tracking-tight">
                VISE
              </span>
              <span className="hidden text-[0.7rem] text-primary-foreground/75 sm:block">
                세종대 바이브코딩 동아리
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
        <section className="space-y-4 text-center">
          <Badge className="mx-auto">세종대학교 바이브코딩 동아리 1기 모집</Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            코딩은 전공자만? 아니요.
            <br />
            아이디어가 있는 모든 전공에게.
          </h1>
          <p className="mx-auto max-w-xl text-muted-foreground">
            머릿속에만 있던 앱, 이번 학기에 진짜로 배포까지 해봅니다. 컴공
            아니어도 됩니다. 코딩 0에서 시작해도 됩니다. 만드는 법을 처음부터
            같이 배웁니다.
          </p>
          <div className="pt-2">
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
        </section>

        <section className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12 sm:py-16">
          <p className="text-2xl font-bold tracking-tight sm:text-4xl">
            오히려 다양한 전공을 찾습니다.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
            체육과가 보는 세상, 예체능이 보는 세상, 인문·경영이 보는 세상은
            개발자가 보는 세상과 다릅니다. 좋은 서비스는 코드가 아니라
            &ldquo;이런 게 필요했는데&rdquo;라는 시각에서 나옵니다. 남들과
            다른 관점을 가진 당신의 아이디어가, 이 동아리엔 가장 필요합니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">이런 사람을 찾습니다</h2>
          <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
            <li>&ldquo;이런 앱/서비스 있으면 좋겠다&rdquo;는 아이디어가 있는 사람</li>
            <li>컴공이 아니어서 코딩은 남 일이라고 생각했던 사람</li>
            <li>내 전공·내 관심사에서만 보이는 불편함을 해결하고 싶은 사람</li>
            <li>개발은 잘 몰라도, 끝까지 만들어보고 싶은 사람</li>
          </ul>
          <p className="text-sm">
            전공도 실력도 안 봅니다. <strong>아이디어와 끈기</strong>를 봅니다.
            중간에 도망가지 않을 사람이면 충분합니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">무엇을 하나요</h2>
          <p className="text-sm text-muted-foreground">
            한 학기 동안 <strong>4인 1팀</strong>으로 실제 서비스 하나를
            기획부터 배포까지 완성합니다. 총괄 멘토가 GitHub · 개발환경 세팅 ·
            개발 기초 · 배포까지 처음부터 끝까지 함께합니다.
          </p>
          <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
            <li>비사업적 프로젝트 — 광고·수익화 없이, 순수하게 만들어보는 경험</li>
            <li>무료 스택으로 실배포 — 내 계정으로 배포, 나만의 포트폴리오 링크</li>
            <li>학기 말 데모데이 — 4팀이 각자 완성한 서비스를 발표</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">팀 구성 (4인 1조)</h2>
          <p className="text-sm text-muted-foreground">
            디자인 1명 · 기획 1명 · 개발 2명(소프트웨어
            계열 권장)으로 구성됩니다. 바이브코딩은 전원에게 가르치고, 경험이
            없어도 역할별 기초부터 배웁니다.
          </p>
        </section>

        <section id="지원" className="space-y-4">
          <h2 className="text-xl font-semibold">모집 개요</h2>
          <ul className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
            <li>모집 인원: 총 16명 (4팀 × 4인)</li>
            <li>지원 자격: 세종대학교 재학생 (학년·전공 무관)</li>
            <li>활동 기간: 한 학기 (약 15주), 주 1회 정기 모임</li>
            <li>참가비: 없음</li>
          </ul>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">지원 방법</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>마감일·문의 채널은 추후 공지됩니다.</p>
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

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        코딩을 몰라서 미뤄뒀던 아이디어, 이번 학기에 같이 배포까지 해봅시다.
      </footer>
    </div>
  );
}

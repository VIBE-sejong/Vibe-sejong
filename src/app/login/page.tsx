"use client";

import { useActionState } from "react";
import { Sparkles } from "lucide-react";
import { loginAction, type LoginState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const initialState: LoginState = {};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted/30 px-4">
      <div className="flex flex-col items-center gap-1 text-center">
        <div className="mb-2 flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Sparkles className="size-5" />
        </div>
        <h1 className="font-heading text-lg font-semibold">VISE</h1>
        <p className="text-sm text-muted-foreground">
          세종대 바이브코딩 동아리
        </p>
      </div>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>학번과 이름을 입력해주세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">학번</Label>
              <Input
                id="studentId"
                name="studentId"
                placeholder="20230000"
                required
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                name="name"
                placeholder="홍길동"
                required
                autoComplete="off"
              />
            </div>
            {state.error && (
              <p className="text-sm text-destructive">{state.error}</p>
            )}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "확인 중..." : "로그인"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

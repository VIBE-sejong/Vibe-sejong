"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

type ChatMessage = {
  role: "user" | "model";
  content: string;
};

const GREETING: ChatMessage = {
  role: "model",
  content:
    "안녕하세요! VISE 소모임 안내 챗봇이에요. 모집 대상, 활동 방식, 팀 구성 같은 게 궁금하면 물어보세요.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowHint(true), 1200);
    const hideTimer = setTimeout(() => setShowHint(false), 10000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  async function handleSend() {
    const content = input.trim();
    if (!content || loading) return;

    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-16) }),
      });
      const data = await res.json();
      setMessages([
        ...nextMessages,
        {
          role: "model",
          content: res.ok
            ? data.reply
            : (data.error ?? "답변을 가져오지 못했습니다."),
        },
      ]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "model",
          content: "네트워크 오류로 답변을 가져오지 못했습니다.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <div className="fixed right-5 bottom-5 z-20 flex flex-col items-end gap-2">
        {showHint && (
          <div className="relative max-w-56 rounded-2xl rounded-br-sm bg-card p-3 text-sm shadow-lg ring-1 ring-foreground/10 animate-in fade-in slide-in-from-bottom-2">
            <button
              onClick={() => setShowHint(false)}
              aria-label="안내 닫기"
              className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-muted text-muted-foreground shadow hover:bg-muted/80"
            >
              <X className="size-3" />
            </button>
            궁금한 점이 있으면 편하게 물어보세요!
          </div>
        )}
        <button
          onClick={() => {
            setOpen(true);
            setShowHint(false);
          }}
          aria-label="챗봇 열기"
          className="relative flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105"
        >
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/60" />
          <MessageCircle className="size-6" />
        </button>
      </div>
    );
  }

  return (
    <Card className="fixed right-5 bottom-5 z-20 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden py-0 shadow-xl">
      <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
        <p className="font-medium">VISE 안내 챗봇</p>
        <button
          onClick={() => setOpen(false)}
          aria-label="챗봇 닫기"
          className="rounded-md p-1 hover:bg-white/15"
        >
          <X className="size-4" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === "user"
                ? "ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground"
                : "mr-auto max-w-[85%] rounded-xl rounded-bl-sm bg-muted px-3 py-2 text-sm"
            }
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="mr-auto max-w-[85%] rounded-xl rounded-bl-sm bg-muted px-3 py-2 text-sm text-muted-foreground">
            답변 작성 중...
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 border-t p-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="궁금한 점을 물어보세요"
          disabled={loading}
        />
        <Button
          size="icon"
          onClick={handleSend}
          disabled={loading || !input.trim()}
          aria-label="전송"
        >
          <Send className="size-4" />
        </Button>
      </div>
    </Card>
  );
}

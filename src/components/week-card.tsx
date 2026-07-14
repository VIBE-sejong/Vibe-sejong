import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TEAM_NAMES } from "@/types/db";
import type { Week } from "@/types/db";

export function WeekCard({
  week,
  submittedTeamCount,
  isLast,
}: {
  week: Week;
  submittedTeamCount?: number;
  isLast?: boolean;
}) {
  const total = TEAM_NAMES.length;
  const isComplete = (submittedTeamCount ?? 0) >= total;
  const isStarted = (submittedTeamCount ?? 0) > 0;

  return (
    <li className={cn("relative ms-8 ps-1", isLast ? "pb-0" : "pb-6")}>
      <span
        className={cn(
          "absolute -start-[2.15rem] flex size-8 items-center justify-center rounded-full text-xs font-semibold ring-4 ring-background",
          isComplete
            ? "bg-primary text-primary-foreground"
            : isStarted
              ? "bg-accent text-accent-foreground"
              : "bg-muted text-muted-foreground"
        )}
      >
        {week.week_number}
      </span>
      <Link href={`/weeks/${week.id}`}>
        <Card className="gap-2 transition-colors hover:bg-muted/50">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle>{week.title}</CardTitle>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            </div>
            <CardDescription className="line-clamp-2">
              {week.description || "설명이 없습니다"}
            </CardDescription>
          </CardHeader>
          {submittedTeamCount !== undefined && (
            <div className="px-(--card-spacing)">
              <Badge variant={isComplete ? "default" : "secondary"}>
                {submittedTeamCount}/{total}팀 제출
              </Badge>
            </div>
          )}
        </Card>
      </Link>
    </li>
  );
}

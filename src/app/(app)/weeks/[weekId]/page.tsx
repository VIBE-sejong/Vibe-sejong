import { notFound } from "next/navigation";
import { getWeekById } from "@/lib/data/weeks";
import { listPostsForWeek } from "@/lib/data/activity-posts";
import { getSession } from "@/lib/auth/session.server";
import { ActivityFeed } from "./activity-feed";
import { ActivityUploadForm } from "./activity-upload-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamAvatar } from "@/components/team-avatar";

export default async function WeekDetailPage({
  params,
}: {
  params: Promise<{ weekId: string }>;
}) {
  const { weekId } = await params;
  const [week, posts, session] = await Promise.all([
    getWeekById(weekId),
    listPostsForWeek(weekId),
    getSession(),
  ]);

  if (!week || !session) notFound();

  const myPost = posts.find((p) => p.team === session.team);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-sm font-semibold text-accent-foreground">
              {week.week_number}
            </span>
            <CardTitle>{week.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="whitespace-pre-wrap text-sm text-muted-foreground">
          {week.description || "등록된 설명이 없습니다."}
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="flex items-center gap-2 text-lg font-medium">
          <TeamAvatar team={session.team} />
          우리 팀 활동 업로드
        </h2>
        <ActivityUploadForm
          weekId={week.id}
          existingContent={myPost?.content ?? ""}
        />
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-medium">팀별 활동 피드</h2>
        <ActivityFeed posts={posts} />
      </div>
    </div>
  );
}

import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session.server";
import { canEditTeam, canPostToTeamBoard } from "@/lib/auth/team-access";
import { getTeamForViewer } from "@/lib/data/teams";
import { listTeamPostsForViewer } from "@/lib/data/team-posts";
import { PageHeader } from "@/components/page-header";
import { TeamAvatar } from "@/components/team-avatar";
import { updateTeamAction, createTeamPostAction } from "./actions";
import { TeamEditForm } from "./team-edit-form";
import { TeamPostForm } from "./team-post-form";
import { TeamBoard } from "./team-board";
import { TEAM_NAMES, type TeamName } from "@/types/db";

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const { teamId: rawTeamId } = await params;
  if (!TEAM_NAMES.includes(rawTeamId as TeamName)) notFound();
  const teamId = rawTeamId as TeamName;

  const session = await getSession();
  if (!session) redirect("/login");

  const result = await getTeamForViewer(session, teamId);
  if (!result) notFound();
  const { team, isPrivate } = result;

  const canEdit = await canEditTeam(session, teamId);
  const canPost = canPostToTeamBoard(session, teamId);
  const posts = isPrivate
    ? await listTeamPostsForViewer(session, teamId)
    : [];

  const boundUpdateTeamAction = updateTeamAction.bind(null, teamId);
  const boundCreateTeamPostAction = createTeamPostAction.bind(null, teamId);

  return (
    <div className="space-y-8">
      <PageHeader title={team.name} />

      <div className="flex items-center gap-4">
        {team.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={team.photo_url}
            alt={team.name}
            className="size-16 shrink-0 rounded-full object-cover"
          />
        ) : (
          <TeamAvatar team={teamId} className="size-16 text-lg" />
        )}
        {isPrivate && "description" in team && team.description && (
          <p className="whitespace-pre-wrap text-sm text-muted-foreground">
            {team.description}
          </p>
        )}
      </div>

      {!isPrivate && (
        <p className="text-sm text-muted-foreground">
          다른 팀의 소개와 게시판은 비공개입니다.
        </p>
      )}

      {canEdit && "description" in team && (
        <div className="space-y-3">
          <h2 className="text-lg font-medium">팀 정보 수정</h2>
          <TeamEditForm
            action={boundUpdateTeamAction}
            name={team.name}
            description={team.description}
          />
        </div>
      )}

      {isPrivate && (
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-lg font-medium">팀 게시판</h2>
            <TeamBoard posts={posts} />
          </div>
          {canPost && (
            <div className="space-y-3">
              <h2 className="text-lg font-medium">새 글쓰기</h2>
              <TeamPostForm action={boundCreateTeamPostAction} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

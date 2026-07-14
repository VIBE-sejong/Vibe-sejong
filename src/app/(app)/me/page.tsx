import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session.server";
import { getMemberById } from "@/lib/data/members";
import { getSignedProfileImageUrl } from "@/lib/storage/profile-images";
import { PageHeader } from "@/components/page-header";
import { TeamAvatar } from "@/components/team-avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PART_LABELS, TEAM_LABELS } from "@/types/db";
import { ProfileForm } from "./profile-form";

export default async function MyPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const member = await getMemberById(session.sub);
  if (!member) redirect("/login");

  const avatarUrl = await getSignedProfileImageUrl(member.avatar_path);

  return (
    <div className="space-y-8">
      <PageHeader title="마이페이지" description="내 정보를 확인하고 관리하세요" />

      <Card>
        <CardContent className="flex items-center gap-4">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={member.name}
              className="size-12 shrink-0 rounded-full object-cover"
            />
          ) : (
            <TeamAvatar team={member.team} className="size-12 text-base" />
          )}
          <div>
            <p className="text-lg font-semibold">{member.name}</p>
            <p className="text-sm text-muted-foreground">
              {member.student_id} · {TEAM_LABELS[member.team]} ·{" "}
              {PART_LABELS[member.part]}
            </p>
          </div>
          {member.role === "admin" && (
            <Badge className="ml-auto">관리자</Badge>
          )}
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-medium">프로필 수정</h2>
        <div className="rounded-lg border p-4">
          <ProfileForm bio={member.bio} />
        </div>
      </div>
    </div>
  );
}

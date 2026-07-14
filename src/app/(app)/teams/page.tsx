import Link from "next/link";
import { listTeamsPublic } from "@/lib/data/teams";
import { PageHeader } from "@/components/page-header";
import { TeamAvatar } from "@/components/team-avatar";
import { Card, CardTitle } from "@/components/ui/card";

export default async function TeamsPage() {
  const teams = await listTeamsPublic();

  return (
    <div className="space-y-6">
      <PageHeader title="팀" description="동아리 팀 소개" />
      <div className="grid gap-4 sm:grid-cols-2">
        {teams.map((team) => (
          <Link key={team.team_name} href={`/teams/${team.team_name}`}>
            <Card className="h-full transition-colors hover:bg-muted/50">
              <div className="flex items-center gap-3 px-(--card-spacing)">
                {team.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={team.photo_url}
                    alt={team.name}
                    className="size-12 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <TeamAvatar team={team.team_name} className="size-12 text-base" />
                )}
                <CardTitle>{team.name}</CardTitle>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

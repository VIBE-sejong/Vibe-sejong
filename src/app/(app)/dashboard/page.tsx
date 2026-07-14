import { listWeeks } from "@/lib/data/weeks";
import { countSubmittedTeamsByWeek } from "@/lib/data/activity-posts";
import { WeekCard } from "@/components/week-card";
import { PageHeader } from "@/components/page-header";

export default async function DashboardPage() {
  const [weeks, submittedCounts] = await Promise.all([
    listWeeks(),
    countSubmittedTeamsByWeek(),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="주차별 커리큘럼"
        description="이번 학기 진행 상황을 확인하세요"
      />
      {weeks.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          아직 등록된 주차가 없습니다. 관리자가 커리큘럼을 등록하면 여기에
          표시됩니다.
        </div>
      ) : (
        <ol className="relative max-w-2xl border-s-2 border-border">
          {weeks.map((week, index) => (
            <WeekCard
              key={week.id}
              week={week}
              submittedTeamCount={submittedCounts[week.id] ?? 0}
              isLast={index === weeks.length - 1}
            />
          ))}
        </ol>
      )}
    </div>
  );
}

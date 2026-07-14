import { notFound } from "next/navigation";
import { getWeekById } from "@/lib/data/weeks";
import { WeekForm } from "../../week-form";
import { updateWeekAction } from "../../actions";

export default async function EditWeekPage({
  params,
}: {
  params: Promise<{ weekId: string }>;
}) {
  const { weekId } = await params;
  const week = await getWeekById(weekId);
  if (!week) notFound();

  const boundAction = updateWeekAction.bind(null, weekId);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{week.week_number}주차 수정</h1>
      <WeekForm action={boundAction} week={week} />
    </div>
  );
}

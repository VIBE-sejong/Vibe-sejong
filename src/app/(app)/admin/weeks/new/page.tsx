import { WeekForm } from "../week-form";
import { createWeekAction } from "../actions";

export default function NewWeekPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">주차 추가</h1>
      <WeekForm action={createWeekAction} />
    </div>
  );
}

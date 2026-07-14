import { MemberForm } from "../member-form";
import { createMemberAction } from "../actions";

export default function NewMemberPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">멤버 추가</h1>
      <MemberForm action={createMemberAction} />
    </div>
  );
}

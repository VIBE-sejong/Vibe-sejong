import { notFound } from "next/navigation";
import { getMemberById } from "@/lib/data/members";
import { MemberForm } from "../../member-form";
import { updateMemberAction } from "../../actions";

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ memberId: string }>;
}) {
  const { memberId } = await params;
  const member = await getMemberById(memberId);
  if (!member) notFound();

  const boundAction = updateMemberAction.bind(null, memberId);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{member.name} 수정</h1>
      <MemberForm action={boundAction} member={member} />
    </div>
  );
}

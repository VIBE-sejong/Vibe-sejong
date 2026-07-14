import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { listMembers } from "@/lib/data/members";
import { getSession } from "@/lib/auth/session.server";
import { PART_LABELS } from "@/types/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";
import { TeamAvatar } from "@/components/team-avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteMemberButton } from "./delete-member-button";
import { deleteMemberAction } from "./actions";

export default async function AdminMembersPage() {
  const [members, session] = await Promise.all([listMembers(), getSession()]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="멤버 관리"
        action={
          <Button
            nativeButton={false}
            render={
              <Link href="/admin/members/new">
                <Plus />
                멤버 추가
              </Link>
            }
          />
        }
      />
      {members.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          아직 등록된 멤버가 없습니다.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>학번</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>파트</TableHead>
              <TableHead>권한</TableHead>
              <TableHead className="text-right">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.student_id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <TeamAvatar team={member.team} />
                    {member.name}
                  </div>
                </TableCell>
                <TableCell>{PART_LABELS[member.part]}</TableCell>
                <TableCell>
                  {member.role === "admin" ? (
                    <Badge>관리자</Badge>
                  ) : (
                    <Badge variant="secondary">소모임원</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      nativeButton={false}
                      render={
                        <Link href={`/admin/members/${member.id}/edit`}>
                          <Pencil />
                          수정
                        </Link>
                      }
                      variant="outline"
                      size="sm"
                    />
                    <DeleteMemberButton
                      memberName={member.name}
                      disabled={member.id === session?.sub}
                      action={deleteMemberAction.bind(null, member.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

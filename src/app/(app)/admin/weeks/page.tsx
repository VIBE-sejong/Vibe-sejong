import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { listWeeks } from "@/lib/data/weeks";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminWeeksPage() {
  const weeks = await listWeeks();

  return (
    <div className="space-y-6">
      <PageHeader
        title="커리큘럼 관리"
        action={
          <Button
            nativeButton={false}
            render={
              <Link href="/admin/weeks/new">
                <Plus />
                주차 추가
              </Link>
            }
          />
        }
      />
      {weeks.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          아직 등록된 주차가 없습니다.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>주차</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="text-right">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {weeks.map((week) => (
              <TableRow key={week.id}>
                <TableCell>{week.week_number}주차</TableCell>
                <TableCell>{week.title}</TableCell>
                <TableCell className="text-right">
                  <Button
                    nativeButton={false}
                    render={
                      <Link href={`/admin/weeks/${week.id}/edit`}>
                        <Pencil />
                        수정
                      </Link>
                    }
                    variant="outline"
                    size="sm"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

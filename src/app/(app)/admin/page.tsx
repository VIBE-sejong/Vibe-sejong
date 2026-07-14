import Link from "next/link";
import { BookOpen, Users } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="관리자" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/admin/weeks">
          <Card className="h-full transition-colors hover:bg-muted/50">
            <CardHeader>
              <div className="mb-1 flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <BookOpen className="size-4" />
              </div>
              <CardTitle>커리큘럼 관리</CardTitle>
              <CardDescription>주차별 커리큘럼을 추가/수정합니다</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/admin/members">
          <Card className="h-full transition-colors hover:bg-muted/50">
            <CardHeader>
              <div className="mb-1 flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Users className="size-4" />
              </div>
              <CardTitle>멤버 관리</CardTitle>
              <CardDescription>동아리원 명단을 추가/수정합니다</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}

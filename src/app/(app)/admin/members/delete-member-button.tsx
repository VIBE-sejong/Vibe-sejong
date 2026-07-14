"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { DeleteMemberState } from "./actions";

export function DeleteMemberButton({
  memberName,
  disabled,
  action,
}: {
  memberName: string;
  disabled?: boolean;
  action: () => Promise<DeleteMemberState>;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  if (disabled) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled
        title="본인 계정은 삭제할 수 없습니다"
      >
        <Trash2 />
        삭제
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm">
            <Trash2 />
            삭제
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{memberName}님을 삭제할까요?</DialogTitle>
          <DialogDescription>
            삭제하면 이 계정으로 더 이상 로그인할 수 없습니다. 이 작업은 되돌릴
            수 없습니다.
          </DialogDescription>
        </DialogHeader>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <DialogFooter>
          <DialogClose render={<Button variant="outline">취소</Button>} />
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                const result = await action();
                if (result.error) {
                  setError(result.error);
                  return;
                }
                setOpen(false);
              });
            }}
          >
            {isPending ? "삭제 중..." : "삭제"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

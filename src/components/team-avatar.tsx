import { cn } from "@/lib/utils";
import {
  TEAM_AVATAR_CLASSES,
  TEAM_LABELS,
  TEAM_SHORT_LABELS,
  type TeamName,
} from "@/types/db";

export function TeamAvatar({
  team,
  className,
}: {
  team: TeamName;
  className?: string;
}) {
  return (
    <span
      title={TEAM_LABELS[team]}
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
        TEAM_AVATAR_CLASSES[team],
        className
      )}
    >
      {TEAM_SHORT_LABELS[team]}
    </span>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamAvatar } from "@/components/team-avatar";
import { formatRelativeTime } from "@/lib/format";
import { TEAM_LABELS } from "@/types/db";
import type { ActivityPostWithImages } from "@/types/db";

export function ActivityPostCard({ post }: { post: ActivityPostWithImages }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TeamAvatar team={post.team} />
            <CardTitle className="text-base">
              {TEAM_LABELS[post.team]}
            </CardTitle>
          </div>
          <span className="text-xs text-muted-foreground">
            {formatRelativeTime(post.updated_at)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {post.content ? (
          <p className="whitespace-pre-wrap text-sm">{post.content}</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            아직 작성된 내용이 없습니다.
          </p>
        )}
        {post.images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {post.images.map(
              (img) =>
                img.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={img.id}
                    src={img.url}
                    alt={img.file_name}
                    className="aspect-square w-full rounded-md object-cover"
                  />
                )
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

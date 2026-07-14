import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRelativeTime } from "@/lib/format";
import type { TeamPost } from "@/types/db";

export function TeamBoard({ posts }: { posts: TeamPost[] }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        아직 게시글이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-base">{post.title}</CardTitle>
              <span className="shrink-0 text-xs text-muted-foreground">
                {formatRelativeTime(post.created_at)}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            {post.content && (
              <p className="whitespace-pre-wrap text-sm">{post.content}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {post.author?.name ?? "알 수 없음"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

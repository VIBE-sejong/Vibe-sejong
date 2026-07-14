import { ActivityPostCard } from "@/components/activity-post-card";
import type { ActivityPostWithImages } from "@/types/db";

export function ActivityFeed({ posts }: { posts: ActivityPostWithImages[] }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        아직 업로드된 활동이 없습니다.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <ActivityPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

import PostEditor from "@/components/admin/PostEditor";
import { getPost } from "@/lib/content";
import type { PostType } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = { title: "Edit Post" };

export default async function AdminEditPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; slug?: string }>;
}) {
  const { type, slug } = await searchParams;
  const postType: PostType = type === "guides" ? "guides" : "journal";
  const existing = slug ? getPost(postType, slug) : null;

  const initial = existing
    ? {
        type: postType,
        isNew: false,
        meta: {
          title: existing.title,
          slug: existing.slug,
          excerpt: existing.excerpt,
          date: existing.date,
          tags: existing.tags,
          draft: existing.draft,
          pinned: existing.pinned,
          category: existing.category,
          badge: existing.badge,
        },
        body: existing.body,
      }
    : {
        type: postType,
        isNew: true,
        meta: {
          title: "",
          slug: "",
          excerpt: "",
          date: new Date().toISOString().slice(0, 10),
          tags: [],
          draft: false,
          pinned: false,
          category: postType === "guides" ? "Development" : undefined,
          badge: postType === "guides" ? "seedling" : undefined,
        },
        body: "",
      };

  return <PostEditor initial={initial} />;
}

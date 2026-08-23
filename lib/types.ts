export type PostType = "guides" | "journal";

export interface PostMeta {
  title: string;
  slug: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  updated?: string; // YYYY-MM-DD
  tags: string[];
  draft?: boolean;
  pinned?: boolean;
  category?: string; // guides only: Infrastructure | Security | Development
  badge?: string; // guides only: growing | seedling | evergreen
}

export interface Post extends PostMeta {
  body: string;
  readTime: number; // minutes
}

export type ProjectStatus = "active" | "completed" | "on-hold";

export interface Project {
  title: string;
  slug: string;
  status: ProjectStatus;
  description: string;
  tech: string[];
  repo?: string;
  demo?: string;
}

export interface SearchResults {
  guides: SearchHit[];
  journal: SearchHit[];
  projects: SearchHit[];
}

export interface SearchHit {
  title: string;
  excerpt: string;
  href: string;
}

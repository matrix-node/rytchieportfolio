export interface Project {
  id: string;
  title: string;
  description: string;
  extendedDescription?: string;
  tech: string[];
  status: 'Live' | 'In Progress' | 'Concept' | 'Case Study' | 'Archived';
  category: string;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  architectureNotes?: string;
  challenges?: string;
  lessons?: string;
  codeSnippet?: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Linux & SysAdmin' | 'Cybersecurity' | 'Teaching & Tools' | 'Creative';
  comfortLevel: 'Teaching-ready' | 'Building with it' | 'Comfortable' | 'Learning actively' | 'Debugging relationship: complicated';
  description: string;
  iconName: string; // lucide icon identifier
}

export interface TimelineItem {
  id: string;
  type: 'Education' | 'Experience';
  title: string;
  organization: string;
  period: string;
  description: string;
  skillsGained: string[];
  iconName: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  deliverables: string[];
  ctaText: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Web Development' | 'Linux' | 'Cybersecurity' | 'Teaching' | 'Networking' | 'Tech Life';
  readTime: string;
  excerpt: string;
  content?: string;
  date: string;
  status: 'Published' | 'Draft' | 'Coming Soon';
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  category: 'development' | 'workspace' | 'community' | 'tech-events' | 'creative-moments' | 'human-side';
  caption: string;
  metadata?: string;
}

export type NavigationItem = {
  label: string;
  href: string;
  sectionId: string;
};

export type SocialLink = {
  label: string;
  href: string;
  iconClass: string;
};

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
};

export type SkillEntry = {
  name: string;
  percentage: number;
};
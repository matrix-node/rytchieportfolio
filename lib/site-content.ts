import type { NavigationItem, SkillEntry, SocialLink, TimelineEntry } from "@/types/site";

export const siteConfig = {
  name: "Rytchie Macharia",
  title: "Rytchie Macharia | Full Stack Developer & Cybersecurity Enthusiast",
  description:
    "Portfolio website of Rytchie Macharia showcasing web development, cybersecurity, Linux and programming projects.",
  keywords: [
    "Rytchie Macharia",
    "Full Stack Developer",
    "Cybersecurity",
    "Arch Linux",
    "Web Developer",
    "Kenya",
  ],
  url: "https://richardmacharia.tech",
  ogImage: "/images/home.jpg",
  formAction: "https://formspree.io/f/mvgplpqd",
} as const;

export const navigation: NavigationItem[] = [
  { label: "Home", href: "#home", sectionId: "home" },
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Education", href: "#education", sectionId: "education" },
  { label: "Skills", href: "#skills", sectionId: "skills" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

export const socialLinks: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/Rytchie254/",
    iconClass: "bx bxl-facebook",
  },
  {
    label: "X",
    href: "https://x.com/Rytchie101",
    iconClass: "bx bxl-twitter",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rytchie-macharia-042184325/",
    iconClass: "bx bxl-linkedin",
  },
];

export const educationEntries: TimelineEntry[] = [
  {
    year: "2011 - 2018",
    title: "Senior Academy - JM KARIUKI SEC SCH",
    description:
      "I attended Senior Academy at JM KARIUKI Secondary School from 2011 to 2018. This period laid a strong foundation for my future studies and career.",
  },
  {
    year: "2011 - 2020",
    title: "Computer Application - Edkam Computer College",
    description:
      "I completed a Computer Application course at Edkam Computer College from 2011 to 2020. This course equipped me with practical skills for various computer applications.",
  },
  {
    year: "201 - 2020",
    title: "Diploma in ICT - Cambridge College",
    description:
      "I am currently pursuing a Diploma in ICT, which I expect to complete in 2024. This program is enhancing my knowledge and skills in information and communication technology, with a focus on advanced programming and system management. My studies are equipping me with the latest tools and techniques to excel in the tech industry.",
  },
];

export const experienceEntries: TimelineEntry[] = [
  {
    year: "2017 - 2018",
    title: "Web Developer - Rytchie Tech Solutions",
    description:
      "I worked as a Web Developer at Rytchie Tech Solutions from 2017 to 2018. I was responsible for building and maintaining websites, focusing on user experience and functionality.",
  },
  {
    year: "2019 - 2020",
    title: "Computer Programming Tutor- KNLS",
    description:
      "From 2019 to 2020, I served as a Computer Programming Tutor at KNLS. I taught programming skills and helped students understand various coding concepts.",
  },
  {
    year: "2019 - 2020",
    title: "Computer Applications Tutor - Edkam Computer College",
    description:
      "Since 2020, I have been a Computer Applications Tutor at Edkam Computer College. I teach students how to effectively use computer applications and provide practical skills for their careers.",
  },
];

export const codingSkills: SkillEntry[] = [
  { name: "HTML", percentage: 90 },
  { name: "CSS", percentage: 80 },
  { name: "JAVASCRIPT", percentage: 65 },
  { name: "PYTHON", percentage: 75 },
];

export const professionalSkills: SkillEntry[] = [
  { name: "Web Design", percentage: 95 },
  { name: "Web Development", percentage: 67 },
  { name: "Graphics Design", percentage: 73 },
  { name: "Computer Aplications", percentage: 97 },
];
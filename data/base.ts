import { Project, Skill, TimelineItem, Service, BlogPost, GalleryItem } from '@/types';

export const USER_PROFILE = {
  name: "Rytchie Macharia",
  title: "Front-End Developer & CyberSecurity Enthusiast",
  vibe: "Professional enough to get hired. Cool enough to be remembered. Fast enough to make Vercel smile.",
  tagline: "Building clean interfaces, debugging chaos, and shipping digital experiences.",
  subHeadline: "I’m Rytchie Macharia — a frontend-focused developer, full-stack learner, cybersecurity enthusiast, Linux user, and IT instructor building fast, polished, human-friendly web experiences.",
  location: "Nakuru, Kenya",
  timezone: "UTC+3",
  email: "hello@rytchiamacharia.dev",
  github: "https://github.com/rytchiamacharia",
  linkedin: "https://linkedin.com/in/rytchiamacharia",
  twitter: "https://twitter.com/rytchiamacharia",
  cvLink: "#",
  avatarUrl: "/images/rytchie.jpg"
};

export const PROJECTS: Project[] = [
  {
    id: "inclusive-hands",
    title: "Inclusive Hands Access",
    description: "Revolutionizing digital navigation for motor-impaired users via predictive gesture tracking and zero-latency UI interaction.",
    extendedDescription: "Inclusive Hands Access is an accessibility powerhouse. It integrates custom models for real-time video stream tracking from lightweight webcams to interpret micro-gestures. It provides smooth, low-fatigue cursor manipulation and action mapping for individuals who cannot operate a standard keyboard/mouse setup.",
    tech: ["React", "TypeScript", "TensorFlow.js", "WebSockets", "Vite", "Tailwind CSS"],
    status: "In Progress",
    category: "Accessibility Tech",
    imageUrl: "/images/rytchie2.jpeg",
    githubUrl: "https://github.com/rytchiamacharia/inclusive-hands",
    liveUrl: "#",
    architectureNotes: "Client-side pipeline optimizing request frames via raw RAF (requestAnimationFrame) hooks to prevent UI stuttering. Video analysis is handled in worker threads to spare the render block.",
    challenges: "Interpreting unstable movements from users with high physical tremor amplitudes without causing severe web-assembly lag.",
    lessons: "Pushed math-based debounce smoothing functions. Calibrating filtering models on a personal level delivers a 400% improvement in tracking accuracy over absolute coordinate mapping.",
    codeSnippet: `// Gesture smoothing engine using dynamic threshold estimation
export function smoothCoordinates(current: Point, last: Point, factor: number = 0.65): Point {
  const dx = current.x - last.x;
  const dy = current.y - last.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // High Tremor Suppressor
  if (distance < 3.2) return last; 
  
  return {
    x: last.x + dx * factor,
    y: last.y + dy * factor
  };
}`
  },
  {
    id: "linux-showcase",
    title: "Linux Setup Showcase",
    description: "A repository of production-ready configuration files for Arch Linux, emphasizing extreme productivity and terminal aesthetics.",
    extendedDescription: "A complete 'rice' of Arch Linux utilising window managers (Hyprland / i3), customized polybars, rofi execution sheets, streamlined fastfetch setups, and efficient scripting for automated hardware profiling.",
    tech: ["Arch Linux", "Bash", "Lua", "Hyprland", "i3-wm", "Rofi", "Waybar"],
    status: "Live",
    category: "System Administration",
    imageUrl: "/images/rytchie3.jpeg",
    githubUrl: "https://github.com/rytchiamacharia/arch-dotfiles",
    liveUrl: "#",
    architectureNotes: "Modularized styling patterns leveraging symbolic system configurations linked securely via GNU Stow namespaces.",
    challenges: "Configuring flawless multi-monitor scaling on wayland protocols with hybrid NVIDIA and Intel GPUs.",
    lessons: "X11 holds historical value, but Wayland is the undisputed state-of-the-art for modern displays. Mastering xset and layout configurations saves cognitive fatigue.",
    codeSnippet: `#!/usr/bin/env bash
# Automated Stow Linker & Monitor Hotplug Trigger
DOTFILES="$HOME/.dotfiles"
cd "$DOTFILES" || exit 1

stow_packages=( "hypr" "kitty" "waybar" "zsh" "nvim" )
for pkg in "\${stow_packages[@]}"; do
    echo "[!] stow link -> $pkg"
    stow -R "$pkg"
done`
  },
  {
    id: "edutrack-lms",
    title: "EduTrack LMS",
    description: "Lightweight dashboard for tracking academic progress in real-time, designed for high-density information display.",
    extendedDescription: "EduTrack solves administrative bloating for training centers. It replaces heavy, bloated student information trackers with a clean, low-latency React scoreboard detailing course progression, attendance matrices, and practical assignment marks.",
    tech: ["Next.js", "React", "Supabase", "Tailwind CSS", "Recharts", "TypeScript"],
    status: "Live",
    category: "Education Platform",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=700&auto=format&fit=crop",
    githubUrl: "https://github.com/rytchiamacharia/edutrack",
    liveUrl: "#",
    architectureNotes: "Optimized row structures using localized state caching, achieving instant queries across large student sets with unified SQL indexing on Supabase store.",
    challenges: "Synchronizing rapid-fire class attendance entries without triggering database lockouts on busy networks.",
    lessons: "Client-side pessimistic queues with visual updates are vastly superior to showing loading indicators on every click.",
    codeSnippet: `// Supabase direct sync hook with queue-manager
export async function syncAttendanceWithDB(attendanceLog: Attendance[]) {
  const { data, error } = await supabase
    .from('attendance')
    .upsert(attendanceLog, { onConflict: 'student_id,class_date' });
  
  if (error) throw new Error(\`Database locked: \${error.message}\`);
  return data;
}`
  },
  {
    id: "devops-starter",
    title: "DevOps Starter Kit",
    description: "Automated provisioning environments combining Docker containers, Arch templates, CI validation, and pipeline scripts.",
    extendedDescription: "A technical toolbox featuring multi-container configurations for automated tests, container monitoring, and secure system orchestration. Designed to run as local clusters for web applications.",
    tech: ["Docker", "Docker Compose", "Bash", "Nginx", "Linux", "GitHub Actions"],
    status: "Concept",
    category: "System Engineering",
    imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=700&auto=format&fit=crop",
    githubUrl: "https://github.com/rytchiamacharia/devops-kit",
    architectureNotes: "Multi-tier Docker setups incorporating reverse proxies, internal health-checks, volume replication, and secure private networking.",
    challenges: "Tuning Nginx proxies in sandbox situations to routing port requirements flawlessly.",
    lessons: "Container orchestration is not about complex cloud tooling; simple shell pipelines and atomic configs are often standard and reliable.",
    codeSnippet: `version: '3.8'
services:
  gateway:
    image: nginx:alpine
    ports: [ "3000:80" ]
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - server
  server:
    build: .
    environment:
      - NODE_ENV=production`
  },
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    description: "The 'Obsidian Protocol' cyberpunk theme designed to communicate skills, gallery files, and experiences cleanly and uniquely.",
    extendedDescription: "This current application operates on static assets with absolute visual control. It employs interactive canvas animation, bento containers, reactive spotlight highlights, and fully responsive layouts.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "Motion"],
    status: "Live",
    category: "Creative Development",
    imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=700&auto=format&fit=crop",
    githubUrl: "https://github.com/rytchiamacharia/portfolio-v4",
    liveUrl: "#",
    architectureNotes: "Obsidian visual grids, dark-ambient palettes, performance-safe rendering loops.",
    challenges: "Building highly-performant spotlight listeners that scale correctly on dynamic dimensions.",
    lessons: "True visual quality comes from pixel alignment, spacing, and typographic paired choices—not bloated code.",
    codeSnippet: `// Dynamic mouse tracking CSS hook
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  card.style.setProperty('--mouse-x', \`\${x}px\`);
  card.style.setProperty('--mouse-y', \`\${y}px\`);
});`
  },
  {
    id: "cyber-labs",
    title: "Cybersecurity Lab Notes",
    description: "Structured guides on local lab configurations, detailing vulnerability scans, network analysis, and basic security metrics.",
    extendedDescription: "A modular, easy-to-read compilation of cybersecurity audits, network traffic monitors using WireShark, local vulnerability exploits running in isolated virtual machines, and defensive firewall patterns.",
    tech: ["Wireshark", "Nmap", "Linux", "Kali Linux", "Firewalls", "Network Auditing"],
    status: "In Progress",
    category: "Cybersecurity",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=700&auto=format&fit=crop",
    githubUrl: "https://github.com/rytchiamacharia/cyber-lab",
    architectureNotes: "Internal private subnet designs, sandboxed malware scanning scripts, logging dashboards.",
    challenges: "Designing reliable defensive structures for local computers that do not choke background throughput.",
    lessons: "Sanitization of data input rules are the absolute cornerstone of web security. Never trust user requests. Ever.",
    codeSnippet: `# Secure Nmap Scan Script for Diagnostic Profiling
nmap -sS -sV -O -p 22,80,443,3000 \\
  --script=vuln \\
  --exclude-ports 1-21 \\
  -oA "$HOME/scan-reports/port-profile"`
  },
  {
    id: "teaching-resources",
    title: "Teaching Resource System",
    description: "Structured templates and resources providing high-density materials for computer applications students in Kenya.",
    extendedDescription: "Developed to supply students at Edkam College and Cambridge College with interactive notes, structured templates, Excel templates, and database testing material designed to pass external licensing certifications.",
    tech: ["Microsoft Office", "Excel Formulas", "MS Access DBMS", "PDF Compilations"],
    status: "Live",
    category: "Teaching Tools",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=700&auto=format&fit=crop",
    githubUrl: "#",
    liveUrl: "#",
    architectureNotes: "Interactive Excel validation frameworks and lightweight markdown guides organized hierarchically.",
    challenges: "Porting complex networking concepts to students who have never operated Linux command lines before.",
    lessons: "Using concrete analogies (like shipping physical packages to describe IP packets) yields much faster retention than dry whitepapers.",
    codeSnippet: `=IF(COUNTIF(A2:A20, ">80")>=10, "Certification Ready", "Review Core Stacks")`
  },
  {
    id: "python-music-app",
    title: "Python Music App",
    description: "Minimalist desktop audio player running playback modules on Linux, exploring multi-thread handling in Python.",
    extendedDescription: "PyPlayer isolates audio threads dynamically to handle playback queues while rendering a custom PySide visual deck, complete with dot-matrix visualization bars.",
    tech: ["Python", "Pygame mixer", "Tkinter", "OS Auditing", "FFmpeg"],
    status: "Case Study",
    category: "Creative Development",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=700&auto=format&fit=crop",
    githubUrl: "https://github.com/rytchiamacharia/py-musicplayer",
    architectureNotes: "Thread-isolated audio deck operating through subprocess signals to guarantee responsive window interactions.",
    challenges: "Buffering large compression-heavy WAV files without lockups on low-resource machines.",
    lessons: "Multithreading requires deep consideration of GIL characteristics in standard Python runtimes.",
    codeSnippet: `import threading
from pygame import mixer

class Player:
    def __init__(self):
        mixer.init()
        self._playback_thread = None

    def play_async(self, file_path):
        self._playback_thread = threading.Thread(
            target=lambda: mixer.music.load(file_path) or mixer.music.play(),
            daemon=True
        )
        self._playback_thread.start()`
  }
];

export const SKILLS: Skill[] = [
  // Frontend
  {
    name: "HTML5",
    category: "Frontend",
    comfortLevel: "Teaching-ready",
    description: "Semantic structures, SEO architecture, accessibility labels, and canvas contexts.",
    iconName: "FileCode"
  },
  {
    name: "CSS3 & Tailwind",
    category: "Frontend",
    comfortLevel: "Teaching-ready",
    description: "Utility frameworks, custom flexboxes, animated grids, and CSS neon-spotlights.",
    iconName: "Palette"
  },
  {
    name: "JavaScript",
    category: "Frontend",
    comfortLevel: "Teaching-ready",
    description: "Core DOM manipulation, ES6 syntax rules, closure functions, and async requests.",
    iconName: "Play"
  },
  {
    name: "TypeScript",
    category: "Frontend",
    comfortLevel: "Building with it",
    description: "Strict generic interfaces, explicit return mappings, and custom execution models.",
    iconName: "ShieldAlert"
  },
  {
    name: "React",
    category: "Frontend",
    comfortLevel: "Building with it",
    description: "Functional React hooks, custom render handlers, structural context, and memoization.",
    iconName: "ReactIcon" // Handled as custom vector or react icon
  },
  {
    name: "Next.js",
    category: "Frontend",
    comfortLevel: "Comfortable",
    description: "Static rendering optimizations, routing maps, API endpoint proxy routes.",
    iconName: "Globe"
  },
  // Backend
  {
    name: "Python",
    category: "Backend",
    comfortLevel: "Comfortable",
    description: "Command scripts, local processing modules, file structure crawlers, data checks.",
    iconName: "Code"
  },
  {
    name: "Git & GitHub",
    category: "Backend",
    comfortLevel: "Teaching-ready",
    description: "Conflict resolution, stash strategies, semantic commits, action validation pipelines.",
    iconName: "GitBranch"
  },
  // Linux & System
  {
    name: "Linux Admin",
    category: "Linux & SysAdmin",
    comfortLevel: "Teaching-ready",
    description: "Permissions audit, process tracking, bash automation, modular network routing.",
    iconName: "Terminal"
  },
  {
    name: "Arch Linux",
    category: "Linux & SysAdmin",
    comfortLevel: "Building with it",
    description: "System ricing (Hyprland, Wayland, Polybar), manual kernel parameters, Stow configs.",
    iconName: "Cpu"
  },
  {
    name: "Bash Scripting",
    category: "Linux & SysAdmin",
    comfortLevel: "Teaching-ready",
    description: "Automatic backup queues, stow linkages, hardware scanner integrations, log parsing.",
    iconName: "Activity"
  },
  // Cybersecurity
  {
    name: "Networking (CCNA)",
    category: "Cybersecurity",
    comfortLevel: "Comfortable",
    description: "Subnet designs, routing mapping protocols (OSPF, RIP), security rule configurations.",
    iconName: "Network"
  },
  {
    name: "Cybersecurity Basics",
    category: "Cybersecurity",
    comfortLevel: "Learning actively",
    description: "Port scans, isolated environment setups, Wireshark sniffing, defensive policy design.",
    iconName: "Lock"
  },
  // Teaching
  {
    name: "Microsoft Office",
    category: "Teaching & Tools",
    comfortLevel: "Teaching-ready",
    description: "High-level Excel formulation dashboards, complex Access relational structures.",
    iconName: "FileSpreadsheet"
  },
  {
    name: "Computer Applications",
    category: "Teaching & Tools",
    comfortLevel: "Teaching-ready",
    description: "Structured syllabus training on general digital literacy, computer repair, tech basics.",
    iconName: "AppWindow"
  },
  // Creative
  {
    name: "UI Design",
    category: "Creative",
    comfortLevel: "Comfortable",
    description: "Prototyping bento setups, Obsidian cyberpunk theme maps, color contrast balance.",
    iconName: "Layout"
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    id: "knls",
    type: "Experience",
    title: "Computer Programming Tutor",
    organization: "Kenya National Library Services (KNLS)",
    period: "May 2024 - Present",
    description: "Empowering children and young adults with programming foundations. Teaching Scratch, basic html, and Python, helping introduce digital literacy and critical thinking skills in Nakuru.",
    skillsGained: ["Educational Delivery", "Python Training", "Scratch Visual Engine", "Curriculum Mentorship"],
    iconName: "School"
  },
  {
    id: "edkam-tutor",
    type: "Experience",
    title: "Computer Applications Tutor",
    organization: "Edkam Computer College",
    period: "Feb 2023 - Present",
    description: "Conducting full syllabus training on Microsoft Office Suite, Access DBMS, programming, visual basics, layout structure, and operating systems.",
    skillsGained: ["Classroom Administration", "Database Instruction", "Structured Grading", "Hardware Profiling"],
    iconName: "BookOpen"
  },
  {
    id: "web-dev",
    type: "Experience",
    title: "Web Developer",
    organization: "Rytchie Tech Solutions",
    period: "Jan 2021 - Present",
    description: "Freelance architecture delivering highly polished landing platforms, portfolio designs, local administrative dashboards, computer maintenance, and system configurations.",
    skillsGained: ["Frontend Architecture", "Client Auditing", "React Lifecycle Design", "Performance Audits"],
    iconName: "Laptop"
  },
  {
    id: "edu-cambridge",
    type: "Education",
    title: "Diploma in Information Communication Technology (ICT)",
    organization: "Cambridge College",
    period: "Graduated 2023",
    description: "Comprehensive coursework in hardware repair, network routing protocols, system administration, structural coding guidelines, and database modeling.",
    skillsGained: ["Advanced Networking", "Relational Databases", "Systems Maintenance", "IT Security Rules"],
    iconName: "Award"
  },
  {
    id: "edu-edkam",
    type: "Education",
    title: "Computer Applications - Certificate",
    organization: "Edkam Computer College",
    period: "Completed 2020",
    description: "Specialized training on office automation, Excel formulas, document design patterns, and basic computer infrastructure.",
    skillsGained: ["Advanced Excel", "Access Relational Models", "Publishing Layouts", "Keyboard Literacy"],
    iconName: "CheckSquare"
  },
  {
    id: "edu-secondary",
    type: "Education",
    title: "Kenya Certificate of Secondary Education (KCSE)",
    organization: "JM Kariuki Secondary School",
    period: "Completed 2019",
    description: "Formative high-school education, focusing on mathematics, sciences, and engineering logic.",
    skillsGained: ["Mathematical Analysis", "Logical Deductions", "Technical Writing"],
    iconName: "GraduationCap"
  }
];

export const SERVICES: Service[] = [
  {
    id: "web-design",
    title: "Website Design & Development",
    description: "Engineering tailored, lightning-fast React websites that stand out and index perfectly.",
    deliverables: ["Modular codebase on React / Next.js", "100/100 Lighthouse Speed scores", "Highly customized design layouts", "Responsive screen adapters"],
    iconName: "Globe",
    ctaText: "Let's build something clean."
  },
  {
    id: "ui-impl",
    title: "Frontend UI Implementation",
    description: "Refining designs from Figma into pixel-perfect code with robust Framer Motion micro-interactions.",
    deliverables: ["Fluid layout animations", "Strict TypeScript component types", "Adaptive mobile first layouts", "Interactive HUD element layers"],
    iconName: "Palette",
    ctaText: "Let's align those layouts."
  },
  {
    id: "personal-branding",
    title: "Portfolio & Brand Platforms",
    description: "Forging specialized technical identity sites that scream competence and highlight your exact developer spirit.",
    deliverables: ["Visual bento custom grids", "Staggered terminal animations", "Spotlight mouse tracking elements", "Optimal accessibility indexing"],
    iconName: "Cpu",
    ctaText: "Unlock identity."
  },
  {
    id: "sys-trouble",
    title: "Linux Setup & Troubleshooting",
    description: "Configuring process pipelines, custom desktop rices, bash automation scripts, and general system optimizations.",
    deliverables: ["Modular Stow custom dotfiles", "Subsecond system start tuning", "Shell helper automation scripts", "Wayland monitor alignment fixes"],
    iconName: "Terminal",
    ctaText: "Configure system."
  },
  {
    id: "office-train",
    title: "Digital Applications Training",
    description: "Custom targeted tutoring and syllabus delivery for Microsoft Applications, Excel, and structured IT curriculums.",
    deliverables: ["Excel advanced analysis setups", "Database modeling frameworks", "Structured assessment sheets", "Human-friendly explanations"],
    iconName: "School",
    ctaText: "Empower team."
  },
  {
    id: "networks-basics",
    title: "CyberSecurity & Network Advisory",
    description: "Auditing local and web architectures to restrict threats and establish solid network layouts.",
    deliverables: ["Port exposure inspections", "Wireshark packet logging", "Defensive firewall parameters", "Secure local web proxies"],
    iconName: "ShieldAlert",
    ctaText: "Secure parameters."
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "why-arch-teaches-patience",
    title: "Why Arch Linux teaches patience",
    category: "Linux",
    readTime: "4 min read",
    excerpt: "The story of how manual dependency configuration and Wayland monitor scale fights transformed me into a bulletproof debugger.",
    content: "Installing Arch Linux is widely regarded as a developer's rite of passage, but its true magic is not in the street-cred fastfetch screen in terminal logs. It is the lessons learned when systemctl fails at 11 PM before a deadline.\n\nFaced with pure text screens, you learn to discard assumptions. You navigate logs. You learn how systemd partitions service tasks, how Stow coordinates symlinks cleanly, and why a single missing character in a configuration halts an environment.\n\nLinux didn't break me. It trained me.",
    date: "May 2026",
    status: "Published"
  },
  {
    id: "frontend-polish",
    title: "Frontend polish recruiters actually notice",
    category: "Web Development",
    readTime: "5 min read",
    excerpt: "Forget generic templates. Let's talk about the exact detail micro-interactions, layout constraints, and contrast metrics that make people stay.",
    content: "Most portfolio reviews last less than fifteen seconds. To get remembered, you need a high-end interaction footprint. Here is what stands out immediately:\n\n1. Active spotlight tracking on containers using mouse vectors.\n2. Staggered, mathematically spaced content entrance cards.\n3. Custom terminal feedback on forms, treating interactions like command processes rather than default popups.\n\nMake your code fast. Vercel smiles back when build packages bundle under strict limits.",
    date: "Apr 2026",
    status: "Published"
  },
  {
    id: "dns-damage",
    title: "DNS propagation: the emotional damage edition",
    category: "Networking",
    readTime: "3 min read",
    excerpt: "Spamming F5, waiting for nameservers to line up, and discussing why routing states test our absolute spiritual health.",
    content: "We've all been there: you configure an A record, update nameservers, push to production, and... nothing changes. You check global tool records, query local root servers, and clear browser caches aggressively.\n\nThis article breaks down DNS propagation queues to understand the root authority, caching limits, and why a short TTL is your best friend when shipping fresh configurations.",
    date: "Mar 2026",
    status: "Published"
  },
  {
    id: "computers-for-beginners",
    title: "How I explain computers to beginners",
    category: "Teaching",
    readTime: "4 min read",
    excerpt: "As an IT instructor, I ditched the standard complex textbook schemas for physical, real-world analogies. Here is why it works perfectly.",
    content: "When explaining RAM vs SSDs to students new to digital screens, do not discuss blocks or byte structures first. Talk about workspaces:\n\n- RAM is the active desk space where you lay your active tools. Large desks allow you to handle more papers simultaneously.\n- SSD is the physical metal storage cabinet down the hall. Safe, holds gigabytes, but requires a stroll to fetch files.\n\nAn analog approach accelerates comprehension, creating a much stronger baseline for theoretical computer structures.",
    date: "Jan 2026",
    status: "Published"
  },
  {
    id: "ccna-notes",
    title: "My CCNA learning notes",
    category: "Networking",
    readTime: "6 min read",
    excerpt: "A deep summary of Cisco IP routing, VLAN trunk allocations, security control lists, and how packets cross routers.",
    content: "These CCNA documentation files compile my notes on routing operations, IP configurations, subnet masks, and access control patterns, ready for quick technical verification.",
    date: "Dec 2025",
    status: "Coming Soon"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "ritchie-work",
    imageUrl: "/images/rytchie_work.jpg",
    category: "development",
    caption: "Building mode: activated.",
    metadata: "Vim + Arch Linux // Nakuru"
  },
  {
    id: "friends-team",
    imageUrl: "/images/friends.jpeg",
    category: "tech-events",
    caption: "Tech culture, stickers, and community energy.",
    metadata: "Docker / React / Python discussions"
  },
  {
    id: "friends-art",
    imageUrl: "/images/friends2.jpeg",
    category: "tech-events",
    caption: "Creative moments outside the terminal.",
    metadata: "American Spaces Kenya event"
  },
  {
    id: "friend-collaboration",
    imageUrl: "/images/friend.jpeg",
    category: "community",
    caption: "Collaboration makes the code less lonely.",
    metadata: "Connect, Create, Collaborate // US Embassy"
  },
  {
    id: "rytchie-laughing",
    imageUrl: "/images/rytchie.jpg",
    category: "human-side",
    caption: "Offline mode: still processing.",
    metadata: "Aesthetic Recharge Protocols"
  }
];

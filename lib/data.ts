// =========================================================
// lib/data.ts — All static content for Intellects Club
// SRM Institute of Science and Technology, Ramapuram
// =========================================================

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#domains", label: "Domains" },
  { href: "#activities", label: "Activities" },
  { href: "#leadership", label: "Leadership" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export const STATS = [
  { value: 50, suffix: "+", label: "Active Members" },
  { value: 30, suffix: "+", label: "Events Conducted" },
  { value: 15, suffix: "+", label: "Projects Built" },
  { value: 3, suffix: "", label: "Years of Excellence" },
];

export const ABOUT_CARDS = [
  {
    icon: "Target",
    title: "Our Mission",
    description:
      "To cultivate a culture of innovation and technical excellence among students, empowering them to solve real-world problems through technology, collaboration, and creative thinking.",
    color: "purple",
  },
  {
    icon: "Eye",
    title: "Our Vision",
    description:
      "To become the leading technical community in SRM Ramapuram — a launchpad for the next generation of engineers, entrepreneurs, and digital innovators who shape the future.",
    color: "blue",
  },
  {
    icon: "Star",
    title: "Core Values",
    description:
      "Innovation. Collaboration. Integrity. Leadership. We believe that great things happen when curious minds come together, share knowledge freely, and build with purpose.",
    color: "cyan",
  },
];

export const DOMAINS = [
  {
    title: "Technical & Innovation",
    description: "Build projects, websites, AI applications, coding challenges and open-source contributions.",
    icon: "Code2",
    color: "purple"
  },
  {
    title: "Event Management",
    description: "Plan workshops, competitions, hackathons and club events.",
    icon: "Calendar",
    color: "blue"
  },
  {
    title: "Marketing",
    description: "Manage outreach, branding, and promotional activities.",
    icon: "Megaphone",
    color: "cyan"
  },
  {
    title: "Creative & Content",
    description: "Design posters, videos, and craft engaging content for all club platforms.",
    icon: "Palette",
    color: "purple"
  },
  {
    title: "Social Media",
    description: "Manage Instagram, LinkedIn, and drive digital engagement.",
    icon: "Share2",
    color: "blue"
  }
];

export const ACTIVITIES = [
  { 
    category: "AI Workshop", 
    title: "Prompt Kraft – AI Workshop", 
    description: "A flagship hands-on workshop introducing Prompt Engineering, Large Language Models, ChatGPT, Zero-shot, Few-shot, Chain-of-Thought prompting, and AI chatbot development.", 
    icon: "Cpu",
    image: "/prompt-kraft.jpg",
    color: "purple" 
  },
  { 
    category: "Competitions", 
    title: "Chatbot Alchemy", 
    description: "An AI-focused challenge where participants designed and built intelligent chatbots while exploring modern conversational AI technologies.", 
    icon: "Bot",
    image: "/chatbot-alchemy.jpg",
    color: "cyan" 
  },
  { 
    category: "Competitions", 
    title: "Blind Stack", 
    subtitle: "Revamping Tech Challenge",
    description: "A debugging and analytical coding competition testing logical thinking, teamwork, and problem-solving under pressure. Focus areas include HTML5, CSS3, JavaScript, GitHub, and Firebase.", 
    icon: "Code2", 
    image: "/blind-stack.jpg",
    color: "blue",
    highlights: [
      "Front-end web development challenges",
      "Real-time debugging without previews",
      "Team-based logical problem solving",
      "Code optimization and deployment"
    ]
  },
  { 
    category: "Competitions", 
    title: "Back Code Battle", 
    subtitle: "Where the output is known, but the code is your quest.",
    description: "A reverse coding contest where participants fixed, optimized, and enhanced existing programs within limited time.", 
    icon: "Terminal",
    image: "/back-code-battle.jpg",
    color: "purple" 
  },
  { 
    category: "Quiz", 
    title: "Competitive Quiz", 
    subtitle: "Interactive Technical Quiz",
    description: "Students participated in fast-paced technical quizzes covering programming, AI, logical reasoning, debugging, and emerging technologies. The activity encouraged teamwork, quick thinking, and competitive learning.", 
    icon: "HelpCircle",
    image: "/quiz.jpeg",
    color: "cyan",
    highlights: [
      "Live mobile-based quiz rounds",
      "Real-time leaderboard",
      "Team participation",
      "Logical reasoning challenges",
      "Technical problem-solving"
    ]
  },
  { 
    category: "Pitching", 
    title: "Pitching Challenge", 
    description: "Students pitch innovative ideas, technical projects, and startup concepts before a panel, developing communication, presentation, and entrepreneurial skills.", 
    icon: "Lightbulb",
    image: "/pitching-challenge.jpg",
    color: "blue" 
  },
  { 
    category: "Networking", 
    title: "Networking Sessions", 
    description: "Networking events connecting students, seniors, alumni, faculty, and industry experts to build professional relationships, mentorship, and collaboration.", 
    icon: "Users", 
    image: "/networking.jpg",
    color: "purple" 
  },
  { 
    category: "Recruitment", 
    title: "Recruitment Drives", 
    description: "Annual recruitment welcoming passionate students into Technical & Innovation, Competitive Programming, Event Management, Marketing, Creative & Content, and Social Media domains.", 
    icon: "UserPlus",
    image: "/recruitment.jpg",
    color: "cyan" 
  },
  { 
    category: "Project Showcase", 
    title: "Project Showcase", 
    description: "Members demonstrate software projects, AI applications, research work, and innovative technical solutions developed throughout the academic year.", 
    icon: "MonitorPlay", 
    image: "/project-showcase.jpg",
    color: "blue" 
  }
];

export const WHY_JOIN_US = [
  { title: "Work on real projects", icon: "Code2" },
  { title: "Build technical skills", icon: "Cpu" },
  { title: "Leadership opportunities", icon: "Award" },
  { title: "Networking", icon: "Users" },
  { title: "Team collaboration", icon: "Users2" },
  { title: "Portfolio building", icon: "Briefcase" },
  { title: "Hands-on learning", icon: "MonitorPlay" },
  { title: "Certificates and recognition", icon: "Star" }
];

export const UPCOMING_EVENTS = [
  { 
    title: "Prompt Kraft – AI Workshop", 
    category: "AI Workshop",
    status: "Completed", 
    description: "A hands-on workshop introducing Prompt Engineering, Large Language Models, and AI chatbot development.", 
    date: "Oct 20, 2025",
    venue: "Main Auditorium",
    image: "/prompt-kraft.jpg"
  },
  { 
    title: "Blind Stack (TEXUS)", 
    category: "TEXUS Competition",
    status: "Registration Soon", 
    description: "A debugging and analytical coding competition testing logical thinking, teamwork, and problem-solving.", 
    date: "Feb 27, 2026",
    venue: "BMS 4th Floor Lab",
    image: "/blind-stack.jpg"
  },
  { 
    title: "Competitive Quiz", 
    category: "Technical Quiz",
    status: "Completed", 
    description: "Interactive technical quiz covering programming, AI, and logical reasoning challenges.", 
    date: "Nov 15, 2025",
    venue: "BMS Block",
    image: "/quiz.jpeg"
  },
  { 
    title: "Pitching Challenge", 
    category: "Pitching",
    status: "Coming Soon", 
    description: "Students pitch innovative ideas, technical projects, and startup concepts before a panel.", 
    date: "Apr 05, 2026",
    venue: "Seminar Hall",
    image: "/pitching-challenge.jpg"
  },
  { 
    title: "Recruitment Drive", 
    category: "Recruitment",
    status: "Registration Open", 
    description: "Open recruitment welcoming passionate students into Technical, Event Management, Creative, and Media domains.", 
    date: "Aug 01, 2026",
    venue: "Campus Wide",
    image: "/recruitment.jpg"
  }
];

export const LEADERSHIP_DATA = [
  {
    category: "Executive Committee",
    members: [
      { name: "Karthik S", role: "President", image: "/images/leadership/karthik.jpg" },
      { name: "Mayank Gupta", role: "Vice President", image: "/images/leadership/mayank.jpg" },
      { name: "Krishna Kar", role: "Secretary", image: "/images/leadership/krishna.jpg" },
      { name: "Darshan", role: "Vice Secretary", image: "/images/leadership/darshan.jpg" },
    ],
  },
  {
    category: "Technical Team",
    members: [
      { name: "Akansha", role: "Technical Lead", image: "/images/leadership/akansha.jpg" },
      { name: "Hari Supriya", role: "Technical Co-Lead", image: "/images/leadership/hari.jpg" },
    ],
  },
  {
    category: "Event Management",
    members: [
      { name: "Grishma", role: "Event Management Lead", image: "/images/leadership/grishma.jpg" },
      { name: "Jai Karthick", role: "Event Management Co-Lead", image: "/images/leadership/jai.jpg" },
    ],
  },
  {
    category: "Creative Team",
    members: [
      { name: "Tanishqa", role: "Creative Lead", image: "/images/leadership/tanishqa.jpg" },
      { name: "Nilesh", role: "Creative Co-Lead", image: "/images/leadership/nilesh.jpg" },
    ],
  },
  {
    category: "Social Media Team",
    members: [
      { name: "Yogesh", role: "Social Media Lead", image: "/images/leadership/yogesh.jpg" },
      { name: "Arpit", role: "Social Media Co-Lead", image: "/images/leadership/arpit.jpg" },
    ],
  },
];

export const ALUMNI_DATA = [
  {
    category: "Executive Committee",
    members: [
      { name: "Soumya Suman Kar", role: "President", image: "/images/alumni/soumya-suman-kar.jpg" },
      { name: "Ashu Choudhary", role: "Vice President", image: "/images/alumni/ashu-choudhary.jpg" },
      { name: "Ankur Gohain", role: "Secretary", image: "/images/alumni/ankur-gohain.jpg" },
      { name: "Ilindra Suvidha", role: "Vice Secretary", image: "/images/alumni/ilindra-suvidha.jpg" },
    ],
  },
  {
    category: "Technical & Innovation",
    members: [
      { name: "Sabharish Varshaan S", role: "Technical Lead", image: "/images/alumni/sabharish-varshaan.jpg" },
      { name: "Akanksha Tirkala", role: "Technical Co-Lead", image: "/images/alumni/akanksha-tirkala.jpg" },
    ],
  },
  {
    category: "Creative & Content",
    members: [
      { name: "Neha Kiran Panbude", role: "Creative Lead", image: "/images/alumni/neha-kiran-panbude.jpg" },
      { name: "Sushree Sangita Ray", role: "Creative Co-Lead", image: "/images/alumni/sushree-sangita-ray.jpg" },
    ],
  },
  {
    category: "Social Media",
    members: [
      { name: "Yashmit Rai", role: "Social Media Lead", image: "https://ui-avatars.com/api/?name=Yashmit+Rai&background=8B5CF6&color=fff&size=512" },
      { name: "Yuvraj Singh", role: "Social Media Co-Lead", image: "/images/alumni/yuvraj-singh.jpg" },
    ],
  },
  {
    category: "Event Management",
    members: [
      { name: "Kaviyavarshini C K", role: "Event Management Lead", image: "/images/alumni/kaviyavarshini-ck.jpg" },
      { name: "L. Grishma Naidu", role: "Event Management Co-Lead", image: "/images/alumni/grishma-naidu.jpg" },
    ],
  },
  {
    category: "Operations",
    members: [
      { name: "Samali Das", role: "OPS Log Lead", image: "/images/alumni/samali-das.jpg" },
    ],
  },
];

export const PROJECTS = [
  {
    category: "App Development",
    title: "CampusConnect",
    description:
      "A smart campus navigation and event discovery app built for SRM Ramapuram students. Features real-time maps, event notifications, and club feeds.",
    tech: ["React Native", "Node.js", "MongoDB", "Socket.io"],
    status: "Live",
    statusColor: "green",
    color: "purple",
    icon: "MapPin",
    link: "#",
    github: "https://github.com/intellects-club/campus-connect",
    demo: "https://campus-connect.example.com",
  },
  {
    category: "AI",
    title: "StudySync AI",
    description:
      "An AI-powered study assistant that generates personalized learning paths, quiz questions, and flashcards from uploaded PDF notes using LLMs.",
    tech: ["Next.js", "Python", "OpenAI API", "Supabase"],
    status: "Beta",
    statusColor: "blue",
    color: "blue",
    icon: "BookOpen",
    link: "#",
    github: "https://github.com/intellects-club/studysync-ai",
    demo: "https://studysync.example.com",
  },
  {
    category: "Web",
    title: "GreenTrack",
    description:
      "An IoT-enabled campus sustainability dashboard that monitors energy consumption, waste levels, and carbon footprint across SRM buildings.",
    tech: ["Arduino", "React", "Firebase", "Chart.js"],
    status: "In Progress",
    statusColor: "orange",
    color: "cyan",
    icon: "Leaf",
    link: "#",
    github: "https://github.com/intellects-club/greentrack",
    demo: "https://greentrack.example.com",
  },
  {
    category: "Web",
    title: "CodeCollab",
    description:
      "A real-time collaborative coding platform with video chat, shared code editors, and AI code review — built specifically for students learning together.",
    tech: ["Next.js", "WebRTC", "Monaco Editor", "Redis"],
    status: "Live",
    statusColor: "green",
    color: "purple",
    icon: "Code2",
    link: "#",
    github: "https://github.com/intellects-club/codecollab",
    demo: "https://codecollab.example.com",
  },
  {
    category: "Web",
    title: "PlacementPrep",
    description:
      "A comprehensive placement preparation portal with curated DSA problems, mock interviews, company-specific tracks, and resume reviews.",
    tech: ["React", "Express", "PostgreSQL", "Docker"],
    status: "Live",
    statusColor: "green",
    color: "blue",
    icon: "Briefcase",
    link: "#",
    github: "https://github.com/intellects-club/placement-prep",
    demo: "https://placement-prep.example.com",
  },
  {
    category: "Open Source",
    title: "IntelliBot",
    description:
      "A Discord & WhatsApp bot that handles club announcements, event registration, DSA of the day, and member onboarding with zero manual effort.",
    tech: ["Python", "discord.py", "Twilio", "SQLite"],
    status: "Live",
    statusColor: "green",
    color: "cyan",
    icon: "Bot",
    link: "#",
    github: "https://github.com/intellects-club/intellibot",
    demo: "https://intellibot.example.com",
  },
];

export const GALLERY_ITEMS = [
  { id: 1, category: "Competitions", src: "/blind-stack.jpg", title: "Blind Stack Tech Challenge", description: "Students participating in the Blind Stack competitive coding challenge." },

  { id: 3, category: "Workshops", src: "/prompt-kraft.jpg", title: "Prompt Engineering Workshop", description: "Hands-on workshop exploring prompt engineering and AI tools." },
  { id: 4, category: "Club Activities", src: "/networking.jpg", title: "Networking & Discussion", description: "Open forum for students to discuss tech trends and network." },
  { id: 5, category: "AI & Chatbot", src: "/chatbot-alchemy.jpg", title: "Chatbot Alchemy", description: "Designing and building intelligent chatbots from scratch." },
  { id: 6, category: "Competitions", src: "/back-code-battle.jpg", title: "Back Code Battle", description: "Reverse coding competition testing analytical skills." },
  { id: 7, category: "Competitions", src: "/project-showcase.jpg", title: "Project Showcase", description: "Teams presenting their final built solutions and software." },
  { id: 8, category: "Competitions", src: "/pitching-challenge.jpg", title: "Pitching Challenge", description: "Students pitching innovative startup and tech project ideas." },
  { id: 9, category: "Club Activities", src: "/executive-committee.jpg", title: "Executive Committee Meet", description: "Strategic planning and brainstorming session with the committee." },
  { id: 10, category: "Club Activities", src: "/recruitment.jpg", title: "Recruitment Drive", description: "Annual recruitment welcoming passionate students to the club." },
  { id: 11, category: "Special Events", src: "/quiz.jpeg", title: "Competitive Quiz", description: "Interactive fast-paced technical quiz covering programming and AI." },
  { id: 25, category: "Special Events", src: "/images/republicday.jpeg", title: "Republic Day", description: "Wishing you a joyful and proud Republic Day! May the spirit of unity and patriotism fill your heart." },
  { id: 26, category: "Special Events", src: "/images/womens day.jpeg", title: "Happy Women's Day", description: "Intellects Club wishes all the wonderful women a Happy Women's Day." },
  
  // Alumni
  { id: 12, category: "Alumni", src: "/images/gallery alumini/alumni-4.jpeg", title: "President", description: "Our esteemed President's legacy and leadership." },
  { id: 13, category: "Alumni", src: "/images/gallery alumini/alumni-2.jpeg", title: "Co-Treasurer", description: "Partnering in financial stability and growth." },
  { id: 14, category: "Alumni", src: "/images/gallery alumini/alumni-1.jpeg", title: "Vice President", description: "Our Vice President's impactful journey." },
  { id: 15, category: "Alumni", src: "/images/gallery alumini/alumni-3.jpeg", title: "Event Management Lead", description: "The master planner behind every memorable event." },
  { id: 16, category: "Alumni", src: "/images/gallery alumini/alumni-5.jpeg", title: "Creative Lead", description: "The visionary behind our club's aesthetics." },
  { id: 17, category: "Alumni", src: "/images/gallery alumini/alumni-6.jpeg", title: "Event Management Co-Lead", description: "Ensuring smooth execution of all club events." },
  { id: 18, category: "Alumni", src: "/images/gallery alumini/alumni-7.jpeg", title: "Alumni Profile", description: "Highlighting our amazing club alumni." },
  { id: 19, category: "Alumni", src: "/images/gallery alumini/alumni-8.jpeg", title: "Alumni Profile", description: "Highlighting our amazing club alumni." },
  { id: 20, category: "Alumni", src: "/images/gallery alumini/alumni-9.jpeg", title: "Alumni Profile", description: "Highlighting our amazing club alumni." },
  { id: 21, category: "Alumni", src: "/images/gallery alumini/alumni-10.jpeg", title: "Alumni Profile", description: "Highlighting our amazing club alumni." },
  { id: 22, category: "Alumni", src: "/images/gallery alumini/alumni-11.jpeg", title: "Alumni Profile", description: "Highlighting our amazing club alumni." },
  { id: 23, category: "Alumni", src: "/images/gallery alumini/alumni-12.jpeg", title: "Alumni Profile", description: "Highlighting our amazing club alumni." },
  { id: 24, category: "Alumni", src: "/images/gallery alumini/alumni-13.jpeg", title: "Alumni Profile", description: "Highlighting our amazing club alumni." },
];

export const TESTIMONIALS = [
  {
    name: "Aditya Kumar",
    role: "SDE Intern at Google",
    year: "CSE 2024",
    quote:
      "Intellects Club completely changed my trajectory. The hackathons, mentorship, and community gave me the confidence and skills to crack my dream internship.",
    initials: "AK",
    color: "purple",
  },
  {
    name: "Meera Subramanian",
    role: "Founder — EduTech Startup",
    year: "IT 2023",
    quote:
      "The IdeaForge workshop was where my startup idea was born. The club's support system and the connections I made here are invaluable to my entrepreneurial journey.",
    initials: "MS",
    color: "blue",
  },
  {
    name: "Vikram Anand",
    role: "Backend Engineer at Razorpay",
    year: "CSE 2024",
    quote:
      "CodeCollab and the open source sprint taught me more about real-world software development than any classroom ever could. Highly recommend joining.",
    initials: "VA",
    color: "cyan",
  },
  {
    name: "Lakshmi Priya",
    role: "ML Researcher at IIT Chennai",
    year: "Data Science 2024",
    quote:
      "The guest talks and workshops at Intellects Club introduced me to research I didn't know I was passionate about. Now I'm pursuing a PhD. Best decision ever.",
    initials: "LP",
    color: "purple",
  },
];

export const FAQS = [
  {
    question: "Who can join Intellects Club?",
    answer: "Any student enrolled at SRM Institute of Science and Technology, Ramapuram campus is welcome to join — regardless of year, department, or prior experience.",
  },
  {
    question: "Do I need coding experience?",
    answer: "Absolutely not. We have events for all skill levels and domains, including design, event management, and social media. Everyone has a place in Intellects Club.",
  },
  {
    question: "How can I become a member?",
    answer: "We run open enrollment at the start of each semester. You can also join by participating in our recruitment drives or contacting any leadership member.",
  },
  {
    question: "Which domains can I join?",
    answer: "You can join Technical & Innovation, Event Management, Creative Team, or Social Media depending on your interests and skills.",
  },
  {
    question: "Do members receive certificates?",
    answer: "Yes, active members receive certificates of appreciation for their contributions, and event winners receive certificates of merit.",
  },
  {
    question: "How are events announced?",
    answer: "All our events are announced through our official Instagram page, WhatsApp community groups, and LinkedIn. Make sure to follow us to stay updated!",
  },
];

export const LINKEDIN_UPDATES = [
  {
    title: "Open Recruitment 2026",
    postedDate: "Posted 3 days ago",
    description: "Ready to vibe with the sharpest minds? Welcome to Intellects Club! Join our Technical, Event, and Creative domains.",
    image: "/recruitment.jpg",
    likes: 124,
    comments: 18,
    featured: true
  },
  {
    title: "Executive Committee Announced",
    postedDate: "Posted 1 week ago",
    description: "Meet the new leadership team of Intellects Club! We're excited for an amazing academic year ahead.",
    image: "/executive-committee.jpg",
    likes: 210,
    comments: 42,
    featured: false
  },
  {
    title: "Project Showcase",
    postedDate: "Posted 3 months ago",
    description: "Members demonstrate software projects, AI applications, research work, and innovative technical solutions.",
    image: "/project-showcase.jpg",
    likes: 287,
    comments: 56,
    featured: false
  },
];

export const CONTACT_INFO = [
  {
    icon: "Mail",
    label: "Official Email",
    value: "karthik.santhanam2007@gmail.com",
    href: "mailto:karthik.santhanam2007@gmail.com",
    color: "blue",
  },
  {
    icon: "Instagram",
    label: "Instagram",
    value: "@intellects_srmramapuram",
    href: "https://www.instagram.com/intellects_srmramapuram/",
    color: "blue",
  },
  {
    icon: "Linkedin",
    label: "LinkedIn",
    value: "Intellects Club SRM Ramapuram",
    href: "https://www.linkedin.com/company/intellectsclub-srm-ramapuram/",
    color: "cyan",
  },
  {
    icon: "MapPin",
    label: "Location",
    value: "SRM IST, Ramapuram, Chennai — 600 089",
    href: "https://maps.google.com",
    color: "purple",
  },
];

export const MARQUEE_ITEMS = [
  "Hackathons",
  "Open Source",
  "AI / ML Workshops",
  "Competitive Programming",
  "Guest Talks",
  "Design Thinking",
  "Cloud Computing",
  "Open Source Challenges",
  "Innovation Labs",
  "Mentorship Programs",
  "Project Showcases",
  "Community Building",
];

export const FEATURED_ALUMNI = [
  {
    name: "Karthik S",
    department: "CSE",
    batch: "2024",
    role: "Software Engineer",
    company: "Microsoft",
    bio: "Passionate about scalable systems. Former President of Intellects Club who spearheaded the IdeaForge initiative.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
    linkedin: "https://linkedin.com",
    email: "karthik@example.com"
  },
  {
    name: "Priya R",
    department: "IT",
    batch: "2023",
    role: "AI Engineer",
    company: "Google",
    bio: "Working on generative AI models. Led the technical team during the 2022 Hackathon.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    linkedin: "https://linkedin.com",
    email: "priya@example.com"
  },
  {
    name: "Arjun V",
    department: "ECE",
    batch: "2022",
    role: "Product Designer",
    company: "Adobe",
    bio: "Designing the future of creative tools. Former Creative Lead who designed the club's iconic logo.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    linkedin: "https://linkedin.com",
    email: "arjun@example.com"
  },
  {
    name: "Nithya K",
    department: "CSE",
    batch: "2021",
    role: "Cloud Engineer",
    company: "Amazon",
    bio: "AWS Certified Solutions Architect. Mentored over 50 students in cloud computing.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    linkedin: "https://linkedin.com",
    email: "nithya@example.com"
  }
];

export const ALUMNI_STATS = [
  { value: 500, suffix: "+", label: "Alumni Network" },
  { value: 120, suffix: "+", label: "Placed in Top Companies" },
  { value: 45, suffix: "+", label: "Startups Founded" },
  { value: 30, suffix: "+", label: "Countries" },
  { value: 95, suffix: "%", label: "Placement Success" },
  { value: 15, suffix: "+", label: "Industry Mentors" }
];

export const TOP_RECRUITERS = [
  "Google", "Microsoft", "Amazon", "Apple", "Adobe", "NVIDIA", "Infosys", "TCS", "Accenture", "Zoho", "Freshworks", "IBM", "Intel", "Oracle", "Deloitte"
];

export const ALUMNI_TIMELINE = [
  { year: "2019", title: "Club Founded", description: "The foundation of Intellects Club was laid by a small group of visionary students." },
  { year: "2020", title: "First Alumni Batch", description: "Our founding members graduated, becoming the first official Intellects Alumni." },
  { year: "2021", title: "100 Alumni", description: "The network grew to 100 members spanning across top tech companies in India." },
  { year: "2023", title: "Global Alumni Network", description: "Alumni reached 15+ countries, establishing a global mentorship presence." },
  { year: "2025", title: "500+ Members Worldwide", description: "A massive network of leaders, innovators, and entrepreneurs helping the next generation." }
];

export const societyStats = [
  { label: "Founded (ADC)", value: "2018", suffix: "" },
  { label: "Registered members (2019)", value: "129", suffix: "+" },
  { label: "Technical domains today", value: "4", suffix: "" },
  { label: "Recognized as CSS", value: "2021", suffix: "" },
] as const;

export const clubDomains = [
  {
    id: "aiml",
    name: "AI / ML",
    tagline: "Models, data & intelligent systems",
    description:
      "Explore machine learning pipelines, neural networks, and real-world AI projects — from notebooks to deployed demos.",
    topics: ["Python & PyTorch", "Computer Vision", "NLP", "MLOps basics"],
    accent: "#3035B5",
    icon: "brain",
  },
  {
    id: "web",
    name: "Web Development",
    tagline: "Products people actually use",
    description:
      "Build modern full-stack applications with industry practices — UI craft, APIs, performance, and this official CSS site.",
    topics: ["React & Next.js", "UI/UX", "REST & auth", "Deployment"],
    accent: "#5B2D91",
    icon: "code",
  },
  {
    id: "cyber",
    name: "Cybersecurity",
    tagline: "Offense, defense & awareness",
    description:
      "Train through CTFs, secure coding, and red-team/blue-team style challenges tailored for campus learners.",
    topics: ["CTF & OSINT", "Network security", "Web exploits", "Digital forensics"],
    accent: "#CC484A",
    icon: "shield",
  },
  {
    id: "dsa",
    name: "DSA",
    tagline: "Problem solving at scale",
    description:
      "Structured DSA mentorship, contest prep, and peer learning for placements, internships, and competitive programming.",
    topics: ["Contest prep", "Systematic topics", "Mock interviews", "Codeforces / LeetCode"],
    accent: "#3CA049",
    icon: "graph",
  },
] as const;

export const initiatives = [
  {
    title: "AMUHACKS",
    description:
      "Our flagship national hackathon — multi-track, mentor-led, and built for teams who want to ship under pressure.",
    badge: "Signature",
  },
  {
    title: "Workshop series",
    description:
      "Hands-on sessions on frameworks, cloud, security tooling, and career skills led by domain leads and alumni.",
    badge: "Weekly",
  },
  {
    title: "Placement support",
    description:
      "Collaboration with the department TPO — resume reviews, mock interviews, and DSA cohorts before recruitment season.",
    badge: "Career",
  },
  {
    title: "CTF & security labs",
    description:
      "Capture-the-flag events and guided labs that make cybersecurity approachable for every year.",
    badge: "Cyber",
  },
  {
    title: "Open-source & projects",
    description:
      "Student-led repos, internal tools, and society websites — learn Git workflows on real codebases.",
    badge: "Build",
  },
  {
    title: "Industry talks",
    description:
      "Guest sessions with engineers and researchers so students see how classrooms map to industry.",
    badge: "Network",
  },
] as const;

export const timeline = [
  {
    year: "Dec 2018",
    title: "ADC inception",
    body:
      "27 B.Sc. (Hons.) Computer Applications students launch the Area of Dominant Coders Club with final-year coordinators mentoring juniors during breaks and afternoon sessions.",
  },
  {
    year: "Sep 2019",
    title: "Expansion & AMUHacks 1.0",
    body:
      "ADC spans the Faculty of Science with 129+ department members; Zerynth supports IoT work; AMUHacks 1.0 runs with Microsoft and SmartEdge as partners.",
  },
  {
    year: "Mar 2021",
    title: "University recognition",
    body:
      "Hon’ble Vice-Chancellor grants recognition and financial support; ADC is renamed the Computer Science Society (CSS).",
  },
  {
    year: "Today",
    title: "Domain clubs & AMUHACKS",
    body:
      "AI/ML, Web Development, Cybersecurity, and DSA verticals; workshops, internships, hackathons, and placement-aligned mentorship each session.",
  },
] as const;

export const whyJoin = [
  {
    title: "Learn with peers",
    body: "Study groups, project buddies, and seniors who have been through placements and contests.",
  },
  {
    title: "Ship real projects",
    body: "Society websites, hackathon builds, security tools — portfolio work that interviewers notice.",
  },
  {
    title: "Represent AMU",
    body: "Compete at hackathons and CTFs under the CSS banner and grow the department's tech reputation.",
  },
  {
    title: "Find your domain",
    body: "Try AI, web, security, or DSA before committing — leads help you pick a path that fits.",
  },
] as const;

export const faqItems = [
  {
    q: "Who can join CSS clubs?",
    a: "CSS shares computer science knowledge across the Faculty of Science. Department students express interest via the club form; leads review submissions and share onboarding details.",
  },
  {
    q: "Is CSS the same as recruitment?",
    a: "Club domains (AI/ML, Web, Cyber, DSA) are open to interested students. Core team recruitment is separate and opens via the Join Team page when applications are live.",
  },
  {
    q: "Do I need prior experience?",
    a: "No. What matters is curiosity and consistency. Workshops and mentor tracks start from fundamentals and level up with your pace.",
  },
  {
    q: "How do I stay updated on events?",
    a: "Follow our social channels (linked in the footer), check the Events page, and watch for AMUHACKS announcements each session.",
  },
] as const;

export const marqueeEvents = [
  "AMUHACKS",
  "Capture The Flag",
  "Web Dev Sprint",
  "ML Study Circle",
  "DSA Marathon",
  "Cyber Awareness Week",
  "Industry Talks",
  "Open Source Night",
] as const;

export const leadershipHighlight = {
  president: "Prof. Arman Rasool Faridi",
  role: "President, Computer Science Society",
  coordinator: "Mr. Misbahur Rahman",
  coordinatorRole: "Coordinator, CSS (current session)",
  quote:
    "CSS exists to turn classroom theory into confidence — through projects, competitions, and mentorship that prepare students for the industry ahead.",
};

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
    tagline: "Machine learning",
    description:
      "Study circles on Python, models, and small projects. Starts from basics if you are new.",
    topics: ["Python & PyTorch", "Computer Vision", "NLP", "MLOps basics"],
    accent: "#3035B5",
    icon: "brain",
  },
  {
    id: "web",
    name: "Web Development",
    tagline: "Full-stack web",
    description:
      "Work on sites and apps with React, APIs, and deployment. This society site is one of the club projects.",
    topics: ["React & Next.js", "UI/UX", "REST & auth", "Deployment"],
    accent: "#5B2D91",
    icon: "code",
  },
  {
    id: "cyber",
    name: "Cybersecurity",
    tagline: "CTF and security basics",
    description:
      "CTF practice, secure coding, and lab sessions for students who want to learn security step by step.",
    topics: ["CTF & OSINT", "Network security", "Web exploits", "Digital forensics"],
    accent: "#CC484A",
    icon: "shield",
  },
  {
    id: "dsa",
    name: "DSA",
    tagline: "Contests and placements",
    description:
      "Topic-wise DSA sessions, contest prep, and peer groups for placements and internships.",
    topics: ["Contest prep", "Systematic topics", "Mock interviews", "Codeforces / LeetCode"],
    accent: "#3CA049",
    icon: "graph",
  },
] as const;

export const initiatives = [
  {
    title: "AMUHACKS",
    description:
      "National hackathon run by CSS. Multiple tracks, mentors on site, teams build over the event weekend.",
    badge: "Signature",
  },
  {
    title: "Workshop series",
    description:
      "Hands-on sessions on frameworks, cloud, security tools, and career skills. Led by domain leads and alumni.",
    badge: "Weekly",
  },
  {
    title: "Placement support",
    description:
      "Works with the department TPO on resume reviews, mock interviews, and DSA groups before recruitment drives.",
    badge: "Career",
  },
  {
    title: "CTF & security labs",
    description:
      "Capture-the-flag events and guided labs for students new to cybersecurity.",
    badge: "Cyber",
  },
  {
    title: "Open-source & projects",
    description:
      "Student repos, internal tools, and society websites. You learn Git on real team work.",
    badge: "Build",
  },
  {
    title: "Industry talks",
    description:
      "Guest talks from engineers and researchers on how their work relates to what we study.",
    badge: "Network",
  },
] as const;

export const timeline = [
  {
    year: "Dec 2018",
    title: "ADC inception",
    body:
      "27 B.Sc. (Hons.) Computer Applications students start the Area of Dominant Coders Club. Final-year coordinators mentor juniors after class hours.",
  },
  {
    year: "Sep 2019",
    title: "Expansion & AMUHacks 1.0",
    body:
      "Membership grows across the Faculty of Science (129+ in the department). AMUHacks 1.0 runs with Microsoft and SmartEdge as partners.",
  },
  {
    year: "Mar 2021",
    title: "University recognition",
    body:
      "The Vice-Chancellor grants recognition and support. ADC is renamed the Computer Science Society (CSS).",
  },
  {
    year: "Today",
    title: "Domain clubs & AMUHACKS",
    body:
      "Clubs in AI/ML, Web Development, Cybersecurity, and DSA. Workshops, internships, hackathons, and placement help each session.",
  },
] as const;

export const whyJoin = [
  {
    title: "Learn with peers",
    body: "Study groups, project partners, and seniors who have done placements and contests.",
  },
  {
    title: "Ship real projects",
    body: "Society sites, hackathon builds, and security tools you can show in interviews.",
  },
  {
    title: "Represent AMU",
    body: "Compete at hackathons and CTFs under the CSS name with other department students.",
  },
  {
    title: "Find your domain",
    body: "Try ML, web, security, or DSA before you commit. Leads can point you to the right club.",
  },
] as const;

export const faqItems = [
  {
    q: "Who can join CSS clubs?",
    a: "CSS is open to interested students in the Faculty of Science. Fill the club interest form; domain leads review it and share next steps.",
  },
  {
    q: "Is CSS the same as recruitment?",
    a: "Club domains (AI/ML, Web, Cyber, DSA) are separate from core team recruitment. Core roles open on the Join Team page when applications are live.",
  },
  {
    q: "Do I need prior experience?",
    a: "No. Workshops and mentor tracks start from fundamentals. What helps is showing up regularly.",
  },
  {
    q: "How do I stay updated on events?",
    a: "Follow the social links in the footer, check the Events page, and watch for AMUHACKS announcements each session.",
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
    "We run CSS so classroom work turns into projects, contests, and mentorship that help students before they graduate.",
};

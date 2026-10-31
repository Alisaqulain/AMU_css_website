export const societyStats = [
  { label: "Founded (ADC)", value: "2018", suffix: "" },
  { label: "Registered members (2019)", value: "129", suffix: "+" },
  { label: "Teams today", value: "10", suffix: "" },
  { label: "Recognized as CSS", value: "2021", suffix: "" },
] as const;

export const clubDomains = [
  {
    id: "graphics",
    name: "Graphics Team",
    tagline: "Design & visuals",
    description:
      "Posters, event creatives, and brand visuals for CSS workshops and festivals.",
    topics: ["Posters", "Social creatives", "Brand kits", "Canva / Figma"],
    accent: "#5B2D91",
    icon: "brain",
  },
  {
    id: "smpr",
    name: "Social Media and PR Team",
    tagline: "Reach & reputation",
    description:
      "Instagram, LinkedIn, and campus outreach so every CSS event finds its audience.",
    topics: ["Content calendar", "Captions", "PR", "Engagement"],
    accent: "#CC484A",
    icon: "code",
  },
  {
    id: "volunteer",
    name: "Volunteer Crew",
    tagline: "On-ground support",
    description:
      "Help run registrations, hospitality, and floor support at CSS events.",
    topics: ["Registrations", "Hospitality", "Floor ops", "Help desk"],
    accent: "#3CA049",
    icon: "shield",
  },
  {
    id: "technical",
    name: "Technical Team",
    tagline: "Systems & setup",
    description:
      "AV, networking, and technical setup that keeps workshops and hackathons running.",
    topics: ["AV setup", "Networking", "Labs", "Support"],
    accent: "#3035B5",
    icon: "graph",
  },
  {
    id: "editorial",
    name: "Editorial Team",
    tagline: "Writing & content",
    description:
      "Articles, scripts, newsletters, and editorial content for society storytelling.",
    topics: ["Articles", "Scripts", "Newsletters", "Storytelling"],
    accent: "#B85C38",
    icon: "brain",
  },
  {
    id: "logistics",
    name: "Logistics Team",
    tagline: "Ops & coordination",
    description:
      "Venues, schedules, and resource coordination behind every CSS event.",
    topics: ["Venues", "Schedules", "Inventory", "Coordination"],
    accent: "#1F6F8B",
    icon: "code",
  },
  {
    id: "web",
    name: "Web Dev Team",
    tagline: "Sites & products",
    description:
      "Build and maintain CSS websites and event platforms with modern web stacks.",
    topics: ["React & Next.js", "UI", "APIs", "Deployment"],
    accent: "#5B2D91",
    icon: "shield",
  },
  {
    id: "aiml",
    name: "AI ML Team",
    tagline: "Machine learning",
    description:
      "Study circles on Python, models, and small projects. Open to beginners.",
    topics: ["Python", "ML basics", "Projects", "Demos"],
    accent: "#3035B5",
    icon: "graph",
  },
  {
    id: "cyber",
    name: "Cyber Team",
    tagline: "Security & CTF",
    description:
      "CTF practice, secure coding, and labs for students exploring cybersecurity.",
    topics: ["CTF", "OSINT", "Web security", "Labs"],
    accent: "#CC484A",
    icon: "brain",
  },
  {
    id: "dsa",
    name: "DSA Team",
    tagline: "Problem solving",
    description:
      "Data structures, algorithms, and competitive programming practice for contests and placements.",
    topics: ["Data structures", "Algorithms", "Competitive coding", "Interview prep"],
    accent: "#1F6F8B",
    icon: "code",
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
      "Teams across graphics, PR, volunteers, tech, editorial, logistics, web, AI/ML, cyber, and DSA. Workshops, hackathons, and campus events each session.",
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
    a: "Use the interest form to pick teams (Graphics, Web Dev, AI/ML, Cyber, DSA, and more). Core team applications with resume open on the Join Team page.",
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

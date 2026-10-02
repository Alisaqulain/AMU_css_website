export type TeamCategoryId = "core" | "aiml" | "web" | "cyber" | "dsa";

export type TeamMember = {
  name: string;
  designation: string;
  image: string;
  linkedin: string;
};

export type TeamCategory = {
  id: TeamCategoryId;
  title: string;
  subtitle: string;
  accent: string;
  members: TeamMember[];
};

export const teamCategories: TeamCategory[] = [
  {
    id: "core",
    title: "Core Team",
    subtitle: "Coordination, mentorship, and society operations",
    accent: "#5B2D91",
    members: [
      {
        name: "Misbahur Rahman",
        designation: "Coordinator",
        image: "/team/misbahurrahman.jpg",
        linkedin: "https://www.linkedin.com/in/rahman-misbah",
      },
      {
        name: "Anshika Porwal",
        designation: "Secretary",
        image: "/team/anshikaporwal.jpg",
        linkedin: "https://www.linkedin.com/in/anshika-porwal-522a7b27a",
      },
      {
        name: "Tuba Rahman",
        designation: "Mentor",
        image: "/team/tubarahman.jpg",
        linkedin: "https://www.linkedin.com/in/tuba-rahman-200424255",
      },
      {
        name: "Syed Umar Ali",
        designation: "Mentor",
        image: "/team/umarali.jpg",
        linkedin: "https://www.linkedin.com/in/syed-umar-ali-1b2527291",
      },
    ],
  },
  {
    id: "aiml",
    title: "AI / ML",
    subtitle: "Machine learning, data science, and intelligent systems",
    accent: "#3035B5",
    members: [
      {
        name: "Mohd Wasi Imam",
        designation: "AI/ML Lead",
        image: "/team/wasiimam.jpg",
        linkedin: "https://www.linkedin.com/in/mohd-wasi-imam-28a7b731b/",
      },
      {
        name: "Adeeba Ekbal",
        designation: "Co-AI/ML Lead",
        image: "/team/adeebaekbal.jpg",
        linkedin: "https://www.linkedin.com/in/adeeba-ekbal-50b30632a",
      },
    ],
  },
  {
    id: "web",
    title: "Web Development",
    subtitle: "Full-stack products, UI, and the CSS digital presence",
    accent: "#5B2D91",
    members: [
      {
        name: "Ali Saqulain",
        designation: "Web Development Lead",
        image: "/team/alisaqulain.jpg",
        linkedin: "https://www.linkedin.com/in/ali-saqulain-7404a8287",
      },
      {
        name: "Mohd Amir Hasan",
        designation: "Co-Web Development Lead",
        image: "/team/amir.jpg",
        linkedin: "https://www.linkedin.com/in/amir-hasan-web-developer/",
      },
    ],
  },
  {
    id: "cyber",
    title: "Cybersecurity",
    subtitle: "CTFs, security labs, and defensive/offensive skills",
    accent: "#CC484A",
    members: [
      {
        name: "Sameer Ahmad",
        designation: "Cybersecurity Lead",
        image: "/team/sameerahmad.jpg",
        linkedin: "https://www.linkedin.com/in/sameer-abrar",
      },
      {
        name: "Maria Ali",
        designation: "Co-Cybersecurity Lead",
        image: "/team/mariaali.jpg",
        linkedin: "https://www.linkedin.com/in/trynnafindmaria",
      },
    ],
  },
  {
    id: "dsa",
    title: "DSA",
    subtitle: "Competitive programming, contests, and placement prep",
    accent: "#3CA049",
    members: [
      {
        name: "Umaimah Mushtaq",
        designation: "DSA Lead",
        image: "/team/umaimahmushtaq.jpg",
        linkedin: "https://www.linkedin.com/in/umaimah-mushtaq-76a68932a",
      },
      {
        name: "Saurav Singh",
        designation: "DSA Mentor",
        image: "/team/sauravsingh.jpg",
        linkedin: "https://www.linkedin.com/in/saurav-singh-228554281",
      },
    ],
  },
];

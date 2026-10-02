/** Content aligned with the official AMU Computer Science Society page */

export const cssIdentity = {
  fullName: "Computer Science Society (CSS)",
  formerName: "Area of Dominant Coders Club (ADC)",
  affiliation:
    "Faculty of Science, Aligarh Muslim University, Aligarh — Department of Computer Science",
  email: "society.cs@myamu.ac.in",
  address: "Aligarh Muslim University, Aligarh, Uttar Pradesh, India — 202002",
  officialPageUrl:
    "https://www.amu.ac.in/miscellaneous/computer-science-society",
};

export const introductionParagraphs = [
  "The Computer Science Society — CSS (formerly the Area of Dominant Coders Club — ADC) is an initiative of the students of the Department of Computer Science, Aligarh Muslim University, Aligarh. It is a platform to share the knowledge of Computer Science among all interested members of the Faculty of Science.",
  "Inspired by the vision of Sir Syed to create a scientific society, the ADC club was formed in December 2018 and has been consistently working since then. It consists of a team of B.Sc. (Hons.) and MCA students of the University having technical insight and a passion for programming. Here we mentor, guide, share, and learn from each other regarding the latest technology, giving students the much-needed exposure for industrial demands and global trends.",
  "The club received a warm response from the students of the Department of Computer Science. The members of the club are accomplishing various achievements and recognition in the field of Information Technology. In addition to regular informative sessions, the club also organizes workshops, hackathons, and internships at regular intervals.",
] as const;

export const historyMilestones = [
  {
    id: "2018-12",
    period: "December 2018",
    title: "The inception",
    body: [
      "The Area of Dominant Coders Club (ADC) came into existence in 2018. Initially, it involved 27 registered members from B.Sc. (Hons.) Computer Applications I and II Year.",
      "Coordinators from the final year — Mr. Arish Rehman, Mr. Mohammad Areeb, Mr. Mohammad Umair, and Mr. Jaanbaaz Akhtar — mentored, guided, and shared knowledge regarding the latest technology, giving students much-needed exposure to industrial demand and global trends.",
      "Classes were arranged during breaks or in the afternoon to avoid clashes with regular department classes. The vision was to provide a platform for all future students of the department to showcase their skills and present their ideas.",
    ],
  },
  {
    id: "2019-09",
    period: "September 2019",
    title: "The revision",
    body: [
      "With newly assigned Coordinator Miss Noor Fatima and Secretary Mr. Syed Mohib Raza, both from B.Sc. (Hons.) Computer Applications final year, the ADC Club returned in a new form.",
      "B.Sc. and MCA students joined as members and guides; the sphere of ADC’s work spread to the whole Faculty of Science, not only the Department of Computer Science. At that time, the club had more than 129 registered members from the Department itself.",
      "Zerynth, an IoT-based Italian company, encouraged work at ADC and offered its paid software for free to the club. The club organized AMUHacks 1.0 with Microsoft as Strength partner and SmartEdge as Knowledge partner.",
    ],
  },
  {
    id: "2021-03",
    period: "March 2021",
    title: "Recognition as CSS",
    body: [
      "By the efforts of the Club and the Chairperson of the Department of Computer Science, AMU, the club was granted recognition and financial support by the Hon’ble Vice-Chancellor, Aligarh Muslim University.",
      "The club was renamed the Computer Science Society (CSS), marking official university recognition and continued growth of workshops, hackathons, and student-led technical activity.",
    ],
  },
] as const;

export const societyObjectives = [
  "To bring about innovations in the technological sphere.",
  "To learn beyond the classroom level.",
  "To provide consultancy to industries, institutes, and universities.",
  "To instill computer-related technical knowledge in students; they are encouraged to seek help from peers and seniors.",
  "To help students realize their interests at an early level.",
  "To make them aware of the latest trends in the field of Computer Science.",
  "To organize technical events and coding competitions such as workshops, short-term courses, hackathons, webinars, and more.",
  "To invite experts to deliver talks on major technologies.",
  "To conduct sessions to improve soft skills and the overall personality of students.",
  "To explore areas to generate revenue.",
] as const;

export const societyOutcomes = [
  "Better job opportunities and stronger performance in recruitment drives.",
  "Ability to develop applications — websites, apps, machine learning, and IoT-related products.",
  "Confidence to represent the University on national and international platforms.",
  "Access to good internship opportunities.",
  "Contribution to automating manual processes of the University.",
  "Improved communication skills.",
  "A meaningful boost to the CV through society participation.",
] as const;

export const societyOperations = [
  "Every academic year, the committee to run the society is decided by the President of the society.",
  "The committee designs the academic calendar of the society, with event details and tentative dates for the year.",
  "An orientation event is conducted at the beginning of each academic year for newly admitted students.",
  "New students may work under student mentors after interviews with the committee.",
  "Before organizing an event, student members discuss details with teacher mentors.",
  "Before an event, the coordinator and secretary divide responsibilities among student members.",
  "In case of conflict, the matter is presented before the President; their decision is final.",
] as const;

export const facultyPhotoUrls = {
  president: "/faculity/arman.png",
  convener: "/faculity/nadeem.jpg",
} as const;

export const facultyLeadCards = [
  {
    role: "President",
    name: "Prof. Arman Rasool Faridi",
    photo: facultyPhotoUrls.president,
  },
  {
    role: "Convener",
    name: "Dr. Mohammad Nadeem",
    photo: facultyPhotoUrls.convener,
  },
] as const;

export const facultyCommitteeRoles = [
  {
    role: "President",
    name: "Prof. Arman Rasool Faridi",
    photo: facultyPhotoUrls.president,
  },
  { role: "Senior Mentor", name: "Prof. Mohammad Ubaidullah Bokhari" },
  { role: "Mentor", name: "Prof. Aasim Zafar" },
  { role: "Mentor", name: "Prof. Suhel Mustajab" },
  { role: "Mentor", name: "Prof. Swaleha Zubair" },
  { role: "Mentor", name: "Dr. Faisal Anwer" },
  { role: "Mentor", name: "Dr. Mohammad Sajid" },
  {
    role: "Convener",
    name: "Dr. Mohammad Nadeem",
    photo: facultyPhotoUrls.convener,
  },
] as const;

export const studentCommitteeRoles = [
  "Coordinator",
  "Secretary",
  "Senior Student Mentor",
  "Web Development Mentor",
  "Machine Learning Mentor",
  "App Development Mentor",
  "Alumni Mentor",
  "Volunteers",
] as const;

export const convenerProfile = {
  name: "Dr. Mohammad Nadeem",
  title: "Convener & Assistant Professor",
  department: "Department of Computer Science, AMU",
  photo: facultyPhotoUrls.convener,
};

export const amuPortalLinks = [
  { label: "AMU Home", href: "https://www.amu.ac.in/" },
  { label: "Official CSS page", href: cssIdentity.officialPageUrl },
  { label: "Admissions", href: "https://www.amu.ac.in/admissions" },
  { label: "Training & Placement", href: "https://www.amu.ac.in/student-services/training-placement" },
  { label: "Contact AMU", href: "https://www.amu.ac.in/contact-us" },
  { label: "Site Map", href: "https://www.amu.ac.in/site-map" },
] as const;

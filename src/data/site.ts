export const site = {
  name: "Akbar Evatov",
  initials: "AE",
  role: "Software Engineer",
  /** Short value proposition used in the hero and as the meta description. */
  tagline:
    "Software engineer blending mathematical rigor with full-stack craftsmanship.",
  summary:
    "I build full-stack products in Next.js and Python, and I model the messy problems underneath them. Most recently: a shadow-economy scoring platform that placed 2nd nationally at Uzbekistan's AI Hackathon.",
  location: "Tashkent, Uzbekistan",
  availability: "Open to Opportunities",
  email: "a.evatov021@gmail.com",
  url: "https://evatov.uz",
  resumePath: "/akbar-evatov-resume.pdf",
  resumeFileName: "Akbar-Evatov-Resume.pdf",
  socials: {
    github: "https://github.com/akbarevatov",
    linkedin: "https://www.linkedin.com/in/akbarevatov",
    telegram: "https://t.me/akbarevatov",
  },
} as const;

export const navLinks = [
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
] as const;

export type NavLink = (typeof navLinks)[number];

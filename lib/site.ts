import content from "./content.json";

export const portfolio = content;
export type Project = (typeof content.projects)[number];
export const basePath = "/Portfolio";
export const asset = (path: string) =>
  `${basePath}/${path.replace(/^\/+/, "")}`;

export const contact = {
  email: "haydenteh0@gmail.com",
  github: "https://github.com/haydenteh5526",
  linkedin: "https://www.linkedin.com/in/haydenteh/",
  cv: "https://www.canva.com/d/fpEcfoZPNM7Fcmt",
};

// Public paths are relative to public/. Leave optional media empty until ready.
export const media: {
  portrait: string;
  video: string;
  poster: string;
  captions: string;
} = { portrait: "hayden-teh.jpg", video: "", poster: "", captions: "" };

export const skills = [
  {
    title: "Software development",
    items: [
      "Python",
      "Java",
      "TypeScript",
      "JavaScript",
      "React",
      "FastAPI",
      "Flask",
      "React Native",
    ],
  },
  {
    title: "AI and data",
    items: [
      "OCR",
      "Document processing",
      "Hybrid search",
      "SQL",
      "PostgreSQL",
      "MySQL",
      "pgvector",
    ],
  },
  {
    title: "Engineering tools",
    items: ["Git", "GitLab CI", "Docker", "Helm", "Gradle", "Terraform"],
  },
  { title: "Reporting automation", items: ["Jira", "SharePoint", "Power BI"] },
];

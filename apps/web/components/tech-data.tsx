import React from "react";
import {
  SiNextdotjs,
  SiExpress,
  SiDjango,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiPrisma,
  SiGraphql,
  SiFlutter,
  SiAndroid,
  SiDocker,
  SiKubernetes,
  SiLinux,
  SiNginx,
  SiVercel,
  SiDigitalocean,
  SiGithubactions,
  SiPrometheus,
  SiGrafana,
  SiTypescript,
  SiPython,
  SiJavascript,
  SiDart,
  SiFigma,
  SiFramer,
  SiPostman,
  SiGit
} from "react-icons/si";
import { GoGear } from "react-icons/go";
import { FaJava, FaAws } from "react-icons/fa";
import { DiPhotoshop } from "react-icons/di";

export interface TechItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface TechCategory {
  title: string;
  skills: TechItem[];
}

export const techStackCategories: TechCategory[] = [
  {
    title: "FULL-STACK FRAMEWORKS",
    skills: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "Django", icon: SiDjango },
      { name: "FastAPI", icon: SiFastapi }
    ]
  },
  {
    title: "DATABASES, ORMS & API STRUCTURES",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Firebase", icon: SiFirebase },
      { name: "Prisma", icon: SiPrisma },
      { name: "GraphQL", icon: SiGraphql },
      { name: "REST APIs", icon: GoGear }
    ]
  },
  {
    title: "MOBILE ARCHITECTURE",
    skills: [
      { name: "Flutter", icon: SiFlutter },
      { name: "Android", icon: SiAndroid }
    ]
  },
  {
    title: "CLOUD & DEVOPS",
    skills: [
      { name: "Docker", icon: SiDocker },
      { name: "Kubernetes", icon: SiKubernetes },
      { name: "AWS", icon: FaAws },
      { name: "Linux", icon: SiLinux },
      { name: "Nginx", icon: SiNginx },
      { name: "Vercel", icon: SiVercel },
      { name: "DigitalOcean", icon: SiDigitalocean },
      { name: "GitHub Actions", icon: SiGithubactions },
      { name: "Prometheus", icon: SiPrometheus },
      { name: "Grafana", icon: SiGrafana }
    ]
  },
  {
    title: "LANGUAGES",
    skills: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "Python", icon: SiPython },
      { name: "Java", icon: FaJava },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Dart", icon: SiDart }
    ]
  },
  {
    title: "DESIGN & TOOLS",
    skills: [
      { name: "Figma", icon: SiFigma },
      { name: "Framer", icon: SiFramer },
      { name: "Photoshop", icon: DiPhotoshop },
      { name: "Postman", icon: SiPostman },
      { name: "Git", icon: SiGit }
    ]
  }
];

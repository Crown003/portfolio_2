"use server";

import { db } from "@repo/database";
import { revalidatePath } from "next/cache";

export async function getExperiences() {
  return await db.experience.findMany({
    orderBy: {
      order: "asc",
    },
  });
}

export async function createExperience(data: any) {
  await db.experience.create({
    data: {
      company: data.company,
      totalDuration: data.totalDuration,
      location: data.location,
      logoInitial: data.logoInitial,
      roles: data.roles,
      order: data.order || 0,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/experience");
}

export async function updateExperience(id: string, data: any) {
  await db.experience.update({
    where: { id },
    data: {
      company: data.company,
      totalDuration: data.totalDuration,
      location: data.location,
      logoInitial: data.logoInitial,
      roles: data.roles,
      order: data.order,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/experience");
}

export async function deleteExperience(id: string) {
  await db.experience.delete({
    where: { id },
  });
  revalidatePath("/");
  revalidatePath("/admin/experience");
}

// Helper to seed initial data
export async function seedExperiences() {
  const existing = await db.experience.count();
  if (existing > 0) return;

  const initialData = [
    {
      company: "TMG Esports",
      totalDuration: "3 yrs",
      location: "Remote",
      logoInitial: "T",
      order: 1,
      roles: [
        {
          title: "Technical Consultant",
          type: "Part-time",
          duration: "Oct 2022 - Sep 2025 · 3 yrs",
          location: "New Delhi, India",
          skills: [{ name: "Python (Programming Language)" }],
        },
        {
          title: "Graphic Designer",
          type: "Freelance",
          duration: "Feb 2024 - May 2024 · 4 mos",
          location: "New Delhi",
          skills: [{ name: "Online Graphics and Image Design" }],
          media: {
            type: "image",
            src: "/TMGSPONSERSSHIPPROGRAM.png",
            alt: "TMG Sponsorship Program",
            caption: "Their sponsorship program pack.(message for more samples)",
          },
        },
      ],
    },
    {
      company: "Hacknovate 7.0",
      totalDuration: "3 mos",
      location: "Science and Technology",
      logoInitial: "H",
      order: 2,
      roles: [
        {
          title: "Organizing Team - Tech Dept.",
          type: "Volunteer",
          duration: "Feb 2026 - Apr 2026 · 3 mos",
          location: "Science and Technology",
          description: "As part of the Technical Organizing Team for Hacknovate 7.0, I managed the event's technical infrastructure and oversaw various tech-related operations to ensure a smooth hackathon experience.",
          skills: [{ name: "Technical Infrastructure" }, { name: "Event Management" }],
          media: {
            type: "image",
            src: "/placeholder-certificate.png",
            alt: "Certificate of Recognition",
            caption: "Organizing Team",
          },
        },
      ],
    },
    {
      company: "TTFA Academy",
      totalDuration: "2 mos",
      location: "Remote",
      logoInitial: "F",
      order: 3,
      roles: [
        {
          title: "Frontend Web Developer",
          type: "Part-time",
          duration: "Mar 2024 - Apr 2024 · 2 mos",
          location: "Remote",
          description:
            "Worked on developing the TTFA Academy website using Next.js, focusing on building a modern, responsive, and performance-optimized web platform. Implemented clean UI layouts, structured routing, and...",
          skills: [{ name: "Next.js, React.js and +1 skill" }],
        },
      ],
    },
    {
      company: "Freelance Client Projects",
      totalDuration: "1 yr+",
      location: "Remote",
      logoInitial: "F",
      order: 4,
      roles: [
        {
          title: "Freelance Developer & Designer",
          type: "Self-employed",
          duration: "Jan 2023 - Present",
          location: "Remote",
          description:
            "Worked on various client projects delivering high-quality web applications, responsive UIs, and robust backend systems.",
          skills: [{ name: "Full-Stack Development" }, { name: "UI/UX Design" }],
        },
      ],
    },
  ];

  for (const exp of initialData) {
    await db.experience.create({
      data: {
        company: exp.company,
        totalDuration: exp.totalDuration,
        location: exp.location,
        logoInitial: exp.logoInitial,
        order: exp.order,
        roles: exp.roles,
      },
    });
  }
}

import { db } from "@repo/database";

async function main() {
  // Check if they already exist
  const existing1 = await db.project.findFirst({ where: { title: "POS System" }});
  if (!existing1) {
    await db.project.create({
      data: {
        title: "POS System",
        description: "Smart billing & checkout system for stalls and small businesses. Serving 2 businesses in NCR.",
        imageUrl: "/pos-system.jpg",
        tags: ["Flutter", "Firebase", "Android", "Closed Source"],
        showOnHomepage: true,
      }
    });
    console.log("Added POS System");
  }

  const existing2 = await db.project.findFirst({ where: { title: "KD Home Tutorial" }});
  if (!existing2) {
    await db.project.create({
      data: {
        title: "KD Home Tutorial",
        description: "An educational platform and tutoring service live website.",
        liveUrl: "https://www.kdhometutorial.in/",
        tags: ["Web", "Education", "React"],
        showOnHomepage: true,
      }
    });
    console.log("Added KD Home Tutorial");
  }

  console.log("Database seeded successfully.");
}

main()
  .catch(console.error)
  .finally(() => process.exit(0));

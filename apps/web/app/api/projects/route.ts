import { NextResponse } from "next/server";
import { db } from "@repo/database";

export async function GET() {
  try {
    const projects = await db.project.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        blogPost: true,
      }
    });
    return NextResponse.json(projects);
  } catch (error: any) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, content, imageUrl, liveUrl, githubUrl, tags, showOnHomepage, blogPostId } = body;
    
    if (!title || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const project = await db.project.create({
      data: {
        title,
        description,
        content,
        imageUrl,
        liveUrl,
        githubUrl,
        tags: tags || [],
        showOnHomepage: !!showOnHomepage,
        blogPostId: blogPostId || null
      }
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create project:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

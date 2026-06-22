import { NextResponse } from "next/server";
import { db } from "@repo/database";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    const project = await db.project.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        content: body.content,
        imageUrl: body.imageUrl,
        liveUrl: body.liveUrl,
        githubUrl: body.githubUrl,
        tags: body.tags,
        showOnHomepage: body.showOnHomepage,
        blogPostId: body.blogPostId || null
      }
    });

    return NextResponse.json(project);
  } catch (error: any) {
    console.error("Failed to update project:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to delete project:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

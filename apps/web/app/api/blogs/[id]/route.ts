import { NextResponse } from "next/server";
import { db } from "@repo/database";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      title,
      excerpt,
      content,
      category,
      readTime,
      tags,
      featured,
      thumbnailUrl,
      projectSummary,
      projectApproach,
    } = body;

    if (!title || !excerpt || !content || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const post = await db.post.update({
      where: { id },
      data: {
        title,
        excerpt,
        content,
        category,
        readTime: readTime || "3 min read",
        tags: tags || [],
        featured: !!featured,
        thumbnailUrl,
        projectSummary,
        projectApproach,
      },
    });

    return NextResponse.json(post);
  } catch (error: any) {
    console.error("Failed to update post:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.post.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error: any) {
    console.error("Failed to delete post:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { db } from "@repo/database";

export async function GET() {
  try {
    const posts = await db.post.findMany({
      include: {
        _count: {
          select: { comments: true, likes: true }
        }
      },
      orderBy: {
        publishedAt: "desc"
      }
    });
    return NextResponse.json(posts);
  } catch (error: any) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
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
      projectApproach
    } = body;
    
    if (!title || !excerpt || !content || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const post = await db.post.create({
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
        projectApproach
      }
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create post:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

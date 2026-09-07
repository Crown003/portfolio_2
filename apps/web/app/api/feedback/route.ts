import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@repo/database";

export async function GET() {
  try {
    const feedback = await db.testimonial.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        project: true
      }
    });
    return NextResponse.json(feedback);
  } catch (error: any) {
    console.error("Failed to fetch feedback:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clientName, clientRole, clientAvatar, content, projectId, rating } = body;
    
    if (!clientName || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const testimonial = await db.testimonial.create({
      data: {
        clientName,
        clientRole: clientRole || null,
        clientAvatar: clientAvatar || null,
        content,
        projectId: projectId || null,
        rating: rating !== undefined ? Number(rating) : 5,
      }
    });

    revalidatePath("/admin/feedback");

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error: any) {
    console.error("Failed to submit feedback:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

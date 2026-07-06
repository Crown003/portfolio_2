import { NextResponse } from "next/server";
import { db } from "@repo/database";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    // We only update showOnHome for now
    const { showOnHome } = body;

    const testimonial = await db.testimonial.update({
      where: { id },
      data: { showOnHome }
    });

    return NextResponse.json(testimonial);
  } catch (error: any) {
    console.error("Failed to update feedback:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await db.testimonial.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to delete feedback:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

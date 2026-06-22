import { NextResponse } from "next/server";
import { db } from "@repo/database";

export async function GET() {
  try {
    const messages = await db.message.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(messages);
  } catch (error: any) {
    console.error("Failed to fetch messages:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, content } = body;
    
    if (!name || !email || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const message = await db.message.create({
      data: {
        name,
        email,
        content
      }
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create message:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

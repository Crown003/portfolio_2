"use server";

import { db } from "@repo/database";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function addComment(postId: string, content: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in to comment");
  }

  const user = await currentUser();
  const authorName = user?.firstName 
    ? `${user.firstName} ${user.lastName || ""}`.trim() 
    : user?.username || "Anonymous User";

  await db.comment.create({
    data: {
      postId,
      content,
      authorName,
    },
  });

  revalidatePath(`/blogs/${postId}`);
  return { success: true };
}

export async function toggleLike(postId: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in to like");
  }

  // Check if user already liked this post
  // We use ipAddress to store userId to avoid needing a database migration
  const existingLike = await db.like.findFirst({
    where: {
      postId,
      ipAddress: userId, 
    },
  });

  let isLiked = false;

  if (existingLike) {
    await db.like.delete({
      where: { id: existingLike.id },
    });
    isLiked = false;
  } else {
    await db.like.create({
      data: {
        postId,
        ipAddress: userId,
      },
    });
    isLiked = true;
  }

  revalidatePath(`/blogs/${postId}`);
  return { success: true, isLiked };
}

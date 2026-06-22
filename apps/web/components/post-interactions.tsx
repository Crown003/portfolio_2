"use client";

import React, { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@clerk/nextjs";
import { FiHeart, FiMessageCircle, FiSend } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { toggleLike, addComment } from "../app/actions";
import { SignInButton } from "@clerk/nextjs";

type CommentType = {
  id: string;
  authorName: string;
  content: string;
  createdAt: Date;
};

interface PostInteractionsProps {
  postId: string;
  initialLikesCount: number;
  initialHasLiked: boolean;
  initialComments: CommentType[];
}

export function PostInteractions({
  postId,
  initialLikesCount,
  initialHasLiked,
  initialComments,
}: PostInteractionsProps) {
  const { isSignedIn } = useAuth();
  
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [hasLiked, setHasLiked] = useState(initialHasLiked);
  const [isLikePending, startLikeTransition] = useTransition();

  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isCommentPending, startCommentTransition] = useTransition();

  const handleLike = () => {
    if (!isSignedIn) return;

    // Optimistic update
    const newHasLiked = !hasLiked;
    setHasLiked(newHasLiked);
    setLikesCount((prev) => (newHasLiked ? prev + 1 : prev - 1));

    startLikeTransition(async () => {
      try {
        const res = await toggleLike(postId);
        // Sync with actual result if needed
        if (res.isLiked !== newHasLiked) {
          setHasLiked(res.isLiked);
          setLikesCount((prev) => (res.isLiked ? prev + 1 : prev - 1));
        }
      } catch (error) {
        // Revert optimistic update on error
        setHasLiked(!newHasLiked);
        setLikesCount((prev) => (!newHasLiked ? prev + 1 : prev - 1));
        console.error("Failed to toggle like", error);
      }
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn || !newComment.trim()) return;

    const content = newComment.trim();
    setNewComment("");

    // Optimistic comment addition
    const optimisticComment: CommentType = {
      id: Math.random().toString(),
      authorName: "You",
      content,
      createdAt: new Date(),
    };

    setComments((prev) => [optimisticComment, ...prev]);

    startCommentTransition(async () => {
      try {
        await addComment(postId, content);
      } catch (error) {
        // Revert on error
        setComments((prev) => prev.filter((c) => c.id !== optimisticComment.id));
        setNewComment(content);
        console.error("Failed to add comment", error);
      }
    });
  };

  return (
    <div className="w-full mt-12 pt-8 border-t border-border/40 font-sans">
      <div className="flex items-center gap-6 mb-8">
        {/* Like Button */}
        {isSignedIn ? (
          <button
            onClick={handleLike}
            disabled={isLikePending}
            className="group flex items-center gap-2 text-slate-500 hover:text-rose-500 transition-colors focus:outline-none"
          >
            <motion.div
              whileTap={{ scale: 0.8 }}
              animate={hasLiked ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {hasLiked ? (
                <FaHeart className="w-6 h-6 text-rose-500" />
              ) : (
                <FiHeart className="w-6 h-6 group-hover:text-rose-500" />
              )}
            </motion.div>
            <span className="font-semibold text-lg">{likesCount}</span>
          </button>
        ) : (
          <SignInButton mode="modal">
            <button className="group flex items-center gap-2 text-slate-500 hover:text-sky-500 transition-colors focus:outline-none">
              <FiHeart className="w-6 h-6" />
              <span className="font-semibold text-lg">{likesCount}</span>
            </button>
          </SignInButton>
        )}

        {/* Comment Count Indicator */}
        <div className="flex items-center gap-2 text-slate-500">
          <FiMessageCircle className="w-6 h-6" />
          <span className="font-semibold text-lg">{comments.length}</span>
        </div>
      </div>

      {/* Comments Section */}
      <div className="flex flex-col gap-8">
        <h3 className="text-xl font-bold font-display text-foreground">Comments</h3>

        {/* Comment Form */}
        {isSignedIn ? (
          <form onSubmit={handleCommentSubmit} className="relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add to the discussion..."
              className="w-full min-h-[100px] p-4 pr-12 rounded-xl bg-slate-500/5 border border-border/60 focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 outline-none resize-none transition-all text-sm text-foreground placeholder:text-slate-400"
              disabled={isCommentPending}
            />
            <button
              type="submit"
              disabled={!newComment.trim() || isCommentPending}
              className="absolute bottom-4 right-4 p-2 text-white bg-sky-500 rounded-lg hover:bg-sky-600 disabled:opacity-50 disabled:hover:bg-sky-500 transition-colors"
            >
              <FiSend className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="p-6 rounded-xl bg-slate-500/5 border border-border/60 flex flex-col items-center justify-center text-center gap-3">
            <FiMessageCircle className="w-8 h-8 text-slate-400" />
            <p className="text-sm text-slate-500">Sign in to leave a comment and join the discussion.</p>
            <SignInButton mode="modal">
              <button className="px-4 py-2 mt-2 text-sm font-semibold text-white bg-foreground/90 hover:bg-foreground rounded-lg transition-colors">
                Sign In
              </button>
            </SignInButton>
          </div>
        )}

        {/* Comments List */}
        <div className="flex flex-col gap-6">
          <AnimatePresence initial={false}>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-2 p-4 rounded-xl border border-border/40 bg-card/20 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">
                      {comment.authorName}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }).format(new Date(comment.createdAt))}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </motion.div>
              ))
            ) : (
              <p className="text-sm text-slate-500 italic">No comments yet. Be the first to share your thoughts!</p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

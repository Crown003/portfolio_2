"use client";

import React, { useState, useEffect } from "react";
import { FiTrash2, FiMail, FiCalendar } from "react-icons/fi";
import { Skeleton } from "../../../components/skeleton";

type Message = {
  id: string;
  name: string;
  email: string;
  content: string;
  createdAt: string;
};

function MessageCardSkeleton() {
  return (
    <div className="p-6 border border-border bg-card/45 backdrop-blur-sm rounded-2xl flex flex-col gap-4 relative shadow-sm overflow-hidden">
      <Skeleton className="absolute top-6 right-6 w-5 h-5 rounded-md" />
      <div className="flex items-start sm:items-center gap-4">
        <Skeleton className="w-10 h-10 rounded-full shrink-0" />
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="w-32 h-4" />
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <Skeleton className="w-36 h-3" />
            <Skeleton className="w-24 h-3" />
          </div>
        </div>
      </div>
      <Skeleton className="w-full h-20 rounded-xl" />
    </div>
  );
}

export default function MessagesManager() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const res = await fetch("/api/messages");
      if (res.ok) setMessages(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) setMessages(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-6 font-sans">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold font-display text-foreground">Contact Messages</h1>
        <p className="text-sm text-slate-500">View and manage messages from your website's contact form.</p>
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          <MessageCardSkeleton />
          <MessageCardSkeleton />
          <MessageCardSkeleton />
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-20 text-slate-500 border border-border border-dashed rounded-2xl bg-card/20 text-sm font-medium">No messages found.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map(msg => (
            <div key={msg.id} className="p-6 border border-border bg-card/45 backdrop-blur-sm rounded-2xl flex flex-col gap-4 relative shadow-sm">
              <button onClick={() => handleDelete(msg.id)} className="absolute top-6 right-6 text-slate-400 hover:text-rose-500 transition-colors p-1"><FiTrash2 /></button>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500 font-bold text-lg shrink-0 border border-sky-500/20">
                  {msg.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">{msg.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 font-mono">
                    <span className="flex items-center gap-1.5"><FiMail /> {msg.email}</span>
                    <span className="flex items-center gap-1.5"><FiCalendar /> {new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-slate-500/5 rounded-xl border border-border/50 text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

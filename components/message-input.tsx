"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Using Input for simplicity, could be Textarea
import { SendHorizonal } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  isSending?: boolean; // Optional prop to show sending state
}

export default function MessageInput({ onSendMessage, isSending }: MessageInputProps) {
  const [messageContent, setMessageContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageContent.trim()) return;
    onSendMessage(messageContent.trim());
    setMessageContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t bg-background p-4">
      <Input
        type="text"
        placeholder="Type your message..."
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        className="flex-grow"
        disabled={isSending}
      />
      <Button type="submit" size="icon" disabled={isSending || !messageContent.trim()}>
        <SendHorizonal className="h-5 w-5" />
        <span className="sr-only">Send Message</span>
      </Button>
    </form>
  );
}

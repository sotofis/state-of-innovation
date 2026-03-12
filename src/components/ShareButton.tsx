"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface ShareButtonProps {
  title: string;
  text?: string;
}

export default function ShareButton({ title, text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text: text ?? title, url });
      } catch {
        // user cancelled — no-op
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl border transition-all hover:scale-[1.03] active:scale-[0.97]"
      style={{
        background: "rgba(255,255,255,0.1)",
        borderColor: "rgba(255,255,255,0.2)",
        color: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(8px)",
      }}
      title="Share episode"
    >
      {copied ? <Check size={14} /> : <Share2 size={14} />}
      {copied ? "Copied!" : "Share"}
    </button>
  );
}

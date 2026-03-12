"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, Mic, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Episode } from "@/types/episode";

interface EpisodeCardProps {
  episode: Episode;
  locale: string;
  featured?: boolean;
  index?: number;
}

function formatDate(pubDate: string): string {
  try {
    return new Date(pubDate).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return pubDate;
  }
}

function formatDuration(d: string): string {
  const parts = d.split(":");
  if (parts.length === 3) {
    const h = parseInt(parts[0]);
    const m = parseInt(parts[1]);
    return h > 0 ? `${h}h ${m}m` : `${m} min`;
  }
  return d;
}

export default function EpisodeCard({
  episode,
  locale,
  index = 0,
}: EpisodeCardProps) {
  const href = `/${locale}/podcast/${episode.slug}`;
  const guestName = episode.guests[0]?.name ?? null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.45,
        delay: (index % 4) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <Link
        href={href}
        className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-[var(--border)] transition-all duration-300 hover:-translate-y-1 shadow-card hover:shadow-card-hover"
      >
        {/* Artwork */}
        <div className="relative aspect-square overflow-hidden">
          {episode.image ? (
            <Image
              src={episode.image}
              alt={episode.title}
              fill
              sizes="280px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: "var(--bg-section)" }}
            >
              <Mic size={36} style={{ color: "var(--text-faint)" }} />
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-[var(--blue)] opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300" />

          {/* Episode badge */}
          {episode.episodeNumber > 0 && (
            <div
              className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-lg shadow-sm"
              style={{ background: "var(--blue)", color: "white" }}
            >
              #{episode.episodeNumber}
            </div>
          )}

          {/* Arrow reveal on hover */}
          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md">
            <ArrowRight size={14} style={{ color: "var(--blue)" }} />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 p-4 flex-1">
          {guestName && (
            <div
              className="flex items-center gap-1.5 text-xs font-semibold"
              style={{ color: "var(--blue)" }}
            >
              <Mic size={10} />
              {guestName}
            </div>
          )}

          <h3
            className="text-sm font-semibold leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-[var(--blue)]"
            style={{ color: "var(--text)" }}
          >
            {episode.title}
          </h3>

          <div
            className="flex items-center gap-3 mt-auto pt-2 text-xs"
            style={{ color: "var(--text-faint)" }}
          >
            <span className="flex items-center gap-1">
              <Calendar size={10} />
              {formatDate(episode.pubDate)}
            </span>
            {episode.duration && (
              <span className="flex items-center gap-1">
                <Clock size={10} />
                {formatDuration(episode.duration)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

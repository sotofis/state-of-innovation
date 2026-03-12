"use client";

import { useState, useEffect, use } from "react";
import { useTranslations } from "next-intl";
import { Search, Mic } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import EpisodeCard from "@/components/EpisodeCard";
import type { Episode } from "@/types/episode";

export default function PodcastPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const t = useTranslations("podcast");
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/episodes")
      .then((r) => r.json())
      .then((data) => { setEpisodes(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = episodes.filter((ep) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      ep.title.toLowerCase().includes(q) ||
      ep.guests.some((g) => g.name.toLowerCase().includes(q))
    );
  });

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: "var(--bg)" }}
      >
        {/* Blue top gradient */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-100"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(38,77,90,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="eyebrow mb-4"
                style={{ color: "var(--blue)" }}
              >
                {t("heroEyebrow")}
              </p>
              <h1
                className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight"
                style={{ color: "var(--text)" }}
              >
                {t("heroTitle")}
              </h1>
              <p
                className="text-xl max-w-xl leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {t("heroSub")}
              </p>
            </motion.div>

            {/* Show artwork */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0"
            >
              <div
                className="relative w-52 h-52 rounded-3xl overflow-hidden border-2 shadow-[0_20px_60px_rgba(38,77,90,0.2)]"
                style={{ borderColor: "rgba(38,77,90,0.15)" }}
              >
                <Image
                  src="https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo/40461767/40461767-1707127783562-061bacdf197c1.jpg"
                  alt="The State of Innovation"
                  fill
                  sizes="208px"
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Episodes */}
      <section
        className="pb-32"
        style={{ background: "var(--bg-soft)" }}
      >
        <div className="max-w-6xl mx-auto px-6 pt-10">
          {/* Search + count */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-10">
            <div className="relative flex-1 max-w-sm">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--text-faint)" }}
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm focus:outline-none transition-all"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--blue)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
              />
            </div>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--text-faint)" }}
            >
              {filtered.length} {t("episodesCount")}
            </p>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden border"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="aspect-square skeleton" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 skeleton rounded w-1/2" />
                    <div className="h-4 skeleton rounded w-3/4" />
                    <div className="h-3 skeleton rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No results */}
          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: "var(--blue-light)" }}
              >
                <Mic size={28} style={{ color: "var(--blue)" }} />
              </div>
              <p style={{ color: "var(--text-muted)" }}>{t("noResults")}</p>
            </div>
          )}

          {/* Grid */}
          {!loading && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((ep, i) => (
                <EpisodeCard
                  key={ep.guid}
                  episode={ep}
                  locale={locale}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

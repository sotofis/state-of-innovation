import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Linkedin, ArrowLeft, Clock, Calendar, ExternalLink } from "lucide-react";
import { fetchEpisodes, fetchEpisodeBySlug } from "@/lib/rss";
import { extractPalette } from "@/lib/colors";
import AnimateIn from "@/components/AnimateIn";

export async function generateStaticParams() {
  const episodes = await fetchEpisodes().catch(() => []);
  return episodes.map((ep) => ({ slug: ep.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const episode = await fetchEpisodeBySlug(slug);
  if (!episode) return {};
  return {
    title: episode.title,
    description: episode.description.replace(/<[^>]*>/g, "").slice(0, 160),
  };
}

export const revalidate = 3600;

function formatDate(pubDate: string, locale: string): string {
  try {
    return new Date(pubDate).toLocaleDateString(
      locale === "de" ? "de-AT" : "en-GB",
      { day: "numeric", month: "long", year: "numeric" }
    );
  } catch {
    return pubDate;
  }
}

/** Strip empty/whitespace-only paragraphs and normalise &nbsp; */
function sanitizeHtml(html: string): string {
  return html
    .replace(/<p>(\s|&nbsp;|\u00a0|<br\s*\/?>)*<\/p>/gi, "") // empty <p> tags
    .replace(/\u00a0{2,}/g, " ")                               // double nbsp → single space
    .trim();
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const episode = await fetchEpisodeBySlug(slug);
  if (!episode) notFound();

  const t = await getTranslations({ locale, namespace: "episode" });

  // Extract colour palette from artwork (cached via fetch cache)
  const palette = await extractPalette(episode.image);

  const cleanDescription = sanitizeHtml(episode.description);

  const heroTextColor = palette.heroText === "white"
    ? "rgba(255,255,255,0.9)"
    : "rgba(15,23,42,0.9)";
  const heroMutedColor = palette.heroText === "white"
    ? "rgba(255,255,255,0.55)"
    : "rgba(15,23,42,0.55)";

  return (
    <>
      {/* ── Colour Hero ──────────────────────────────────── */}
      <section
        className="relative pt-28 pb-20 overflow-hidden"
        style={{ background: palette.heroBg }}
      >
        {/* Blurred artwork wallpaper */}
        {episode.image && (
          <div
            aria-hidden
            className="absolute inset-0 scale-110"
            style={{ filter: "blur(80px)", opacity: 0.35 }}
          >
            <Image
              src={episode.image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Gradient overlay — darkens top, fades at bottom */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to bottom,
              ${palette.heroBg} 0%,
              rgba(0,0,0,0.2) 40%,
              ${palette.heroBg}CC 75%,
              ${palette.heroBg} 100%
            )`,
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6">
          {/* Back link */}
          <Link
            href={`/${locale}/podcast`}
            className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-opacity hover:opacity-70"
            style={{ color: heroMutedColor }}
          >
            <ArrowLeft size={14} />
            {t("back")}
          </Link>

          {/* Main header */}
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            {/* Artwork */}
            {episode.image && (
              <div
                className="flex-shrink-0 w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              >
                <Image
                  src={episode.image}
                  alt={episode.title}
                  width={208}
                  height={208}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            )}

            {/* Episode info */}
            <div className="flex flex-col gap-3 justify-end pb-2">
              {episode.episodeNumber > 0 && (
                <span
                  className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full self-start"
                  style={{
                    background: palette.accentLight,
                    color: palette.accent,
                  }}
                >
                  {t("episodeLabel")} #{episode.episodeNumber}
                </span>
              )}

              <h1
                className="text-2xl sm:text-3xl font-bold leading-tight"
                style={{ color: heroTextColor }}
              >
                {episode.title}
              </h1>

              {episode.guests[0] && (
                <p className="text-base font-medium" style={{ color: heroMutedColor }}>
                  {t("with")} {episode.guests[0].name}
                </p>
              )}

              <div
                className="flex flex-wrap gap-4 text-sm"
                style={{ color: heroMutedColor }}
              >
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} />
                  {formatDate(episode.pubDate, locale)}
                </span>
                {episode.duration && (
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    {episode.duration}
                  </span>
                )}
              </div>

              <a
                href={episode.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 text-sm font-bold rounded-xl self-start transition-all hover:scale-[1.03] hover:brightness-110 shadow-lg"
                style={{
                  background: "#1DB954",
                  color: "white",
                  boxShadow: "0 4px 16px rgba(29,185,84,0.4)",
                }}
              >
                <ExternalLink size={14} />
                {t("listenSpotify")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────── */}
      <div
        className="max-w-4xl mx-auto px-6 py-14"
        style={{ background: "var(--bg)" }}
      >
        {/* Description */}
        <AnimateIn>
          <div
            className="episode-description prose max-w-none mb-14"
            dangerouslySetInnerHTML={{ __html: cleanDescription }}
          />
        </AnimateIn>

        {/* Guest + Host cards */}
        <AnimateIn delay={0.1}>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-10 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            {episode.guests.length > 0 && (
              <div
                className="rounded-2xl border p-6 shadow-card"
                style={{
                  background: "var(--bg-soft)",
                  borderColor: "var(--border)",
                  borderTopColor: palette.accent,
                  borderTopWidth: "3px",
                }}
              >
                <p
                  className="eyebrow mb-4"
                  style={{ color: "var(--text-faint)" }}
                >
                  {t("guest")}
                </p>
                {episode.guests.map((guest) => (
                  <div key={guest.linkedinUrl} className="flex flex-col gap-2">
                    <p
                      className="font-semibold"
                      style={{ color: "var(--text)" }}
                    >
                      {guest.name}
                    </p>
                    <a
                      href={guest.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                      style={{ color: palette.accent }}
                    >
                      <Linkedin size={14} />
                      {t("linkedIn")}
                    </a>
                  </div>
                ))}
              </div>
            )}

            <div
              className="rounded-2xl border p-6 shadow-card"
              style={{
                background: "var(--bg-soft)",
                borderColor: "var(--border)",
                borderTopColor: "var(--blue)",
                borderTopWidth: "3px",
              }}
            >
              <p
                className="eyebrow mb-4"
                style={{ color: "var(--text-faint)" }}
              >
                {t("host")}
              </p>
              <p
                className="font-semibold mb-2"
                style={{ color: "var(--text)" }}
              >
                Martin Pattera
              </p>
              <a
                href="https://www.linkedin.com/in/martinpattera/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                style={{ color: "var(--blue)" }}
              >
                <Linkedin size={14} />
                {t("linkedIn")}
              </a>
            </div>
          </div>
        </AnimateIn>

        {/* Bottom back link */}
        <div className="mt-14 pt-10 border-t" style={{ borderColor: "var(--border)" }}>
          <Link
            href={`/${locale}/podcast`}
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:gap-3"
            style={{ color: "var(--blue)" }}
          >
            <ArrowLeft size={14} />
            {t("back")}
          </Link>
        </div>
      </div>
    </>
  );
}

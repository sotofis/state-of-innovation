import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  Mic,
  ChevronRight,
  ArrowRight,
  Linkedin,
  Target,
  Zap,
  Globe,
} from "lucide-react";
import { fetchEpisodes } from "@/lib/rss";
import EpisodeCard from "@/components/EpisodeCard";
import AnimateIn, { StaggerIn, StaggerChild } from "@/components/AnimateIn";
import CountUp from "@/components/CountUp";
import ParallaxHero from "@/components/ParallaxHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: "The State of Innovation — Martin Pattera",
    description: t("heroSub"),
  };
}

export const revalidate = 3600;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const allEpisodes = await fetchEpisodes().catch(() => []);
  const latestEpisodes = allEpisodes.slice(0, 3);

  const stats = [
    { value: 49, suffix: "+", label: t("statsEpisodes"), icon: Mic },
    { value: 20, suffix: "+", label: t("statsYears"), icon: Target },
    { value: 50, suffix: "+", label: t("statsClients"), icon: Globe },
    { value: 10, suffix: "+", label: t("statsCountries"), icon: Zap },
  ];

  const tk = await getTranslations({ locale, namespace: "keynote" });
  const teachingItems = [
    tk("teaching1"), tk("teaching2"), tk("teaching3"),
    tk("teaching4"), tk("teaching5"), tk("teaching6"),
  ];

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <ParallaxHero locale={locale} />

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="relative z-10 -mt-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-[0_8px_60px_rgba(15,23,42,0.10)] border border-[var(--border)] p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <AnimateIn key={s.label} delay={i * 0.08} direction="up">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-1"
                      style={{ background: "var(--blue-light)" }}
                    >
                      <Icon size={18} style={{ color: "var(--blue)" }} />
                    </div>
                    <div
                      className="text-3xl font-extrabold tabular-nums"
                      style={{ color: "var(--blue)" }}
                    >
                      <CountUp end={s.value} suffix={s.suffix} />
                    </div>
                    <div
                      className="text-xs font-medium"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {s.label}
                    </div>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────── */}
      <section
        className="py-28"
        style={{ background: "var(--bg)" }}
      >
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimateIn direction="left">
            <div>
              <p
                className="eyebrow mb-4"
                style={{ color: "var(--blue)" }}
              >
                {t("aboutEyebrow")}
              </p>
              <h2
                className="text-4xl font-bold mb-6 leading-tight"
                style={{ color: "var(--text)" }}
              >
                {t("aboutTitle")}
              </h2>
              <div
                className="space-y-4 text-base leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                <p>{t("aboutBody1")}</p>
                <p>{t("aboutBody2")}</p>
                <p>{t("aboutBody3")}</p>
              </div>
              <a
                href="https://www.linkedin.com/in/martinpattera/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 border-2 rounded-xl text-sm font-semibold transition-all hover:shadow-[0_4px_16px_rgba(37,99,235,0.2)] hover:scale-[1.02]"
                style={{
                  borderColor: "var(--blue)",
                  color: "var(--blue)",
                }}
              >
                <Linkedin size={16} />
                {t("aboutLinkedIn")}
              </a>
            </div>
          </AnimateIn>

          <AnimateIn direction="right" delay={0.1}>
            <div
              className="rounded-3xl p-8 border"
              style={{
                background: "var(--bg-soft)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "var(--blue-light)" }}
                >
                  <Target size={16} style={{ color: "var(--blue)" }} />
                </div>
                <h3
                  className="font-bold"
                  style={{ color: "var(--text)" }}
                >
                  {t("teachingTitle")}
                </h3>
              </div>
              <ul className="space-y-3.5">
                {teachingItems.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span
                      className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: "var(--blue)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── LATEST EPISODES ───────────────────────────────── */}
      <section
        className="py-28"
        style={{ background: "var(--bg-section)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <AnimateIn>
            <div className="flex items-end justify-between mb-14">
              <div>
                <p
                  className="eyebrow mb-3"
                  style={{ color: "var(--blue)" }}
                >
                  {t("latestTitle")}
                </p>
                <h2
                  className="text-4xl font-bold"
                  style={{ color: "var(--text)" }}
                >
                  {t("latestSub")}
                </h2>
              </div>
              <Link
                href={`/${locale}/podcast`}
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold transition-colors hover:gap-2.5"
                style={{ color: "var(--blue)" }}
              >
                {t("allEpisodes")}
                <ArrowRight size={14} />
              </Link>
            </div>
          </AnimateIn>

          {latestEpisodes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestEpisodes.map((ep, i) => (
                <EpisodeCard
                  key={ep.guid}
                  episode={ep}
                  locale={locale}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--text-muted)" }}>{t("loadingEpisodes")}</p>
          )}

          <div className="flex sm:hidden mt-8 justify-center">
            <Link
              href={`/${locale}/podcast`}
              className="text-sm font-semibold"
              style={{ color: "var(--blue)" }}
            >
              {t("allEpisodes")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── KEYNOTE TEASER ────────────────────────────────── */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: "var(--bg-dark)" }}
      >
        {/* Background glow blobs */}
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: "var(--blue)" }}
        />
        <div
          aria-hidden
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{ background: "var(--gold)" }}
        />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateIn direction="left">
              <p
                className="eyebrow mb-4"
                style={{ color: "var(--gold)" }}
              >
                {t("keynoteTeaserEyebrow")}
              </p>
              <h2
                className="text-4xl sm:text-5xl font-bold mb-6 leading-tight text-white"
              >
                {t("keynoteTeaserTitle")}
              </h2>
              <p
                className="text-lg mb-10 leading-relaxed"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {t("keynoteTeaserBody")}
              </p>
              <Link
                href={`/${locale}/keynote`}
                className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-2xl text-base transition-all hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(245,158,11,0.4)] active:scale-[0.98]"
                style={{ background: "var(--gold)", color: "#0F172A" }}
              >
                {t("keynoteTeaserBtn")}
                <ArrowRight size={18} />
              </Link>
            </AnimateIn>

            <AnimateIn direction="right" delay={0.1}>
              <StaggerIn
                className="grid grid-cols-2 gap-4"
                stagger={0.1}
                delayStart={0.2}
              >
                {[
                  { title: t("teaserCard1Title"), body: t("teaserCard1Body") },
                  { title: t("teaserCard2Title"), body: t("teaserCard2Body") },
                  { title: t("teaserCard3Title"), body: t("teaserCard3Body") },
                  { title: t("teaserCard4Title"), body: t("teaserCard4Body") },
                ].map((card) => (
                  <StaggerChild key={card.title}>
                    <div
                      className="glass-card rounded-2xl p-5"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <h4 className="text-sm font-bold text-white mb-2">
                        {card.title}
                      </h4>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        {card.body}
                      </p>
                    </div>
                  </StaggerChild>
                ))}
              </StaggerIn>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section
        className="py-28"
        style={{ background: "var(--bg)" }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimateIn>
            <p className="eyebrow mb-4" style={{ color: "var(--blue)" }}>
              {t("ctaEyebrow")}
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold mb-5 leading-tight"
              style={{ color: "var(--text)" }}
            >
              {t("ctaTitle")}
            </h2>
            <p
              className="text-lg mb-12 max-w-xl mx-auto"
              style={{ color: "var(--text-muted)" }}
            >
              {t("ctaSub")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={`/${locale}/booking`}
                className="px-8 py-4 font-bold rounded-2xl text-white text-base transition-all hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(37,99,235,0.35)] active:scale-[0.98]"
                style={{ background: "var(--blue)" }}
              >
                {t("ctaBook")}
              </Link>
              <Link
                href={`/${locale}/booking`}
                className="px-8 py-4 font-bold rounded-2xl text-base transition-all hover:scale-[1.02] border-2"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                {t("ctaApply")}
                <ChevronRight
                  size={16}
                  className="inline ml-1"
                />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

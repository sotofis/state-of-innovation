import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  Target,
  Users,
  Lightbulb,
  TrendingUp,
  Quote,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import AnimateIn, { StaggerIn, StaggerChild } from "@/components/AnimateIn";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "keynote" });
  return { title: t("heroTitle") };
}

export default async function KeynotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "keynote" });

  const topics = [
    { icon: Target, title: t("topic1Title"), body: t("topic1Body") },
    { icon: Users,  title: t("topic2Title"), body: t("topic2Body") },
    { icon: TrendingUp, title: t("topic3Title"), body: t("topic3Body") },
    { icon: Lightbulb, title: t("topic4Title"), body: t("topic4Body") },
  ];

  const audiences = [
    t("audience1"), t("audience2"), t("audience3"), t("audience4"),
  ];

  const testimonials = [
    { quote: t("t1Quote"), name: t("t1Name"), role: t("t1Role") },
    { quote: t("t2Quote"), name: t("t2Name"), role: t("t2Role") },
  ];

  const teachingItems = [
    "Vienna University of Economics and Business",
    "University of Applied Sciences — Austrian Marketing University",
    "RWTH Aachen University (Prof. Frank Piller)",
    "DTU Executive School of Business (Prof. Sören Salomo)",
    "JTBD Master Class Vienna (1-day)",
    "JTBD SUMMIT EUROPE — Vienna (Host & Speaker)",
    "Best Practice Classes at Fortune 500 companies (2-day)",
    "PFI events in Austria and Germany",
    "Medtech Summit (Stuttgart) · Innovation Roundtable (Copenhagen)",
  ];

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section
        className="relative pt-40 pb-28 overflow-hidden"
        style={{ background: "var(--bg-dark)" }}
      >
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: "rgba(245,158,11,0.12)" }}
        />
        <div
          aria-hidden
          className="absolute bottom-0 -left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(37,99,235,0.08)" }}
        />

        <div className="relative max-w-6xl mx-auto px-6">
          <AnimateIn>
            <p
              className="eyebrow mb-6"
              style={{ color: "var(--gold)" }}
            >
              {t("heroEyebrow")}
            </p>
            <h1
              className="text-5xl sm:text-6xl xl:text-7xl font-extrabold text-white max-w-4xl mb-8 leading-[1.05]"
            >
              {t("heroTitle")}
            </h1>
            <p
              className="text-xl max-w-2xl mb-12 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {t("heroSub")}
            </p>
            <Link
              href={`/${locale}/booking`}
              className="inline-flex items-center gap-2.5 px-8 py-4 font-bold text-base rounded-2xl transition-all hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(245,158,11,0.4)] active:scale-[0.98]"
              style={{
                background: "var(--gold)",
                color: "#0F172A",
              }}
            >
              {t("ctaBtn")}
              <ArrowRight size={18} />
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── Topics ──────────────────────────────────────────── */}
      <section className="py-28" style={{ background: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <AnimateIn>
            <h2
              className="text-4xl font-bold text-center mb-14"
              style={{ color: "var(--text)" }}
            >
              {t("topicsTitle")}
            </h2>
          </AnimateIn>

          <StaggerIn
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            stagger={0.1}
          >
            {topics.map((topic) => {
              const Icon = topic.icon;
              return (
                <StaggerChild key={topic.title}>
                  <div
                    className="flex gap-5 p-8 rounded-3xl border transition-all duration-300 cursor-default group hover:-translate-y-1 shadow-card hover:shadow-card-hover"
                    style={{
                      background: "var(--bg)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <div
                      className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 group-hover:bg-[var(--blue)] "
                      style={{ background: "var(--blue-light)" }}
                    >
                      <Icon
                        size={24}
                        className="transition-colors duration-300 group-hover:text-white"
                        style={{ color: "var(--blue)" }}
                      />
                    </div>
                    <div>
                      <h3
                        className="font-bold text-lg mb-2"
                        style={{ color: "var(--text)" }}
                      >
                        {topic.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {topic.body}
                      </p>
                    </div>
                  </div>
                </StaggerChild>
              );
            })}
          </StaggerIn>
        </div>
      </section>

      {/* ── Audience + Teaching ─────────────────────────────── */}
      <section
        className="py-28"
        style={{ background: "var(--bg-section)" }}
      >
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Audience */}
          <AnimateIn direction="left">
            <div>
              <h2
                className="text-3xl font-bold mb-10"
                style={{ color: "var(--text)" }}
              >
                {t("audienceTitle")}
              </h2>
              <div className="space-y-5">
                {audiences.map((a) => (
                  <div key={a} className="flex items-center gap-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--gold-light)" }}
                    >
                      <CheckCircle
                        size={16}
                        style={{ color: "var(--gold)" }}
                      />
                    </div>
                    <span
                      className="text-lg font-medium"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {a}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Teaching */}
          <AnimateIn direction="right" delay={0.1}>
            <div
              className="rounded-3xl border p-8 shadow-card"
              style={{
                background: "var(--bg)",
                borderColor: "var(--border)",
              }}
            >
              <h3
                className="font-bold text-xl mb-7"
                style={{ color: "var(--text)" }}
              >
                {t("teachingTitle")}
              </h3>
              <ul className="space-y-4">
                {teachingItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                    <span
                      className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: "var(--gold)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────── */}
      <section className="py-28" style={{ background: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <AnimateIn>
            <h2
              className="text-3xl font-bold text-center mb-14"
              style={{ color: "var(--text)" }}
            >
              {t("testimonialsTitle")}
            </h2>
          </AnimateIn>
          <StaggerIn
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            stagger={0.15}
          >
            {testimonials.map((tm) => (
              <StaggerChild key={tm.name}>
                <div
                  className="rounded-3xl border p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "var(--bg-soft)",
                    borderColor: "var(--border)",
                  }}
                >
                  <Quote
                    size={32}
                    className="mb-5"
                    style={{ color: "rgba(37,99,235,0.2)" }}
                  />
                  <p
                    className="text-base leading-relaxed mb-6 italic"
                    style={{ color: "var(--text-muted)" }}
                  >
                    &ldquo;{tm.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: "var(--blue)" }}
                    >
                      {tm.name.charAt(0)}
                    </div>
                    <div>
                      <p
                        className="font-semibold text-sm"
                        style={{ color: "var(--text)" }}
                      >
                        {tm.name}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--text-faint)" }}
                      >
                        {tm.role}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerChild>
            ))}
          </StaggerIn>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "var(--bg-section)" }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimateIn>
            <h2
              className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight"
              style={{ color: "var(--text)" }}
            >
              {t("ctaTitle")}
            </h2>
            <p className="text-lg mb-4" style={{ color: "var(--text-muted)" }}>
              Vienna, Austria
            </p>
            <p className="text-base mb-12" style={{ color: "var(--text-faint)" }}>
              +43 681 844 90 612 · office@myles-innovation.com
            </p>
            <Link
              href={`/${locale}/booking`}
              className="inline-flex items-center gap-2.5 px-10 py-5 font-bold text-lg rounded-2xl transition-all hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(245,158,11,0.35)] active:scale-[0.98]"
              style={{ background: "var(--gold)", color: "#0F172A" }}
            >
              {t("ctaBtn")}
              <ArrowRight size={20} />
            </Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

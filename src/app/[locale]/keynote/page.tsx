import Image from "next/image";
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
  Linkedin,
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
    { icon: Target,     title: t("topic1Title"), body: t("topic1Body") },
    { icon: Users,      title: t("topic2Title"), body: t("topic2Body") },
    { icon: TrendingUp, title: t("topic3Title"), body: t("topic3Body") },
    { icon: Lightbulb,  title: t("topic4Title"), body: t("topic4Body") },
  ];

  const audiences = [
    t("audience1"), t("audience2"), t("audience3"), t("audience4"),
  ];

  const testimonials = [
    { quote: t("t1Quote"), name: t("t1Name"), role: t("t1Role"), initials: "FV" },
    { quote: t("t2Quote"), name: t("t2Name"), role: t("t2Role"), initials: "JS" },
    { quote: t("t3Quote"), name: t("t3Name"), role: t("t3Role"), initials: "KM" },
    { quote: t("t4Quote"), name: t("t4Name"), role: t("t4Role"), initials: "AW" },
  ];

  const teachingItems = [
    t("teaching1"), t("teaching2"), t("teaching3"),
    t("teaching4"), t("teaching5"), t("teaching6"),
    t("teaching7"), t("teaching8"), t("teaching9"),
  ];

  const clients = [
    "Liebherr", "Eaton Industries", "Teleflex", "Mitsubishi R&D Europe",
    "Roche Diabetes Care", "Microsoft", "Kapsch TrafficCom",
    "Voith Paper", "Coloplast", "Worthington Industries",
    "Philips Medical", "Cox Automotive",
  ];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative pt-44 pb-32 overflow-hidden"
        style={{ background: "var(--bg-dark)" }}
      >
        <div
          aria-hidden
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: "rgba(245,158,11,0.10)" }}
        />
        <div
          aria-hidden
          className="absolute bottom-0 -left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(37,99,235,0.08)" }}
        />

        <div className="relative max-w-6xl mx-auto px-6">
          <AnimateIn>
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border mb-8"
              style={{
                background: "rgba(245,158,11,0.1)",
                color: "var(--gold)",
                borderColor: "rgba(245,158,11,0.2)",
              }}
            >
              {t("heroEyebrow")}
            </span>

            <h1
              className="text-5xl sm:text-6xl xl:text-8xl font-extrabold text-white leading-[1.02] tracking-tight max-w-5xl mb-8"
            >
              {t("heroTitle")}
            </h1>

            <p
              className="text-xl sm:text-2xl max-w-2xl mb-14 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {t("heroSub")}
            </p>

            {/* Stat chips */}
            <div className="flex flex-wrap gap-4 mb-14">
              {[
                { value: "20+", label: t("statYearsLabel") },
                { value: t("statClients"), label: t("statClientsLabel") },
                { value: t("statCountries"), label: t("statCountriesLabel") },
                { value: t("statTopics"), label: t("statTopicsLabel") },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col px-6 py-4 rounded-2xl border"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  <span className="text-3xl font-extrabold text-white leading-none mb-1">
                    {s.value}
                  </span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href={`/${locale}/booking`}
              className="inline-flex items-center gap-2.5 px-8 py-4 font-bold text-base rounded-2xl transition-all hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(245,158,11,0.4)] active:scale-[0.98]"
              style={{ background: "var(--gold)", color: "#0F172A" }}
            >
              {t("ctaBtn")}
              <ArrowRight size={18} />
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── Clients strip ──────────────────────────────────────── */}
      <section
        className="py-14 border-b"
        style={{ background: "var(--bg-soft)", borderColor: "var(--border)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <p
            className="eyebrow text-center mb-8"
            style={{ color: "var(--text-faint)" }}
          >
            {t("clientsTitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {clients.map((c) => (
              <span
                key={c}
                className="px-4 py-2 rounded-xl text-sm font-medium border"
                style={{
                  background: "var(--bg)",
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Martin as Speaker ────────────────────────────── */}
      <section className="py-28" style={{ background: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-14 items-start">
            {/* Photo */}
            <AnimateIn direction="left">
              <div className="relative mx-auto lg:mx-0">
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-[2rem] blur-2xl scale-90 opacity-50"
                  style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.2) 0%, transparent 70%)" }}
                />
                <div
                  className="relative w-64 h-80 rounded-[2rem] overflow-hidden border-2 shadow-photo"
                  style={{ borderColor: "rgba(37,99,235,0.1)" }}
                >
                  <Image
                    src="/martin.png"
                    alt="Martin Pattera"
                    fill
                    sizes="256px"
                    className="object-cover object-top"
                  />
                </div>
                <div
                  className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl text-xs font-bold border"
                  style={{
                    background: "var(--blue)",
                    color: "white",
                    borderColor: "transparent",
                  }}
                >
                  20+ {t("statYearsLabel")}
                </div>
              </div>
            </AnimateIn>

            {/* Bio */}
            <AnimateIn direction="right" delay={0.1}>
              <div>
                <p className="eyebrow mb-3" style={{ color: "var(--blue)" }}>
                  {t("speakerTitle")}
                </p>
                <h2
                  className="text-4xl sm:text-5xl font-bold mb-8 leading-tight"
                  style={{ color: "var(--text)" }}
                >
                  Martin Pattera
                </h2>
                <div
                  className="space-y-5 text-lg leading-relaxed mb-10"
                  style={{ color: "var(--text-muted)" }}
                >
                  <p>{t("speakerBio1")}</p>
                  <p>{t("speakerBio2")}</p>
                </div>

                {/* Audience tags */}
                <div className="flex flex-wrap gap-2 mb-10">
                  {audiences.map((a) => (
                    <span
                      key={a}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border"
                      style={{
                        background: "var(--blue-light)",
                        borderColor: "rgba(37,99,235,0.15)",
                        color: "var(--blue)",
                      }}
                    >
                      <CheckCircle size={13} />
                      {a}
                    </span>
                  ))}
                </div>

                <a
                  href="https://www.linkedin.com/in/martinpattera/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 rounded-xl text-sm font-semibold transition-all hover:shadow-[0_4px_16px_rgba(37,99,235,0.2)] hover:scale-[1.02]"
                  style={{ borderColor: "var(--blue)", color: "var(--blue)" }}
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── Topics ──────────────────────────────────────────────── */}
      <section className="py-28" style={{ background: "var(--bg-section)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <AnimateIn>
            <p className="eyebrow text-center mb-4" style={{ color: "var(--blue)" }}>
              {t("topicsTitle")}
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold text-center mb-16"
              style={{ color: "var(--text)" }}
            >
              {t("topicsTitle")}
            </h2>
          </AnimateIn>

          <StaggerIn className="grid grid-cols-1 sm:grid-cols-2 gap-6" stagger={0.1}>
            {topics.map((topic) => {
              const Icon = topic.icon;
              return (
                <StaggerChild key={topic.title}>
                  <div
                    className="flex gap-6 p-8 rounded-3xl border transition-all duration-300 cursor-default group hover:-translate-y-1 shadow-card hover:shadow-card-hover"
                    style={{ background: "var(--bg)", borderColor: "var(--border)" }}
                  >
                    <div
                      className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 group-hover:bg-[var(--blue)]"
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
                        className="font-bold text-xl mb-3"
                        style={{ color: "var(--text)" }}
                      >
                        {topic.title}
                      </h3>
                      <p
                        className="text-base leading-relaxed"
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

      {/* ── Testimonials ────────────────────────────────────────── */}
      <section className="py-28" style={{ background: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <AnimateIn>
            <p className="eyebrow text-center mb-4" style={{ color: "var(--blue)" }}>
              {t("testimonialsTitle")}
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold text-center mb-16"
              style={{ color: "var(--text)" }}
            >
              {t("testimonialsTitle")}
            </h2>
          </AnimateIn>

          <StaggerIn className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.1}>
            {testimonials.map((tm) => (
              <StaggerChild key={tm.name}>
                <div
                  className="rounded-3xl border p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                  style={{ background: "var(--bg-soft)", borderColor: "var(--border)" }}
                >
                  <Quote
                    size={36}
                    className="mb-6 flex-shrink-0"
                    style={{ color: "rgba(37,99,235,0.18)" }}
                  />
                  <p
                    className="text-lg leading-relaxed mb-8 flex-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    &ldquo;{tm.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ background: "var(--blue)" }}
                    >
                      {tm.initials}
                    </div>
                    <div>
                      <p className="font-bold text-base" style={{ color: "var(--text)" }}>
                        {tm.name}
                      </p>
                      <p className="text-sm mt-0.5" style={{ color: "var(--text-faint)" }}>
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

      {/* ── Teaching ────────────────────────────────────────────── */}
      <section className="py-28" style={{ background: "var(--bg-section)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <AnimateIn>
            <p className="eyebrow text-center mb-4" style={{ color: "var(--blue)" }}>
              {t("teachingTitle")}
            </p>
            <h2
              className="text-4xl font-bold text-center mb-14"
              style={{ color: "var(--text)" }}
            >
              {t("teachingTitle")}
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {teachingItems.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 p-5 rounded-2xl border"
                  style={{ background: "var(--bg)", borderColor: "var(--border)" }}
                >
                  <span
                    className="mt-1 w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: "var(--gold)" }}
                  />
                  <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section
        className="py-32 relative overflow-hidden"
        style={{ background: "var(--bg-dark)" }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse at center, rgba(245,158,11,0.15) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <AnimateIn>
            <p className="eyebrow mb-6" style={{ color: "var(--gold)" }}>
              {t("heroEyebrow")}
            </p>
            <h2
              className="text-4xl sm:text-6xl font-extrabold mb-6 leading-tight text-white"
            >
              {t("ctaTitle")}
            </h2>
            <p className="text-xl mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
              {t("location")}
            </p>
            <p className="text-base mb-14" style={{ color: "rgba(255,255,255,0.3)" }}>
              {t("contact")}
            </p>
            <Link
              href={`/${locale}/booking`}
              className="inline-flex items-center gap-2.5 px-12 py-5 font-bold text-xl rounded-2xl transition-all hover:scale-[1.03] hover:shadow-[0_8px_40px_rgba(245,158,11,0.35)] active:scale-[0.98]"
              style={{ background: "var(--gold)", color: "#0F172A" }}
            >
              {t("ctaBtn")}
              <ArrowRight size={22} />
            </Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

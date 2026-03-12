"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { Mic, ChevronDown, ChevronRight } from "lucide-react";

interface ParallaxHeroProps {
  locale: string;
}

export default function ParallaxHero({ locale }: ParallaxHeroProps) {
  const t = useTranslations("home");
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Background blobs move faster than scroll
  const blobY1 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  // Photo floats slightly slower
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  // Text moves up a little
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden mesh-bg"
    >
      {/* ── Parallax blobs ────────────────────────────── */}
      <motion.div
        aria-hidden
        style={{ y: blobY1 }}
        className="pointer-events-none absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-30 animate-blob"
        css-note="blob1"
      >
        <div
          className="w-full h-full rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(38,77,90,0.25) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ y: blobY2 }}
        className="pointer-events-none absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full opacity-25 animate-blob animation-delay-4"
      >
        <div
          className="w-full h-full rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(234,217,21,0.2) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Decorative ring */}
      <motion.div
        aria-hidden
        style={{ y: blobY2, rotate: 0, border: "2px dashed var(--blue)" }}
        className="pointer-events-none absolute top-1/4 right-1/4 w-96 h-96 rounded-full animate-spin-slow opacity-[0.04]"
      />

      {/* ── Content grid ───────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-36 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-center w-full">

        {/* Text column */}
        <motion.div
          style={{ y: textY }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 max-w-xl"
        >
          {/* Eyebrow pill */}
          <motion.div variants={itemVariants}>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border"
              style={{
                background: "var(--blue-light)",
                color: "var(--blue)",
                borderColor: "rgba(38,77,90,0.2)",
              }}
            >
              <Mic size={12} />
              {t("heroEyebrow")}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight"
          >
            <span style={{ color: "var(--text)" }}>{t("heroLine1")}</span>
            <br />
            <span style={{ color: "var(--text)" }}>{t("heroLine2")}</span>
            <span className="gradient-heading">{t("heroGrad1")}</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={itemVariants}
            className="text-xl leading-relaxed max-w-lg"
            style={{ color: "var(--text-muted)" }}
          >
            {t("heroSub")}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link
              href={`/${locale}/podcast`}
              className="flex items-center gap-2.5 px-7 py-4 font-bold text-base text-white rounded-2xl transition-all hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: "var(--blue)",
                boxShadow: "0 4px 20px rgba(38,77,90,0.4)",
              }}
            >
              <Mic size={18} />
              {t("listenBtn")}
            </Link>
            <Link
              href={`/${locale}/booking`}
              className="flex items-center gap-2 px-7 py-4 font-bold text-base rounded-2xl border-2 transition-all hover:scale-[1.02] hover:border-[var(--blue)] hover:text-[var(--blue)]"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)",
              }}
            >
              {t("bookBtn")}
              <ChevronRight size={16} />
            </Link>
          </motion.div>

        </motion.div>

        {/* Photo column */}
        <motion.div
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 0.96, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Glow behind photo */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-[2rem] blur-2xl scale-90 opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(38,77,90,0.25) 0%, transparent 70%)",
              }}
            />

            {/* Photo frame */}
            <motion.div
              className="relative w-[320px] h-[420px] sm:w-[380px] sm:h-[500px] rounded-[2rem] overflow-hidden border-2 shadow-photo"
              style={{ borderColor: "rgba(38,77,90,0.1)" }}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/martin.png"
                alt="Martin Pattera"
                fill
                priority
                sizes="(max-width: 640px) 320px, 380px"
                className="object-cover object-top"
              />
            </motion.div>

            {/* Floating badge — Episodes */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -right-6 top-12 bg-white rounded-2xl px-5 py-3 shadow-[0_8px_32px_rgba(15,23,42,0.12)] border border-[var(--border)]"
            >
              <p
                className="text-2xl font-extrabold"
                style={{ color: "var(--blue)" }}
              >
                49+
              </p>
              <p
                className="text-xs font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                {t("statsEpisodes")}
              </p>
            </motion.div>

            {/* Floating badge — Company */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.85, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -left-6 bottom-16 bg-white rounded-2xl px-5 py-3 shadow-[0_8px_32px_rgba(15,23,42,0.12)] border border-[var(--border)]"
            >
              <p
                className="text-xs font-bold mb-0.5"
                style={{ color: "var(--text)" }}
              >
                MYLES Innovation
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--text-faint)" }}
              >
                {t("founderRole")}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span
          className="text-xs font-medium tracking-widest uppercase"
          style={{ color: "var(--text-faint)" }}
        >
          {t("scrollLabel")}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} style={{ color: "var(--text-faint)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

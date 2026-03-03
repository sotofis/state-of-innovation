"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Menu, X, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const otherLocale = locale === "en" ? "de" : "en";
  const otherLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const navLinks = [
    { href: `/${locale}/podcast`, label: t("podcast") },
    { href: `/${locale}/keynote`, label: t("keynote") },
    { href: `/${locale}/booking`, label: t("booking") },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(15,23,42,0.06),0_4px_16px_rgba(15,23,42,0.06)]"
            : "bg-transparent"
        }`}
        style={{ height: "var(--nav-height)" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[var(--blue)] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Mic size={14} className="text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[9px] font-bold tracking-[0.22em] uppercase text-[var(--blue)]">
                The State of
              </span>
              <span className="text-sm font-bold text-[var(--text)] group-hover:text-[var(--blue)] transition-colors">
                Innovation
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "text-[var(--blue)] bg-[var(--blue-light)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <a
              href="https://myles-innovation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)] rounded-lg transition-colors"
            >
              {t("company")} ↗
            </a>

            <div className="w-px h-5 bg-[var(--border)] mx-2" />

            <Link
              href={otherLocalePath}
              className="px-3 py-1.5 text-xs font-bold tracking-wider uppercase text-[var(--text-faint)] hover:text-[var(--text-muted)] border border-[var(--border)] rounded-md transition-colors hover:border-[var(--blue)] hover:text-[var(--blue)]"
            >
              {otherLocale.toUpperCase()}
            </Link>

            <Link
              href={`/${locale}/booking`}
              className="ml-2 px-5 py-2.5 text-sm font-semibold bg-[var(--blue)] hover:bg-[#1d4ed8] text-white rounded-xl transition-all shadow-[0_2px_8px_rgba(37,99,235,0.35)] hover:shadow-[0_4px_16px_rgba(37,99,235,0.4)] hover:scale-[1.02] active:scale-[0.98]"
            >
              {t("bookBtn")}
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] rounded-lg hover:bg-[var(--bg-soft)] transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl pt-[var(--nav-height)] flex flex-col"
          >
            <nav className="flex flex-col gap-1 px-4 py-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center px-4 py-3.5 text-xl font-semibold text-[var(--text)] hover:text-[var(--blue)] hover:bg-[var(--blue-light)] rounded-xl transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06 + 0.05 }}
              >
                <a
                  href="https://myles-innovation.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-3.5 text-xl font-semibold text-[var(--text-muted)] hover:text-[var(--blue)] hover:bg-[var(--blue-light)] rounded-xl transition-colors"
                >
                  {t("company")} ↗
                </a>
              </motion.div>

              <motion.div
                className="mt-4 px-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Link
                  href={`/${locale}/booking`}
                  className="block w-full text-center py-4 bg-[var(--blue)] text-white font-bold text-lg rounded-2xl shadow-[0_4px_20px_rgba(37,99,235,0.35)]"
                >
                  {t("bookBtn")}
                </Link>
              </motion.div>

              <motion.p
                className="text-center text-sm text-[var(--text-faint)] mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link href={otherLocalePath}>
                  Switch to {otherLocale.toUpperCase()}
                </Link>
              </motion.p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

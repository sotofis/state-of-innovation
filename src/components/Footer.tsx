"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Linkedin, ExternalLink, Mic } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer
      className="relative overflow-hidden mt-0"
      style={{ background: "var(--bg-dark)" }}
    >
      {/* Top glow */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 blur-3xl opacity-20"
        style={{ background: "var(--blue)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand col */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "var(--blue)" }}
              >
                <Mic size={16} className="text-white" />
              </div>
              <div>
                <p
                  className="text-[9px] font-bold tracking-[0.22em] uppercase"
                  style={{ color: "var(--blue-mid)" }}
                >
                  The State of
                </p>
                <p className="text-base font-bold text-white">Innovation</p>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs mb-6"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {t("tagline")}
            </p>
            <p
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {t("company")}
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <h4
              className="eyebrow mb-5"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {t("navTitle")}
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/en/podcast", label: nav("podcast") },
                { href: "/en/keynote", label: nav("keynote") },
                { href: "/en/booking", label: nav("booking") },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm transition-colors"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "white")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  {l.label}
                </Link>
              ))}
              <a
                href="https://myles-innovation.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm flex items-center gap-1 transition-colors"
                style={{ color: "rgba(255,255,255,0.5)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "white")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                }
              >
                MYLES Innovation <ExternalLink size={11} />
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4
              className="eyebrow mb-5"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {t("contactTitle")}
            </h4>
            <div className="flex flex-col gap-3 mb-8">
              <a
                href="mailto:office@myles-innovation.com"
                className="text-sm transition-colors"
                style={{ color: "rgba(255,255,255,0.5)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "white")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                }
              >
                office@myles-innovation.com
              </a>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                Vienna, Austria
              </p>
            </div>

            <h4
              className="eyebrow mb-4"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {t("followTitle")}
            </h4>
            <a
              href="https://www.linkedin.com/in/martinpattera/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(37,99,235,0.2)";
                (e.currentTarget as HTMLAnchorElement).style.color = "white";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(37,99,235,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              <Linkedin size={15} />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            © {new Date().getFullYear()} Martin Pattera. {t("rights")}
          </p>
          <div className="flex gap-5">
            <Link
              href="/en"
              className="text-xs transition-colors"
              style={{ color: "rgba(255,255,255,0.25)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.25)")
              }
            >
              EN
            </Link>
            <Link
              href="/de"
              className="text-xs transition-colors"
              style={{ color: "rgba(255,255,255,0.25)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.25)")
              }
            >
              DE
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

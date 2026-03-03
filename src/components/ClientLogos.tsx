"use client";

import { useState } from "react";

interface LogoItem {
  name: string;
  domain: string;
}

function Logo({ name, domain }: LogoItem) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className="text-sm font-semibold px-2"
        style={{ color: "var(--text-faint)" }}
      >
        {name}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt={name}
      className="h-7 w-auto object-contain select-none"
      style={{
        filter: "grayscale(100%) opacity(0.45)",
        transition: "filter 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLImageElement).style.filter =
          "grayscale(0%) opacity(1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLImageElement).style.filter =
          "grayscale(100%) opacity(0.45)";
      }}
      onError={() => setFailed(true)}
    />
  );
}

export default function ClientLogos({
  title,
  logos,
}: {
  title: string;
  logos: LogoItem[];
}) {
  return (
    <section
      className="py-16 border-b"
      style={{ background: "var(--bg)", borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <p
          className="eyebrow text-center mb-10"
          style={{ color: "var(--text-faint)" }}
        >
          {title}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-8">
          {logos.map((l) => (
            <Logo key={l.domain} {...l} />
          ))}
        </div>
      </div>
    </section>
  );
}

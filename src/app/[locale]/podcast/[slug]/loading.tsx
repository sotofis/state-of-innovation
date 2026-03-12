export default function EpisodeLoading() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8"
      style={{ background: "var(--bg-dark)" }}
    >
      {/* Equalizer bars */}
      <div className="flex items-end gap-1.5 h-14">
        {[0.4, 0.9, 0.6, 1, 0.7, 0.85, 0.5, 0.75, 0.45, 0.95, 0.6, 0.8].map((scale, i) => (
          <div
            key={i}
            className="w-2 rounded-full"
            style={{
              background: i % 3 === 0 ? "var(--gold)" : "rgba(255,255,255,0.25)",
              height: `${scale * 100}%`,
              animationName: "equalize",
              animationDuration: `${0.6 + (i % 5) * 0.15}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDirection: "alternate",
              animationDelay: `${(i % 4) * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Brand */}
      <div className="flex flex-col items-center gap-1">
        <p
          className="text-[9px] font-bold tracking-[0.3em] uppercase"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          The State of
        </p>
        <p className="text-lg font-bold text-white tracking-wide">
          Innovation
        </p>
      </div>

      <style>{`
        @keyframes equalize {
          from { transform: scaleY(0.3); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}

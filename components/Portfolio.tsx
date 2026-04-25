"use client";

import { useState, useEffect, useCallback } from "react";
import type { SanityProject } from "@/sanity/queries";
import PhoneFrame from "./PhoneFrame";

const ACCENT_CHOICES = [
  { label: "Amber",  value: "#ff6b1a" },
  { label: "Acid",   value: "#c6ff4a" },
  { label: "Cobalt", value: "#4a7bff" },
  { label: "Blush",  value: "#ff7aa8" },
  { label: "Bone",   value: "#e8dfc9" },
];

const UNIQUE_BRANDS = (projects: SanityProject[]) =>
  [...new Set(projects.map((p) => p.brand))];

// ─── Carousel hook ────────────────────────────────────────────────────────────
function useCarousel(total: number) {
  const [idx, setIdx] = useState(Math.floor(total / 2));
  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);
  const go   = useCallback((i: number) => setIdx(((i % total) + total) % total), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return { idx, next, prev, go };
}

// ─── Tweaks panel ─────────────────────────────────────────────────────────────
function TweaksPanel({
  accent, mode, onAccent, onMode,
}: {
  accent: string; mode: string;
  onAccent: (v: string) => void; onMode: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, fontFamily: "'JetBrains Mono', monospace" }}>
      {open && (
        <div style={{
          background: "rgba(20,20,20,0.92)", backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
          padding: "20px 20px 16px", marginBottom: 8, minWidth: 220,
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}>
          <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 14 }}>
            Tweaks
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
              Mode
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {["dark", "light"].map((m) => (
                <button key={m} onClick={() => onMode(m)} style={{
                  padding: "6px 14px", fontSize: 11, letterSpacing: "0.08em",
                  textTransform: "uppercase", border: "1px solid",
                  borderColor: mode === m ? accent : "rgba(255,255,255,0.15)",
                  background: mode === m ? accent : "transparent",
                  color: mode === m ? "#000" : "rgba(255,255,255,0.7)",
                  borderRadius: 6,
                }}>{m}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
              Accent
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {ACCENT_CHOICES.map((c) => (
                <button key={c.value} onClick={() => onAccent(c.value)} title={c.label} style={{
                  width: 32, height: 32, borderRadius: 6, background: c.value, padding: 0,
                  border: accent === c.value ? "2px solid #fff" : "1px solid rgba(255,255,255,0.2)",
                }} />
              ))}
            </div>
          </div>
        </div>
      )}
      <button onClick={() => setOpen((o) => !o)} style={{
        width: 44, height: 44, borderRadius: "50%",
        background: open ? accent : "rgba(30,30,30,0.9)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.15)",
        color: open ? "#000" : "#fff",
        fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 16px rgba(0,0,0,0.4)", transition: "background 0.2s",
      }}>⚙</button>
    </div>
  );
}

// ─── Main portfolio ───────────────────────────────────────────────────────────
export default function Portfolio({ projects }: { projects: SanityProject[] }) {
  const [accent, setAccent] = useState("#ff6b1a");
  const [mode,   setMode]   = useState("dark");
  const [scale,  setScale]  = useState(1);

  const { idx, next, prev, go } = useCarousel(projects.length);
  const current = projects[idx];

  const dark  = mode === "dark";
  const bg    = dark ? "#000"    : "#fafaf7";
  const fg    = dark ? "#fafaf7" : "#000";
  const muted = dark ? "rgba(250,250,247,0.45)" : "rgba(0,0,0,0.5)";
  const line  = dark ? "rgba(250,250,247,0.1)"  : "rgba(0,0,0,0.1)";

  const brands = UNIQUE_BRANDS(projects);

  useEffect(() => {
    const fit = () => setScale(window.innerWidth < 1440 ? window.innerWidth / 1440 : 1);
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  if (!current) return null;

  return (
    <>
      <div style={{ minHeight: "100vh", background: bg, display: "flex", justifyContent: "center", alignItems: "flex-start", overflow: "hidden" }}>
        <div style={{ transform: `scale(${scale})`, transformOrigin: "top center", width: 1440 }}>

          {/* ── Nav ── */}
          <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "32px 56px", position: "relative", zIndex: 2 }}>
            <div style={{ fontWeight: 700, letterSpacing: "-0.03em", fontSize: 20, color: fg }}>
              ED<span style={{ color: accent }}>.</span>
            </div>
            <div style={{ display: "flex", gap: 40, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              <a href="#work"     style={{ color: fg }}>Index</a>
              <a href="#services" style={{ color: fg }}>Services</a>
              <a href="mailto:erik@dernee.studio" style={{ color: accent }}>Book ↗</a>
            </div>
          </nav>

          {/* ── Hero ── */}
          <header style={{ textAlign: "center", padding: "40px 24px 0", position: "relative", zIndex: 1, color: fg }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: muted, marginBottom: 14 }}>
              Est. 2019 · Amsterdam
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 14, fontSize: 32, fontWeight: 500, letterSpacing: "-0.02em" }}>
              <span style={{ width: 36, height: 2, background: accent, display: "inline-block" }} />
              Social Content{" "}<span style={{ fontStyle: "italic", fontWeight: 400, color: accent, marginLeft: 8 }}>Creative</span>
              <span style={{ width: 36, height: 2, background: accent, display: "inline-block" }} />
            </div>
            <div style={{ fontSize: 200, fontWeight: 700, letterSpacing: "-0.06em", lineHeight: 0.9, margin: 0, whiteSpace: "nowrap" }}>
              Erik <span style={{ fontStyle: "italic", fontWeight: 400 }}>Dernee</span>
            </div>
          </header>

          {/* ── Carousel ── */}
          <section id="work" style={{ marginTop: -80, position: "relative", zIndex: 2, padding: "60px 0 40px", height: 560, overflow: "hidden" }}>
            {/* Sliding track */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              display: "flex", alignItems: "center", gap: 80,
              transform: `translateX(calc(-${idx * (260 + 80) + 130}px)) translateY(-50%)`,
              transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
              willChange: "transform",
            }}>
              {projects.map((p, i) => {
                const dist = Math.abs(i - idx);
                const isActive = i === idx;
                return (
                  <div
                    key={p._id}
                    onClick={() => !isActive && go(i)}
                    style={{
                      transform: isActive ? "scale(1)" : `scale(${Math.max(0.62, 0.78 - dist * 0.06)})`,
                      opacity:   isActive ? 1 : Math.max(0.15, 0.35 - dist * 0.08),
                      filter:    isActive ? "none" : `blur(${Math.min(3, dist)}px) saturate(0.3)`,
                      transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.7s ease, filter 0.7s ease",
                      position: "relative",
                      cursor: isActive ? "default" : "pointer",
                    }}
                  >
                    <PhoneFrame project={p} active={isActive} accent={accent} />
                    {isActive && (
                      <>
                        <div style={{ position: "absolute", left: -80, top: "50%", width: 56, height: 2, background: accent }} />
                        <div style={{ position: "absolute", right: -80, top: "50%", width: 56, height: 2, background: accent }} />
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Arrows */}
            {(["prev", "next"] as const).map((dir) => (
              <button
                key={dir}
                onClick={dir === "prev" ? prev : next}
                onMouseEnter={(e) => (e.currentTarget.style.transform = `translateY(-50%) scale(1.08)`)}
                onMouseLeave={(e) => (e.currentTarget.style.transform = `translateY(-50%) scale(1)`)}
                style={{
                  position: "absolute", [dir === "prev" ? "left" : "right"]: 56, top: "50%", transform: "translateY(-50%)",
                  width: 64, height: 64, borderRadius: "50%",
                  background: dark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(8px)", border: `1px solid ${line}`, color: fg,
                  fontSize: 22, zIndex: 5, transition: "transform 0.2s",
                }}
              >
                {dir === "prev" ? "←" : "→"}
              </button>
            ))}
          </section>

          {/* ── Project meta ── */}
          <div style={{ textAlign: "center", padding: "16px 24px 48px", position: "relative", zIndex: 2, color: fg }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: muted, marginBottom: 8 }}>
              {String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} · {current.brand} · {current.metric}
            </div>
            <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em" }}>
              &ldquo;{current.title}&rdquo;
            </div>
            <div style={{ fontSize: 16, lineHeight: 1.5, color: muted, maxWidth: 560, margin: "16px auto 0" }}>
              {current.subtitle}
            </div>
            {/* Dot indicators */}
            <div style={{ display: "flex", gap: 8, marginTop: 32, justifyContent: "center" }}>
              {projects.map((_, i) => (
                <button key={i} onClick={() => go(i)} style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: i === idx ? accent : "transparent",
                  border: `1px solid ${i === idx ? accent : line}`,
                  padding: 0,
                }} />
              ))}
            </div>
          </div>

          {/* ── Brand row ── */}
          <div style={{ padding: "56px 56px", borderTop: `1px solid ${line}`, position: "relative", zIndex: 1, color: fg }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: muted, marginBottom: 40, textAlign: "center" }}>
              — Trusted by —
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 40 }}>
              {brands.map((b) => (
                <div key={b} style={{ flex: 1, textAlign: "center", fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 700, letterSpacing: "-0.04em", textTransform: "lowercase", opacity: 0.85 }}>
                  {b.toLowerCase()}<span style={{ color: accent }}>.</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Services ── */}
          <section id="services" style={{ padding: "120px 56px", borderTop: `1px solid ${line}`, position: "relative", zIndex: 1, color: fg }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: muted, marginBottom: 40 }}>
              What I do
            </div>
            {[
              { n: "①", t: "Concept & Script",         d: "Hooks, beats and pacing for platforms where the first second decides everything." },
              { n: "②", t: "Production",                d: "Shoot-to-edit pipelines built for volume without losing the handmade quality." },
              { n: "③", t: "Creative Direction",        d: "Brand voice translated into a feed presence that earns attention, not buys it." },
              { n: "④", t: "Social Campaign Thinking",  d: "Platform-native campaigns — formats, beats and release cadence designed around how people actually watch." },
              { n: "⑤", t: "Editing",                  d: "Tight cuts, considered sound design and motion that keep viewers to the last frame." },
            ].map((s, i) => (
              <div key={s.n} style={{
                display: "grid", gridTemplateColumns: "80px 1fr 2fr",
                alignItems: "baseline", gap: 32, padding: "40px 0",
                borderTop: i === 0 ? `1px solid ${line}` : "none",
                borderBottom: `1px solid ${line}`,
              }}>
                <div style={{ fontSize: 32, color: accent }}>{s.n}</div>
                <div style={{ fontSize: 48, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.t}</div>
                <div style={{ fontSize: 17, lineHeight: 1.5, color: muted, maxWidth: 480 }}>{s.d}</div>
              </div>
            ))}
          </section>

          {/* ── About ── */}
          <section style={{
            padding: "120px 56px", borderTop: `1px solid ${line}`, position: "relative", zIndex: 1,
            display: "grid", gridTemplateColumns: "480px 1fr", gap: 80, alignItems: "center", color: fg,
          }}>
            {/* Portrait placeholder */}
            <div style={{
              aspectRatio: "4 / 5", width: "100%",
              background: dark ? "#111" : "#e8e4da", border: `1px solid ${line}`,
              backgroundImage: `repeating-linear-gradient(135deg, ${line} 0px, ${line} 1px, transparent 1px, transparent 14px)`,
              position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: muted, letterSpacing: "0.2em", textTransform: "uppercase", background: bg, padding: "6px 12px" }}>
                [ Portrait ]
              </div>
              <div style={{ position: "absolute", top: 12, left: 12, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: muted, letterSpacing: "0.15em" }}>
                ED · 2026
              </div>
            </div>
            {/* Bio */}
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: muted, marginBottom: 24 }}>
                About — who&apos;s behind the work
              </div>
              <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 32 }}>
                I make short-form content that earns attention{" "}
                <span style={{ color: accent, fontStyle: "italic", fontWeight: 400 }}>—</span>{" "}
                not buys it.
              </div>
              <p style={{ fontSize: 17, lineHeight: 1.6, margin: "0 0 18px", color: dark ? "rgba(250,250,247,0.75)" : "rgba(0,0,0,0.75)", maxWidth: 560 }}>
                I&apos;ve spent the last seven years making short-form video for brands —
                from first-frame hooks to full campaign arcs across TikTok, Reels and Shorts.
                The work sits at the intersection of performance marketing and creative direction:
                numbers on one side, craft on the other.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, color: dark ? "rgba(250,250,247,0.75)" : "rgba(0,0,0,0.75)", maxWidth: 560 }}>
                I do this for a living because the best creative in 2026 looks like
                something a person made for another person. My job is to keep it that way,
                even when the brief comes from a boardroom.
              </p>
              <div style={{ display: "flex", gap: 24, marginTop: 40, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: muted }}>
                <span><span style={{ color: accent }}>●</span> Based in Amsterdam</span>
                <span><span style={{ color: accent }}>●</span> Seven years in</span>
                <span><span style={{ color: accent }}>●</span> Available Q3–Q4</span>
              </div>
            </div>
          </section>

          {/* ── Footer ── */}
          <footer style={{
            padding: "48px 56px", borderTop: `1px solid ${line}`,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            color: muted, letterSpacing: "0.15em", textTransform: "uppercase",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            position: "relative", zIndex: 1,
          }}>
            <span>Amsterdam, NL</span>
            <a href="mailto:erik@dernee.studio" style={{
              fontSize: 20, color: fg, letterSpacing: "-0.02em",
              textTransform: "none", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
            }}>
              erik@dernee.studio <span style={{ color: accent }}>↗</span>
            </a>
            <span>© MMXXVI</span>
          </footer>

        </div>
      </div>

      <TweaksPanel accent={accent} mode={mode} onAccent={setAccent} onMode={setMode} />
    </>
  );
}

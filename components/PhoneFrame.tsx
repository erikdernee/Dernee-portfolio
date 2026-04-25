"use client";

import type { SanityProject } from "@/sanity/queries";

const W = 402, H = 874, S = 0.647;

export default function PhoneFrame({
  project,
  active,
  accent,
}: {
  project: SanityProject;
  active: boolean;
  accent: string;
}) {
  const screenBg = `linear-gradient(${135 + project.hue}deg, oklch(0.28 0.05 ${project.hue}) 0%, oklch(0.14 0.03 ${project.hue}) 55%, #000 100%)`;

  return (
    <div
      style={{
        width: W * S,
        height: H * S,
        position: "relative",
        filter: active
          ? "drop-shadow(0 40px 60px rgba(0,0,0,0.75))"
          : "drop-shadow(0 20px 30px rgba(0,0,0,0.5))",
        transition: "filter 0.4s ease",
      }}
    >
      <div
        style={{
          width: W,
          height: H,
          transform: `scale(${S})`,
          transformOrigin: "top left",
        }}
      >
        {/* Outer shell */}
        <div
          style={{
            width: W,
            height: H,
            borderRadius: 54,
            background: "linear-gradient(160deg, #3a3a3c 0%, #1c1c1e 60%, #111 100%)",
            boxShadow: "0 0 0 2px #3a3a3c, inset 0 0 0 1.5px rgba(255,255,255,0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Side buttons */}
          <div style={{ position:"absolute", left:-3, top:160, width:4, height:36, background:"#3a3a3c", borderRadius:"2px 0 0 2px" }}/>
          <div style={{ position:"absolute", left:-3, top:210, width:4, height:64, background:"#3a3a3c", borderRadius:"2px 0 0 2px" }}/>
          <div style={{ position:"absolute", left:-3, top:290, width:4, height:64, background:"#3a3a3c", borderRadius:"2px 0 0 2px" }}/>
          <div style={{ position:"absolute", right:-3, top:200, width:4, height:90, background:"#3a3a3c", borderRadius:"0 2px 2px 0" }}/>

          {/* Screen */}
          <div
            style={{
              position: "absolute",
              inset: 8,
              borderRadius: 48,
              background: screenBg,
              overflow: "hidden",
            }}
          >
            {/* Status bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "18px 24px 0",
                color: "#fff",
                fontFamily: "-apple-system, system-ui",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              <span>9:41</span>
              <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13 }}>
                <span>●●●</span>
                <span>WiFi</span>
              </div>
            </div>

            {/* Dynamic island */}
            <div
              style={{
                position: "absolute",
                top: 14,
                left: "50%",
                transform: "translateX(-50%)",
                width: 120,
                height: 36,
                background: "#000",
                borderRadius: 18,
              }}
            />

            {/* Noise */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 3px)",
                pointerEvents: "none",
              }}
            />

            {/* For You / Following tabs */}
            <div
              style={{
                position: "absolute",
                top: 62,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                gap: 18,
                fontFamily: "-apple-system, system-ui",
                fontSize: 15,
                fontWeight: 600,
                color: "rgba(255,255,255,0.7)",
                zIndex: 5,
              }}
            >
              <span>Following</span>
              <span style={{ color: "#fff", position: "relative" }}>
                For You
                <span
                  style={{
                    position: "absolute",
                    bottom: -5,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 18,
                    height: 3,
                    background: "#fff",
                    borderRadius: 2,
                    display: "block",
                  }}
                />
              </span>
            </div>

            {/* Play button */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 92,
                height: 92,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `24px solid ${active ? accent : "rgba(255,255,255,0.95)"}`,
                  borderTop: "16px solid transparent",
                  borderBottom: "16px solid transparent",
                  marginLeft: 7,
                }}
              />
            </div>

            {/* Right action rail */}
            <div
              style={{
                position: "absolute",
                right: 14,
                bottom: 160,
                display: "flex",
                flexDirection: "column",
                gap: 22,
                alignItems: "center",
              }}
            >
              {[
                { icon: "♥", label: "412K" },
                { icon: "💬", label: "8.2K" },
                { icon: "↗", label: "Share" },
              ].map((a, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.12)",
                      backdropFilter: "blur(10px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      color: "#fff",
                    }}
                  >
                    {a.icon}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#fff",
                      marginTop: 6,
                      fontFamily: "-apple-system, system-ui",
                      fontWeight: 500,
                    }}
                  >
                    {a.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom caption */}
            <div
              style={{
                position: "absolute",
                left: 16,
                right: 80,
                bottom: 56,
                color: "#fff",
                fontFamily: "-apple-system, system-ui",
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
                @{project.brand.toLowerCase().replace(/\s/g, "")}
              </div>
              <div style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.3, opacity: 0.95 }}>
                {project.title}
              </div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>
                ♪ original sound · {project.metric}
              </div>
            </div>

            {/* Video embed overlay — shown if videoUrl is set */}
            {project.videoUrl && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0,0,0,0.35)",
                }}
              >
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#fff",
                    fontFamily: "-apple-system, system-ui",
                    fontSize: 13,
                    fontWeight: 600,
                    background: "rgba(0,0,0,0.6)",
                    padding: "8px 16px",
                    borderRadius: 20,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  Watch ↗
                </a>
              </div>
            )}

            {/* Home indicator */}
            <div
              style={{
                position: "absolute",
                bottom: 10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 140,
                height: 5,
                background: "rgba(255,255,255,0.3)",
                borderRadius: 3,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

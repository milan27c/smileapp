"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

const PARTICLES = [
  { color: "#9728B8", size: 10, left: "12%", delay: "0s",    duration: "2.4s" },
  { color: "#F002AF", size: 7,  left: "22%", delay: "0.2s",  duration: "2.0s" },
  { color: "#FED955", size: 12, left: "35%", delay: "0.4s",  duration: "2.6s" },
  { color: "#00C1E2", size: 8,  left: "48%", delay: "0.1s",  duration: "2.2s" },
  { color: "#63DBAE", size: 11, left: "60%", delay: "0.5s",  duration: "2.8s" },
  { color: "#FA5D3E", size: 6,  left: "74%", delay: "0.3s",  duration: "2.1s" },
  { color: "#9728B8", size: 9,  left: "85%", delay: "0.6s",  duration: "2.5s" },
  { color: "#FED955", size: 7,  left: "5%",  delay: "0.7s",  duration: "2.3s" },
  { color: "#F002AF", size: 10, left: "93%", delay: "0.15s", duration: "2.7s" },
  { color: "#00C1E2", size: 8,  left: "56%", delay: "0.8s",  duration: "2.0s" },
  { color: "#63DBAE", size: 6,  left: "30%", delay: "0.9s",  duration: "2.4s" },
  { color: "#FA5D3E", size: 9,  left: "70%", delay: "0.35s", duration: "2.2s" },
];

export default function DailyCheckInSuccessPage() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className="flex flex-col h-full items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #f0f9ff 0%, #f5f0ff 45%, #fff8f0 100%)",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        animation: "fade-in 0.35s ease both",
      }}
    >
      {/* Floating Particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: "-20px",
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: p.color,
            animation: `drift ${p.duration} ${p.delay} ease-out infinite`,
            pointerEvents: "none",
            opacity: 0.85,
          }}
        />
      ))}

      {/* Star burst decorations */}
      {([
        { top: "14%", left: "8%",  right: undefined, color: "#FED955", size: 18, delay: "0.2s" },
        { top: "18%", left: undefined, right: "10%", color: "#F002AF", size: 14, delay: "0.5s" },
        { top: "72%", left: "6%",  right: undefined, color: "#00C1E2", size: 12, delay: "0.3s" },
        { top: "68%", left: undefined, right: "8%", color: "#63DBAE", size: 16, delay: "0.6s" },
      ] as { top: string; left?: string; right?: string; color: string; size: number; delay: string }[]).map((star, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: star.top,
            left: star.left,
            right: star.right,
            fontSize: `${star.size}px`,
            animation: `fade-up 0.6s ${star.delay} ease both, pulse-dot 2s ${star.delay} ease-in-out infinite`,
            pointerEvents: "none",
          }}
        >
          ✦
        </div>
      ))}

      {/* Center Content */}
      <div className="flex flex-col items-center" style={{ padding: "0 40px" }}>

        {/* Ripple + Check Circle */}
        <div className="relative flex items-center justify-center" style={{ marginBottom: "36px" }}>
          {/* Ripple rings */}
          <div style={{
            position: "absolute",
            width: "160px", height: "160px",
            borderRadius: "50%",
            border: "2px solid rgba(76,175,80,0.15)",
            animation: "zoom-in 0.8s ease 0.5s both",
          }} />
          <div style={{
            position: "absolute",
            width: "130px", height: "130px",
            borderRadius: "50%",
            border: "2px solid rgba(76,175,80,0.22)",
            animation: "zoom-in 0.7s ease 0.3s both",
          }} />
          {/* Check circle */}
          <div
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "9999px",
              background: "linear-gradient(135deg, #43D072 0%, #2BBD5E 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 30px rgba(76,175,80,0.45)",
              animation: "zoom-in 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.1s both",
            }}
          >
            <Check size={48} style={{ color: "#fff" }} strokeWidth={3} />
          </div>
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: "28px",
            fontWeight: 800,
            color: "#0E0E10",
            marginBottom: "8px",
            lineHeight: 1.2,
            textAlign: "center",
            animation: "fade-up 0.5s ease 0.35s both",
          }}
        >
          Daily Bonus Claimed!
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "15px",
            color: "#52525B",
            marginBottom: "16px",
            textAlign: "center",
            animation: "fade-up 0.5s ease 0.45s both",
          }}
        >
          You successfully earned
        </p>

        {/* Points Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "linear-gradient(135deg, #9728B8 0%, #F002AF 100%)",
            borderRadius: "9999px",
            padding: "12px 28px",
            marginBottom: "32px",
            boxShadow: "0 6px 20px rgba(151,40,184,0.35)",
            animation: "points-count 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.55s both",
          }}
        >
          <span style={{ fontSize: "20px" }}>🪙</span>
          <span style={{ fontSize: "22px", fontWeight: 800, color: "#fff" }}>+ 20 Smile Points</span>
        </div>

        {/* Wallet note */}
        <div
          style={{
            background: "rgba(1,77,152,0.08)",
            border: "1px solid rgba(1,77,152,0.15)",
            borderRadius: "12px",
            padding: "10px 20px",
            marginBottom: "32px",
            animation: "fade-up 0.5s ease 0.7s both",
          }}
        >
          <p style={{ fontSize: "13px", color: "#014D98", fontWeight: 600, textAlign: "center" }}>
            Points added to your wallet
          </p>
        </div>

        {/* Hint */}
        <p
          style={{
            fontSize: "13px",
            color: "#B3B3B4",
            textAlign: "center",
            animation: "fade-in 0.5s ease 0.9s both",
          }}
        >
          Tap anywhere to continue
        </p>
      </div>
    </div>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import StatusBar from "@/app/components/StatusBar";



const PARTICLES = [
  { color: "#FED955", size: 10, left: "8%",  delay: "0s",    duration: "2.4s" },
  { color: "#F002AF", size: 7,  left: "18%", delay: "0.2s",  duration: "2.0s" },
  { color: "#fff",    size: 12, left: "30%", delay: "0.4s",  duration: "2.6s" },
  { color: "#63DBAE", size: 8,  left: "45%", delay: "0.1s",  duration: "2.2s" },
  { color: "#FED955", size: 11, left: "58%", delay: "0.5s",  duration: "2.8s" },
  { color: "#FA5D3E", size: 6,  left: "70%", delay: "0.3s",  duration: "2.1s" },
  { color: "#fff",    size: 9,  left: "82%", delay: "0.6s",  duration: "2.5s" },
  { color: "#F002AF", size: 7,  left: "93%", delay: "0.15s", duration: "2.3s" },
];

function SpinSuccessContent() {
  const router    = useRouter();
  const params    = useSearchParams();
  const points    = parseInt(params.get("points") ?? "0");
  const isWin     = points > 0;

  return (
    <div
      onClick={() => router.push("/home")}
      className="relative flex flex-col h-full items-center overflow-hidden"
      style={{
        background: isWin
          ? "linear-gradient(160deg, #3a0068 0%, #9728B8 45%, #F002AF 100%)"
          : "linear-gradient(160deg, #1a1a2e 0%, #2a2a4a 100%)",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        animation: "fade-in 0.35s ease both",
      }}
    >
      <StatusBar light={true} />

      {/* Floating particles (only on win) */}
      {isWin && PARTICLES.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          bottom: "-20px",
          left: p.left,
          width: `${p.size}px`,
          height: `${p.size}px`,
          borderRadius: "50%",
          background: p.color,
          animation: `drift ${p.duration} ${p.delay} ease-out infinite`,
          pointerEvents: "none",
          opacity: 0.8,
        }} />
      ))}

      {/* Decorative glow circles */}
      {isWin && (
        <>
          <div style={{
            position: "absolute", top: "-80px", right: "-80px",
            width: "260px", height: "260px", borderRadius: "50%",
            background: "rgba(254,217,85,0.12)", pointerEvents: "none",
            animation: "zoom-in 1s ease 0.3s both",
          }} />
          <div style={{
            position: "absolute", bottom: "60px", left: "-60px",
            width: "180px", height: "180px", borderRadius: "50%",
            background: "rgba(240,2,175,0.12)", pointerEvents: "none",
            animation: "zoom-in 1s ease 0.5s both",
          }} />
        </>
      )}

      {/* Content */}
      <div
        className="flex flex-col items-center"
        style={{ flex: 1, justifyContent: "center", padding: "0 32px", position: "relative", zIndex: 10 }}
      >

        {/* Spin wheel image */}
        <div
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            overflow: "hidden",
            marginBottom: "32px",
            boxShadow: isWin
              ? "0 0 0 6px rgba(254,217,85,0.4), 0 0 0 14px rgba(254,217,85,0.15), 0 12px 40px rgba(0,0,0,0.4)"
              : "0 8px 32px rgba(0,0,0,0.5)",
            animation: "zoom-in 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s both",
          }}
        >
          <Image
            src="/images/spinwheellarge.png"
            alt="Spin Wheel"
            width={200}
            height={200}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            unoptimized
          />
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: isWin ? "32px" : "26px",
            fontWeight: 800,
            color: "#fff",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: "12px",
            animation: "fade-up 0.5s ease 0.3s both",
          }}
        >
          {isWin ? "🎉 You Won!" : "Better Luck Next Time!"}
        </h2>

        {isWin ? (
          <>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", textAlign: "center", marginBottom: "20px", animation: "fade-up 0.5s ease 0.4s both" }}>
              Congratulations! You just earned
            </p>

            {/* Points badge */}
            <div style={{
              background: "linear-gradient(135deg, #FED955 0%, #FA9E1A 100%)",
              borderRadius: "9999px",
              padding: "14px 32px",
              marginBottom: "28px",
              boxShadow: "0 8px 24px rgba(254,217,85,0.5)",
              animation: "points-count 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.5s both",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}>
              <span style={{ fontSize: "22px" }}>🪙</span>
              <span style={{ fontSize: "28px", fontWeight: 900, color: "#0E0E10" }}>
                + {points} Points
              </span>
            </div>

            <div style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "12px",
              padding: "10px 20px",
              marginBottom: "32px",
              animation: "fade-up 0.5s ease 0.7s both",
            }}>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.9)", fontWeight: 600, textAlign: "center" }}>
                Points added to your wallet ✓
              </p>
            </div>
          </>
        ) : (
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", textAlign: "center", marginBottom: "32px", lineHeight: 1.6, animation: "fade-up 0.5s ease 0.4s both" }}>
            You landed on Try Again.{"\n"}Come back tomorrow for another spin!
          </p>
        )}

        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", textAlign: "center", animation: "fade-in 0.5s ease 0.9s both" }}>
          Tap anywhere to continue
        </p>
      </div>
    </div>
  );
}

export default function SpinWinSuccessPage() {
  return (
    <Suspense>
      <SpinSuccessContent />
    </Suspense>
  );
}

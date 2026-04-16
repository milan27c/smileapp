"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import StatusBar from "@/app/components/StatusBar";



// 8 equal segments, 45° each — clockwise from top (12 o'clock)
const SEGMENTS = [
  { label: "50 Points",  points: 50  },
  { label: "100 Points", points: 100 },
  { label: "10 Points",  points: 10  },
  { label: "Try Again",  points: 0   },
  { label: "50 Points",  points: 50  },
  { label: "100 Points", points: 100 },
  { label: "10 Points",  points: 10  },
  { label: "Try Again",  points: 0   },
];
const SEGMENT_DEG = 360 / SEGMENTS.length; // 45°

export default function SpinWheelPage() {
  const router = useRouter();
  const wheelRef = useRef<HTMLDivElement>(null);
  const [spinning, setSpinning] = useState(false);
  const [spun, setSpun]         = useState(false);
  const totalRotationRef        = useRef(0);

  const handleSpin = () => {
    if (spinning || spun) return;

    // Pick a random winning segment index
    const winIdx  = Math.floor(Math.random() * SEGMENTS.length);
    // Land in the middle of that segment (+/- 10° random wobble)
    const wobble  = (Math.random() - 0.5) * 20;
    const target  = winIdx * SEGMENT_DEG + SEGMENT_DEG / 2 + wobble;
    // 5 full clockwise rotations then land on target
    const total   = 5 * 360 + target;
    totalRotationRef.current = total;

    const wheel = wheelRef.current;
    if (!wheel) return;

    // Reset inline rotation so we always start from 0 for this spin
    wheel.style.transition = "none";
    wheel.style.transform  = "rotate(0deg)";

    // Force reflow then apply spin
    void wheel.offsetWidth;
    wheel.style.transition = "transform 4s cubic-bezier(0.17,0.67,0.12,0.99)";
    wheel.style.transform  = `rotate(${total}deg)`;

    setSpinning(true);

    // After spin completes
    setTimeout(() => {
      setSpinning(false);
      setSpun(true);
      const wonPoints = SEGMENTS[winIdx].points;
      // 1 second pause so user sees where pointer landed, then navigate
      setTimeout(() => {
        router.push(`/spin-win-success?points=${wonPoints}`);
      }, 1000);
    }, 4000);
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: "linear-gradient(160deg, #faf5ff 0%, #fff0fb 50%, #f0f9ff 100%)",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      <StatusBar />

      {/* App Bar */}
      <div
        className="flex-shrink-0 flex items-center px-5"
        style={{ paddingTop: "12px", paddingBottom: "8px", minHeight: "56px", background: "transparent" }}
      >
        <button onClick={() => router.back()} className="flex items-center gap-1">
          <ChevronLeft size={22} style={{ color: "#0E0E10" }} />
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>Spin & Win with Smile!</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-between px-5 pb-10">

        {/* Subtitle */}
        <p
          style={{
            fontSize: "20px",
            fontWeight: 800,
            color: "#0E0E10",
            textAlign: "center",
            marginTop: "4px",
            marginBottom: "20px",
          }}
        >
          Your Daily Chance to Win Big!
        </p>

        {/* Wheel + Pointer */}
        <div style={{ position: "relative", width: "300px", height: "300px", flexShrink: 0 }}>

          {/* Pointer — top center, overlaps wheel */}
          <div style={{
            position: "absolute",
            top: "-18px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            width: "36px",
            height: "48px",
          }}>
            <Image
              src="/images/pointer.png"
              alt="Pointer"
              fill
              style={{ objectFit: "contain" }}
              unoptimized
            />
          </div>

          {/* Spinning wheel */}
          <div
            ref={wheelRef}
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              boxShadow: "0 8px 40px rgba(151,40,184,0.25), 0 2px 8px rgba(0,0,0,0.15)",
              willChange: "transform",
              position: "relative",
            }}
          >
            <Image
              src="/images/spinwheellarge.png"
              alt="Spin Wheel"
              fill
              style={{ objectFit: "contain", borderRadius: "50%" }}
              unoptimized
            />
          </div>
        </div>

        {/* WHEEL OF FORTUNE label */}
        <p
          style={{
            fontSize: "22px",
            fontWeight: 900,
            background: "linear-gradient(90deg, #9728B8 0%, #F002AF 50%, #FA5D3E 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "1px",
            textAlign: "center",
            marginTop: "24px",
            marginBottom: "24px",
          }}
        >
          WHEEL OF FORTUNE
        </p>

        {/* Spin Button */}
        <button
          onClick={handleSpin}
          disabled={spinning || spun}
          style={{
            width: "100%",
            height: "48px",
            borderRadius: "12px",
            background: spinning || spun
              ? "#E4E4E7"
              : "linear-gradient(90deg, #9728B8 0%, #F002AF 100%)",
            color: spinning || spun ? "#B3B3B4" : "#fff",
            fontSize: "16px",
            fontWeight: 600,
            border: "none",
            cursor: spinning || spun ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            boxShadow: spinning || spun ? "none" : "0 6px 20px rgba(151,40,184,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {spinning ? (
            <>
              <div style={{
                width: "18px", height: "18px", borderRadius: "50%",
                border: "2.5px solid rgba(0,0,0,0.15)",
                borderTopColor: "#52525B",
                animation: "spin 0.7s linear infinite",
              }} />
              Spinning…
            </>
          ) : spun ? "Done!" : "Spin the Wheel"}
        </button>

      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";



const WEEKLY_CHALLENGES = [
  { id: 1, title: "Visit Cargills Food Hall 2 Times", points: 30, brand: "Cargills Food Hall", logo: "/images/Logos/Cargills Food Hall.png", percentage: 50, completed: 1, total: 2 },
  { id: 2, title: "Spend Rs. 2,000 At Finch Foods", points: 100, brand: "Finch Foods", logo: "/images/Logos/Finch Foods.png", percentage: 66, completed: 2, total: 3 },
];

const MONTHLY_CHALLENGES = [
  { id: 3, title: "Visit Cool Planet 3 Times", points: 250, brand: "Cool Planet", logo: "/images/Logos/Cool Planet.png", percentage: 75, completed: 2, total: 3 },
  { id: 4, title: "Shop at Levis & Odel", points: 150, brand: "Levis", logo: "/images/Logos/Levis.png", percentage: 60, completed: 3, total: 5 },
  { id: 5, title: "Visit Nail Spa", points: 100, brand: "Nail Spa", logo: "/images/Logos/Nail Spa.png", percentage: 40, completed: 1, total: 2 },
];

export default function ChallengesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly">("weekly");

  const challenges = activeTab === "weekly" ? WEEKLY_CHALLENGES : MONTHLY_CHALLENGES;

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7", fontFamily: "'Inter', sans-serif" }}>

      {/* App Bar */}
      <div className="flex-shrink-0 flex items-center px-5"
        style={{ paddingTop: "12px", paddingBottom: "8px", minHeight: "56px", borderBottom: "1px solid #F0F0F0", background: "#fff" }}>
        <button onClick={() => router.back()} className="flex items-center gap-1">
          <ChevronLeft size={22} style={{ color: "#0E0E10" }} />
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>Smile Challenges</span>
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-5">

        {/* Daily Check In Bonus Card */}
        <button
          onClick={() => router.push("/daily-checkin-success")}
          style={{
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            height: "128px",
            marginBottom: "16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            border: "none",
            cursor: "pointer",
            width: "100%",
            padding: "0",
            background: "transparent",
          }}
        >
          <Image
            src="/images/dailycheckinbg.jpg"
            alt="Daily Check In Bonus"
            fill
            style={{ objectFit: "cover" }}
            unoptimized
          />
          {/* Content: two-row layout */}
          <div className="absolute inset-0" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "14px 14px 14px 14px" }}>

            {/* Top row: icon + text block | streak badge */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>

              {/* Left: icon + title + subtitle */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", flex: 1, minWidth: 0 }}>
                <Image
                  src="/images/diamond.png"
                  alt="Diamond"
                  width={38}
                  height={38}
                  style={{ objectFit: "contain", flexShrink: 0, marginTop: "2px" }}
                  unoptimized
                />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#fff", lineHeight: 1.3, margin: "0 0 3px 0", textAlign: "left" }}>
                    Daily Check In Bonus
                  </p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.88)", lineHeight: 1.35, margin: 0, textAlign: "left" }}>
                    Come back every day & earn rewards
                  </p>
                </div>
              </div>

              {/* Right: streak badge */}
              <div style={{
                background: "rgba(255,255,255,0.22)",
                borderRadius: "9999px",
                padding: "5px 11px",
                fontSize: "11px",
                fontWeight: 600,
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.35)",
                whiteSpace: "nowrap",
                flexShrink: 0,
                lineHeight: 1,
              }}>
                3 Day Streak
              </div>
            </div>

            {/* Bottom row: points | button */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontSize: "22px", fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1 }}>
                + 20 Points
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); router.push("/daily-checkin-success"); }}
                style={{
                  background: "#fff",
                  color: "#9728B8",
                  border: "none",
                  borderRadius: "8px",
                  padding: "7px 16px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                Claim Now
              </button>
            </div>

          </div>
        </button>

        {/* Spin & Win Card */}
        <button
          onClick={() => router.push("/spin-wheel")}
          style={{
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            height: "160px",
            marginBottom: "20px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            width: "100%",
            border: "none",
            cursor: "pointer",
            padding: "0",
            background: "transparent",
            textAlign: "left",
          }}
        >
          <Image
            src="/images/myfamilybg.png"
            alt="Spin & Win"
            fill
            style={{ objectFit: "cover" }}
            unoptimized
          />
          {/* Dark overlay */}
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.15)" }} />

          {/* Content */}
          <div className="absolute inset-0 p-4 flex items-center justify-between">
            {/* Left: Text */}
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
                Spin & Win
              </p>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>
                Try your luck to win bonus points. 1 spin available today.
              </p>
              <div
                onClick={(e) => { e.stopPropagation(); router.push("/spin-wheel"); }}
                style={{
                  display: "inline-block",
                  background: "#fff",
                  color: "#9728B8",
                  borderRadius: "8px",
                  padding: "6px 14px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  marginTop: "8px",
                }}
              >
                Spin Now
              </div>
            </div>

            {/* Right: Spin Wheel Image */}
            <div style={{ position: "relative", width: "80px", height: "80px", flexShrink: 0 }}>
              <Image
                src="/images/spinwheel2.png"
                alt="Spin Wheel"
                fill
                style={{ objectFit: "contain" }}
                unoptimized
              />
            </div>
          </div>
        </button>

        {/* Challenge Tabs — match "Your Smile Points" tab style exactly */}
        <div className="flex gap-2 mb-4">
          {(["weekly", "monthly"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                paddingLeft: "16px",
                paddingRight: "16px",
                paddingTop: "8px",
                paddingBottom: "8px",
                borderRadius: "9999px",
                fontSize: "13px",
                fontWeight: 600,
                whiteSpace: "nowrap",
                border: "1.5px solid #0E0E10",
                cursor: "pointer",
                background: activeTab === tab ? "#0E0E10" : "transparent",
                color: activeTab === tab ? "#fff" : "#0E0E10",
                transition: "all 0.2s",
                boxShadow: activeTab === tab ? "0 2px 8px rgba(14, 14, 16, 0.15)" : "none",
              }}
            >
              {tab === "weekly" ? "Weekly Challenges" : "Monthly Challenges"}
            </button>
          ))}
        </div>

        {/* Challenges List */}
        <div className="flex flex-col gap-3 pb-6">
          {challenges.map((challenge) => (
            <button
              key={challenge.id}
              onClick={() => router.push(`/challenge-details/${challenge.id}`)}
              style={{
                background: "#fff",
                borderRadius: "16px",
                border: "1px solid #F0F0F0",
                padding: "14px",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s",
                width: "100%",
                display: "block",
              }}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              {/* Header: Logo + Title + Points Badge */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "#F1F1F1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  position: "relative",
                  overflow: "hidden",
                }}>
                  <Image
                    src={challenge.logo}
                    alt={challenge.brand}
                    width={44}
                    height={44}
                    style={{ objectFit: "contain", padding: "4px" }}
                    unoptimized
                  />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#0E0E10", marginBottom: "5px", lineHeight: 1.3 }}>
                    {challenge.title}
                  </p>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    background: "rgba(1,77,152,0.1)",
                    color: "#014D98",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: 400,
                  }}>
                    🏆 Earn {challenge.points} Smile Points
                  </div>
                </div>
              </div>

              {/* Progress bar + percentage on right */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  flex: 1,
                  height: "6px",
                  borderRadius: "9999px",
                  background: "#F1F1F1",
                  overflow: "hidden",
                  position: "relative",
                }}>
                  <div style={{
                    position: "absolute",
                    height: "100%",
                    width: `${challenge.percentage}%`,
                    backgroundImage: "linear-gradient(90deg, #9728B8 0%, #F002AF 100%)",
                    borderRadius: "9999px",
                    transition: "width 0.3s ease",
                  }} />
                </div>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#0E0E10", flexShrink: 0 }}>
                  {challenge.percentage}%
                </p>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

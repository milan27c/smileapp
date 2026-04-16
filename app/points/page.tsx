"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";



export default function PointsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"earned" | "redeemed">("earned");

  const earnedTransactions = [
    { id: 1, date: "Jan 17, 2026", merchant: "Daily Check in Points", points: "+10", description: "Check in:", expiry: "Expire On: Jan 17, 2027" },
    { id: 2, date: "Jan 17, 2026", merchant: "Cargills Food Hall", points: "+35", description: "Bill Value: Rs 3,500", expiry: "Expire On: Jan 17, 2027" },
    { id: 3, date: "Jan 17, 2026", merchant: "Nail Spa", points: "+62", description: "Bill Value: Rs 6,200", expiry: "Expire On: Jan 17, 2027" },
    { id: 4, date: "Jan 15, 2026", merchant: "KFC", points: "+30", description: "Bill Value: Rs 3,080", expiry: "Expire On: Jan 15, 2027" },
    { id: 5, date: "Jan 15, 2026", merchant: "Scope Cinema", points: "+25", description: "Bill Value: Rs 6,200", expiry: "Expire On: Jan 15, 2027" },
  ];

  const redeemedTransactions = [
    { id: 1, date: "Jan 10, 2026", merchant: "Coffee Voucher", points: "-50", description: "Free Coffee Redeemed", expiry: "" },
    { id: 2, date: "Jan 08, 2026", merchant: "Parking Hours", points: "-100", description: "2 Hours Parking", expiry: "" },
  ];

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7" }}>

      {/* App Bar */}
      <div
        className="relative flex items-center px-5 flex-shrink-0"
        style={{
          paddingTop: "12px",
          paddingBottom: "8px",
          background: "#fff",
          borderBottom: "1px solid #F0F0F0",
          minHeight: "56px",
        }}
      >
        <button onClick={() => router.back()} className="flex items-center gap-1">
          <ChevronLeft size={22} style={{ color: "#0E0E10" }} />
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>Your Smile Points</span>
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-[192px]">
        {/* Points Hero Section */}
        <div className="px-4 pt-5 pb-2">
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: "24px",
              background: "linear-gradient(135deg, #014D98 0%, #9728B8 55%, #F002AF 100%)",
              boxShadow: "0 12px 32px rgba(151,40,184,0.35)",
            }}
          >
            {/* Decorative circles */}
            <div
              className="absolute"
              style={{
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
                top: "-60px",
                right: "-50px",
                pointerEvents: "none",
              }}
            />
            <div
              className="absolute"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.04)",
                bottom: "20px",
                left: "-30px",
                pointerEvents: "none",
              }}
            />

            {/* Top section with points + image */}
            <div className="relative z-10 flex items-start" style={{ padding: "20px 20px 0 20px" }}>
              {/* Left: Points info */}
              <div className="flex-1">
                {/* Silver badge */}
                <div
                  className="flex items-center gap-1.5 px-3 py-1 w-fit mb-3"
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    borderRadius: "9999px",
                    border: "1px solid rgba(255,255,255,0.35)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "bold",
                      background: "linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #A8A8A8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    ★
                  </span>
                  <span className="font-bold text-white" style={{ fontSize: "10px", letterSpacing: "0.5px" }}>
                    SILVER MEMBER
                  </span>
                </div>

                {/* Points */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span
                    className="text-white font-extrabold"
                    style={{ fontSize: "44px", lineHeight: 1, letterSpacing: "-1px" }}
                  >
                    780
                  </span>
                  <span className="text-white/70 font-medium" style={{ fontSize: "14px" }}>
                    Available Points
                  </span>
                </div>

                {/* Expiry */}
                <p style={{ fontSize: "10px", color: "#FFB3B3" }}>
                  265 Points expire Jan 31, 2026
                </p>
              </div>

              {/* Right: Smile Rewards Image */}
              <div className="flex-shrink-0" style={{ width: "120px", height: "120px", marginTop: "-4px", marginRight: "-8px" }}>
                <Image
                  src="/images/smilerewards.png"
                  alt="Smile Rewards"
                  width={120}
                  height={120}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Progress bar section */}
            <div className="relative z-10" style={{ padding: "12px 20px 16px 20px" }}>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-white/80 font-medium" style={{ fontSize: "11px" }}>
                  Progress to Platinum
                </p>
                <p className="text-white/80" style={{ fontSize: "11px" }}>
                  4250/5000
                </p>
              </div>
              <div
                className="w-full mb-1.5"
                style={{ height: "6px", borderRadius: "9999px", background: "rgba(255,255,255,0.2)" }}
              >
                <div
                  style={{
                    width: "85%",
                    height: "100%",
                    borderRadius: "9999px",
                    background: "linear-gradient(90deg, #FED955, #FA9E1A)",
                    boxShadow: "0 0 10px rgba(254, 217, 85, 0.4)",
                  }}
                />
              </div>
              <p className="text-white/70" style={{ fontSize: "10px" }}>
                750 more points to unlock Platinum
              </p>
            </div>
          </div>
        </div>

        {/* Wonder How Smile Points Grow */}
        <div className="px-4" style={{ marginBottom: "12px" }}>
          <button onClick={() => router.push("/wonderhow")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "flex-end", width: "100%" }}>
            <p className="font-bold" style={{ fontSize: "13px", color: "#9728B8" }}>
              Wonder How Smile Points Grow?
            </p>
          </button>
        </div>

        {/* Chip Navigation */}
        <div className="px-4 pb-5" style={{ marginTop: "26px" }}>
          <div className="flex gap-2">
            {(["earned", "redeemed"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="font-medium transition-all duration-200"
                style={{
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  borderRadius: "9999px",
                  fontSize: "13px",
                  fontWeight: 600,
                  background: activeTab === tab ? "#0E0E10" : "transparent",
                  color: activeTab === tab ? "#fff" : "#0E0E10",
                  border: `1.5px solid ${activeTab === tab ? "#0E0E10" : "#0E0E10"}`,
                  cursor: "pointer",
                  boxShadow: activeTab === tab ? "0 2px 8px rgba(14, 14, 16, 0.15)" : "none",
                }}
              >
                {tab === "earned" ? "Earned Points" : "Redeemed Points"}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions List */}
        <div className="px-4 pb-8">
          {(() => {
            const txs = activeTab === "earned" ? earnedTransactions : redeemedTransactions;
            let lastDate = "";
            return txs.map((tx) => {
              const showDate = tx.date !== lastDate;
              lastDate = tx.date;
              return (
                <div key={tx.id}>
                  {showDate && (
                    <p className="py-2 font-semibold" style={{ fontSize: "12px", color: "#52525B", marginTop: "4px" }}>
                      {tx.date}
                    </p>
                  )}
                  <div
                    className="flex items-center gap-3 mb-2 p-3"
                    style={{
                      background: "#fff",
                      borderRadius: "14px",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "12px",
                        background: activeTab === "earned"
                          ? "rgba(99, 219, 174, 0.12)"
                          : "rgba(151, 40, 184, 0.1)",
                      }}
                    >
                      <span style={{ fontSize: "18px" }}>
                        {activeTab === "earned" ? "🪙" : "🎁"}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold" style={{ fontSize: "13px", color: "#0E0E10" }}>
                        {tx.merchant}
                      </p>
                      <p style={{ fontSize: "11px", color: "#52525B", marginTop: "2px" }}>
                        {tx.description}
                      </p>
                    </div>

                    {/* Points + Expiry */}
                    <div className="text-right flex-shrink-0">
                      <p
                        className="font-bold"
                        style={{
                          fontSize: "14px",
                          color: tx.points.startsWith("+") ? "#27AE60" : "#DC2626",
                        }}
                      >
                        {tx.points} Points
                      </p>
                      {tx.expiry && (
                        <p style={{ fontSize: "9px", color: "#B3B3B4", marginTop: "2px" }}>
                          {tx.expiry}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>

        {/* Platinum Membership Card */}
        <div className="px-4 pb-6">
          <button
            onClick={() => router.push("/platinum")}
            className="w-full relative overflow-hidden"
            style={{
              borderRadius: "16px",
              padding: "20px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s",
              backgroundImage: "url(/images/platinummember.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "100px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

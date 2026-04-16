"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";



const EXCLUSIVE_OFFERS = [
  { id: 1, title: "Get 30% off on full priced items", store: "Odel, 1st Floor", validTill: "18 - 19 Nov 2025", points: 150, img: "/images/rewardsscreen/Fashion/cool planet.png" },
  { id: 2, title: "Triple Points on Every Purchase", store: "Kombu, Ground Floor", validTill: "30 Nov 2025", points: 80, img: "/images/rewardsscreen/Food and Beverages/kombu.png" },
  { id: 3, title: "Buy 2 Get 1 Free on All Pizzas", store: "The Pizza Co., Level 1", validTill: "15 Dec 2025", points: 120, img: "/images/rewardsscreen/Food and Beverages/pizzas.png" },
  { id: 4, title: "Exclusive Spa Package Deal", store: "Spa Ceylon, Level 3", validTill: "28 Feb 2026", points: 200, img: "/images/rewardsscreen/Health Beauty & Wellness/spa ceylon.png" },
];

const TIER_CONFIG = {
  bronze: { name: "Bronze", icon: "🏆", color: "#B87333", nextLabel: "Your starting tier" },
  silver: { name: "Silver", icon: "⭐", color: "#C0C0C0", nextLabel: "Unlock at 500 Points" },
  platinum: { name: "Platinum", icon: "✨", color: "#9728B8", nextLabel: "Unlock at 1,000 Points" },
};

export default function PlatinumPage() {
  const router = useRouter();
  const [activeTier, setActiveTier] = useState<"bronze" | "silver" | "platinum">("platinum"); // Default to next tier (Platinum for Silver users)

  const tierData = TIER_CONFIG[activeTier];

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7", fontFamily: "'Inter', sans-serif" }}>

      {/* App Bar */}
      <div className="flex-shrink-0 flex items-center px-5"
        style={{ paddingTop: "12px", paddingBottom: "8px", minHeight: "56px", borderBottom: "1px solid #F0F0F0", background: "#fff" }}>
        <button onClick={() => router.back()} className="flex items-center gap-1">
          <ChevronLeft size={22} style={{ color: "#0E0E10" }} />
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>Tier Benefits</span>
        </button>
      </div>

      {/* Tier Tab Selection */}
      <div className="px-5 pt-3 pb-3 flex gap-2" style={{ background: "#fff", borderBottom: "1px solid #F0F0F0", overflowX: "auto", scrollbarWidth: "none" }}>
        {(["bronze", "silver", "platinum"] as const).map((tier) => (
          <button key={tier} onClick={() => setActiveTier(tier)}
            style={{
              paddingLeft: "12px",
              paddingRight: "12px",
              paddingTop: "8px",
              paddingBottom: "8px",
              borderRadius: "9999px",
              fontSize: "13px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              border: "none",
              cursor: "pointer",
              background: activeTier === tier ? "#0E0E10" : "#F5F5F7",
              color: activeTier === tier ? "#fff" : "#0E0E10",
              transition: "all 0.2s",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}>
            <div style={{
              width: "20px",
              height: "20px",
              position: "relative",
              flexShrink: 0,
            }}>
              <Image
                src={`/images/${tier}.png`}
                alt={TIER_CONFIG[tier].name}
                fill
                style={{ objectFit: "contain" }}
                unoptimized
              />
            </div>
            {TIER_CONFIG[tier].name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-[192px]">

        {/* Header */}
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0E0E10", marginBottom: "8px" }}>
            {tierData.icon} {tierData.name} Member
          </h2>
          <p style={{ fontSize: "13px", color: "#52525B", lineHeight: 1.6 }}>
            {activeTier === "platinum" && "Unlock premium rewards and exclusive perks at 1,000 Smile Points."}
            {activeTier === "silver" && "Enjoy enhanced benefits at 500 Smile Points."}
            {activeTier === "bronze" && "Your starting tier with baseline rewards."}
          </p>
        </div>

        {/* Benefits Card */}
        <div style={{
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #F0F0F0",
          padding: "16px",
          marginBottom: "20px",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {activeTier === "platinum" && [
              { icon: "⚡", title: "Bonus Points Boost", desc: "Earn 1.5x Smile Points on every spend." },
              { icon: "🎁", title: "Exclusive Platinum Rewards", desc: "Access special deals and limited-time offers." },
              { icon: "🎂", title: "Birthday Surprises", desc: "Celebrate with extra rewards made just for you." },
              { icon: "🚀", title: "Priority Access", desc: "Be first in line for new perks and events." },
              { icon: "💬", title: "Dedicated Support", desc: "Enjoy faster help and priority service." },
            ].map((benefit, i) => (
              <div key={i} style={{ display: "flex", gap: "10px" }}>
                <span style={{ fontSize: "16px", flex: "0 0 20px" }}>{benefit.icon}</span>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#0E0E10", marginBottom: "2px" }}>{benefit.title}</p>
                  <p style={{ fontSize: "12px", color: "#52525B" }}>{benefit.desc}</p>
                </div>
              </div>
            ))}
            {activeTier === "silver" && [
              { icon: "✨", title: "Enhanced Points", desc: "Earn 1.2x Smile Points on purchases." },
              { icon: "🎯", title: "Member-Only Offers", desc: "Exclusive deals tailored for Silver members." },
              { icon: "📱", title: "Early Notifications", desc: "Get notified about special promotions first." },
            ].map((benefit, i) => (
              <div key={i} style={{ display: "flex", gap: "10px" }}>
                <span style={{ fontSize: "16px", flex: "0 0 20px" }}>{benefit.icon}</span>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#0E0E10", marginBottom: "2px" }}>{benefit.title}</p>
                  <p style={{ fontSize: "12px", color: "#52525B" }}>{benefit.desc}</p>
                </div>
              </div>
            ))}
            {activeTier === "bronze" && [
              { icon: "🎯", title: "Base Points", desc: "Earn 1x Smile Point on every Rs. 250 spent." },
              { icon: "🏪", title: "Partner Benefits", desc: "Access exclusive partner store deals." },
              { icon: "📅", title: "Earn & Redeem", desc: "Start your journey to higher tiers." },
            ].map((benefit, i) => (
              <div key={i} style={{ display: "flex", gap: "10px" }}>
                <span style={{ fontSize: "16px", flex: "0 0 20px" }}>{benefit.icon}</span>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#0E0E10", marginBottom: "2px" }}>{benefit.title}</p>
                  <p style={{ fontSize: "12px", color: "#52525B" }}>{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
}

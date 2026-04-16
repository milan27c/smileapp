"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Gift,
  Compass,
  User,
  Home as HomeIcon,
  MapPin,
  Calendar,
} from "lucide-react";



type Reward = {
  id: number;
  title: string;
  store: string;
  floor: string;
  validTill: string;
  points: number;
  category: string;
  logo: string;
  banner: string;
};

const allRewards: Reward[] = [
  // Fashion
  { id: 1, title: "Get 20% off on Fashion", store: "Cool Planet", floor: "Ground Floor", validTill: "30 Nov 2025", points: 150, category: "Fashion", logo: "/images/rewardsscreen/Fashion/coolplanet.png", banner: "/images/rewardsbanner/coolplanet.png" },
  // Food & Beverages
  { id: 2, title: "Buy 1 Get 1 Free Burger", store: "Fish & Co.", floor: "Ground Floor", validTill: "15 Dec 2025", points: 120, category: "Food & Beverages", logo: "/images/rewardsscreen/Food and Beverages/fishandco.png", banner: "/images/rewardsbanner/fishandco.png" },
  { id: 3, title: "15% off All Pizzas", store: "Pizza Hut", floor: "Level 1", validTill: "20 Dec 2025", points: 100, category: "Food & Beverages", logo: "/images/rewardsscreen/Food and Beverages/pizzahut.png", banner: "/images/rewardsbanner/pizzahut.png" },
  { id: 4, title: "Free Churros on Every Meal", store: "Taco Bell", floor: "Level 2", validTill: "10 Jan 2026", points: 80, category: "Food & Beverages", logo: "/images/rewardsscreen/Food and Beverages/tacobell.png", banner: "/images/rewardsbanner/tacobell.png" },
  // Health, Beauty & Wellness
  { id: 5, title: "Full Body Spa Ritual", store: "Spa Ceylon", floor: "Level 3", validTill: "28 Feb 2026", points: 400, category: "Health, Beauty & Wellness", logo: "/images/rewardsscreen/Health Beauty & Wellness/spaceylon.png", banner: "/images/rewardsbanner/spaceylon.png" },
  // Fashion
  { id: 6, title: "Exclusive Designer Collection", store: "Saheli", floor: "Level 1", validTill: "31 Jan 2026", points: 200, category: "Fashion", logo: "/images/rewardsscreen/Fashion/saheli.png", banner: "/images/rewardsbanner/saheli.png" },
  // Food & Beverages
  { id: 7, title: "Fresh Produce & Gourmet Deals", store: "Cargills Food Hall", floor: "Ground Floor", validTill: "15 Jan 2026", points: 180, category: "Food & Beverages", logo: "/images/rewardslogos/cargillsfoodhall.png", banner: "/images/rewardsbanner/cargillsfoodhall.png" },
  // Fashion
  { id: 8, title: "Exclusive Fashion & Accessories", store: "Odel", floor: "Ground Floor", validTill: "25 Jan 2026", points: 220, category: "Fashion", logo: "/images/rewardslogos/odel.png", banner: "/images/rewardsbanner/odel.png" },
];

const categories = [
  "All",
  "Fashion",
  "Food & Beverages",
  "Health, Beauty & Wellness",
];

const categoriesWithRewards = new Set(allRewards.map((r) => r.category));

function RewardsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") ?? "All";
  const initialCategory = categories.includes(categoryParam) ? categoryParam : "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filtered =
    activeCategory === "All"
      ? allRewards
      : allRewards.filter((r) => r.category === activeCategory);

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7" }}>

      {/* App Bar */}
      <div
        className="relative flex items-center justify-between px-5 flex-shrink-0"
        style={{
          paddingTop: "12px",
          paddingBottom: "8px",
          background: "#fff",
          borderBottom: "1px solid #F0F0F0",
          minHeight: "56px",
        }}
      >
        <h1 className="font-bold" style={{ fontSize: "16px", color: "#0E0E10" }}>
          Rewards
        </h1>
        <div style={{ width: "40px" }} />
      </div>

      {/* Category Chips — horizontal scroll */}
      <div
        className="overflow-x-auto no-scrollbar flex-shrink-0"
        style={{ background: "#fff", paddingTop: "12px", paddingBottom: "12px" }}
      >
        <div className="flex gap-2" style={{ paddingLeft: "16px", paddingRight: "16px", width: "fit-content" }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const hasRewards = cat === "All" || categoriesWithRewards.has(cat);
            const isDisabled = !hasRewards;

            // Define gradient for each category
            const getGradient = (category: string) => {
              const gradients: { [key: string]: string } = {
                "All": "linear-gradient(135deg, #9728B8 0%, #F002AF 100%)",
                "Fashion": "linear-gradient(135deg, #FA5D3E 0%, #F002AF 100%)",
                "Food & Beverages": "linear-gradient(135deg, #FFA500 0%, #FA5D3E 100%)",
                "Health, Beauty & Wellness": "linear-gradient(135deg, #63DBAE 0%, #00C1E2 100%)",
              };
              return gradients[category] || "linear-gradient(135deg, #9728B8 0%, #F002AF 100%)";
            };

            return (
              <button
                key={cat}
                disabled={isDisabled}
                onClick={() => !isDisabled && setActiveCategory(cat)}
                style={{
                  whiteSpace: "nowrap",
                  paddingTop: "7px",
                  paddingBottom: "7px",
                  paddingLeft: "14px",
                  paddingRight: "14px",
                  borderRadius: "9999px",
                  fontSize: "12px",
                  fontWeight: 600,
                  background: isActive ? getGradient(cat) : "transparent",
                  color: isDisabled ? "#B3B3B4" : isActive ? "#fff" : "#0E0E10",
                  border: `1.5px solid ${isDisabled ? "#D4D4D8" : isActive ? "transparent" : "#0E0E10"}`,
                  cursor: isDisabled ? "not-allowed" : "pointer",
                  transition: "all 0.15s",
                  flexShrink: 0,
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rewards List */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-[192px] px-4 pt-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p style={{ fontSize: "14px", color: "#B3B3B4" }}>No rewards in this category</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((reward) => (
              <button
                key={reward.id}
                onClick={() => router.push(`/reward-details/${reward.id}`)}
                className="flex items-center gap-3 w-full text-left"
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "14px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {/* Logo */}
                <div
                  className="relative flex-shrink-0 overflow-hidden"
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "12px",
                    background: "#fff",
                    border: "1px solid #F0F0F0",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  }}
                >
                  <Image
                    src={reward.logo}
                    alt={reward.store}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-center gap-1">
                  {/* Title */}
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#0E0E10", lineHeight: 1.3 }}>
                    {reward.title}
                  </p>

                  {/* Store + Floor */}
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} style={{ color: "#52525B", flexShrink: 0 }} />
                    <p style={{ fontSize: "12px", color: "#52525B" }}>
                      {reward.store} · {reward.floor}
                    </p>
                  </div>

                  {/* Valid Till */}
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} style={{ color: "#52525B", flexShrink: 0 }} />
                    <p style={{ fontSize: "12px", color: "#52525B" }}>
                      {reward.validTill}
                    </p>
                  </div>
                </div>

                {/* Points Badge */}
                <div
                  className="flex-shrink-0 flex items-center gap-1"
                  style={{
                    background: "#F0F0F0",
                    paddingLeft: "8px",
                    paddingRight: "10px",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    borderRadius: "9999px",
                  }}
                >
                  <span style={{ fontSize: "14px", flexShrink: 0 }}>🪙</span>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#0E0E10", margin: 0 }}>
                    {reward.points} pts
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Bottom Navigation ── */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center"
        style={{
          height: "72px",
          background: "#fff",
          borderTop: "1px solid #F0F0F0",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
        }}
      >
        {[
          { icon: HomeIcon, label: "Home", active: false },
          { icon: Gift, label: "Rewards", active: true },
          { icon: Compass, label: "Explore", active: false },
          { icon: Calendar, label: "Events", active: false },
          { icon: User, label: "Profile", active: false },
        ].map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            onClick={() => {
              if (label === "Home") router.push("/home");
              if (label === "Explore") router.push("/explore");
              if (label === "Events") router.push("/events");
              if (label === "Profile") router.push("/profile");
            }}
            className="flex-1 flex flex-col items-center justify-center gap-1"
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: "36px",
                height: "28px",
                borderRadius: "9999px",
                background: active ? "rgba(151,40,184,0.12)" : "transparent",
                transition: "background 0.2s",
              }}
            >
              <Icon
                size={20}
                style={{ color: active ? "#9728B8" : "#B3B3B4" }}
                strokeWidth={active ? 2.5 : 1.75}
              />
            </div>
            <span
              className="font-semibold"
              style={{
                fontSize: "10px",
                color: active ? "#9728B8" : "#B3B3B4",
              }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>

    </div>
  );
}

export default function RewardsPage() {
  return (
    <Suspense fallback={<div style={{ background: "#F5F5F7", height: "100%" }} />}>
      <RewardsContent />
    </Suspense>
  );
}

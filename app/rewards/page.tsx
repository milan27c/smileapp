"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Gift,
  Car,
  Compass,
  User,
  Home as HomeIcon,
  MapPin,
  Calendar,
  Gem,
} from "lucide-react";



type Reward = {
  id: number;
  title: string;
  store: string;
  floor: string;
  validTill: string;
  points: number;
  category: string;
  img: string;
};

const allRewards: Reward[] = [
  // Fashion
  { id: 1, title: "Get 10% off at Cool Planet", store: "Cool Planet", floor: "Ground Floor", validTill: "30 Nov 2025", points: 150, category: "Fashion", img: "/images/rewardsscreen/Fashion/cool planet.png" },
  // Food & Beverages
  { id: 2, title: "Kombu Tea Promo – Buy 1 Get 1", store: "Kombu", floor: "Ground Floor", validTill: "30 Nov 2025", points: 80, category: "Food & Beverages", img: "/images/rewardsscreen/Food and Beverages/kombu.png" },
  { id: 3, title: "15% off All Pizzas", store: "The Pizza Co.", floor: "Level 1", validTill: "15 Dec 2025", points: 120, category: "Food & Beverages", img: "/images/rewardsscreen/Food and Beverages/pizzas.png" },
  { id: 4, title: "Weekday Punch Bowl Special", store: "Fish & Co.", floor: "Ground Floor", validTill: "30 Nov 2025", points: 150, category: "Food & Beverages", img: "/images/rewardsscreen/Food and Beverages/punch bow.png" },
  // Health, Beauty & Wellness
  { id: 5, title: "Spa Ceylon Full Body Ritual", store: "Spa Ceylon", floor: "Level 3", validTill: "28 Feb 2026", points: 400, category: "Health, Beauty & Wellness", img: "/images/rewardsscreen/Health Beauty & Wellness/spa ceylon.png" },
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
  const [drawerReward, setDrawerReward] = useState<Reward | null>(null);

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
                  background: isActive ? "#0E0E10" : "transparent",
                  color: isDisabled ? "#B3B3B4" : isActive ? "#fff" : "#0E0E10",
                  border: `1.5px solid ${isDisabled ? "#D4D4D8" : "#0E0E10"}`,
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
      <div className="flex-1 overflow-y-auto no-scrollbar pb-[192px] px-4 pt-4" style={{ paddingBottom: "100px" }}>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p style={{ fontSize: "14px", color: "#B3B3B4" }}>No rewards in this category</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((reward) => (
              <div
                key={reward.id}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  overflow: "hidden",
                }}
              >
                {/* Card title bar */}
                <div style={{ padding: "14px 14px 10px 14px" }}>
                  <p className="font-semibold" style={{ fontSize: "14px", color: "#0E0E10", lineHeight: 1.3 }}>
                    {reward.title}
                  </p>
                </div>

                {/* Card body: image + details */}
                <div className="flex gap-3" style={{ paddingLeft: "14px", paddingRight: "14px", paddingBottom: "14px" }}>
                  {/* Promo image */}
                  <div
                    className="relative flex-shrink-0 overflow-hidden"
                    style={{ width: "100px", height: "100px", borderRadius: "12px" }}
                  >
                    <Image
                      src={reward.img}
                      alt={reward.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between" style={{ marginLeft: "10px" }}>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={11} style={{ color: "#52525B", flexShrink: 0 }} />
                        <p style={{ fontSize: "11px", color: "#52525B" }}>
                          {reward.store}, {reward.floor}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={11} style={{ color: "#52525B", flexShrink: 0 }} />
                        <p style={{ fontSize: "11px", color: "#52525B" }}>
                          Valid Till: {reward.validTill}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Gem size={11} style={{ color: "#52525B", flexShrink: 0 }} />
                        <p style={{ fontSize: "11px", color: "#52525B" }}>
                          Redeem:{" "}
                          <span className="font-semibold" style={{ color: "#0E0E10" }}>
                            {reward.points} Smile Points
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Redeem button — secondary style */}
                    <button
                      onClick={() => setDrawerReward(reward)}
                      className="w-fit"
                      style={{
                        marginTop: "10px",
                        height: "36px",
                        paddingLeft: "18px",
                        paddingRight: "18px",
                        borderRadius: "10px",
                        fontSize: "13px",
                        fontWeight: 600,
                        background: "#fff",
                        color: "#9728B8",
                        border: "1.5px solid #9728B8",
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      Redeem Now
                    </button>
                  </div>
                </div>
              </div>
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
          { icon: Car, label: "Parking", active: false },
          { icon: User, label: "Profile", active: false },
        ].map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            onClick={() => {
              if (label === "Home") router.push("/home");
              if (label === "Explore") router.push("/explore");
              if (label === "Parking") router.push("/parking");
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

      {/* Bottom Drawer — Redeem Options */}
      {drawerReward && (
        <>
          {/* Backdrop */}
          <div
            className="absolute inset-0 z-50"
            style={{
              background: "rgba(0,0,0,0.4)",
              animation: "fadeIn 0.3s ease-out",
            }}
            onClick={() => setDrawerReward(null)}
          />

          {/* Drawer */}
          <div
            className="absolute left-0 right-0 bottom-0 z-50"
            style={{
              background: "#fff",
              borderTopLeftRadius: "24px",
              borderTopRightRadius: "24px",
              padding: "16px 20px 32px",
              boxShadow: "0 -8px 32px rgba(0,0,0,0.12)",
              animation: "slideUp 0.3s ease-out",
            }}
            onTouchStart={(e) => {
              const startY = e.touches[0].clientY;
              const handler = (moveEvent: TouchEvent) => {
                const currentY = moveEvent.touches[0].clientY;
                const diff = currentY - startY;
                if (diff > 100) {
                  setDrawerReward(null);
                }
              };
              document.addEventListener("touchmove", handler, { once: true });
            }}
          >
            {/* Drag Handle */}
            <div
              className="mx-auto mb-5 cursor-grab active:cursor-grabbing"
              style={{ width: "36px", height: "4px", borderRadius: "9999px", background: "#E4E4E7" }}
            />

            <p className="font-bold mb-1" style={{ fontSize: "17px", color: "#0E0E10" }}>
              Redeem Reward
            </p>
            <p className="mb-6" style={{ fontSize: "13px", color: "#52525B", lineHeight: 1.5 }}>
              Choose how you'd like to redeem your{" "}
              <span style={{ fontWeight: 600, color: "#0E0E10" }}>{drawerReward.points} points</span>
            </p>

            <div className="flex gap-3">
              {/* Scan QR option */}
              <button
                onClick={() => { setDrawerReward(null); router.push("/scanner"); }}
                className="flex-1 flex flex-col items-center gap-3 py-5"
                style={{
                  borderRadius: "16px",
                  border: "1.5px solid #E4E4E7",
                  background: "#FAFAFA",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{ width: "52px", height: "52px", borderRadius: "12px", background: "rgba(151,40,184,0.08)" }}
                >
                  <Image
                    src="/images/Home Page Gifs/scanqr.gif"
                    alt="Scan QR"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="text-center">
                  <p className="font-semibold" style={{ fontSize: "13px", color: "#0E0E10" }}>Scan QR</p>
                  <p style={{ fontSize: "11px", color: "#52525B", marginTop: "2px" }}>Scan merchant QR</p>
                </div>
              </button>

              {/* My QR option */}
              <button
                onClick={() => { setDrawerReward(null); router.push("/myqr"); }}
                className="flex-1 flex flex-col items-center gap-3 py-5"
                style={{
                  borderRadius: "16px",
                  border: "1.5px solid #E4E4E7",
                  background: "#FAFAFA",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{ width: "52px", height: "52px", borderRadius: "12px", background: "rgba(240,2,175,0.08)" }}
                >
                  <Image
                    src="/images/Home Page Gifs/myqr.gif"
                    alt="My QR"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="text-center">
                  <p className="font-semibold" style={{ fontSize: "13px", color: "#0E0E10" }}>My QR</p>
                  <p style={{ fontSize: "11px", color: "#52525B", marginTop: "2px" }}>Show your QR code</p>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
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

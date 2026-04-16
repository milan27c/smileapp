"use client";

import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, MapPin, Calendar } from "lucide-react";
import { useState } from "react";

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

const REWARDS: Record<string, Reward> = {
  "1": {
    id: 1,
    title: "Get 20% off on Fashion",
    store: "Cool Planet",
    floor: "Ground Floor",
    validTill: "30 Nov 2025",
    points: 150,
    category: "Fashion",
    logo: "/images/rewardsscreen/Fashion/coolplanet.png",
    banner: "/images/rewardsbanner/coolplanet.png",
  },
  "2": {
    id: 2,
    title: "Buy 1 Get 1 Free Burger",
    store: "Fish & Co.",
    floor: "Ground Floor",
    validTill: "15 Dec 2025",
    points: 120,
    category: "Food & Beverages",
    logo: "/images/rewardsscreen/Food and Beverages/fishandco.png",
    banner: "/images/rewardsbanner/fishandco.png",
  },
  "3": {
    id: 3,
    title: "15% off All Pizzas",
    store: "Pizza Hut",
    floor: "Level 1",
    validTill: "20 Dec 2025",
    points: 100,
    category: "Food & Beverages",
    logo: "/images/rewardsscreen/Food and Beverages/pizzahut.png",
    banner: "/images/rewardsbanner/pizzahut.png",
  },
  "4": {
    id: 4,
    title: "Free Churros on Every Meal",
    store: "Taco Bell",
    floor: "Level 2",
    validTill: "10 Jan 2026",
    points: 80,
    category: "Food & Beverages",
    logo: "/images/rewardsscreen/Food and Beverages/tacobell.png",
    banner: "/images/rewardsbanner/tacobell.png",
  },
  "5": {
    id: 5,
    title: "Full Body Spa Ritual",
    store: "Spa Ceylon",
    floor: "Level 3",
    validTill: "28 Feb 2026",
    points: 400,
    category: "Health, Beauty & Wellness",
    logo: "/images/rewardsscreen/Health Beauty & Wellness/spaceylon.png",
    banner: "/images/rewardsbanner/spaceylon.png",
  },
  "6": {
    id: 6,
    title: "Exclusive Designer Collection",
    store: "Saheli",
    floor: "Level 1",
    validTill: "31 Jan 2026",
    points: 200,
    category: "Fashion",
    logo: "/images/rewardsscreen/Fashion/saheli.png",
    banner: "/images/rewardsbanner/saheli.png",
  },
};

export default function RewardDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const rewardId = params?.id as string;
  const reward = REWARDS[rewardId];
  const [showRedeemDrawer, setShowRedeemDrawer] = useState(false);

  if (!reward) {
    return (
      <div className="flex flex-col h-full items-center justify-center" style={{ background: "#F5F5F7" }}>
        <p style={{ color: "#52525B" }}>Reward not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7", fontFamily: "'Inter', sans-serif" }}>

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
        <button onClick={() => router.back()} className="flex items-center gap-1" style={{ background: "none", border: "none", cursor: "pointer" }}>
          <ChevronLeft size={22} style={{ color: "#0E0E10" }} />
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>Reward Details</span>
        </button>
        <div style={{ width: "40px" }} />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-[192px]">
        {/* Promotional Banner */}
        <div className="px-4 pt-4 pb-4">
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: "20px",
              height: "180px",
            }}
          >
            <Image
              src={reward.banner}
              alt={reward.title}
              fill
              style={{ objectFit: "cover" }}
              unoptimized
            />
          </div>
        </div>

        {/* Info card */}
        <div style={{ background: "#fff", padding: "16px 20px", borderBottom: "1px solid #F0F0F0", marginTop: "4px" }}>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div
                className="relative flex-shrink-0 overflow-hidden"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "10px",
                  background: "#F5F5F7",
                  border: "1px solid #F0F0F0",
                }}
              >
                <Image
                  src={reward.logo}
                  alt={reward.store}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#0E0E10", marginBottom: "2px" }}>
                  {reward.store}
                </p>
                <p style={{ fontSize: "12px", color: "#52525B" }}>{reward.category}</p>
              </div>
            </div>

            {/* Quick Info Row */}
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} style={{ color: "#52525B", flexShrink: 0 }} />
                <span style={{ fontSize: "12px", color: "#52525B" }}>{reward.floor}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} style={{ color: "#52525B", flexShrink: 0 }} />
                <span style={{ fontSize: "12px", color: "#52525B" }}>{reward.validTill}</span>
              </div>
              <div
                className="flex items-center gap-2 ml-auto"
                style={{
                  background: "#F0F0F0",
                  paddingLeft: "10px",
                  paddingRight: "12px",
                  paddingTop: "6px",
                  paddingBottom: "6px",
                  borderRadius: "9999px",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "#FED955",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: "12px",
                  }}
                >
                  🪙
                </div>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#0E0E10", margin: 0 }}>{reward.points} pts</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pt-4">

          {/* Description */}
          <p style={{ fontSize: "13px", color: "#52525B", lineHeight: 1.6, marginBottom: "20px" }}>
            Enjoy this exclusive offer at {reward.store}. Valid until {reward.validTill}. Redeem in-store using your Smile Points.
          </p>

          {/* Terms & Conditions */}
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #F0F0F0", padding: "16px", marginBottom: "16px" }}>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#0E0E10", marginBottom: "12px" }}>
              📋 Terms & Conditions
            </p>
            <ul style={{ margin: 0, paddingLeft: "20px" }}>
              <li style={{ fontSize: "13px", color: "#52525B", lineHeight: 1.6, marginBottom: "8px" }}>
                Valid only at participating {reward.store} locations
              </li>
              <li style={{ fontSize: "13px", color: "#52525B", lineHeight: 1.6, marginBottom: "8px" }}>
                One reward per transaction, cannot be combined with other offers
              </li>
              <li style={{ fontSize: "13px", color: "#52525B", lineHeight: 1.6, marginBottom: "8px" }}>
                Redemption must be completed within validity period
              </li>
              <li style={{ fontSize: "13px", color: "#52525B", lineHeight: 1.6, marginBottom: "8px" }}>
                Smile Points will be deducted upon successful redemption
              </li>
              <li style={{ fontSize: "13px", color: "#52525B", lineHeight: 1.6 }}>
                Original receipt must be produced for verification purposes
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Sticky Redeem Button */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        background: "#fff",
        borderTop: "1px solid #F0F0F0",
        padding: "12px 20px 24px",
      }}>
        <button
          onClick={() => setShowRedeemDrawer(true)}
          style={{
            width: "100%",
            height: "48px",
            borderRadius: "12px",
            background: "#9728B8",
            color: "#fff",
            border: "none",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          Redeem Now
        </button>
      </div>

      {/* Redeem Drawer */}
      {showRedeemDrawer && (
        <>
          {/* Backdrop */}
          <div
            className="absolute inset-0 z-50"
            style={{
              background: "rgba(0,0,0,0.45)",
              animation: "fadeIn 0.3s ease-out",
            }}
            onClick={() => setShowRedeemDrawer(false)}
          />

          {/* Drawer */}
          <div
            className="absolute left-0 right-0 bottom-0 z-50"
            style={{
              background: "#fff",
              borderTopLeftRadius: "24px",
              borderTopRightRadius: "24px",
              padding: "16px 20px 36px",
              boxShadow: "0 -8px 32px rgba(0,0,0,0.12)",
              animation: "slideUp 0.3s ease-out",
            }}
            onTouchStart={(e) => {
              const startY = e.touches[0].clientY;
              const handler = (moveEvent: TouchEvent) => {
                const currentY = moveEvent.touches[0].clientY;
                const diff = currentY - startY;
                if (diff > 100) {
                  setShowRedeemDrawer(false);
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
              Redeem Offer
            </p>
            <p className="mb-6" style={{ fontSize: "13px", color: "#52525B", lineHeight: 1.5 }}>
              Choose how you'd like to redeem this offer at {reward.store}
            </p>

            <div className="flex gap-3">
              {/* Scan QR option */}
              <button
                onClick={() => { setShowRedeemDrawer(false); router.push("/scanner"); }}
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
                onClick={() => { setShowRedeemDrawer(false); router.push("/myqr"); }}
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

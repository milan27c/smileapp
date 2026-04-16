"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Check } from "lucide-react";

export default function PromoDetailPage() {
  const router = useRouter();
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    setClaimed(true);
    setTimeout(() => {
      router.push("/home");
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7", fontFamily: "'Inter', sans-serif" }}>

      {/* App Bar */}
      <div
        className="flex-shrink-0 flex items-center px-5"
        style={{
          paddingTop: "12px",
          paddingBottom: "8px",
          minHeight: "56px",
          borderBottom: "1px solid #F0F0F0",
          background: "#fff",
        }}
      >
        <button onClick={() => router.back()} className="flex items-center gap-1">
          <ChevronLeft size={22} style={{ color: "#0E0E10" }} />
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>EARN 10X POINTS</span>
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-[192px]">
        {/* Hero Banner */}
        <div className="px-5 pt-4 pb-4">
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: "20px",
              height: "220px",
            }}
          >
            <Image
              src="/images/slider1.png"
              alt="Earn 10X Points"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>

        {/* Title */}
        <div className="px-5 py-4">
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0E0E10", marginBottom: "8px" }}>
            Earn 10× Points with HCM Smile Loyalty!
          </h2>
        </div>

        {/* How It Works Section */}
        <div className="px-5 pb-6">
          <div className="flex items-center gap-2 mb-4">
            <span style={{ fontSize: "20px" }}>💎</span>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>How It Works</h3>
          </div>

          <div className="flex flex-col gap-4">
            {[
              {
                num: "1",
                title: "Activate the Offer",
                desc: "Tap Claim Now on this page to activate the 10× points multiplier.",
              },
              {
                num: "2",
                title: "Shop at Havelock City Mall",
                desc: "Use your registered Smile Loyalty account when you make a purchase.",
              },
              {
                num: "3",
                title: "Earn Instantly",
                desc: "Points will be credited automatically to your Smile account within 24 hours.",
              },
            ].map((step) => (
              <div key={step.num} className="flex gap-3">
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "9999px",
                    background: "#0E0E10",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {step.num}
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#0E0E10", marginBottom: "4px" }}>
                    {step.title}
                  </p>
                  <p style={{ fontSize: "13px", color: "#52525B", lineHeight: 1.5 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Where You Can Earn Section */}
        <div className="px-5 pb-6">
          <div className="flex items-center gap-2 mb-4">
            <span style={{ fontSize: "20px" }}>🏪</span>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>Where You Can Earn</h3>
          </div>

          <div className="flex flex-col gap-2">
            {[
              { emoji: "👗", name: "Fashion & Lifestyle Stores" },
              { emoji: "☕", name: "Cafés & Restaurants" },
              { emoji: "🎬", name: "Entertainment & Experiences" },
              { emoji: "💅", name: "Health, Beauty & Wellness Outlets" },
            ].map((store) => (
              <div key={store.name} style={{ display: "flex", alignItems: "center", gap: "12px", paddingLeft: "0" }}>
                <span style={{ fontSize: "18px" }}>{store.emoji}</span>
                <p style={{ fontSize: "13px", color: "#0E0E10" }}>{store.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Terms Section */}
        <div className="px-5 pb-6">
          <p style={{ fontSize: "11px", color: "#B3B3B4", lineHeight: 1.6 }}>
            This offer is valid for HCM Smile Loyalty members only. Points earned may be subject to terms and conditions. Visit the app for more details.
          </p>
        </div>
      </div>

      {/* Bottom CTA — Floating Button */}
      <button
        onClick={handleClaim}
        disabled={claimed}
        className="absolute bottom-0 left-0 right-0"
        style={{
          margin: "0 20px 20px 20px",
          height: "48px",
          borderRadius: "12px",
          fontSize: "15px",
          background: claimed ? "#E4E4E7" : "#9728B8",
          color: claimed ? "#B3B3B4" : "#fff",
          cursor: claimed ? "not-allowed" : "pointer",
          transition: "all 0.15s",
          fontWeight: 600,
          border: "none",
          zIndex: 40,
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        }}
      >
        {claimed ? "Offer Claimed!" : "Add to Wallet"}
      </button>

      {/* Success Overlay */}
      {claimed && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="flex flex-col items-center gap-3"
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "40px 32px",
              maxWidth: "280px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "9999px",
                background: "#9728B8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Check size={32} style={{ color: "#fff" }} />
            </div>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0E0E10", textAlign: "center" }}>
              Offer Claimed!
            </h2>
            <p style={{ fontSize: "13px", color: "#52525B", textAlign: "center", lineHeight: 1.5 }}>
              You'll earn 10X points on your next purchase at participating stores.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

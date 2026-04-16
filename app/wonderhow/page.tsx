"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";



export default function WonderHowPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7", fontFamily: "'Inter', sans-serif" }}>

      {/* App Bar */}
      <div className="flex-shrink-0 flex items-center px-5"
        style={{ paddingTop: "12px", paddingBottom: "8px", minHeight: "56px", borderBottom: "1px solid #F0F0F0", background: "#fff" }}>
        <button onClick={() => router.back()} className="flex items-center gap-1">
          <ChevronLeft size={22} style={{ color: "#0E0E10" }} />
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>How Points Grow</span>
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-[192px]">

        {/* Hero Image */}
        <div style={{
          position: "relative",
          width: "100%",
          height: "160px",
          borderRadius: "16px",
          overflow: "hidden",
          marginBottom: "16px",
          background: "#F5F5F7",
        }}>
          <Image
            src="/images/points.png"
            alt="How Smile Points Grow"
            fill
            style={{ objectFit: "contain", padding: "8px" }}
            unoptimized
          />
        </div>

        {/* How Points Work Section */}
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0E0E10", marginBottom: "8px", lineHeight: 1.3 }}>
            How Your Smile Points Grow
          </h2>
          <p style={{ fontSize: "13px", color: "#52525B", lineHeight: 1.6, marginBottom: "10px" }}>
            Earn Smile Points every time you shop, dine, or have fun at partner locations!
          </p>
          <p style={{ fontSize: "13px", color: "#52525B", lineHeight: 1.6 }}>
            The more you spend, the more Smiles you collect and the closer you get to unlocking new rewards.
          </p>
        </div>

        {/* Conversion Card */}
        <div style={{
          background: "linear-gradient(135deg, rgba(251,209,50,0.12) 0%, rgba(250,93,62,0.08) 100%)",
          border: "1.5px solid rgba(254,217,85,0.3)",
          borderRadius: "16px",
          padding: "14px 16px",
          marginBottom: "20px",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "#52525B", marginBottom: "6px", letterSpacing: "0.5px" }}>
            CONVERSION RATE
          </p>
          <p style={{ fontSize: "20px", fontWeight: 800, color: "#0E0E10" }}>
            Rs. 250 = 1 Smile Point
          </p>
        </div>

        {/* Reward Tiers Section */}
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#0E0E10", marginBottom: "12px" }}>
            Reward Tiers
          </h3>

          {/* Bronze Tier */}
          <div style={{
            background: "#fff",
            borderRadius: "16px",
            border: "1px solid #F0F0F0",
            padding: "14px",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
              flexShrink: 0,
            }}>
              <Image
                src="/images/bronze.png"
                alt="Bronze Tier"
                fill
                style={{ objectFit: "contain" }}
                unoptimized
              />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10", marginBottom: "4px" }}>
                Bronze
              </p>
              <p style={{ fontSize: "12px", color: "#52525B" }}>
                Your starting tier
              </p>
            </div>
          </div>

          {/* Silver Tier */}
          <div style={{
            background: "#fff",
            borderRadius: "16px",
            border: "1px solid #F0F0F0",
            padding: "14px",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6C6C70" strokeWidth="2">
                <path d="M12 2L15.09 8.26H22L17.18 12.59L19.34 18.97L12 14.64L4.66 18.97L6.82 12.59L2 8.26H8.91L12 2Z" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10", marginBottom: "4px" }}>
                Silver
              </p>
              <p style={{ fontSize: "12px", color: "#52525B" }}>
                Unlock at 500 Smile Points
              </p>
            </div>
          </div>

          {/* Platinum Tier */}
          <div style={{
            background: "#fff",
            borderRadius: "16px",
            border: "1px solid #F0F0F0",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
              flexShrink: 0,
            }}>
              <Image
                src="/images/platinum.png"
                alt="Platinum Tier"
                fill
                style={{ objectFit: "contain" }}
                unoptimized
              />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10", marginBottom: "4px" }}>
                Platinum
              </p>
              <p style={{ fontSize: "12px", color: "#52525B" }}>
                Unlock at 1,000 Smile Points
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div style={{ marginBottom: "24px" }}>
          <button onClick={() => router.push("/platinum")} style={{
            width: "100%",
            height: "48px",
            borderRadius: "12px",
            background: "#9728B8",
            color: "#fff",
            fontSize: "15px",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s",
          }}>
            Explore Tier Benefits
          </button>
        </div>

      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Check } from "lucide-react";



const EVENTS: Record<string, any> = {
  "1": { id: 1, img: "/images/events/events1.png", title: "A Fun Filled Christmas Party — Just For Kids", date: "Dec 13, 2025", session: "Session 1 — 11:00 AM", price: 3500, points: 700 },
  "2": { id: 2, img: "/images/events/events2.png", title: "New Year Countdown Gala", date: "Dec 31, 2025", session: "Session 1 — 08:00 PM", price: 2500, points: 500 },
  "3": { id: 3, img: "/images/events/events3.png", title: "Elf Magic Show & Face Painting", date: "Dec 20, 2025", session: "Session 1 — 10:00 AM", price: 1500, points: 300 },
  "4": { id: 4, img: "/images/events/events4.png", title: "Santa's Cookie Decoration Workshop", date: "Dec 21, 2025", session: "Session 1 — 11:00 AM", price: 1200, points: 240 },
  "5": { id: 5, img: "/images/events/events5.png", title: "Christmas Card Making Contest", date: "Dec 22, 2025", session: "Session 1 — 10:00 AM", price: 800, points: 160 },
};

const WALLET_POINTS = 780;

export default function PayWithPointsPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params?.id as string;
  const event = EVENTS[eventId];
  const [confirming, setConfirming] = useState(false);
  const [done, setDone] = useState(false);

  if (!event) return null;

  const canAfford = WALLET_POINTS >= event.points;
  const remaining = WALLET_POINTS - event.points;

  const handleConfirm = () => {
    if (!canAfford || confirming) return;
    setConfirming(true);
    setTimeout(() => {
      setConfirming(false);
      setDone(true);
    }, 1200);
  };

  if (done) {
    return (
      <div
        onClick={() => router.push("/home")}
        className="flex flex-col h-full items-center justify-center relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #f0f9ff 0%, #f5f0ff 45%, #fff8f0 100%)",
          cursor: "pointer",
          fontFamily: "'Inter', sans-serif",
          animation: "fade-in 0.35s ease both",
        }}
      >
        {/* Check circle */}
        <div style={{
          width: "96px", height: "96px", borderRadius: "9999px",
          background: "linear-gradient(135deg, #43D072 0%, #2BBD5E 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 30px rgba(76,175,80,0.45)",
          animation: "zoom-in 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.1s both",
          marginBottom: "28px",
        }}>
          <Check size={48} style={{ color: "#fff" }} strokeWidth={3} />
        </div>
        <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#0E0E10", textAlign: "center", marginBottom: "8px", animation: "fade-up 0.5s ease 0.3s both" }}>
          Booking Confirmed!
        </h2>
        <p style={{ fontSize: "14px", color: "#52525B", textAlign: "center", marginBottom: "20px", padding: "0 40px", lineHeight: 1.5, animation: "fade-up 0.5s ease 0.4s both" }}>
          {event.title}
        </p>
        <div style={{
          background: "rgba(151,40,184,0.08)", border: "1px solid rgba(151,40,184,0.2)",
          borderRadius: "12px", padding: "12px 24px", marginBottom: "32px",
          animation: "fade-up 0.5s ease 0.5s both",
        }}>
          <p style={{ fontSize: "13px", color: "#9728B8", fontWeight: 600, textAlign: "center" }}>
            🪙 {event.points} Smile Points deducted
          </p>
        </div>
        <p style={{ fontSize: "13px", color: "#B3B3B4", animation: "fade-in 0.5s ease 0.7s both" }}>Tap anywhere to go home</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7", fontFamily: "'Inter', sans-serif" }}>

      {/* App Bar */}
      <div className="flex-shrink-0 flex items-center px-5"
        style={{ paddingTop: "12px", paddingBottom: "8px", minHeight: "56px", borderBottom: "1px solid #F0F0F0", background: "#fff" }}>
        <button onClick={() => router.back()} className="flex items-center gap-1">
          <ChevronLeft size={22} style={{ color: "#0E0E10" }} />
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>Order Summary</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-5" style={{ paddingBottom: "110px" }}>

        {/* Event card */}
        <div style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #F0F0F0", marginBottom: "16px" }}>
          <div style={{ position: "relative", height: "140px" }}>
            <Image src={event.img} alt={event.title} fill style={{ objectFit: "cover" }} unoptimized />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{event.title}</p>
            </div>
          </div>
          <div style={{ padding: "12px 14px" }}>
            <p style={{ fontSize: "12px", color: "#52525B", marginBottom: "4px" }}>📅 {event.date}</p>
            <p style={{ fontSize: "12px", color: "#52525B" }}>🕐 {event.session}</p>
          </div>
        </div>

        {/* Points Wallet */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #F0F0F0", padding: "16px", marginBottom: "16px" }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "#0E0E10", marginBottom: "12px" }}>Your Smile Points</p>
          <div className="flex items-center justify-between" style={{
            background: "linear-gradient(135deg, #014D98 0%, #9728B8 100%)",
            borderRadius: "12px", padding: "14px 16px",
          }}>
            <div>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)", marginBottom: "2px" }}>Current Balance</p>
              <p style={{ fontSize: "24px", fontWeight: 800, color: "#fff", lineHeight: 1 }}>{WALLET_POINTS} <span style={{ fontSize: "13px", fontWeight: 400 }}>pts</span></p>
            </div>
            <span style={{ fontSize: "28px" }}>🪙</span>
          </div>
        </div>

        {/* Order breakdown */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #F0F0F0", padding: "16px", marginBottom: "16px" }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "#0E0E10", marginBottom: "12px" }}>Points Summary</p>

          <div className="flex items-center justify-between" style={{ paddingBottom: "10px", borderBottom: "1px solid #F0F0F0", marginBottom: "10px" }}>
            <p style={{ fontSize: "13px", color: "#52525B" }}>Event ticket</p>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#0E0E10" }}>{event.points} pts</p>
          </div>
          <div className="flex items-center justify-between" style={{ paddingBottom: "10px", borderBottom: "1px solid #F0F0F0", marginBottom: "10px" }}>
            <p style={{ fontSize: "13px", color: "#52525B" }}>Current balance</p>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#0E0E10" }}>{WALLET_POINTS} pts</p>
          </div>
          <div className="flex items-center justify-between">
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#0E0E10" }}>Remaining balance</p>
            <p style={{ fontSize: "14px", fontWeight: 700, color: canAfford ? "#63DBAE" : "#DC2626" }}>
              {canAfford ? `${remaining} pts` : "Insufficient"}
            </p>
          </div>
        </div>

        {!canAfford && (
          <div style={{ background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: "12px", padding: "12px 16px" }}>
            <p style={{ fontSize: "12px", color: "#DC2626", fontWeight: 600 }}>
              You need {event.points - WALLET_POINTS} more points to book this event.
            </p>
          </div>
        )}
      </div>

      {/* Confirm button */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "#fff", borderTop: "1px solid #F0F0F0",
        padding: "12px 20px 24px",
      }}>
        <button
          onClick={handleConfirm}
          disabled={!canAfford || confirming}
          style={{
            width: "100%", height: "48px", borderRadius: "12px",
            background: canAfford ? "#9728B8" : "#E4E4E7",
            color: canAfford ? "#fff" : "#B3B3B4",
            fontSize: "15px", fontWeight: 600,
            border: "none", cursor: canAfford ? "pointer" : "not-allowed",
            boxShadow: canAfford ? "0 6px 20px rgba(151,40,184,0.3)" : "none",
            transition: "all 0.2s",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          }}
        >
          {confirming ? (
            <>
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: "2.5px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", animation: "spin 0.7s linear infinite" }} />
              Processing…
            </>
          ) : (
            `Confirm — Deduct ${event.points} Points`
          )}
        </button>
      </div>
    </div>
  );
}

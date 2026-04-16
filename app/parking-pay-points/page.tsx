"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import StatusBar from "@/app/components/StatusBar";
import { ChevronLeft, Check } from "lucide-react";

const WALLET_POINTS = 780;

function ParkingPayPointsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = parseInt(searchParams.get("amount") ?? "0", 10);
  const points = parseInt(searchParams.get("points") ?? "0", 10);
  const [confirming, setConfirming] = useState(false);
  const [done, setDone] = useState(false);

  const canAfford = WALLET_POINTS >= points;
  const remaining = WALLET_POINTS - points;

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
        <StatusBar />
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
          Parking Fee Paid!
        </h2>
        <p style={{ fontSize: "14px", color: "#52525B", textAlign: "center", marginBottom: "20px", padding: "0 40px", lineHeight: 1.5, animation: "fade-up 0.5s ease 0.4s both" }}>
          Your parking fee has been deducted from your Smile Points wallet.
        </p>
        <div style={{
          background: "rgba(151,40,184,0.08)", border: "1px solid rgba(151,40,184,0.2)",
          borderRadius: "12px", padding: "12px 24px", marginBottom: "32px",
          animation: "fade-up 0.5s ease 0.5s both",
        }}>
          <p style={{ fontSize: "13px", color: "#9728B8", fontWeight: 600, textAlign: "center" }}>
            🪙 {points} Smile Points deducted
          </p>
        </div>
        <p style={{ fontSize: "13px", color: "#B3B3B4", animation: "fade-in 0.5s ease 0.7s both" }}>Tap anywhere to go home</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7", fontFamily: "'Inter', sans-serif" }}>
      <StatusBar />

      {/* App Bar */}
      <div className="relative flex items-center px-5 flex-shrink-0"
        style={{ paddingTop: "48px", paddingBottom: "12px", minHeight: "80px", borderBottom: "1px solid #F0F0F0", background: "#fff" }}>
        <button onClick={() => router.push("/parking")} className="flex items-center gap-1">
          <ChevronLeft size={22} style={{ color: "#0E0E10" }} />
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>Payment Summary</span>
        </button>
        <div style={{ width: "40px" }} />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-5" style={{ paddingBottom: "110px" }}>

        {/* Parking fee card */}
        <div style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #F0F0F0", marginBottom: "16px" }}>
          <div style={{ background: "linear-gradient(135deg, #00C1E2 0%, #63DBAE 100%)", padding: "20px", color: "#fff" }}>
            <p style={{ fontSize: "13px", opacity: 0.9, marginBottom: "4px" }}>Parking Fee</p>
            <p style={{ fontSize: "28px", fontWeight: 800 }}>{amount.toFixed(2)} LKR</p>
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

        {/* Points breakdown */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #F0F0F0", padding: "16px", marginBottom: "16px" }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "#0E0E10", marginBottom: "12px" }}>Points Summary</p>

          <div className="flex items-center justify-between" style={{ paddingBottom: "10px", borderBottom: "1px solid #F0F0F0", marginBottom: "10px" }}>
            <p style={{ fontSize: "13px", color: "#52525B" }}>Parking fee</p>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#0E0E10" }}>{points} pts</p>
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
              You need {points - WALLET_POINTS} more points to pay this parking fee.
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
            `Confirm — Deduct ${points} Points`
          )}
        </button>
      </div>
    </div>
  );
}

export default function ParkingPayPointsPage() {
  return (
    <Suspense fallback={<div style={{ background: "#F5F5F7", height: "100%" }} />}>
      <ParkingPayPointsContent />
    </Suspense>
  );
}

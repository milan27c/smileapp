"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Receipt, Upload, X, CheckCircle, Camera } from "lucide-react";



export default function PointsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"earned" | "redeemed">("earned");
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [billPhoto, setBillPhoto] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const openCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch {
      setShowCamera(false);
      alert("Camera access denied. Please allow camera permission and try again.");
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setShowCamera(false);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    setBillPhoto(canvas.toDataURL("image/jpeg"));
    stopCamera();
  };

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
              background: "linear-gradient(135deg, #5B4B9F 0%, #9728B8 50%, #D946A6 100%)",
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
            <div className="relative z-10 flex items-center justify-between" style={{ padding: "16px 16px 12px 16px" }}>
              {/* Left: Points info */}
              <div>
                {/* Silver badge */}
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1 w-fit mb-2"
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    borderRadius: "9999px",
                    border: "1px solid rgba(255,255,255,0.35)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      background: "linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #A8A8A8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    ★
                  </span>
                  <span className="font-bold text-white" style={{ fontSize: "9px", letterSpacing: "0.5px" }}>
                    SILVER MEMBER
                  </span>
                </div>

                {/* Points */}
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-white font-extrabold"
                    style={{ fontSize: "36px", lineHeight: 1, letterSpacing: "-1px" }}
                  >
                    780
                  </span>
                  <span className="text-white/80 font-medium" style={{ fontSize: "13px" }}>
                    Available Points
                  </span>
                </div>

                {/* Expiry */}
                <p style={{ fontSize: "9px", color: "rgba(255, 255, 255, 0.7)", marginTop: "3px", margin: 0 }}>
                  265 Points expire Jan 31, 2026
                </p>
              </div>

              {/* Right: Smile Rewards Image */}
              <div className="flex-shrink-0" style={{ width: "90px", height: "90px", marginTop: "-2px", marginRight: "0px" }}>
                <Image
                  src="/images/smilerewards.png"
                  alt="Smile Rewards"
                  width={90}
                  height={90}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Progress bar section */}
            <div className="relative z-10" style={{ padding: "8px 16px 16px 16px" }}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-white/80 font-medium" style={{ fontSize: "11px" }}>
                  Progress to Platinum
                </p>
                <p className="text-white/80 font-medium" style={{ fontSize: "11px" }}>
                  4250/5000
                </p>
              </div>
              <div
                className="w-full mb-1"
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
              <p className="text-white/70" style={{ fontSize: "10px", margin: 0, marginTop: "4px" }}>
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

        {/* Claim Missed Rewards Button */}
        <div className="px-4 pb-4">
          <button
            onClick={() => { setShowClaimModal(true); setBillPhoto(null); setSubmitted(false); }}
            className="w-full flex items-center justify-center gap-2"
            style={{
              height: "48px",
              background: "white",
              border: "1.5px solid #0E0E10",
              borderRadius: "12px",
              color: "#0E0E10",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <Receipt size={18} />
            Claim Missed Rewards
          </button>
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

      {/* Camera Overlay */}
      {showCamera && (
        <div className="absolute inset-0 z-[60] flex flex-col" style={{ background: "#000" }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ flex: 1, width: "100%", objectFit: "cover" }}
          />
          <div className="flex items-center justify-between px-8 py-6" style={{ background: "#000" }}>
            <button onClick={stopCamera} style={{ color: "white", fontSize: 14, background: "none", border: "none", cursor: "pointer" }}>
              <X size={28} color="white" />
            </button>
            <button
              onClick={capturePhoto}
              style={{
                width: 72, height: 72, borderRadius: 9999,
                background: "white", border: "5px solid rgba(255,255,255,0.4)",
                cursor: "pointer",
              }}
            />
            <div style={{ width: 28 }} />
          </div>
        </div>
      )}

      {/* Claim Missed Rewards Modal */}
      {showClaimModal && (
        <div
          className="absolute inset-0 z-50 flex items-end justify-center"
          style={{ background: "rgba(0,0,0,0.45)" }}
          onClick={(e) => { if (e.target === e.currentTarget) { setShowClaimModal(false); } }}
        >
          <div
            className="w-full"
            style={{
              background: "white",
              borderRadius: "24px 24px 0 0",
              padding: "24px 20px 40px",
            }}
          >
            {/* Handle */}
            <div className="flex justify-center mb-5">
              <div style={{ width: 40, height: 4, borderRadius: 9999, background: "#D4D4D8" }} />
            </div>

            {submitted ? (
              /* Success state */
              <div className="flex flex-col items-center text-center py-6 gap-4">
                <div
                  style={{
                    width: 72, height: 72, borderRadius: 9999,
                    background: "#F3E8FF",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <CheckCircle size={36} color="#9728B8" />
                </div>
                <div>
                  <p style={{ fontSize: 17, fontWeight: 700, color: "#0E0E10", marginBottom: 8 }}>Bill Submitted!</p>
                  <p style={{ fontSize: 14, color: "#52525B", lineHeight: 1.5 }}>
                    Your bill has been submitted for review. Once verified, your rewards will be added automatically.
                  </p>
                </div>
                <button
                  onClick={() => setShowClaimModal(false)}
                  style={{
                    marginTop: 8, height: 48, width: "100%", borderRadius: 12,
                    background: "#9728B8", color: "white", fontSize: 15, fontWeight: 600, border: "none", cursor: "pointer",
                  }}
                >
                  Done
                </button>
              </div>
            ) : (
              /* Upload state */
              <>
                <p style={{ fontSize: 18, fontWeight: 700, color: "#0E0E10", marginBottom: 4 }}>Claim Missed Rewards</p>
                <p style={{ fontSize: 14, color: "#52525B", marginBottom: 20, lineHeight: 1.5 }}>
                  Forgot to scan at the store? Upload your bill photo and we'll verify & add your points.
                </p>

                {/* Hidden inputs */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setBillPhoto(URL.createObjectURL(file));
                  }}
                />

                {/* Preview or action buttons */}
                {billPhoto ? (
                  <div style={{ borderRadius: 16, overflow: "hidden", border: "2px solid #9728B8", height: 160 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={billPhoto} alt="Bill" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={openCamera}
                      className="flex-1 flex flex-col items-center justify-center gap-2"
                      style={{
                        height: 110, borderRadius: 16,
                        border: "2px dashed #D4D4D8",
                        background: "#F5F5F7",
                        cursor: "pointer",
                      }}
                    >
                      <Camera size={28} color="#9728B8" />
                      <span style={{ fontSize: 13, color: "#52525B", fontWeight: 500 }}>Take Photo</span>
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 flex flex-col items-center justify-center gap-2"
                      style={{
                        height: 110, borderRadius: 16,
                        border: "2px dashed #D4D4D8",
                        background: "#F5F5F7",
                        cursor: "pointer",
                      }}
                    >
                      <Upload size={28} color="#9728B8" />
                      <span style={{ fontSize: 13, color: "#52525B", fontWeight: 500 }}>Upload from Gallery</span>
                    </button>
                  </div>
                )}

                {billPhoto && (
                  <button
                    onClick={() => setBillPhoto(null)}
                    style={{ marginTop: 8, background: "none", border: "none", cursor: "pointer", color: "#52525B", fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <X size={14} /> Remove photo
                  </button>
                )}

                <button
                  disabled={!billPhoto}
                  onClick={() => setSubmitted(true)}
                  style={{
                    marginTop: 20, height: 48, width: "100%", borderRadius: 12,
                    background: billPhoto ? "#9728B8" : "#D4D4D8",
                    color: "white", fontSize: 15, fontWeight: 600, border: "none",
                    cursor: billPhoto ? "pointer" : "not-allowed",
                    transition: "background 0.2s",
                  }}
                >
                  Submit Bill
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

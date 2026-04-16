"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, RefreshCw } from "lucide-react";



export default function MyQRPage() {
  const router = useRouter();
  const [qrKey, setQrKey] = useState(0);

  const handleRegenerate = () => {
    setQrKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col h-full bg-white">

      {/* Top nav */}
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
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>My QR Code</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-8">
        {/* Title */}
        <h1 className="font-bold mb-2 text-center" style={{ fontSize: "24px", color: "#0E0E10", marginTop: "24px" }}>
          Your Smile QR Code
        </h1>
        <p className="text-center mb-8" style={{ fontSize: "13px", color: "#52525B", lineHeight: 1.5 }}>
          Present This QR Code to the Merchant to Earn Points
        </p>

        {/* QR Code Container */}
        <div
          key={qrKey}
          className="mb-8 p-6"
          style={{
            background: "#fff",
            borderRadius: "20px",
            border: "2px solid #E4E4E7",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          }}
        >
          {/* Simple SVG QR Code Placeholder */}
          <svg width="200" height="200" viewBox="0 0 200 200" style={{ background: "#fff" }}>
            {/* QR code pattern - sample grid */}
            <rect x="10" y="10" width="20" height="20" fill="#0E0E10" />
            <rect x="30" y="10" width="20" height="20" fill="#0E0E10" />
            <rect x="50" y="10" width="20" height="20" fill="#0E0E10" />
            <rect x="10" y="30" width="20" height="20" fill="#0E0E10" />
            <rect x="50" y="30" width="20" height="20" fill="#0E0E10" />
            <rect x="30" y="50" width="20" height="20" fill="#0E0E10" />
            <rect x="50" y="50" width="20" height="20" fill="#0E0E10" />
            <rect x="10" y="70" width="20" height="20" fill="#0E0E10" />
            <rect x="30" y="70" width="20" height="20" fill="#0E0E10" />
            <rect x="50" y="70" width="20" height="20" fill="#0E0E10" />
            <rect x="70" y="70" width="20" height="20" fill="#0E0E10" />

            {/* Right section */}
            <rect x="120" y="10" width="20" height="20" fill="#0E0E10" />
            <rect x="140" y="10" width="20" height="20" fill="#0E0E10" />
            <rect x="160" y="10" width="20" height="20" fill="#0E0E10" />
            <rect x="120" y="30" width="20" height="20" fill="#0E0E10" />
            <rect x="160" y="30" width="20" height="20" fill="#0E0E10" />
            <rect x="140" y="50" width="20" height="20" fill="#0E0E10" />
            <rect x="160" y="50" width="20" height="20" fill="#0E0E10" />
            <rect x="120" y="70" width="20" height="20" fill="#0E0E10" />
            <rect x="140" y="70" width="20" height="20" fill="#0E0E10" />
            <rect x="160" y="70" width="20" height="20" fill="#0E0E10" />
            <rect x="180" y="70" width="20" height="20" fill="#0E0E10" />

            {/* Middle section */}
            <rect x="50" y="90" width="20" height="20" fill="#0E0E10" />
            <rect x="70" y="90" width="20" height="20" fill="#0E0E10" />
            <rect x="90" y="90" width="20" height="20" fill="#0E0E10" />
            <rect x="110" y="90" width="20" height="20" fill="#0E0E10" />
            <rect x="130" y="90" width="20" height="20" fill="#0E0E10" />

            {/* Bottom section - Finder pattern */}
            <rect x="10" y="160" width="20" height="20" fill="#0E0E10" />
            <rect x="30" y="160" width="20" height="20" fill="#0E0E10" />
            <rect x="50" y="160" width="20" height="20" fill="#0E0E10" />
            <rect x="10" y="180" width="20" height="20" fill="#0E0E10" />
            <rect x="50" y="180" width="20" height="20" fill="#0E0E10" />
            <rect x="30" y="100" width="20" height="20" fill="#0E0E10" />
            <rect x="50" y="100" width="20" height="20" fill="#0E0E10" />
            <rect x="70" y="100" width="20" height="20" fill="#0E0E10" />
            <rect x="90" y="100" width="20" height="20" fill="#0E0E10" />
            <rect x="110" y="100" width="20" height="20" fill="#0E0E10" />
            <rect x="130" y="100" width="20" height="20" fill="#0E0E10" />
            <rect x="150" y="100" width="20" height="20" fill="#0E0E10" />
            <rect x="170" y="100" width="20" height="20" fill="#0E0E10" />

            {/* Right finder pattern */}
            <rect x="160" y="160" width="20" height="20" fill="#0E0E10" />
            <rect x="180" y="160" width="20" height="20" fill="#0E0E10" />
            <rect x="160" y="180" width="20" height="20" fill="#0E0E10" />
            <rect x="140" y="180" width="20" height="20" fill="#0E0E10" />
          </svg>
        </div>

        {/* Regenerate Button */}
        <button
          onClick={handleRegenerate}
          className="flex items-center justify-center gap-2 px-5 py-3 mb-6 font-semibold"
          style={{
            borderRadius: "12px",
            border: "1.5px solid #9728B8",
            background: "#fff",
            color: "#9728B8",
            fontSize: "14px",
            transition: "all 0.15s",
          }}
        >
          <RefreshCw size={18} />
          Regenerate QR
        </button>

        {/* Info */}
        <div
          className="text-center px-4 py-3"
          style={{
            background: "#F5F5F7",
            borderRadius: "12px",
            marginTop: "auto",
          }}
        >
          <p style={{ fontSize: "11px", color: "#52525B", lineHeight: 1.5 }}>
            Your QR code is unique to your account. Share it with merchants to earn Smile Points on purchases.
          </p>
        </div>
      </div>
    </div>
  );
}

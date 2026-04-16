"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Copy, Share2, Check } from "lucide-react";
import StatusBar from "@/app/components/StatusBar";



const INVITE_LINK = "https://smiles.hcm.lk/join?code=ASHAN-FAM-2024";

const SOCIAL_PLATFORMS = [
  { name: "WhatsApp", url: "https://wa.me/94111234567", image: "/images/socialmedia/whatsapp.png" },
  { name: "Facebook", url: "https://facebook.com/havelocksmiles", image: "/images/socialmedia/facebook.png" },
  { name: "Instagram", url: "https://instagram.com/havelocksmiles", image: "/images/socialmedia/instagram.png" },
  { name: "TikTok", url: "https://tiktok.com/@havelocksmiles", image: "/images/socialmedia/tiktok.png" },
];

export default function InviteCodePage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [sharedTo, setSharedTo] = useState<string | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INVITE_LINK);
    } catch {
      // Fallback
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = (platform: string) => {
    setSharedTo(platform);
    setShowShare(false);
    setTimeout(() => setSharedTo(null), 2000);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7", fontFamily: "'Inter', sans-serif" }}>
      <StatusBar />

      {/* App Bar */}
      <div className="flex-shrink-0 flex items-center px-5"
        style={{ paddingTop: "12px", paddingBottom: "8px", minHeight: "56px", borderBottom: "1px solid #F0F0F0", background: "#fff" }}>
        <button onClick={() => router.back()} className="flex items-center gap-1">
          <ChevronLeft size={22} style={{ color: "#0E0E10" }} />
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>Invite Code</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center px-5 pt-6 pb-8">
        {/* Title */}
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0E0E10", marginBottom: "6px", textAlign: "center" }}>
          Family Invite QR
        </h1>
        <p style={{ fontSize: "13px", color: "#52525B", textAlign: "center", marginBottom: "28px", lineHeight: 1.5 }}>
          Share this code or link to invite members to your family group
        </p>

        {/* QR Code Card */}
        <div style={{
          background: "#fff",
          borderRadius: "24px",
          border: "1.5px solid #E4E4E7",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          padding: "24px",
          marginBottom: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          width: "100%",
        }}>
          {/* QR SVG placeholder */}
          <svg width="180" height="180" viewBox="0 0 200 200" style={{ background: "#fff", borderRadius: "8px" }}>
            <rect x="10" y="10" width="20" height="20" fill="#0E0E10" />
            <rect x="30" y="10" width="20" height="20" fill="#0E0E10" />
            <rect x="50" y="10" width="20" height="20" fill="#0E0E10" />
            <rect x="10" y="30" width="20" height="20" fill="#0E0E10" />
            <rect x="50" y="30" width="20" height="20" fill="#0E0E10" />
            <rect x="30" y="50" width="20" height="20" fill="#0E0E10" />
            <rect x="50" y="50" width="20" height="20" fill="#0E0E10" />
            <rect x="10" y="50" width="20" height="20" fill="#0E0E10" />
            <rect x="10" y="70" width="20" height="20" fill="#0E0E10" />
            <rect x="30" y="70" width="20" height="20" fill="#0E0E10" />
            <rect x="50" y="70" width="20" height="20" fill="#0E0E10" />
            <rect x="70" y="10" width="20" height="20" fill="#0E0E10" />
            <rect x="80" y="60" width="20" height="20" fill="#0E0E10" />
            <rect x="100" y="10" width="20" height="20" fill="#0E0E10" />
            <rect x="120" y="10" width="20" height="20" fill="#0E0E10" />
            <rect x="140" y="10" width="20" height="20" fill="#0E0E10" />
            <rect x="160" y="10" width="20" height="20" fill="#0E0E10" />
            <rect x="100" y="30" width="20" height="20" fill="#0E0E10" />
            <rect x="160" y="30" width="20" height="20" fill="#0E0E10" />
            <rect x="120" y="50" width="20" height="20" fill="#0E0E10" />
            <rect x="160" y="50" width="20" height="20" fill="#0E0E10" />
            <rect x="100" y="70" width="20" height="20" fill="#0E0E10" />
            <rect x="120" y="70" width="20" height="20" fill="#0E0E10" />
            <rect x="140" y="70" width="20" height="20" fill="#0E0E10" />
            <rect x="160" y="70" width="20" height="20" fill="#0E0E10" />
            <rect x="50" y="90" width="20" height="20" fill="#0E0E10" />
            <rect x="70" y="90" width="20" height="20" fill="#0E0E10" />
            <rect x="90" y="90" width="20" height="20" fill="#0E0E10" />
            <rect x="110" y="90" width="20" height="20" fill="#0E0E10" />
            <rect x="130" y="90" width="20" height="20" fill="#0E0E10" />
            <rect x="10" y="100" width="20" height="20" fill="#0E0E10" />
            <rect x="30" y="100" width="20" height="20" fill="#0E0E10" />
            <rect x="70" y="100" width="20" height="20" fill="#0E0E10" />
            <rect x="150" y="100" width="20" height="20" fill="#0E0E10" />
            <rect x="10" y="120" width="20" height="20" fill="#0E0E10" />
            <rect x="50" y="120" width="20" height="20" fill="#0E0E10" />
            <rect x="90" y="120" width="20" height="20" fill="#0E0E10" />
            <rect x="110" y="120" width="20" height="20" fill="#0E0E10" />
            <rect x="130" y="120" width="20" height="20" fill="#0E0E10" />
            <rect x="170" y="110" width="20" height="20" fill="#0E0E10" />
            <rect x="10" y="140" width="20" height="20" fill="#0E0E10" />
            <rect x="30" y="140" width="20" height="20" fill="#0E0E10" />
            <rect x="50" y="140" width="20" height="20" fill="#0E0E10" />
            <rect x="100" y="140" width="20" height="20" fill="#0E0E10" />
            <rect x="140" y="140" width="20" height="20" fill="#0E0E10" />
            <rect x="160" y="140" width="20" height="20" fill="#0E0E10" />
            <rect x="10" y="160" width="20" height="20" fill="#0E0E10" />
            <rect x="50" y="160" width="20" height="20" fill="#0E0E10" />
            <rect x="80" y="150" width="20" height="20" fill="#0E0E10" />
            <rect x="120" y="160" width="20" height="20" fill="#0E0E10" />
            <rect x="160" y="160" width="20" height="20" fill="#0E0E10" />
            <rect x="180" y="160" width="20" height="20" fill="#0E0E10" />
          </svg>

          {/* Invite code text */}
          <div style={{
            background: "#F5F5F7",
            borderRadius: "10px",
            padding: "8px 20px",
            textAlign: "center",
          }}>
            <p style={{ fontSize: "11px", color: "#B3B3B4", marginBottom: "2px" }}>Invite Code</p>
            <p style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10", letterSpacing: "2px" }}>
              ASHAN-FAM-2024
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 w-full">
          {/* Copy Link */}
          <button
            onClick={handleCopy}
            style={{
              flex: 1,
              height: "52px",
              borderRadius: "12px",
              border: "1.5px solid #E4E4E7",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {copied
              ? <Check size={18} style={{ color: "#63DBAE" }} />
              : <Copy size={18} style={{ color: "#0E0E10" }} />}
            <span style={{ fontSize: "14px", fontWeight: 600, color: copied ? "#63DBAE" : "#0E0E10" }}>
              {copied ? "Copied!" : "Copy Link"}
            </span>
          </button>

          {/* Share Link */}
          <button
            onClick={() => setShowShare(true)}
            style={{
              flex: 1,
              height: "52px",
              borderRadius: "12px",
              background: "#9728B8",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <Share2 size={18} style={{ color: "#fff" }} />
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>Share Link</span>
          </button>
        </div>

        {/* Copy link toast — inline, just below the buttons */}
        <div style={{
          width: "100%",
          height: "40px",
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {copied && (
            <div style={{
              background: "#0E0E10",
              color: "#fff",
              borderRadius: "10px",
              padding: "8px 18px",
              fontSize: "13px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              animation: "fade-in 0.2s ease both",
            }}>
              <Check size={14} strokeWidth={2.5} />
              Link copied to clipboard!
            </div>
          )}
        </div>

        {/* Link preview */}
        <div style={{
          marginTop: "16px",
          background: "#F5F5F7",
          borderRadius: "10px",
          padding: "10px 14px",
          width: "100%",
        }}>
          <p style={{ fontSize: "11px", color: "#B3B3B4", marginBottom: "2px" }}>Invite Link</p>
          <p style={{ fontSize: "12px", color: "#52525B", wordBreak: "break-all" }}>{INVITE_LINK}</p>
        </div>
      </div>

      {/* Shared toast */}
      {sharedTo && (
        <div style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#0E0E10",
          color: "#fff",
          borderRadius: "12px",
          padding: "10px 20px",
          fontSize: "13px",
          fontWeight: 600,
          whiteSpace: "nowrap",
          animation: "fade-up 0.25s ease both",
          zIndex: 60,
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        }}>
          Shared via {sharedTo}
        </div>
      )}

      {/* Share drawer overlay */}
      {showShare && (
        <div
          className="absolute inset-0 z-50"
          style={{ background: "rgba(0,0,0,0.45)", animation: "fade-in 0.2s ease" }}
          onClick={() => setShowShare(false)}
        />
      )}

      {/* Share drawer */}
      {showShare && (
        <div
          className="absolute left-0 right-0 bottom-0 z-50"
          style={{
            background: "#fff",
            borderRadius: "24px 24px 0 0",
            padding: "0 20px 36px",
            boxShadow: "0 -8px 32px rgba(0,0,0,0.15)",
            animation: "sheet-up 0.32s cubic-bezier(0.32,0.72,0,1) both",
          }}
          onTouchStart={(e) => {
            const startY = e.touches[0].clientY;
            const handler = (moveEvent: TouchEvent) => {
              if (moveEvent.touches[0].clientY - startY > 80) setShowShare(false);
            };
            document.addEventListener("touchmove", handler, { once: true });
          }}
        >
          <div className="flex justify-center pt-3 pb-4" style={{ cursor: "grab" }}>
            <div style={{ width: "40px", height: "4px", borderRadius: "9999px", background: "#D4D4D8" }} />
          </div>

          <div className="mb-5">
            <span style={{ fontSize: "17px", fontWeight: 700, color: "#0E0E10" }}>Share via</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
            {SOCIAL_PLATFORMS.map((p) => (
              <button
                key={p.name}
                onClick={() => handleShare(p.name)}
                className="flex flex-col items-center gap-2"
                style={{ flex: 1, background: "none", border: "none", cursor: "pointer", transition: "all 0.15s" }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <div style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                  position: "relative",
                }}>
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={52}
                    height={52}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <span style={{ fontSize: "10px", fontWeight: 600, color: "#52525B" }}>{p.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

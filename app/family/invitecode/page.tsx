"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Copy, Share2, Check } from "lucide-react";
import StatusBar from "@/app/components/StatusBar";



const INVITE_LINK = "https://smiles.hcm.lk/join?code=ASHAN-FAM-2024";

const SOCIAL_PLATFORMS = [
  { name: "WhatsApp", color: "#25D366", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.549 4.1 1.508 5.831L.057 23.5l5.817-1.425A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.655-.491-5.189-1.349l-.372-.22-3.453.847.872-3.367-.242-.389A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  )},
  { name: "Facebook", color: "#1877F2", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )},
  { name: "Instagram", color: "#E1306C", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )},
  { name: "Telegram", color: "#0088CC", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )},
  { name: "Viber", color: "#7360F2", icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M11.4 0C6.39.07 2.15 2.37.45 6.37c-.95 2.22-.86 4.7-.86 6.99 0 2.01-.15 4.36 1.01 6.14 1.22 1.87 3.22 2.96 5.19 3.53l.04 2.09c0 .32.4.48.63.25l2.77-2.83c1.49.13 2.99.07 4.47-.15 3.58-.57 6.82-3.19 7.47-6.9.79-4.56.45-9.84-3.05-13.14C16.28.91 13.87-.05 11.4 0z"/>
    </svg>
  )},
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
        style={{ paddingTop: "48px", paddingBottom: "12px", minHeight: "80px", borderBottom: "1px solid #F0F0F0", background: "#fff" }}>
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
                style={{ flex: 1, background: "none", border: "none", cursor: "pointer" }}
              >
                <div style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  background: p.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 4px 12px ${p.color}40`,
                }}>
                  {p.icon}
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

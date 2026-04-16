"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Send, Check } from "lucide-react";



const MY_POINTS = 780;

const MEMBERS = [
  { id: "2", name: "Miyuru Jayasundara", photo: "https://randomuser.me/api/portraits/men/45.jpg", points: 1250 },
  { id: "3", name: "Isanka Vimukthi", photo: "https://randomuser.me/api/portraits/men/67.jpg", points: 720 },
  { id: "4", name: "Kanchana Perera", photo: "https://randomuser.me/api/portraits/women/44.jpg", points: 910 },
];

const QUICK_AMOUNTS = [50, 100, 250, 500];

/* Floating celebration elements */
const FLOATERS = [
  { x: "50%", y: "18%",  size: 14, color: "#63DBAE", shape: "circle",  delay: "0s",    duration: "3.2s" },
  { x: "22%", y: "28%",  size: 10, color: "#F002AF", shape: "circle",  delay: "0.3s",  duration: "2.8s" },
  { x: "74%", y: "22%",  size: 8,  color: "#FED955", shape: "square",  delay: "0.6s",  duration: "3.5s" },
  { x: "16%", y: "50%",  size: 12, color: "#00C1E2", shape: "arc",     delay: "0.2s",  duration: "3s"   },
  { x: "82%", y: "48%",  size: 12, color: "#FA5D3E", shape: "arc",     delay: "0.8s",  duration: "2.6s" },
  { x: "38%", y: "72%",  size: 8,  color: "#014D98", shape: "circle",  delay: "0.4s",  duration: "3.8s" },
  { x: "64%", y: "70%",  size: 10, color: "#9728B8", shape: "circle",  delay: "1s",    duration: "2.5s" },
  { x: "28%", y: "15%",  size: 6,  color: "#FED955", shape: "circle",  delay: "0.7s",  duration: "3.1s" },
  { x: "70%", y: "12%",  size: 6,  color: "#63DBAE", shape: "square",  delay: "0.5s",  duration: "2.9s" },
  { x: "88%", y: "68%",  size: 7,  color: "#F002AF", shape: "circle",  delay: "1.2s",  duration: "3.4s" },
  { x: "10%", y: "72%",  size: 9,  color: "#FA5D3E", shape: "arc",     delay: "0.9s",  duration: "2.7s" },
  { x: "55%", y: "82%",  size: 11, color: "#00C1E2", shape: "circle",  delay: "0.1s",  duration: "3.6s" },
];

function SuccessModal({ recipient, amount, onDismiss }: { recipient: typeof MEMBERS[0]; amount: number; onDismiss: () => void }) {
  return (
    <div
      onClick={onDismiss}
      style={{
        position: "absolute", inset: 0, zIndex: 60,
        background: "linear-gradient(160deg, #f8f0ff 0%, #fff5fb 40%, #f0faff 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        animation: "fade-in 0.3s ease both",
        cursor: "pointer",
      }}
    >
      {/* Floating elements */}
      {FLOATERS.map((f, i) => (
        <div key={i} style={{
          position: "absolute",
          left: f.x, top: f.y,
          width: f.size, height: f.size,
          background: f.shape !== "arc" ? f.color : "transparent",
          border: f.shape === "arc" ? `3px solid ${f.color}` : "none",
          borderRadius: f.shape === "circle" ? "9999px" : f.shape === "arc" ? "9999px" : "3px",
          borderBottom: f.shape === "arc" ? "none" : undefined,
          borderLeft: f.shape === "arc" ? "none" : undefined,
          transform: "translate(-50%, -50%)",
          animation: `floatBounce ${f.duration} ${f.delay} ease-in-out infinite`,
          opacity: 0.85,
        }} />
      ))}

      {/* Check circle */}
      <div style={{
        width: "100px", height: "100px", borderRadius: "9999px",
        background: "#4CAF50",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 0 0 10px rgba(76,175,80,0.15), 0 0 0 20px rgba(76,175,80,0.07)",
        animation: "zoom-in 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.1s both",
        marginBottom: "32px",
        position: "relative", zIndex: 1,
      }}>
        <Check size={50} style={{ color: "#fff" }} strokeWidth={3} />
      </div>

      {/* Text */}
      <div style={{ textAlign: "center", padding: "0 32px", position: "relative", zIndex: 1 }}>
        <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#0E0E10", marginBottom: "10px", lineHeight: 1.2 }}>
          Points Sent!
        </h2>
        <p style={{ fontSize: "15px", color: "#52525B", lineHeight: 1.6 }}>
          <span style={{ fontWeight: 700, color: "#9728B8" }}>{amount.toLocaleString()} pts</span> sent to{" "}
          <span style={{ fontWeight: 600, color: "#0E0E10" }}>{recipient.name.split(" ")[0]}</span>
        </p>
        <p style={{ fontSize: "13px", color: "#B3B3B4", marginTop: "24px" }}>
          Tap anywhere to continue
        </p>
      </div>

      <style>{`
        @keyframes floatBounce {
          0%, 100% { transform: translate(-50%, -50%) translateY(0) rotate(0deg); }
          33%       { transform: translate(-50%, -50%) translateY(-12px) rotate(15deg); }
          66%       { transform: translate(-50%, -50%) translateY(6px) rotate(-10deg); }
        }
      `}</style>
    </div>
  );
}

export default function SendPointsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<typeof MEMBERS[0] | null>(null);
  const [amount, setAmount] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const parsed = parseInt(amount.replace(/\D/g, ""), 10) || 0;
  const remaining = MY_POINTS - parsed;
  const canSend = selected !== null && parsed >= 1 && parsed <= MY_POINTS;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    if (parseInt(digits || "0") > MY_POINTS) return;
    setAmount(digits);
  };

  const handleQuick = (val: number) => {
    if (val > MY_POINTS) return;
    setAmount(String(val));
  };

  const handleSend = () => {
    if (!canSend || isSending) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setShowSuccess(true);
    }, 900);
  };

  const handleDismiss = () => {
    router.replace("/family");
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7", fontFamily: "'Inter', sans-serif" }}>

      {/* App Bar */}
      <div className="flex-shrink-0 flex items-center px-5"
        style={{ paddingTop: "12px", paddingBottom: "8px", minHeight: "56px", borderBottom: "1px solid #F0F0F0", background: "#fff" }}>
        <button onClick={() => router.back()} className="flex items-center gap-1">
          <ChevronLeft size={22} style={{ color: "#0E0E10" }} />
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>Send Points</span>
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-5 pt-5" style={{ paddingBottom: "96px" }}>

        {/* Your balance */}
        <div style={{
          background: "linear-gradient(135deg, #9728B8 0%, #F002AF 100%)",
          borderRadius: "16px", padding: "14px 16px", marginBottom: "20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)", marginBottom: "2px" }}>Your Balance</p>
            <p style={{ fontSize: "26px", fontWeight: 800, color: "#fff" }}>{MY_POINTS.toLocaleString()} pts</p>
          </div>
          <div style={{
            width: "44px", height: "44px", borderRadius: "12px",
            background: "rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Send size={20} style={{ color: "#fff" }} />
          </div>
        </div>

        {/* Select member */}
        <p style={{ fontSize: "13px", fontWeight: 700, color: "#52525B", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Select Member
        </p>
        <div className="flex gap-3 pb-2 mb-4" style={{ overflowX: "auto", scrollbarWidth: "none" }}>
          {MEMBERS.map((m) => (
            <button key={m.id} onClick={() => setSelected(m)} style={{
              flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
              padding: "10px 12px", borderRadius: "14px",
              border: selected?.id === m.id ? "2px solid #9728B8" : "1.5px solid #E4E4E7",
              background: selected?.id === m.id ? "rgba(151,40,184,0.06)" : "#fff",
              cursor: "pointer", transition: "all 0.15s",
            }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "9999px", overflow: "hidden",
                position: "relative", border: selected?.id === m.id ? "2px solid #9728B8" : "2px solid transparent",
              }}>
                <Image src={m.photo} alt={m.name} fill style={{ objectFit: "cover" }} unoptimized />
              </div>
              <span style={{
                fontSize: "11px", fontWeight: 600,
                color: selected?.id === m.id ? "#9728B8" : "#0E0E10",
                maxWidth: "72px", textAlign: "center", lineHeight: 1.3,
              }}>
                {m.name.split(" ")[0]}
              </span>
              {selected?.id === m.id && (
                <div style={{
                  width: "18px", height: "18px", borderRadius: "9999px",
                  background: "#9728B8", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Check size={11} style={{ color: "#fff" }} strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Points input */}
        <p style={{ fontSize: "13px", fontWeight: 700, color: "#52525B", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Amount to Send
        </p>
        <div style={{
          background: "#fff", borderRadius: "16px", border: "1.5px solid #E4E4E7",
          padding: "14px 16px", marginBottom: "10px",
        }}>
          <div className="flex items-center gap-3">
            <div style={{
              width: "36px", height: "36px", borderRadius: "9999px",
              background: "rgba(151,40,184,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <span style={{ fontSize: "16px" }}>⭐</span>
            </div>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="0"
              value={amount}
              onChange={handleAmountChange}
              style={{
                flex: 1, fontSize: "28px", fontWeight: 800, color: "#0E0E10",
                border: "none", outline: "none", background: "transparent",
                fontFamily: "'Inter', sans-serif",
              }}
            />
            <span style={{ fontSize: "13px", color: "#B3B3B4", fontWeight: 600 }}>pts</span>
          </div>

          {/* Quick amount pills */}
          <div className="flex gap-2 mt-3 pt-3" style={{ borderTop: "1px solid #F0F0F0" }}>
            {QUICK_AMOUNTS.map((q) => (
              <button key={q} onClick={() => handleQuick(q)}
                style={{
                  flex: 1, height: "32px", borderRadius: "9999px",
                  border: amount === String(q) ? "1.5px solid #9728B8" : "1.5px solid #E4E4E7",
                  background: amount === String(q) ? "rgba(151,40,184,0.08)" : "#F5F5F7",
                  fontSize: "12px", fontWeight: 600,
                  color: amount === String(q) ? "#9728B8" : "#52525B",
                  cursor: "pointer", transition: "all 0.12s",
                }}>
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Remaining balance indicator */}
        {parsed > 0 && (
          <div style={{
            background: parsed > MY_POINTS ? "rgba(220,38,38,0.06)" : "rgba(99,219,174,0.08)",
            border: `1px solid ${parsed > MY_POINTS ? "rgba(220,38,38,0.2)" : "rgba(99,219,174,0.3)"}`,
            borderRadius: "10px", padding: "8px 14px", marginBottom: "16px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span style={{ fontSize: "12px", color: "#52525B" }}>Remaining after send</span>
            <span style={{
              fontSize: "14px", fontWeight: 700,
              color: remaining < 0 ? "#DC2626" : "#0E0E10",
            }}>
              {remaining < 0 ? "Insufficient" : `${remaining.toLocaleString()} pts`}
            </span>
          </div>
        )}

        {/* Transfer Summary */}
        {selected && parsed > 0 && parsed <= MY_POINTS && (
          <div style={{
            background: "#fff", borderRadius: "16px",
            border: "1.5px solid #E4E4E7", overflow: "hidden",
            animation: "fade-up 0.2s ease both",
          }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #F0F0F0" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#52525B", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Transfer Summary
              </p>
            </div>
            {[
              { label: "From", value: "Ashan Perera (You)", sub: `${MY_POINTS.toLocaleString()} pts balance` },
              { label: "To", value: selected.name, sub: `${selected.points.toLocaleString()} pts balance` },
              { label: "Amount", value: `${parsed.toLocaleString()} pts`, highlight: true },
              { label: "Remaining", value: `${remaining.toLocaleString()} pts`, dim: true },
            ].map((row) => (
              <div key={row.label} style={{
                padding: "10px 16px", borderBottom: "1px solid #F8F8F8",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <div>
                  <p style={{ fontSize: "11px", color: "#B3B3B4", marginBottom: "1px" }}>{row.label}</p>
                  {"sub" in row && <p style={{ fontSize: "11px", color: "#B3B3B4" }}>{row.sub}</p>}
                </div>
                <p style={{
                  fontSize: "14px", fontWeight: 700,
                  color: row.highlight ? "#9728B8" : row.dim ? "#52525B" : "#0E0E10",
                }}>
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Send button */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "12px 20px 24px",
        background: "linear-gradient(to top, rgba(245,245,247,1) 60%, rgba(245,245,247,0))",
      }}>
        <button onClick={handleSend} disabled={!canSend || isSending}
          style={{
            width: "100%", height: "48px", borderRadius: "16px",
            background: canSend ? "#9728B8" : "#E4E4E7",
            color: canSend ? "#fff" : "#B3B3B4",
            fontSize: "16px", fontWeight: 600, border: "none",
            cursor: canSend && !isSending ? "pointer" : "not-allowed",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
            boxShadow: canSend ? "0 8px 24px rgba(151,40,184,0.3)" : "none",
            transition: "all 0.2s",
          }}>
          {isSending ? (
            <div style={{
              width: "20px", height: "20px", borderRadius: "9999px",
              border: "2.5px solid rgba(255,255,255,0.35)", borderTopColor: "#fff",
              animation: "spin 0.7s linear infinite",
            }} />
          ) : (
            <>
              <Send size={18} />
              Send Points{parsed > 0 ? ` · ${parsed.toLocaleString()} pts` : ""}
            </>
          )}
        </button>
      </div>

      {/* Success overlay */}
      {showSuccess && selected && (
        <SuccessModal recipient={selected} amount={parsed} onDismiss={handleDismiss} />
      )}
    </div>
  );
}

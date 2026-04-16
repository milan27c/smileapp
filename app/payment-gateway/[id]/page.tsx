"use client";

import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, CreditCard, Lock } from "lucide-react";
import { useState } from "react";
import StatusBar from "@/app/components/StatusBar";



const PRICES: Record<string, number> = { "1": 3500, "2": 2500, "3": 1500, "4": 1200, "5": 800 };

export default function PaymentGatewayPage() {
  const router  = useRouter();
  const params  = useParams();
  const eventId = params?.id as string;
  const price   = PRICES[eventId] ?? 0;

  const [cardNum,  setCardNum]  = useState("");
  const [expiry,   setExpiry]   = useState("");
  const [cvv,      setCvv]      = useState("");
  const [name,     setName]     = useState("");
  const [paying,   setPaying]   = useState(false);

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const isValid = cardNum.replace(/\s/g, "").length === 16 && expiry.length === 5 && cvv.length === 3 && name.trim().length > 2;

  const handlePay = () => {
    if (!isValid || paying) return;
    setPaying(true);
    setTimeout(() => router.push("/home"), 1500);
  };

  const inputStyle = {
    width: "100%", height: "48px", borderRadius: "12px",
    border: "1.5px solid #E4E4E7", background: "#FAFAFA",
    paddingLeft: "16px", paddingRight: "16px",
    fontSize: "15px", color: "#0E0E10", outline: "none",
    fontFamily: "'Inter', sans-serif",
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7", fontFamily: "'Inter', sans-serif" }}>
      <StatusBar />

      {/* App Bar */}
      <div className="flex-shrink-0 flex items-center px-5"
        style={{ paddingTop: "12px", paddingBottom: "8px", minHeight: "56px", borderBottom: "1px solid #F0F0F0", background: "#fff" }}>
        <button onClick={() => router.back()} className="flex items-center gap-1">
          <ChevronLeft size={22} style={{ color: "#0E0E10" }} />
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>Card Payment</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-5" style={{ paddingBottom: "110px" }}>

        {/* Secure badge */}
        <div className="flex items-center gap-2 mb-5" style={{ background: "rgba(1,77,152,0.07)", borderRadius: "10px", padding: "10px 14px" }}>
          <Lock size={14} style={{ color: "#014D98", flexShrink: 0 }} />
          <p style={{ fontSize: "12px", color: "#014D98", fontWeight: 600 }}>Secured by 256-bit SSL encryption</p>
        </div>

        {/* Amount */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #F0F0F0", padding: "16px", marginBottom: "16px" }}>
          <p style={{ fontSize: "13px", color: "#52525B", marginBottom: "4px" }}>Amount to Pay</p>
          <p style={{ fontSize: "28px", fontWeight: 800, color: "#0E0E10" }}>Rs. {price.toLocaleString()}</p>
        </div>

        {/* Card form */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #F0F0F0", padding: "16px", marginBottom: "16px" }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "#0E0E10", marginBottom: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
            <CreditCard size={16} style={{ color: "#9728B8" }} /> Card Details
          </p>

          <div className="flex flex-col gap-3">
            <div>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#52525B", marginBottom: "6px" }}>Cardholder Name</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name on card"
                style={inputStyle}
              />
            </div>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#52525B", marginBottom: "6px" }}>Card Number</p>
              <input
                value={cardNum}
                onChange={(e) => setCardNum(formatCard(e.target.value))}
                placeholder="0000 0000 0000 0000"
                inputMode="numeric"
                style={inputStyle}
              />
            </div>
            <div className="flex gap-3">
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#52525B", marginBottom: "6px" }}>Expiry</p>
                <input
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  inputMode="numeric"
                  style={inputStyle}
                />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#52525B", marginBottom: "6px" }}>CVV</p>
                <input
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  placeholder="•••"
                  inputMode="numeric"
                  type="password"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pay button */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #F0F0F0", padding: "12px 20px 24px" }}>
        <button
          onClick={handlePay}
          disabled={!isValid || paying}
          style={{
            width: "100%", height: "48px", borderRadius: "12px",
            background: isValid ? "#9728B8" : "#E4E4E7",
            color: isValid ? "#fff" : "#B3B3B4",
            fontSize: "15px", fontWeight: 600,
            border: "none", cursor: isValid ? "pointer" : "not-allowed",
            boxShadow: isValid ? "0 6px 20px rgba(151,40,184,0.3)" : "none",
            transition: "all 0.2s",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          }}
        >
          {paying ? (
            <>
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: "2.5px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", animation: "spin 0.7s linear infinite" }} />
              Processing…
            </>
          ) : (
            `Pay Rs. ${price.toLocaleString()}`
          )}
        </button>
      </div>
    </div>
  );
}

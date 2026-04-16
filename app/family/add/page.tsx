"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Check, X, Send } from "lucide-react";



function formatTime(): string {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  return `Today ${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
}

export default function AddMemberPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Only allow digits, max 10
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
    setPhone(val);
    setPhoneError("");
  };

  const handleAdd = () => {
    if (!phone) return;
    if (phone.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits");
      return;
    }
    if (selected.includes(phone)) {
      setPhoneError("This number has already been added");
      return;
    }
    setSelected((prev) => [...prev, phone]);
    setPhone("");
    setPhoneError("");
    inputRef.current?.focus();
  };

  const handleRemove = (num: string) => {
    setSelected((prev) => prev.filter((n) => n !== num));
  };

  const handleChooseContact = async () => {
    if ("contacts" in navigator && "ContactsManager" in window) {
      try {
        // @ts-expect-error — Contacts API not in all TS typings
        const contacts = await navigator.contacts.select(["tel"], { multiple: true });
        const nums: string[] = contacts.flatMap((c: { tel?: string[] }) => c.tel ?? []);
        setSelected((prev) => {
          const next = [...prev];
          for (const n of nums) {
            const clean = n.replace(/[^0-9]/g, "").slice(-10);
            if (clean.length === 10 && !next.includes(clean)) next.push(clean);
          }
          return next;
        });
      } catch {}
    } else {
      inputRef.current?.focus();
    }
  };

  const handleSend = () => {
    if (!selected.length || isSending) return;
    setIsSending(true);

    // Save pending invites to localStorage for the family page
    try {
      const existing = JSON.parse(localStorage.getItem("smileapp_pending_invites") || "[]");
      const newInvites = selected.map((num) => ({
        id: `inv-${Date.now()}-${num}`,
        phone: num,
        sentAt: formatTime(),
      }));
      localStorage.setItem("smileapp_pending_invites", JSON.stringify([...existing, ...newInvites]));
    } catch {}

    setTimeout(() => {
      setIsSending(false);
      setShowToast(true);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full" style={{ fontFamily: "'Inter', sans-serif", background: "#F5F5F7" }}>

      {/* App Bar */}
      <div className="flex-shrink-0 flex items-center px-5"
        style={{ paddingTop: "12px", paddingBottom: "8px", minHeight: "56px", borderBottom: "1px solid #F0F0F0", background: "#fff" }}>
        <button onClick={() => router.back()} className="flex items-center gap-1">
          <ChevronLeft size={22} style={{ color: "#0E0E10" }} />
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>Add Member</span>
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-5" style={{ paddingBottom: "100px" }}>
        <p style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10", marginBottom: "14px" }}>
          Add Member by Phone Number
        </p>

        {/* Phone input + Add */}
        <div className="flex gap-2 mb-1">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              value={phone}
              onChange={handlePhoneChange}
              onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }}
              enterKeyHint="done"
              placeholder="Phone Number (10 digits)"
              autoFocus
              maxLength={10}
              style={{
                width: "100%", height: "48px", borderRadius: "12px",
                border: phoneError ? "1.5px solid #DC2626" : "1.5px solid #E4E4E7",
                background: "#FAFAFA", paddingLeft: "16px", paddingRight: "12px",
                fontSize: "15px", color: "#0E0E10", outline: "none",
                fontFamily: "'Inter', sans-serif", transition: "border-color 0.15s",
              }}
              onFocus={(e) => { if (!phoneError) e.target.style.borderColor = "#9728B8"; }}
              onBlur={(e) => { if (!phoneError) e.target.style.borderColor = "#E4E4E7"; }}
            />
          </div>
          <button
            onClick={handleAdd}
            disabled={phone.length !== 10}
            style={{
              height: "52px", borderRadius: "12px", padding: "0 22px",
              background: phone.length === 10 ? "#9728B8" : "#E4E4E7",
              color: phone.length === 10 ? "#fff" : "#B3B3B4",
              fontSize: "14px", fontWeight: 600, border: "none",
              cursor: phone.length === 10 ? "pointer" : "not-allowed",
              flexShrink: 0, transition: "all 0.15s",
            }}
          >
            Add
          </button>
        </div>

        {/* Inline error */}
        {phoneError && (
          <p style={{ fontSize: "12px", color: "#DC2626", marginBottom: "10px", marginTop: "4px", paddingLeft: "4px" }}>
            {phoneError}
          </p>
        )}

        {/* Selected Numbers */}
        {selected.length > 0 && (
          <div className="mb-5 mt-4">
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#0E0E10", marginBottom: "10px" }}>
              Selected Numbers
              <span style={{
                marginLeft: "8px", fontSize: "11px", fontWeight: 700,
                background: "#9728B8", color: "#fff", borderRadius: "9999px", padding: "2px 8px",
              }}>
                {selected.length}
              </span>
            </p>
            <div className="flex flex-col gap-2">
              {selected.map((num) => (
                <div key={num} style={{
                  height: "52px", borderRadius: "12px",
                  border: "1.5px solid #00C1E2", background: "rgba(0,193,226,0.05)",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  paddingLeft: "16px", paddingRight: "12px", gap: "10px",
                }}>
                  <span style={{ fontSize: "15px", fontWeight: 600, color: "#0E0E10", flex: 1 }}>{num}</span>
                  <div className="flex items-center gap-2">
                    <div style={{
                      width: "26px", height: "26px", borderRadius: "9999px",
                      background: "#00C1E2", display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Check size={14} style={{ color: "#fff" }} strokeWidth={2.5} />
                    </div>
                    <button onClick={() => handleRemove(num)} style={{
                      width: "26px", height: "26px", borderRadius: "9999px",
                      background: "#F1F1F1", display: "flex", alignItems: "center",
                      justifyContent: "center", border: "none", cursor: "pointer",
                    }}>
                      <X size={13} style={{ color: "#52525B" }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div style={{ flex: 1, height: "1px", background: "#E4E4E7" }} />
          <span style={{ fontSize: "12px", color: "#B3B3B4", fontWeight: 600, whiteSpace: "nowrap" }}>
            Or Add From Contact
          </span>
          <div style={{ flex: 1, height: "1px", background: "#E4E4E7" }} />
        </div>

        {/* Choose From Contacts */}
        <button onClick={handleChooseContact} style={{
          width: "100%", height: "48px", borderRadius: "12px",
          border: "1.5px solid #9728B8",
          background: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        }}>
          <span style={{ fontSize: "15px", fontWeight: 600, color: "#9728B8" }}>
            Choose From Contact
          </span>
        </button>
      </div>

      {/* Success overlay */}
      {showToast && (
        <div
          onClick={() => router.back()}
          style={{
            position: "absolute", inset: 0, zIndex: 60,
            background: "linear-gradient(160deg, #f8f0ff 0%, #fff5fb 40%, #f0faff 100%)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            animation: "fade-in 0.3s ease both",
            cursor: "pointer",
          }}
        >
          <div style={{
            width: "100px", height: "100px", borderRadius: "9999px",
            background: "#4CAF50",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 0 10px rgba(76,175,80,0.15), 0 0 0 20px rgba(76,175,80,0.07)",
            animation: "zoom-in 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.1s both",
            marginBottom: "32px",
          }}>
            <Check size={50} style={{ color: "#fff" }} strokeWidth={3} />
          </div>
          <div style={{ textAlign: "center", padding: "0 32px" }}>
            <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#0E0E10", marginBottom: "10px", lineHeight: 1.2 }}>
              Invitations Sent!
            </h2>
            <p style={{ fontSize: "15px", color: "#52525B", lineHeight: 1.6 }}>
              <span style={{ fontWeight: 700, color: "#9728B8" }}>
                {selected.length} {selected.length === 1 ? "person" : "people"}
              </span>{" "}
              invited to your family
            </p>
            <p style={{ fontSize: "13px", color: "#B3B3B4", marginTop: "24px" }}>
              Tap anywhere to continue
            </p>
          </div>
        </div>
      )}

      {/* Floating Send Invitation Button */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "12px 20px 20px",
        background: "linear-gradient(to top, rgba(255,255,255,1) 70%, rgba(255,255,255,0))",
      }}>
        <button
          onClick={handleSend}
          disabled={!selected.length || isSending || showToast}
          style={{
            width: "100%", height: "48px", borderRadius: "16px",
            background: selected.length && !showToast ? "#9728B8" : "#E4E4E7",
            color: selected.length && !showToast ? "#fff" : "#B3B3B4",
            fontSize: "16px", fontWeight: 600, border: "none",
            cursor: selected.length && !isSending && !showToast ? "pointer" : "not-allowed",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
            boxShadow: selected.length && !showToast ? "0 8px 24px rgba(151,40,184,0.35)" : "none",
            transition: "all 0.2s",
          }}
        >
          {isSending ? (
            <>
              <div style={{
                width: "18px", height: "18px", borderRadius: "9999px",
                border: "2.5px solid rgba(255,255,255,0.4)", borderTopColor: "#fff",
                animation: "spin 0.7s linear infinite",
              }} />
              Sending…
            </>
          ) : (
            <>
              <Send size={18} />
              Send Invitation
              {selected.length > 0 && (
                <span style={{
                  background: "rgba(255,255,255,0.25)", borderRadius: "9999px",
                  padding: "2px 8px", fontSize: "12px", fontWeight: 700,
                }}>
                  {selected.length}
                </span>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

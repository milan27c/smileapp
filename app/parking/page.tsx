"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Plus, Clock, Home as HomeIcon, Gift, Compass, Calendar, User } from "lucide-react";
import { useState, useEffect } from "react";

interface Vehicle {
  id: string;
  letters: string;
  numbers: string;
  addedAt: number;
}

interface ParkingSession {
  vehicleId: string;
  location: string;
  startTime: number;
}

const MIN_CHARGE = 400;
const RATE_PER_HOUR = 100;

const plateInputStyle: React.CSSProperties = {
  width: "100%",
  height: "52px",
  borderRadius: "12px",
  border: "1.5px solid #E4E4E7",
  background: "#FAFAFA",
  paddingLeft: "12px",
  paddingRight: "12px",
  fontSize: "20px",
  color: "#0E0E10",
  outline: "none",
  fontFamily: "'Courier New', monospace",
  fontWeight: 700,
  textAlign: "center",
  letterSpacing: "2px",
};

export default function ParkingPage() {
  const router = useRouter();

  // isLoaded gates the save effect — prevents overwriting localStorage
  // with the initial empty state before the load effect has populated it.
  const [isLoaded, setIsLoaded] = useState(false);

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [session, setSession] = useState<ParkingSession | null>(null);
  const [letters, setLetters] = useState("");
  const [numbers, setNumbers] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [tick, setTick] = useState(0);

  // ── 1. Load persisted data on mount ──────────────────────────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem("smileapp_parking");
      if (raw) {
        const { vehicles: v, session: s } = JSON.parse(raw);
        if (Array.isArray(v)) setVehicles(v);
        if (s) setSession(s);
      }
    } catch { }
    // Only set isLoaded AFTER state is queued — this triggers a second render
    // where the save effect sees the real data, not the initial empty values.
    setIsLoaded(true);
  }, []);

  // ── 2. Save ONLY after load completed ────────────────────────────────────
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("smileapp_parking", JSON.stringify({ vehicles, session }));
    } catch { }
  }, [vehicles, session, isLoaded]);

  // ── 3. Live tick every second ─────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const elapsedSeconds = session ? (Date.now() - session.startTime) / 1000 : 0;

  const charge = Math.max(Math.floor((elapsedSeconds / 3600) * RATE_PER_HOUR), MIN_CHARGE);

  const formatDuration = () => {
    const h = Math.floor(elapsedSeconds / 3600);
    const m = Math.floor((elapsedSeconds % 3600) / 60);
    const s = Math.floor(elapsedSeconds % 60);
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // ── Add vehicle handler ───────────────────────────────────────────────────
  const handleAdd = () => {
    // Accept the full format with letters, numbers, and Sinhala characters
    const ltr = letters.trim();
    const num = numbers.replace(/\D/g, "").slice(0, 4);
    if (!ltr || !num) return;

    setScanning(true);
    setScanStep(0);
    setTimeout(() => setScanStep(1), 700);
    setTimeout(() => setScanStep(2), 1800);
    setTimeout(() => setScanStep(3), 3000);

    setTimeout(() => {
      const newVehicle: Vehicle = {
        id: Math.random().toString(36).slice(2, 9),
        letters: ltr,
        numbers: num,
        addedAt: Date.now(),
      };
      const bay = Math.floor(Math.random() * 10) + 1;
      const newSession: ParkingSession = {
        vehicleId: newVehicle.id,
        location: `B${bay}`,
        startTime: Date.now(),
      };

      const nextVehicles = [...vehicles, newVehicle];
      setVehicles(nextVehicles);
      setSession(newSession);
      setLetters("");
      setNumbers("");
      setScanning(false);
      setScanStep(0);
      setShowForm(false);
    }, 4200);
  };

  const canSubmit = letters.trim().length > 0 && numbers.trim().length > 0;

  // ── Scanning overlay ──────────────────────────────────────────────────────
  if (scanning) {
    return (
      <div className="flex flex-col h-full items-center justify-center px-8" style={{ background: "#F5F5F7" }}>
        {scanStep < 3 ? (
          <>
            <div
              style={{
                width: "64px", height: "64px", borderRadius: "50%",
                border: "4px solid #E4E4E7", borderTopColor: "#9728B8",
                animation: "spin 0.9s linear infinite", marginBottom: "24px",
              }}
            />
            <p style={{ fontSize: "16px", fontWeight: 600, color: "#0E0E10", textAlign: "center" }}>
              {scanStep === 0 && "Scanning vehicle..."}
              {scanStep === 1 && "Connecting to security system..."}
              {scanStep === 2 && "Registering in parking system..."}
            </p>
            <div style={{ marginTop: "16px", width: "200px", height: "6px", borderRadius: "9999px", background: "#E4E4E7" }}>
              <div
                style={{
                  height: "100%", borderRadius: "9999px",
                  backgroundImage: "linear-gradient(90deg, #9728B8 0%, #F002AF 100%)",
                  width: `${Math.round(((scanStep + 1) / 3) * 100)}%`,
                  transition: "width 0.6s ease",
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                width: "80px", height: "80px", borderRadius: "50%",
                background: "linear-gradient(135deg, #43D072 0%, #2BBD5E 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 8px 30px rgba(76,175,80,0.35)",
                animation: "zoom-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
                marginBottom: "24px",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p style={{ fontSize: "20px", fontWeight: 700, color: "#0E0E10" }}>Vehicle Added!</p>
            <p style={{ fontSize: "13px", color: "#52525B", marginTop: "8px", textAlign: "center" }}>
              Your vehicle is now registered and tracked.
            </p>
          </>
        )}
      </div>
    );
  }

  // ── Shared app bar ────────────────────────────────────────────────────────
  const appBar = (
    <div
      className="relative flex items-center px-5 flex-shrink-0"
      style={{
        paddingTop: "12px", paddingBottom: "8px",
        background: "#fff", borderBottom: "1px solid #F0F0F0", minHeight: "56px",
      }}
    >
      <button onClick={() => router.push("/home")} className="flex items-center gap-1">
        <ChevronLeft size={22} style={{ color: "#0E0E10" }} />
        <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>Parking</span>
      </button>
      <div style={{ width: "40px" }} />
    </div>
  );

  // ── Plate inputs (reused in both forms) ───────────────────────────────────
  const plateInputs = (
    <>
      <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
        <div style={{ flex: 3 }}>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "#52525B", marginBottom: "6px" }}>Letters</p>
          <input
            value={letters}
            onChange={(e) => {
              const input = e.target.value;
              // Allow A-Z, 0-9, and Sinhala characters (U+0D80-U+0DFF)
              const filtered = input.replace(/[^A-Z0-9\u0D80-\u0DFF\/\s-]/g, "").slice(0, 12);
              setLetters(filtered);
            }}
            placeholder="ABC / 202 / 02ශ්‍රී"
            maxLength={12}
            style={{
              ...plateInputStyle,
              fontSize: "16px",
            }}
          />
          <style>{`
            input[placeholder="ABC / 202 / 02ශ්‍රී"]::placeholder {
              font-size: 13px;
              letter-spacing: 0.5px;
              font-weight: 500;
              color: #B3B3B4;
            }
          `}</style>
        </div>
        <div style={{ flex: 2 }}>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "#52525B", marginBottom: "6px" }}>Numbers</p>
          <input
            value={numbers}
            onChange={(e) => setNumbers(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="0891"
            maxLength={4}
            inputMode="numeric"
            style={plateInputStyle}
          />
        </div>
      </div>
      <div style={{ background: "#FAFAFA", borderRadius: "10px", padding: "8px 12px", marginBottom: "12px" }}>
        <p style={{ fontSize: "11px", color: "#52525B", lineHeight: 1.5, margin: 0 }}>
          <span style={{ fontWeight: 600, color: "#0E0E10" }}>Example:</span> ABC 0891 / 60-1921 / 02ශ්‍රී 0121
          <br />
          <span style={{ color: "#B3B3B4", fontSize: "10px" }}>✓ All Sri Lankan vehicle formats supported</span>
        </p>
      </div>
    </>
  );

  // ── No vehicles yet ───────────────────────────────────────────────────────
  if (!isLoaded || vehicles.length === 0) {
    return (
      <div className="flex flex-col h-full" style={{ background: "#F5F5F7" }}>
        {appBar}
        <div className="flex-1 overflow-y-auto px-4 pt-6" style={{ paddingBottom: "88px" }}>
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #F0F0F0", padding: "20px" }}>
            <p style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10", marginBottom: "16px" }}>
              Add Your Vehicle
            </p>
            {plateInputs}
            <button
              onClick={handleAdd}
              disabled={!canSubmit}
              style={{
                width: "100%", height: "48px", borderRadius: "12px",
                background: canSubmit ? "#9728B8" : "#E4E4E7",
                color: canSubmit ? "#fff" : "#B3B3B4",
                fontSize: "15px", fontWeight: 600, border: "none",
                cursor: canSubmit ? "pointer" : "not-allowed", transition: "all 0.2s",
              }}
            >
              Add Vehicle
            </button>
          </div>
        </div>

        {/* ── Bottom Navigation ── */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center"
          style={{
            height: "72px", background: "#fff",
            borderTop: "1px solid #F0F0F0", boxShadow: "0 -4px 20px rgba(0,0,0,0.06)", zIndex: 10,
          }}
        >
          {[
            { icon: HomeIcon, label: "Home", route: "/home" },
            { icon: Gift, label: "Rewards", route: "/rewards" },
            { icon: Compass, label: "Explore", route: "/explore" },
            { icon: Calendar, label: "Events", route: "/events", active: false },
            { icon: User, label: "Profile", route: "/profile" },
          ].map(({ icon: Icon, label, route, active }) => (
            <button
              key={label}
              onClick={() => router.push(route)}
              className="flex-1 flex flex-col items-center justify-center gap-1"
            >
              <div style={{ width: "36px", height: "28px", borderRadius: "9999px", background: active ? "rgba(151,40,184,0.12)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={20} style={{ color: active ? "#9728B8" : "#B3B3B4", strokeWidth: active ? 2.5 : 1.75 }} />
              </div>
              <span style={{ fontSize: "10px", color: active ? "#9728B8" : "#B3B3B4", fontWeight: 600 }}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Has vehicles ──────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7" }}>
      {appBar}

      <div className="flex-1 overflow-y-auto px-4 pt-4" style={{ paddingBottom: "90px" }}>

        {/* ── Active parking card ── */}
        {session && (
          <>
            <div
              className="relative overflow-hidden mb-5"
              style={{ borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)", height: "130px", marginTop: "20px" }}
            >
              {/* Background — car positioned at bottom with 20px margin */}
              <Image
                src="/images/parkingbg2.png"
                alt="Parking"
                width={600}
                height={200}
                style={{ objectFit: "cover", objectPosition: "center bottom", width: "100%", height: "100%", display: "block" }}
                unoptimized
              />

              {/* Info panel on left — leaves car on right visible */}
              <div
                className="absolute inset-0 flex flex-col justify-start"
                style={{ padding: "6px 14px", width: "60%", gap: "10px", marginTop: "20px" }}
              >
                {/* Line 1: Location */}
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#fff", lineHeight: 1.2, whiteSpace: "nowrap", fontFamily: "'Inter', sans-serif" }}>
                  Your Vehicle has Parked at: <span style={{ fontSize: "18px", fontWeight: 600 }}>{session.location}</span>
                </p>

                {/* Line 2: Charges */}
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#fff", lineHeight: 1.2, whiteSpace: "nowrap", fontFamily: "'Inter', sans-serif" }}>
                  Parking Charges <span style={{ fontSize: "16px", fontWeight: 600 }}>{charge}.00 LKR</span>
                </p>

                {/* Line 3: Duration — HH:MM:SS format, use tick to ensure re-render every second */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}>
                  <Clock size={13} style={{ color: "#fff", flexShrink: 0 }} />
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#fff", lineHeight: 1.2, margin: 0, fontFamily: "'Inter', sans-serif" }}>
                    Duration: <span>{tick >= 0 ? formatDuration() : "00:00:00"}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Payment buttons */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
              <button
                onClick={() => router.push(`/parking-payment?amount=${charge}`)}
                style={{
                  flex: 1, height: "48px", borderRadius: "12px",
                  background: "#fff", color: "#9728B8", border: "1.5px solid #9728B8",
                  fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                }}
              >
                Pay with Card
              </button>
              <button
                onClick={() => router.push(`/parking-pay-points?amount=${charge}&points=${Math.ceil(charge / 5)}`)}
                style={{
                  flex: 1, height: "48px", borderRadius: "12px",
                  background: "#9728B8", color: "#fff", border: "none",
                  fontSize: "14px", fontWeight: 600, cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(151,40,184,0.3)", transition: "all 0.2s",
                }}
              >
                Pay with Points
              </button>
            </div>
          </>
        )}

        {/* ── My Vehicles list ── */}
        <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#0E0E10", marginBottom: "10px" }}>
          My Vehicles
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px" }}>
          {vehicles.map((v) => (
            <div
              key={v.id}
              style={{
                background: "#fff", borderRadius: "12px", border: "1px solid #F0F0F0",
                padding: "12px 14px", display: "flex", alignItems: "center", gap: "12px",
              }}
            >
              <div
                style={{
                  background: "#F5F5F7", borderRadius: "8px", padding: "6px 14px",
                  fontFamily: "'Courier New', monospace", fontWeight: 700,
                  fontSize: "15px", color: "#0E0E10", letterSpacing: "2px",
                }}
              >
                {v.letters} {v.numbers}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "11px", color: "#52525B" }}>
                  Added {new Date(v.addedAt).toLocaleDateString()}
                </p>
              </div>
              <div
                style={{
                  background: v.id === session?.vehicleId ? "#63DBAE" : "#F0F0F0",
                  color: v.id === session?.vehicleId ? "#fff" : "#52525B",
                  padding: "4px 10px", borderRadius: "6px", fontSize: "10px", fontWeight: 600,
                }}
              >
                {v.id === session?.vehicleId ? "Active" : "Parked"}
              </div>
            </div>
          ))}
        </div>

        {/* ── Add new vehicle ── */}
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            style={{
              width: "100%", height: "48px", borderRadius: "12px",
              background: "#fff", border: "1.5px solid #0E0E10",
              color: "#0E0E10", fontSize: "14px", fontWeight: 600,
              cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", gap: "8px", transition: "all 0.2s",
            }}
          >
            <Plus size={18} />
            Add New Vehicle
          </button>
        ) : (
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #F0F0F0", padding: "16px" }}>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#0E0E10", marginBottom: "14px" }}>
              Add Vehicle
            </p>
            {plateInputs}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => { setShowForm(false); setLetters(""); setNumbers(""); }}
                style={{
                  flex: 1, height: "48px", borderRadius: "12px",
                  background: "#F0F0F0", color: "#52525B",
                  fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!canSubmit}
                style={{
                  flex: 1, height: "48px", borderRadius: "12px",
                  background: canSubmit ? "#9728B8" : "#E4E4E7",
                  color: canSubmit ? "#fff" : "#B3B3B4",
                  fontSize: "14px", fontWeight: 600, border: "none",
                  cursor: canSubmit ? "pointer" : "not-allowed", transition: "all 0.2s",
                }}
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom Navigation ── */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center"
        style={{
          height: "72px", background: "#fff",
          borderTop: "1px solid #F0F0F0", boxShadow: "0 -4px 20px rgba(0,0,0,0.06)", zIndex: 10,
        }}
      >
        {[
          { icon: HomeIcon, label: "Home", route: "/home" },
          { icon: Gift, label: "Rewards", route: "/rewards" },
          { icon: Compass, label: "Explore", route: "/explore" },
          { icon: Car, label: "Parking", route: "/parking", active: true },
          { icon: User, label: "Profile", route: "/profile" },
        ].map(({ icon: Icon, label, route, active }) => (
          <button
            key={label}
            onClick={() => router.push(route)}
            className="flex-1 flex flex-col items-center justify-center gap-1"
          >
            <div style={{ width: "36px", height: "28px", borderRadius: "9999px", background: active ? "rgba(151,40,184,0.12)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={20} style={{ color: active ? "#9728B8" : "#B3B3B4", strokeWidth: active ? 2.5 : 1.75 }} />
            </div>
            <span style={{ fontSize: "10px", color: active ? "#9728B8" : "#B3B3B4", fontWeight: 600 }}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

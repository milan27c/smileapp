"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Gift,
  Car,
  Compass,
  User,
  ChevronRight,
  Home as HomeIcon,
} from "lucide-react";


const quickActions = [
  {
    gif: "/images/Home Page Gifs/scanqr.gif",
    label: "Scan & Earn",
    color: "#9728B8",
  },
  {
    gif: "/images/Home Page Gifs/myqr.gif",
    label: "My QR",
    color: "#F002AF",
  },
  {
    gif: "/images/Home Page Gifs/car.gif",
    label: "Parking",
    color: "#00C1E2",
  },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7" }}>

      {/* ── App Bar (Static) ── */}
      <div
        className="relative flex items-center justify-between px-5 flex-shrink-0"
        style={{
          paddingTop: "12px",
          paddingBottom: "8px",
          background: "#fff",
          borderBottom: "1px solid #F0F0F0",
          minHeight: "56px",
          zIndex: 20,
        }}
      >
        {/* Logo only — larger */}
        <Image src="/images/logo.png" alt="Smiles" width={72} height={72} />

        {/* Right icons — no background */}
        <div className="flex items-center gap-4">
          {/* Points Chip with Silver Badge */}
          <div
            className="flex items-center gap-2 px-3 py-1.5"
            style={{
              background: "#F5F5F7",
              borderRadius: "9999px",
              border: "1px solid #E4E4E7",
            }}
          >
            <Image
              src="/images/silver.png"
              alt="Silver Member"
              width={16}
              height={16}
              style={{ objectFit: "contain" }}
            />
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#0E0E10" }}>4,250</span>
          </div>
          {/* Notification bell */}
          <button className="relative flex items-center justify-center active:opacity-70">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0E0E10" strokeWidth="1.5">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <div
              className="absolute"
              style={{
                top: "2px",
                right: "2px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#DC2626",
              }}
            />
          </button>
        </div>
      </div>

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-[222px]">
        {/* ── Sliders (Horizontal Scroll) ── */}
        <div
          className="overflow-x-auto no-scrollbar"
          style={{ paddingLeft: "16px", paddingRight: "16px", paddingTop: "12px", paddingBottom: "16px" }}
        >
          <div className="flex gap-3" style={{ width: "fit-content" }}>
            {/* Slider 1 — Clickable card for promo details */}
            <button
              onClick={() => router.push("/promo-detail")}
              className="relative flex-shrink-0 overflow-hidden"
              style={{
                borderRadius: "20px",
                width: "320px",
                height: "192px",
                border: "none",
                cursor: "pointer",
                background: "none",
                padding: "0",
                transition: "transform 0.2s",
              }}
            >
              <Image
                src="/images/slider1.png"
                alt="Promo 1"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </button>

            {/* Slider 2 — Clickable card for challenges */}
            <button
              onClick={() => router.push("/challenges")}
              className="relative flex-shrink-0 overflow-hidden"
              style={{
                borderRadius: "20px",
                width: "320px",
                height: "192px",
                border: "none",
                cursor: "pointer",
                background: "none",
                padding: "0",
                transition: "transform 0.2s",
              }}
            >
              <Image
                src="/images/slider2.png"
                alt="Promo 2"
                fill
                style={{ objectFit: "cover" }}
              />
            </button>
          </div>
        </div>

        {/* ── Quick Access Cards ── */}
        <div className="px-4 pb-4">
          <div className="flex gap-3">
            {quickActions.map(({ gif, label, color }) => (
              <button
                key={label}
                onClick={() => {
                  if (label === "Scan & Earn") router.push("/scanner");
                  else if (label === "My QR") router.push("/myqr");
                  else if (label === "Parking") router.push("/parking");
                }}
                className="flex-1 flex flex-col items-center gap-2.5 py-4"
                style={{
                  borderRadius: "14px",
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  className="relative overflow-hidden flex-shrink-0"
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "12px",
                    background: `${color}15`,
                  }}
                >
                  <Image src={gif} alt={label} fill style={{ objectFit: "cover" }} />
                </div>
                <span
                  className="font-semibold text-center"
                  style={{ fontSize: "12px", color: "#0E0E10" }}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Total Points Card ── */}
        <div className="px-4 pb-4">
          <button
            onClick={() => router.push("/points")}
            className="w-full text-left relative overflow-hidden"
            style={{
              borderRadius: "24px",
              background: "linear-gradient(135deg, #5B4B9F 0%, #9728B8 50%, #D946A6 100%)",
              boxShadow: "0 12px 32px rgba(151,40,184,0.35)",
              border: "none",
              cursor: "pointer",
              padding: "0",
              transition: "transform 0.2s",
            }}
            onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)"; }}
            onMouseUp={(e)   => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
          >
            {/* Decorative circles */}
            <div className="absolute" style={{ width: "180px", height: "180px", borderRadius: "50%", background: "rgba(255,255,255,0.06)", top: "-60px", right: "-50px", pointerEvents: "none" }} />
            <div className="absolute" style={{ width: "100px", height: "100px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", bottom: "20px", left: "-30px", pointerEvents: "none" }} />

            {/* Top: points + rewards image */}
            <div className="relative z-10 flex items-center justify-between" style={{ padding: "16px 16px 12px 16px" }}>
              <div>
                {/* Silver badge */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 w-fit mb-2" style={{ background: "rgba(255,255,255,0.18)", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.35)", backdropFilter: "blur(10px)" }}>
                  <span style={{ fontSize: "10px", fontWeight: "bold", background: "linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #A8A8A8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>★</span>
                  <span className="font-bold text-white" style={{ fontSize: "9px", letterSpacing: "0.5px" }}>SILVER MEMBER</span>
                </div>
                {/* Points */}
                <div className="flex items-baseline gap-2">
                  <span className="text-white font-extrabold" style={{ fontSize: "36px", lineHeight: 1, letterSpacing: "-1px" }}>780</span>
                  <span className="text-white/80 font-medium" style={{ fontSize: "13px" }}>Available Points</span>
                </div>
                {/* Expiry */}
                <p style={{ fontSize: "9px", color: "rgba(255, 255, 255, 0.7)", marginTop: "3px", margin: 0 }}>265 Points expire Jan 31, 2026</p>
              </div>
              {/* Smile Rewards image */}
              <div className="flex-shrink-0" style={{ width: "90px", height: "90px", marginTop: "-2px", marginRight: "0px" }}>
                <Image src="/images/smilerewards.png" alt="Smile Rewards" width={90} height={90} style={{ objectFit: "contain" }} />
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative z-10" style={{ padding: "8px 16px 16px 16px" }}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-white/80 font-medium" style={{ fontSize: "11px" }}>Progress to Platinum</p>
                <p className="text-white/80 font-medium" style={{ fontSize: "11px" }}>4250/5000</p>
              </div>
              <div className="w-full mb-1" style={{ height: "6px", borderRadius: "9999px", background: "rgba(255,255,255,0.2)" }}>
                <div style={{ width: "85%", height: "100%", borderRadius: "9999px", background: "linear-gradient(90deg, #FED955, #FA9E1A)", boxShadow: "0 0 10px rgba(254,217,85,0.4)" }} />
              </div>
              <p className="text-white/70" style={{ fontSize: "10px", margin: 0, marginTop: "4px" }}>750 more points to unlock Platinum</p>
            </div>
          </button>
        </div>

        {/* ── Up Coming Events ── */}
        <div className="px-4 pb-6">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold" style={{ fontSize: "16px", color: "#0E0E10" }}>
              Up Coming Events
            </h2>
            <button onClick={() => router.push("/events")} style={{ background: "none", border: "none", cursor: "pointer", padding: "0" }}>
              <ChevronRight size={20} style={{ color: "#0E0E10" }} />
            </button>
          </div>

          {/* Events Scroll */}
          <div
            className="overflow-x-auto no-scrollbar"
            style={{ marginLeft: "-16px", marginRight: "-16px", paddingLeft: "16px", paddingRight: "16px" }}
          >
            <div className="flex gap-3" style={{ width: "fit-content" }}>
              {[
                { id: 1, img: "/images/events/events1.png", title: "A Fun Filled Christmas Party", date: "Dec 13, 2025" },
                { id: 2, img: "/images/events/events2.png", title: "New Year Countdown Gala",    date: "Dec 31, 2025" },
              ].map((ev) => (
                <button
                  key={ev.id}
                  onClick={() => router.push(`/event-details/${ev.id}`)}
                  className="flex-shrink-0 overflow-hidden text-left"
                  style={{ borderRadius: "14px", width: "220px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "none", cursor: "pointer", padding: "0" }}
                >
                  <Image src={ev.img} alt={ev.title} width={220} height={120} style={{ objectFit: "cover", width: "100%", height: "120px" }} unoptimized />
                  <div style={{ padding: "10px 12px" }}>
                    <p className="font-semibold" style={{ fontSize: "12px", color: "#0E0E10", lineHeight: 1.3 }}>{ev.title}</p>
                    <p style={{ fontSize: "11px", color: "#52525B", marginTop: "3px" }}>📅 {ev.date}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Daily Login Bonus ── */}
        <div className="px-4 pb-6">
          <button
            onClick={() => router.push("/daily-checkin-success")}
            className="relative overflow-hidden w-full text-left"
            style={{
              borderRadius: "16px",
              backgroundImage: "url(/images/diamondbg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "14px 16px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              minHeight: "56px",
              border: "none",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)";
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            }}
          >
            <div className="flex items-center gap-4">
              {/* Text — white */}
              <div className="flex-1 min-w-0" style={{ marginLeft: "40px" }}>
                <p className="font-bold text-white" style={{ fontSize: "14px" }}>
                  Daily Login Bonus
                </p>
                <p className="mt-0.5 text-white/75" style={{ fontSize: "12px" }}>
                  Claim your reward
                </p>
              </div>

              {/* Arrow — white */}
              <ChevronRight size={20} style={{ color: "rgba(255,255,255,0.8)" }} />
            </div>
          </button>
        </div>

        {/* ── Challenges For You ── */}
        <div className="px-4 pb-6">
          <button
            onClick={() => router.push("/challenges")}
            className="relative overflow-hidden w-full text-left"
            style={{
              borderRadius: "16px",
              height: "150px",
              border: "none",
              cursor: "pointer",
              background: "transparent",
              padding: "0",
              transition: "transform 0.2s",
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)";
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            }}
          >
            <Image
              src="/images/challenges.jpg"
              alt="Challenges For You"
              fill
              style={{ objectFit: "cover" }}
            />
            {/* Content pinned to left half so mascot stays visible */}
            <div
              className="absolute inset-0 flex flex-col justify-between p-4"
              style={{ width: "60%" }}
            >
              <div>
                <p className="text-white font-bold" style={{ fontSize: "15px", lineHeight: 1.3 }}>
                  Challenges For You
                </p>
                <p className="text-white/90 mt-1" style={{ fontSize: "11px", lineHeight: 1.4 }}>
                  Complete tasks, play fun games and earn points
                </p>
              </div>
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-fit px-3 py-1.5 rounded-lg"
                style={{
                  background: "#fff",
                  color: "#9728B8",
                  fontSize: "11px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                View Challenges
              </div>
            </div>
          </button>
        </div>

        {/* ── Rewards Just For You ── */}
        <div className="pb-6">
          {/* Section Header */}
          <div className="flex items-center justify-between px-4 mb-3">
            <h2 className="font-bold" style={{ fontSize: "16px", color: "#0E0E10" }}>
              Rewards Just For You
            </h2>
            <button onClick={() => router.push("/rewards")} style={{ background: "none", border: "none", cursor: "pointer" }}>
              <ChevronRight size={20} style={{ color: "#0E0E10" }} />
            </button>
          </div>

          {/* Rewards Scroll */}
          <div className="overflow-x-auto no-scrollbar" style={{ paddingLeft: "16px", paddingRight: "16px" }}>
            <div className="flex gap-3" style={{ width: "fit-content" }}>
              {[
                { img: "Food & Beverages.png", label: "Food & Beverages", count: 3, category: "Food & Beverages" },
                { img: "Fashion.png", label: "Fashion", count: 1, category: "Fashion" },
                { img: "Health, Beauty & Wellness.png", label: "Health & Beauty", count: 1, category: "Health, Beauty & Wellness" },
                { img: "Entertainment.png", label: "Entertainment", count: 0, category: "Entertainment" },
                { img: "Electronics & Lifestyle.png", label: "Electronics", count: 0, category: "Electronics & Lifestyle" },
                { img: "Accessories.png", label: "Accessories", count: 0, category: "Accessories" },
                { img: "Homeware.png", label: "Homeware", count: 0, category: "Homeware" },
                { img: "Books, Gifts & Novelties.png", label: "Books & Gifts", count: 0, category: "Books, Gifts & Novelties" },
                { img: "Convenience & Services.png", label: "Convenience", count: 0, category: "Convenience & Services" },
              ].map(({ img, label, count, category }) => (
                <button
                  key={label}
                  onClick={() => router.push(`/rewards?category=${encodeURIComponent(category)}`)}
                  className="relative flex-shrink-0 overflow-hidden text-left"
                  style={{
                    borderRadius: "14px",
                    width: "140px",
                    height: "140px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    border: "none",
                    cursor: "pointer",
                    padding: "0",
                  }}
                >
                  <Image
                    src={`/images/rewards/${img}`}
                    alt={label}
                    fill
                    style={{ objectFit: "cover", filter: count === 0 ? "grayscale(100%)" : "none" }}
                  />
                  {/* Bottom gradient for text contrast */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.65) 100%)",
                    }}
                  />
                  {/* Badge — top left */}
                  <div
                    className="absolute top-2 left-2 px-2 py-0.5"
                    style={{
                      background: count === 0 ? "rgba(0,0,0,0.45)" : "#fff",
                      borderRadius: "9999px",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                    }}
                  >
                    <span className="font-bold" style={{ fontSize: "10px", color: count === 0 ? "#fff" : "#0E0E10" }}>
                      {count === 0 ? "No rewards" : `${count} Reward${count === 1 ? "" : "s"}`}
                    </span>
                  </div>
                  {/* Category label — bottom */}
                  <div className="absolute bottom-0 left-0 right-0 px-2.5 pb-2.5">
                    <p className="font-semibold text-white" style={{ fontSize: "11px", lineHeight: 1.3 }}>
                      {label}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Park Smarter, Pay With Points ── */}
        <div className="px-4 pb-6">
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: "16px",
              height: "110px",
            }}
          >
            <Image
              src="/images/parking.png"
              alt="Parking"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            {/* Text pinned to left so car stays fully visible on right */}
            <div
              className="absolute inset-0 flex flex-col justify-center px-4"
              style={{ width: "68%" }}
            >
              <p className="font-bold text-white" style={{ fontSize: "14px", lineHeight: 1.3 }}>
                Park Smarter, Pay With Smile Points
              </p>
              <p className="mt-1 text-white/85" style={{ fontSize: "10px", lineHeight: 1.4 }}>
                Enjoy smart parking and pay with Smile Points in seconds.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Navigation ── */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center"
        style={{
          height: "72px",
          background: "#fff",
          borderTop: "1px solid #F0F0F0",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
        }}
      >
        {[
          { icon: HomeIcon, label: "Home", active: true },
          { icon: Gift, label: "Rewards", active: false },
          { icon: Compass, label: "Explore", active: false },
          { icon: Car, label: "Parking", active: false },
          { icon: User, label: "Profile", active: false },
        ].map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            onClick={() => {
              if (label === "Rewards") router.push("/rewards");
              if (label === "Explore") router.push("/explore");
              if (label === "Parking") router.push("/parking");
              if (label === "Profile") router.push("/profile");
            }}
            className="flex-1 flex flex-col items-center justify-center gap-1"
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: "36px",
                height: "28px",
                borderRadius: "9999px",
                background: active ? "rgba(151,40,184,0.12)" : "transparent",
                transition: "background 0.2s",
              }}
            >
              <Icon
                size={20}
                style={{ color: active ? "#9728B8" : "#B3B3B4" }}
                strokeWidth={active ? 2.5 : 1.75}
              />
            </div>
            <span
              className="font-semibold"
              style={{
                fontSize: "10px",
                color: active ? "#9728B8" : "#B3B3B4",
              }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* ── Floating Spin Wheel Button ── */}
      <button
        onClick={() => router.push("/spin-wheel")}
        className="absolute"
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          background: "#9728B8",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bottom: "90px",
          right: "20px",
          zIndex: 30,
          boxShadow: "0 6px 20px rgba(151,40,184,0.3)",
          transition: "all 0.2s",
        }}
        onMouseDown={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.92)";
        }}
        onMouseUp={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        <Image
          src="/images/spinwheel.png"
          alt="Spin Wheel"
          width={28}
          height={28}
          style={{ objectFit: "contain" }}
        />
      </button>

    </div>
  );
}

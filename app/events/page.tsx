"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Home as HomeIcon, Gift, Compass, Calendar, User } from "lucide-react";



const EVENTS = [
  {
    id: 0,
    img: "/images/slider-lego.png",
    title: "LEGO Play Zone at Havelock City Mall",
    date: "06 & 07 June 2026",
    location: "Havelock City Mall Atrium Lobby",
    price: "LKR 500",
    ages: "All ages",
    points: 800,
  },
  {
    id: 1,
    img: "/images/events/events1.png",
    title: "Checkmate 2026 — Chess Fiesta",
    date: "20th & 21st June 2026",
    location: "Havelock City Mall – Level 01, Atrium Lobby",
    price: "Free Entry",
    ages: "Ages 8 & Above",
    points: 700,
  },
  {
    id: 2,
    img: "/images/events/events6.png",
    title: "Creative Kids Workshop — 40th Edition",
    date: "16th & 17th May",
    location: "Havelock City Mall – Level 4",
    price: "RS. 2500/-",
    ages: "Ages 3–10",
    points: 500,
  },
  {
    id: 3,
    img: "/images/events/events3.png",
    title: "Elf Magic Show & Face Painting",
    date: "Dec 20, 2026",
    location: "Havelock City Mall",
    price: "Rs. 1,500 per child",
    ages: "Ages 3–10",
    points: 300,
  },
  {
    id: 4,
    img: "/images/events/events4.png",
    title: "Santa's Cookie Decoration Workshop",
    date: "Dec 21, 2026",
    location: "Havelock City Mall",
    price: "Rs. 1,200 per child",
    ages: "Ages 5–12",
    points: 240,
  },
  {
    id: 5,
    img: "/images/events/events5.png",
    title: "Christmas Card Making Contest",
    date: "Dec 22, 2026",
    location: "Havelock City Mall",
    price: "Rs. 800 per child",
    ages: "Ages 6–14",
    points: 160,
  },
];

export default function EventsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7", fontFamily: "'Inter', sans-serif" }}>

      {/* App Bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-5"
        style={{ paddingTop: "12px", paddingBottom: "8px", minHeight: "56px", borderBottom: "1px solid #F0F0F0", background: "#fff" }}>
        <h1 style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10", margin: 0 }}>Events</h1>
        <div style={{ width: "40px" }} />
      </div>

      {/* Events List */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-[192px]">
        {/* Hero Banner Card */}
        <div style={{
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          marginBottom: "16px",
        }}>
          {/* Background image at natural size */}
          <Image
            src="/images/eventspage.png"
            alt="Events"
            width={600}
            height={240}
            style={{ objectFit: "cover", width: "100%", height: "auto", display: "block" }}
            unoptimized
          />
          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center" style={{ padding: "16px" }}>
            {/* Left: GIF */}
            <div style={{ position: "relative", width: "90px", height: "90px", flexShrink: 0, borderRadius: "12px", overflow: "hidden" }}>
              <Image
                src="/images/events.gif"
                alt="Events"
                fill
                style={{ objectFit: "cover" }}
                unoptimized
              />
            </div>
            {/* Right: Text */}
            <div style={{ flex: 1, paddingLeft: "14px" }}>
              <p style={{ fontSize: "16px", fontWeight: 800, color: "#0E0E10", lineHeight: 1.25, marginBottom: "6px" }}>
                {EVENTS.length} Events Happening Soon!
              </p>
              <p style={{ fontSize: "12px", color: "#52525B", lineHeight: 1.4 }}>
                Stay tuned and book your spot before tickets run out.
              </p>
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10", marginBottom: "14px" }}>
          Upcoming Events
        </h2>

        <div className="flex flex-col gap-4">
          {EVENTS.map((event) => (
            <button
              key={event.id}
              onClick={() => router.push(`/event-details/${event.id}`)}
              style={{
                background: "#fff",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid #F0F0F0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                cursor: "pointer",
                textAlign: "left",
                padding: "0",
                width: "100%",
                transition: "transform 0.15s",
              }}
              onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)"; }}
              onMouseUp={(e)   => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
            >
              {/* Thumbnail */}
              <div style={{ position: "relative", width: "100%", height: "160px" }}>
                <Image
                  src={event.img}
                  alt={event.title}
                  fill
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              </div>

              {/* Info */}
              <div style={{ padding: "12px 14px" }}>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#0E0E10", lineHeight: 1.3, marginBottom: "6px" }}>
                  {event.title}
                </p>
                <div className="flex flex-col gap-1">
                  <p style={{ fontSize: "11px", color: "#52525B" }}>📍 {event.location}</p>
                  <p style={{ fontSize: "11px", color: "#52525B" }}>📅 {event.date}</p>
                </div>
                <div className="flex items-center justify-between mt-8px" style={{ marginTop: "8px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#0E0E10" }}>{event.price}</p>
                  <div style={{
                    background: "rgba(1,77,152,0.1)",
                    borderRadius: "6px",
                    padding: "3px 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}>
                    <span style={{ fontSize: "10px", color: "#014D98", fontWeight: 600 }}>🪙 {event.points} pts</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
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
          { icon: HomeIcon, label: "Home", active: false },
          { icon: Gift, label: "Rewards", active: false },
          { icon: Compass, label: "Explore", active: false },
          { icon: Calendar, label: "Events", active: true },
          { icon: User, label: "Profile", active: false },
        ].map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            onClick={() => {
              if (label === "Home") router.push("/home");
              if (label === "Rewards") router.push("/rewards");
              if (label === "Explore") router.push("/explore");
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
    </div>
  );
}

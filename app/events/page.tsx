"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import StatusBar from "@/app/components/StatusBar";



const EVENTS = [
  {
    id: 1,
    img: "/images/events/events1.png",
    title: "A Fun Filled Christmas Party — Just For Kids",
    date: "Dec 13, 2025",
    location: "Havelock City Mall",
    price: "Rs. 3,500 per child",
    ages: "Ages 4–12",
    points: 700,
  },
  {
    id: 2,
    img: "/images/events/events2.png",
    title: "New Year Countdown Gala",
    date: "Dec 31, 2025",
    location: "Havelock City Mall",
    price: "Rs. 2,500 per person",
    ages: "All ages",
    points: 500,
  },
  {
    id: 3,
    img: "/images/events/events3.png",
    title: "Elf Magic Show & Face Painting",
    date: "Dec 20, 2025",
    location: "Havelock City Mall",
    price: "Rs. 1,500 per child",
    ages: "Ages 3–10",
    points: 300,
  },
  {
    id: 4,
    img: "/images/events/events4.png",
    title: "Santa's Cookie Decoration Workshop",
    date: "Dec 21, 2025",
    location: "Havelock City Mall",
    price: "Rs. 1,200 per child",
    ages: "Ages 5–12",
    points: 240,
  },
  {
    id: 5,
    img: "/images/events/events5.png",
    title: "Christmas Card Making Contest",
    date: "Dec 22, 2025",
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
      <StatusBar />

      {/* App Bar */}
      <div className="flex-shrink-0 flex items-center px-5"
        style={{ paddingTop: "12px", paddingBottom: "8px", minHeight: "56px", borderBottom: "1px solid #F0F0F0", background: "#fff" }}>
        <button onClick={() => router.push("/home")} className="flex items-center gap-1">
          <ChevronLeft size={22} style={{ color: "#0E0E10" }} />
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>Events</span>
        </button>
      </div>

      {/* Hero Banner Card */}
      <div className="px-4 pt-4 flex-shrink-0">
        <div style={{
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
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
      </div>

      {/* Events List */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-6">
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
                <div className="flex items-center gap-4">
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
    </div>
  );
}

"use client";

import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";



const EVENTS: Record<string, any> = {
  "0": {
    id: 0,
    img: "/images/slider3.png",
    title: "Grand Year-End Celebration",
    description: "Join us for the most spectacular year-end celebration at Havelock City Mall! Experience live performances, exclusive shopping deals, gourmet dining experiences, and grand prize draws. Celebrate the end of the year with your loved ones in a magical festive atmosphere.",
    location: "Havelock City Mall",
    date: "Dec 28, 2025",
    price: 5000,
    ages: "All ages",
    points: 800,
    sessions: [
      { name: "Session 1", time: "10:00 AM" },
      { name: "Session 2", time: "06:00 PM" },
    ],
    activities: ["Live Performances", "Shopping Deals", "Gourmet Dining", "Prize Draws", "Entertainment"],
    contact: "076 382 2826",
  },
  "1": {
    id: 1,
    img: "/images/events/events1.png",
    title: "A Fun Filled Christmas Party — Just For Kids",
    description: "Get ready to make this festive season truly unforgettable for your little ones! Step into a world of Christmas cheer with a full day of elf magic shows, Santa visits, cookie decoration, face painting, Christmas card making, and so much more — specially curated for kids to laugh, play, and celebrate.",
    location: "Havelock City Mall",
    date: "Dec 13, 2025",
    price: 3500,
    ages: "Ages 4–12",
    points: 700,
    sessions: [
      { name: "Session 1", time: "11:00 AM" },
      { name: "Session 2", time: "04:00 PM" },
    ],
    activities: ["Elf Magic Shows", "Santa Visit", "Face Painting", "Cookie Decoration", "Xmas Card Making"],
    contact: "076 382 2826",
  },
  "2": {
    id: 2,
    img: "/images/events/events2.png",
    title: "New Year Countdown Gala",
    description: "Ring in the New Year in spectacular style at Havelock City Mall's grand countdown gala. Enjoy live entertainment, gourmet food stalls, and a dazzling fireworks display as we welcome 2026 together.",
    location: "Havelock City Mall",
    date: "Dec 31, 2025",
    price: 2500,
    ages: "All ages",
    points: 500,
    sessions: [
      { name: "Session 1", time: "08:00 PM" },
    ],
    activities: ["Live Music", "Fireworks Display", "Food Stalls", "Photo Booths"],
    contact: "076 382 2826",
  },
  "3": {
    id: 3,
    img: "/images/events/events3.png",
    title: "Elf Magic Show & Face Painting",
    description: "Watch in wonder as our talented elves perform breathtaking magic tricks and illusions, followed by a face painting session where kids can transform into their favourite characters.",
    location: "Havelock City Mall",
    date: "Dec 20, 2025",
    price: 1500,
    ages: "Ages 3–10",
    points: 300,
    sessions: [
      { name: "Session 1", time: "10:00 AM" },
      { name: "Session 2", time: "02:00 PM" },
    ],
    activities: ["Elf Magic Show", "Face Painting", "Balloon Art"],
    contact: "076 382 2826",
  },
  "4": {
    id: 4,
    img: "/images/events/events4.png",
    title: "Santa's Cookie Decoration Workshop",
    description: "Join Santa's little helpers in a delightful cookie decoration workshop. Kids will bake and decorate their own Christmas cookies to take home as a sweet souvenir of the season.",
    location: "Havelock City Mall",
    date: "Dec 21, 2025",
    price: 1200,
    ages: "Ages 5–12",
    points: 240,
    sessions: [
      { name: "Session 1", time: "11:00 AM" },
      { name: "Session 2", time: "03:00 PM" },
    ],
    activities: ["Cookie Baking", "Cookie Decoration", "Gift Wrapping"],
    contact: "076 382 2826",
  },
  "5": {
    id: 5,
    img: "/images/events/events5.png",
    title: "Christmas Card Making Contest",
    description: "Unleash your child's creativity in our Christmas card making contest. The most creative card wins special prizes and will be displayed in the mall for the festive season.",
    location: "Havelock City Mall",
    date: "Dec 22, 2025",
    price: 800,
    ages: "Ages 6–14",
    points: 160,
    sessions: [
      { name: "Session 1", time: "10:00 AM" },
    ],
    activities: ["Card Making", "Craft Workshop", "Prize Giving"],
    contact: "076 382 2826",
  },
};

export default function EventDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params?.id as string;
  const event = EVENTS[eventId];

  if (!event) {
    return (
      <div className="flex flex-col h-full items-center justify-center" style={{ background: "#F5F5F7" }}>
        <p style={{ color: "#52525B" }}>Event not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7", fontFamily: "'Inter', sans-serif" }}>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-[192px]">
        {/* Hero Image */}
        <div style={{ position: "relative", height: "240px", overflow: "hidden", marginBottom: "0" }}>
          <Image
            src={event.img}
            alt={event.title}
            fill
            style={{ objectFit: "cover" }}
            unoptimized
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.5) 100%)" }} />
          <button
            onClick={() => router.back()}
            className="absolute flex items-center gap-1"
            style={{ top: "48px", left: "20px", background: "none", border: "none", cursor: "pointer", zIndex: 10 }}
          >
            <ChevronLeft size={22} style={{ color: "#fff" }} />
          </button>
        </div>
        {/* Title card */}
        <div style={{ background: "#fff", padding: "20px 20px 16px", borderBottom: "1px solid #F0F0F0" }}>
          <h1 style={{ fontSize: "18px", fontWeight: 800, color: "#0E0E10", lineHeight: 1.3, marginBottom: "12px" }}>
            {event.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <span style={{ fontSize: "14px", marginRight: "12px" }}>📍</span>
              <span style={{ fontSize: "13px", color: "#52525B", marginLeft: "8px" }}>{event.location}</span>
            </div>
            <div className="flex items-center">
              <span style={{ fontSize: "14px", marginRight: "12px" }}>📅</span>
              <span style={{ fontSize: "13px", color: "#52525B", marginLeft: "8px" }}>{event.date}</span>
            </div>
            <div className="flex items-center">
              <span style={{ fontSize: "14px", marginRight: "12px" }}>💰</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#0E0E10", marginLeft: "8px" }}>Rs. {event.price.toLocaleString()} per child · {event.ages}</span>
            </div>
          </div>
        </div>

        <div className="px-4 pt-4">

          {/* Description */}
          <p style={{ fontSize: "14px", color: "#52525B", lineHeight: 1.6, marginBottom: "20px" }}>
            {event.description}
          </p>

          {/* Sessions */}
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #F0F0F0", padding: "16px", marginBottom: "16px" }}>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#0E0E10", marginBottom: "10px" }}>
              🕐 Sessions
            </p>
            <div className="flex flex-col gap-2">
              {event.sessions.map((s: { name: string; time: string }, i: number) => (
                <div key={i} className="flex items-center justify-between" style={{
                  background: "#F5F5F7",
                  borderRadius: "10px",
                  padding: "10px 14px",
                }}>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#0E0E10" }}>{s.name}</span>
                  <span style={{ fontSize: "13px", color: "#52525B" }}>{s.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #F0F0F0", padding: "16px", marginBottom: "16px" }}>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#0E0E10", marginBottom: "10px" }}>
              🎉 Activities
            </p>
            <ul style={{ margin: 0, paddingLeft: "20px" }}>
              {event.activities.map((a: string, i: number) => (
                <li key={i} style={{ fontSize: "13px", color: "#52525B", lineHeight: 1.6, marginBottom: "4px" }}>
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Limited seats */}
          <div style={{
            background: "rgba(220,38,38,0.06)",
            border: "1px solid rgba(220,38,38,0.2)",
            borderRadius: "12px",
            padding: "12px 16px",
            marginBottom: "16px",
            display: "flex",
            gap: "8px",
            alignItems: "flex-start",
          }}>
            <span style={{ fontSize: "16px", flexShrink: 0 }}>🚨</span>
            <p style={{ fontSize: "12px", color: "#DC2626", fontWeight: 600, lineHeight: 1.5 }}>
              Limited seats! Call {event.contact} to book your child's spot.
            </p>
          </div>

        </div>
      </div>

      {/* Sticky payment buttons */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        background: "#fff",
        borderTop: "1px solid #F0F0F0",
        padding: "12px 20px 24px",
        display: "flex",
        gap: "12px",
      }}>
        {/* Pay with Card */}
        <button
          onClick={() => router.push(`/payment-gateway/${event.id}`)}
          style={{
            flex: 1,
            height: "48px",
            borderRadius: "12px",
            background: "#fff",
            color: "#9728B8",
            border: "1.5px solid #9728B8",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          Pay with Card
        </button>

        {/* Pay with Smile Points */}
        <button
          onClick={() => router.push(`/pay-with-points/${event.id}`)}
          style={{
            flex: 1,
            height: "48px",
            borderRadius: "12px",
            background: "#9728B8",
            color: "#fff",
            border: "none",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(151,40,184,0.3)",
            transition: "all 0.2s",
          }}
        >
          Pay with Smile Points
        </button>
      </div>
    </div>
  );
}

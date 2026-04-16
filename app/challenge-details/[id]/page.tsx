"use client";

import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import StatusBar from "@/app/components/StatusBar";



type Challenge = {
  id: number;
  title: string;
  points: number;
  brand: string;
  logo: string;
  completed: number;
  total: number;
  rules: string[];
};

const CHALLENGES_DATA: Record<string, Challenge> = {
  "1": { id: 1, title: "Visit Cargills Food Hall 2 Times", points: 30, brand: "Cargills Food Hall", logo: "/images/Logos/Cargills Food Hall.png", completed: 1, total: 2, rules: ["Each visit must be recorded by scanning the Smile QR code or making an eligible transaction at Cargills Food Hall, Havelock City Mall.", "Multiple visits on the same day will count as one visit only toward this challenge.", "Visits must be completed within the active challenge period shown in the app.", "Smile Points will be automatically credited once all visits are completed."] },
  "2": { id: 2, title: "Spend Rs. 2,000 At Finch Foods", points: 100, brand: "Finch Foods", logo: "/images/Logos/Finch Foods.png", completed: 2, total: 3, rules: ["Total spending must reach Rs. 2,000 or more at Finch Foods.", "All transactions must be recorded through the Smile QR code or the app.", "Spending across multiple days will be accumulated towards the total.", "Smile Points will be credited automatically once the target is reached."] },
  "3": { id: 3, title: "Visit Cool Planet 3 Times", points: 250, brand: "Cool Planet", logo: "/images/Logos/Cool Planet.png", completed: 2, total: 3, rules: ["Each visit must be recorded by scanning the Smile QR code or making an eligible transaction at Cool Planet.", "Multiple visits on the same day will count as one visit only toward this challenge.", "Visits must be completed within the active challenge period shown in the app.", "Smile Points will be automatically credited once all 3 visits are completed."] },
  "4": { id: 4, title: "Shop at Levis & Odel", points: 150, brand: "Levis", logo: "/images/Logos/Levis.png", completed: 3, total: 5, rules: ["Visits to either Levis or Odel locations at Havelock City Mall count.", "Each visit must be recorded by scanning the Smile QR code or making a purchase.", "Mix and match visits between both stores toward your goal of 5 visits.", "Smile Points will be credited once all visits are completed."] },
  "5": { id: 5, title: "Visit Nail Spa", points: 100, brand: "Nail Spa", logo: "/images/Logos/Nail Spa.png", completed: 1, total: 2, rules: ["Each visit to Nail Spa must be recorded by scanning the Smile QR code.", "Services must be availed at the Havelock City Mall location.", "You need to complete 2 visits to earn the full reward.", "Smile Points will be automatically credited after completion."] },
};

export default function ChallengeDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const challengeId = params?.id as string;
  const challenge = CHALLENGES_DATA[challengeId];

  if (!challenge) {
    return (
      <div className="flex flex-col h-full" style={{ background: "#F5F5F7" }}>
        <StatusBar />
        <div className="flex-shrink-0 flex items-center px-5"
          style={{ paddingTop: "48px", paddingBottom: "12px", minHeight: "80px", borderBottom: "1px solid #F0F0F0", background: "#fff" }}>
          <button onClick={() => router.back()} className="flex items-center gap-1">
            <ChevronLeft size={22} style={{ color: "#0E0E10" }} />
            <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>Challenge Details</span>
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p style={{ color: "#52525B" }}>Challenge not found</p>
        </div>
      </div>
    );
  }

  const percentage = Math.round((challenge.completed / challenge.total) * 100);
  const remaining = challenge.total - challenge.completed;

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7" }}>
      <StatusBar />

      {/* App Bar */}
      <div className="flex-shrink-0 flex items-center px-5"
        style={{ paddingTop: "48px", paddingBottom: "12px", minHeight: "80px", borderBottom: "1px solid #F0F0F0", background: "#fff" }}>
        <button onClick={() => router.back()} className="flex items-center gap-1">
          <ChevronLeft size={22} style={{ color: "#0E0E10" }} />
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>Challenge Details</span>
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-6">

        {/* Brand Logo + Title + Points */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #F0F0F0", padding: "20px", marginBottom: "16px" }}>
          {/* Brand Logo */}
          <div style={{
            width: "80px",
            height: "80px",
            borderRadius: "12px",
            background: "#F1F1F1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            overflow: "hidden",
          }}>
            <Image
              src={challenge.logo}
              alt={challenge.brand}
              width={72}
              height={72}
              style={{ objectFit: "contain" }}
              unoptimized
            />
          </div>

          {/* Brand Name */}
          <p style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10", textAlign: "center", margin: "0 0 12px 0", lineHeight: 1.3 }}>
            {challenge.brand}
          </p>

          {/* Challenge Title */}
          <p style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10", textAlign: "center", margin: "0 0 14px 0", lineHeight: 1.4 }}>
            {challenge.title}
          </p>

          {/* Points Badge */}
          <div style={{
            background: "#E8F5E9",
            border: "1px solid #C8E6C9",
            borderRadius: "8px",
            padding: "10px 12px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}>
            <span style={{ fontSize: "14px" }}>🏆</span>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#2E7D32" }}>
              Earn {challenge.points} Smile Points
            </span>
          </div>
        </div>

        {/* Your Progress */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #F0F0F0", padding: "16px", marginBottom: "16px" }}>
          <p style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10", marginBottom: "12px", margin: "0 0 12px 0" }}>
            Your Progress
          </p>

          {/* Progress Count */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#52525B", margin: 0 }}>
              {challenge.total === 1 ? "Status" : `${challenge.completed}/${challenge.total} ${challenge.total === 2 ? "Visits" : "Visits"}`}
            </p>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#0E0E10", margin: 0 }}>
              {percentage}%
            </p>
          </div>

          {/* Progress Bar */}
          <div style={{
            height: "8px",
            borderRadius: "9999px",
            background: "#F1F1F1",
            overflow: "hidden",
            marginBottom: "10px",
          }}>
            <div style={{
              height: "100%",
              width: `${percentage}%`,
              backgroundImage: "linear-gradient(90deg, #9728B8 0%, #F002AF 100%)",
              borderRadius: "9999px",
              transition: "width 0.3s ease",
            }} />
          </div>

          {/* Progress Status */}
          <p style={{ fontSize: "12px", color: "#63DBAE", fontWeight: 600, margin: 0 }}>
            {remaining > 0 ? `${remaining} more ${challenge.total === 2 ? "visit" : "visit"} to complete!` : "Completed!"}
          </p>
        </div>

        {/* Challenge Rules */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #F0F0F0", padding: "16px" }}>
          <p style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10", marginBottom: "12px", margin: "0 0 12px 0" }}>
            Challenge Rules
          </p>

          <ul style={{ margin: 0, paddingLeft: "20px", listStyle: "disc" }}>
            {challenge.rules && challenge.rules.length > 0 ? (
              challenge.rules.map((rule, idx) => (
                <li key={idx} style={{ fontSize: "13px", color: "#52525B", lineHeight: 1.5, marginBottom: "8px" }}>
                  {rule}
                </li>
              ))
            ) : (
              <p style={{ fontSize: "13px", color: "#B3B3B4" }}>No rules available</p>
            )}
          </ul>
        </div>

      </div>
    </div>
  );
}

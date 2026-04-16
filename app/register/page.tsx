"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronDown, Phone, Mail } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const isValid = mode === "phone" ? phone.length >= 9 : email.includes("@");

  const handleContinue = () => {
    if (mode === "phone" && phone.length < 9) {
      setError("Please enter a valid mobile number");
      return;
    }
    if (mode === "email" && !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    const id = mode === "phone" ? `+94${phone}` : email;
    router.push(`/otp?type=signup&method=${mode}&id=${encodeURIComponent(id)}`);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#fff" }}>

      {/* Photo hero header */}
      <div className="relative flex flex-col" style={{ height: "252px", flexShrink: 0, borderBottomLeftRadius: "28px", borderBottomRightRadius: "28px", overflow: "hidden" }}>
        <Image
          src="/images/bgsignup.jpg"
          alt=""
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="relative z-10 flex items-center gap-1 mt-12 ml-4"
        >
          <ChevronLeft size={22} color="white" />
          <span style={{ fontSize: "16px", fontWeight: 700, color: "white" }}>Back</span>
        </button>
        {/* Logo + title */}
        <div className="relative z-10 flex flex-col items-center mt-auto pb-5">
          <Image src="/images/logowhite.png" alt="HCM Smiles" width={60} height={60} />
          <h1
            className="text-white font-bold mt-3"
            style={{ fontSize: "20px" }}
          >
            Create Your HCM Smile Account
          </h1>
          <p className="text-white/65 mt-1 text-center px-6" style={{ fontSize: "12px" }}>
            Join the Havelock City Mall loyalty program and start earning rewards
          </p>
        </div>
      </div>

      {/* White card */}
      <div
        className="flex-1 bg-white overflow-y-auto no-scrollbar pb-[192px] px-5 pb-6"
        style={{
          borderTopLeftRadius: "28px",
          borderTopRightRadius: "28px",
          marginTop: "-24px",
          paddingTop: "28px",
        }}
      >
        {/* Mode toggle */}
        <div
          className="flex p-1"
          style={{ background: "#F4F4F5", borderRadius: "14px", marginBottom: "20px", marginTop: "32px" }}
        >
          {(["phone", "email"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(""); }}
              className="flex-1 flex items-center justify-center gap-2 py-[10px] font-medium transition-all duration-200"
              style={{
                borderRadius: "10px",
                fontSize: "14px",
                background: mode === m ? "#fff" : "transparent",
                color: mode === m ? "#9728B8" : "#B3B3B4",
                boxShadow: mode === m ? "0 1px 6px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {m === "phone" ? <Phone size={15} /> : <Mail size={15} />}
              {m === "phone" ? "Mobile Number" : "Email Address"}
            </button>
          ))}
        </div>

        {/* Input */}
        {mode === "phone" ? (
          <div
            className="flex items-center"
            style={{
              border: `1.5px solid ${error ? "#DC2626" : "#D4D4D8"}`,
              borderRadius: "16px",
              height: "52px",
              overflow: "hidden",
            }}
          >
            <div
              className="flex items-center gap-1.5 px-3 h-full flex-shrink-0"
              style={{ background: "#F8F8F8", borderRight: "1px solid #E4E4E7", minWidth: "80px" }}
            >
              <span style={{ fontSize: "17px" }}>🇱🇰</span>
              <span className="font-semibold" style={{ fontSize: "14px", color: "#0E0E10" }}>+94</span>
              <ChevronDown size={11} style={{ color: "#B3B3B4" }} />
            </div>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={9}
              value={phone}
              onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 9)); setError(""); }}
              placeholder="7X XXX XXXX"
              className="flex-1 outline-none px-4"
              style={{ fontSize: "15px", color: "#0E0E10" }}
            />
          </div>
        ) : (
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            placeholder="Enter your email address"
            className="w-full outline-none px-4"
            style={{
              border: `1.5px solid ${error ? "#DC2626" : "#D4D4D8"}`,
              borderRadius: "16px",
              height: "52px",
              fontSize: "15px",
              color: "#0E0E10",
            }}
          />
        )}

        {error && (
          <p className="mt-2" style={{ fontSize: "12px", color: "#DC2626" }}>
            {error}
          </p>
        )}

        <p className="mt-2.5" style={{ fontSize: "12px", color: "#B3B3B4" }}>
          {mode === "phone"
            ? "We'll send a 6-digit OTP to verify your number"
            : "We'll send a 6-digit OTP to verify your email"}
        </p>

        {/* CTA */}
        <button
          onClick={handleContinue}
          disabled={!isValid}
          className="w-full font-medium mt-5"
          style={{
            height: "48px",
            borderRadius: "12px",
            fontSize: "15px",
            background: isValid ? "#9728B8" : "#E4E4E7",
            color: isValid ? "white" : "#B3B3B4",
            cursor: isValid ? "pointer" : "not-allowed",
            transition: "all 0.15s",
          }}
        >
          Continue With {mode === "phone" ? "Phone Number" : "Email"}
        </button>

        {/* What you get — minimal, no gradient */}
        <div
          className="mt-5 p-4"
          style={{
            borderRadius: "14px",
            background: "#FAFAFA",
            border: "1px solid #EBEBEB",
          }}
        >
          <p
            className="font-semibold uppercase tracking-widest mb-3"
            style={{ fontSize: "10px", color: "#B3B3B4" }}
          >
            Member benefits
          </p>
          <div className="flex flex-col gap-3">
            {[
              "🪙  Earn Smile Points on every purchase",
              "🎁  Exclusive deals & personalised offers",
              "🅿️  Pay for parking with Smile Points",
            ].map((item) => (
              <p key={item} style={{ fontSize: "13px", color: "#52525B" }}>
                {item}
              </p>
            ))}
          </div>
        </div>

        <p className="text-center mt-5" style={{ fontSize: "14px", color: "#52525B" }}>
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="font-medium"
            style={{ color: "#9728B8" }}
          >
            Log In
          </button>
        </p>

        <p className="text-center mt-3" style={{ fontSize: "11px", color: "#B3B3B4" }}>
          By continuing you agree to our{" "}
          <span style={{ color: "#9728B8" }}>Terms</span> &{" "}
          <span style={{ color: "#9728B8" }}>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}

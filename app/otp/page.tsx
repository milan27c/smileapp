"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ShieldCheck, RefreshCw } from "lucide-react";



function OtpContent() {
  const router = useRouter();
  const params = useSearchParams();
  const type = params.get("type") || "login";
  const method = params.get("method") || "phone";
  const id = params.get("id") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(59);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const next = [...otp];
        next[index] = "";
        setOtp(next);
      } else if (index > 0) {
        const next = [...otp];
        next[index - 1] = "";
        setOtp(next);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = ["", "", "", "", "", ""];
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    e.preventDefault();
  };

  const isComplete = otp.every((d) => d !== "");

  const handleVerify = () => {
    if (!isComplete) return;
    setIsVerifying(true);
    setTimeout(() => {
      if (type === "login") {
        router.push("/home");
      } else {
        router.push(`/signup?method=${method}&id=${encodeURIComponent(id)}`);
      }
    }, 900);
  };

  const handleResend = () => {
    if (seconds > 0) return;
    setSeconds(59);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const maskedId =
    method === "phone"
      ? id.replace(/(\+\d{3})\d+(\d{4})/, "$1 ****$2")
      : id.replace(/(.{2}).*(@.*)/, "$1****$2");

  return (
    <div className="flex flex-col h-full bg-white">

      {/* Top nav */}
      <div
        className="relative flex items-center px-5 flex-shrink-0"
        style={{
          paddingTop: "12px",
          paddingBottom: "8px",
          background: "#fff",
          borderBottom: "1px solid #F0F0F0",
          minHeight: "56px",
        }}
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1"
        >
          <ChevronLeft size={22} style={{ color: "#0E0E10" }} />
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>Verification</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col px-5">
        {/* Icon */}
        <div className="flex justify-center mt-8 mb-7">
          <div
            className="flex items-center justify-center"
            style={{
              width: "88px",
              height: "88px",
              borderRadius: "28px",
              background: "#9728B8",
              boxShadow: "0 8px 28px rgba(151,40,184,0.25)",
              animation: "fade-up 0.45s ease-out forwards",
            }}
          >
            <ShieldCheck size={44} color="white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text */}
        <div
          className="text-center mb-8"
          style={{ animation: "fade-up 0.45s ease-out 0.1s both" }}
        >
          <h1
            className="font-bold mb-2"
            style={{ fontSize: "26px", color: "#0E0E10" }}
          >
            Enter verification code
          </h1>
          <p style={{ fontSize: "14px", color: "#52525B", lineHeight: 1.5 }}>
            We sent a 6-digit code to{"\n"}
          </p>
          <p
            className="font-semibold"
            style={{ fontSize: "14px", color: "#9728B8" }}
          >
            {maskedId}
          </p>
        </div>

        {/* OTP Boxes */}
        <div
          className="flex gap-3 justify-center mb-6"
          style={{ animation: "fade-up 0.45s ease-out 0.2s both" }}
          onPaste={handlePaste}
        >
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="otp-box font-bold outline-none"
              style={{
                width: "50px",
                height: "58px",
                borderRadius: "14px",
                fontSize: "24px",
                color: "#0E0E10",
                border: digit
                  ? "2px solid #9728B8"
                  : "2px solid #E4E4E7",
                background: digit ? "rgba(152,40,184,0.05)" : "#FAFAFA",
                transition: "border-color 0.15s, background 0.15s",
                boxShadow: digit ? "0 0 0 4px rgba(152,40,184,0.08)" : "none",
              }}
            />
          ))}
        </div>

        {/* Resend */}
        <div
          className="flex items-center justify-center gap-2 mb-8"
          style={{ animation: "fade-in 0.4s ease-out 0.4s both" }}
        >
          {seconds > 0 ? (
            <p style={{ fontSize: "14px", color: "#B3B3B4" }}>
              Resend OTP in{" "}
              <span className="font-bold" style={{ color: "#52525B" }}>
                00:{String(seconds).padStart(2, "0")}
              </span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="flex items-center gap-2 font-medium"
              style={{ fontSize: "14px", color: "#9728B8" }}
            >
              <RefreshCw size={15} />
              Resend OTP
            </button>
          )}
        </div>

        {/* Verify button */}
        <button
          onClick={handleVerify}
          disabled={!isComplete || isVerifying}
          className="w-full font-medium flex items-center justify-center gap-2"
          style={{
            height: "48px",
            borderRadius: "12px",
            fontSize: "15px",
            background: isComplete ? "#9728B8" : "#E4E4E7",
            color: isComplete ? "white" : "#B3B3B4",
            cursor: isComplete && !isVerifying ? "pointer" : "not-allowed",
            transition: "all 0.15s",
            animation: "fade-up 0.4s ease-out 0.3s both",
          }}
        >
          {isVerifying ? (
            <>
              <div
                className="rounded-full border-2 border-white/40 border-t-white"
                style={{
                  width: "18px",
                  height: "18px",
                  animation: "spin 0.7s linear infinite",
                }}
              />
              Verifying…
            </>
          ) : (
            "Verify Code"
          )}
        </button>

        {/* Helper */}
        <p className="text-center mt-5" style={{ fontSize: "12px", color: "#B3B3B4" }}>
          Didn't get a code? Check your{" "}
          {method === "phone" ? "messages" : "inbox (& spam folder)"}
        </p>
      </div>
    </div>
  );
}

export default function OtpPage() {
  return (
    <Suspense fallback={<div className="h-full bg-white" />}>
      <OtpContent />
    </Suspense>
  );
}

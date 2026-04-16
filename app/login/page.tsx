"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Phone, Mail, ChevronDown } from "lucide-react";

function FacebookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#111">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (mode === "phone" && phone.length < 9) {
      setError("Please enter a valid mobile number");
      return false;
    }
    if (mode === "email" && !email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    setError("");
    return true;
  };

  const isValid = mode === "phone" ? phone.length >= 9 : email.includes("@");

  const handleLogin = () => {
    if (!validate()) return;
    const id = mode === "phone" ? `+94${phone}` : email;
    router.push(`/otp?type=login&method=${mode}&id=${encodeURIComponent(id)}`);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#fff" }}>

      {/* Photo hero header */}
      <div
        className="relative flex flex-col items-center justify-end"
        style={{ height: "200px", flexShrink: 0, borderBottomLeftRadius: "28px", borderBottomRightRadius: "28px", overflow: "hidden" }}
      >
        <Image
          src="/images/bgsignup.jpg"
          alt=""
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        {/* Logo + title */}
        <div className="relative z-10 flex flex-col items-center pb-6">
          <Image
            src="/images/logowhite.png"
            alt="HCM Smiles"
            width={80}
            height={80}
            priority
          />
          <h1
            className="text-white font-bold mt-3"
            style={{ fontSize: "22px", letterSpacing: "0.5px" }}
          >
            Welcome Back
          </h1>
          <p className="text-white/70 mt-1" style={{ fontSize: "13px" }}>
            Sign in to your Smiles account
          </p>
        </div>
      </div>

      {/* White content sheet */}
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
              {m === "phone" ? "Mobile" : "Email"}
            </button>
          ))}
        </div>

        {/* Input */}
        {mode === "phone" ? (
          <div
            className="flex items-center mb-1"
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
            className="w-full outline-none px-4 mb-1"
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
          <p className="mt-1 mb-2" style={{ fontSize: "12px", color: "#DC2626" }}>
            {error}
          </p>
        )}

        {/* Primary CTA */}
        <button
          onClick={handleLogin}
          disabled={!isValid}
          className="w-full font-medium mt-4"
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
          {mode === "phone" ? "Continue with Mobile" : "Continue with Email"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px" style={{ background: "#EBEBEB" }} />
          <span style={{ fontSize: "12px", color: "#B3B3B4" }}>or continue with</span>
          <div className="flex-1 h-px" style={{ background: "#EBEBEB" }} />
        </div>

        {/* Social row */}
        <div className="flex gap-3">
          {[
            { icon: <FacebookIcon />, label: "Facebook" },
            { icon: <GoogleIcon />, label: "Google" },
            { icon: <AppleIcon />, label: "Apple" },
          ].map(({ icon, label }) => (
            <button
              key={label}
              onClick={() => router.push("/home")}
              className="flex-1 flex flex-col items-center justify-center gap-1.5 py-3"
              style={{
                border: "1.5px solid #E4E4E7",
                borderRadius: "12px",
              }}
              aria-label={`Continue with ${label}`}
            >
              {icon}
              <span style={{ fontSize: "10px", color: "#52525B", fontWeight: 600 }}>
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* New to Smiles — inline text */}
        <p className="text-center mt-6" style={{ fontSize: "14px", color: "#52525B" }}>
          New to Smiles?{" "}
          <button
            onClick={() => router.push("/register")}
            className="font-medium"
            style={{ color: "#9728B8" }}
          >
            Create Account
          </button>
        </p>

        <p className="text-center mt-3" style={{ fontSize: "11px", color: "#B3B3B4" }}>
          By continuing you agree to our{" "}
          <span style={{ color: "#9728B8" }}>Terms</span>
          {" & "}
          <span style={{ color: "#9728B8" }}>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}

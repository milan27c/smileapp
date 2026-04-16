"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronDown } from "lucide-react";

function StatusBar() {
  return (
    <div
      className="absolute top-0 left-0 right-0 z-40 flex justify-between items-center px-5"
      style={{ paddingTop: "14px", pointerEvents: "none" }}
    >
      <span style={{ fontSize: "13px", fontWeight: 700, color: "#0E0E10" }}>9:41</span>
      <div style={{ width: "134px" }} />
      <div className="flex items-center gap-[5px]">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="#0E0E10">
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.5" y="4.5" width="3" height="6.5" rx="1" />
          <rect x="9" y="2" width="3" height="9" rx="1" />
          <rect x="13.5" y="0" width="2.5" height="11" rx="1" />
        </svg>
        <svg width="24" height="11" viewBox="0 0 24 11" fill="none">
          <rect x="0.5" y="0.5" width="20" height="10" rx="3" stroke="#0E0E10" strokeOpacity="0.6" />
          <rect x="2" y="2" width="15" height="7" rx="1.5" fill="#0E0E10" />
          <path d="M22 3.5V7.5C22.8 7.5 23.5 6.83 23.5 6C23.5 5.17 22.8 4.5 22 3.5Z" fill="#0E0E10" fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <label
        className="block font-semibold mb-1.5"
        style={{ fontSize: "13px", color: "#52525B" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  border: "1.5px solid #D4D4D8",
  borderRadius: "16px",
  height: "48px",
  fontSize: "15px",
  color: "#0E0E10",
  width: "100%",
  padding: "0 14px",
  outline: "none",
  background: "#fff",
};

function SignupContent() {
  const router = useRouter();
  const params = useSearchParams();
  const method = params.get("method") || "phone";
  const id = params.get("id") || "";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(method === "email" ? id : "");
  const [phone, setPhone] = useState(method === "phone" ? id.replace("+94", "") : "");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [isResident, setIsResident] = useState(false);

  const isValid = firstName.length > 0 && lastName.length > 0;

  return (
    <div className="flex flex-col h-full bg-white">

      {/* Nav */}
      <div className="flex items-center px-5 pt-16 pb-3">
        <button onClick={() => router.back()} className="flex items-center gap-1">
          <ChevronLeft size={20} style={{ color: "#9728B8" }} />
          <span style={{ fontSize: "15px", fontWeight: 600, color: "#9728B8" }}>Back</span>
        </button>
      </div>

      {/* Scrollable form */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-[192px] px-5 pb-8">
        {/* Step indicator — minimal dots */}
        <div className="flex items-center gap-2 mb-5">
          {[true, true, false].map((done, i) => (
            <div
              key={i}
              style={{
                width: done ? "24px" : "8px",
                height: "6px",
                borderRadius: "9999px",
                background: done ? "#9728B8" : "#E4E4E7",
                transition: "width 0.2s",
              }}
            />
          ))}
        </div>

        <h1
          className="font-bold mb-1"
          style={{ fontSize: "24px", color: "#0E0E10" }}
        >
          Your Details
        </h1>
        <p className="mb-6" style={{ fontSize: "14px", color: "#52525B" }}>
          Tell us a bit about yourself to finish setting up
        </p>

        {/* First Name */}
        <Field label="First Name">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Kasun"
            style={inputStyle}
          />
        </Field>

        {/* Last Name */}
        <Field label="Last Name">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Silva"
            style={inputStyle}
          />
        </Field>

        {/* Email or Phone — the one not used for signup */}
        {method === "phone" ? (
          <Field label="Email Address">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="kasun@example.com"
              style={inputStyle}
            />
          </Field>
        ) : (
          <Field label="Mobile Number">
            <div
              className="flex items-center"
              style={{
                border: "1.5px solid #D4D4D8",
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
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))}
                placeholder="7X XXX XXXX"
                className="flex-1 outline-none px-4"
                style={{ fontSize: "15px", color: "#0E0E10" }}
              />
            </div>
          </Field>
        )}

        {/* Date of Birth */}
        <Field label="Date of Birth">
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            style={{
              ...inputStyle,
              color: dob ? "#0E0E10" : "#B3B3B4",
            }}
          />
        </Field>

        {/* Gender */}
        <Field label="Gender">
          <div className="flex gap-3">
            {(["male", "female"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className="flex-1 font-medium"
                style={{
                  height: "52px",
                  borderRadius: "12px",
                  fontSize: "15px",
                  border: `2px solid ${gender === g ? "#9728B8" : "#D4D4D8"}`,
                  background: gender === g ? "#9728B8" : "#fff",
                  color: gender === g ? "white" : "#52525B",
                  transition: "all 0.15s",
                }}
              >
                {g === "male" ? "♂ Male" : "♀ Female"}
              </button>
            ))}
          </div>
        </Field>

        {/* Havelock Residence Member */}
        <div className="mb-6">
          <label
            className="block font-semibold mb-1.5"
            style={{ fontSize: "13px", color: "#52525B" }}
          >
            Membership
          </label>
          <button
            onClick={() => setIsResident(!isResident)}
            className="w-full flex items-start gap-3 text-left"
            style={{
              padding: "14px",
              borderRadius: "14px",
              border: `1.5px solid ${isResident ? "#9728B8" : "#D4D4D8"}`,
              background: "#fff",
              transition: "border-color 0.15s",
            }}
          >
            {/* Checkbox */}
            <div
              className="flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "5px",
                border: `2px solid ${isResident ? "#9728B8" : "#D4D4D8"}`,
                background: isResident ? "#9728B8" : "white",
                transition: "all 0.15s",
              }}
            >
              {isResident && (
                <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                  <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <div>
              <p className="font-semibold" style={{ fontSize: "14px", color: "#0E0E10" }}>
                Are you a Havelock Residence member?
              </p>
              <p className="mt-0.5" style={{ fontSize: "12px", color: "#B3B3B4" }}>
                Get exclusive resident benefits & 2× bonus points
              </p>
            </div>
          </button>
        </div>

        {/* CTA */}
        <button
          onClick={() => { if (isValid) router.push("/home"); }}
          disabled={!isValid}
          className="w-full font-medium"
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
          Create My Account
        </button>

        <p className="text-center mt-3" style={{ fontSize: "11px", color: "#B3B3B4" }}>
          By creating an account you agree to our{" "}
          <span style={{ color: "#9728B8" }}>Terms</span> &{" "}
          <span style={{ color: "#9728B8" }}>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="h-full bg-white" />}>
      <SignupContent />
    </Suspense>
  );
}

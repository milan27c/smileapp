"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.push("/login"), 2600);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="relative flex flex-col items-center justify-center h-full overflow-hidden">
      {/* Background photo */}
      <Image
        src="/images/bgsignup.jpg"
        alt=""
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.52)" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo zoom-in */}
        <div
          style={{
            animation: "zoom-in 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
          }}
        >
          <Image
            src="/images/logowhite.png"
            alt="HCM Smiles"
            width={136}
            height={136}
            priority
          />
        </div>

        {/* App name */}
        <p
          className="text-white font-bold mt-5 tracking-widest uppercase"
          style={{
            fontSize: "22px",
            letterSpacing: "9px",
            animation: "fade-in 0.5s ease-out 0.65s both",
          }}
        >
          smiles
        </p>

        {/* Tagline */}
        <p
          className="text-white/60 mt-1.5"
          style={{
            fontSize: "13px",
            animation: "fade-in 0.5s ease-out 0.85s both",
          }}
        >
          Havelock City Mall
        </p>
      </div>

      {/* Loading dots */}
      <div
        className="absolute bottom-14 flex items-center gap-2"
        style={{ animation: "fade-in 0.5s ease-out 1.2s both" }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: "7px",
              height: "7px",
              background: "rgba(255,255,255,0.5)",
              animation: `pulse-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";



export default function ScannerPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanned, setScanned] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          scanQRCode();
        }
      } catch (err) {
        setError("Unable to access camera. Please check permissions.");
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  const scanQRCode = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scan = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );

        // Simple QR detection - check for patterns
        // In production, use jsQR library
        const data = imageData.data;
        let darkCount = 0;
        for (let i = 0; i < data.length; i += 4) {
          const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
          if (brightness < 128) darkCount++;
        }

        // If enough dark pixels detected, trigger success
        if (darkCount > imageData.data.length / 8) {
          setScanned(true);
          setTimeout(() => {
            router.push("/home");
          }, 1500);
        }
      }

      if (!scanned) {
        requestAnimationFrame(scan);
      }
    };

    scan();
  };

  return (
    <div className="flex flex-col h-full bg-black">
      <StatusBar light={true} />

      {/* Top nav */}
      <div
        className="relative flex items-center px-5 flex-shrink-0 z-10"
        style={{
          paddingTop: "12px",
          paddingBottom: "8px",
          minHeight: "56px",
        }}
      >
        <button onClick={() => router.back()} className="flex items-center gap-1">
          <ChevronLeft size={22} style={{ color: "white" }} />
          <span style={{ fontSize: "16px", fontWeight: 700, color: "white" }}>Scanner</span>
        </button>
      </div>

      {error && (
        <div className="px-5 py-3 mx-5 rounded-12 bg-red-500/20 border border-red-500/40">
          <p style={{ fontSize: "13px", color: "#fff" }}>{error}</p>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center px-5 relative">
        {/* Hidden canvas for QR detection */}
        <canvas ref={canvasRef} style={{ display: "none" }} />

        {/* Camera preview area */}
        <div
          className="relative"
          style={{
            width: "280px",
            height: "280px",
            background: "#1a1a1a",
            borderRadius: "16px",
            border: "2px solid rgba(255,255,255,0.3)",
            overflow: "hidden",
            marginBottom: "40px",
          }}
        >
          {/* Live video stream */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />

          {/* QR scanner frame overlay */}
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: "none" }}
            viewBox="0 0 280 280"
          >
            {/* Top left corner */}
            <rect x="20" y="20" width="40" height="4" fill="#9728B8" />
            <rect x="20" y="20" width="4" height="40" fill="#9728B8" />

            {/* Top right corner */}
            <rect x="216" y="20" width="40" height="4" fill="#9728B8" />
            <rect x="256" y="20" width="4" height="40" fill="#9728B8" />

            {/* Bottom left corner */}
            <rect x="20" y="236" width="40" height="4" fill="#9728B8" />
            <rect x="20" y="236" width="4" height="40" fill="#9728B8" />

            {/* Bottom right corner */}
            <rect x="216" y="236" width="40" height="4" fill="#9728B8" />
            <rect x="256" y="236" width="4" height="40" fill="#9728B8" />

            {/* Scanning animation - pulsing line */}
            {!scanned && (
              <line
                x1="40"
                y1="140"
                x2="240"
                y2="140"
                stroke="#9728B8"
                strokeWidth="2"
                opacity="0.6"
                style={{
                  animation: "pulse 2s infinite",
                }}
              />
            )}
          </svg>

          {scanned && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="text-center">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9728B8"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <p className="text-white font-semibold mt-2" style={{ fontSize: "14px" }}>
                  QR Scanned!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center mb-8">
          <p className="text-white font-semibold mb-2" style={{ fontSize: "15px" }}>
            {scanned ? "Scan Successful" : "Point at QR Code"}
          </p>
          <p className="text-white/70" style={{ fontSize: "12px", lineHeight: 1.5 }}>
            {scanned
              ? "Redirecting to home..."
              : "Position the QR code within the frame to scan and earn points"}
          </p>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { y: 40; opacity: 0.3; }
            50% { y: 200; opacity: 0.8; }
          }
        `}</style>
      </div>
    </div>
  );
}

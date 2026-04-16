import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HCM Smiles",
  description: "Havelock City Mall Loyalty App",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HCM Smiles",
  },
  manifest: "/manifest.json",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="theme-color" content="#9728B8" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="HCM Smiles" />
      </head>
      <body
        className="flex items-center justify-center lg:p-3 lg:bg-gradient-to-br lg:from-[#1C1C1E] lg:to-[#2C2C2E]"
        style={{
          background: "linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)",
          padding: 0,
          minHeight: "100vh",
          margin: 0,
          overflow: "hidden",
        }}
      >
        {/* Mobile View - Full screen on mobile devices */}
        <div
          className="w-screen h-screen lg:hidden"
          style={{
            background: "#000",
            overflow: "hidden",
            padding: 0,
            margin: 0,
            display: "block",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          {children}
        </div>

        {/* iPhone 16 Pro Device Frame — Hidden on mobile, shown on desktop */}
        <div
          className="relative flex-shrink-0 hidden lg:flex"
          style={{
            width: "425px",
            maxHeight: "calc(100vh - 24px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            transform: "scale(0.85)",
            transformOrigin: "center",
          }}
        >
          {/* Device Body — Titanium */}
          <div
            className="relative rounded-[56px]"
            style={{
              background:
                "linear-gradient(145deg, #9A9A9E 0%, #6C6C70 20%, #3A3A3C 55%, #6C6C70 80%, #9A9A9E 100%)",
              boxShadow:
                "0 60px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.12) inset, 0 2px 0 rgba(255,255,255,0.18) inset",
              padding: "12px",
            }}
          >
            {/* Inner ring highlight */}
            <div
              className="absolute pointer-events-none"
              style={{
                inset: "11px",
                borderRadius: "42px",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.4) inset",
              }}
            />

            {/* Screen */}
            <div
              className="relative overflow-hidden"
              style={{
                width: "393px",
                height: "852px",
                borderRadius: "46px",
                background: "#000",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.8) inset",
              }}
            >
              {/* Dynamic Island */}
              <div
                className="absolute z-50 pointer-events-none"
                style={{
                  top: "12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "126px",
                  height: "37px",
                  background: "#000",
                  borderRadius: "9999px",
                }}
              />

                  {/* Screen Content */}
              <div className="relative w-full h-full overflow-hidden">
                {children}
              </div>
            </div>
          </div>

          {/* Action Button (top-left side) */}
          <div
            className="absolute"
            style={{
              left: "-4px",
              top: "68px",
              width: "4px",
              height: "32px",
              background: "linear-gradient(to right, #2C2C2E, #5C5C5E)",
              borderRadius: "2px 0 0 2px",
              boxShadow: "-2px 0 4px rgba(0,0,0,0.5)",
            }}
          />

          {/* Volume Up (left) */}
          <div
            className="absolute"
            style={{
              left: "-4px",
              top: "118px",
              width: "4px",
              height: "40px",
              background: "linear-gradient(to right, #2C2C2E, #5C5C5E)",
              borderRadius: "2px 0 0 2px",
              boxShadow: "-2px 0 4px rgba(0,0,0,0.5)",
            }}
          />

          {/* Volume Down (left) */}
          <div
            className="absolute"
            style={{
              left: "-4px",
              top: "172px",
              width: "4px",
              height: "64px",
              background: "linear-gradient(to right, #2C2C2E, #5C5C5E)",
              borderRadius: "2px 0 0 2px",
              boxShadow: "-2px 0 4px rgba(0,0,0,0.5)",
            }}
          />

          {/* Power Button (right) */}
          <div
            className="absolute"
            style={{
              right: "-4px",
              top: "188px",
              width: "4px",
              height: "80px",
              background: "linear-gradient(to left, #2C2C2E, #5C5C5E)",
              borderRadius: "0 2px 2px 0",
              boxShadow: "2px 0 4px rgba(0,0,0,0.5)",
            }}
          />

          {/* Device label */}
          <p
            className="text-center text-xs font-medium"
            style={{
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "2px",
              marginTop: "8px",
              marginBottom: 0,
            }}
          >
            HCM SMILES
          </p>
        </div>
      </body>
    </html>
  );
}

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
    <html lang="en" className="h-full w-full">
      <head>
        <meta name="theme-color" content="#9728B8" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="HCM Smiles" />
      </head>
      <body
        className="w-full h-screen m-0 p-0 overflow-hidden flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)",
          margin: 0,
          padding: 0,
        }}
      >
        {/* App Container - Full screen on mobile, mobile-sized and fitted on desktop */}
        <div
          className="w-full h-screen lg:w-[393px] lg:h-auto lg:my-12 lg:rounded-3xl flex flex-col"
          style={{
            background: "#000",
            overflow: "hidden",
            margin: 0,
            padding: 0,
            maxHeight: "100vh",
            height: "100vh",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}

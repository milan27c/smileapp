export default function StatusBar({ light = false }: { light?: boolean }) {
  const color = light ? "#fff" : "#0E0E10";
  return (
    <div
      className="absolute top-0 left-0 right-0 z-40 hidden lg:block"
      style={{ height: "54px", pointerEvents: "none" }}
    >
      {/* Time — left */}
      <span
        style={{
          position: "absolute",
          left: "20px",
          top: "14px",
          fontSize: "15px",
          fontWeight: 600,
          color,
          letterSpacing: "-0.3px",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        }}
      >
        9:41
      </span>

      {/* Dynamic Island pill — center (hidden on desktop) */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "10px",
          transform: "translateX(-50%)",
          width: "120px",
          height: "34px",
          borderRadius: "20px",
          background: "#000",
          display: "none",
        }}
      />

      {/* Icons — right */}
      <div
        className="flex items-center gap-[6px]"
        style={{ position: "absolute", right: "18px", top: "17px" }}
      >
        {/* Cellular signal */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill={color}>
          <rect x="0" y="7" width="3" height="5" rx="1" />
          <rect x="4.5" y="4.5" width="3" height="7.5" rx="1" />
          <rect x="9" y="2" width="3" height="10" rx="1" />
          <rect x="13.5" y="0" width="3" height="12" rx="1" />
        </svg>

        {/* Wi-Fi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" fill={color} />
          <path d="M3.3 7.1A6.5 6.5 0 0 1 8 5a6.5 6.5 0 0 1 4.7 2.1" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M0.7 4.4A10 10 0 0 1 8 1.5a10 10 0 0 1 7.3 2.9" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>

        {/* Battery */}
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect x="0.75" y="0.75" width="21.5" height="10.5" rx="3.25" stroke={color} strokeWidth="1.5" />
            <rect x="2.5" y="2.5" width="16" height="7" rx="2" fill={color} />
            <path d="M23.5 4v4a2 2 0 0 0 0-4Z" fill={color} fillOpacity="0.45" />
          </svg>
        </div>
      </div>
    </div>
  );
}

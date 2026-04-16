"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Home as HomeIcon,
  Gift,
  Compass,
  Car,
  User,
  ChevronRight,
  UserPen,
  Users,
  Ticket,
  CarFront,
  UserPlus,
  Settings,
  HeadphonesIcon,
  LogOut,
  Camera,
} from "lucide-react";

type NavItem = {
  icon: React.ElementType;
  label: string;
  route?: string;
};

const NAV_ITEMS: NavItem[] = [
  { icon: UserPen, label: "Edit Profile", route: "/profile/edit" },
  { icon: Users, label: "Family", route: "/family" },
  { icon: Ticket, label: "My Gift Vouchers", route: "/rewards" },
  { icon: CarFront, label: "Vehicle Info", route: "/parking" },
  { icon: UserPlus, label: "Invite Friends" },
  { icon: Settings, label: "Settings" },
  { icon: HeadphonesIcon, label: "Contact Support" },
];

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoSrc, setPhotoSrc] = useState<string>("https://randomuser.me/api/portraits/men/32.jpg");
  const [displayName, setDisplayName] = useState("Ashan Perera");
  const [displayEmail, setDisplayEmail] = useState("ashan.perera@gmail.com");
  const [showInviteDrawer, setShowInviteDrawer] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("smileapp_profile");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.photo) setPhotoSrc(data.photo);
        if (data.firstName || data.lastName) {
          setDisplayName(`${data.firstName ?? "Ashan"} ${data.lastName ?? "Perera"}`.trim());
        }
        if (data.email) setDisplayEmail(data.email);
      }
    } catch {}
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setPhotoSrc(dataUrl);
      try {
        const saved = localStorage.getItem("smileapp_profile");
        const data = saved ? JSON.parse(saved) : {};
        localStorage.setItem("smileapp_profile", JSON.stringify({ ...data, photo: dataUrl }));
      } catch {}
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7", fontFamily: "'Inter', sans-serif" }}>

      {/* App Bar */}
      <div
        className="relative flex items-center px-5 flex-shrink-0"
        style={{
          paddingTop: "12px",
          paddingBottom: "8px",
          minHeight: "56px",
          borderBottom: "1px solid #F0F0F0",
          background: "#fff",
        }}
      >
        <h1 className="font-bold" style={{ fontSize: "16px", color: "#0E0E10" }}>Profile</h1>
        <div style={{ width: "40px" }} />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: "0" }}>

        {/* Profile Card */}
        <div className="px-5 pt-5 pb-4">
          <div
            className="flex items-center gap-4 p-4"
            style={{
              background: "#FAFAFA",
              borderRadius: "20px",
              border: "1px solid #F0F0F0",
            }}
          >
            {/* Avatar with photo upload */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "9999px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                  position: "relative",
                }}
              >
                <Image
                  src={photoSrc}
                  alt="Profile"
                  fill
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  position: "absolute",
                  bottom: "1px",
                  right: "1px",
                  width: "24px",
                  height: "24px",
                  borderRadius: "9999px",
                  background: "#9728B8",
                  border: "2px solid #fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Camera size={11} style={{ color: "#fff" }} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: "none" }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: "17px", fontWeight: 700, color: "#0E0E10", marginBottom: "2px" }}>
                {displayName}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#52525B",
                  marginBottom: "8px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {displayEmail}
              </p>

              {/* Silver Member Badge — same as home page wallet */}
              <div
                className="flex items-center gap-1.5 px-2.5 py-1"
                style={{
                  display: "inline-flex",
                  background: "linear-gradient(135deg, #6C6C70 0%, #3A3A3C 100%)",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    background: "linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #A8A8A8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.2))",
                  }}
                >
                  ★
                </span>
                <span className="font-bold text-white" style={{ fontSize: "10px" }}>
                  SILVER
                </span>
              </div>
            </div>

            {/* Edit shortcut */}
            <button
              onClick={() => router.push("/profile/edit")}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "9999px",
                background: "#F1F1F1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <UserPen size={17} style={{ color: "#0E0E10" }} />
            </button>
          </div>
        </div>

        {/* Points Summary */}
        <div className="px-5 pb-5">
          <div
            style={{
              background: "linear-gradient(135deg, #9728B8 0%, #F002AF 100%)",
              borderRadius: "16px",
              padding: "16px 0",
              display: "flex",
              alignItems: "center",
            }}
          >
            {[
              { label: "Smile Points", value: "4,250" },
              { label: "Rewards Used", value: "12" },
              { label: "Member Since", value: "2023" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.25)" : "none",
                  padding: "0 8px",
                }}
              >
                <span style={{ fontSize: "20px", fontWeight: 700, color: "#fff" }}>{stat.value}</span>
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.75)", marginTop: "3px" }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation List */}
        <div className="px-5">
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              border: "1px solid #F0F0F0",
              overflow: "hidden",
            }}
          >
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item.label}
                onClick={() => {
                  if (item.label === "Invite Friends") {
                    setShowInviteDrawer(true);
                  } else if (item.label === "Settings") {
                    router.push("/settings");
                  } else if (item.label === "Contact Support") {
                    router.push("/contact-support");
                  } else if (item.route) {
                    router.push(item.route);
                  }
                }}
                className="w-full flex items-center gap-3 px-4"
                style={{
                  height: "56px",
                  borderBottom: i < NAV_ITEMS.length - 1 ? "1px solid #F5F5F5" : "none",
                  background: "none",
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
              >
                {/* Icon — black on light gray */}
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "10px",
                    background: "#F1F1F1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <item.icon size={17} style={{ color: "#0E0E10" }} />
                </div>

                <span
                  className="flex-1 text-left"
                  style={{ fontSize: "14px", fontWeight: 500, color: "#0E0E10" }}
                >
                  {item.label}
                </span>

                <ChevronRight size={17} style={{ color: "#B3B3B4" }} />
              </button>
            ))}
          </div>
        </div>

        {/* Log Out — black outline */}
        <div className="px-5 pt-4 pb-2">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center gap-3 px-4"
            style={{
              height: "52px",
              background: "transparent",
              borderRadius: "12px",
              border: "1.5px solid #0E0E10",
              cursor: "pointer",
            }}
          >
            <LogOut size={18} style={{ color: "#0E0E10" }} />
            <span style={{ fontSize: "14px", fontWeight: 500, color: "#0E0E10", flex: 1, textAlign: "left" }}>
              Log Out
            </span>
          </button>
        </div>

        {/* Version */}
        <p className="text-center pb-4" style={{ fontSize: "11px", color: "#B3B3B4", marginTop: "12px" }}>
          HCM Smiles v1.0.0
        </p>
      </div>

      {/* Bottom Navigation */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center"
        style={{
          height: "72px",
          background: "#fff",
          borderTop: "1px solid #F0F0F0",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
          zIndex: 10,
        }}
      >
        {[
          { icon: HomeIcon, label: "Home", active: false },
          { icon: Gift, label: "Rewards", active: false },
          { icon: Compass, label: "Explore", active: false },
          { icon: Car, label: "Parking", active: false },
          { icon: User, label: "Profile", active: true },
        ].map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            onClick={() => {
              if (label === "Home") router.push("/home");
              if (label === "Rewards") router.push("/rewards");
              if (label === "Explore") router.push("/explore");
              if (label === "Parking") router.push("/parking");
            }}
            className="flex-1 flex flex-col items-center justify-center gap-1"
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: "36px",
                height: "28px",
                borderRadius: "9999px",
                background: active ? "rgba(151,40,184,0.12)" : "transparent",
                transition: "background 0.2s",
              }}
            >
              <Icon
                size={20}
                style={{ color: active ? "#9728B8" : "#B3B3B4" }}
                strokeWidth={active ? 2.5 : 1.75}
              />
            </div>
            <span
              className="font-semibold"
              style={{ fontSize: "10px", color: active ? "#9728B8" : "#B3B3B4" }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Invite Friends Drawer Overlay */}
      {showInviteDrawer && (
        <div
          className="absolute inset-0 z-50"
          style={{ background: "rgba(0,0,0,0.45)" }}
          onClick={() => setShowInviteDrawer(false)}
        />
      )}

      {/* Invite Friends Drawer */}
      <div
        className="absolute bottom-0 left-0 right-0 z-50"
        style={{
          background: "#fff",
          borderRadius: "24px 24px 0 0",
          padding: "0 20px 28px",
          boxShadow: "0 -8px 32px rgba(0,0,0,0.15)",
          transform: showInviteDrawer ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.32s cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-4">
          <div style={{ width: "40px", height: "4px", borderRadius: "9999px", background: "#D4D4D8" }} />
        </div>

        {/* Header */}
        <div className="mb-6">
          <span style={{ fontSize: "17px", fontWeight: 700, color: "#0E0E10" }}>Invite Friends</span>
          <p style={{ fontSize: "13px", color: "#52525B", marginTop: "4px" }}>Share the Smile App with friends and earn rewards together</p>
        </div>

        {/* App Link */}
        <div style={{ background: "#F5F5F7", borderRadius: "12px", padding: "14px 16px", marginBottom: "16px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, color: "#52525B", marginBottom: "8px", textTransform: "uppercase" }}>
            Download Link
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value="https://smileapp.hcm/download"
              readOnly
              style={{
                flex: 1,
                height: "40px",
                borderRadius: "8px",
                border: "1px solid #D4D4D8",
                background: "#fff",
                paddingLeft: "12px",
                fontSize: "13px",
                color: "#0E0E10",
              }}
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText("https://smileapp.hcm/download");
              }}
              style={{
                height: "40px",
                paddingLeft: "16px",
                paddingRight: "16px",
                borderRadius: "8px",
                background: "#9728B8",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              Copy
            </button>
          </div>
        </div>

        {/* Social Share */}
        <div className="mb-6">
          <p style={{ fontSize: "11px", fontWeight: 600, color: "#52525B", marginBottom: "12px", textTransform: "uppercase" }}>
            Share on Social Media
          </p>
          <div className="flex gap-3">
            {[
              { name: "WhatsApp", icon: "💬", color: "#25D366" },
              { name: "Facebook", icon: "f", color: "#1877F2" },
              { name: "Instagram", icon: "📷", color: "#E1306C" },
              { name: "Twitter", icon: "𝕏", color: "#000000" },
            ].map((social) => (
              <button
                key={social.name}
                onClick={() => {
                  const text = `Join me on Smile App! Earn points, redeem rewards, and enjoy exclusive perks at Havelock City Mall. Download now: https://smileapp.hcm/download`;
                  const urls: Record<string, string> = {
                    WhatsApp: `https://wa.me/?text=${encodeURIComponent(text)}`,
                    Facebook: `https://www.facebook.com/sharer/sharer.php?u=https://smileapp.hcm`,
                    Instagram: `instagram://`,
                    Twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
                  };
                  if (social.name === "Instagram") {
                    window.location.href = urls[social.name];
                  } else {
                    window.open(urls[social.name], "_blank");
                  }
                }}
                style={{
                  flex: 1,
                  height: "48px",
                  borderRadius: "12px",
                  background: social.color,
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  fontWeight: 600,
                }}
                title={social.name}
              >
                {social.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setShowInviteDrawer(false)}
          style={{
            width: "100%",
            height: "48px",
            borderRadius: "12px",
            background: "#F1F1F1",
            color: "#0E0E10",
            fontSize: "15px",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>

      {/* Logout Confirmation Modal Overlay */}
      {showLogoutConfirm && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.45)" }}
          onClick={() => setShowLogoutConfirm(false)}
        />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div
          className="absolute left-0 right-0 z-50 mx-auto"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            width: "280px",
            background: "#fff",
            borderRadius: "20px",
            padding: "28px 24px",
            boxShadow: "0 12px 48px rgba(0,0,0,0.25)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0E0E10", marginBottom: "8px", textAlign: "center" }}>
            Log Out?
          </h3>
          <p style={{ fontSize: "13px", color: "#52525B", marginBottom: "24px", textAlign: "center", lineHeight: 1.5 }}>
            Are you sure you want to log out of your account?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowLogoutConfirm(false)}
              style={{
                flex: 1,
                height: "44px",
                borderRadius: "12px",
                background: "#F1F1F1",
                color: "#0E0E10",
                fontSize: "14px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                router.push("/login");
              }}
              style={{
                flex: 1,
                height: "44px",
                borderRadius: "12px",
                background: "#DC2626",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

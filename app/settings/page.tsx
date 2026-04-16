"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StatusBar from "@/app/components/StatusBar";
import { ChevronLeft } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7", fontFamily: "'Inter', sans-serif" }}>
      <StatusBar />

      {/* App Bar */}
      <div
        className="relative flex items-center px-5 flex-shrink-0"
        style={{
          paddingTop: "48px",
          paddingBottom: "12px",
          minHeight: "80px",
          borderBottom: "1px solid #F0F0F0",
          background: "#fff",
        }}
      >
        <button onClick={() => router.back()} className="flex items-center gap-1">
          <ChevronLeft size={22} style={{ color: "#0E0E10" }} />
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>Settings</span>
        </button>
        <div style={{ width: "40px" }} />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: "24px" }}>
        {/* Notifications Section */}
        <div className="px-5 pt-5 pb-4">
          <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#0E0E10", marginBottom: "12px" }}>
            Notifications
          </h2>
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              border: "1px solid #F0F0F0",
              overflow: "hidden",
            }}
          >
            {/* Push Notifications */}
            <div
              className="flex items-center justify-between px-4"
              style={{
                height: "56px",
                borderBottom: "1px solid #F5F5F5",
              }}
            >
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#0E0E10", marginBottom: "2px" }}>
                  Push Notifications
                </p>
                <p style={{ fontSize: "12px", color: "#B3B3B4" }}>Receive app alerts</p>
              </div>
              <button
                onClick={() => setPushNotifications(!pushNotifications)}
                style={{
                  width: "50px",
                  height: "28px",
                  borderRadius: "14px",
                  background: pushNotifications ? "#9728B8" : "#D4D4D8",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "12px",
                    background: "#fff",
                    position: "absolute",
                    top: "2px",
                    left: pushNotifications ? "24px" : "2px",
                    transition: "left 0.2s",
                  }}
                />
              </button>
            </div>

            {/* Email Notifications */}
            <div
              className="flex items-center justify-between px-4"
              style={{
                height: "56px",
                borderBottom: "1px solid #F5F5F5",
              }}
            >
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#0E0E10", marginBottom: "2px" }}>
                  Email Notifications
                </p>
                <p style={{ fontSize: "12px", color: "#B3B3B4" }}>Receive email updates</p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                style={{
                  width: "50px",
                  height: "28px",
                  borderRadius: "14px",
                  background: emailNotifications ? "#9728B8" : "#D4D4D8",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "12px",
                    background: "#fff",
                    position: "absolute",
                    top: "2px",
                    left: emailNotifications ? "24px" : "2px",
                    transition: "left 0.2s",
                  }}
                />
              </button>
            </div>

            {/* SMS Notifications */}
            <div
              className="flex items-center justify-between px-4"
              style={{
                height: "56px",
              }}
            >
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#0E0E10", marginBottom: "2px" }}>
                  SMS Notifications
                </p>
                <p style={{ fontSize: "12px", color: "#B3B3B4" }}>Receive SMS messages</p>
              </div>
              <button
                onClick={() => setSmsNotifications(!smsNotifications)}
                style={{
                  width: "50px",
                  height: "28px",
                  borderRadius: "14px",
                  background: smsNotifications ? "#9728B8" : "#D4D4D8",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "12px",
                    background: "#fff",
                    position: "absolute",
                    top: "2px",
                    left: smsNotifications ? "24px" : "2px",
                    transition: "left 0.2s",
                  }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="px-5 pb-4">
          <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#0E0E10", marginBottom: "12px" }}>
            Preferences
          </h2>
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              border: "1px solid #F0F0F0",
              overflow: "hidden",
            }}
          >
            {/* Language */}
            <div
              className="flex items-center justify-between px-4"
              style={{
                height: "56px",
                borderBottom: "1px solid #F5F5F5",
              }}
            >
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#0E0E10" }}>Language</p>
              </div>
              <select
                defaultValue="en"
                style={{
                  background: "#F5F5F7",
                  border: "1px solid #D4D4D8",
                  borderRadius: "8px",
                  padding: "6px 12px",
                  fontSize: "13px",
                  color: "#0E0E10",
                  cursor: "pointer",
                }}
              >
                <option value="en">English</option>
                <option value="si">Sinhala</option>
                <option value="ta">Tamil</option>
              </select>
            </div>

            {/* App Version */}
            <div
              className="flex items-center justify-between px-4"
              style={{
                height: "56px",
                borderBottom: "1px solid #F5F5F5",
              }}
            >
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#0E0E10" }}>App Version</p>
              </div>
              <p style={{ fontSize: "13px", color: "#B3B3B4" }}>v1.0.0</p>
            </div>

            {/* Clear Cache */}
            <div
              className="flex items-center justify-between px-4"
              style={{
                height: "56px",
              }}
            >
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#0E0E10" }}>Clear Cache</p>
              </div>
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    localStorage.removeItem("smileapp_profile");
                    localStorage.removeItem("smileapp_parking");
                  }
                }}
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#9728B8",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="px-5 pb-4">
          <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#0E0E10", marginBottom: "12px" }}>
            About
          </h2>
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              border: "1px solid #F0F0F0",
              overflow: "hidden",
            }}
          >
            {/* Privacy Policy */}
            <button
              onClick={() => window.open("#", "_blank")}
              className="w-full flex items-center justify-between px-4"
              style={{
                height: "56px",
                borderBottom: "1px solid #F5F5F5",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#0E0E10" }}>Privacy Policy</p>
              <span style={{ color: "#B3B3B4" }}>›</span>
            </button>

            {/* Terms of Service */}
            <button
              onClick={() => window.open("#", "_blank")}
              className="w-full flex items-center justify-between px-4"
              style={{
                height: "56px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#0E0E10" }}>Terms of Service</p>
              <span style={{ color: "#B3B3B4" }}>›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

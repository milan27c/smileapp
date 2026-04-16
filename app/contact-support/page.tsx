"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Phone, Mail, Clock } from "lucide-react";

export default function ContactSupportPage() {
  const router = useRouter();

  const contactChannels = []; // Removed - using redesigned compact layout instead

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
        <button onClick={() => router.back()} className="flex items-center gap-1">
          <ChevronLeft size={22} style={{ color: "#0E0E10" }} />
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>Contact Support</span>
        </button>
        <div style={{ width: "40px" }} />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-[192px]" style={{ paddingBottom: "24px" }}>
        {/* Hero Section */}
        <div className="px-5 pt-4 pb-3">
          <div
            style={{
              background: "linear-gradient(135deg, #9728B8 0%, #F002AF 100%)",
              borderRadius: "14px",
              padding: "16px 20px",
              color: "#fff",
              textAlign: "center",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px" }}>
              How can we help?
            </h2>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.85)", lineHeight: 1.3, whiteSpace: "nowrap" }}>
              Support Team ready to assist
            </p>
          </div>
        </div>

        {/* Contact Channels - Redesigned */}
        <div className="px-5 pb-6">
          <div className="flex flex-col gap-3">
            {/* Hotline - Compact */}
            <div
              style={{
                background: "#fff",
                borderRadius: "14px",
                border: "1px solid #F0F0F0",
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "10px",
                  background: "#F5F5F7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Phone size={16} style={{ color: "#9728B8" }} />
              </div>
              <div className="flex-1">
                <p style={{ fontSize: "12px", color: "#B3B3B4", margin: 0, marginBottom: "2px" }}>Hotline</p>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#0E0E10", margin: 0 }}>+94 11 123 4567</p>
              </div>
              <button
                onClick={() => window.location.href = "tel:+94111234567"}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#9728B8",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.2s",
                }}
              >
                <Phone size={18} />
              </button>
            </div>

            {/* Email - Compact */}
            <div
              style={{
                background: "#fff",
                borderRadius: "14px",
                border: "1px solid #F0F0F0",
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "10px",
                  background: "#F5F5F7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Mail size={16} style={{ color: "#9728B8" }} />
              </div>
              <div className="flex-1">
                <p style={{ fontSize: "12px", color: "#B3B3B4", margin: 0, marginBottom: "2px" }}>Email</p>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#0E0E10", margin: 0 }}>support@havelocksmiles.com</p>
              </div>
              <button
                onClick={() => window.location.href = "mailto:support@havelocksmiles.com"}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#9728B8",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.2s",
                }}
              >
                <Mail size={18} />
              </button>
            </div>

            {/* 24/7 Support */}
            <div
              style={{
                background: "#fff",
                borderRadius: "14px",
                border: "1px solid #F0F0F0",
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "10px",
                  background: "#F5F5F7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Clock size={16} style={{ color: "#9728B8" }} />
              </div>
              <div>
                <p style={{ fontSize: "12px", color: "#B3B3B4", margin: 0, marginBottom: "2px" }}>Support Hours</p>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#63DBAE", margin: 0 }}>24/7 Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="px-5 pb-4">
          <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#0E0E10", marginBottom: "12px" }}>
            Frequently Asked Questions
          </h2>
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              border: "1px solid #F0F0F0",
              overflow: "hidden",
            }}
          >
            {[
              {
                q: "How do I reset my password?",
                a: "Go to the login page and tap 'Forgot Password'. Follow the instructions sent to your email.",
              },
              {
                q: "How are Smile Points calculated?",
                a: "You earn 1 point for every Rs. 50 spent at participating stores. Additional points from challenges and events.",
              },
              {
                q: "Can I transfer points to another account?",
                a: "Yes, through Family Sharing. Add family members and share your points pool.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                style={{
                  borderBottom: i < 2 ? "1px solid #F5F5F5" : "none",
                }}
              >
                <summary
                  style={{
                    padding: "16px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#0E0E10",
                    listStyle: "none",
                    userSelect: "none",
                  }}
                >
                  {faq.q}
                </summary>
                <div style={{ padding: "0 16px 16px 16px", paddingTop: 0 }}>
                  <p style={{ fontSize: "13px", color: "#52525B", lineHeight: 1.5 }}>
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Location Card */}
        <div className="px-5 pb-6">
          <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#0E0E10", marginBottom: "12px" }}>
            Visit Us
          </h2>
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              border: "1px solid #F0F0F0",
              padding: "20px",
            }}
          >
            <p style={{ fontSize: "14px", fontWeight: 600, color: "#0E0E10", marginBottom: "8px" }}>
              Havelock City Mall
            </p>
            <p style={{ fontSize: "13px", color: "#52525B", marginBottom: "12px", lineHeight: 1.6 }}>
              Havelock City<br />
              123 Colombo Road<br />
              Colombo 5, Sri Lanka
            </p>
            <button
              onClick={() => window.open("https://maps.google.com", "_blank")}
              style={{
                width: "100%",
                height: "40px",
                borderRadius: "10px",
                background: "#F5F5F7",
                color: "#9728B8",
                fontSize: "13px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              Open in Maps
            </button>
          </div>
        </div>

        {/* Follow Us Section */}
        <div className="px-5 pb-6">
          <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#0E0E10", marginBottom: "12px" }}>
            Follow Us
          </h2>
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              border: "1px solid #F0F0F0",
              padding: "20px",
            }}
          >
            <p style={{ fontSize: "13px", color: "#52525B", marginBottom: "16px" }}>
              Stay connected with Havelock City Mall Smiles on social media for updates and exclusive offers
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
              {[
                { name: "Instagram", url: "https://instagram.com/havelocksmiles", image: "/images/socialmedia/instagram.png" },
                { name: "Facebook", url: "https://facebook.com/havelocksmiles", image: "/images/socialmedia/facebook.png" },
                { name: "WhatsApp", url: "https://wa.me/94111234567", image: "/images/socialmedia/whatsapp.png" },
                { name: "TikTok", url: "https://tiktok.com/@havelocksmiles", image: "/images/socialmedia/tiktok.png" },
              ].map((social) => (
                <button
                  key={social.name}
                  onClick={() => window.open(social.url, "_blank")}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    padding: "12px 8px",
                    borderRadius: "12px",
                    background: "#F5F5F7",
                    border: "1.5px solid #E4E4E7",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.borderColor = "#9728B8";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "#F5F5F7";
                    e.currentTarget.style.borderColor = "#E4E4E7";
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={social.image}
                      alt={social.name}
                      width={36}
                      height={36}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <span style={{ fontSize: "9px", fontWeight: 600, color: "#0E0E10", textAlign: "center", lineHeight: 1.2 }}>
                    {social.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

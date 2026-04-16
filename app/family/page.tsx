"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Pencil, Check, Trash2 } from "lucide-react";
import StatusBar from "@/app/components/StatusBar";



type Member = {
  id: string;
  name: string;
  role: "Admin" | "Member";
  points: number;
  photo: string;
  isYou?: boolean;
};

const MEMBERS: Member[] = [
  { id: "1", name: "Ashan Perera", role: "Admin", points: 780, photo: "https://randomuser.me/api/portraits/men/32.jpg", isYou: true },
  { id: "2", name: "Miyuru Jayasundara", role: "Member", points: 1250, photo: "https://randomuser.me/api/portraits/men/45.jpg" },
  { id: "3", name: "Isanka Vimukthi", role: "Member", points: 720, photo: "https://randomuser.me/api/portraits/men/67.jpg" },
  { id: "4", name: "Kanchana Perera", role: "Member", points: 910, photo: "https://randomuser.me/api/portraits/women/44.jpg" },
];

const totalPoints = MEMBERS.reduce((sum, m) => sum + m.points, 0);

type InvitedMember = { id: string; phone: string; sentAt: string };

export default function FamilyPage() {
  const router = useRouter();
  const [familyName, setFamilyName] = useState("Ashan' Family");
  const [editingName, setEditingName] = useState("");
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [invitedMembers, setInvitedMembers] = useState<InvitedMember[]>([]);

  // Load pending invitations from localStorage (written by add member page)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("smileapp_pending_invites");
      if (raw) setInvitedMembers(JSON.parse(raw));
    } catch {}
  }, []);

  const openEditDrawer = () => {
    setEditingName(familyName);
    setShowEditDrawer(true);
  };

  const saveEditDrawer = () => {
    if (editingName.trim()) setFamilyName(editingName.trim());
    setShowEditDrawer(false);
  };

  const removeInvite = (id: string) => {
    setInvitedMembers((prev) => {
      const next = prev.filter((inv) => inv.id !== id);
      try { localStorage.setItem("smileapp_pending_invites", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7", fontFamily: "'Inter', sans-serif" }}>
      <StatusBar />

      {/* App Bar */}
      <div className="flex-shrink-0 flex items-center px-5"
        style={{ paddingTop: "48px", paddingBottom: "12px", minHeight: "80px", borderBottom: "1px solid #F0F0F0", background: "#fff" }}>
        <button onClick={() => router.back()} className="flex items-center gap-1">
          <ChevronLeft size={22} style={{ color: "#0E0E10" }} />
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>My Family</span>
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-6">

        {/* Hero Family Card */}
        <div className="px-5 pt-5">
          <div style={{ borderRadius: "20px", overflow: "hidden", position: "relative", height: "128px" }}>
            <Image src="/images/myfamilybg.png" alt="Family background" fill style={{ objectFit: "cover" }} />

            {/* Edit button */}
            <button onClick={openEditDrawer} style={{
              position: "absolute", top: "12px", right: "12px",
              width: "30px", height: "30px", borderRadius: "9999px",
              background: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", zIndex: 5,
            }}>
              <Pencil size={13} style={{ color: "#fff" }} />
            </button>

            {/* Content: left = text, right = avatars, vertically centered */}
            <div style={{
              position: "absolute", inset: 0, padding: "14px 16px",
              display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 4,
            }}>
              {/* Left: name + points */}
              <div>
                <p style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "2px", lineHeight: 1.1 }}>
                  {familyName}
                </p>
                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.75)", marginBottom: "2px", fontWeight: 600 }}>
                  Total Family Points
                </p>
                <p style={{ fontSize: "26px", fontWeight: 800, color: "#fff", lineHeight: 1 }}>
                  {totalPoints.toLocaleString()}
                </p>
              </div>

              {/* Right: overlapping avatars */}
              <div style={{ display: "flex", alignItems: "center" }}>
                {MEMBERS.map((m, i) => (
                  <div key={m.id} style={{
                    width: "34px", height: "34px", borderRadius: "9999px", overflow: "hidden",
                    border: "2px solid rgba(255,255,255,0.9)",
                    marginLeft: i === 0 ? 0 : "-9px",
                    position: "relative",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                  }}>
                    <Image src={m.photo} alt={m.name} fill style={{ objectFit: "cover" }} unoptimized />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons — home page quick action style */}
        <div className="px-5 pt-4 flex gap-3">
          {/* Add Member */}
          <button
            onClick={() => router.push("/family/add")}
            className="flex-1 flex flex-col items-center gap-2.5 py-4"
            style={{ borderRadius: "14px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "none", cursor: "pointer" }}
          >
            <div style={{
              width: "56px", height: "56px", borderRadius: "12px",
              background: "#9728B815",
              position: "relative", overflow: "hidden", flexShrink: 0,
            }}>
              <Image src="/images/Home Page Gifs/adduser.gif" alt="Add Member" fill style={{ objectFit: "cover" }} unoptimized />
            </div>
            <span className="font-semibold text-center" style={{ fontSize: "12px", color: "#0E0E10" }}>Add Member</span>
          </button>

          {/* Invite Code */}
          <button
            onClick={() => router.push("/family/invitecode")}
            className="flex-1 flex flex-col items-center gap-2.5 py-4"
            style={{ borderRadius: "14px", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "none", cursor: "pointer" }}
          >
            <div style={{
              width: "56px", height: "56px", borderRadius: "12px",
              background: "#FED95515",
              position: "relative", overflow: "hidden", flexShrink: 0,
            }}>
              <Image src="/images/Home Page Gifs/myqr.gif" alt="Invite Code" fill style={{ objectFit: "cover" }} unoptimized />
            </div>
            <span className="font-semibold text-center" style={{ fontSize: "12px", color: "#0E0E10" }}>Invite Code</span>
          </button>
        </div>

        {/* Members Section */}
        <div className="px-5 pt-5">
          <p style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10", marginBottom: "12px" }}>Members</p>
          <div className="flex flex-col gap-3">
            {MEMBERS.map((member) => (
              <div key={member.id} style={{
                borderRadius: "16px",
                // Admin uses accent-cyan (#00C1E2), others plain
                border: member.isYou ? "1.5px solid rgba(0,193,226,0.4)" : "1px solid #F0F0F0",
                background: member.isYou ? "rgba(0,193,226,0.06)" : "#FAFAFA",
                padding: "12px 14px",
                display: "flex", alignItems: "center", gap: "12px",
              }}>
                {/* Avatar */}
                <div style={{
                  width: "46px", height: "46px", borderRadius: "9999px", overflow: "hidden",
                  position: "relative", flexShrink: 0,
                  border: member.isYou ? "2px solid #00C1E2" : "2px solid #E4E4E7",
                }}>
                  <Image src={member.photo} alt={member.name} fill style={{ objectFit: "cover" }} unoptimized />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "14px", fontWeight: 500, color: "#0E0E10", marginBottom: "4px" }}>{member.name}</p>
                  <div className="flex items-center gap-2">
                    {member.role === "Admin" && (
                      <span style={{
                        fontSize: "10px", fontWeight: 700, color: "#0077A8",
                        background: "rgba(0,193,226,0.15)", borderRadius: "9999px", padding: "2px 8px",
                      }}>Admin</span>
                    )}
                    <span style={{ fontSize: "11px", color: "#B3B3B4" }}>
                      {member.isYou ? "You" : "Member"}
                    </span>
                  </div>
                </div>

                {/* Points + Send Points */}
                <div className="flex flex-col items-end gap-2" style={{ flexShrink: 0 }}>
                  <span style={{ fontSize: "18px", fontWeight: 600, color: "#0E0E10" }}>
                    {member.points.toLocaleString()}
                  </span>
                  {member.isYou && (
                    <button
                      onClick={() => router.push("/family/sendpoints")}
                      style={{
                        height: "28px", borderRadius: "9999px", padding: "0 12px",
                        background: "#9728B8", border: "none", fontSize: "11px", fontWeight: 600, color: "#fff", cursor: "pointer",
                      }}>
                      Send Points
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Invitations — only shown when there are entries */}
        {invitedMembers.length > 0 && (
          <div className="px-5 pt-5">
            <p style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10", marginBottom: "4px" }}>
              Pending Invitations
              <span style={{
                marginLeft: "8px", fontSize: "12px", fontWeight: 700,
                background: "#FED955", color: "#0E0E10", borderRadius: "9999px", padding: "2px 8px",
              }}>
                {invitedMembers.length}
              </span>
            </p>
            <p style={{ fontSize: "12px", color: "#B3B3B4", marginBottom: "12px" }}>
              These users will be added after they accept your invitation
            </p>
            <div className="flex flex-col gap-2">
              {invitedMembers.map((inv) => (
                <div key={inv.id} style={{
                  borderRadius: "12px", border: "1px solid rgba(254,217,85,0.5)",
                  background: "rgba(254,217,85,0.07)", padding: "12px 14px",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
                }}>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#0E0E10", marginBottom: "3px" }}>{inv.phone}</p>
                    <p style={{ fontSize: "11px", color: "#B3B3B4" }}>Invited {inv.sentAt}</p>
                  </div>
                  <button onClick={() => removeInvite(inv.id)} style={{
                    width: "32px", height: "32px", borderRadius: "9999px",
                    background: "#FFF0F0", border: "none", display: "flex",
                    alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0,
                  }}>
                    <Trash2 size={15} style={{ color: "#DC2626" }} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit Name Drawer — conditionally mounted, never in DOM when closed */}
      {showEditDrawer && (
        <>
          <div className="absolute inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.45)", animation: "fade-in 0.2s ease" }}
            onClick={() => setShowEditDrawer(false)}
          />
          <div className="absolute left-0 right-0 bottom-0 z-50"
            style={{
              background: "#fff", borderRadius: "24px 24px 0 0",
              padding: "0 20px 32px", boxShadow: "0 -8px 32px rgba(0,0,0,0.15)",
              animation: "sheet-up 0.32s cubic-bezier(0.32,0.72,0,1) both",
            }}>
            <div className="flex justify-center pt-2 pb-4">
              <div style={{ width: "40px", height: "4px", borderRadius: "9999px", background: "#D4D4D8" }} />
            </div>
            <div className="mb-5">
              <span style={{ fontSize: "17px", fontWeight: 700, color: "#0E0E10" }}>Family Name</span>
            </div>
            <input
              type="text" value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              autoFocus enterKeyHint="done"
              onKeyDown={(e) => { if (e.key === "Enter") saveEditDrawer(); }}
              placeholder="Enter family name"
              style={{
                width: "100%", height: "48px", borderRadius: "12px",
                border: "1.5px solid #9728B8", background: "rgba(151,40,184,0.03)",
                paddingLeft: "16px", paddingRight: "16px", fontSize: "15px",
                color: "#0E0E10", outline: "none", fontFamily: "'Inter', sans-serif", marginBottom: "14px",
              }}
            />
            <button onClick={saveEditDrawer} disabled={!editingName.trim()}
              style={{
                width: "100%", height: "48px", borderRadius: "12px",
                background: editingName.trim() ? "#9728B8" : "#E4E4E7",
                color: editingName.trim() ? "#fff" : "#B3B3B4",
                fontSize: "15px", fontWeight: 600, border: "none",
                cursor: editingName.trim() ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}>
              <Check size={18} />
              Save Name
            </button>
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Camera } from "lucide-react";



const DEFAULTS = {
  firstName: "Ashan",
  lastName: "Perera",
  email: "ashan.perera@gmail.com",
  phone: "+94 77 123 4567",
  address: "45 Havelock Road, Colombo 05",
  dob: "1995-06-15",
  photo: "https://randomuser.me/api/portraits/men/32.jpg",
};

export default function EditProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string>(DEFAULTS.photo);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);

  const [form, setForm] = useState({
    firstName: DEFAULTS.firstName,
    lastName: DEFAULTS.lastName,
    email: DEFAULTS.email,
    phone: DEFAULTS.phone,
    address: DEFAULTS.address,
    dob: DEFAULTS.dob,
  });

  // Load saved data from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("smileapp_profile");
      if (saved) {
        const data = JSON.parse(saved);
        setForm({
          firstName: data.firstName ?? DEFAULTS.firstName,
          lastName: data.lastName ?? DEFAULTS.lastName,
          email: data.email ?? DEFAULTS.email,
          phone: data.phone ?? DEFAULTS.phone,
          address: data.address ?? DEFAULTS.address,
          dob: data.dob ?? DEFAULTS.dob,
        });
        if (data.photo) {
          setPhotoPreview(data.photo);
          setPhotoDataUrl(data.photo);
        }
      }
    } catch {}
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setPhotoPreview(dataUrl);
      setPhotoDataUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const saved = (() => {
    try {
      const s = localStorage.getItem("smileapp_profile");
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  })();

  const original = {
    firstName: saved?.firstName ?? DEFAULTS.firstName,
    lastName: saved?.lastName ?? DEFAULTS.lastName,
    email: saved?.email ?? DEFAULTS.email,
    phone: saved?.phone ?? DEFAULTS.phone,
    address: saved?.address ?? DEFAULTS.address,
    dob: saved?.dob ?? DEFAULTS.dob,
    photo: saved?.photo ?? DEFAULTS.photo,
  };

  const isDirty =
    form.firstName !== original.firstName ||
    form.lastName !== original.lastName ||
    form.email !== original.email ||
    form.phone !== original.phone ||
    form.address !== original.address ||
    form.dob !== original.dob ||
    (photoDataUrl !== null && photoDataUrl !== original.photo);

  const handleSave = () => {
    if (!isDirty) return;
    setIsSaving(true);
    const payload = {
      ...form,
      photo: photoDataUrl ?? original.photo,
    };
    localStorage.setItem("smileapp_profile", JSON.stringify(payload));
    setTimeout(() => {
      setIsSaving(false);
      router.back();
    }, 700);
  };

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const fields: { key: keyof typeof form; label: string; type: string; placeholder: string }[] = [
    { key: "firstName", label: "First Name", type: "text", placeholder: "Enter first name" },
    { key: "lastName", label: "Last Name", type: "text", placeholder: "Enter last name" },
    { key: "email", label: "E-mail", type: "email", placeholder: "Enter email address" },
    { key: "phone", label: "Phone Number", type: "tel", placeholder: "Enter phone number" },
    { key: "address", label: "Address", type: "text", placeholder: "Enter your address" },
    { key: "dob", label: "Date of Birth", type: "date", placeholder: "" },
  ];

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7", fontFamily: "'Inter', sans-serif" }}>

      {/* App Bar */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-5"
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
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>Edit Profile</span>
        </button>

        <button
          onClick={handleSave}
          disabled={!isDirty || isSaving}
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: isDirty && !isSaving ? "#9728B8" : "#B3B3B4",
            background: "none",
            border: "none",
            cursor: isDirty && !isSaving ? "pointer" : "default",
            transition: "color 0.15s",
            padding: "4px 0",
          }}
        >
          {isSaving ? "Saving…" : "Save"}
        </button>
      </div>

      {/* Scrollable Content — with mobile keyboard support */}
      <div className="flex-1 overflow-y-auto pb-[192px]">

        {/* Avatar */}
        <div className="flex flex-col items-center pt-6 pb-6">
          <div style={{ position: "relative", display: "inline-block" }}>
            <div
              style={{
                width: "88px",
                height: "88px",
                borderRadius: "9999px",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              }}
            >
              <Image
                src={photoPreview}
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
                bottom: "3px",
                right: "3px",
                width: "28px",
                height: "28px",
                borderRadius: "9999px",
                background: "#9728B8",
                border: "2.5px solid #fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Camera size={13} style={{ color: "#fff" }} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: "none" }}
            />
          </div>
          <p style={{ fontSize: "12px", color: "#9728B8", fontWeight: 600, marginTop: "10px" }}>
            Change Photo
          </p>
        </div>

        {/* Fields */}
        <div className="px-5 pb-8 flex flex-col gap-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#52525B",
                  display: "block",
                  marginBottom: "6px",
                  textTransform: "uppercase",
                  letterSpacing: "0.4px",
                }}
              >
                {field.label}
              </label>
              <input
                type={field.type}
                value={form[field.key]}
                onChange={set(field.key)}
                placeholder={field.placeholder}
                style={{
                  width: "100%",
                  height: "48px",
                  borderRadius: "12px",
                  border: "1.5px solid #E4E4E7",
                  background: "#FAFAFA",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  fontSize: "15px",
                  color: "#0E0E10",
                  outline: "none",
                  transition: "border-color 0.15s, background 0.15s",
                  fontFamily: "'Inter', sans-serif",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#9728B8";
                  e.target.style.background = "rgba(151,40,184,0.03)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E4E4E7";
                  e.target.style.background = "#FAFAFA";
                }}
              />
            </div>
          ))}

          <button
            onClick={handleSave}
            disabled={!isDirty || isSaving}
            style={{
              width: "100%",
              height: "48px",
              borderRadius: "12px",
              background: isDirty ? "#9728B8" : "#E4E4E7",
              color: isDirty ? "#fff" : "#B3B3B4",
              fontSize: "15px",
              fontWeight: 600,
              border: "none",
              cursor: isDirty && !isSaving ? "pointer" : "not-allowed",
              transition: "all 0.15s",
              marginTop: "8px",
            }}
          >
            {isSaving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

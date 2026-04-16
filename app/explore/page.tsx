"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, SlidersHorizontal, Home as HomeIcon, Gift, Compass, Calendar, User, X } from "lucide-react";

const CATEGORIES = [
  "All",
  "Accessories",
  "Books, Gifts & Novelties",
  "Electronics & Lifestyle",
  "Entertainment",
  "Fashion",
  "Food and Beverages",
  "Health & Beauty",
  "Homeware",
];

const FLOORS = ["All", "Ground Floor", "Level 1", "Level 2", "Level 3", "Level 4"];

const CATEGORY_ICONS: Record<string, string> = {
  "Accessories": "/icons/explore/Accessories.svg",
  "Books, Gifts & Novelties": "/icons/explore/Books, Gifts & Novelties.svg",
  "Electronics & Lifestyle": "/icons/explore/Electronics & Lifestyle.svg",
  "Entertainment": "/icons/explore/Entertainment.svg",
  "Fashion": "/icons/explore/Fashion.svg",
  "Food and Beverages": "/icons/explore/Food and Beverages.svg",
  "Health & Beauty": "/icons/explore/Health & Beauty.svg",
  "Homeware": "/icons/explore/Homeware.svg",
};

const CATEGORY_COLORS: Record<string, string> = {
  "Accessories": "#9728B8",
  "Books, Gifts & Novelties": "#014D98",
  "Electronics & Lifestyle": "#00C1E2",
  "Entertainment": "#FA5D3E",
  "Fashion": "#F002AF",
  "Food and Beverages": "#FED955",
  "Health & Beauty": "#63DBAE",
  "Homeware": "#FA9E1A",
};

export default function ExplorePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [activeFloors, setActiveFloors] = useState<string[]>([]);
  const [pendingCategories, setPendingCategories] = useState<string[]>([]);
  const [pendingFloors, setPendingFloors] = useState<string[]>([]);

  const openFilter = () => {
    setPendingCategories([...activeCategories]);
    setPendingFloors([...activeFloors]);
    setShowFilter(true);
  };

  const applyFilter = () => {
    setActiveCategories([...pendingCategories]);
    setActiveFloors([...pendingFloors]);
    setShowFilter(false);

    const params = new URLSearchParams();
    if (pendingCategories.length > 0 && !pendingCategories.includes("All")) {
      params.set("categories", pendingCategories.join(","));
    }
    if (pendingFloors.length > 0 && !pendingFloors.includes("All")) {
      params.set("floors", pendingFloors.join(","));
    }
    if (search) params.set("search", search);

    router.push(`/explore/shops?${params.toString()}`);
  };

  const handleCategoryClick = (cat: string) => {
    const newCategories = cat === "All" ? [] : [cat];
    setActiveCategories(newCategories);
    const params = new URLSearchParams();
    if (cat !== "All") params.set("categories", cat);
    if (activeFloors.length > 0) params.set("floors", activeFloors.join(","));
    if (search) params.set("search", search);
    router.push(`/explore/shops?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (activeCategories.length > 0) params.set("categories", activeCategories.join(","));
    if (activeFloors.length > 0) params.set("floors", activeFloors.join(","));
    if (search) params.set("search", search);
    router.push(`/explore/shops?${params.toString()}`);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7", fontFamily: "'Inter', sans-serif" }}>

      {/* App Bar */}
      <div
        className="relative flex items-center justify-between px-5 flex-shrink-0"
        style={{
          paddingTop: "12px",
          paddingBottom: "8px",
          minHeight: "56px",
          borderBottom: "1px solid #F0F0F0",
          background: "#fff",
        }}
      >
        <h1 className="font-bold" style={{ fontSize: "16px", color: "#0E0E10" }}>
          Explore Havelock City Mall
        </h1>
        <div style={{ width: "40px" }} />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-[192px]">
        {/* Search + Filter */}
        <div className="flex items-center gap-3 px-5 pt-4 pb-3">
          <form onSubmit={handleSearch} className="flex-1 relative">
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#B3B3B4",
              }}
            />
            <input
              type="text"
              placeholder="Search stores..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                height: "44px",
                borderRadius: "12px",
                border: "1.5px solid #E4E4E7",
                background: "#FAFAFA",
                paddingLeft: "38px",
                paddingRight: "12px",
                fontSize: "14px",
                color: "#0E0E10",
                outline: "none",
              }}
            />
          </form>
          <button
            onClick={openFilter}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              border: "1.5px solid #E4E4E7",
              background: (activeCategories.length > 0 || activeFloors.length > 0) ? "#9728B8" : "#FAFAFA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <SlidersHorizontal
              size={18}
              style={{ color: (activeCategories.length > 0 || activeFloors.length > 0) ? "#fff" : "#52525B" }}
            />
          </button>
        </div>

        {/* Category Icons Grid */}
        <div className="px-5 pb-2">
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10", marginBottom: "14px" }}>
            Categories
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "12px",
            }}
          >
            {Object.entries(CATEGORY_ICONS).map(([cat, iconPath]) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="flex flex-col items-center gap-2"
                style={{ cursor: "pointer", transition: "all 0.15s" }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "16px",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1.5px solid #E4E4E7",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <Image
                    src={iconPath}
                    alt={cat}
                    width={32}
                    height={32}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <span
                  className="text-center"
                  style={{
                    fontSize: "10px",
                    fontWeight: 500,
                    color: "#0E0E10",
                    lineHeight: 1.3,
                    maxWidth: "72px",
                  }}
                >
                  {cat}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Browse All Stores CTA */}
        <div className="px-5 pt-3 pb-5">
          <button
            onClick={() => router.push("/explore/shops")}
            style={{
              width: "100%",
              height: "44px",
              borderRadius: "12px",
              border: "1.5px solid #0E0E10",
              background: "transparent",
              fontSize: "14px",
              fontWeight: 600,
              color: "#0E0E10",
            }}
          >
            Browse All Stores
          </button>
        </div>

        {/* Levels Section */}
        <div className="px-5 pb-6">
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10", marginBottom: "14px" }}>
            Levels
          </h2>
          <div
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid #E4E4E7",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "220px" }}>
              <Image
                src="/images/havelockcitymall.png"
                alt="Havelock City Mall"
                fill
                style={{ objectFit: "cover" }}
              />
              {/* Floor labels overlay */}
              <div
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "calc(50% + 16px)",
                  transform: "translateY(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                {["Level 4", "Level 3", "Level 2", "Level 1", "Ground Floor"].map((floor) => (
                  <button
                    key={floor}
                    onClick={() => {
                      setActiveFloors([floor]);
                      const params = new URLSearchParams();
                      params.set("floors", floor);
                      if (activeCategories.length > 0) params.set("categories", activeCategories.join(","));
                      if (search) params.set("search", search);
                      router.push(`/explore/shops?${params.toString()}`);
                    }}
                    style={{
                      background: "rgba(255,255,255,0.92)",
                      border: "none",
                      borderRadius: "8px",
                      padding: "4px 10px",
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "#0E0E10",
                      cursor: "pointer",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {floor}
                    <span style={{ color: "#9728B8" }}>›</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Drawer Overlay */}
      {showFilter && (
        <div
          className="absolute inset-0 z-50"
          style={{ background: "rgba(0,0,0,0.45)" }}
          onClick={() => setShowFilter(false)}
        />
      )}

      {/* Filter Drawer */}
      <div
        className="absolute bottom-0 left-0 right-0 z-50"
        style={{
          background: "#fff",
          borderRadius: "24px 24px 0 0",
          padding: "0 20px 28px",
          boxShadow: "0 -8px 32px rgba(0,0,0,0.15)",
          transform: showFilter ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.32s cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-4">
          <div style={{ width: "40px", height: "4px", borderRadius: "9999px", background: "#D4D4D8" }} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <span style={{ fontSize: "17px", fontWeight: 700, color: "#0E0E10" }}>Filter</span>
          <button
            onClick={() => { setPendingCategories([]); setPendingFloors([]); }}
            style={{ fontSize: "13px", fontWeight: 600, color: "#9728B8" }}
          >
            Reset
          </button>
        </div>

        {/* Category */}
        <div className="mb-5">
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#52525B", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = pendingCategories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => {
                    if (isSelected) {
                      setPendingCategories(pendingCategories.filter(c => c !== cat));
                    } else {
                      setPendingCategories([...pendingCategories, cat]);
                    }
                  }}
                  style={{
                    height: "34px",
                    borderRadius: "9999px",
                    padding: "0 14px",
                    fontSize: "12px",
                    fontWeight: 500,
                    background: isSelected ? "#0E0E10" : "transparent",
                    color: isSelected ? "#fff" : "#0E0E10",
                    border: `1.5px solid #0E0E10`,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Floor */}
        <div className="mb-6">
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#52525B", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Floor
          </p>
          <div className="flex flex-wrap gap-2">
            {FLOORS.map((floor) => {
              const isSelected = pendingFloors.includes(floor);
              return (
                <button
                  key={floor}
                  onClick={() => {
                    if (isSelected) {
                      setPendingFloors(pendingFloors.filter(f => f !== floor));
                    } else {
                      setPendingFloors([...pendingFloors, floor]);
                    }
                  }}
                  style={{
                    height: "34px",
                    borderRadius: "9999px",
                    padding: "0 14px",
                    fontSize: "12px",
                    fontWeight: 500,
                    background: isSelected ? "#0E0E10" : "transparent",
                    color: isSelected ? "#fff" : "#0E0E10",
                    border: `1.5px solid #0E0E10`,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {floor}
                </button>
              );
            })}
          </div>
        </div>

        {/* Apply */}
        <button
          onClick={applyFilter}
          style={{
            width: "100%",
            height: "48px",
            borderRadius: "12px",
            background: "#9728B8",
            color: "#fff",
            fontSize: "15px",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          Apply Filters
        </button>
      </div>

      {/* Bottom Navigation */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center"
        style={{
          height: "72px",
          background: "#fff",
          borderTop: "1px solid #F0F0F0",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
          zIndex: showFilter ? 0 : 10,
        }}
      >
        {[
          { icon: HomeIcon, label: "Home", active: false },
          { icon: Gift, label: "Rewards", active: false },
          { icon: Compass, label: "Explore", active: true },
          { icon: Calendar, label: "Events", active: false },
          { icon: User, label: "Profile", active: false },
        ].map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            onClick={() => {
              if (label === "Home") router.push("/home");
              if (label === "Rewards") router.push("/rewards");
              if (label === "Events") router.push("/events");
              if (label === "Profile") router.push("/profile");
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
    </div>
  );
}

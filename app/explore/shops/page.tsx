"use client";

import { Suspense, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Search, SlidersHorizontal } from "lucide-react";



type Shop = {
  id: string;
  name: string;
  category: string;
  floor: string;
  logo: string;
};

const ALL_SHOPS: Shop[] = [
  // Ground Floor
  { id: "odel-gf", name: "Odel", category: "Accessories", floor: "Ground Floor", logo: "/images/explore/Ground Floor/Accessories - Odel.png" },
  { id: "cargills", name: "Cargills Food Hall", category: "Food and Beverages", floor: "Ground Floor", logo: "/images/explore/Ground Floor/Food and Beverages - Cargills Food Hall.png" },
  { id: "finch", name: "Finch Foods", category: "Food and Beverages", floor: "Ground Floor", logo: "/images/explore/Ground Floor/Food and Beverages - Finch Foods.png" },
  { id: "nuts", name: "Nuts & Murukku", category: "Food and Beverages", floor: "Ground Floor", logo: "/images/explore/Ground Floor/Food and Beverages - Nuts & Murukku.png" },
  { id: "rancrisp", name: "Rancrisp Cashew", category: "Food and Beverages", floor: "Ground Floor", logo: "/images/explore/Ground Floor/Food and Beverages - Rancrisp Cashew.png" },
  { id: "nailspa", name: "Nail Spa", category: "Health & Beauty", floor: "Ground Floor", logo: "/images/explore/Ground Floor/Health & Beauty - Nail Spa.png" },
  // Level 1
  { id: "titan", name: "Titan", category: "Accessories", floor: "Level 1", logo: "/images/explore/Level 1/Accessories - Titan.png" },
  { id: "onceupon", name: "Once Upon A Gift", category: "Books, Gifts & Novelties", floor: "Level 1", logo: "/images/explore/Level 1/Books, Gifts & Novelties - Once Upon A Gift.png" },
  { id: "shooting", name: "Shooting Arena", category: "Entertainment", floor: "Level 1", logo: "/images/explore/Level 1/Entertainment - Shooting Arena.png" },
  { id: "miika", name: "Miika", category: "Fashion", floor: "Level 1", logo: "/images/explore/Level 1/Fashion - Miika.png" },
  { id: "cakery", name: "Cakery", category: "Food and Beverages", floor: "Level 1", logo: "/images/explore/Level 1/Food and Beverages - Cakery.png" },
  { id: "wellnessfix", name: "Wellnessfix", category: "Health & Beauty", floor: "Level 1", logo: "/images/explore/Level 1/Health & Beauty - Wellnessfix.png" },
  { id: "abans-l1", name: "Abans", category: "Homeware", floor: "Level 1", logo: "/images/explore/Level 1/Homeware - Abans.png" },
  { id: "singer-l1", name: "Singer", category: "Homeware", floor: "Level 1", logo: "/images/explore/Level 1/Homeware - Singer.png" },
  // Level 2
  { id: "flowers", name: "Flowers by M Ceylon", category: "Books, Gifts & Novelties", floor: "Level 2", logo: "/images/explore/Level 2/Books, Gifts & Novelties - Flowers by M Ceylon.png" },
  { id: "abans-elec", name: "Abans", category: "Electronics & Lifestyle", floor: "Level 2", logo: "/images/explore/Level 2/Electronics & Lifestyle - Abans.png" },
  { id: "istudio", name: "I Studio", category: "Electronics & Lifestyle", floor: "Level 2", logo: "/images/explore/Level 2/Electronics & Lifestyle - I Studio.png" },
  { id: "singer-elec", name: "Singer", category: "Electronics & Lifestyle", floor: "Level 2", logo: "/images/explore/Level 2/Electronics & Lifestyle - Singer.png" },
  { id: "coolplanet", name: "Cool Planet", category: "Fashion", floor: "Level 2", logo: "/images/explore/Level 2/Fashion - Cool Planet.png" },
  { id: "odel-l2", name: "Odel", category: "Fashion", floor: "Level 2", logo: "/images/explore/Level 2/Fashion - Odel.png" },
  { id: "dunstans", name: "Dunstans Barbers", category: "Health & Beauty", floor: "Level 2", logo: "/images/explore/Level 2/Health & Beauty - Dunstans Barbers.png" },
  { id: "dilshan", name: "Dilshan Drape", category: "Homeware", floor: "Level 2", logo: "/images/explore/Level 2/Homeware - Dilshan Drape.png" },
  // Level 3
  { id: "swarovski", name: "Swarovski", category: "Accessories", floor: "Level 3", logo: "/images/explore/Level 3/Accessories - Swarovski.png" },
  { id: "dily", name: "Dily & Carlo", category: "Fashion", floor: "Level 3", logo: "/images/explore/Level 3/Fashion - Dily & Carlo.png" },
  { id: "levis", name: "Levi's", category: "Fashion", floor: "Level 3", logo: "/images/explore/Level 3/Fashion - Levis.png" },
  { id: "lumbini", name: "Lumbini Tea Valley", category: "Food and Beverages", floor: "Level 3", logo: "/images/explore/Level 3/Food and Beverages - Lumbini Tea Valley.png" },
  { id: "fitness", name: "Fitness Factory", category: "Health & Beauty", floor: "Level 3", logo: "/images/explore/Level 3/Health & Beauty - Fitness Factory.png" },
  { id: "healthguard", name: "Healthguard", category: "Health & Beauty", floor: "Level 3", logo: "/images/explore/Level 3/Health & Beauty - Healthguard.png" },
  { id: "fireworks", name: "Fireworks", category: "Homeware", floor: "Level 3", logo: "/images/explore/Level 3/Homeware - Fireworks.png" },
  // Level 4
  { id: "avr", name: "AVR", category: "Entertainment", floor: "Level 4", logo: "/images/explore/Level 4/Entertainment - AVR.png" },
  { id: "scope", name: "Scope Cinema", category: "Entertainment", floor: "Level 4", logo: "/images/explore/Level 4/Entertainment - Scope Cinema.png" },
  { id: "ancient", name: "Ancient Nutra", category: "Health & Beauty", floor: "Level 4", logo: "/images/explore/Level 4/Health & Beauty - Ancient Nutra.png" },
];

const CATEGORIES = ["All", "Accessories", "Books, Gifts & Novelties", "Electronics & Lifestyle", "Entertainment", "Fashion", "Food and Beverages", "Health & Beauty", "Homeware"];
const FLOORS = ["All", "Ground Floor", "Level 1", "Level 2", "Level 3", "Level 4"];

function ShopsContent() {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearch] = useState(params.get("search") || "");
  const [showFilter, setShowFilter] = useState(false);
  const categoryParam = params.get("categories") ? params.get("categories")!.split(",") : [];
  const floorParam = params.get("floors") ? params.get("floors")!.split(",") : [];
  const [activeCategories, setActiveCategories] = useState<string[]>(categoryParam);
  const [activeFloors, setActiveFloors] = useState<string[]>(floorParam);
  const [pendingCategories, setPendingCategories] = useState<string[]>(categoryParam);
  const [pendingFloors, setPendingFloors] = useState<string[]>(floorParam);

  const filtered = useMemo(() => {
    return ALL_SHOPS.filter((s) => {
      const matchCat = activeCategories.length === 0 || activeCategories.includes(s.category);
      const matchFloor = activeFloors.length === 0 || activeFloors.includes(s.floor);
      const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchFloor && matchSearch;
    });
  }, [activeCategories, activeFloors, search]);

  const filterLabel = () => {
    const parts = [];
    if (activeCategories.length > 0) parts.push(activeCategories.join(", "));
    if (activeFloors.length > 0) parts.push(activeFloors.join(", "));
    return parts.length ? parts.join(" · ") : "All Stores";
  };

  const hasFilter = activeCategories.length > 0 || activeFloors.length > 0;

  const openFilter = () => {
    setPendingCategories([...activeCategories]);
    setPendingFloors([...activeFloors]);
    setShowFilter(true);
  };

  const applyFilter = () => {
    setActiveCategories([...pendingCategories]);
    setActiveFloors([...pendingFloors]);
    setShowFilter(false);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#F5F5F7", fontFamily: "'Inter', sans-serif" }}>

      {/* App Bar */}
      <div
        className="flex-shrink-0 flex items-center px-5"
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
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>Stores</span>
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 flex-shrink-0">
        <div className="flex-1 relative">
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
        </div>
        <button
          onClick={openFilter}
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            border: "1.5px solid #E4E4E7",
            background: hasFilter ? "#9728B8" : "#FAFAFA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <SlidersHorizontal size={18} style={{ color: hasFilter ? "#fff" : "#52525B" }} />
        </button>
      </div>

      {/* Results count */}
      <div className="px-5 pb-3 flex-shrink-0">
        <p style={{ fontSize: "14px", fontWeight: 700, color: "#0E0E10" }}>
          Showing {filtered.length} Store{filtered.length !== 1 ? "s" : ""}
        </p>
        <p style={{ fontSize: "12px", color: "#9728B8", marginTop: "2px" }}>
          {filterLabel()}
        </p>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div style={{ fontSize: "40px" }}>🏪</div>
            <p style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>No stores found</p>
            <p style={{ fontSize: "13px", color: "#52525B" }}>Try adjusting your filters</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
            }}
          >
            {filtered.map((shop) => (
              <button
                key={shop.id}
                onClick={() => router.push(`/explore/shops/${shop.id}`)}
                style={{
                  background: "#fff",
                  border: "1px solid #E4E4E7",
                  borderRadius: "16px",
                  padding: "12px 8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "14px",
                    overflow: "hidden",
                    background: "#F9F9F9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <Image
                    src={shop.logo}
                    alt={shop.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <span
                  className="text-center"
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "#0E0E10",
                    lineHeight: 1.3,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {shop.name}
                </span>
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: 600,
                    color: "#9728B8",
                    background: "rgba(151,40,184,0.08)",
                    borderRadius: "9999px",
                    padding: "2px 8px",
                  }}
                >
                  {shop.floor}
                </span>
              </button>
            ))}
          </div>
        )}
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
        <div className="flex justify-center pt-3 pb-4">
          <div style={{ width: "40px", height: "4px", borderRadius: "9999px", background: "#D4D4D8" }} />
        </div>
        <div className="flex items-center justify-between mb-5">
          <span style={{ fontSize: "17px", fontWeight: 700, color: "#0E0E10" }}>Filter</span>
          <button
            onClick={() => { setPendingCategories([]); setPendingFloors([]); }}
            style={{ fontSize: "13px", fontWeight: 600, color: "#9728B8" }}
          >
            Reset
          </button>
        </div>

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
                    border: "1.5px solid #0E0E10",
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
                    border: "1.5px solid #0E0E10",
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
    </div>
  );
}

export default function ShopsPage() {
  return (
    <Suspense fallback={<div className="h-full bg-white" />}>
      <ShopsContent />
    </Suspense>
  );
}

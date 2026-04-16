"use client";

import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Clock, MapPin } from "lucide-react";



type ShopData = {
  id: string;
  name: string;
  category: string;
  floor: string;
  logo: string;
  isOpen: boolean;
  hours: string;
  about: string;
  website?: string;
  banner?: string;
  gallery?: string[];
};

const SHOP_DATA: Record<string, ShopData> = {
  "odel-gf": {
    id: "odel-gf",
    name: "Odel",
    category: "Accessories",
    floor: "Ground Floor",
    logo: "/images/explore/Ground Floor/Accessories - Odel.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Odel is one of Sri Lanka's most iconic fashion and lifestyle brands, offering a curated selection of accessories, apparel, and lifestyle products. Discover the latest trends and timeless classics at Havelock City Mall.",
    banner: "/images/shops/Odel/banner.jpg",
    gallery: ["/images/shops/Odel/1.jpg", "/images/shops/Odel/2.jpg", "/images/shops/Odel/3.jpg", "/images/shops/Odel/4.jpg", "/images/shops/Odel/5.jpg", "/images/shops/Odel/6.jpeg"],
  },
  "cargills": {
    id: "cargills",
    name: "Cargills Food Hall",
    category: "Food and Beverages",
    floor: "Ground Floor",
    logo: "/images/explore/Ground Floor/Food and Beverages - Cargills Food Hall.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Cargills Food Hall brings you a world of fresh produce, gourmet groceries, and ready-to-eat meals. A one-stop food destination featuring local and international products under one roof.",
    banner: "/images/shops/cargills food hall/Banner.jpg",
    gallery: ["/images/shops/cargills food hall/1.jpg", "/images/shops/cargills food hall/2.jpg", "/images/shops/cargills food hall/3.jpg", "/images/shops/cargills food hall/4.jpg", "/images/shops/cargills food hall/5.jpg"],
  },
  "finch": {
    id: "finch",
    name: "Finch Foods",
    category: "Food and Beverages",
    floor: "Ground Floor",
    logo: "/images/explore/Ground Floor/Food and Beverages - Finch Foods.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Finch Foods offers a delightful range of artisan food products, snacks and gourmet treats. Quality ingredients, crafted with care for your everyday indulgence.",
  },
  "nuts": {
    id: "nuts",
    name: "Nuts & Murukku",
    category: "Food and Beverages",
    floor: "Ground Floor",
    logo: "/images/explore/Ground Floor/Food and Beverages - Nuts & Murukku.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Nuts & Murukku is your go-to destination for premium quality nuts, traditional Sri Lankan murukku, and a wide selection of savoury snacks. Perfect for gifting or everyday munching.",
  },
  "rancrisp": {
    id: "rancrisp",
    name: "Rancrisp Cashew",
    category: "Food and Beverages",
    floor: "Ground Floor",
    logo: "/images/explore/Ground Floor/Food and Beverages - Rancrisp Cashew.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Rancrisp Cashew specialises in premium Sri Lankan cashews — roasted, flavoured, and packed fresh. A beloved local brand delivering the finest nut products for gifting and snacking.",
  },
  "nailspa": {
    id: "nailspa",
    name: "Nail Spa",
    category: "Health & Beauty",
    floor: "Ground Floor",
    logo: "/images/explore/Ground Floor/Health & Beauty - Nail Spa.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Nail Spa offers professional nail care services in a relaxing and luxurious environment. From manicures and pedicures to nail art and gel treatments, indulge in a self-care experience.",
  },
  "titan": {
    id: "titan",
    name: "Titan",
    category: "Accessories",
    floor: "Level 1",
    logo: "/images/explore/Level 1/Accessories - Titan.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Titan is India's leading watch brand, bringing precision craftsmanship and contemporary design to Havelock City Mall. Explore their collection of timepieces, sunglasses, and accessories.",
  },
  "onceupon": {
    id: "onceupon",
    name: "Once Upon A Gift",
    category: "Books, Gifts & Novelties",
    floor: "Level 1",
    logo: "/images/explore/Level 1/Books, Gifts & Novelties - Once Upon A Gift.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Once Upon A Gift is a charming boutique offering thoughtfully curated gifts, greeting cards, stationery, and unique novelty items. Find the perfect present for every occasion.",
  },
  "shooting": {
    id: "shooting",
    name: "Shooting Arena",
    category: "Entertainment",
    floor: "Level 1",
    logo: "/images/explore/Level 1/Entertainment - Shooting Arena.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Shooting Arena offers an exciting entertainment experience for all ages. Test your aim, challenge your friends, and enjoy a fun-filled time at Havelock City Mall's premier shooting game zone.",
  },
  "miika": {
    id: "miika",
    name: "Miika",
    category: "Fashion",
    floor: "Level 1",
    logo: "/images/explore/Level 1/Fashion - Miika.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Miika is a contemporary fashion label celebrating modern Sri Lankan style. Featuring ready-to-wear collections that blend local craftsmanship with international trends.",
  },
  "cakery": {
    id: "cakery",
    name: "Cakery",
    category: "Food and Beverages",
    floor: "Level 1",
    logo: "/images/explore/Level 1/Food and Beverages - Cakery.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Cakery is where artisan baking meets creativity. From custom celebration cakes to everyday pastries, each creation is crafted with the finest ingredients and a whole lot of love.",
  },
  "wellnessfix": {
    id: "wellnessfix",
    name: "Wellnessfix",
    category: "Health & Beauty",
    floor: "Level 1",
    logo: "/images/explore/Level 1/Health & Beauty - Wellnessfix.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Wellnessfix is your complete wellness destination — offering supplements, health foods, personal care products, and expert advice to help you live your healthiest life.",
  },
  "abans-l1": {
    id: "abans-l1",
    name: "Abans",
    category: "Homeware",
    floor: "Level 1",
    logo: "/images/explore/Level 1/Homeware - Abans.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Abans offers a comprehensive range of home appliances and electronics. A trusted Sri Lankan brand known for quality, durability, and outstanding after-sales service.",
  },
  "singer-l1": {
    id: "singer-l1",
    name: "Singer",
    category: "Homeware",
    floor: "Level 1",
    logo: "/images/explore/Level 1/Homeware - Singer.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Singer is one of Sri Lanka's most trusted retailers for home appliances, electronics, and sewing machines. Bringing quality products and reliable service to every home.",
  },
  "flowers": {
    id: "flowers",
    name: "Flowers by M Ceylon",
    category: "Books, Gifts & Novelties",
    floor: "Level 2",
    logo: "/images/explore/Level 2/Books, Gifts & Novelties - Flowers by M Ceylon.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Flowers by M Ceylon is a premium floral studio offering bespoke arrangements, bouquets, and floral gifts. Whether for celebrations or corporate gifting, every arrangement tells a story.",
  },
  "abans-elec": {
    id: "abans-elec",
    name: "Abans",
    category: "Electronics & Lifestyle",
    floor: "Level 2",
    logo: "/images/explore/Level 2/Electronics & Lifestyle - Abans.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Abans Electronics on Level 2 specialises in the latest consumer electronics, smart home devices, and lifestyle gadgets — bringing cutting-edge technology to your fingertips.",
  },
  "istudio": {
    id: "istudio",
    name: "I Studio",
    category: "Electronics & Lifestyle",
    floor: "Level 2",
    logo: "/images/explore/Level 2/Electronics & Lifestyle - I Studio.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "I Studio is the authorised Apple reseller in Sri Lanka, offering the full range of Apple products including iPhone, iPad, Mac, Apple Watch, and accessories with expert in-store support.",
  },
  "singer-elec": {
    id: "singer-elec",
    name: "Singer",
    category: "Electronics & Lifestyle",
    floor: "Level 2",
    logo: "/images/explore/Level 2/Electronics & Lifestyle - Singer.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Singer Electronics on Level 2 offers the latest TVs, audio systems, and smart electronics. Explore their comprehensive range of home entertainment solutions.",
  },
  "coolplanet": {
    id: "coolplanet",
    name: "Cool Planet",
    category: "Fashion",
    floor: "Level 2",
    logo: "/images/explore/Level 2/Fashion - Cool Planet.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Cool Planet is Sri Lanka's leading fashion retailer for international brands and streetwear. Discover the latest collections from top global labels, all under one roof.",
  },
  "odel-l2": {
    id: "odel-l2",
    name: "Odel",
    category: "Fashion",
    floor: "Level 2",
    logo: "/images/explore/Level 2/Fashion - Odel.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Odel on Level 2 brings its signature curated fashion experience to the mall. Explore the latest collections in women's and men's fashion, accessories, and lifestyle products.",
  },
  "dunstans": {
    id: "dunstans",
    name: "Dunstans Barbers",
    category: "Health & Beauty",
    floor: "Level 2",
    logo: "/images/explore/Level 2/Health & Beauty - Dunstans Barbers.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Dunstans Barbers offers premium grooming services for the modern gentleman. Haircuts, beard trims, hot towel shaves and more — all delivered with precision and old-school charm.",
  },
  "dilshan": {
    id: "dilshan",
    name: "Dilshan Drape",
    category: "Homeware",
    floor: "Level 2",
    logo: "/images/explore/Level 2/Homeware - Dilshan Drape.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Dilshan Drape is your destination for premium soft furnishings, curtains, and home décor fabrics. Transform your living spaces with their exquisite range of materials and styles.",
  },
  "swarovski": {
    id: "swarovski",
    name: "Swarovski",
    category: "Accessories",
    floor: "Level 3",
    logo: "/images/explore/Level 3/Accessories - Swarovski.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Swarovski brings the magic of crystal to Havelock City Mall. Discover their iconic jewellery, figurines, and home accessories — each piece crafted with the brand's legendary precision.",
  },
  "dily": {
    id: "dily",
    name: "Dily & Carlo",
    category: "Fashion",
    floor: "Level 3",
    logo: "/images/explore/Level 3/Fashion - Dily & Carlo.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Dily & Carlo is an exclusive fashion boutique offering designer ready-to-wear and bespoke tailoring. Redefining Sri Lankan fashion with international sensibilities.",
  },
  "levis": {
    id: "levis",
    name: "Levi's",
    category: "Fashion",
    floor: "Level 3",
    logo: "/images/explore/Level 3/Fashion - Levis.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Levi's is the world's most iconic denim brand. Find the perfect pair of jeans and explore their collection of tops, jackets, and accessories that have defined style for generations.",
  },
  "lumbini": {
    id: "lumbini",
    name: "Lumbini Tea Valley",
    category: "Food and Beverages",
    floor: "Level 3",
    logo: "/images/explore/Level 3/Food and Beverages - Lumbini Tea Valley.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Lumbini Tea Valley celebrates the rich heritage of Sri Lankan tea. Explore their premium selection of single-origin teas, blends, and tea accessories — perfect for gifting or personal enjoyment.",
  },
  "fitness": {
    id: "fitness",
    name: "Fitness Factory",
    category: "Health & Beauty",
    floor: "Level 3",
    logo: "/images/explore/Level 3/Health & Beauty - Fitness Factory.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Fitness Factory is your premium gym and fitness destination. Equipped with state-of-the-art equipment, expert trainers, and a range of fitness classes to help you achieve your goals.",
  },
  "healthguard": {
    id: "healthguard",
    name: "Healthguard",
    category: "Health & Beauty",
    floor: "Level 3",
    logo: "/images/explore/Level 3/Health & Beauty - Healthguard.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Healthguard Pharmacy offers a comprehensive range of medicines, health supplements, and personal care products. Trusted by Sri Lankans for quality healthcare solutions and expert advice.",
  },
  "fireworks": {
    id: "fireworks",
    name: "Fireworks",
    category: "Homeware",
    floor: "Level 3",
    logo: "/images/explore/Level 3/Homeware - Fireworks.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Fireworks is a vibrant home décor and gifting store. Discover a dazzling array of home accessories, decorative items, candles, and unique gift solutions for every occasion.",
  },
  "avr": {
    id: "avr",
    name: "AVR",
    category: "Entertainment",
    floor: "Level 4",
    logo: "/images/explore/Level 4/Entertainment - AVR.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "AVR brings immersive entertainment experiences to Havelock City Mall. From virtual reality adventures to interactive gaming, AVR creates unforgettable moments for all ages.",
  },
  "scope": {
    id: "scope",
    name: "Scope Cinema",
    category: "Entertainment",
    floor: "Level 4",
    logo: "/images/explore/Level 4/Entertainment - Scope Cinema.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 11:00 PM",
    about: "Scope Cinema offers a premium movie-going experience at the top of Havelock City Mall. Featuring state-of-the-art screens, Dolby sound, and the latest blockbusters — cinema at its finest.",
  },
  "ancient": {
    id: "ancient",
    name: "Ancient Nutra",
    category: "Health & Beauty",
    floor: "Level 4",
    logo: "/images/explore/Level 4/Health & Beauty - Ancient Nutra.png",
    isOpen: true,
    hours: "Mon–Sun: 10:00 AM – 9:00 PM",
    about: "Ancient Nutra combines the wisdom of ancient wellness traditions with modern nutrition science. Explore their range of herbal supplements, Ayurvedic products, and natural health remedies.",
  },
};

const FLOOR_COLORS: Record<string, string> = {
  "Ground Floor": "#63DBAE",
  "Level 1": "#00C1E2",
  "Level 2": "#9728B8",
  "Level 3": "#FA5D3E",
  "Level 4": "#FED955",
};


// Placeholder hero colors per category
const CATEGORY_HERO: Record<string, string> = {
  "Accessories": "linear-gradient(135deg, #9728B8 0%, #F002AF 100%)",
  "Books, Gifts & Novelties": "linear-gradient(135deg, #014D98 0%, #00C1E2 100%)",
  "Electronics & Lifestyle": "linear-gradient(135deg, #00C1E2 0%, #014D98 100%)",
  "Entertainment": "linear-gradient(135deg, #FA5D3E 0%, #FED955 100%)",
  "Fashion": "linear-gradient(135deg, #F002AF 0%, #9728B8 100%)",
  "Food and Beverages": "linear-gradient(135deg, #FED955 0%, #FA5D3E 100%)",
  "Health & Beauty": "linear-gradient(135deg, #63DBAE 0%, #00C1E2 100%)",
  "Homeware": "linear-gradient(135deg, #FA9E1A 0%, #FED955 100%)",
};

export default function ShopDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();

  const shop = SHOP_DATA[id];

  if (!shop) {
    return (
      <div className="flex flex-col h-full bg-white items-center justify-center gap-3">
        <p style={{ fontSize: "16px", fontWeight: 600, color: "#0E0E10" }}>Store not found</p>
        <button
          onClick={() => router.back()}
          style={{ fontSize: "14px", color: "#9728B8", fontWeight: 600 }}
        >
          Go back
        </button>
      </div>
    );
  }

  const heroGradient = CATEGORY_HERO[shop.category] || "linear-gradient(135deg, #9728B8 0%, #F002AF 100%)";
  const floorColor = FLOOR_COLORS[shop.floor] || "#9728B8";

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
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10" }}>{shop.name}</span>
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-[192px]">
        {/* Hero Image */}
        <div
          style={{
            width: "100%",
            height: "200px",
            background: heroGradient,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {shop.banner && (
            <Image
              src={shop.banner}
              alt={shop.name}
              fill
              style={{ objectFit: "cover" }}
              unoptimized
            />
          )}
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              zIndex: 10,
            }}
          >
            <Image
              src={shop.logo}
              alt={shop.name}
              fill
              style={{ objectFit: "contain", padding: "8px" }}
            />
          </div>
        </div>

        {/* Brand Info Card */}
        <div
          className="mx-4"
          style={{
            background: "#fff",
            borderRadius: "20px",
            border: "1px solid #E4E4E7",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            padding: "16px",
            marginTop: "-28px",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#0E0E10", marginBottom: "4px" }}>
                {shop.name}
              </h1>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#9728B8",
                  background: "rgba(151,40,184,0.1)",
                  borderRadius: "9999px",
                  padding: "3px 10px",
                  display: "inline-block",
                  marginBottom: "10px",
                }}
              >
                {shop.category}
              </span>

              <div className="flex items-center gap-2 mb-2">
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "9999px",
                    background: shop.isOpen ? "#63DBAE" : "#DC2626",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: "13px", fontWeight: 600, color: shop.isOpen ? "#63DBAE" : "#DC2626" }}>
                  {shop.isOpen ? "Open Now" : "Closed"}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Clock size={13} style={{ color: "#52525B", flexShrink: 0 }} />
                <span style={{ fontSize: "12px", color: "#52525B" }}>{shop.hours}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={13} style={{ color: "#52525B", flexShrink: 0 }} />
                <span style={{ fontSize: "12px", color: "#52525B" }}>{shop.floor}, Havelock City Mall</span>
              </div>
            </div>

          </div>
        </div>

        {/* Photo Gallery */}
        {shop.gallery && shop.gallery.length > 0 && (
          <div className="pt-5 pb-2">
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10", paddingLeft: "16px", marginBottom: "12px" }}>
              Gallery
            </h2>
            <div
              className="flex gap-3 overflow-x-auto"
              style={{
                paddingLeft: "16px",
                paddingRight: "16px",
                paddingBottom: "4px",
                scrollbarWidth: "none",
              }}
            >
              {shop.gallery.map((image, i) => (
                <div
                  key={i}
                  style={{
                    flexShrink: 0,
                    width: "140px",
                    height: "100px",
                    borderRadius: "14px",
                    background: heroGradient,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Image
                    src={image}
                    alt={`${shop.name} ${i + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About Us */}
        <div className="px-4 pt-4 pb-4">
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10", marginBottom: "10px" }}>
            About Us
          </h2>
          <p style={{ fontSize: "13px", color: "#52525B", lineHeight: 1.6 }}>
            {shop.about}
          </p>
        </div>

        {/* Find Us */}
        <div className="px-4 pb-8">
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0E0E10", marginBottom: "12px" }}>
            Find Us
          </h2>
          <div
            style={{
              borderRadius: "20px",
              border: "1px solid #E4E4E7",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              background: "#F9F9F9",
            }}
          >
            {/* Vector Mall Map */}
            <div style={{ position: "relative" }}>
              <svg
                viewBox="0 0 360 200"
                width="100%"
                height="200"
                style={{ display: "block" }}
              >
                {/* Background */}
                <rect width="360" height="200" fill="#F1F1F1" />

                {/* Mall outline */}
                <rect x="40" y="15" width="280" height="170" rx="12" fill="#E4E4E7" stroke="#D4D4D8" strokeWidth="1.5" />

                {/* Floor levels (stacked representation) */}
                {["Ground Floor", "Level 1", "Level 2", "Level 3", "Level 4"].map((floor, i) => {
                  const y = 155 - i * 35;
                  const isActive = floor === shop.floor;
                  return (
                    <g key={floor}>
                      <rect
                        x="60"
                        y={y}
                        width="240"
                        height="28"
                        rx="6"
                        fill={isActive ? floorColor + "30" : "#fff"}
                        stroke={isActive ? floorColor : "#E4E4E7"}
                        strokeWidth={isActive ? "2" : "1"}
                      />
                      <text
                        x="90"
                        y={y + 18}
                        fontSize="10"
                        fontWeight={isActive ? "700" : "500"}
                        fill={isActive ? "#0E0E10" : "#B3B3B4"}
                        fontFamily="Inter, sans-serif"
                      >
                        {floor}
                      </text>

                      {/* Store label on active floor */}
                      {isActive && (
                        <text
                          x="240"
                          y={y + 18}
                          fontSize="10"
                          fontWeight="700"
                          fill={floorColor}
                          textAnchor="end"
                          fontFamily="Inter, sans-serif"
                        >
                          {shop.name}
                        </text>
                      )}

                      {/* Location dot on active floor */}
                      {isActive && (
                        <g>
                          <circle cx="265" cy={y + 14} r="7" fill={floorColor} />
                          <circle cx="265" cy={y + 14} r="3.5" fill="#fff" />
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* Entrance label */}
                <text x="178" y="194" fontSize="9" fill="#B3B3B4" textAnchor="middle" fontFamily="Inter, sans-serif">
                  Main Entrance
                </text>
                <line x1="140" y1="188" x2="218" y2="188" stroke="#D4D4D8" strokeWidth="1" strokeDasharray="3,2" />
              </svg>
            </div>

            {/* Floor badge */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ borderTop: "1px solid #E4E4E7" }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "9999px",
                  background: floorColor,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#0E0E10" }}>
                {shop.name}
              </span>
              <span style={{ fontSize: "12px", color: "#52525B" }}>·</span>
              <span style={{ fontSize: "12px", color: "#52525B" }}>{shop.floor}</span>
              <span style={{ fontSize: "12px", color: "#52525B" }}>· Havelock City Mall</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

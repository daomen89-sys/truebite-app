import React, { useState, useMemo, useEffect } from "react";
import {
  Home, ShoppingCart, Package, User, Search, ChevronLeft, Plus, Minus,
  CreditCard, Smartphone, Wallet, Check, Star, Filter, X, ShieldCheck,
  Truck, PawPrint, ArrowRight, MapPin, Clock
} from "lucide-react";

/* ---------------------------------------------------------------
   TOKENS
   pine  -> primary brand, trust, headers, nav
   broth -> wet food accent (warm amber-red, like gravy)
   kibble-> dry food accent (toasted amber-brown)
   linen -> light neutral background for shop/product surfaces
   bark  -> primary text
---------------------------------------------------------------- */
const C = {
  pine: "#1F3A2E",
  pineDeep: "#152B21",
  pineLight: "#2E4F3D",
  broth: "#C6572E",
  kibble: "#C68A33",
  linen: "#F2EEE2",
  card: "#FFFFFF",
  bark: "#26241E",
  barkSoft: "#63594B",
  line: "#E4DFCF",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,700;1,9..144,600&family=Work+Sans:wght@400;500;600;700&display=swap');
`;

/* ---------------------------------------------------------------
   PET PHOTOGRAPHY (placeholder imagery — swap for real TrueBite /
   licensed shoots before release)
   Sourced from placedog.net and cataas.com, both purpose-built
   free placeholder-image services for prototyping — safe to
   hotlink for demo builds; not a substitute for real product/brand
   photography in a shipped app.
---------------------------------------------------------------- */
const DOG_IMAGES = [
  "https://placedog.net/640/420?id=10",
  "https://placedog.net/640/420?id=25",
  "https://placedog.net/640/420?id=40",
  "https://placedog.net/640/420?id=63",
  "https://placedog.net/640/420?id=88",
  "https://placedog.net/640/420?id=54",
];
const CAT_IMAGES = [
  "https://cataas.com/cat/cute?width=640&height=420",
  "https://cataas.com/cat/orange?width=640&height=420",
  "https://cataas.com/cat/black?width=640&height=420",
  "https://cataas.com/cat/tabby?width=640&height=420",
  "https://cataas.com/cat/kitten?width=640&height=420",
  "https://cataas.com/cat?width=640&height=420",
];
const HERO_CAROUSEL = [DOG_IMAGES[0], CAT_IMAGES[0], DOG_IMAGES[2], CAT_IMAGES[3], DOG_IMAGES[4], CAT_IMAGES[4]];
const STORIES = [
  { label: "Puppies", img: DOG_IMAGES[2], pet: "dog" },
  { label: "Kittens", img: CAT_IMAGES[4], pet: "cat" },
  { label: "Senior Dogs", img: DOG_IMAGES[3], pet: "dog" },
  { label: "Indoor Cats", img: CAT_IMAGES[2], pet: "cat" },
  { label: "All Dogs", img: DOG_IMAGES[1], pet: "dog" },
  { label: "All Cats", img: CAT_IMAGES[0], pet: "cat" },
];

/* ---------------------------------------------------------------
   PRODUCT DATA (placeholder catalog — swap for real TrueBite
   products/photography before release)
---------------------------------------------------------------- */
const PRODUCTS = [
  { id: 1, pet: "dog", type: "dry", name: "Golden Ranch Chicken & Rice", weight: "3 kg", price: 899, mrp: 999, rating: 4.6, tag: "Bestseller", desc: "A protein-forward kibble built around farm-raised chicken and slow-cooked rice, formulated for everyday energy and a coat that shows it." },
  { id: 2, pet: "dog", type: "dry", name: "Highland Lamb Kibble", weight: "3 kg", price: 949, mrp: 1099, rating: 4.4, tag: "New", desc: "Single-protein lamb recipe for dogs with sensitive stomachs, gentle on digestion without compromising on taste." },
  { id: 3, pet: "dog", type: "dry", name: "Puppy Growth Formula", weight: "1.5 kg", price: 649, mrp: 749, rating: 4.8, tag: "Vet Recommended", desc: "Small, soft kibble sized for growing jaws, with DHA for brain development and calcium for strong early bones." },
  { id: 4, pet: "dog", type: "dry", name: "Senior Joint Care Kibble", weight: "3 kg", price: 999, mrp: 1149, rating: 4.5, tag: null, desc: "Glucosamine and chondroitin enriched formula to support mobility and joint comfort in older dogs." },
  { id: 5, pet: "dog", type: "wet", name: "Braised Beef Stew", weight: "400 g", price: 199, mrp: 229, rating: 4.7, tag: "Bestseller", desc: "Slow-braised beef chunks in a rich, savoury gravy — served as a topper or a complete meal." },
  { id: 6, pet: "dog", type: "wet", name: "Chicken & Pumpkin Pâté", weight: "400 g", price: 189, mrp: 219, rating: 4.5, tag: null, desc: "Smooth pâté-style texture blending real chicken with pumpkin for easy digestion and a gentle tummy." },
  { id: 7, pet: "dog", type: "wet", name: "Ocean Fish Gravy Mix", weight: "400 g", price: 209, mrp: 239, rating: 4.3, tag: null, desc: "Omega-rich ocean fish simmered in light gravy, formulated to support a glossy, healthy coat." },
  { id: 8, pet: "dog", type: "wet", name: "Turkey & Vegetable Casserole", weight: "400 g", price: 199, mrp: 229, rating: 4.6, tag: "New", desc: "Hearty turkey casserole with carrots and peas — a home-style recipe dogs return to bowl-first." },
  { id: 9, pet: "cat", type: "dry", name: "Tuna Harvest Kibble", weight: "1.2 kg", price: 549, mrp: 629, rating: 4.5, tag: "Bestseller", desc: "Ocean tuna kibble crafted for the finicky eater, with a crunch that also helps reduce tartar." },
  { id: 10, pet: "cat", type: "dry", name: "Kitten Starter Blend", weight: "1 kg", price: 499, mrp: 579, rating: 4.8, tag: "Vet Recommended", desc: "Nutrient-dense small-bite kibble to fuel a kitten's rapid early growth, with colostrum for immunity." },
  { id: 11, pet: "cat", type: "dry", name: "Indoor Hairball Care", weight: "1.2 kg", price: 579, mrp: 649, rating: 4.4, tag: null, desc: "Fibre-balanced formula for indoor cats, designed to naturally reduce hairball formation." },
  { id: 12, pet: "cat", type: "dry", name: "Salmon & Rice Adult", weight: "1.2 kg", price: 599, mrp: 679, rating: 4.6, tag: null, desc: "Salmon-first recipe with gentle rice carbohydrates, for lean muscle and a shine-forward coat." },
  { id: 13, pet: "cat", type: "wet", name: "Salmon Flake in Gravy", weight: "85 g", price: 79, mrp: 95, rating: 4.7, tag: "Bestseller", desc: "Delicate salmon flakes in a light gravy — the pouch cats hear opening from two rooms away." },
  { id: 14, pet: "cat", type: "wet", name: "Chicken Pâté Delight", weight: "85 g", price: 75, mrp: 89, rating: 4.5, tag: null, desc: "Silky pâté made with real chicken, gentle enough for daily feeding or as a mixer with kibble." },
  { id: 15, pet: "cat", type: "wet", name: "Tuna & Shrimp Medley", weight: "85 g", price: 85, mrp: 99, rating: 4.6, tag: "New", desc: "A coastal-style medley of tuna and shrimp in broth, high moisture to support hydration." },
  { id: 16, pet: "cat", type: "wet", name: "Duck Terrine", weight: "85 g", price: 89, mrp: 105, rating: 4.4, tag: null, desc: "A finer terrine texture built on duck, for cats who prefer their meals a little more refined." },
];

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

/* ---------------------------------------------------------------
   LOGO — badge mark: paw print with a heart-shaped main pad
   ("food made with care"), gradient pine badge, amber pad.
---------------------------------------------------------------- */
function Logo({ size = 34, mono = false }) {
  const reactId = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const wordColor = mono ? "#FFFFFF" : C.pine;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <defs>
          <linearGradient id={`badge-${reactId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#31543F" />
            <stop offset="100%" stopColor="#122720" />
          </linearGradient>
          <linearGradient id={`pad-${reactId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E29A50" />
            <stop offset="100%" stopColor="#C6572E" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="96" height="96" rx="27" fill={`url(#badge-${reactId})`} />
        <path d="M8 24 Q50 40 92 24 L92 30 Q50 45 8 30 Z" fill="#FFFFFF" opacity="0.05" />
        <circle cx="29" cy="35" r="8.2" fill="#FFFFFF" opacity="0.95" />
        <circle cx="45.5" cy="23.5" r="9.2" fill="#FFFFFF" opacity="0.95" />
        <circle cx="64.5" cy="23.5" r="9.2" fill="#FFFFFF" opacity="0.95" />
        <circle cx="81" cy="35" r="8.2" fill="#FFFFFF" opacity="0.95" />
        <path d="M50 79 C33 65 19 54 19 39 C19 26 30.5 19 41.5 26.5 C45.5 29.5 48.5 33.5 50 38.5 C51.5 33.5 54.5 29.5 58.5 26.5 C69.5 19 81 26 81 39 C81 54 67 65 50 79 Z" fill={`url(#pad-${reactId})`} />
      </svg>
      <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: size * 0.62, color: wordColor, letterSpacing: -0.5 }}>
        True<span style={{ color: C.broth, fontStyle: "italic" }}>Bite</span>
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------
   FLASH CAROUSEL — auto-advancing crossfade of dog/cat photography
---------------------------------------------------------------- */
function FlashCarousel({ images, height = 190 }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 3000);
    return () => clearInterval(t);
  }, [images.length]);
  return (
    <div style={{ position: "relative", height, borderRadius: "20px 20px 8px 8px", overflow: "hidden" }}>
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          loading={i === 0 ? "eager" : "lazy"}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            opacity: i === idx ? 1 : 0, transition: "opacity 1s ease",
          }}
        />
      ))}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(21,43,33,0) 45%, rgba(18,39,32,0.82) 100%)" }} />
      <div style={{ position: "absolute", bottom: 14, left: 16, color: "#fff" }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 600, fontSize: 15 }}>Fed with real food.</div>
        <div style={{ fontSize: 11, opacity: 0.85 }}>Every bowl, every breed.</div>
      </div>
      <div style={{ position: "absolute", bottom: 14, right: 14, display: "flex", gap: 5 }}>
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIdx(i)}
            style={{
              width: i === idx ? 16 : 6, height: 6, borderRadius: 3, cursor: "pointer",
              background: i === idx ? C.broth : "rgba(255,255,255,0.55)", transition: "all .3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   STORY STRIP — tappable circular pet photos, jumps into Shop
   filtered by pet type
---------------------------------------------------------------- */
function StoryStrip({ go, setPetFocus }) {
  return (
    <div style={{ display: "flex", gap: 16, padding: "4px 18px 6px", overflowX: "auto" }}>
      {STORIES.map((s, i) => (
        <div
          key={i}
          onClick={() => { setPetFocus(s.pet); go("shop", { petFilter: s.pet, typeFilter: "all" }); }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", flexShrink: 0, width: 60 }}
        >
          <div style={{
            width: 56, height: 56, borderRadius: "50%", padding: 2.5,
            background: `linear-gradient(135deg, ${C.broth}, ${C.kibble})`,
          }}>
            <img src={s.img} alt={s.label} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", border: "2px solid #F2EEE2", display: "block" }} />
          </div>
          <span style={{ fontSize: 9.5, fontWeight: 600, color: C.barkSoft, textAlign: "center", lineHeight: 1.2 }}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------
   SHARED BITS
---------------------------------------------------------------- */
function BowlCard({ children, style, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: C.card,
        borderRadius: "22px 22px 10px 10px",
        border: `1px solid ${C.line}`,
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        transition: "transform .15s ease, box-shadow .15s ease",
        ...style,
      }}
      onMouseEnter={(e) => { if (onClick) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(31,58,46,0.10)"; } }}
      onMouseLeave={(e) => { if (onClick) { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; } }}
    >
      {children}
    </div>
  );
}

function TypeTag({ type }) {
  const isWet = type === "wet";
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, letterSpacing: 0.3, textTransform: "uppercase",
      color: "#fff", background: isWet ? C.broth : C.kibble,
      padding: "3px 9px", borderRadius: 20,
    }}>
      {isWet ? "Wet" : "Dry"}
    </span>
  );
}

function ProductImage({ p, height = 140 }) {
  const isWet = p.type === "wet";
  const pool = p.pet === "dog" ? DOG_IMAGES : CAT_IMAGES;
  const photo = pool[p.id % pool.length];
  const wash = isWet
    ? `linear-gradient(160deg, ${C.broth}66, ${C.broth}33)`
    : `linear-gradient(160deg, ${C.kibble}66, ${C.kibble}33)`;
  return (
    <div style={{ height, position: "relative", overflow: "hidden" }}>
      <img src={photo} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <div style={{ position: "absolute", inset: 0, background: wash }} />
      <div style={{ position: "absolute", top: 10, left: 10 }}><TypeTag type={p.type} /></div>
      <PawPrint size={height * 0.16} color="#fff" strokeWidth={1.6} opacity={0.55} style={{ position: "absolute", bottom: 8, right: 8 }} />
      {p.tag && (
        <div style={{ position: "absolute", top: 10, right: 10, background: C.pine, color: "#fff", fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 20 }}>
          {p.tag}
        </div>
      )}
    </div>
  );
}

function Stars({ rating }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      <Star size={13} fill={C.kibble} color={C.kibble} />
      <span style={{ fontSize: 12, color: C.barkSoft, fontWeight: 600 }}>{rating}</span>
    </div>
  );
}

/* ---------------------------------------------------------------
   SCREENS
---------------------------------------------------------------- */
function HomeScreen({ go, petFocus, setPetFocus, addToCart }) {
  const featured = PRODUCTS.filter((p) => p.pet === petFocus).slice(0, 4);
  return (
    <div>
      {/* Hero */}
      <div style={{ background: `linear-gradient(150deg, ${C.pine}, ${C.pineDeep})`, padding: "22px 18px 26px", color: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <Logo mono size={30} />
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <User size={17} color="#fff" />
          </div>
        </div>
        <div style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 26, lineHeight: 1.25, marginBottom: 6 }}>
          Real food,<br />for real dogs & cats.
        </div>
        <div style={{ fontSize: 13.5, opacity: 0.8, marginBottom: 18, maxWidth: 280 }}>
          Dry kibble and wet meals, made with named proteins — nothing vague on the label.
        </div>
        {/* Pet toggle */}
        <div style={{ display: "flex", background: "rgba(255,255,255,0.1)", borderRadius: 30, padding: 4, width: 200 }}>
          {["dog", "cat"].map((pet) => (
            <button key={pet} onClick={() => setPetFocus(pet)} style={{
              flex: 1, border: "none", padding: "8px 0", borderRadius: 26, cursor: "pointer",
              background: petFocus === pet ? "#fff" : "transparent",
              color: petFocus === pet ? C.pine : "#fff",
              fontFamily: "'Work Sans', sans-serif", fontWeight: 600, fontSize: 13, textTransform: "capitalize",
              transition: "all .15s ease",
            }}>
              {pet === "dog" ? "🐾 Dogs" : "🐾 Cats"}
            </button>
          ))}
        </div>
      </div>

      {/* Flash carousel — auto-advancing dog/cat photography */}
      <div style={{ padding: "16px 18px 0" }}>
        <FlashCarousel images={HERO_CAROUSEL} />
      </div>

      {/* Story strip */}
      <div style={{ marginTop: 16 }}>
        <StoryStrip go={go} setPetFocus={setPetFocus} />
      </div>

      {/* Dry / Wet split */}
      <div style={{ display: "flex", gap: 12, padding: 18 }}>
        {["dry", "wet"].map((type) => (
          <div key={type} onClick={() => go("shop", { petFilter: petFocus, typeFilter: type })} style={{
            flex: 1, borderRadius: "20px 20px 8px 8px", padding: "18px 14px", cursor: "pointer",
            background: type === "dry" ? `${C.kibble}17` : `${C.broth}17`,
            border: `1px solid ${type === "dry" ? C.kibble + "40" : C.broth + "40"}`,
          }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 17, color: C.bark }}>
              {type === "dry" ? "Dry Food" : "Wet Food"}
            </div>
            <div style={{ fontSize: 11.5, color: C.barkSoft, marginTop: 3, marginBottom: 10 }}>
              {type === "dry" ? "Crunchy, complete kibble" : "Gravy, pâté & broth meals"}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: type === "dry" ? C.kibble : C.broth }}>
              Shop now <ArrowRight size={13} />
            </div>
          </div>
        ))}
      </div>

      {/* Trust strip */}
      <div style={{ display: "flex", justifyContent: "space-around", padding: "4px 18px 20px" }}>
        {[[ShieldCheck, "Vet Formulated"], [Truck, "Fast Delivery"], [PawPrint, "No Fillers"]].map(([Icon, label], i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, width: 80 }}>
            <Icon size={18} color={C.pine} />
            <span style={{ fontSize: 10.5, color: C.barkSoft, textAlign: "center", fontWeight: 500 }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Featured */}
      <div style={{ padding: "0 18px 90px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 18, color: C.bark }}>
            Picked for your {petFocus}
          </span>
          <span onClick={() => go("shop", { petFilter: petFocus, typeFilter: "all" })} style={{ fontSize: 12.5, color: C.pine, fontWeight: 600, cursor: "pointer" }}>See all</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {featured.map((p) => (
            <ProductCard key={p.id} p={p} onOpen={() => go("product", { productId: p.id })} onAdd={() => addToCart(p)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ p, onOpen, onAdd }) {
  return (
    <BowlCard onClick={onOpen}>
      <ProductImage p={p} height={110} />
      <div style={{ padding: "10px 11px 12px" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.bark, lineHeight: 1.3, marginBottom: 4, minHeight: 34 }}>{p.name}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: C.barkSoft }}>{p.weight}</span>
          <Stars rating={p.rating} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ fontWeight: 700, fontSize: 14.5, color: C.bark }}>{inr(p.price)}</span>{" "}
            <span style={{ fontSize: 11, color: C.barkSoft, textDecoration: "line-through" }}>{inr(p.mrp)}</span>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onAdd(); }} style={{
            width: 28, height: 28, borderRadius: "50%", border: "none", background: C.pine, color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}>
            <Plus size={15} />
          </button>
        </div>
      </div>
    </BowlCard>
  );
}

function ShopScreen({ go, back, petFilter, setPetFilter, typeFilter, setTypeFilter, addToCart }) {
  const list = useMemo(() => PRODUCTS.filter((p) =>
    (petFilter === "all" || p.pet === petFilter) && (typeFilter === "all" || p.type === typeFilter)
  ), [petFilter, typeFilter]);

  const Chip = ({ active, onClick, children }) => (
    <button onClick={onClick} style={{
      border: `1px solid ${active ? C.pine : C.line}`, background: active ? C.pine : "#fff",
      color: active ? "#fff" : C.barkSoft, borderRadius: 20, padding: "6px 13px", fontSize: 12.5,
      fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "'Work Sans', sans-serif",
    }}>{children}</button>
  );

  return (
    <div>
      <ScreenHeader title="Shop" onBack={back} />
      <div style={{ display: "flex", gap: 8, padding: "12px 18px", overflowX: "auto" }}>
        <Chip active={petFilter === "all"} onClick={() => setPetFilter("all")}>All Pets</Chip>
        <Chip active={petFilter === "dog"} onClick={() => setPetFilter("dog")}>Dogs</Chip>
        <Chip active={petFilter === "cat"} onClick={() => setPetFilter("cat")}>Cats</Chip>
        <div style={{ width: 1, background: C.line, margin: "2px 4px" }} />
        <Chip active={typeFilter === "all"} onClick={() => setTypeFilter("all")}>All Types</Chip>
        <Chip active={typeFilter === "dry"} onClick={() => setTypeFilter("dry")}>Dry</Chip>
        <Chip active={typeFilter === "wet"} onClick={() => setTypeFilter("wet")}>Wet</Chip>
      </div>
      <div style={{ padding: "6px 18px 100px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {list.length === 0 && <div style={{ gridColumn: "1/3", textAlign: "center", color: C.barkSoft, padding: 30, fontSize: 13 }}>No products match those filters yet.</div>}
        {list.map((p) => (
          <ProductCard key={p.id} p={p} onOpen={() => go("product", { productId: p.id })} onAdd={() => addToCart(p)} />
        ))}
      </div>
    </div>
  );
}

function ScreenHeader({ title, onBack, right }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 14px 6px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {onBack && (
          <button onClick={onBack} style={{ border: "none", background: C.linen, borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <ChevronLeft size={18} color={C.bark} />
          </button>
        )}
        <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 19, color: C.bark }}>{title}</span>
      </div>
      {right}
    </div>
  );
}

function ProductScreen({ productId, back, addToCart, go }) {
  const p = PRODUCTS.find((x) => x.id === productId);
  const [qty, setQty] = useState(1);
  if (!p) return null;
  return (
    <div style={{ paddingBottom: 100 }}>
      <ScreenHeader title="Product" onBack={back} />
      <div style={{ padding: "6px 18px" }}>
        <ProductImage p={p} height={200} />
        <div style={{ marginTop: 16, marginBottom: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 20, color: C.bark, lineHeight: 1.25, maxWidth: 240 }}>{p.name}</span>
          <Stars rating={p.rating} />
        </div>
        <div style={{ fontSize: 13, color: C.barkSoft, marginBottom: 14 }}>{p.weight} pack · {p.pet === "dog" ? "For dogs" : "For cats"}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 16 }}>
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 26, color: C.bark }}>{inr(p.price)}</span>
          <span style={{ fontSize: 14, color: C.barkSoft, textDecoration: "line-through" }}>{inr(p.mrp)}</span>
          <span style={{ fontSize: 12.5, color: "#2E8B57", fontWeight: 600 }}>{Math.round((1 - p.price / p.mrp) * 100)}% off</span>
        </div>
        <div style={{ height: 1, background: C.line, margin: "4px 0 16px" }} />
        <div style={{ fontWeight: 600, fontSize: 14, color: C.bark, marginBottom: 6 }}>About this recipe</div>
        <div style={{ fontSize: 13.5, color: C.barkSoft, lineHeight: 1.55, marginBottom: 20 }}>{p.desc}</div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.bark }}>Qty</span>
          <div style={{ display: "flex", alignItems: "center", border: `1px solid ${C.line}`, borderRadius: 24 }}>
            <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ border: "none", background: "none", width: 30, height: 30, cursor: "pointer" }}><Minus size={13} /></button>
            <span style={{ width: 24, textAlign: "center", fontWeight: 600 }}>{qty}</span>
            <button onClick={() => setQty(qty + 1)} style={{ border: "none", background: "none", width: 30, height: 30, cursor: "pointer" }}><Plus size={13} /></button>
          </div>
        </div>
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: 430, margin: "0 auto", background: "#fff", borderTop: `1px solid ${C.line}`, padding: 14, display: "flex", gap: 10 }}>
        <button onClick={() => { addToCart(p, qty); go("cart"); }} style={{
          flex: 1, background: C.pine, color: "#fff", border: "none", borderRadius: 14, padding: "13px 0",
          fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <ShoppingCart size={16} /> Add to cart · {inr(p.price * qty)}
        </button>
      </div>
    </div>
  );
}

function CartScreen({ cart, updateQty, removeItem, go, back }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal > 0 && subtotal < 499 ? 49 : 0;
  const total = subtotal + delivery;

  return (
    <div style={{ paddingBottom: cart.length ? 150 : 20 }}>
      <ScreenHeader title="Your Cart" onBack={back} />
      {cart.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 30px", color: C.barkSoft }}>
          <ShoppingCart size={40} color={C.line} style={{ marginBottom: 10 }} />
          <div style={{ fontWeight: 600, color: C.bark, marginBottom: 4 }}>Your bowl is empty</div>
          <div style={{ fontSize: 13 }}>Add some dry or wet food to get started.</div>
        </div>
      ) : (
        <div style={{ padding: "6px 18px" }}>
          {cart.map((item) => (
            <div key={item.id} style={{ display: "flex", gap: 10, padding: "12px 0", borderBottom: `1px solid ${C.line}` }}>
              <div style={{ width: 56, height: 56, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
                <ProductImage p={item} height={56} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.bark, marginBottom: 2 }}>{item.name}</div>
                <div style={{ fontSize: 11.5, color: C.barkSoft, marginBottom: 6 }}>{item.weight}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", border: `1px solid ${C.line}`, borderRadius: 20 }}>
                    <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ border: "none", background: "none", width: 24, height: 24, cursor: "pointer" }}><Minus size={11} /></button>
                    <span style={{ width: 18, textAlign: "center", fontSize: 12, fontWeight: 600 }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ border: "none", background: "none", width: 24, height: 24, cursor: "pointer" }}><Plus size={11} /></button>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 13.5, color: C.bark }}>{inr(item.price * item.qty)}</span>
                </div>
              </div>
              <button onClick={() => removeItem(item.id)} style={{ border: "none", background: "none", cursor: "pointer", alignSelf: "flex-start" }}><X size={15} color={C.barkSoft} /></button>
            </div>
          ))}

          <div style={{ marginTop: 16, background: C.linen, borderRadius: 16, padding: 14 }}>
            <Row label="Subtotal" value={inr(subtotal)} />
            <Row label="Delivery" value={delivery === 0 ? "Free" : inr(delivery)} valueColor={delivery === 0 ? "#2E8B57" : C.bark} />
            <div style={{ height: 1, background: C.line, margin: "8px 0" }} />
            <Row label="Total" value={inr(total)} bold />
          </div>
        </div>
      )}
      {cart.length > 0 && (
        <div style={{ position: "fixed", bottom: 64, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, boxSizing: "border-box", background: "#fff", borderTop: `1px solid ${C.line}`, padding: 14, boxShadow: "0 -2px 10px rgba(0,0,0,0.06)", zIndex: 15 }}>
          <button type="button" onClick={() => go("checkout")} style={{
            width: "100%", background: C.pine, color: "#fff", border: "none", borderRadius: 14, padding: "14px 0",
            fontWeight: 600, fontSize: 14.5, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            Proceed to checkout <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, bold, valueColor }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0" }}>
      <span style={{ fontSize: bold ? 14 : 13, color: bold ? C.bark : C.barkSoft, fontWeight: bold ? 700 : 500 }}>{label}</span>
      <span style={{ fontSize: bold ? 15 : 13, color: valueColor || (bold ? C.bark : C.bark), fontWeight: bold ? 700 : 600 }}>{value}</span>
    </div>
  );
}

function CheckoutScreen({ back, go, cart, address, setAddress }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal > 0 && subtotal < 499 ? 49 : 0;
  const total = subtotal + delivery;
  const [form, setForm] = useState(address);
  const valid = form.name && form.phone && form.line1 && form.pincode;

  return (
    <div style={{ paddingBottom: 100 }}>
      <ScreenHeader title="Delivery Address" onBack={back} />
      <div style={{ padding: "6px 18px" }}>
        {[
          ["name", "Full name"], ["phone", "Phone number"], ["line1", "Address, area"], ["city", "City"], ["pincode", "Pincode"],
        ].map(([key, label]) => (
          <div key={key} style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11.5, color: C.barkSoft, fontWeight: 600, display: "block", marginBottom: 4 }}>{label}</label>
            <input
              value={form[key] || ""}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              placeholder={label}
              style={{ width: "100%", border: `1px solid ${C.line}`, borderRadius: 10, padding: "11px 12px", fontSize: 13.5, fontFamily: "'Work Sans', sans-serif", boxSizing: "border-box" }}
            />
          </div>
        ))}

        <div style={{ background: C.linen, borderRadius: 16, padding: 14, marginTop: 6 }}>
          <Row label="Subtotal" value={inr(subtotal)} />
          <Row label="Delivery" value={delivery === 0 ? "Free" : inr(delivery)} valueColor={delivery === 0 ? "#2E8B57" : C.bark} />
          <div style={{ height: 1, background: C.line, margin: "8px 0" }} />
          <Row label="Total" value={inr(total)} bold />
        </div>
      </div>
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: 430, margin: "0 auto", background: "#fff", borderTop: `1px solid ${C.line}`, padding: 14 }}>
        <button disabled={!valid} onClick={() => { setAddress(form); go("payment"); }} style={{
          width: "100%", background: valid ? C.pine : C.line, color: valid ? "#fff" : C.barkSoft, border: "none", borderRadius: 14,
          padding: "14px 0", fontWeight: 600, fontSize: 14.5, cursor: valid ? "pointer" : "not-allowed",
        }}>
          Continue to payment
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   DUMMY PAYMENT GATEWAY
   Pure UI simulation of a checkout flow: pick a method, tap
   Proceed, watch a brief "processing" state, land on a randomly
   generated success confirmation. No real transaction, card, or
   bank data is collected, processed, transmitted, or stored.
---------------------------------------------------------------- */
const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", sub: "Pay via any UPI app", icon: Smartphone },
  { id: "credit", label: "Credit Card", sub: "Visa, Mastercard, RuPay", icon: CreditCard },
  { id: "debit", label: "Debit Card", sub: "Visa, Mastercard, RuPay", icon: CreditCard },
  { id: "wallet", label: "Wallets", sub: "Paytm, PhonePe, Amazon Pay", icon: Wallet },
];

function PaymentScreen({ back, go, total, placeOrder }) {
  const [method, setMethod] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleProceed = () => {
    if (!method || processing) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      // Randomized outcome — simulates a real gateway's success/decline split.
      // ~70% success, ~30% decline, purely for demoing both flows.
      const succeeded = Math.random() < 0.7;
      if (succeeded) {
        placeOrder(method);
        go("success");
      } else {
        const reasons = [
          "Your bank declined this transaction.",
          "Payment timed out — the gateway didn't respond in time.",
          "Insufficient balance for this transaction.",
          "Transaction cancelled — OTP verification failed.",
          "Your card issuer flagged this as a risky transaction.",
        ];
        const reason = reasons[Math.floor(Math.random() * reasons.length)];
        go("payment_failed", { failedMethod: method, failReason: reason });
      }
    }, 1500);
  };

  return (
    <div style={{ paddingBottom: 110 }}>
      <ScreenHeader title="Payment" onBack={back} />
      <div style={{ padding: "0 18px 6px" }}>
        <div style={{ background: "#FFF7E8", border: "1px solid #F0D9A0", borderRadius: 10, padding: "8px 11px", fontSize: 11.5, color: "#8A6414", marginBottom: 16, display: "flex", gap: 6, alignItems: "flex-start" }}>
          <ShieldCheck size={14} style={{ flexShrink: 0, marginTop: 1 }} />
          Sandbox gateway — this is a simulated checkout for demo purposes. No real payment is processed.
        </div>

        <div style={{ fontSize: 12.5, fontWeight: 600, color: C.barkSoft, marginBottom: 10 }}>Choose a payment method</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {PAYMENT_METHODS.map((m) => (
            <div key={m.id} onClick={() => setMethod(m.id)} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "13px 14px",
              border: `1.5px solid ${method === m.id ? C.pine : C.line}`,
              background: method === m.id ? `${C.pine}0D` : "#fff",
              borderRadius: 14, cursor: "pointer", transition: "all .12s ease",
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: method === m.id ? C.pine : C.linen,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <m.icon size={18} color={method === m.id ? "#fff" : C.barkSoft} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: C.bark }}>{m.label}</div>
                <div style={{ fontSize: 11, color: C.barkSoft, marginTop: 1 }}>{m.sub}</div>
              </div>
              <div style={{
                width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                border: `2px solid ${method === m.id ? C.pine : C.line}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {method === m.id && <div style={{ width: 9, height: 9, borderRadius: "50%", background: C.pine }} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, maxWidth: 430, margin: "0 auto", background: "#fff", borderTop: `1px solid ${C.line}`, padding: 14 }}>
        <button type="button" disabled={!method || processing} onClick={handleProceed} style={{
          width: "100%", background: (method && !processing) ? C.pine : C.line, color: (method && !processing) ? "#fff" : C.barkSoft,
          border: "none", borderRadius: 14, padding: "14px 0", fontWeight: 600, fontSize: 14.5,
          cursor: (method && !processing) ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          {processing ? (
            <>
              <span style={{
                width: 15, height: 15, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff",
                borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite",
              }} />
              Processing payment…
            </>
          ) : (
            `Proceed to pay ${inr(total)}`
          )}
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   PAYMENT FAILED — randomized decline outcome. Offers Retry
   (back to method selection) or falling back to Cash on Delivery.
---------------------------------------------------------------- */
function PaymentFailedScreen({ go, back, total, failedMethod, failReason, placeOrder }) {
  const methodLabel = PAYMENT_METHODS.find((m) => m.id === failedMethod)?.label || "your payment method";
  return (
    <div style={{ padding: "60px 24px", textAlign: "center" }}>
      <div style={{ width: 68, height: 68, borderRadius: "50%", background: "#FCE9E7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
        <X size={32} color="#C0392B" strokeWidth={2.5} />
      </div>
      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 21, color: C.bark, marginBottom: 6 }}>Payment failed</div>
      <div style={{ fontSize: 13.5, color: C.barkSoft, marginBottom: 4 }}>{failReason}</div>
      <div style={{ fontSize: 12, color: C.barkSoft, marginBottom: 22 }}>Attempted via {methodLabel} · {inr(total)}</div>

      <button type="button" onClick={() => go("payment")} style={{
        width: "100%", background: C.pine, color: "#fff", border: "none", borderRadius: 14, padding: "14px 0",
        fontWeight: 600, fontSize: 14.5, cursor: "pointer", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      }}>
        Retry payment
      </button>
      <button type="button" onClick={() => { placeOrder("cod"); go("success"); }} style={{
        width: "100%", background: "none", color: C.pine, border: `1.5px solid ${C.line}`, borderRadius: 14, padding: "14px 0",
        fontWeight: 600, fontSize: 14.5, cursor: "pointer", marginBottom: 10,
      }}>
        Pay via Cash on Delivery instead
      </button>
      <button type="button" onClick={back} style={{
        width: "100%", background: "none", color: C.barkSoft, border: "none", padding: "6px 0", fontSize: 13, cursor: "pointer",
      }}>
        Go back
      </button>
    </div>
  );
}

function SuccessScreen({ go, lastOrder }) {
  if (!lastOrder) return null;
  const isCod = lastOrder.methodLabel === "Cash on Delivery";
  return (
    <div style={{ padding: "60px 24px", textAlign: "center" }}>
      <div style={{ width: 68, height: 68, borderRadius: "50%", background: "#E7F5EC", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
        <Check size={32} color="#2E8B57" strokeWidth={2.5} />
      </div>
      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 21, color: C.bark, marginBottom: 6 }}>Order placed!</div>
      <div style={{ fontSize: 13.5, color: C.barkSoft, marginBottom: 22 }}>
        {isCod ? "Your order is confirmed — pay in cash when it arrives." : "Your pets' order is confirmed and on its way."}
      </div>
      <BowlCard style={{ padding: 16, textAlign: "left", marginBottom: 20 }}>
        <Row label="Order ID" value={lastOrder.id} bold />
        {!isCod && <Row label="Payment ref" value={lastOrder.refId} />}
        <Row label="Paid via" value={lastOrder.methodLabel} />
        <Row label={isCod ? "Amount due" : "Amount paid"} value={inr(lastOrder.total)} />
        <Row label="Est. delivery" value={lastOrder.eta} />
      </BowlCard>
      <button onClick={() => go("orders")} style={{ width: "100%", background: C.pine, color: "#fff", border: "none", borderRadius: 14, padding: "14px 0", fontWeight: 600, fontSize: 14.5, cursor: "pointer", marginBottom: 10 }}>
        Track order
      </button>
      <button onClick={() => go("home")} style={{ width: "100%", background: "none", color: C.pine, border: `1px solid ${C.line}`, borderRadius: 14, padding: "14px 0", fontWeight: 600, fontSize: 14.5, cursor: "pointer" }}>
        Continue shopping
      </button>
    </div>
  );
}

function OrdersScreen({ back, orders, go }) {
  return (
    <div style={{ paddingBottom: 30 }}>
      <ScreenHeader title="Your Orders" onBack={back} />
      {orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 30px", color: C.barkSoft }}>
          <Package size={40} color={C.line} style={{ marginBottom: 10 }} />
          <div style={{ fontWeight: 600, color: C.bark, marginBottom: 4 }}>No orders yet</div>
          <div style={{ fontSize: 13, marginBottom: 16 }}>Place your first order to see it here.</div>
          <button onClick={() => go("home")} style={{ background: C.pine, color: "#fff", border: "none", borderRadius: 12, padding: "10px 20px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Shop now</button>
        </div>
      ) : (
        <div style={{ padding: "6px 18px" }}>
          {orders.map((o) => (
            <BowlCard key={o.id} style={{ padding: 14, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: C.bark }}>{o.id}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#2E8B57", background: "#E7F5EC", padding: "2px 9px", borderRadius: 20 }}>{o.status}</span>
              </div>
              <div style={{ fontSize: 12, color: C.barkSoft, marginBottom: 4 }}>{o.items.length} item{o.items.length > 1 ? "s" : ""} · {inr(o.total)}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: C.barkSoft }}>
                <Clock size={12} /> {o.eta} · Paid via {o.methodLabel}
              </div>
            </BowlCard>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   APP SHELL
---------------------------------------------------------------- */
export default function App() {
  const [view, setView] = useState("home");
  const [params, setParams] = useState({});
  const [cart, setCart] = useState([]);
  const [petFocus, setPetFocus] = useState("dog");
  const [petFilter, setPetFilter] = useState("dog");
  const [typeFilter, setTypeFilter] = useState("all");
  const [address, setAddress] = useState({ name: "", phone: "", line1: "", city: "", pincode: "" });
  const [orders, setOrders] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);
  const history = React.useRef([]);

  const go = (v, p = {}) => {
    history.current.push(view);
    if (p.petFilter) setPetFilter(p.petFilter);
    if (p.typeFilter) setTypeFilter(p.typeFilter);
    setParams(p);
    setView(v);
    window.scrollTo?.(0, 0);
  };
  const back = () => {
    const prev = history.current.pop();
    setView(prev || "home");
    window.scrollTo?.(0, 0);
  };

  const addToCart = (product, qty = 1) => {
    setCart((c) => {
      const existing = c.find((i) => i.id === product.id);
      if (existing) return c.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      return [...c, { ...product, qty }];
    });
  };
  const updateQty = (id, qty) => {
    if (qty <= 0) return removeItem(id);
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty } : i)));
  };
  const removeItem = (id) => setCart((c) => c.filter((i) => i.id !== id));

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal > 0 && subtotal < 499 ? 49 : 0;
  const total = subtotal + delivery;

  const placeOrder = (method) => {
    const labels = { upi: "UPI", credit: "Credit Card", debit: "Debit Card", wallet: "Wallet", cod: "Cash on Delivery" };
    const etaOptions = ["Arriving in 2–3 days", "Arriving in 3–4 days", "Arriving tomorrow"];
    const order = {
      id: "TB" + Math.floor(100000 + Math.random() * 900000),
      refId: method === "cod" ? null : "PAY" + Math.random().toString(36).slice(2, 11).toUpperCase(),
      items: cart,
      total,
      methodLabel: labels[method],
      status: "Confirmed",
      eta: etaOptions[Math.floor(Math.random() * etaOptions.length)],
    };
    setOrders((o) => [order, ...o]);
    setLastOrder(order);
    setCart([]);
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const NavItem = ({ id, icon: Icon, label }) => {
    const active = view === id || (id === "home" && view === "product");
    return (
      <div onClick={() => go(id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", position: "relative", padding: "4px 10px" }}>
        <Icon size={19} color={active ? C.pine : C.barkSoft} strokeWidth={active ? 2.3 : 1.8} />
        {id === "cart" && cartCount > 0 && (
          <span style={{ position: "absolute", top: -2, right: 2, background: C.broth, color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: "50%", width: 15, height: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>
        )}
        <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? C.pine : C.barkSoft }}>{label}</span>
      </div>
    );
  };

  const showNav = ["home", "shop", "cart", "orders"].includes(view);

  return (
    <div style={{ background: "#EDEAE0", minHeight: "100vh", display: "flex", justifyContent: "center", fontFamily: "'Work Sans', sans-serif" }}>
      <style>{FONTS}{`
        * { box-sizing: border-box; }
        button { font-family: inherit; }
        input:focus { outline: 2px solid ${C.pine}33; border-color: ${C.pine}; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
      <div style={{ width: "100%", maxWidth: 430, background: C.linen, minHeight: "100vh", position: "relative", boxShadow: "0 0 40px rgba(0,0,0,0.08)" }}>
        {view === "home" && <HomeScreen go={go} petFocus={petFocus} setPetFocus={setPetFocus} addToCart={addToCart} />}
        {view === "shop" && <ShopScreen go={go} back={back} petFilter={petFilter} setPetFilter={setPetFilter} typeFilter={typeFilter} setTypeFilter={setTypeFilter} addToCart={addToCart} />}
        {view === "product" && <ProductScreen productId={params.productId} back={back} addToCart={addToCart} go={go} />}
        {view === "cart" && <CartScreen cart={cart} updateQty={updateQty} removeItem={removeItem} go={go} back={back} />}
        {view === "checkout" && <CheckoutScreen back={back} go={go} cart={cart} address={address} setAddress={setAddress} />}
        {view === "payment" && <PaymentScreen back={back} go={go} total={total} placeOrder={placeOrder} />}
        {view === "payment_failed" && <PaymentFailedScreen go={go} back={back} total={total} failedMethod={params.failedMethod} failReason={params.failReason} placeOrder={placeOrder} />}
        {view === "success" && <SuccessScreen go={go} lastOrder={lastOrder} />}
        {view === "orders" && <OrdersScreen back={back} orders={orders} go={go} />}

        {showNav && (
          <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, height: 64, boxSizing: "border-box", background: "#fff", borderTop: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "space-around", zIndex: 20 }}>
            <NavItem id="home" icon={Home} label="Home" />
            <NavItem id="shop" icon={Search} label="Shop" />
            <NavItem id="cart" icon={ShoppingCart} label="Cart" />
            <NavItem id="orders" icon={Package} label="Orders" />
          </div>
        )}
      </div>
    </div>
  );
}

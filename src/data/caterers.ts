export interface Caterer {
  id: string;
  name: string;
  address: string;
  area: string;
  postcode: string;
  dietary: "Pure Veg" | "Halal";
  specialty: string;
  price: string;
  phoneDisplay: string;
  whatsappNumber: string;
  cutoff: string;
  rating: string;
  delivery: string;
  logoUrl: string;
  initials: string;
  logoBg: string;
  collectionBadge: string;
  freeDeliveryBadge?: string;
  foundingBadge: string;
  defaultNote: string;
  defaultFlyerUrl: string;
}

export const CATERERS: Caterer[] = [
  {
    id: "bajibhai",
    name: "Bajibhai Catering",
    address: "Lake Street, BL3",
    area: "Lake Street",
    postcode: "BL3",
    dietary: "Pure Veg",
    specialty: "Legendary Gujarati Vegetarian & Thali",
    price: "£7.00",
    phoneDisplay: "07759 734202",
    whatsappNumber: "447759734202",
    cutoff: "11:30 AM",
    rating: "4.9 ★ (210+ orders)",
    delivery: "Bolton-wide delivery available",
    logoUrl: "/logos/bajibhai.svg",
    initials: "BC",
    logoBg: "bg-gradient-to-br from-amber-500 to-orange-700 text-white",
    collectionBadge: "BL3 Collection",
    freeDeliveryBadge: "Free Delivery over £25",
    foundingBadge: "⭐ Founding Caterer",
    defaultNote: "📢 Collection ready from 12:30 PM at Lake Street (BL3). Please place daily orders by 11:30 AM sharp. Weekly tiffin plans available on request via WhatsApp!",
    defaultFlyerUrl: "/flyers/bajibhai.jpeg",
  },
  {
    id: "royal-exotic",
    name: "Royal Exotic Catering",
    address: "Stewart Street, BL1",
    area: "Stewart Street",
    postcode: "BL1",
    dietary: "Halal",
    specialty: "Gujarati Wedding, Banquets & Daily Meals",
    price: "£8.00",
    phoneDisplay: "07970 178122",
    whatsappNumber: "447970178122",
    cutoff: "12:00 PM",
    rating: "4.9 ★ (190+ orders)",
    delivery: "Bolton delivery / Collection from Stewart St",
    logoUrl: "/logos/royal-exotic.svg",
    initials: "RE",
    logoBg: "bg-slate-900 text-amber-300 border border-amber-400/30",
    collectionBadge: "BL1 Collection",
    freeDeliveryBadge: "Free Delivery over £25",
    foundingBadge: "⭐ Founding Caterer",
    defaultNote: "📢 Hot takeaway collection from Stewart Street kitchen or Bolton delivery. 100% Halal certified. Caterer bookings & party tray orders open for this weekend!",
    defaultFlyerUrl: "/flyers/royal-exotic.jpeg",
  },
  {
    id: "al-hashmi",
    name: "Al-Hashmi's Kitchen",
    address: "BL3 / BL1, Bolton",
    area: "BL3 / BL1",
    postcode: "BL3",
    dietary: "Halal",
    specialty: "Authentic Surati Gujarati & Desi Tiffin",
    price: "£7.50",
    phoneDisplay: "07951 494016",
    whatsappNumber: "447951494016",
    cutoff: "11:45 AM",
    rating: "4.8 ★ (165+ orders)",
    delivery: "Free delivery to Deane, Great Lever & Heaton",
    logoUrl: "/logos/al-hashmi.svg",
    initials: "AH",
    logoBg: "bg-gradient-to-br from-emerald-700 to-teal-950 text-amber-200",
    collectionBadge: "BL1 / BL3 Collection",
    foundingBadge: "⭐ Founding Caterer",
    defaultNote: "📢 Free delivery to Deane, Great Lever & Heaton. Daily meal boxes prepared fresh each morning. Please message on WhatsApp with your address and quantity.",
    defaultFlyerUrl: "/flyers/al-hashmi.jpeg",
  },
];

export function getCatererById(id: string): Caterer | undefined {
  return CATERERS.find(
    (c) => c.id.toLowerCase() === id.toLowerCase() || c.id.replace(/-/g, "") === id.replace(/-/g, "")
  );
}

export function getStoredFlyer(catererId: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(`caterer_flyer_${catererId}`);
  } catch {
    return null;
  }
}

export function setStoredFlyer(catererId: string, dataUrl: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`caterer_flyer_${catererId}`, dataUrl);
  } catch (e) {
    console.error("Failed to save flyer to localStorage", e);
  }
}

export function removeStoredFlyer(catererId: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(`caterer_flyer_${catererId}`);
  } catch {
    // ignore
  }
}

export function getStoredNote(catererId: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(`caterer_note_${catererId}`);
  } catch {
    return null;
  }
}

export function setStoredNote(catererId: string, note: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`caterer_note_${catererId}`, note);
  } catch (e) {
    console.error("Failed to save note to localStorage", e);
  }
}

export function removeStoredNote(catererId: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(`caterer_note_${catererId}`);
  } catch {
    // ignore
  }
}

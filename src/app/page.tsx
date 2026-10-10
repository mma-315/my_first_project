"use client";

import { useState, useEffect } from "react";
import {
  CATERERS,
  Caterer,
  getStoredFlyer,
  getStoredNote,
} from "@/data/caterers";

// Authored SVG Icons replacing emoji tells
function LocationPinIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function DeliveryTruckIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.24-4.05a1 1 0 0 0-.78-.38H14v8h1" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  );
}

function CollectionBagIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function SearchZoomIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function PhoneCallIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function VerifiedCheckmarkIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function KitchenNoteIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CatererLogo({ caterer }: { caterer: Caterer }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xs tracking-wider border shrink-0 ${caterer.logoBg}`}
        aria-label={`${caterer.name} avatar`}
      >
        {caterer.initials}
      </div>
    );
  }

  return (
    <div className="relative w-12 h-12 shrink-0 rounded-xl overflow-hidden border border-stone-200/90 bg-stone-50 flex items-center justify-center p-1.5 shadow-2xs">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={caterer.logoUrl}
        alt={`${caterer.name} Logo`}
        className="w-full h-full object-contain"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState("Bolton");
  const [uploadedFlyers, setUploadedFlyers] = useState<{ [id: string]: string }>({});
  const [uploadedNotes, setUploadedNotes] = useState<{ [id: string]: string }>({});
  const [expandedFlyer, setExpandedFlyer] = useState<{
    caterer: Caterer;
    imageSrc: string;
    caption: string;
  } | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Sync uploaded flyers & announcements from localStorage
  useEffect(() => {
    const syncData = () => {
      const flyersMap: { [id: string]: string } = {};
      const notesMap: { [id: string]: string } = {};
      CATERERS.forEach((caterer) => {
        const storedFlyer = getStoredFlyer(caterer.id);
        if (storedFlyer) {
          flyersMap[caterer.id] = storedFlyer;
        }
        const storedNote = getStoredNote(caterer.id);
        if (storedNote !== null) {
          notesMap[caterer.id] = storedNote;
        }
      });
      setUploadedFlyers(flyersMap);
      setUploadedNotes(notesMap);
    };

    syncData();
    window.addEventListener("focus", syncData);
    return () => window.removeEventListener("focus", syncData);
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpandedFlyer(null);
        setIsZoomed(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getWhatsAppLink = (caterer: Caterer) => {
    const text = encodeURIComponent(
      `Hello ${caterer.name}! I saw your daily menu flyer on Bolton Caterers and would like to order.\n\n` +
      `Could you please confirm today's availability and collection/delivery details? Thank you!`
    );
    return `https://wa.me/${caterer.whatsappNumber}?text=${text}`;
  };

  const getActiveFlyerSrc = (caterer: Caterer) => {
    return uploadedFlyers[caterer.id] || caterer.defaultFlyerUrl;
  };

  const getActiveNote = (caterer: Caterer) => {
    if (uploadedNotes[caterer.id] !== undefined) {
      return uploadedNotes[caterer.id];
    }
    return caterer.defaultNote;
  };

  return (
    <div className="min-h-screen bg-[#EEF2F6] text-slate-900 pb-24 antialiased">
      {/* Top Editorial Masthead Bar */}
      <header className="border-b border-slate-200/90 bg-white/90 backdrop-blur-md sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-amber-300 flex items-center justify-center font-serif text-sm font-bold tracking-tighter">
              BC
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-tight text-slate-900 block leading-tight">
                Bolton Caterers
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold hidden sm:block">
                Daily Halal Kitchen Directory
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Location Selector */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 transition-colors">
              <LocationPinIcon className="w-3.5 h-3.5 text-slate-600" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-transparent font-semibold text-slate-900 cursor-pointer outline-hidden pr-0.5 text-xs"
                aria-label="Select location"
              >
                <option value="Bolton">Bolton (All Areas)</option>
                <option value="Preston" disabled className="text-slate-400">
                  Preston — Coming Soon
                </option>
                <option value="Blackburn" disabled className="text-slate-400">
                  Blackburn — Coming Soon
                </option>
                <option value="Bury" disabled className="text-slate-400">
                  Bury — Coming Soon
                </option>
              </select>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              Live Kitchens
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12">
        {/* Editorial Hero Header */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-slate-600 text-[11px] font-medium tracking-wide uppercase mb-3 border border-slate-200 shadow-2xs">
            <span>Direct Kitchen Ordering</span>
            <span>•</span>
            <span>Zero Platform Fees</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
            Fresh Menus & Daily Flyers
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2.5 font-medium leading-relaxed">
            Order freshly prepared Halal food
          </p>
        </div>

        {/* Kitchens Grid: Responsive 1 col (mobile) -> 2 cols (tablet) -> 3 cols (desktop) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {CATERERS.map((caterer) => {
            const flyerSrc = getActiveFlyerSrc(caterer);
            const activeNote = getActiveNote(caterer);
            const rawPhone = caterer.phoneDisplay.replace(/\s+/g, "");

            return (
              <article
                key={caterer.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Caterer Header */}
                  <div className="flex items-start gap-3.5 pb-3 border-b border-slate-100">
                    <CatererLogo caterer={caterer} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-serif text-lg font-bold text-slate-900 leading-snug">
                          {caterer.name}
                        </h2>
                        {/* Compact Founding Badge (Restored compact gold pill) */}
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 text-[10px] font-extrabold border border-amber-300 shadow-2xs shrink-0">
                          {caterer.foundingBadge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1">
                        <LocationPinIcon className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{caterer.address}</span>
                      </p>
                    </div>
                  </div>

                  {/* Logistics Badges: ALWAYS on the same single row */}
                  <div className="flex items-center gap-1.5 py-3 overflow-hidden text-[11px] whitespace-nowrap">
                    {caterer.freeDeliveryBadge && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/80 shrink-0 truncate">
                        <DeliveryTruckIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{caterer.freeDeliveryBadge}</span>
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-bold border border-slate-200/80 shrink-0 truncate">
                      <CollectionBagIcon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{caterer.collectionBadge}</span>
                    </span>
                  </div>

                  {/* Flyer Visual Frame */}
                  <div className="relative group rounded-xl overflow-hidden border border-stone-200/90 bg-stone-100 shadow-2xs">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedFlyer({
                          caterer,
                          imageSrc: flyerSrc,
                          caption: activeNote,
                        })
                      }
                      className="w-full text-left relative block focus:outline-hidden"
                      title="Enlarge daily menu flyer"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={flyerSrc}
                        alt={`${caterer.name} Menu Flyer`}
                        className="w-full h-84 sm:h-96 object-cover object-top group-hover:scale-[1.015] transition-transform duration-300 ease-out cursor-zoom-in"
                      />

                      {/* Tactile Overlay Pill */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-stone-900/80 hover:bg-stone-900 backdrop-blur-md text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap transition-all border border-white/15">
                        <SearchZoomIcon className="w-3.5 h-3.5" />
                        <span>Tap to zoom menu</span>
                      </div>
                    </button>
                  </div>

                  {/* Kitchen Announcements Note */}
                  {activeNote && (
                    <div className="mt-3.5 bg-amber-50/80 rounded-xl p-3.5 border border-amber-200/60">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1">
                        <KitchenNoteIcon className="w-3.5 h-3.5 text-amber-700" />
                        <span>Kitchen Dispatch & Specials</span>
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed font-normal whitespace-pre-line">
                        {activeNote}
                      </p>
                    </div>
                  )}
                </div>

                {/* Tactile Call-To-Action Row */}
                <div className="flex items-center gap-2.5 pt-4 mt-4 border-t border-stone-100">
                  <a
                    href={getWhatsAppLink(caterer)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#128C7E] hover:bg-[#075E54] active:scale-[0.99] text-white font-semibold py-3 px-4 rounded-xl shadow-xs flex items-center justify-center gap-2 text-xs sm:text-sm transition-all"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Order on WhatsApp</span>
                  </a>
                  {/* Direct Phone Dial Button */}
                  <a
                    href={`tel:${rawPhone}`}
                    className="inline-flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-200 active:bg-stone-300 text-stone-800 font-semibold py-3 px-3.5 rounded-xl border border-stone-200 text-xs sm:text-sm transition-all shrink-0"
                    title={`Call ${caterer.name} directly`}
                  >
                    <PhoneCallIcon className="w-4 h-4 text-stone-600" />
                    <span>Call</span>
                  </a>
                </div>
              </article>
            );
          })}
        </section>

        {/* Editorial Footer */}
        <footer className="mt-16 sm:mt-24 border-t border-stone-200/80 pt-10 pb-8 text-center text-xs text-stone-500 space-y-2">
          <p className="font-serif text-sm font-semibold text-stone-800">
            Bolton Caterers Directory
          </p>
          <p className="max-w-md mx-auto text-stone-500">
            Supporting independent halal kitchens across Lake Street (BL3), Stewart Street (BL1), Deane, Heaton & Great Lever.
          </p>
          <p className="text-[11px] text-stone-400 pt-2">
            Direct kitchen ordering • No markup fees • Real community food
          </p>
        </footer>
      </main>

      {/* Lightbox Modal: Full-screen overlay, native touch zoom & 2x toggle support */}
      {expandedFlyer && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm overflow-y-auto max-h-screen pt-20 pb-12 px-3 flex flex-col items-center justify-start animate-in fade-in duration-150"
          style={{ touchAction: "pan-x pan-y pinch-zoom" }}
          onClick={() => {
            setExpandedFlyer(null);
            setIsZoomed(false);
          }}
        >
          {/* Fixed Close Button: Clear of flyer header */}
          <button
            type="button"
            onClick={() => {
              setExpandedFlyer(null);
              setIsZoomed(false);
            }}
            className="fixed top-4 right-4 z-50 bg-stone-900/90 hover:bg-stone-800 text-white border border-white/20 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-xl transition-all"
            title="Close (Esc)"
          >
            ✕
          </button>

          {/* Header */}
          <div
            className="w-full max-w-2xl flex items-center justify-between text-white pb-3 pt-1 border-b border-white/10 shrink-0 mb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/20 bg-white p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={expandedFlyer.caterer.logoUrl}
                  alt={expandedFlyer.caterer.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold leading-tight">
                  {expandedFlyer.caterer.name}
                </h3>
                <p className="text-xs text-stone-400 flex items-center gap-1.5 mt-0.5">
                  <span>{expandedFlyer.caterer.address}</span>
                  <span>•</span>
                  <span>{expandedFlyer.caterer.phoneDisplay}</span>
                </p>
              </div>
            </div>

            {/* Floating Zoom Toggle Button in Header */}
            <button
              type="button"
              onClick={() => setIsZoomed((prev) => !prev)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                isZoomed
                  ? "bg-amber-400 text-stone-950 border-amber-300 shadow-md font-bold"
                  : "bg-white/15 hover:bg-white/25 text-white border-white/20"
              }`}
              title={isZoomed ? "Reset Size" : "2x Zoom"}
            >
              <span>{isZoomed ? "Reset Size" : "🔍 2x Zoom"}</span>
            </button>
          </div>

          {/* Modal Flyer Content: Natural top alignment, dvh bounds, scrollable container */}
          <div
            className="w-full max-w-2xl min-h-full flex flex-col justify-start items-center gap-4"
            style={{ touchAction: "pan-x pan-y pinch-zoom" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Scrollable image box allowing full navigation when scaled */}
            <div
              className={`w-full flex items-center justify-center transition-all ${
                isZoomed ? "overflow-auto max-h-[85vh] p-2" : ""
              }`}
              style={{ touchAction: "pan-x pan-y pinch-zoom" }}
              onClick={() => setIsZoomed((prev) => !prev)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={expandedFlyer.imageSrc}
                alt={`${expandedFlyer.caterer.name} Full Flyer`}
                className={`w-auto h-auto max-h-[75dvh] object-contain mx-auto rounded-lg shadow-2xl border border-white/10 select-none ${
                  isZoomed
                    ? "scale-[2] origin-top transition-transform duration-200 cursor-zoom-out my-12"
                    : "scale-100 cursor-zoom-in transition-transform duration-200"
                }`}
                style={{ touchAction: "pan-x pan-y pinch-zoom" }}
              />
            </div>

            {expandedFlyer.caption && (
              <div className="w-full bg-stone-900/90 border border-white/10 text-white rounded-xl p-3.5 text-xs sm:text-sm leading-relaxed max-w-xl">
                <span className="font-bold text-amber-300 block mb-1 text-xs">
                  Kitchen Announcement:
                </span>
                <p className="whitespace-pre-line text-stone-200">
                  {expandedFlyer.caption}
                </p>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div
            className="w-full max-w-xl pt-4 flex flex-col gap-2 shrink-0 mt-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <a
                href={getWhatsAppLink(expandedFlyer.caterer)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#128C7E] hover:bg-[#075E54] text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs sm:text-sm transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>
              <a
                href={`tel:${expandedFlyer.caterer.phoneDisplay.replace(/\s+/g, "")}`}
                className="bg-white/15 hover:bg-white/25 text-white font-semibold py-3.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors shrink-0"
              >
                <PhoneCallIcon className="w-4 h-4" />
                <span>Call Kitchen</span>
              </a>
            </div>
            <div className="text-center text-xs text-stone-400">
              <button
                type="button"
                onClick={() => {
                  setExpandedFlyer(null);
                  setIsZoomed(false);
                }}
                className="hover:text-white underline"
              >
                Close preview (or press Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

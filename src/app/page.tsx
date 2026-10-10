"use client";

import { useState, useEffect } from "react";
import {
  CATERERS,
  Caterer,
  getStoredFlyer,
  getStoredNote,
} from "@/data/caterers";

function CatererLogo({ caterer }: { caterer: Caterer }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shadow-2xs border border-white/20 shrink-0 ${caterer.logoBg}`}
        aria-label={`${caterer.name} avatar`}
      >
        {caterer.initials}
      </div>
    );
  }

  return (
    <div className="relative w-12 h-12 shrink-0 rounded-xl overflow-hidden shadow-xs border border-slate-200/90 bg-white flex items-center justify-center p-0.5">
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
      if (e.key === "Escape") setExpandedFlyer(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getWhatsAppLink = (caterer: Caterer) => {
    const text = encodeURIComponent(
      `Hello ${caterer.name}! I saw your menu flyer on Bolton Caterers and would like to order.\n\n` +
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
    <div
      className="min-h-screen bg-slate-100 text-slate-900 pb-16 antialiased"
      style={{ backgroundColor: "#f1f5f9" }}
    >
      {/* Mobile-first centered phone shell */}
      <main className="max-w-md mx-auto px-4 pt-6">
        {/* Top Header */}
        <header className="mb-6 text-center">
          {/* Location Selector Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-slate-800 text-xs font-bold border border-slate-200/90 shadow-2xs mb-2.5">
            <span className="text-sm">📍</span>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-transparent font-bold text-slate-900 cursor-pointer outline-hidden pr-1 text-xs"
              aria-label="Select location"
            >
              <option value="Bolton">Bolton</option>
              <option value="Preston" disabled className="text-slate-400">
                Preston (Coming Soon)
              </option>
              <option value="Blackburn" disabled className="text-slate-400">
                Blackburn (Coming Soon)
              </option>
              <option value="Bury" disabled className="text-slate-400">
                Bury (Coming Soon)
              </option>
            </select>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            Bolton Caterers
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
            Fresh menus and flyers from Bolton&apos;s halal kitchens
          </p>
        </header>

        {/* Public Feed Cards List */}
        <section className="space-y-5">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
            <span>
              {CATERERS.length} verified Bolton caterers
            </span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Daily Menus
            </span>
          </div>

          {CATERERS.map((caterer) => {
            const flyerSrc = getActiveFlyerSrc(caterer);
            const activeNote = getActiveNote(caterer);
            const rawPhone = caterer.phoneDisplay.replace(/\s+/g, "");

            return (
              <article
                key={caterer.id}
                className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3.5"
              >
                {/* Caterer Header: Logo, Name, Founding Badge, Address (sub-descriptions removed) */}
                <div className="flex items-start gap-3">
                  <CatererLogo caterer={caterer} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h2 className="text-base font-extrabold text-slate-900 leading-tight">
                        {caterer.name}
                      </h2>
                      {/* Founding Caterer Badge */}
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 text-[10px] font-extrabold border border-amber-300 shadow-2xs">
                        {caterer.foundingBadge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">
                      📍 {caterer.address}
                    </p>
                  </div>
                </div>

                {/* Logistical Badges: Free Delivery first, then Collection */}
                <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
                  {/* Free Delivery Badge (comes BEFORE collection) */}
                  {caterer.freeDeliveryBadge && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                      🚚 {caterer.freeDeliveryBadge}
                    </span>
                  )}

                  {/* Collection Badge */}
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-bold border border-slate-200/80">
                    🛍️ {caterer.collectionBadge}
                  </span>
                </div>

                {/* Flyer Thumbnail with Centered 'Tap to expand menu' Button */}
                <div className="relative group rounded-xl overflow-hidden border border-slate-200/90 bg-slate-100 shadow-2xs">
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
                    title="Tap to enlarge menu flyer"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={flyerSrc}
                      alt={`${caterer.name} Menu Flyer`}
                      className="w-full h-76 sm:h-80 object-cover object-top hover:scale-[1.01] transition-transform duration-200 cursor-zoom-in"
                    />

                    {/* Centered Menu Overlay Button */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 hover:bg-black/75 backdrop-blur-sm text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow flex items-center gap-1.5 whitespace-nowrap transition-colors">
                      <span>🔍</span>
                      <span>Tap to expand menu</span>
                    </div>
                  </button>
                </div>

                {/* Latest Update & Instructions */}
                {activeNote && (
                  <div className="bg-amber-50/70 rounded-xl p-3 border border-amber-100/90 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-900">
                      <span>💬</span>
                      <span>Latest Update & Instructions</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium whitespace-pre-line">
                      {activeNote}
                    </p>
                  </div>
                )}

                {/* Contact Actions: Side-by-Side WhatsApp CTA + Direct Tap-to-Dial Call Button */}
                <div className="flex items-center gap-2 pt-0.5">
                  <a
                    href={getWhatsAppLink(caterer)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold py-2.5 px-3.5 rounded-xl shadow-xs flex items-center justify-center gap-2 text-xs transition-all"
                  >
                    <svg
                      className="w-4 h-4 fill-current shrink-0"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>Order on WhatsApp</span>
                  </a>
                  {/* Tap-to-Dial Call Button */}
                  <a
                    href={`tel:${rawPhone}`}
                    className="inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 font-bold py-2.5 px-3 rounded-xl border border-slate-300 text-xs shadow-2xs transition-all shrink-0"
                    title={`Direct call to ${caterer.name}`}
                  >
                    <span className="text-sm">📞</span>
                    <span>Call</span>
                  </a>
                </div>
              </article>
            );
          })}
        </section>

        {/* Footer */}
        <footer className="mt-10 text-center text-[11px] text-slate-400 space-y-1">
          <p>Bolton Caterers Directory • Mobile-first WhatsApp Platform</p>
          <p className="text-slate-400/80">Lake Street (BL3) • Stewart Street (BL1) • Deane • Heaton</p>
        </footer>
      </main>

      {/* Tap-to-Expand Fullscreen Lightbox Modal */}
      {expandedFlyer && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-between p-4 animate-in fade-in duration-150"
          onClick={() => setExpandedFlyer(null)}
        >
          {/* Modal Header */}
          <div
            className="w-full max-w-md flex items-center justify-between text-white pb-3 pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-white/20 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={expandedFlyer.caterer.logoUrl}
                  alt={expandedFlyer.caterer.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm leading-tight">
                    {expandedFlyer.caterer.name}
                  </h3>
                  <span className="text-[10px] font-bold text-amber-300">
                    {expandedFlyer.caterer.foundingBadge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  {expandedFlyer.caterer.address} • 📞 {expandedFlyer.caterer.phoneDisplay}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setExpandedFlyer(null)}
              className="bg-white/20 hover:bg-white/30 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm transition-colors"
              title="Close"
            >
              ✕
            </button>
          </div>

          {/* Expanded Flyer Image Container */}
          <div
            className="relative flex-1 w-full max-w-md flex flex-col items-center justify-center overflow-auto my-auto gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={expandedFlyer.imageSrc}
              alt={`${expandedFlyer.caterer.name} Full Flyer`}
              className="max-h-[68vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
            />
            {expandedFlyer.caption && (
              <div className="w-full bg-slate-900/90 border border-slate-700/80 text-white rounded-xl p-3 text-xs leading-relaxed max-w-md">
                <span className="font-bold text-amber-400 block mb-0.5 text-[11px]">
                  📢 Announcement:
                </span>
                <p className="whitespace-pre-line text-slate-200">
                  {expandedFlyer.caption}
                </p>
              </div>
            )}
          </div>

          {/* Modal Bottom Contact CTA Row */}
          <div
            className="w-full max-w-md pt-3 flex flex-col gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <a
                href={getWhatsAppLink(expandedFlyer.caterer)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs"
              >
                <span>💬 Order on WhatsApp</span>
              </a>
              <a
                href={`tel:${expandedFlyer.caterer.phoneDisplay.replace(/\s+/g, "")}`}
                className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shrink-0"
              >
                <span>📞</span>
                <span>Call</span>
              </a>
            </div>
            <div className="flex justify-center items-center text-[11px] text-slate-400 px-1">
              <button
                type="button"
                onClick={() => setExpandedFlyer(null)}
                className="underline hover:text-white"
              >
                Close preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useId, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  getCatererById,
  getStoredFlyer,
  setStoredFlyer,
  removeStoredFlyer,
  getStoredNote,
  setStoredNote,
  removeStoredNote,
  CATERERS,
} from "@/data/caterers";

function UploadFlyerContent() {
  const fileInputId = useId();
  const noteInputId = useId();
  const params = useParams();
  const router = useRouter();
  const rawId = (params?.catererId as string) || "";
  const catererId = decodeURIComponent(rawId).toLowerCase();

  const caterer = getCatererById(catererId);
  const displayName = caterer ? caterer.name : formatCatererName(catererId);

  const [currentFlyer, setCurrentFlyer] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (catererId) {
      const storedFlyer = getStoredFlyer(catererId);
      setCurrentFlyer(storedFlyer);

      const storedNote = getStoredNote(catererId);
      if (storedNote !== null) {
        setAnnouncement(storedNote);
      } else if (caterer?.defaultNote) {
        setAnnouncement(caterer.defaultNote);
      }
    }
  }, [catererId, caterer]);

  function formatCatererName(id: string) {
    if (!id) return "Caterer";
    return id
      .split(/[-_]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    setIsSaved(false);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please select an image file (JPG, PNG, WebP).");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setErrorMsg("Image is too large. Please select an image under 8MB.");
      return;
    }

    setSelectedFile(file);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPreviewUrl(result);
      setIsProcessing(false);
    };
    reader.onerror = () => {
      setErrorMsg("Failed to read image. Please try again.");
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    try {
      // Save new flyer if selected
      if (previewUrl) {
        setStoredFlyer(catererId, previewUrl);
        setCurrentFlyer(previewUrl);
      }

      // Save announcement note
      setStoredNote(catererId, announcement.trim());

      setIsSaved(true);
      setErrorMsg(null);
    } catch {
      setErrorMsg(
        "Could not save to local storage. The photo might be too large; please try a smaller image."
      );
    }
  };

  const handleResetToDefault = () => {
    if (confirm("Reset flyer and announcement to default?")) {
      removeStoredFlyer(catererId);
      removeStoredNote(catererId);
      setCurrentFlyer(null);
      setPreviewUrl(null);
      setSelectedFile(null);
      setAnnouncement(caterer?.defaultNote || "");
      setIsSaved(false);
    }
  };

  const activeFlyerToDisplay = previewUrl || currentFlyer || caterer?.defaultFlyerUrl;

  return (
    <div
      className="min-h-screen bg-slate-100 text-slate-900 pb-20 antialiased"
      style={{ backgroundColor: "#f1f5f9" }}
    >
      <main className="max-w-xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        {/* Navigation bar */}
        <div className="flex items-center justify-between mb-5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs"
          >
            <span>←</span>
            <span>Back to Live Feed</span>
          </Link>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">
            Caterer Portal
          </span>
        </div>

        {/* Header */}
        <header className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs mb-5 text-center">
          <div className="inline-block p-3 rounded-2xl bg-amber-50 text-2xl mb-2 border border-amber-100">
            📸
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">
            Publish Menu & Announcement
          </h1>
          <p className="text-xs font-semibold text-emerald-700 mt-1">
            {displayName}
          </p>
          {caterer && (
            <p className="text-[11px] text-slate-500 mt-0.5">
              📍 {caterer.address} • 📞 {caterer.phoneDisplay}
            </p>
          )}
        </header>

        {/* Upload form box */}
        <section className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs mb-5 flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-0.5">
              1. Menu Flyer Photo
            </h2>
            <p className="text-xs text-slate-500">
              Select or take a photo of your latest flyer from your camera roll.
            </p>
          </div>

          {/* File Picker Button */}
          <div>
            <label
              htmlFor={fileInputId}
              className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50/80 hover:bg-emerald-50/40 rounded-2xl cursor-pointer transition-colors text-center group"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl mb-2 group-hover:scale-105 transition-transform">
                📷
              </div>
              <span className="text-xs font-bold text-slate-800">
                {selectedFile
                  ? "Change Selected Photo"
                  : activeFlyerToDisplay
                  ? "Upload New Flyer Photo"
                  : "Take Photo or Select Flyer"}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                Camera roll, JPG, PNG & WebP
              </span>
              <input
                id={fileInputId}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              ⚠️ {errorMsg}
            </div>
          )}

          {isProcessing && (
            <div className="p-4 text-center text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl animate-pulse">
              Processing image preview...
            </div>
          )}

          {/* Image Preview */}
          {activeFlyerToDisplay && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-700">
                  {previewUrl ? "New Selected Flyer Preview:" : "Currently Active Flyer:"}
                </span>
                {previewUrl && (
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Ready to Save
                  </span>
                )}
              </div>
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 max-h-[340px] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeFlyerToDisplay}
                  alt="Menu Flyer"
                  className="w-full h-auto object-contain max-h-[340px]"
                />
              </div>
              {previewUrl && (
                <button
                  type="button"
                  onClick={() => {
                    setPreviewUrl(null);
                    setSelectedFile(null);
                  }}
                  className="mt-2 text-[11px] text-rose-600 hover:text-rose-700 font-semibold underline"
                >
                  Discard this new photo
                </button>
              )}
            </div>
          )}

          {/* Announcement / Message Textarea */}
          <div className="border-t border-slate-100 pt-4">
            <label htmlFor={noteInputId} className="block text-sm font-bold text-slate-900 mb-0.5">
              2. Optional Announcement / Message
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Add details like collection times, today&apos;s special deals, or order cutoffs. Displayed like a WhatsApp post caption.
            </p>
            <textarea
              id={noteInputId}
              rows={3}
              value={announcement}
              onChange={(e) => {
                setAnnouncement(e.target.value);
                setIsSaved(false);
              }}
              placeholder="e.g. Hot thali ready for collection from 12:30 PM. Order cutoff 11:30 AM today! Weekly plans available."
              className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 outline-hidden transition-all leading-relaxed"
            />
          </div>

          {/* Publish Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleSave}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold py-3 px-4 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>✓</span>
              <span>Publish Flyer & Announcement</span>
            </button>
          </div>

          {/* Saved Status Banner */}
          {isSaved && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <span>🎉</span>
                <span>Published Successfully!</span>
              </div>
              <p className="text-[11px] text-emerald-800 mb-3">
                Your menu flyer and announcement are now live on the Bolton public feed.
              </p>
              <button
                type="button"
                onClick={() => router.push("/")}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 rounded-lg text-xs transition-colors"
              >
                View on Live Public Feed →
              </button>
            </div>
          )}

          {currentFlyer && (
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={handleResetToDefault}
                className="text-[11px] text-slate-400 hover:text-rose-600 underline"
              >
                Reset to default flyer & note
              </button>
            </div>
          )}
        </section>

        {/* Switch Caterer */}
        <section className="bg-white/80 rounded-2xl p-4 border border-slate-200 text-xs">
          <p className="font-bold text-slate-700 mb-2">
            Switch Caterer:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {CATERERS.map((c) => (
              <Link
                key={c.id}
                href={`/upload/${c.id}`}
                className={`px-3 py-1.5 rounded-lg font-medium text-xs border transition-colors ${
                  c.id === catererId
                    ? "bg-slate-900 text-white border-slate-900 font-bold"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default function UploadFlyerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-xs text-slate-500 font-medium">
          Loading caterer portal...
        </div>
      }
    >
      <UploadFlyerContent />
    </Suspense>
  );
}


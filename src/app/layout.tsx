import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bolton Caterers | Fresh Menus & Flyers",
  description: "Fresh menus and flyers from Bolton's halal kitchens.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f1f5f9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-slate-100" style={{ backgroundColor: "#f1f5f9" }}>
      <body
        className="min-h-full bg-slate-100 text-slate-900 antialiased selection:bg-amber-200"
        style={{ backgroundColor: "#f1f5f9" }}
      >
        {children}
      </body>
    </html>
  );
}

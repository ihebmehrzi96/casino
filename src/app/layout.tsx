import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { LocationProvider } from "@/context/LocationContext";
import { getCasinos } from "@/lib/data";

export const metadata: Metadata = {
  title: "CASINOVA® | Independent Casino Database & Live Safety Audits",
  description:
    "Independent online casino reviews, real safety index auditing, verified no-deposit bonuses, free spins, and software provider directory.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const casinos = await getCasinos();

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#090A0E] text-white antialiased selection:bg-white selection:text-black">
        <LanguageProvider>
          <LocationProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </LocationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { getCategories, getProducts } from "@/lib/api";
import "./globals.css";

const bengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর | নিত্যপণ্যের আজকের দাম",
  description:
    "বাংলাদেশের চাল, ডাল, তেল, সবজি, মাছ, মাংস ও মসলার আজকের বাজার দর ট্র্যাক করুন।",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [categories, products] = await Promise.all([
    getCategories().catch(() => []),
    getProducts().catch(() => []),
  ]);

  return (
    <html lang="bn" className={`${bengali.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <Providers>
          <Navbar categories={categories} products={products} />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

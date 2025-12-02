import type { Metadata } from "next";
import { Anton } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const anton = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const cotham = localFont({
  src: "../../assets/fonts/CothamSans.otf",
  variable: "--font-body",
  weight: "400",
});

const siteTitle = "Alex Magee | Product, Growth & Automation";
const siteDescription =
  "Product, growth, and automation for brands and systems that actually ship.";

export const metadata: Metadata = {
  metadataBase: new URL("https://alex-magee.com"),
  title: {
    default: siteTitle,
    template: "%s | Alex Magee",
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Alex Magee",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${anton.variable} ${cotham.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <div className="cv-shell">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

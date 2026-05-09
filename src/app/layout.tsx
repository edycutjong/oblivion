import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oblivion | Cross-Chain Dark Pool",
  description: "Institutional cross-chain dark pool leveraging Encrypt and Ika SDKs.",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Oblivion | Cross-Chain Dark Pool",
    description: "Institutional cross-chain dark pool leveraging Encrypt and Ika SDKs.",
    url: "https://encrypt-ika.vercel.app",
    siteName: "Oblivion",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Oblivion | Cross-Chain Dark Pool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oblivion | Cross-Chain Dark Pool",
    description: "Institutional cross-chain dark pool leveraging Encrypt and Ika SDKs.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-slate-950 text-slate-50 min-h-screen selection:bg-cyan-500/30`}
      >
        {children}
      </body>
    </html>
  );
}

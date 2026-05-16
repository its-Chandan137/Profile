import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://myportfolio137.netlify.app"),
  title: "Chandan Swarnakar | Frontend Developer",
  description:
    "Frontend Developer portfolio of Chandan Swarnakar, specializing in React, Angular, Three.js, real-time interfaces, and production-ready web apps.",
  openGraph: {
    title: "Chandan Swarnakar | Frontend Developer",
    description:
      "React, Angular, and Three.js portfolio featuring production projects across government, healthcare, construction, and SaaS domains.",
    url: "https://myportfolio137.netlify.app",
    siteName: "Chandan Swarnakar Portfolio",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Chandan Swarnakar Frontend Developer Portfolio"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Chandan Swarnakar | Frontend Developer",
    description:
      "Frontend Developer building polished React, Angular, and Three.js web experiences.",
    images: ["/og-image.svg"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-night font-body text-white antialiased`}>
        <div className="cursor-glow" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Quicksand } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Playful Gradient | Make Something Amazing Together ✨",
  description: "A vibrant, gradient-driven homepage template designed to delight and engage visitors with colorful gradients, smooth animations, and friendly interactions.",
  keywords: "gradient, homepage, template, react, nextjs, vibrant, colorful, animated, modern, playful",
  authors: [{ name: "GitHub Copilot" }],
  creator: "GitHub Copilot",
  openGraph: {
    title: "Playful Gradient | Make Something Amazing Together ✨",
    description: "A vibrant, gradient-driven homepage template designed to delight and engage visitors.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Playful Gradient | Make Something Amazing Together ✨",
    description: "A vibrant, gradient-driven homepage template designed to delight and engage visitors.",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${quicksand.variable} font-inter antialiased bg-gradient-to-br from-slate-50 to-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}

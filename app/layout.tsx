import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Mynt - Online Fashion Shopping",
  description: "India's Fashion Expert - Shop for Men, Women, Kids fashion online. Best deals on clothing, footwear, accessories with free shipping.",
  keywords: ["fashion", "online shopping", "clothing", "shoes", "accessories", "men", "women", "kids"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

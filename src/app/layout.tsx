import "./globals.css";
import type { Metadata } from "next";
import { Inter, Ubuntu_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ubuntoMono = Ubuntu_Mono({ subsets: ["latin"], weight: "400", variable: "--font-ubuntu" });

export const metadata: Metadata = {
  title: "askSQL",
  description:
    "SQL translation web app, able to receive a schema and tranlate natural language questions to SQL queries",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${ubuntoMono.variable}`}>
      <body className="bg-blueberry-900">{children}</body>
    </html>
  );
}

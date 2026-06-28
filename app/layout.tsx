import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; 

const prompt = Prompt({ 
  weight: ['300', '400', '500', '600', '700'], 
  subsets: ["thai", "latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "JCC_TK SAFETY - ระบบตรวจสอบสภาพรถ",
  description: "Truck Inspection Checklist Application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={`${prompt.className} antialiased bg-slate-50`}>
        <Navbar />
        <div className="min-h-[calc(100vh-64px)]">
            {children}
        </div>
      </body>
    </html>
  );
}
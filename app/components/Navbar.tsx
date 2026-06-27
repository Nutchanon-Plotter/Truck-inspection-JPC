"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Truck, LayoutDashboard, Home, ClipboardCheck } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-[100] w-full bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-slate-900 p-1.5 rounded-lg group-hover:bg-emerald-600 transition-colors">
              <Truck size={20} className="text-white" />
            </div>
            <span className="font-bold text-slate-900 tracking-tight text-lg">FLEET SAFETY</span>
          </Link>

          <div className="flex items-center gap-1 md:gap-4">
            <NavLink href="/" active={isActive("/")} icon={<Home size={18} />} label="หน้าแรก" />
            <NavLink href="/dashboard" active={isActive("/dashboard")} icon={<LayoutDashboard size={18} />} label="สรุปผล" />
            
            {pathname !== "/form" && (
                <Link href="/" className="ml-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-100">
                    <ClipboardCheck size={18} />
                    <span className="hidden md:inline">ตรวจสภาพรถ</span>
                </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, active, icon, label }: { href: string; active: boolean; icon: any; label: string }) {
  return (
    <Link href={href} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${active ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
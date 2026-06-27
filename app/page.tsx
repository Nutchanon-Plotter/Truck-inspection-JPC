"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();

  const handleStart = () => {
    if (!firstName || !lastName) {
      alert("กรุณากรอกชื่อและนามสกุล");
      return;
    }
    router.push(`/form?fname=${encodeURIComponent(firstName)}&lname=${encodeURIComponent(lastName)}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">ตรวจสภาพรถประจำวัน</h1>
        <div className="space-y-4">
          <input 
            type="text" placeholder="ชื่อ" value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-black bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input 
            type="text" placeholder="นามสกุล" value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-black bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button 
            onClick={handleStart}
            className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition-all active:scale-95"
          >
            เริ่มการตรวจสอบ
          </button>
        </div>
      </div>
    </main>
  );
}
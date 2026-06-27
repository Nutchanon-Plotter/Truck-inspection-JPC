"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { db } from "../../lib/firebase"; 
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";

const criteriaList = [
  "1. ห้องโดยสารสะอาด ไม่มีวัตถุที่สามารถกลิ้งไปมาได้", "2. กระจกหน้าและข้างไม่มีสิ่งบดบัง",
  "3. ไฟหน้า ไฟสูง/ต่ำ ทำงานปกติ", "4. ไฟเลี้ยวซ้าย/ขวา ทำงานปกติ",
  "5. ไฟเบรกทำงานปกติ", "6. ไฟถอยหลังและสัญญาณเตือนถอย ทำงานปกติ",
  "7. เสียงแตรดัง", "8. ที่ปัดน้ำฝนทำงานปกติและฉีดน้ำได้",
  "9. เบาะนั่งไม่มีรอยฉีกขาดและยึดติดมั่นคง", "10. ระบบ GPS ทำงานปกติ",
  "11. กล้องหน้ารถทำงานและบันทึกได้", "12. ไม่มีรอยรั่วซึมของน้ำมันต่างๆ",
  "13. มีชุดอุปกรณ์ฉุกเฉินครบถ้วน", "14. หมอนหนุนล้อรถ 2 อัน",
  "15. มีแผ่นยางรองกันลื่นพื้นเหยียบ", "16. ล้อ/ยาง น็อตล้อ ดุมล้อปกติ",
  "17. บันไดและราวจับมั่นคง", "18. ดอกยางหน้าลึกมากกว่า 2mm",
  "19. มีเอกสารตรวจสภาพรถ/ประกัน", "20. มีสติ๊กเกอร์ผ่านการตรวจสอบรถประจำปี"
];

function FormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const inspectorName = `${searchParams.get("fname")} ${searchParams.get("lname")}`;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [failCount, setFailCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const truckNo = formData.get("truckNo") as string;
      const transportName = formData.get("transportName") as string;

      const results = criteriaList.map((c, i) => ({
        criteria: c,
        status: formData.get(`eval_${i}`),
        remark: formData.get(`remark_${i}`) || ""
      }));

      const hasFailed = results.some(item => item.status === "no");
      let currentFailNo = 0;

      if (hasFailed) {
        const q = query(collection(db, "truck_inspections"), where("truckNo", "==", truckNo), where("isFailed", "==", true));
        const snap = await getDocs(q);
        currentFailNo = snap.size + 1;
      }

      await addDoc(collection(db, "truck_inspections"), {
        inspectorName, truckNo, transportName,
        checklist: results,
        isFailed: hasFailed,
        failCount: hasFailed ? currentFailNo : 0,
        createdAt: serverTimestamp()
      });

      if (hasFailed) {
        setFailCount(currentFailNo);
        setShowWarning(true);
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8 text-black">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-slate-900 text-white p-8">
          <h1 className="text-2xl font-bold">AID - Truck Inspection Checklist</h1>
          <p className="opacity-70">ผู้ตรวจ: {inspectorName}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <input name="transportName" required placeholder="ชื่อบริษัทขนส่ง" className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" />
            <input name="truckNo" required placeholder="หมายเลขทะเบียนรถ" className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-4 text-left w-1/2">หัวข้อการตรวจสอบ</th>
                  <th className="p-4 text-center bg-emerald-50 text-emerald-700">YES</th>
                  <th className="p-4 text-center bg-rose-50 text-rose-700">NO</th>
                  <th className="p-4 text-center bg-amber-50 text-amber-700">NA</th>
                  <th className="p-4">หมายเหตุ</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {criteriaList.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-4">{c}</td>
                    <td className="p-4 text-center"><input type="radio" name={`eval_${i}`} value="yes" required className="w-5 h-5 accent-emerald-500" /></td>
                    <td className="p-4 text-center"><input type="radio" name={`eval_${i}`} value="no" className="w-5 h-5 accent-rose-500" /></td>
                    <td className="p-4 text-center"><input type="radio" name={`eval_${i}`} value="na" className="w-5 h-5 accent-amber-500" /></td>
                    <td className="p-4"><input name={`remark_${i}`} className="w-full border-b bg-transparent" placeholder="..." /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button type="submit" disabled={isSubmitting} className="mt-8 w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all">
            {isSubmitting ? "กำลังบันทึกข้อมูล..." : "ยืนยันและส่งรายงาน"}
          </button>
        </form>
      </div>

      {/* SUCCESS POPUP */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl transform scale-100 transition-transform">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">สำเร็จ!</h2>
            <p className="text-slate-500 mb-8">บันทึกข้อมูลเรียบร้อยแล้ว</p>
            <button onClick={() => router.push("/")} className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl">กลับหน้าแรก</button>
          </div>
        </div>
      )}

      {/* WARNING POPUP */}
      {showWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-900/60 backdrop-blur-sm text-black">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border-t-8 border-red-500">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-3xl italic">!</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">พบข้อบกพร่อง!</h2>
            <div className="bg-red-50 p-4 rounded-2xl mb-6">
                <p className="font-bold">ตรวจไม่ผ่านเป็นครั้งที่: {failCount}</p>
            </div>
            <button onClick={() => router.push("/")} className="w-full bg-slate-800 text-white font-bold py-4 rounded-2xl">รับทราบและดำเนินการแก้ไข</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default function Page() { return <Suspense><FormContent /></Suspense>; }
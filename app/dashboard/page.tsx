"use client";
import { useEffect, useState, useMemo } from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Calendar, Truck, AlertCircle, CheckCircle2 } from "lucide-react";

const COLORS = ["#10b981", "#ef4444"];

export default function Dashboard() {
  const [rawDocs, setRawDocs] = useState<any[]>([]);
  const [filterType, setFilterType] = useState<"day"|"month"|"year">("day");
  const [selectedLog, setSelectedLog] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "truck_inspections"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setRawDocs(snap.docs.map(doc => ({ ...doc.data(), id: doc.id, jsDate: doc.data().createdAt?.toDate() || new Date() })));
    };
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    const now = new Date();
    return rawDocs.filter(d => {
      const dd = d.jsDate;
      if (filterType === "day") return dd.toDateString() === now.toDateString();
      if (filterType === "month") return dd.getMonth() === now.getMonth() && dd.getFullYear() === now.getFullYear();
      return dd.getFullYear() === now.getFullYear();
    });
  }, [rawDocs, filterType]);

  const chartData = [
    { name: "ผ่าน", value: filtered.filter(d => !d.isFailed).length },
    { name: "ไม่ผ่าน", value: filtered.filter(d => d.isFailed).length }
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-8 text-black">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold flex items-center gap-2 italic"><Calendar className="text-emerald-500"/> FLEET SAFETY DASHBOARD</h1>
          <div className="bg-white p-1 rounded-xl shadow-sm flex border">
            {["day", "month", "year"].map((t: any) => (
              <button key={t} onClick={() => setFilterType(t)} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${filterType === t ? "bg-slate-900 text-white" : "text-slate-400"}`}>
                {t === "day" ? "วันนี้" : t === "month" ? "เดือนนี้" : "ปีนี้"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="ตรวจทั้งหมด" value={filtered.length} icon={<Truck className="text-blue-500"/>}/>
          <StatCard title="ผ่านเกณฑ์" value={chartData[0].value} icon={<CheckCircle2 className="text-emerald-500"/>}/>
          <StatCard title="ไม่ผ่านเกณฑ์" value={chartData[1].value} icon={<AlertCircle className="text-rose-500"/>}/>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border h-[450px] flex flex-col items-center">
            <h3 className="font-bold mb-4 self-start">สัดส่วนความพร้อมใช้งาน</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value" animationDuration={1000}>
                  {chartData.map((_, i) => <Cell key={i} fill={COLORS[i]} stroke="none"/>)}
                </Pie>
                <Tooltip/>
                <Legend/>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="lg:col-span-3 bg-white p-8 rounded-3xl shadow-sm border">
            <h3 className="font-bold mb-6">ประวัติการตรวจสอบล่าสุด</h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {filtered.map(log => (
                <div key={log.id} onClick={() => setSelectedLog(log)} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl hover:bg-emerald-50 cursor-pointer border border-transparent hover:border-emerald-200 transition-all">
                  <div className="font-bold">{log.truckNo}</div>
                  <div className={`px-4 py-1 rounded-full text-xs font-bold ${log.isFailed ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"}`}>
                    {log.isFailed ? `ไม่ผ่าน (ครั้งที่ ${log.failCount})` : "ปกติ"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
            <div className={`p-6 text-white font-bold text-xl flex justify-between ${selectedLog.isFailed ? "bg-rose-600" : "bg-emerald-600"}`}>
                <span>{selectedLog.truckNo} - {selectedLog.inspectorName}</span>
                <button onClick={() => setSelectedLog(null)}>X</button>
            </div>
            <div className="p-6 overflow-y-auto space-y-2">
                {selectedLog.checklist.map((item: any, idx: number) => (
                    <div key={idx} className={`p-3 rounded-xl border flex justify-between items-center ${item.status === 'no' ? "bg-rose-50 border-rose-200" : "bg-slate-50"}`}>
                        <span className="text-sm">{item.criteria}</span>
                        <span className={`font-bold ${item.status === 'no' ? "text-rose-600" : "text-emerald-600"}`}>{item.status.toUpperCase()}</span>
                    </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function StatCard({ title, value, icon }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border shadow-sm flex items-center gap-4">
      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">{icon}</div>
      <div><p className="text-xs text-slate-400 font-bold uppercase">{title}</p><p className="text-2xl font-bold">{value}</p></div>
    </div>
  );
}
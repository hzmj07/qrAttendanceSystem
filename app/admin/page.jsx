"use client";
import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useIpBan } from "../context/context";
import * as XLSX from "xlsx";
import { startClassApi } from "../api/api";
import { 
  Users, 
  QrCode, 
  LogOut, 
  LayoutDashboard,
  RefreshCw,
  AlertTriangle,
  Copy,
  CheckCircle2,
  UploadCloud,
  PlayCircle
} from "lucide-react";

export default function AdminPanel() {
  const { savedStudents: students, getStudents, endClass , lessonStatus } = useIpBan();
  
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(true); // Yükleme durumu
  const [activeTab, setActiveTab] = useState("students");
  const [localUrl, setLocalUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [tempStudentList, setTempStudentList] = useState([]);
  const [fileName, setFileName] = useState("");

  // --- ŞİFRE VE DERS DURUMU KONTROLÜ ---
  useEffect(() => {
    const checkStatus = async () => {
      const password = prompt("كلمة مرور المسؤول (Admin Password):");
      
      if (password === "4223") {
        setIsAuthorized(true);
        setLocalUrl(`${window.location.origin}/attent`);

        try {
          // Backend'den ders durumunu sorgula
          const data = await lessonStatus();

          if (data.status === true) {
            setSessionActive(true);
            await getStudents(); // Aktif ders varsa öğrenci listesini çek
          }
        } catch (error) {
          console.error("Ders durumu alınamadı:", error);
        } finally {
          setIsLoadingStatus(false);
        }
      } else {
        alert("تم رفض الوصول!");
        window.location.href = "/"; 
      }
    };

    checkStatus();
  }, []);

  // --- EXCEL İŞLEME MANTIĞI ---
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);

      const formattedData = data.map(item => ({
        studentId: String(item["Student ID"] || ""),
        name: String(item["Name"] || ""),
        surname: String(item["Surname"] || ""),
        dept_code: String(item["Department"] || "")
      }));

      setTempStudentList(formattedData);
    };
    reader.readAsBinaryString(file);
  };

  // --- DERSİ BAŞLATMA ---
  const startSession = async () => {
    if (tempStudentList.length === 0) {
      alert("يرجى تحميل قائمة الطلاب أولاً");
      return;
    }

    try {
      const result = await startClassApi(tempStudentList);
      setSessionActive(true);
      await getStudents(); // Başlattıktan sonra listeyi güncelle
    } catch (error) {
      console.error("Ders başlatılamadı:", error);
      alert("Backend'e veri gönderilemedi ❌");
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try { await getStudents(); } finally { setTimeout(() => setIsRefreshing(false), 600); }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(localUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const confirmEndSession = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    const safeDate = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(workbook, `سجل_الحضور _${safeDate}.xlsx`);

    endClass();
    setSessionActive(false);
    setShowConfirmModal(false);
    setTempStudentList([]);
    setFileName("");
  };

  // 1. Yetki Kontrolü ve Yükleme Ekranı
  if (!isAuthorized || isLoadingStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans" dir="rtl">
        <div className="flex flex-col items-center gap-4 text-slate-400">
          <RefreshCw className="animate-spin" size={32} />
          <p className="font-bold">جاري التحقق من الصلاحية والدراسة...</p>
        </div>
      </div>
    );
  }

  // 2. Ders Aktif Değilse: Kurulum Ekranı
  if (!sessionActive) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans" dir="rtl">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 text-center">
          <div className="bg-indigo-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-indigo-600">
            <UploadCloud size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">إعداد جلسة جديدة</h2>
          <p className="text-slate-500 text-sm mb-8">يرجى رفع ملف Excel يحتوي على بيانات الطلاب لبدء تسجيل الحضور.</p>
          
          <div className="space-y-4">
            <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="text-sm text-slate-500 font-bold">
                  {fileName ? fileName : "اختر ملف Excel"}
                </p>
                {tempStudentList.length > 0 && (
                  <p className="text-xs text-green-500 mt-2 font-bold">تم تحميل {tempStudentList.length} طالب</p>
                )}
              </div>
              <input type="file" className="hidden" accept=".xlsx, .xls" onChange={handleFileUpload} />
            </label>

            <button 
              onClick={startSession}
              disabled={tempStudentList.length === 0}
              className="w-full flex items-center justify-center gap-3 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
            >
              <PlayCircle size={20} />
              بدء الفصل الدراسي الآن
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Ders Aktifse: Dashboard Ekranı
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans" dir="rtl">
      {showConfirmModal && <ConfirmationModal confirmEndSession={confirmEndSession} setShowConfirmModal={setShowConfirmModal} />}

      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-100 gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-3 rounded-xl text-white shadow-indigo-200 shadow-lg">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">لوحة تحكم المسؤول</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-semibold text-green-600">الجلسة نشطة الآن</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
            <div className="text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">الطلاب الحاضرون</p>
              <p className="text-2xl font-black text-slate-800 leading-none mt-1">{students.length}</p>
            </div>
            <div className="h-10 w-[1px] bg-slate-200"></div>
            <Users size={28} className="text-indigo-600 opacity-80" />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="md:col-span-1 space-y-4">
            <nav className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-2">
              <button
                onClick={() => setActiveTab("students")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
                  activeTab === "students" ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-transparent text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Users size={18} /> قائمة الطلاب
              </button>
              <button
                onClick={() => setActiveTab("qr")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
                  activeTab === "qr" ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "bg-transparent text-slate-500 hover:bg-slate-50"
                }`}
              >
                <QrCode size={18} /> رمز QR
              </button>
              
              <div className="pt-4 mt-2 border-t border-slate-50">
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl font-bold text-sm hover:bg-red-600 hover:text-white transition-all group"
                >
                  <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                  إنهاء وحفظ الجلسة
                </button>
              </div>
            </nav>
          </aside>

          <main className="md:col-span-3">
             <div className="bg-white rounded-2xl shadow-sm border border-slate-100 min-h-[500px] flex flex-col overflow-hidden">
              {activeTab === "students" && (
                <div className="flex flex-col h-full animate-in fade-in duration-300">
                  <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-slate-800">سجل الحضور المباشر</h3>
                      <button onClick={handleRefresh} disabled={isRefreshing} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all active:scale-90 disabled:opacity-50">
                        <RefreshCw size={18} className={`${isRefreshing ? "animate-spin" : ""}`} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-auto p-4">
                    {students.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-[350px] text-slate-400">
                        <Users size={60} className="mb-4 opacity-10" />
                        <p className="text-sm font-medium">لا يوجد طلاب مسجلون بعد...</p>
                      </div>
                    ) : (
                      <table className="w-full text-sm">
                        <thead className="text-slate-400 border-b border-slate-50">
                          <tr>
                            <th className="px-4 py-3 font-bold text-right">رقم الطالب</th>
                            <th className="px-4 py-3 font-bold text-right">الاسم الكامل</th>
                            <th className="px-4 py-3 text-left text-[10px] uppercase tracking-tight">الحالة</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {students.map((s, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                              <td className="px-4 py-4 font-mono text-indigo-600 font-bold">{s.studentId}</td>
                              <td className="px-4 py-4 text-slate-700 font-semibold">{s.name} {s.surname}</td>
                              <td className="px-4 py-4 text-left">
                                <span className="inline-flex items-center gap-1 text-green-500 font-bold text-[10px]">
                                  <CheckCircle2 size={12} /> حاضر
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "qr" && (
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center animate-in zoom-in-95 duration-300">
                  <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl border border-slate-50 mb-8 transform hover:scale-105 transition-transform">
                    {localUrl && <QRCodeCanvas value={localUrl} size={280} level="H" />}
                  </div>
                  <div className="space-y-4 w-full max-w-sm">
                    <h3 className="text-2xl font-black text-slate-800">امسح رمز QR</h3>
                    <p className="text-slate-500 text-sm">يمكن للطلاب تسجيل حضورهم عن طريق مسح هذا الرمز.</p>
                    <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200" dir="ltr">
                      <button 
                        onClick={copyToClipboard}
                        className="p-2.5 bg-white text-indigo-600 rounded-xl shadow-sm border border-slate-100 hover:bg-indigo-600 hover:text-white transition-all active:scale-90"
                      >
                        {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                      </button>
                      <input readOnly value={localUrl} className="flex-1 bg-transparent text-xs font-mono text-slate-500 outline-none px-2" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// Modal Bileşeni (Dışarıya alabilirsin)
const ConfirmationModal = ({ confirmEndSession, setShowConfirmModal }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" dir="rtl">
    <div className="w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-500 mb-4">
        <AlertTriangle size={32} />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">إنهاء الجلسة؟</h3>
      <p className="text-slate-500 text-sm mb-8">
        هل أنت متأكد من إنهاء الفصل؟ سيتم تحميل قائمة الحضور تلقائياً.
      </p>
      <div className="flex flex-col gap-3">
        <button
          onClick={confirmEndSession}
          className="w-full py-4 bg-red-600 text-white rounded-2xl font-black shadow-lg shadow-red-100 hover:bg-red-700 transition-all active:scale-95"
        >
          نعم، إنهاء وحفظ
        </button>
        <button
          onClick={() => setShowConfirmModal(false)}
          className="w-full py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold hover:bg-slate-200 transition-all"
        >
          إلغاء
        </button>
      </div>
    </div>
  </div>
);
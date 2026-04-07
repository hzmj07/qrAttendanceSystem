"use client";

import { useRouter } from "next/navigation";
import { UserCog, GraduationCap } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div dir="rtl" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-6 font-sans">
      
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-3 tracking-tight">
          مرحباً بك في النظام
        </h1>
        <p className="text-slate-500 mb-10 text-lg">
          يرجى اختيار دورك للمتابعة.
        </p>

        {/* Buton Seçenekleri (Grid Düzeni) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Admin Kartı */}
          <button
            onClick={() => router.push("/admin")}
            className="group flex flex-col items-center p-8 rounded-2xl bg-slate-50 border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-lg transition-all duration-300 w-full focus:outline-none focus:ring-4 focus:ring-indigo-100"
          >
            <UserCog 
              strokeWidth={1.5} 
              className="w-16 h-16 mb-4 text-slate-700 group-hover:text-indigo-600 group-hover:-translate-y-2 transition-all duration-300" 
            />
            
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              تسجيل دخول المسؤول
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              إدارة النظام، والتحكم في الحضور، وتكوين الإعدادات.
            </p>
          </button>

          <button
            onClick={() => router.push("/attent")}
            className="group flex flex-col items-center p-8 rounded-2xl bg-slate-50 border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-lg transition-all duration-300 w-full focus:outline-none focus:ring-4 focus:ring-emerald-100"
          >
            <GraduationCap 
              strokeWidth={1.5} 
              className="w-16 h-16 mb-4 text-slate-700 group-hover:text-emerald-600 group-hover:-translate-y-2 transition-all duration-300" 
            />

            <h2 className="text-xl font-bold text-slate-800 mb-2">
              تسجيل حضورالطالب
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              تسجيل حضورك .
            </p>
          </button>

        </div>
      </div>
    </div>
  );
}
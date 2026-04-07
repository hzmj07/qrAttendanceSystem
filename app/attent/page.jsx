"use client";
import React, { useState, useEffect } from "react";
import { useIpBan } from "../context/context";
import {
  AlertCircle,
  Loader2,
  CheckCircle2,
  Search,
  User,
  Fingerprint,
  IdCard,
} from "lucide-react";

export default function StudentAttendanceForm() {
  const { doAttendance, isBanned, status, setStatus, checkMyIpStatus } = useIpBan();
  const [studentId, setStudentId] = useState("");
  const [foundStudent, setFoundStudent] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const isIdComplete = studentId.length === 7;

  useEffect(() => {
    checkMyIpStatus();
  }, []);

  useEffect(() => {
    if (isIdComplete && status !== "no-lesson" && status !== "checking") {
      searchStudent();
    } else if (!isIdComplete) {
      setFoundStudent(null);
      setErrorMessage("");
      if (status !== "checking") setStatus("idle");
    }
  }, [studentId]);

  const searchStudent = async () => {
    try {
      setStatus("searching");
      setErrorMessage("");
      console.log("testt" , studentId);
      
      const response = await fetch(`http://192.168.1.36:5000/student/${studentId}`);
      
      if (!response.ok) {
        throw new Error("Student not found");
      }
      
      const student = await response.json();
      console.log(student);
      
      setFoundStudent(student);
      setStatus("idle");
      setErrorMessage("");
    } catch (err) {
      setFoundStudent(null);
      setErrorMessage("الطالب غير مسجل في قاعدة البيانات");
      setStatus("idle");
    }
  };

  const confirmAttendance = async () => {
    try {
      setStatus("submitting");
      const result = await doAttendance(foundStudent.studentId);
      if (result) {
        setStatus("success");
      } else {
        setErrorMessage("فشل تسجيل الحضور، ربما قمت بالتسجيل مسبقاً.");
        setStatus("idle");
      }
    } catch (err) {
      setErrorMessage("خطأ في الاتصال بالسيرفر");
      setStatus("idle");
    }
  };

  const handleIdChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 7) {
      setStudentId(value);
    }
  };


  if (status === "checking") {
    return (
      <Center>
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Loader2 className="animate-spin text-indigo-600" size={48} />
            <Fingerprint className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400" size={20} />
          </div>
          <p className="text-gray-600 font-medium animate-pulse">جارٍ التحقق من الأمان...</p>
        </div>
      </Center>
    );
  }

  if (status === "banned") {
 return (
      <Center>
        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-green-100 flex flex-col items-center scale-110 transition-all">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <CheckCircle2 size={48} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">تم التسجيل بنجاح</h2>
          <p className="text-gray-500">شكراً لك، نتمنى لك يوماً دراسياً ممتعاً</p>
        </div>
      </Center>
    );
  }

  if (status === "no-lesson") {
    return (
      <Center>
        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-yellow-100 flex flex-col items-center scale-110 transition-all">
          <div className="bg-yellow-100 p-4 rounded-full mb-4">
            <AlertCircle size={48} className="text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">لم يتم إنشاء درس</h2>
          <p className="text-gray-500">يرجى الانتظار حتى يتم إنشاء درس جديد</p>
        </div>
      </Center>
    );
  }

  if (status === "success") {
    return (
      <Center>
        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-green-100 flex flex-col items-center scale-110 transition-all">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <CheckCircle2 size={48} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">تم التسجيل بنجاح</h2>
          <p className="text-gray-500">شكراً لك، نتمنى لك يوماً دراسياً ممتعاً</p>
        </div>
      </Center>
    );
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 p-6" dir="rtl">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
            <IdCard className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-black text-gray-800">نظام التحضير الذكي</h1>
          <p className="text-gray-500 mt-2">أدخل رقمك الجامعي لتسجيل الحضور</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-white relative overflow-hidden">
          {/* Input Section */}
          <div className="relative group">
            <label className="block text-sm font-bold text-black mb-2 mr-1">الرقم الجامعي</label>
            <input
              type="text"
              value={studentId}
              onChange={handleIdChange}
              placeholder="0000000"
              maxLength="7"
              className={`w-full text-black text-center text-2xl font-mono tracking-[0.2em] border-2 p-4 rounded-2xl outline-none transition-all
                ${isIdComplete ? 'border-indigo-500 bg-indigo-50/30' : 'border-gray-100 focus:border-indigo-300'}
              `}
            />
            <div className="text-xs text-gray-400 mt-2 text-center">{studentId.length}/7</div>
          </div>

          {/* Feedback Area */}
          <div className="mt-8 min-h-[160px] flex flex-col justify-center">
            {status === "searching" && (
              <div className="flex flex-col items-center gap-2 text-indigo-500">
                <Loader2 className="animate-spin" size={32} />
                <span className="text-sm font-medium">جارٍ البحث في قاعدة البيانات...</span>
              </div>
            )}

            {foundStudent && status !== "searching" && (
              <div className="animate-in fade-in zoom-in duration-300">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-4 flex items-center gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm">
                    <User className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">الطالب المُسجل</p>
                    <p className="text-lg font-bold text-gray-800">
                      {foundStudent.name} {foundStudent.surname}
                    </p>
                  </div>
                </div>

                <button
                  onClick={confirmAttendance}
                  disabled={status === "submitting"}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>جارٍ التسجيل...</span>
                    </>
                  ) : (
                    "تأكيد تسجيل الحضور"
                  )}
                </button>
              </div>
            )}

            {!foundStudent && status !== "searching" && (
              <div className="text-center space-y-3 text-black">
                {!errorMessage ? (
                  <div className="opacity-40">
                    <Search className="mx-auto mb-2" size={40} />
                    <p className="text-sm font-medium">أدخل رقمك الجامعي (7 أرقام)</p>
                  </div>
                ) : (
                  <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 animate-shake">
                    <AlertCircle className="mx-auto mb-2" size={28} />
                    <p className="text-sm font-medium">{errorMessage}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-8">
          جميع الحقوق محفوظة &copy; {new Date().getFullYear()} - النظام الأكاديمي
        </p>
      </div>
    </div>
  );
}

const Center = ({ children }) => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
    <div>{children}</div>
  </div>
);

"use client";

import { createContext, useContext, useEffect, useState } from "react";
const IpBanContext = createContext(null);


export const IpBanProvider = ({ children }) => {
  const [bannedIps, setBannedIps] = useState([]);
  const [savedStudents, setSavedStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [API_URL, setLocalUrl] = useState("http://192.168.1.36:5000");

  const [status, setStatus] = useState("checking");
  const [isBanned, setIsBanned] = useState(false);

  // 🔹 İlk açılışta IP kontrolü
//  useEffect(() => {

  
//   setLocalUrl(`http://192.168.1.36:5000`);
// }, []);

// api hazırsa ip kontrolü yap
useEffect(() => {
  if (!API_URL) return;
  checkMyIpStatus();
}, [API_URL]);

  const lessonStatus = async () => {
    try {
      const res = await fetch(`${API_URL}/lesson-status`);
      const data = await res.json();  
      console.log("dataaa" ,data);
      
      return data;
    } catch (err) {
      console.error("Lesson status error:", err);
      return null;
    }
  };


  // 🔹 Öğrencileri çek (admin)
  const students = async () => {
    try {
      const res = await fetch(`${API_URL}/students`);
      const data = await res.json();
      setSavedStudents(data);
    } catch (err) {
      console.error("Students error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Yoklama al (student)
  const doAttendance = async (studentId) => {
    try {
      const ip = window.location.hostname;

      const res = await fetch(`${API_URL}/attendance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, ip }),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsBanned(true);
        return null;
      }

      setSavedStudents((prev) => [...prev, data]);
      return data;
    } catch (err) {
      console.error("Attendance error:", err);
      return null;
    }
  };

  const checkMyIpStatus = async () => {
    setStatus("checking");
    try {
      const res = await fetch(`${API_URL}/check-ip`);
      const data = await res.json();
      console.log("dataaa", data);
      
      setStatus(data.status)
    } catch (err) {
      console.error("IP check error:", err);
      setStatus("error");
    }
  };

  const banIp = async (ip) => {
    if (!ip) return;

    try {
      await fetch(`${API_URL}/ban-ip`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip }),
      });

      setBannedIps((prev) => [...prev, ip]);
    } catch (err) {
      console.error("Ban IP error:", err);
    }
  };

  // 🔹 Ders bitir (admin)
  const endClass = async () => {
    try {
      await fetch(`${API_URL}/end-lesson`, {
        method: "POST",
      });
    } catch (err) {
      console.error("End class error:", err);
    }
  };

  // 🔹 Öğrenci ekle (admin manuel)
  const addSavedStudent = async (student) => {
    if (!student) return;

    try {
      const res = await fetch(`${API_URL}/attendance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Banlısın");
        setIsBanned(true);
        return;
      }

      setSavedStudents((prev) => [...prev, student]);
    } catch (err) {
      console.error("Add student error:", err);
    }
  };

  return (
    <IpBanContext.Provider
      value={{
        bannedIps,
        savedStudents,
        banIp,
        addSavedStudent,
        loading,
        isBanned,
        checkMyIpStatus,
        doAttendance,
        getStudents: students,
        endClass,
        status,
        setStatus,
        lessonStatus,
      }}
    >
      {children}
    </IpBanContext.Provider>
  );
};

export const useIpBan = () => {
  const ctx = useContext(IpBanContext);
  if (!ctx) throw new Error("useIpBan must be used inside IpBanProvider");
  return ctx;
};

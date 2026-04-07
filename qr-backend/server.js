const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const os = require("os");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());
app.set("trust proxy", true);

/* ================= BASE PATH (PKG FIX) ================= */

const basePath = process.pkg
  ? path.dirname(process.execPath)
  : __dirname;

/* ================= FILE PATHS ================= */

const DATA_FILE = path.join(basePath, "data.json");
const STUDENTS_FILE = path.join(basePath, "students.json");

const lessonActive = () => {
  if (!fs.existsSync(STUDENTS_FILE)) return false;

  const content = fs.readFileSync(STUDENTS_FILE, "utf-8").trim();
  if (!content) return false;

  try {
    const json = JSON.parse(content);
    return Array.isArray(json) ? json.length > 0 : Object.keys(json).length > 0;
  } catch {
    return false;
  }
};

/* ================= FILE INIT ================= */

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify({ attends: [], bannedIps: [] }, null, 2)
  );
}

if (!fs.existsSync(STUDENTS_FILE)) {
  fs.writeFileSync(STUDENTS_FILE, JSON.stringify([], null, 2));
}

const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
const writeData =
 (data) =>fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

const readStudents = () =>JSON.parse(fs.readFileSync(STUDENTS_FILE, "utf8"));

/* ================= UTILS ================= */

const getClientIp = (req) =>
  req.headers["x-forwarded-for"]?.split(",")[0] ||
  req.socket.remoteAddress;

/* ================= API ROUTES ================= */
app.post("/start-lesson", (req, res) => {
  const students = req.body;

  fs.writeFile(STUDENTS_FILE, JSON.stringify(students, null, 2), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Dosyaya yazılamadı" });
    }
    res.json({ message: "JSON dosyasına yazıldı" });
  });
});

app.get("/student/:studentId", (req, res) => {
  const { studentId } = req.params;
  const students = readStudents();
  const student = students.find((s) => s.studentId === studentId);
  if (!student) {
    return res.status(404).json({ ok: false, message: "Öğrenci bulunamadı" });
  }
  console.log(student);
  
  res.json(student);
});

app.get("/lesson-status", (req, res) => {
  console.log("status" ,lessonActive());
  
  const active = lessonActive();
  res.json({ status: active });
});

// Ders bitir
app.post("/end-lesson", (req, res) => {
  const emptyData = { attends: [], bannedIps: [] };
  writeData(emptyData);  
  fs.writeFileSync(STUDENTS_FILE, JSON.stringify([], null, 2));
  res.json({  
    ok: true,
    message: "Ders bitirildi, tüm yoklama verileri temizlendi",
  });
});

// IP kontrol
app.get("/check-ip", (req, res) => {
  console.log(lessonActive());
  
  const ip = getClientIp(req);
  const data = readData();

  if (data.bannedIps.includes(ip)) {
    return res.json({
      ok: false,
      status : "banned",
      message: "Bu IP daha önce yoklama aldı",
      ip,
    });
  }
  if (lessonActive() === false) {
    console.log("Lesson is not active");
    
    return res.json({
      ok: false,
      status : "no-lesson",
      message: "Ders henüz başlamadı",
      ip,
    });
  }
  console.log("Lesson is active");


  res.json({
    ok: true,
    "status" : "idle",
    message: "IP temiz",
    ip,
  });
});

// Admin: yoklama listesi
app.get("/students", (req, res) => {
  const data = readData();
  res.json(data.attends);
});

// Öğrenci yoklama
app.post("/attendance", (req, res) => {
  const { studentId } = req.body;
  const ip = getClientIp(req);
  console.log("attendace" , studentId);
  
  if (!studentId) {
    return res.status(400).json({ ok: false, message: "studentId gerekli" });
  }

  const data = readData();
  const students = readStudents();

  if (data.bannedIps.includes(ip)) {
    return res.status(403).json({
      ok: false,
      message: "Bu IP zaten yoklama aldı",
    });
  }

  const student = students.find((s) => s.studentId === studentId);

  if (!student) {
    return res.status(404).json({
      ok: false,
      message: "Öğrenci bulunamadı",
    });
  }

  data.bannedIps.push(ip);

  data.attends.push({
    ...student,
    time: new Date().toISOString(),
  });

  writeData(data);

  res.json({
    ok: true,
    message: "Yoklama alındı",
    student,
  });
});

/* ================= FRONTEND (STATIC) ================= */

app.use(express.static(path.join(basePath, "out")));

app.get(/.*/,(req, res) => {
  res.sendFile(path.join(basePath, "out", "index.html"));
});

/* ================= SERVER ================= */

const PORT = 5000;

function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "localhost";
}

app.listen(PORT, () => {
  const ip = getLocalIP();
  const url = `http://${ip}:${PORT}`;

  console.log("Server running at:", url);
 // exec(`start ${url}`);
});
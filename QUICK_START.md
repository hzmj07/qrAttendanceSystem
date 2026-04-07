# 🚀 Quick Start Guide - QR Attendance System

## للبدء السريع (Arabic Quick Start)

### الخطوات الأساسية:

**1. تثبيت وتشغيل الخادم الخلفي:**
```bash
cd qr-backend
npm install
node server.js
```
✅ ستظهر: `Server running at: http://192.168.x.x:5000`

**2. تثبيت وتشغيل الواجهة الأمامية (في terminal جديد):**
```bash
cd qr-generator
npm install
npm run dev
```
✅ ستظهر: `Local: http://localhost:3000`

**3. افتح المتصفح:**
- اذهب إلى: `http://localhost:3000`
- اختر دورك: "مسؤول" أو "طالب"

---

## Quick Start Guide - English Version

### Basic Steps:

**1. Install and Run Backend:**
```bash
cd qr-backend
npm install
node server.js
```
✅ You'll see: `Server running at: http://192.168.x.x:5000`

**2. Install and Run Frontend (in new terminal):**
```bash
cd qr-generator
npm install
npm run dev
```
✅ You'll see: `Local: http://localhost:3000`

**3. Open Browser:**
- Go to: `http://localhost:3000`
- Choose role: "Admin" or "Student"

---

## 🎯 كيفية الاستخدام (Usage Instructions)

### للمسؤول (Admin):

```
1. Click "تسجيل دخول المسؤول"
   ↓
2. Enter password: 4223
   ↓
3. Click tab "رفع الطلاب" (Upload Students)
   ↓
4. Select Excel file with columns:
   - Student ID
   - Name
   - Surname
   - Department
   ↓
5. Click "بدء الدرس" (Start Lesson)
   ↓
6. Share QR code or URL with students
   ↓
7. Watch attendance in real-time
   ↓
8. Click "إنهاء الدرس" (End Lesson)
   ↓
9. Excel file will download automatically ✅
```

### للطلاب (Students):

```
1. Click "تسجيل حضور الطالب"
   ↓
2. Either:
   A) Scan QR code from admin
   B) Enter Student ID (7 digits)
   ↓
3. Your info will appear
   ↓
4. Click "تأكيد الحضور" (Confirm Attendance)
   ↓
5. Success! ✅
```

---

## 📋 نموذج ملف Excel المتوقع

```
| Student ID | Name   | Surname | Department |
|-----------|--------|---------|-----------|
| 1234567   | Ahmed  | Ali     | CS        |
| 1234568   | Fatima | Mohamed | EE        |
| 1234569   | Hassan | Ibrahim | IS        |
```

---

## 🔧 استكشاف الأخطاء السريع (Quick Troubleshooting)

| المشكلة | الحل |
|--------|------|
| لا يمكن الاتصال بالخادم | تأكد من تشغيل: `node server.js` |
| كلمة مرور خاطئة | استخدم: `4223` |
| الطالب غير موجود | تحقق من قائمة Excel، تأكد من بدء الدرس |
| IP محظور | استخدم جهاز مختلف أو انتظر درس جديد |
| الدرس لم يبدأ | اطلب من المسؤول تحميل الطلاب وبدء الدرس |

---

## 📁 أهم الملفات (Key Files)

```
Frontend:
├── app/page.tsx           ← الصفحة الرئيسية
├── app/admin/page.jsx     ← لوحة تحكم المسؤول
├── app/attent/page.jsx    ← نموذج الطالب
├── app/context/context.jsx ← إدارة الحالة
└── app/api/api.js         ← الاتصال بالخادم

Backend:
├── qr-backend/server.js    ← الخادم الرئيسي
├── data.json               ← سجل الحضور
└── students.json           ← قائمة الطلاب الحالية
```

---

## ⚡ الأوامر المفيدة (Useful Commands)

```bash
# تثبيت المكتبات
npm install

# تشغيل التطوير
npm run dev

# بناء النسخة الإنتاجية
npm run build

# تشغيل الإنتاج
npm start

# التحقق من الأخطاء
npm run lint

# تشغيل الخادم
node qr-backend/server.js
```

---

## 🌐 عناوين IP المهمة (Important IPs)

```
Local Network:
- Find your IP: ipconfig (Windows) or ifconfig (Mac/Linux)
- Update in context.jsx:
  const API_URL = "http://YOUR_IP:5000"
```

---

## 📝 ملاحظات مهمة (Important Notes)

✅ **تذكر:**
- بدء الخادم أولاً (Port 5000)
- ثم بدء الواجهة (Port 3000)
- تحديث عنوان IP في context.jsx

⚠️ **تحذير:**
- كلمة المرور "4223" ضعيفة - احم كلمة مرور قوية في الإنتاج
- البيانات محفوظة في JSON - استخدم قاعدة بيانات في الإنتاج
- نظام IP Ban بسيط - يمكن تحسينه

---

## 🎓 مثال عملي (Practical Example)

### السيناريو: بدء درس رياضيات

```
الوقت 8:00 صباحاً:
├─ Admin يفتح http://localhost:3000
├─ ينقر "تسجيل دخول المسؤول"
├─ يدخل كلمة المرور: 4223
├─ يحمل ملف "students.xlsx" (30 طالب)
└─ ينقر "بدء الدرس"

النتيجة:
├─ رمز QR يظهر على الشاشة
├─ طلاب يفتحون http://192.168.1.36:3000
├─ يمسحون رمز QR أو يدخلون ID
├─ ينقرون "تأكيد الحضور"
└─ تظهر بيانات الطالب عند المسؤول

الساعة 9:00:
├─ Admin ينقر "إنهاء الدرس"
├─ ملف "سجل_الحضور_2024-04-07.xlsx" يُعن
└─ 28 طالب سجلوا الحضور ✅

النتيجة النهائية: ملف Excel مع أسماء وأوقات الحضور
```

---

## 💡 نصائح مفيدة (Tips)

1. **استخدم نفس الجهاز للخادم:**
   - لا تطفئه أثناء الدرس

2. **تأكد من اتصال الشبكة:**
   - كل الأجهزة على نفس WiFi

3. **تجربة سريعة:**
   - استخدم طالب واحد للاختبار
   - ثم حمل القائمة الكاملة

4. **النسخ الاحتياطي:**
   - احفظ ملفات Excel المُصدّرة

---

## 🆘 الدعم (Support)

للحصول على معلومات مفصلة:
- اقرأ [DOCUMENTATION.md](DOCUMENTATION.md) (عربي)
- اقرأ [DOCUMENTATION_EN.md](DOCUMENTATION_EN.md) (English)

---

**Version**: 0.1.0  
**Last Updated**: 2024-04-07  
**Status**: 🟢 Ready to Use

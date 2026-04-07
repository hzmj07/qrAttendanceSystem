# QR Code Attendance System - Dokumentation

## سطح عام
- **المشروع**: نظام حضور الطلاب برموز QR
- **الإصدار**: 0.1.0
- **النوع**: تطبيق ويب كامل + خادم خلفي
- **الحالة**: في التطوير

---

## 📋 جدول المحتويات

1. [نظرة عامة](#نظرة-عامة)
2. [المتطلبات والإعدادات](#المتطلبات-والإعدادات)
3. [هيكل المشروع](#هيكل-المشروع)
4. [تثبيت وتشغيل](#تثبيت-وتشغيل)
5. [الواجهة الأمامية](#الواجهة-الأمامية)
6. [الخادم الخلفي](#الخادم-الخلفي)
7. [سير العمل](#سير-العمل)
8. [قاعدة البيانات](#قاعدة-البيانات)
9. [واجهات برمجية](#واجهات-برمجية)
10. [المميزات الأمنية](#المميزات-الأمنية)

---

## 🎯 نظرة عامة

نظام إدارة الحضور الإلكتروني يعتمد على:
- **رموز QR**: لتسهيل تسجيل الحضور
- **التوزيع عبر الشبكة المحلية**: يعمل على الأجهزة المتصلة بنفس الشبكة
- **واجهة ثنائية اللغة**: دعم كامل للعربية والإنجليزية (RTL)
- **نظام IP Ban**: منع تكرار تسجيل الحضور من نفس الجهاز

### سيناريو الاستخدام:

```
المسؤول                      الطلاب
   ↓                            ↓
[تحميل قائمة طلاب]      →    [زيارة صفحة الطالب]
[بدء الدرس]              →    [مسح رمز QR]
[عرض الحصور الحي]        ←    [تسجيل الحضور]
[إنهاء الدرس]            ←    [تحديث القائمة]
[تصدير Excel]
```

---

## 📦 المتطلبات والإعدادات

### متطلبات النظام:
- Node.js v18+ 
- npm أو yarn
- محرر نصوص (VS Code موصى به)

### المتطلبات البرمجية:

#### الواجهة الأمامية:
```json
{
  "next": "^16.1.6",
  "react": "^19.2.3",
  "react-dom": "^19.2.3",
  "qrcode.react": "^4.2.0",
  "xlsx": "^0.18.5",
  "lucide-react": "^0.574.0",
  "tailwindcss": "^4"
}
```

#### الخادم الخلفي:
```javascript
// المكتبات الأساسية:
- express
- cors
- fs (نظام الملفات)
- path (إدارة المسارات)
```

---

## 📁 هيكل المشروع

```
qr-generator/
├── app/                          # مجلد الواجهة الأمامية (Next.js)
│   ├── layout.tsx               # تخطيط الصفحة الرئيسي
│   ├── page.tsx                 # الصفحة الرئيسية (اختيار الدور)
│   ├── globals.css              # الأنماط العامة
│   │
│   ├── admin/                   # مسارات المسؤول
│   │   └── page.jsx             # لوحة تحكم المسؤول
│   │       - تحميل الطلاب
│   │       - بدء الدرس
│   │       - عرض الحضور
│   │       - إنهاء الدرس
│   │
│   ├── attent/                  # مسارات الطلاب
│   │   └── page.jsx             # نموذج تسجيل الحضور
│   │       - البحث عن الطالب
│   │       - تسجيل الحضور
│   │
│   ├── api/                     # واجهات برمجية عامة
│   │   └── api.js               # دوال الاتصال بالخادم
│   │
│   └── context/                 # React Context
│       └── context.jsx          # إدارة الحالة العامة
│
├── qr-backend/                  # الخادم الخلفي (Express)
│   ├── server.js                # الخادم الرئيسي
│   ├── data.json                # قاعدة بيانات الحضور
│   ├── students.json            # قائمة الطلاب الحالية
│   └── package.json
│
├── public/                      # ملفات ثابتة
├── package.json                 # اعتماديات الواجهة الأمامية
├── tsconfig.json               # إعدادات TypeScript
├── next.config.ts              # إعدادات Next.js
├── tailwind.config.js          # إعدادات Tailwind CSS
└── README.md                   # ملف التعريف
```

---

## 🚀 تثبيت وتشغيل

### خطوة 1: تثبيت الواجهة الأمامية

```bash
# الذهاب إلى مجلد المشروع
cd qr-generator

# تثبيت المكتبات
npm install

# أو استخدام yarn
yarn install
```

### خطوة 2: تثبيت الخادم الخلفي

```bash
# الذهاب إلى مجلد الخادم
cd qr-backend

# تثبيت المكتبات
npm install
```

### خطوة 3: تشغيل الخادم الخلفي

```bash
# من داخل مجلد qr-backend
node server.js
```

**الناتج المتوقع:**
```
Server running at: http://192.168.x.x:5000
```

### خطوة 4: تشغيل الواجهة الأمامية

```bash
# من مجلد المشروع الرئيسي
npm run dev
```

**الناتج المتوقع:**
```
▲ Next.js 16.1.6
- Local:        http://localhost:3000
```

### الوصول للتطبيق:

- **من نفس الجهاز**: http://localhost:3000
- **من شبكة محلية**: http://192.168.x.x:3000

---

## 🎨 الواجهة الأمامية

### الصفحة الرئيسية (Home Page)

```typescript
// app/page.tsx
- عرضان رئيسيان:
  1. تسجيل دخول المسؤول → /admin
  2. تسجيل حضور الطالب → /attent
  
- التصميم:
  - تصميم responsive (موبايل + ويب)
  - RTL (من اليمين لليسار)
  - ألوان: أزرق للمسؤول، أخضر للطلاب
```

### لوحة تحكم المسؤول (/admin)

**المميزات:**
1. **التحقق من الهوية**
   - كلمة مرور: `4223`
   - رسالة: التحقق من الصلاحيات

2. **تحميل الطلاب**
   - تقبل ملفات Excel (.xlsx)
   - المتطلب: أعمدة [Student ID, Name, Surname, Department]
   - عرض معاينة البيانات

3. **بدء الدرس**
   - تحويل البيانات إلى خادم الخلفية
   - إنشاء رمز QR ديناميكي

4. **عرض الحصور المباشر**
   - جدول زمني للطلاب المسجلين
   - الوقت بصيغة ISO
   - زر تحديث البيانات

5. **إنهاء الدرس**
   - تصدير الحضور إلى Excel
   - مسح البيانات من الخادم
   - الاسم: `سجل_الحضور_YYYY-MM-DD.xlsx`

**المكونات الرئيسية:**

```jsx
// رمز QR ديناميكي
<QRCodeCanvas 
  value={`http://192.168.1.36:3000/attent/${studentId}`}
  size={256}
/>

// جدول الحضور
students.map(student => (
  <StudentRow key={student.studentId} student={student} />
))

// تحميل الملفات
<input type="file" accept=".xlsx" onChange={handleFileUpload} />
```

### نموذج تسجيل الحضور (/attent)

**الميزات:**
1. **التحقق من حالة الدرس**
   - هل بدأ الدرس بالفعل؟
   - هل تم تسجيل الحضور مسبقاً؟

2. **البحث عن الطالب**
   - إدخال رقم الطالب (7 أرقام)
   - البحث الفوري في قائمة الطلاب

3. **تسجيل الحضور**
   - عرض بيانات الطالب
   - زر تأكيد الحضور
   - رسائل الحالة (نجاح، خطأ، محظور)

**رموز الحالة:**
- `idle` - جاهز
- `checking` - التحقق
- `searching` - البحث
- `success` - نجح
- `banned` - محظور (IP مسجل مسبقاً)
- `no-lesson` - لا يوجد درس نشط
- `error` - خطأ

---

## 🔧 الخادم الخلفي

### ملفات البيانات

#### data.json
```json
{
  "attends": [
    {
      "studentId": "1234567",
      "name": "أحمد",
      "surname": "محمد",
      "dept_code": "CS",
      "time": "2024-04-07T10:30:00.000Z"
    }
  ],
  "bannedIps": [
    "192.168.1.100"
  ]
}
```

#### students.json
```json
[
  {
    "studentId": "1234567",
    "name": "أحمد",
    "surname": "محمد",
    "dept_code": "CS"
  }
]
```

### الدوال الرئيسية

```javascript
// 📄 إدارة البيانات
readData() → قراءة data.json
writeData(data) → حفظ data.json
readStudents() → قراءة students.json

// 🌐 معلومات الشبكة
getClientIp(req) → الحصول على IP العميل
getLocalIP() → الحصول على IP المحلي للخادم

// ✅ التحقق
lessonActive() → هل الدرس نشط؟
```

---

## 📡 سير العمل

### 1️⃣ سير عمل بدء الدرس

```
1. المسؤول يدخل كلمة المرور (4223)
2. يرفع ملف Excel بقائمة الطلاب
3. النظام يقرأ الملف ويستخرج:
   - Student ID
   - Name
   - Surname
   - Department
4. البيانات ترسل للخادم: POST /start-lesson
5. الخادم يحفظ البيانات في students.json
6. النظام يعرض رمز QR و URL الطلاب
```

### 2️⃣ سير عمل تسجيل الحضور

```
1. الطالب يفتح صفحة /attent
2. يتحقق النظام من حالة الدرس: GET /lesson-status
3. يتحقق من IP الطالب: GET /check-ip
   - إذا كان في قائمة الحظر → رسالة خطأ
   - إذا لم يبدأ الدرس → رسالة خطأ
4. الطالب يدخل رقمه
5. البحث عن الطالب: GET /student/:studentId
6. عرض بيانات الطالب
7. عند التأكيد: POST /attendance
   - يتم التحقق من الهوية
   - يتم إضافة IP للقائمة السوداء
   - يتم حفظ الحضور مع الوقت
8. رسالة نجاح
```

### 3️⃣ سير عمل إنهاء الدرس

```
1. المسؤول ينقر "إنهاء الدرس"
2. تأكيد الإجراء
3. تصدير البيانات إلى Excel
4. مسح students.json
5. مسح data.json (حفظ قالب فقط)
6. إعادة تعيين الصفحة
```

---

## 🗄️ قاعدة البيانات

### نموذج البيانات

#### طالب (Student)
```typescript
interface Student {
  studentId: string;      // رقم الطالب (7 أرقام)
  name: string;           // الاسم الأول
  surname: string;        // الاسم الثاني
  dept_code: string;      // كود القسم (CS, EE, etc)
}
```

#### سجل الحضور (Attendance Record)
```typescript
interface AttendanceRecord extends Student {
  time: string;          // وقت التسجيل (ISO 8601)
}
```

#### قاعدة البيانات (Data)
```typescript
interface DatabaseData {
  attends: AttendanceRecord[];  // سجل الحضور
  bannedIps: string[];          // قائمة IPs المحظورة
}
```

---

## 🔌 واجهات برمجية

### نقاط نهاية الخادم (API Endpoints)

#### 1. بدء الدرس
```
POST /start-lesson
Content-Type: application/json

Request Body:
[
  {
    "studentId": "1234567",
    "name": "أحمد",
    "surname": "محمد",
    "dept_code": "CS"
  }
]

Response:
{
  "message": "JSON dosyasına yazıldı"
}
```

#### 2. الحصول على الطالب
```
GET /student/:studentId

Example:
GET /student/1234567

Response:
{
  "studentId": "1234567",
  "name": "أحمد",
  "surname": "محمد",
  "dept_code": "CS"
}
```

#### 3. حالة الدرس
```
GET /lesson-status

Response:
{
  "status": true/false
}
```

#### 4. التحقق من IP
```
GET /check-ip

Response (نشط):
{
  "ok": true,
  "status": "idle",
  "message": "IP temiz",
  "ip": "192.168.1.100"
}

Response (محظور):
{
  "ok": false,
  "status": "banned",
  "message": "Bu IP daha önce yoklama aldı",
  "ip": "192.168.1.100"
}

Response (لا درس):
{
  "ok": false,
  "status": "no-lesson",
  "message": "Ders henüz başlamadı",
  "ip": "192.168.1.100"
}
```

#### 5. قائمة الطلاب
```
GET /students

Response:
[
  {
    "studentId": "1234567",
    "name": "أحمد",
    "surname": "محمد",
    "dept_code": "CS",
    "time": "2024-04-07T10:30:00.000Z"
  }
]
```

#### 6. تسجيل الحضور
```
POST /attendance
Content-Type: application/json

Request Body:
{
  "studentId": "1234567",
  "ip": "192.168.1.100"
}

Response (نجاح):
{
  "ok": true,
  "message": "Yoklama alındı",
  "student": {
    "studentId": "1234567",
    "name": "أحمد",
    "surname": "محمد",
    "dept_code": "CS"
  }
}

Response (محظور):
{
  "ok": false,
  "message": "Bu IP zaten yoklama aldı"
}
```

#### 7. إنهاء الدرس
```
POST /end-lesson

Response:
{
  "ok": true,
  "message": "Ders bitirildi, tüm yoklama verileri temizlendi"
}
```

---

## 🔒 المميزات الأمنية

### 1. نظام كلمة المرور
```javascript
// كلمة المرور الثابتة للمسؤول
password === "4223"
// ⚠️ ملاحظة: يجب تحسين هذا للإنتاج
```

### 2. نظام حظر IP
```javascript
// الغرض: منع تسجيل الحضور المتكرر
// الآلية:
if (data.bannedIps.includes(ip)) {
  // رفض الطلب
}
// حفظ IP بعد التسجيل بنجاح
data.bannedIps.push(ip);
```

### 3. التحقق من حالة الدرس
```javascript
// التحقق قبل كل طلب حضور
if (!lessonActive()) {
  // رفض الطلب
}
```

### 4. معلومات الطالب
```javascript
// التحقق من وجود الطالب في القائمة
const student = students.find(s => s.studentId === studentId);
if (!student) {
  // رفض الطلب
}
```

---

## ⚙️ الإعدادات المهمة

### عناوين IP المهمة

```javascript
// في context.jsx
const API_URL = "http://192.168.1.36:5000"

// في attent/page.jsx
const API_URL = "http://192.168.1.36:5000"
```

**⚠️ تحذير**: يجب تعديل عنوان IP ليطابق شبكتك المحلية:
```bash
# للعثور على IP المحلي للخادم
- Windows PowerShell: ipconfig
- Linux/Mac: ifconfig أو ip addr
```

### منافذ التطبيق

| الخدمة | المنفذ | المسار |
|--------|--------|--------|
| الخادم الخلفي | 5000 | http://IP:5000 |
| الواجهة الأمامية | 3000 | http://localhost:3000 |

---

## 📊 أمثلة الاستخدام

### مثال 1: تحميل الطلاب (ملف Excel)

**شكل الملف المتوقع:**
| Student ID | Name | Surname | Department |
|-----------|------|---------|-----------|
| 1001234 | أحمد | محمود | CS |
| 1001235 | فاطمة | علي | EE |
| 1001236 | محمد | أمين | CS |

### مثال 2: رمز QR للطالب

```
URL المضمنة في الرمز:
http://192.168.1.36:3000/attent

النظام يوجه الطالب تلقائياً
```

### مثال 3: التصدير

```
ملف Excel:
- الاسم: سجل_الحضور_2024-04-07.xlsx
- الأعمدة: Student ID, Name, Surname, Department, Time
```

---

## 🐛 استكشاف الأخطاء

### المشكلة: "Cannot connect to server"
```
الحل:
1. تحقق من تشغيل خادم الخلفي
   → node qr-backend/server.js
2. تحقق من عنوان IP
   → افتح terminal والكتب: ipconfig
3. حدّث عنوان IP في context.jsx و attent/page.jsx
```

### المشكلة: "رقم الطالب غير موجود"
```
الحل:
1. تأكد من تحميل قائمة الطلاب
2. تحقق من رقم الطالب المدخل
3. تأكد من بدء الدرس بنجاح
```

### المشكلة: "This IP has already recorded attendance"
```
الحل:
1. استخدم جهاز مختلف
2. أو انتظر إنهاء الدرس وبدء درس جديد
```

### المشكلة: "Lesson not started"
```
الحل:
1. دخل المسؤول لوحة التحكم
2. حمّل قائمة الطلاب
3. انقر "بدء الدرس"
```

---

## 📱 التوافق

| المتصفح | الحالة |
|---------|--------|
| Chrome | ✅ مدعوم |
| Firefox | ✅ مدعوم |
| Safari | ✅ مدعوم |
| Edge | ✅ مدعوم |
| موبايل (iOS) | ⚠️ مدعوم جزئياً |
| موبايل (Android) | ✅ مدعوم |

---

## 🚀 التحسينات المستقبلية

- [ ] قاعدة بيانات SQL (بدلاً من JSON)
- [ ] مصادقة آمنة للمسؤول (JWT Tokens)
- [ ] تشفير كلمات المرور
- [ ] لوحة تحكم متقدمة
- [ ] تقارير وإحصائيات
- [ ] إشعارات فورية
- [ ] نسخ احتياطية تلقائية
- [ ] دعم لغات إضافية
- [ ] نور/مظلم (Dark Mode)

---

## 📞 الدعم والمساعدة

### الملفات المهمة:
- لوحة التحكم: [app/admin/page.jsx](app/admin/page.jsx)
- صفحة الطالب: [app/attent/page.jsx](app/attent/page.jsx)
- الخادم: [qr-backend/server.js](qr-backend/server.js)
- الحالة: [app/context/context.jsx](app/context/context.jsx)

### الأوامر المفيدة:

```bash
# تثبيت المكتبات
npm install

# تشغيل الواجهة (تطوير)
npm run dev

# بناء الإصدار الإنتاجي
npm run build
npm start

# التحقق من الأخطاء
npm run lint

# تشغيل الخادم
node qr-backend/server.js
```

---

**آخر تحديث**: 2024-04-07  
**الإصدار**: 0.1.0  
**الحالة**: 🟡 قيد التطوير

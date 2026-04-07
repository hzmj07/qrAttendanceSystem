# 📚 QR Code Attendance System

> **Elektronik Öğrenci Yoklama Sistemi | Electronic Student Attendance System**

A modern, secure, and efficient attendance management system using QR codes. Perfect for schools, universities, and educational institutions.

**Bir İnternet olmaması bile cihazları aynı ağda tutsa yeterli | Just keep devices on the same network - internet not required!**

---

## 🎯 Quick Overview

### What is this?
This is a **Local Network (LAN) based** attendance system that allows:
- ✅ **Admins** to upload student lists and generate QR codes
- ✅ **Students** to scan QR codes or enter ID to register attendance
- ✅ **Real-time** tracking and live updates
- ✅ **Excel exports** for record keeping

### Key Features
- 🔐 **Secure** - Data stays on your local network
- ⚡ **Fast** - Instant connection, no delays
- 📱 **Mobile-friendly** - Works on phones and tablets
- 🌍 **Bilingual** - Arabic & English support
- 🎨 **Beautiful UI** - Modern, responsive design
- 📊 **Attendance Tracking** - Real-time monitoring & export
- 🚫 **IP Protection** - Prevents duplicate attendance
- 💾 **Offline Ready** - Works without internet

### Perfect For
- 🏫 Schools and Universities
- 👨‍🏫 Training Centers
- 📖 Educational Programs
- 📋 Classroom Management

---

## 📁 Quick Navigation

### 📖 Documentation
| Language | File | Description |
|----------|------|-------------|
| 🇸🇦 **Arabic** | [DOCUMENTATION.md](DOCUMENTATION.md) | Comprehensive Arabic documentation with all details |
| 🇬🇧 **English** | [DOCUMENTATION_EN.md](DOCUMENTATION_EN.md) | Full English documentation |
| ⚡ **Quick Start** | [QUICK_START.md](QUICK_START.md) | Get started in 3 simple steps (Arabic + English) |

### 🚀 Getting Started

**Choose your path:**

#### 🏃 I want to start now! (3 minutes)
→ Go to [**QUICK_START.md**](QUICK_START.md)

#### 📚 I want detailed information
→ Go to [**DOCUMENTATION.md**](DOCUMENTATION.md) (Arabic) or [**DOCUMENTATION_EN.md**](DOCUMENTATION_EN.md) (English)

#### 🔧 I want to understand the architecture
→ See "Local Network Architecture" sections in documentation

---

## ⚡ Quick Start (30 seconds)

### Prerequisites
```
✅ Node.js v18+
✅ All devices on SAME WiFi network
✅ Terminal/PowerShell access
```

### 3-Step Setup

**Step 1: Start Backend Server**
```bash
cd qr-backend
npm install
node server.js
```

**Step 2: Start Frontend (new terminal)**
```bash
npm install
npm run dev
```

**Step 3: Open Browser**
```
http://localhost:3000
```

👉 **For detailed setup, see [QUICK_START.md](QUICK_START.md)**

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│        Local Network / الشبكة المحلية        │
├─────────────────────────────────────────────┤
│  Server (Port 5000, 3000)                   │
│  (Admin's Computer)                         │
│  192.168.1.xx                               │
│         │                                   │
│    ┌────┴────┬──────────┐                   │
│    ↓         ↓          ↓                   │
│  Admin    Student 1  Student 2              │
│  (Web)    (Mobile)   (Mobile)               │
│                                             │
│ ✅ Same WiFi required                      │
│ ✅ No internet dependency                  │
│ ✅ Secure & private                        │
└─────────────────────────────────────────────┘
```

---

## 📊 Project Structure

```
qr-generator/
├── 📄 README.md                    ← You are here
├── 📄 QUICK_START.md               ← Start here!
├── 📄 DOCUMENTATION.md             ← Full docs (Arabic)
├── 📄 DOCUMENTATION_EN.md          ← Full docs (English)
│
├── app/                            # Frontend (Next.js 16)
│   ├── page.tsx                   # Home page
│   ├── admin/page.jsx             # Admin dashboard
│   ├── attent/page.jsx            # Student attendance
│   ├── api/api.js                 # Backend calls
│   └── context/context.jsx        # State management
│
├── qr-backend/                     # Backend (Express)
│   ├── server.js                  # Main server
│   ├── data.json                  # Attendance records
│   └── students.json              # Student list
│
└── package.json
```

---

## 🎓 How It Works

### For Admins
```
1. Login with password (4223)
2. Upload Excel file with student list
3. Click "Start Lesson"
4. Share QR code with students
5. View live attendance
6. Click "End Lesson" to export Excel
```

### For Students
```
1. Visit attendance page
2. Scan QR code OR enter Student ID (7 digits)
3. Click confirm
4. Success! ✅
```

---

## 🔐 Important: Local Network Design

### This system is designed EXCLUSIVELY for Local Networks (LAN)

**✅ Works best in:**
- Same classroom/building
- Single WiFi network
- No external internet needed
- Secure and private

**❌ Does NOT work:**
- Over the internet
- On different WiFi networks
- From outside the building
- Without local IP access

**Why this design?**
- 🔒 **Privacy** - Data never leaves your network
- ⚡ **Speed** - No latency or delays
- 🛡️ **Security** - No cloud dependency
- 💰 **Cost-effective** - Minimal infrastructure

---

## 📝 Requirements

### System Requirements
- Node.js v18 or higher
- npm or yarn
- A computer to run the server (stay on during lesson)
- Same WiFi network for all devices

### Technology Stack
- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend:** Express.js, Node.js
- **QR Code:** qrcode.react library
- **Excel:** xlsx library
- **Icons:** lucide-react

---

## 🚀 Features in Detail

### 📱 Admin Dashboard
- Upload student lists from Excel
- Generate dynamic QR codes
- Real-time attendance tracking
- Live student list with timestamps
- Attendance statistics
- Export to Excel format

### 👨‍🎓 Student Portal
- Quick attendance registration
- QR code scanning
- Student information display
- Status messages
- IP-based duplicate prevention

### 🔒 Security
- Admin password protection
- IP ban system (one registration per device)
- Lesson status verification
- Student identity validation

---

## 📖 Documentation Files

| File | Purpose | Best For |
|------|---------|----------|
| [QUICK_START.md](QUICK_START.md) | 3-step setup guide | Getting started quickly |
| [DOCUMENTATION.md](DOCUMENTATION.md) | Complete Arabic guide | Detailed Arabic documentation |
| [DOCUMENTATION_EN.md](DOCUMENTATION_EN.md) | Complete English guide | Detailed English documentation |

**All files include:**
- Setup instructions
- Feature explanations
- API reference
- Troubleshooting
- Examples

---

## 🛠️ Common Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build production version
npm run build

# Start production server
npm start

# Check for errors
npm run lint

# Run backend
node qr-backend/server.js
```

---

## 🐛 Troubleshooting

### Problem: Can't connect to server
**Solution:** Make sure you're on the same WiFi network and using the correct IP address. See [QUICK_START.md](QUICK_START.md#troubleshooting)

### Problem: Student not found
**Solution:** Check that the Excel file was uploaded and the lesson has started. See [QUICK_START.md](QUICK_START.md#troubleshooting)

### Problem: "IP is already registered"
**Solution:** This device already submitted attendance. Use a different device or start a new lesson. This is by design!

👉 **For more help, check [QUICK_START.md](QUICK_START.md) or [DOCUMENTATION.md](DOCUMENTATION.md)**

---

## 📊 Status

| Aspect | Status |
|--------|--------|
| Version | 0.1.0 |
| Development | 🟡 In Progress |
| Stability | ✅ Tested |
| Production Ready | 🟡 Pending |
| Documentation | ✅ Complete |

---

## 🚀 Future Enhancements

- [ ] Database migration (SQL instead of JSON)
- [ ] Advanced authentication
- [ ] Student statistics & reports
- [ ] Biometric integration options
- [ ] Mobile app versions
- [ ] Cloud backup support
- [ ] Additional language support
- [ ] Dark mode UI

---

## 📞 Support

**Getting Started?**
→ Read [QUICK_START.md](QUICK_START.md) first!

**Need Details?**
→ Arabic: [DOCUMENTATION.md](DOCUMENTATION.md)
→ English: [DOCUMENTATION_EN.md](DOCUMENTATION_EN.md)

**Found a Problem?**
→ Check troubleshooting sections in documentation

---

## 📋 Project Info

- **Name:** QR Code Attendance System
- **Type:** Full-Stack Web Application
- **Use Case:** Educational Institutions
- **Access:** Local Network Only (LAN)
- **License:** Private Use
- **Last Updated:** April 7, 2026
- **Version:** 0.1.0

---

## 🎯 Quick Navigation Links

| Page | Purpose |
|------|---------|
| [QUICK_START.md](QUICK_START.md) | ⚡ Start here - 3 simple steps |
| [DOCUMENTATION.md](DOCUMENTATION.md) | 📖 Complete Arabic guide |
| [DOCUMENTATION_EN.md](DOCUMENTATION_EN.md) | 📖 Complete English guide |

---

## 💡 Key Takeaways

✅ **Simple** - Easy to setup and use
✅ **Secure** - Local network, no cloud dependency
✅ **Fast** - Real-time tracking
✅ **Bilingual** - Arabic and English support
✅ **Beautiful** - Modern, responsive UI
✅ **Reliable** - Tested and documented

**Ready to get started?** → [QUICK_START.md](QUICK_START.md) 🚀

---

<div align="center">

### 📚 **[Start with Quick Start Guide](QUICK_START.md)** 📚

**Or choose:**
- [Detailed Documentation (Arabic)](DOCUMENTATION.md)
- [Detailed Documentation (English)](DOCUMENTATION_EN.md)

---

**Version 0.1.0** | **Status:** 🟡 In Development | **Made for Classrooms** 🏫

</div>

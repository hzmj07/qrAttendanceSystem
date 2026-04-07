# QR Code Attendance System - Documentation

## Overview
- **Project**: Student Attendance System with QR Codes
- **Version**: 0.1.0
- **Type**: Full-Stack Web Application
- **Status**: In Development

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Requirements & Setup](#requirements--setup)
3. [Project Structure](#project-structure)
4. [Installation & Running](#installation--running)
5. [Frontend](#frontend)
6. [Backend](#backend)
7. [Workflow](#workflow)
8. [Database](#database)
9. [API Reference](#api-reference)
10. [Security Features](#security-features)

---

## � Local Network Architecture

### ⚡ Core Design:
This system is **specifically and exclusively designed to work on Local Networks (LAN)**. It is NOT designed for public internet deployment.

```
Use Case: Educational institutions, schools, universities
Scope: Single local network (WiFi/Ethernet)
Connection: Instant and secure without intermediaries
Requirement: All devices on the same network
```

### 🔧 How It Works:

1. **Server**
   - Runs on a single computer (typically admin desk)
   - Listens on port 5000: `http://192.168.x.x:5000`
   - Stores data locally (JSON files)
   - Only accessible to devices on the same network

2. **Frontend**
   - Runs on the same server or any device on the network
   - Development port 3000: `http://192.168.x.x:3000`
   - Connects via local IP address
   - Does NOT require continuous internet connection

3. **Student Devices**
   - Only requirement: Connection to same WiFi
   - Access from any device (mobile, tablet, computer)
   - Scan QR code or enter student ID
   - Instant and secure connection

---

## 🎯 Overview

An intelligent attendance management system based on:
- **QR Codes**: Simplified attendance registration
- **Local Network Distribution**: Works across connected devices on the same LAN
- **Bilingual Interface**: Full Arabic and English support (RTL)
- **IP Ban System**: Prevents duplicate attendance registration
- **Local Network Architecture**: Secure and private design without internet dependency

### Usage Scenario:

```
Administrator              Students
   ↓                          ↓
[Upload Student List]  →   [Visit Student Page]
[Start Lesson]         →   [Scan QR Code]
[View Live Attendance] ←   [Record Attendance]
[End Lesson]           ←   [Update List]
[Export to Excel]
```

---

## 🌐 Local Network Requirements

### Core Requirements:

#### 1. **Same Network/WiFi**
```
✅ All devices must be on the same local network
✅ Same SSID (WiFi)
✅ Same Router/Switch
❌ Cannot work over public internet
❌ Cannot work from outside the school
```

#### 2. **Local IP Address**
```bash
# Each device has a local IP:
- 192.168.1.x (common range)
- 192.168.x.x
- 10.0.0.x

# Example:
- Server (Admin): 192.168.1.50
- Student 1: 192.168.1.100 (mobile)
- Student 2: 192.168.1.101 (mobile)
```

#### 3. **Direct Connection**
```
NO need for:
- VPN
- Proxy
- Port Forwarding
- External DNS

Only:
- Direct connection between devices on same network
```

### Advantages:

✅ **Fast** - No latency
✅ **Secure** - Data never leaves the network
✅ **Reliable** - No dependency on external internet
✅ **Private** - No one outside can access data
✅ **Efficient** - Very low bandwidth consumption

### Limitations:

❌ **Classroom only** - Works within single network scope
❌ **No internet dependency** - Doesn't work if main internet is down
❌ **Inside only** - Cannot access from outside the network
❌ **Single device** - Server must stay running

---



### System Requirements:
- Node.js v18+
- npm or yarn
- Text editor (VS Code recommended)

### Dependencies:

#### Frontend:
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

#### Backend:
```javascript
// Core libraries:
- express
- cors
- fs (filesystem)
- path (path management)
```

---

## 📁 Project Structure

```
qr-generator/
├── app/                          # Frontend (Next.js)
│   ├── layout.tsx               # Main page layout
│   ├── page.tsx                 # Home page (role selection)
│   ├── globals.css              # Global styles
│   │
│   ├── admin/                   # Admin routes
│   │   └── page.jsx             # Admin dashboard
│   │       - Upload students
│   │       - Start lesson
│   │       - View attendance
│   │       - End lesson
│   │
│   ├── attent/                  # Student routes
│   │   └── page.jsx             # Attendance registration form
│   │       - Search student
│   │       - Register attendance
│   │
│   ├── api/                     # General API
│   │   └── api.js               # Server connection functions
│   │
│   └── context/                 # React Context
│       └── context.jsx          # Global state management
│
├── qr-backend/                  # Backend (Express)
│   ├── server.js                # Main server
│   ├── data.json                # Attendance database
│   ├── students.json            # Current student list
│   └── package.json
│
├── public/                      # Static files
├── package.json                 # Frontend dependencies
├── tsconfig.json               # TypeScript config
├── next.config.ts              # Next.js config
├── tailwind.config.js          # Tailwind CSS config
└── README.md                   # Project info
```

---

## 🚀 Installation & Running

### Step 1: Install Frontend

```bash
# Navigate to project directory
cd qr-generator

# Install dependencies
npm install

# Or using yarn
yarn install
```

### Step 2: Install Backend

```bash
# Navigate to backend directory
cd qr-backend

# Install dependencies
npm install
```

### Step 3: Run Backend Server

```bash
# From qr-backend directory
node server.js
```

**Expected Output:**
```
Server running at: http://192.168.x.x:5000
```

### Step 4: Run Frontend

```bash
# From project root directory
npm run dev
```

**Expected Output:**
```
▲ Next.js 16.1.6
- Local:        http://localhost:3000
```

### Access the Application:

- **Same machine**: http://localhost:3000
- **Local network**: http://192.168.x.x:3000

---

## 🎨 Frontend

### Home Page

```typescript
// app/page.tsx
- Two main options:
  1. Admin Login → /admin
  2. Student Attendance → /attent
  
- Design:
  - Responsive (mobile + desktop)
  - RTL support
  - Colors: Blue (Admin), Green (Students)
```

### Admin Dashboard (/admin)

**Features:**
1. **Authentication**
   - Password: `4223`
   - Access verification

2. **Upload Students**
   - Accept Excel files (.xlsx)
   - Required columns: [Student ID, Name, Surname, Department]
   - Data preview

3. **Start Lesson**
   - Send data to backend
   - Generate dynamic QR code

4. **Live Attendance View**
   - Student list with timestamps
   - Refresh button
   - Real-time updates

5. **End Lesson**
   - Export attendance to Excel
   - Clear server data
   - Filename: `سجل_الحضور_YYYY-MM-DD.xlsx`

**Key Components:**

```jsx
// Dynamic QR Code
<QRCodeCanvas 
  value={`http://192.168.1.36:3000/attent/${studentId}`}
  size={256}
/>

// Attendance Table
students.map(student => (
  <StudentRow key={student.studentId} student={student} />
))

// File Upload
<input type="file" accept=".xlsx" onChange={handleFileUpload} />
```

### Student Attendance Form (/attent)

**Features:**
1. **Lesson Status Verification**
   - Check if lesson has started
   - Verify attendance eligibility

2. **Student Search**
   - Enter student ID (7 digits)
   - Real-time search

3. **Record Attendance**
   - Display student info
   - Confirmation button
   - Status messages

**Status Codes:**
- `idle` - Ready
- `checking` - Verifying
- `searching` - Searching
- `success` - Success
- `banned` - IP already registered
- `no-lesson` - No active lesson
- `error` - Error

---

## 🔧 Backend

### Data Files

#### data.json
```json
{
  "attends": [
    {
      "studentId": "1234567",
      "name": "Ahmed",
      "surname": "Mohammed",
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
    "name": "Ahmed",
    "surname": "Mohammed",
    "dept_code": "CS"
  }
]
```

### Main Functions

```javascript
// 📄 Data Management
readData() → Read data.json
writeData(data) → Save data.json
readStudents() → Read students.json

// 🌐 Network Info
getClientIp(req) → Get client IP
getLocalIP() → Get server local IP

// ✅ Verification
lessonActive() → Is lesson active?
```

---

## 📡 Workflow

### 1️⃣ Start Lesson Flow

```
1. Admin enters password (4223)
2. Uploads Excel file with student list
3. System reads and extracts:
   - Student ID
   - Name
   - Surname
   - Department
4. Data sent to backend: POST /start-lesson
5. Backend saves to students.json
6. System displays QR code and student URL
```

### 2️⃣ Attendance Registration Flow

```
1. Student opens page /attent
2. System checks lesson status: GET /lesson-status
3. Verifies student IP: GET /check-ip
   - If in ban list → Error message
   - If lesson not started → Error message
4. Student enters ID
5. Find student: GET /student/:studentId
6. Display student information
7. On confirmation: POST /attendance
   - Verify identity
   - Add IP to ban list
   - Save attendance with timestamp
8. Success message
```

### 3️⃣ End Lesson Flow

```
1. Admin clicks "End Lesson"
2. Confirm action
3. Export data to Excel
4. Clear students.json
5. Reset data.json (template only)
6. Reset page
```

---

## 🗄️ Database

### Data Models

#### Student
```typescript
interface Student {
  studentId: string;      // 7-digit student number
  name: string;           // First name
  surname: string;        // Last name
  dept_code: string;      // Department code (CS, EE, etc)
}
```

#### Attendance Record
```typescript
interface AttendanceRecord extends Student {
  time: string;          // Registration time (ISO 8601)
}
```

#### Database
```typescript
interface DatabaseData {
  attends: AttendanceRecord[];  // Attendance records
  bannedIps: string[];          // Banned IP addresses
}
```

---

## 🔌 API Reference

### API Endpoints

#### 1. Start Lesson
```
POST /start-lesson
Content-Type: application/json

Request Body:
[
  {
    "studentId": "1234567",
    "name": "Ahmed",
    "surname": "Mohammed",
    "dept_code": "CS"
  }
]

Response:
{
  "message": "Data saved to JSON"
}
```

#### 2. Get Student
```
GET /student/:studentId

Example:
GET /student/1234567

Response:
{
  "studentId": "1234567",
  "name": "Ahmed",
  "surname": "Mohammed",
  "dept_code": "CS"
}
```

#### 3. Lesson Status
```
GET /lesson-status

Response:
{
  "status": true/false
}
```

#### 4. Check IP
```
GET /check-ip

Response (Active):
{
  "ok": true,
  "status": "idle",
  "message": "IP is clean",
  "ip": "192.168.1.100"
}

Response (Banned):
{
  "ok": false,
  "status": "banned",
  "message": "This IP already recorded attendance",
  "ip": "192.168.1.100"
}

Response (No Lesson):
{
  "ok": false,
  "status": "no-lesson",
  "message": "Lesson not started yet",
  "ip": "192.168.1.100"
}
```

#### 5. Get Students
```
GET /students

Response:
[
  {
    "studentId": "1234567",
    "name": "Ahmed",
    "surname": "Mohammed",
    "dept_code": "CS",
    "time": "2024-04-07T10:30:00.000Z"
  }
]
```

#### 6. Record Attendance
```
POST /attendance
Content-Type: application/json

Request Body:
{
  "studentId": "1234567",
  "ip": "192.168.1.100"
}

Response (Success):
{
  "ok": true,
  "message": "Attendance recorded",
  "student": {
    "studentId": "1234567",
    "name": "Ahmed",
    "surname": "Mohammed",
    "dept_code": "CS"
  }
}

Response (Banned):
{
  "ok": false,
  "message": "This IP already recorded attendance"
}
```

#### 7. End Lesson
```
POST /end-lesson

Response:
{
  "ok": true,
  "message": "Lesson ended, all attendance data cleared"
}
```

---

## 🔒 Security Features

### 1. Password Protection
```javascript
// Fixed password for admin
password === "4223"
// ⚠️ Note: Improve this for production
```

### 2. IP Ban System
```javascript
// Purpose: Prevent duplicate attendance
// Mechanism:
if (data.bannedIps.includes(ip)) {
  // Reject request
}
// Save IP after successful registration
data.bannedIps.push(ip);
```

### 3. Lesson Status Verification
```javascript
// Verify before each attendance request
if (!lessonActive()) {
  // Reject request
}
```

### 4. Student Verification
```javascript
// Check if student exists in list
const student = students.find(s => s.studentId === studentId);
if (!student) {
  // Reject request
}
```

---

## ⚙️ Important Configuration

### IP Addresses

```javascript
// In context.jsx
const API_URL = "http://192.168.1.36:5000"

// In attent/page.jsx
const API_URL = "http://192.168.1.36:5000"
```

**⚠️ Warning**: Update IP address to match your local network:
```bash
# Find server local IP:
- Windows PowerShell: ipconfig
- Linux/Mac: ifconfig or ip addr
```

### Application Ports

| Service | Port | URL |
|---------|------|-----|
| Backend | 5000 | http://IP:5000 |
| Frontend | 3000 | http://localhost:3000 |

---

## 📊 Usage Examples

### Example 1: Upload Student List (Excel)

**Expected File Format:**
| Student ID | Name | Surname | Department |
|-----------|------|---------|-----------|
| 1001234 | Ahmed | Mahmoud | CS |
| 1001235 | Fatima | Ali | EE |
| 1001236 | Mohammed | Ameen | CS |

### Example 2: Student QR Code

```
URL embedded in QR:
http://192.168.1.36:3000/attent

System automatically directs student
```

### Example 3: Export

```
Excel file:
- Name: سجل_الحضور_2024-04-07.xlsx
- Columns: Student ID, Name, Surname, Department, Time
```

---

## 🐛 Troubleshooting

### 🔴 Local Network Issues

#### Issue: Cannot access server from another device
```
Common Causes:
1. Devices on different WiFi networks
2. Wrong IP address
3. Firewall blocking connection
4. Server not running

Solution:
✅ Step 1: Verify same WiFi network
   - All devices on same SSID:
   Windows: ipconfig /all (look for SSID)
   Mac/Linux: networksetup -listallnetworkservices

✅ Step 2: Find correct server IP
   Windows PowerShell:
   ipconfig
   (Look for IPv4 Address under WiFi)
   
✅ Step 3: Update IP in files
   context.jsx:
   const API_URL = "http://192.168.1.XX:5000"
   (Replace XX with your number)
   
✅ Step 4: Test connection
   From other device: http://192.168.1.XX:5000/lesson-status
```

#### Issue: "Cannot connect to server" from student device
```
Solution:
1. Verify student device is on same WiFi
2. Verify correct IP in context.jsx
3. Verify server is running: node server.js
4. Try: ping 192.168.1.XX (from student device)
```

### Issue: "Cannot connect to server"
```
Solution:
1. Check if backend is running:
   → node qr-backend/server.js
2. Verify IP address
   → Open terminal and type: ipconfig
3. Update IP in context.jsx and attent/page.jsx
```

### Issue: "Student ID not found"
```
Solution:
1. Check if student list is uploaded
2. Verify entered student ID
3. Confirm lesson started successfully
```

### Issue: "This IP has already recorded attendance"
```
Solution:
1. Use a different device
2. Or wait for lesson to end and start new lesson
```

### Issue: "Lesson not started"
```
Solution:
1. Admin logs into control panel
2. Upload student list
3. Click "Start Lesson"
```

---

## 📱 Browser Compatibility

| Browser | Status |
|---------|--------|
| Chrome | ✅ Supported |
| Firefox | ✅ Supported |
| Safari | ✅ Supported |
| Edge | ✅ Supported |
| Mobile (iOS) | ⚠️ Partial |
| Mobile (Android) | ✅ Supported |

---

## 🚀 Future Improvements

- [ ] SQL Database (instead of JSON)
- [ ] Secure Admin Authentication (JWT)
- [ ] Password Encryption
- [ ] Advanced Dashboard
- [ ] Reports & Analytics
- [ ] Real-time Notifications
- [ ] Automatic Backups
- [ ] Additional Languages
- [ ] Dark Mode

---

## 📞 Support & Help

### Important Files:
- Admin Dashboard: [app/admin/page.jsx](app/admin/page.jsx)
- Student Page: [app/attent/page.jsx](app/attent/page.jsx)
- Backend: [qr-backend/server.js](qr-backend/server.js)
- State Management: [app/context/context.jsx](app/context/context.jsx)

### Useful Commands:

```bash
# Install dependencies
npm install

# Run frontend (development)
npm run dev

# Build production version
npm run build
npm start

# Check for errors
npm run lint

# Run backend server
node qr-backend/server.js
```

---

**Last Updated**: 2024-04-07  
**Version**: 0.1.0  
**Status**: 🟡 In Development

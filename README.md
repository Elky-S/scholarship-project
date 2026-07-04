# מערכת ניהול מלגות חכמה | Smart Scholarship Management System

מערכת Full-stack מתקדמת לניהול, הגשה ועיבוד בקשות למלגות. המערכת כוללת ממשקי משתמש ומנהל, אבטחה מחמירה ואוטומציות מתקדמות.

---

## 🇮🇱 תיאור הפרויקט (Hebrew)

פרויקט זה נבנה כדי לתת מענה מקיף לניהול תהליך המלגות - החל משלב הרישום והגשת הטפסים ועד לשלב האישור הסופי על ידי המנהל. דגש מיוחד הושם על חווית משתמש (UX) ועל שלמות הנתונים.

### 🔑 אבטחה וניהול משתמשים
* **התחברות מאובטחת:** שימוש ב-**JWT (JSON Web Tokens)** לניהול סשן מאובטח. הטוקן נשמר בדפדפן ומאפשר גישה לנתיבים מוגנים (Protected Routes).
* **הצפנה:** סיסמאות המשתמשים מוצפנות במסד הנתונים באמצעות **bcrypt**.
* **מנגנון יציאה (Logout):** אפשרות יציאה מסודרת המנקה את הטוקן ואת ה-State ב-Redux למניעת גישה לא מורשית.
* **הפרדת הרשאות:** מערכת ניהול הרשאות המבדילה בין **משתמש (User)** לבין **מנהל (Admin)**, כאשר לכל אחד ממשק עבודה שונה לחלוטין.

### 📝 ממשק משתמש (User Mode)
* **טופס רב-שלבי (Multi-step Form):** חלוקה חכמה ל-4 שלבים (פרטים אישיים, נתוני משפחה, מסלול לימודים ופרטי בנק).
* **ניהול טיוטות ופרסיסטנטיות:** המערכת שומרת את התקדמות המשתמש ב-Real-time במסד הנתונים. משתמש יכול להתנתק ולחזור להשלים את הטופס מכל מכשיר מבלי לאבד מידע.
* **אינטגרציית Google Maps:** הטמעת **Google Places Autocomplete** לאימות כתובות מדויק ומניעת טעויות הקלדה.
* **ניהול קבצים:** העלאת מסמכים (צילום ת"ז ואישור בנק) באמצעות **Multer**. המערכת יודעת לזהות קבצים קיימים בשרת ולמנוע כפילויות או דריסת מידע בשמירה חוזרת.

### 🛡️ ממשק מנהל (Admin Mode)
* **לוח בקרה (Dashboard):** צפייה בכל הבקשות שהוגשו במערכת בזמן אמת.
* **ניהול סטטוסים:** למנהל אפשרות לעבור על כל בקשה, לבחון את המסמכים המצורפים ו**לאשר או לדחות** את הבקשה בלחיצת כפתור.
* **שינוי סטטוס דינמי:** כל שינוי של המנהל מעדכן את מסד הנתונים ומשתקף מיד אצל המשתמש.

### ✉️ אוטומציות ו-External APIs
* **אוטומציית מיילים:** שימוש ב-**Nodemailer** לשליחת הודעות אוטומטיות למשתמש ברגע הגשת הבקשה וברגע שינוי הסטטוס על ידי המנהל.
* **SweetAlert2:** ממשק הודעות קופצות (Popups) מתקדם לחיווי על הצלחה, שגיאות ואישורי פעולות קריטיות.

---

## 🌐 Project Description (English)

A comprehensive Full-stack application designed to streamline the scholarship lifecycle, from user registration and document submission to admin evaluation and approval.

### 🔑 Security & Authentication
* **Secure Authentication:** Implemented using **JWT (JSON Web Tokens)** for session management and protected routing.
* **Password Hashing:** Utilizing **bcrypt** for industry-standard password encryption.
* **Logout Mechanism:** Clear session termination that wipes tokens and Redux state.
* **Role-Based Access Control (RBAC):** Distinct environments and permissions for **Users** and **Admins**.

### 📝 User Features
* **Advanced Multi-step Form:** A sophisticated 4-stage wizard (Personal, Family, Academic, and Bank details).
* **Draft Persistence Engine:** Real-time database sync for partial submissions, allowing users to resume their progress seamlessly across sessions.
* **Google Maps Integration:** Integrated **Google Places API** for verified address autocomplete.
* **Smart File Handling:** Document upload system (ID, Bank statements) using **Multer/FormData** with logic to prevent data loss during draft updates.

### 🛡️ Admin Capabilities
* **Centralized Dashboard:** Real-time overview of all scholarship applications.
* **Approval Workflow:** Admins can review user documents and **approve/reject** applications with a single click.
* **Live Status Updates:** Dynamic database updates that reflect application status changes instantly on the user's side.

### ✉️ Automated Logic & Integrations
* **Email Automation:** **Nodemailer** integration for automated triggers upon application submission and status updates.
* **State Management:** Powered by **Redux** for consistent data flow across the entire application.
* **UI/UX:** Enhanced with **SweetAlert2** for interactive and intuitive user feedback.

---

## 🛠 Tech Stack | טכנולוגיות

| Category | Technology |
| :--- | :--- |
| **Frontend** | React.js, Redux, Axios, SweetAlert2, CSS3 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Security** | JWT, bcrypt |
| **Integrations** | Google Places API, Nodemailer |
| **File Handling** | Multer, FormData |

---

## ⚙️ Setup & Installation

1. **Clone the project**
2. **Backend:** `cd milgoBackend` -> `npm install` -> Configure `.env` -> `npm start`
3. **Frontend:** `cd elkysProject` -> `npm install` -> `npm start`

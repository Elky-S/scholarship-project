import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";

const app = express();

// --- 1. Middleware הגדרות בסיסיות ---

// הגשת קבצים סטטיים - מספיק פעם אחת
app.use("/uploads", express.static("uploads"));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// הגדרת CORS - חשוב מאוד ש-credentials יהיה true כדי שהעוגיות/טוקנים יעברו
app.use(
  cors({
    origin: ["http://localhost:3000", "https://scholarship-r071.onrender.com"],
    credentials: true,
  }),
);

app.use(cookieParser());

// --- 2. Routes (נתיבים) ---

// נתיבי אימות (כאן אמור להיות הנתיב /me שבודק אם המשתמש מחובר)
app.use("/api/auth", authRoutes);

// נתיבי בקשות המלגה
app.use("/api/requests", requestRoutes);

// --- 3. התחברות ל-MongoDB ---
const DB_URI = process.env.MONGO_URI;

mongoose
  .connect(DB_URI)
  .then(() => console.log("✅ Connected to MongoDB locally"))
  .catch((err) => console.error("❌ Connection error:", err));

// --- 4. טיפול בשגיאות גלובלי ---
// זה חייב לבוא אחרי ה-Routes כדי לתפוס שגיאות שקורות בהם
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res
      .status(400)
      .json({ message: "שגיאת Multer (העלאת קבצים)", error: err.message });
  } else if (err) {
    console.error("Global Error:", err.stack);
    return res
      .status(500)
      .json({ message: "שגיאה כללית בשרת", error: err.message });
  }
  next();
});

// --- 5. הרצה ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

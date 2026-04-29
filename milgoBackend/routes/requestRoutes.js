import express from "express";
const router = express.Router();

// ייבוא המידלוורס
import { admin, protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js"; // המידלוור של multer

// ייבוא הפונקציות מהקונטרולר
import {
  saveRequest,
  getMyDraft,
  getAllRequests,
  updateRequestStatus,
  getMyRequestStatus,
} from "../controllers/requestController.js";

// --- נתיבים למשתמש (סטודנט) ---

// 1. שליפת טיוטה קיימת (כדי להציג אותה כשהוא נכנס לטופס)
router.get("/draft", protect, getMyDraft);
// ניתוב לשליפת סטטוס הבקשה של המשתמש המחובר
router.get("/my-request", protect, getMyRequestStatus);

// 2. הגשת בקשה או שמירת טיוטה (כולל העלאת קבצים)
// שימי לב: הוספנו את upload.fields כדי לקבל קבצים ספציפיים
router.post(
  "/submit",
  protect,
  upload.fields([
    { name: "idCardFile", maxCount: 1 }, // צילום ת"ז
    // { name: "parentIdCard", maxCount: 1 }, // ת"ז הורים
    // { name: "studyApproval", maxCount: 1 }, // אישור לימודים
    { name: "bankApprovalFile", maxCount: 1 }, // אישור חשבון בנק
  ]),
  saveRequest,
);

// --- נתיבים למנהל ---
router.get("/all", protect, admin, getAllRequests);
router.put("/status/:id", protect, admin, updateRequestStatus);
router.patch("/status/:id", protect, admin, updateRequestStatus);

export default router;

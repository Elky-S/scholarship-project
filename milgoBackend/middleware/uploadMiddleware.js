import multer from 'multer';
import path from 'path';
import fs from 'fs';

// וידוא שהתיקייה קיימת (אם לא, הקוד ייצור אותה)
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // החלפת רווחים בקו תחתון כדי למנוע בעיות בנתיבים
    const safeName = file.originalname.replace(/\s+/g, '_');
    cb(null, `${Date.now()}-${safeName}`);
  }
});

// בבדיקה היסודית - נבטל רגע את ה-fileFilter כדי לראות אם הוא המקור לבעיה
export const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // נגדיל ל-10MB
});
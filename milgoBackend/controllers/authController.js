import User from "../models/User.js"; // חובה להוסיף .js בסוף
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// פונקציית הרשמה
export const register = async (req, res) => {
  console.log("Data received in register:", req.body);
  try {
    const { idNumber, firstName, lastName, email, password } = req.body;

    // 1. בדיקה אם קיים משתמש (ת"ז או מייל)
    const existingUser = await User.findOne({
      $or: [{ idNumber }, { email }],
    });

    if (existingUser) {
      if (existingUser.idNumber === idNumber) {
        return res
          .status(400)
          .json({ message: "מספר תעודת הזהות כבר רשום במערכת" });
      }
      if (existingUser.email === email) {
        return res
          .status(400)
          .json({ message: "כתובת האימייל כבר רשומה במערכת" });
      }
    }

    // 2. הצפנת הסיסמה
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. יצירת המשתמש
    const user = new User({
      firstName,
      lastName,
      idNumber,
      email,
      password: hashedPassword,
    });

    // 4. שמירה
    await user.save();

    // --- 5. יצירת טוקן (זה החלק שהיה חסר!) ---
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET, // ודאי שהמשתנה הזה מוגדר בקובץ .env שלך
      { expiresIn: "30d" },
    );
    // החזרת תשובה תקינה עם אובייקט המשתמש
    return res.status(201).json({
      message: "המשתמש נרשם בהצלחה!",
      token: token, // הטוקן נשלח כאן
      user: {
        idNumber: user.idNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    }); // <--- כאן נסגר ה-res.json
  } catch (error) {
    // <--- כאן הוספתי את ה-} שסוגר את ה-try
    console.error("Register Error:", error);
    res.status(500).json({ message: "שגיאת שרת", error: error.message });
  }
};
// פונקציית התחברות
export const login = async (req, res) => {
  try {
    const { idNumber, password } = req.body;

    // 1. חיפוש המשתמש לפי מ.ז
    const user = await User.findOne({ idNumber });
    if (!user) {
      return res.status(401).json({ message: "פרטי התחברות שגויים" });
    }

    // 2. בדיקה אם הסיסמה שהוזנה מתאימה לסיסמה המוצפנת ב-DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "פרטי התחברות שגויים" });
    }

    // 3. יצירת Token (המפתח הסודי של המשתמש)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret_key_123", // מפתח להצפנת הטוקן
      { expiresIn: "1h" }, // תוקף הטוקן ליום אחד
    );

    // 4. שמירת הטוקן בעוגייה (Cookie) כפי שנדרש באפיון
    res.cookie("token", token, {
      httpOnly: true, // אבטחה: מונע גישה לטוקן דרך JavaScript בדפדפן
      maxAge: 60 * 60 * 1000, // יום אחד במילי-שניות
    });

    res.json({
      message: "התחברת בהצלחה!",
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        idNumber: user.idNumber,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "שגיאת שרת", error: error.message });
  }
};
export const getMe = async (req, res) => {
  try {
    // req.user מגיע מהמידלוור protect
    if (!req.user) {
      return res.status(404).json({ message: "משתמש לא נמצא" });
    }

    // מחזירים את נתוני המשתמש (בלי הסיסמה כמובן)
    res.status(200).json(req.user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "שגיאה בשליפת נתוני משתמש", error: error.message });
  }
};
// פונקציה לחידוש טוקן קיים (נקראת כשהמשתמש לוחץ "הישאר מחובר")
export const refreshToken = async (req, res) => {
  try {
    // req.user כבר קיים בזכות ה-protect middleware
    const user = req.user;

    const newToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret_key_123",
      { expiresIn: "1h" },
    );

    res.cookie("token", newToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "החיבור חודש בהצלחה",
      token: newToken, // מחזירים גם ב-body למקרה שאת שומרת ב-localStorage
    });
  } catch (error) {
    res.status(500).json({ message: "שגיאת שרת בחידוש הטוקן" });
  }
};
// הוספה ל-authController.js
export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // תאריך בעבר גורם למחיקה מיידית בדפדפן
    // ודאי שהגדרות ה-SameSite וה-Secure תואמות למה שהגדרת ב-Login
    sameSite: "strict",
  });
  res.status(200).json({ message: "התנתקת בהצלחה" });
};

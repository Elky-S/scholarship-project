import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  // 1. בדיקה אם הטוקן בכלל מגיע ב-Headers
  const authHeader = req.headers.authorization;
  console.log("SERVER DEBUG - Auth Header:", authHeader);

  const token = authHeader?.split(" ")[1];

  if (!token) {
    console.log("SERVER DEBUG - No token found in request");
    return res.status(401).json({ message: "לא נמצא טוקן, גישה נדחתה" });
  }

  try {
    // 2. בדיקה אם האימות של ה-JWT מצליח
    // שימי לב: ודאי ש-process.env.JWT_SECRET מוגדר וזהה למה שהשתמשת ב-Login
    console.log(
      "SERVER DEBUG - Secret used for verify:",
      process.env.JWT_SECRET ? "Defined" : "UNDEFINED!",
    );

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("SERVER DEBUG - Decoded Payload:", decoded);

    // 3. בדיקה אם המשתמש קיים ב-DB לפי ה-ID מהטוקן
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      //   console.log(
      //     "SERVER DEBUG - User ID from token not found in Database:",
      //     decoded.id,
      //   );
      return res.status(401).json({ message: "המשתמש לא קיים במערכת" });
    }

    // console.log("SERVER DEBUG - Access Granted for user:", req.user.email);
    next();
  } catch (error) {
    // 4. פירוט השגיאה של ה-JWT (פג תוקף, חתימה לא נכונה וכו')
    // console.error("SERVER DEBUG - JWT Verification Error:", error.message);
    return res.status(401).json({ message: "טוקן לא תקין או פג תוקף" });
  }
};
// Middleware נוסף לבדיקה אם המשתמש הוא מנהל
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "גישה נדחתה, דרושות הרשאות מנהל" });
  }
};

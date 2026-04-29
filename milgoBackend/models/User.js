import mongoose from 'mongoose';

// הגדרת המבנה של המשתמש במסד הנתונים
const userSchema = new mongoose.Schema({
  idNumber: { 
    type: String, 
    required: true, 
    unique: true, // מונע רישום כפול של אותה תעודת זהות
    trim: true 
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true }, // השדה החדש
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' // ברירת מחדל למשתמש רגיל
  }
}, { timestamps: true }); // מוסיף אוטומטית שדות של "נוצר ב-" ו"עודכן ב-"

// ייצוא המודל כדי שנוכל להשתמש בו ב-Controller
const User = mongoose.model('User', userSchema);
export default User;
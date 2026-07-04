import { useState } from "react";
import "../form/style.css";
import { setCurrent } from "../redux/Users";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import api from "../api"; // ייבוא ה-API לחיבור לשרת

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // אתחול האובייקט - שמות המפתחות שונו כדי להתאים ל-Schema ב-Backend
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    idNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // פונקציית בדיקות תקינות
  const validateField = (name, value) => {
    let error = "";

    if (!value) error = "שדה זה הוא שדה חובה";

    // בדיקת תקינות אימייל
    if (name === "email" && value && !/\S+@\S+\.\S+/.test(value))
      error = "כתובת אימייל לא תקינה";

    if (name === "idNumber" && value && !/^\d{9}$/.test(value))
      error = "תעודת זהות חייבת להכיל 9 ספרות";

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const onlyLetters = (value) => /^[א-תa-zA-Z\s]*$/.test(value);

  // פונקציית שליחת הטופס לשרת
  const register = async () => {
    localStorage.clear();
    sessionStorage.clear();
    // מחיקת קוקיז (למקרה שהשרת שתל כאלו)
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    // בדיקה אם יש שדות ריקים
    if (!Object.values(newUser).every((v) => v !== "")) {
      swal("Error", "יש למלא את כל הטופס לפני הרשמה!", "error");
      return;
    }
    // בדיקה אם יש שגיאות ולידציה
    if (Object.values(errors).some((e) => e !== "")) {
      swal("Error", "יש לתקן את כל השגיאות לפני הרשמה!", "error");
      return;
    }

    try {
      localStorage.clear();
      sessionStorage.clear();
      dispatch(setCurrent(null));
      // שליחת הנתונים ל-API שבנינו ב-Node.js
      const response = await api.post("/auth/register", newUser);
      console.log("FULL SERVER RESPONSE:", response.data);

      // נסיון חילוץ גמיש יותר של הטוקן
      const token =
        response.data.token ||
        response.data.accessToken ||
        (response.data.user && response.data.user.token);
      // 3. שמירת הטוקן החדש ב-LocalStorage (חשוב מאוד!)
      if (token) {
        localStorage.setItem("token", response.data.token);
        console.log("Token saved successfully:", response.data.token);
        // עדכון ה-Header של ה-API באופן מיידי כדי שהבקשה הבאה תזהה את המשתמש החדש
        api.defaults.headers.common["Authorization"] =
          `Bearer ${response.data.token}`;
      }
      console.log("Server response:", response.data);
      // עדכון ה-Redux עם המשתמש שחזר מהשרת (כולל ה-Role וה-ID מה-DB)
      const userToSave = response.data.user || response.data;
      dispatch(setCurrent(userToSave));

      swal(
        `Hello ${newUser.firstName} 😃`,
        "Register successfully!",
        "success",
      );
      navigate("/");
    } catch (error) {
      // טיפול בשגיאות מהשרת (למשל אם המשתמש כבר קיים)
      //   const errMsg = error.response?.data?.message || "שגיאה בתהליך ההרשמה";
      //   swal("Error", errMsg, "error");
      alert(JSON.stringify(error.response?.data));

      const errMsg = error.response?.data?.message || "שגיאה בתהליך ההרשמה";
      swal("Error", errMsg, "error");
    }
  };

  return (
    <div className="form-box">
      <form onSubmit={(e) => e.preventDefault()}>
        {/* שם פרטי */}
        <label>input name</label>
        <input
          placeholder="input name"
          value={newUser.firstName}
          className={errors.firstName ? "input-error" : ""}
          onChange={(e) => {
            if (onlyLetters(e.target.value)) {
              setNewUser({ ...newUser, firstName: e.target.value });
              setErrors({ ...errors, firstName: "" });
            }
          }}
          onBlur={(e) => validateField("firstName", e.target.value)}
        />
        {errors.firstName && <div className="error">{errors.firstName}</div>}

        {/* שם משפחה */}
        <label>input last name</label>
        <input
          placeholder="input last name"
          value={newUser.lastName}
          className={errors.lastName ? "input-error" : ""}
          onChange={(e) => {
            if (onlyLetters(e.target.value)) {
              setNewUser({ ...newUser, lastName: e.target.value });
              setErrors({ ...errors, lastName: "" });
            }
          }}
          onBlur={(e) => validateField("lastName", e.target.value)}
        />
        {errors.lastName && <div className="error">{errors.lastName}</div>}

        {/* אימייל - שדה חדש הכרחי ל-Backend */}
        <label>input email</label>
        <input
          placeholder="input email"
          value={newUser.email}
          className={errors.email ? "input-error" : ""}
          onChange={(e) => {
            setNewUser({ ...newUser, email: e.target.value });
            validateField("email", e.target.value);
          }}
          onBlur={(e) => validateField("email", e.target.value)}
        />
        {errors.email && <div className="error">{errors.email}</div>}

        {/* תעודת זהות */}
        <label>input id</label>
        <input
          placeholder="input id"
          value={newUser.idNumber}
          className={errors.idNumber ? "input-error" : ""}
          onChange={(e) => {
            setNewUser({ ...newUser, idNumber: e.target.value });
            validateField("idNumber", e.target.value);
          }}
          onBlur={(e) => validateField("idNumber", e.target.value)}
        />
        {errors.idNumber && <div className="error">{errors.idNumber}</div>}

        {/* סיסמה - עם ה-SVG המקוריים שלך */}
        <label>input your password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            className={`password-input ${errors.password ? "input-error" : ""}`}
            placeholder="password"
            value={newUser.password}
            onChange={(e) => {
              setNewUser({ ...newUser, password: e.target.value });
              if (e.target.value) setErrors({ ...errors, password: "" });
            }}
            onBlur={(e) => validateField("password", e.target.value)}
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M2 5.27 3.28 4 20 20.72 18.73 22l-3.2-3.2A10.9 10.9 0 0 1 12 19c-7 0-11-7-11-7a21 21 0 0 1 4.06-5.94L2 5.27zm6.11 6.11a4 4 0 0 0 5.22 5.22l-5.22-5.22zm3.55-6.38A10.8 10.8 0 0 1 12 5c7 0 11 7 11 7a21 21 0 0 1-4.33 6.06L16.5 15a4 4 0 0 0-4.89-4.89L9.66 7.94l2-2z"
                />
              </svg>
            )}
          </span>
        </div>
        {errors.password && <div className="error">{errors.password}</div>}
      </form>

      <button className="login-btn" onClick={register}>
        Register
      </button>
    </div>
  );
};

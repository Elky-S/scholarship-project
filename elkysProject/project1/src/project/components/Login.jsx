import { selectAlleUsers } from "../redux/Users";
import { useDispatch, useSelector } from "react-redux";
import "../form/style.css";
import { setCurrent, selecCurrent } from "../redux/Users";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import api from "../api";

export const Login = () => {
  const list = useSelector(selectAlleUsers);
  const cur = useSelector(selecCurrent);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  // פונקציה הבודקת אם משתמש חדש ואם כן- מפנה להרשמה
  const check = async () => {
    try {
      // 1. פנייה ל-Backend
      const response = await api.post("/auth/login", {
        idNumber: user.idNumber,
        password: user.password,
      });
      const loggedInUser = response.data.user; // הנתונים מה-DB (שם, תפקיד וכו')
      // console.log(loggedInUser);
      const token = response.data.token;
      localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
      if (token) {
        localStorage.setItem("token", token);
      }
      // 2. אם הצליח - מעדכנים Redux עם מה שחזר מהשרת
      dispatch(setCurrent(loggedInUser));

      // console.log("User saved to Redux:", loggedInUser);

      // 3. ניווט לפי התפקיד שחזר מה-DB
      if (loggedInUser.role === "admin") {
        navigate("/Manager");
      } else {
        navigate("/");
      }
    } catch (error) {
      // 4. טיפול בשגיאה מהשרת
      const message = error.response?.data?.message || "שגיאה בהתחברות";
      if (message.includes("לא נמצא")) {
        swal(`Oopps!`, "לא רשום, מעבירים אותך להרשמה", "info");
        navigate("/Register");
      } else {
        swal(`Oopps!`, message, "error");
      }
    }
  };
  return (
    <>
      <div className="form-box">
        <form>
          <label>תעודת זהות</label>
          <br />
          <br />
          <input
            placeholder="הכנס תעודת זהות"
            type="text"
            onBlur={(e) => setUser({ ...user, idNumber: e.target.value })}
          />
          <br />
          <br />
          <label>input your password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className="password-input"
              placeholder="password"
              onBlur={(e) => setUser({ ...user, password: e.target.value })}
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
        </form>
        <button className="login-btn" onClick={check}>
          Login
        </button>
      </div>
    </>
  );
};

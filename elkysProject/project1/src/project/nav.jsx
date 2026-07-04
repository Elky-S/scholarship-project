import { NavLink, useNavigate } from "react-router-dom";
import { Name } from "./components/Home";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { setCurrent, selecCurrent } from "./redux/Users";
import swal from "sweetalert";
import api from "./api";

export const Nav = () => {
  const current = useSelector(selecCurrent);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUserLoggedIn = current && current.firstName;
  const iFmanager = current?.role === "admin";

  // 1. פונקציית העזר לניקוי - מחוץ ל-handleLogout
  const performActualLogout = async () => {
    try {
      // 1. קריאה לשרת שיבטל את העוגייה ה-HttpOnly
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout request failed:", err);
    }

    // 2. ניקוי ה-State ב-Redux והאחסון המקומי
    dispatch(setCurrent(null));
    localStorage.clear();
    sessionStorage.clear();

    // 3. הסרת ה-Authorization Header
    delete api.defaults.headers.common["Authorization"];

    // 4. ניווט לדף הבית וריענון (כדי לנקות שאריות ב-Memory)
    window.location.href = "/";
  };

  // 2. הפונקציה שמופעלת בלחיצה
  const handleLogout = () => {
    let isStaying = false;

    // טיימר ל-2 דקות
    const logoutTimer = setTimeout(() => {
      if (!isStaying) {
        performActualLogout();
      }
    }, 120000);

    swal({
      title: "אתה עומד לצאת מהמערכת",
      text: "החיבור שלך יסתיים בעוד 2 דקות. האם ברצונך להישאר מחובר?",
      icon: "warning",
      buttons: {
        cancel: "צא עכשיו",
        confirm: {
          text: "הישאר מחובר",
          value: "stay",
        },
      },
      dangerMode: true,
      closeOnClickOutside: false,
    }).then(async (value) => {
      if (value === "stay") {
        isStaying = true;
        clearTimeout(logoutTimer);

        try {
          // ודאי שהנתיב בשרת הוא /auth/ או /users/ לפי מה שהגדרת ב-App.js
          const response = await api.get("/auth/refresh-token");
          if (response.status === 200) {
            swal("חודש!", "החיבור שלך הוארך בהצלחה.", "success");
          }
        } catch (err) {
          console.error("Refresh token failed:", err);
          swal("שגיאה", "פג תוקף החיבור, יש להתחבר מחדש", "error");
          performActualLogout();
        }
      } else {
        // המשתמש לחץ "צא עכשיו"
        clearTimeout(logoutTimer);
        performActualLogout();
      }
    });
  };

  return (
    <div className="div">
      <label className="name">
        <Name />
      </label>

      <NavLink to="/" className="link">
        Home
      </NavLink>

      {!isUserLoggedIn && (
        <>
          <NavLink to="login" className="link">
            Login
          </NavLink>
          <NavLink to="register" className="link">
            Register
          </NavLink>
        </>
      )}

      <NavLink to="apply" className="link">
        Apply
      </NavLink>

      {iFmanager && (
        <NavLink to="manager" className="link">
          Manager
        </NavLink>
      )}

      {isUserLoggedIn && (
        <button onClick={handleLogout} className="link logout-btn">
          Logout
        </button>
      )}
    </div>
  );
};

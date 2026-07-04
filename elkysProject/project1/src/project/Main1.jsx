import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Nav } from "./nav";
import { Routing } from "./routing";
import { setCurrent } from "./redux/Users";
import api from "./api";

export const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          // ניסיון אימות מול השרת
          const response = await api.get("/auth/me");
          dispatch(setCurrent(response.data));
        } catch (err) {
          console.error("Session invalid or expired");
          // אם האימות נכשל (למשל טוקן של מנהל כשאנחנו רוצים להיות סטודנט)
          // אנחנו מנקים הכל כדי לא להיתקע
          localStorage.removeItem("token");
          localStorage.removeItem("currentUser");
          dispatch(setCurrent(null));
        }
      }
    };

    initAuth();
  }, [dispatch]);

  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Nav />
      <Routing />
    </BrowserRouter>
  );
};

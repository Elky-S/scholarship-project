import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selecCurrent } from "../redux/Users";
import swal from "sweetalert";
import "./css/apply.css";
import {
  FaBook,
  FaFileAlt,
  FaClipboardList,
  FaInfoCircle,
  FaLightbulb,
} from "react-icons/fa";

export const Apply = () => {
  const navigate = useNavigate();
  const c = useSelector(selecCurrent);

  const go = (n) => {
    if (!c || !c.firstName) {
      swal(
        `Oopps!`,
        "לא בוצעה כניסה למערכת  \nאנו מפנים אותך לדף הכניסה",
        "warning",
      );
      navigate("/login");
    } else {
      if (n === 1) navigate("/applyRequests");
      else navigate("/viewStatus");
    }
  };

  return (
    <>
      <div className="apply-page">
        <div className="apply-icons">
          <FaBook className="icon" />
        </div>
        {/* כותרת מרכזית */}
        <h1 className="fade-in" style={{ animationDelay: "0s" }}>
          Welcome to the requests area
        </h1>

        {/* טקסט נוסף */}
        <p className="apply-text fade-in" style={{ animationDelay: "0.2s" }}>
          Here you can submit scholarship applications and check the status of
          existing applications. The system is updated regularly, and it is
          recommended to follow all notifications. In addition, you can find
          guides, tips and important information about scholarship eligibility.
        </p>

        {/* כפתורים במרכז */}
        <div
          className="apply-buttons fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <button className="btn" onClick={() => go(1)}>
            <FaFileAlt /> Apply
          </button>
          <button className="btn" onClick={() => go(2)}>
            {" "}
            <FaClipboardList /> View status
          </button>
        </div>

        {/* תוכן נוסף למילוי הדף */}
        <div className="apply-extra fade-in" style={{ animationDelay: "0.6s" }}>
          <h2>
            Additional information for students <FaLightbulb />
          </h2>
          <p>
            We recommend that you read all instructions carefully before
            submitting an application. Inaccuracies or missing documents may
            delay the processing of your application. It is also a good idea to
            follow the latest publications on the site and use the resources
            available to you through your personal area.
          </p>
        </div>
      </div>
    </>
  );
};

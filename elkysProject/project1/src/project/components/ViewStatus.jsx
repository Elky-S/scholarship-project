import { useSelector } from "react-redux";
import { selectRequests } from "../redux/Requests";
import { useEffect, useState } from "react";
import { selecCurrent } from "../redux/Users";
import { FaSpinner, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import "./css/apply.css"; // נשתמש באותו CSS של Apply
import api from "../api"; // או הנתיב המדויק שבו נמצא קובץ ה-API שלך

export const ViewStatus = () => {
  const data = useSelector(selectRequests);
  const currentUser = useSelector(selecCurrent);
  //   const [curStatus, setCurStatus] = useState(null);
  const [request, setRequest] = useState(null); // שומר את נתוני הבקשה מהשרת
  const [loading, setLoading] = useState(true); // מנהל את מצב הטעינה (מתחיל ב-true)

  useEffect(() => {
    const fetchUserRequest = async () => {
      try {
        setLoading(true);
        // קריאה לשרת להבאת הבקשות של המשתמש המחובר
        const response = await api.get("/requests/my-request");

        // השרת מחזיר בדרך כלל מערך, ניקח את הבקשה האחרונה
        if (response.data) {
          setRequest(response.data);
        }
      } catch (err) {
        console.error("Error fetching request:", err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUserRequest();
    } else {
      setLoading(false);
    }
  }, [currentUser]);
  const curStatus = request ? request.status : null;
  if (loading)
    return (
      <div className="view-status-box">
        <FaSpinner className="status-icon spinner" /> Loading...
      </div>
    );

  const status = request?.status;

  return (
    <div className="apply-page">
      <h1>Your application status</h1>

      <div className="view-status-box">
        {/* תנאי ראשון: האם אנחנו בטעינה? */}
        {loading ? (
          <div className="loading-spinner">
            <p>
              Checking server...
              <FaSpinner className="status-icon spinner-ani" />
            </p>
          </div>
        ) : curStatus === "בהמתנה" ? (
          /* תנאי שני: האם הסטטוס הוא בהמתנה? */
          <p>
            The request is under review.
            <FaSpinner className="status-icon" />
          </p>
        ) : curStatus === "מאושר" ? (
          /* תנאי שלישי: האם מאושר? */
          <p>
            Your request has been approved!{" "}
            <FaCheckCircle className="status-icon" />
          </p>
        ) : !request ? (
          /* תנאי רביעי: האם בכלל אין בקשה ב-DB? */
          <p>
            No requests for viewing{" "}
            <FaExclamationCircle className="status-icon" />
          </p>
        ) : (
          /* ברירת מחדל: הסטטוס הוא כנראה "דחוי" */
          <p>
            Your request was denied.{" "}
            <FaExclamationCircle className="status-icon error" />
          </p>
        )}
      </div>

      {/* מידע נוסף - מופיע רק אם נמצאה בקשה */}
      {request && (
        <div className="apply-extra">
          <h2>Request Details</h2>
          <p>Track your application in real time.</p>
          <div style={{ marginTop: "10px", color: "#666" }}>
            <p>
              <strong>Last Updated:</strong>{" "}
              {new Date(request.updatedAt).toLocaleDateString("he-IL")} |{" "}
              {new Date(request.updatedAt).toLocaleTimeString("he-IL", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      )}

      {/* הסבר כללי על המערכת */}
      <div className="apply-extra">
        <h2>More information</h2>
        <p>
          Here you can track the status of your applications in real time. We
          recommend checking the page regularly and following all new
          announcements.
        </p>
      </div>
    </div>
  );
};

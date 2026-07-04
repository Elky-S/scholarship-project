// import { useDispatch, useSelector } from "react-redux";
// import {
//   Search,
//   Filter,
//   RotateCcw,
//   Users,
//   MapPin,
//   ListFilter,
// } from "lucide-react";
// import {
//   allow,
//   reject,
//   selectNotAllowed,
//   setAllRequests,
// } from "../redux/Requests"; // setAllRequests
// import Swal from "sweetalert2";
// import { useState, useEffect } from "react";
// import {
//   FileText,
//   Landmark,
//   User,
//   MapPin,
//   Phone,
//   CreditCard,
// } from "lucide-react";
// import "./css/manager.css";
// import api from "../api"; //  את הקישור ל-API

// export const Manager = () => {
//   // שליפת הבקשות מה-Redux
//   const details = useSelector(selectNotAllowed);
//   const [loading, setLoading] = useState(true);
//   const [openRequestId, setOpenRequestId] = useState(null);
//   const dispatch = useDispatch();

//   // מצב חדש עבור הפילטרים
//   const [filters, setFilters] = useState({
//     search: "",
//     status: "",
//     city: "",
//     minBrothers: "",
//   });
//   // --- שינוי 1: שליפת הנתונים מהשרת כשהדף עולה ---
//   const fetchRequests = (currentFilters = filters) => {
//     setLoading(true);

//     // בניית הפרמטרים לשאילתה
//     const params = {};
//     if (currentFilters.search) params.search = currentFilters.search;
//     if (currentFilters.status) params.status = currentFilters.status;
//     if (currentFilters.city) params.city = currentFilters.city;
//     if (currentFilters.minBrothers)
//       params.minBrothers = currentFilters.minBrothers;

//     api
//       .get("/requests/all", { params })
//       .then((res) => dispatch(setAllRequests(res.data)))
//       .catch((err) => console.error("Error:", err))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleReset = () => {
//     const emptyFilters = { search: "", status: "", city: "", minBrothers: "" };
//     setFilters(emptyFilters);
//     fetchRequests(emptyFilters);
//   };
//   const upDate = (actionType, id) => {
//     // 1. הגדרת הסטטוס הסופי שנשלח ל-DB
//     const statusToSend = actionType === "allow" ? "מאושר" : "דחוי";
//     const titleText =
//       actionType === "allow" ? "Approve request?" : "Reject request?";

//     Swal.fire({
//       title: titleText,
//       text: "Performing this action cannot be undone!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes",
//       confirmButtonColor: "#05807f",
//       cancelButtonText: "Cancel",
//       cancelButtonColor: "#cc3333",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // --- שימי לב לכתובת: היא זהה לחלוטין לשני המקרים ---
//         api
//           .patch(`/requests/status/${id}`, { status: statusToSend })
//           .then(() => {
//             if (actionType === "allow") {
//               dispatch(allow(id));
//               Swal.fire("Success", "הבקשה אושרה", "success");
//             } else {
//               dispatch(reject(id));
//               Swal.fire("Done!", "Request denied!", "success");
//             }
//           })
//           .catch((err) => {
//             console.error("Error details:", err.response);
//             Swal.fire("Error", "Server error (404/500)", "error");
//           });
//       }
//     });
//   };

//   if (loading)
//     return (
//       <div className="form-boxB">
//         <h3>טוען בקשות...</h3>
//       </div>
//     );
//   if (!details || details.length === 0) {
//     return (
//       <div className="form-boxB">
//         <h3>אין בקשות צפויות כרגע</h3>
//       </div>
//     );
//   }

//   return (
//     <div className="manager-wrapper">
//       <div className="filter-bar card">
//         <div className="filter-group">
//           <div className="input-with-icon">
//             <Search size={18} />
//             <input
//               type="text"
//               name="search"
//               placeholder="חיפוש שם או ת.ז..."
//               value={filters.search}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>

//         <div className="filter-group">
//           <div className="input-with-icon">
//             <ListFilter size={18} />
//             <select name="status" value={filters.status} onChange={handleInputChange}>
//               <option value="">כל הסטטוסים</option>
//               <option value="בהמתנה">בהמתנה</option>
//               <option value="מאושר">מאושר</option>
//               <option value="דחוי">דחוי</option>
//             </select>
//           </div>
//         </div>

//         <div className="filter-group">
//           <div className="input-with-icon">
//             <MapPin size={18} />
//             <input
//               type="text"
//               name="city"
//               placeholder="עיר..."
//               value={filters.city}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>

//         <div className="filter-group">
//           <div className="input-with-icon">
//             <Users size={18} />
//             <input
//               type="number"
//               name="minBrothers"
//               placeholder="מינימום אחים..."
//               value={filters.minBrothers}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>

//         <div className="filter-actions">
//           <button className="btn-filter" onClick={() => fetchRequests()}>
//             <Filter size={18} /> סנן
//           </button>
//           <button className="btn-reset" onClick={handleReset}>
//             <RotateCcw size={18} />
//           </button>
//         </div>
//       </div>
//     <div className="form-box">
//       {details.map((r) => (
//         <div key={r._id} className="request-card">
//           {" "}
//           {/* שיניתי ל-_id של MongoDB */}
//           <div className="request-grid-single-column">
//             <div className="grid-item">
//               {/* שינוי 4: שמות השדות לפי ה-Backend החדש */}
//               <strong>Name:</strong> {r.userId?.firstName} {r.userId?.lastName}
//             </div>
//             <div className="grid-item">
//               <strong>Course:</strong> {r.studyInfo?.major}
//             </div>
//             <div className="grid-item">
//               <strong>Status:</strong> {r.status}
//             </div>
//             <div className="grid-item">
//               <strong>Request ID:</strong> {r._id}
//             </div>
//           </div>
//           {openRequestId === r._id && (
//             <article className="request-details-grid">
//               <div className="detail-section">
//                 <h3 className="section-title">פרטים אישיים</h3>
//                 <div className="grid-item">
//                   <strong>First Name:</strong> {r.userId?.firstName}
//                 </div>
//                 <div className="grid-item">
//                   <strong>Last Name:</strong> {r.userId?.lastName}
//                 </div>
//                 <div className="grid-item">
//                   <strong>User ID:</strong> {r.userId?.idNumber}
//                 </div>
//                 <div className="grid-item">
//                   <strong>Address:</strong> {r.personalInfo?.address}
//                 </div>
//                 <div className="grid-item">
//                   <strong>Phone:</strong> {r.personalInfo?.mobilePhone}
//                 </div>
//               </div>
//               <div className="detail-section">
//                 <h3 className="section-title">פרטי לימודים</h3>
//                 <div className="grid-item">
//                   <strong>Major:</strong> {r.studyInfo?.major}
//                 </div>
//                 <div className="grid-item">
//                   <strong>Annual Tuition:</strong> {r.studyInfo?.annualTuition}₪
//                 </div>
//                 <div className="grid-item">
//                   <strong>Year:</strong> {r.studyInfo?.yearsOfStudy}
//                 </div>
//               </div>
//               <div className="detail-section">
//                 <h3 className="section-title">פרטי משפחה</h3>
//                 <div className="grid-item">
//                   <strong>Number of Children:</strong>{" "}
//                   {r.familyInfo?.under18BrothersCount}
//                 </div>
//                 <div className="grid-item">
//                   <strong>Over 18:</strong>{" "}
//                   {r.familyInfo?.over21MarriedBrothersCount}
//                 </div>
//                 {/* הצגת רשימת האחים אם היא קיימת */}
//                 {r.familyInfo?.brothers && r.familyInfo.brothers.length > 0 && (
//                   <div className="brothers-list-display">
//                     <p>
//                       <strong>רשימת אחים מפורטת:</strong>
//                     </p>
//                     <table className="brothers-table">
//                       <thead>
//                         <tr>
//                           <th>שם</th>
//                           <th>גיל</th>
//                           <th>מצב משפחתי</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {r.familyInfo.brothers.map((b, i) => (
//                           <tr key={i}>
//                             <td>{b.name}</td>
//                             <td>{b.age}</td>
//                             <td>{b.isMarried ? "נשוי/אה" : "רווק/ה"}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//               <div className="detail-section">
//                 <h3 className="section-title">פרטי בנק</h3>
//                 <div className="grid-item">
//                   <strong>Bank Account:</strong> {r.bankInfo?.accountNumber}
//                 </div>
//                 <div className="grid-item">
//                   <strong>Branch:</strong> {r.bankInfo?.branchNumber}
//                 </div>
//               </div>
//               {/* ----------------- הוספת מסמכים ----------------- */}
//               <div className="detail-section">
//                 <h3 className="section-title">מסמכים מצורפים</h3>
//                 <div className="documents-display-grid">
//                   {/* כרטיס תעודת זהות */}
//                   <div className="document-card">
//                     <div className="doc-icon-wrapper">
//                       <FileText size={24} color="#05807f" />{" "}
//                       {/* האייקון החדש */}
//                     </div>{" "}
//                     <div className="doc-content">
//                       <span className="doc-label">תעודת זהות</span>
//                       {r.documents?.idCardFile ? (
//                         <a
//                           href={`http://localhost:5000/${r.documents.idCardFile}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="view-file-btn"
//                           style={{ color: "#05807f", textDecoration: "none" }} // <--- הוספת השורה הזו
//                         >
//                           צפייה במסמך
//                         </a>
//                       ) : (
//                         <span className="no-file-text">חסר במערכת</span>
//                       )}
//                     </div>
//                   </div>

//                   {/* כרטיס אישור בנק */}
//                   <div className="document-card">
//                     <div className="doc-icon-wrapper">
//                       <Landmark size={24} color="#05807f" /> {/* אייקון בנק */}
//                     </div>
//                     <div className="doc-content">
//                       <span className="doc-label">אישור ניהול חשבון</span>
//                       {r.documents?.bankApprovalFile ? (
//                         <a
//                           href={`http://localhost:5000/${r.documents.bankApprovalFile}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="view-file-btn"
//                           style={{ color: "#05807f", textDecoration: "none" }} // <--- הוספת השורה הזו
//                         >
//                           צפייה במסמך
//                         </a>
//                       ) : (
//                         <span className="no-file-text">חסר במערכת</span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* ------------------------------------------------ */}
//               <div className="button-group">
//                 <button className="btn" onClick={() => upDate("allow", r._id)}>
//                   Allow
//                 </button>
//                 <button className="btn" onClick={() => upDate("reject", r._id)}>
//                   Reject
//                 </button>
//               </div>{" "}
//               <br />
//               <br />
//             </article>
//           )}
//           <button
//             className="btn toggle-btn"
//             onClick={() =>
//               setOpenRequestId(openRequestId === r._id ? null : r._id)
//             }
//           >
//             {openRequestId === r._id ? "הסתר פרטים" : "צפה בפרטי הבקשה"}
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };
import { useDispatch, useSelector } from "react-redux";
import {
  allow,
  reject,
  selectNotAllowed,
  setAllRequests,
} from "../redux/Requests";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import "./css/manager.css";
import api from "../api";

// אייקונים לסינון ולמסמכים בלבד
import {
  Search,
  Filter,
  RotateCcw,
  Users,
  MapPin,
  ListFilter,
  FileText,
  Landmark,
} from "lucide-react";

export const Manager = () => {
  const details = useSelector(selectNotAllowed);
  const [loading, setLoading] = useState(true);
  const [openRequestId, setOpenRequestId] = useState(null);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    search: "",
    status: "בהמתנה",
    city: "",
    minBrothers: "",
  });

  const fetchRequests = (currentFilters = filters) => {
    setLoading(true);

    const params = {};
    if (currentFilters.search) params.search = currentFilters.search;
    if (currentFilters.status) params.status = currentFilters.status;
    if (currentFilters.city) params.city = currentFilters.city;
    if (currentFilters.minBrothers)
      params.minBrothers = currentFilters.minBrothers;

    api
      .get("/requests/all", { params })
      .then((res) => dispatch(setAllRequests(res.data)))
      .catch((err) => console.error("Error fetching requests:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRequests();
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    const emptyFilters = { search: "", status: "", city: "", minBrothers: "" };
    setFilters(emptyFilters);
    fetchRequests(emptyFilters);
  };

  const upDate = (actionType, id) => {
    const statusToSend = actionType === "allow" ? "מאושר" : "דחוי";
    Swal.fire({
      title: actionType === "allow" ? "Approve request?" : "Reject request?",
      text: "Performing this action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#05807f",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#cc3333",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .patch(`/requests/status/${id}`, { status: statusToSend })
          .then(() => {
            if (actionType === "allow") {
              dispatch(allow(id));
              Swal.fire("Success", "הבקשה אושרה", "success");
            } else {
              dispatch(reject(id));
              Swal.fire("Done!", "Request denied!", "success");
            }
          })
          .catch(() => Swal.fire("Error", "Server error", "error"));
      }
    });
  };

  if (loading)
    return (
      <div className="form-boxB">
        <h3>טוען בקשות...</h3>
      </div>
    );

  return (
    <div className="manager-wrapper">
      {/* שורת הסינון */}
      <div className="filter-bar card">
        <div className="filter-group">
          <div className="input-with-icon">
            <Search size={18} />
            <input
              type="text"
              name="search"
              placeholder="חיפוש שם או ת.ז..."
              value={filters.search}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="filter-group">
          <div className="input-with-icon">
            <ListFilter size={18} />
            <select
              name="status"
              value={filters.status}
              onChange={handleInputChange}
            >
              <option value="">כל הסטטוסים</option>
              <option value="בהמתנה">בהמתנה</option>
              <option value="מאושר">מאושר</option>
              <option value="דחוי">דחוי</option>
            </select>
          </div>
        </div>
        <div className="filter-group">
          <div className="input-with-icon">
            <MapPin size={18} />
            <input
              type="text"
              name="city"
              placeholder="עיר..."
              value={filters.city}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="filter-group">
          <div className="input-with-icon">
            <Users size={18} />
            <input
              type="number"
              name="minBrothers"
              placeholder="מינימום אחים..."
              value={filters.minBrothers}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="filter-actions">
          <button className="btn-filter" onClick={() => fetchRequests()}>
            סנן
          </button>
          <button className="btn-reset" onClick={handleReset}>
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      <div className="form-box">
        {!details || details.length === 0 ? (
          <div className="form-boxB">
            <h3>אין בקשות צפויות כרגע</h3>
          </div>
        ) : (
          details.map((r) => (
            <div
              key={r._id}
              // אנחנו מוסיפים קלאס דינמי לפי הסטטוס
              className={`request-card ${
                r.status === "מאושר"
                  ? "status-approved"
                  : r.status === "דחוי"
                    ? "status-rejected"
                    : "status-pending"
              }`}
            >
              {" "}
              <div className="request-grid-single-column">
                <div className="grid-item">
                  <strong>Name:</strong> {r.userId?.firstName}{" "}
                  {r.userId?.lastName}
                </div>
                <div className="grid-item">
                  <strong>Course:</strong> {r.studyInfo?.major}
                </div>
                <div className="grid-item">
                  <strong>Status:</strong> {r.status}
                </div>
                <div className="grid-item">
                  <strong>Request ID:</strong> {r._id}
                </div>
              </div>
              {openRequestId === r._id && (
                <article className="request-details-grid">
                  <div className="detail-section">
                    <h3 className="section-title">פרטים אישיים</h3>
                    <div className="grid-item">
                      <strong>First Name:</strong> {r.userId?.firstName}
                    </div>
                    <div className="grid-item">
                      <strong>Last Name:</strong> {r.userId?.lastName}
                    </div>
                    <div className="grid-item">
                      <strong>User ID:</strong> {r.userId?.idNumber}
                    </div>
                    <div className="grid-item">
                      <strong>city:</strong> {r.personalInfo?.city}
                    </div>
                    <div className="grid-item">
                      <strong>street:</strong> {r.personalInfo?.street}
                    </div>
                    <div className="grid-item">
                      <strong>Phone:</strong> {r.personalInfo?.mobilePhone}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3 className="section-title">פרטי לימודים</h3>
                    <div className="grid-item">
                      <strong>Major:</strong> {r.studyInfo?.major}
                    </div>
                    <div className="grid-item">
                      <strong>Annual Tuition:</strong>{" "}
                      {r.studyInfo?.annualTuition}₪
                    </div>
                    <div className="grid-item">
                      <strong>Year:</strong> {r.studyInfo?.yearsOfStudy}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3 className="section-title">פרטי משפחה</h3>
                    <div className="grid-item">
                      <strong>Number of Children:</strong>{" "}
                      {r.familyInfo?.under18BrothersCount}
                    </div>
                    <div className="grid-item">
                      <strong>Over 18:</strong>{" "}
                      {r.familyInfo?.over21MarriedBrothersCount}
                    </div>
                    {r.familyInfo?.brothers?.length > 0 && (
                      <div className="brothers-list-display">
                        <table className="brothers-table">
                          <thead>
                            <tr>
                              <th>שם</th>
                              <th>גיל</th>
                              <th>מצב משפחתי</th>
                            </tr>
                          </thead>
                          <tbody>
                            {r.familyInfo.brothers.map((b, i) => (
                              <tr key={i}>
                                <td>{b.name}</td>
                                <td>{b.age}</td>
                                <td>{b.isMarried ? "נשוי/אה" : "רווק/ה"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div className="detail-section">
                    <h3 className="section-title">פרטי בנק</h3>
                    <div className="grid-item">
                      <strong>Bank Account:</strong> {r.bankInfo?.accountNumber}
                    </div>
                    <div className="grid-item">
                      <strong>Branch:</strong> {r.bankInfo?.branchNumber}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3 className="section-title">מסמכים מצורפים</h3>
                    <div className="documents-display-grid">
                      <div className="document-card">
                        <div className="doc-icon-wrapper">
                          <FileText size={24} color="#05807f" />
                        </div>
                        <div className="doc-content">
                          <span className="doc-label">תעודת זהות</span>
                          {r.documents?.idCardFile ? (
                            <a
                              href={`http://localhost:5000/${r.documents.idCardFile}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="document-link"
                              style={{
                                color: "#05807f",
                                textDecoration: "none",
                              }}
                            >
                              צפייה במסמך
                            </a>
                          ) : (
                            <span className="no-file">חסר במערכת</span>
                          )}
                        </div>
                      </div>
                      <div className="document-card">
                        <div className="doc-icon-wrapper">
                          <Landmark size={24} color="#05807f" />
                        </div>
                        <div className="doc-content">
                          <span className="doc-label">אישור ניהול חשבון</span>
                          {r.documents?.bankApprovalFile ? (
                            <a
                              href={`http://localhost:5000/${r.documents.bankApprovalFile}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="document-link"
                              style={{
                                color: "#05807f",
                                textDecoration: "none",
                              }}
                            >
                              צפייה במסמך
                            </a>
                          ) : (
                            <span className="no-file">חסר במערכת</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="button-group full-width">
                    {/* אם הבקשה מאושרת - לא מציגים כפתורים בכלל */}
                    {r.status === "מאושר" && (
                      <div className="status-notice approved-msg">
                        ✅ בקשה זו אושרה וסגורה לשינויים.
                      </div>
                    )}

                    {/* אם הבקשה בהמתנה - מציגים את שני הכפתורים */}
                    {r.status === "בהמתנה" && (
                      <>
                        <button
                          className="btn allow"
                          onClick={() => upDate("allow", r._id)}
                        >
                          Allow
                        </button>
                        <button
                          className="btn reject"
                          onClick={() => upDate("reject", r._id)}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {/* אם הבקשה נדחתה - מציגים רק אפשרות לאשר מחדש */}
                    {r.status === "דחוי" && (
                      <div className="re-allow-container">
                        <p className="status-notice">
                          בקשה זו נדחתה בעבר. ניתן לאשר אותה כעת:
                        </p>
                        <button
                          className="btn allow"
                          onClick={() => upDate("allow", r._id)}
                        >
                          אשר בקשה בכל זאת
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              )}
              <button
                className="btn toggle-btn"
                onClick={() =>
                  setOpenRequestId(openRequestId === r._id ? null : r._id)
                }
              >
                {openRequestId === r._id ? "הסתר פרטים" : "צפה בפרטי הבקשה"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

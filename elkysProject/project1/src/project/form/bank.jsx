import "./style.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selecReqCurrent, add, saveBank } from "../redux/Requests";
import swal from "sweetalert";
import { useNavigate } from "react-router";
import "../components/css/apply.css";

export const Bank = ({ setDetails, details, errors, setErrors }) => {
  // const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(false);
  // const [savebank, setSaveBank] = useState({})
  // const current = useSelector(selecReqCurrent)
  // const navigate = useNavigate()

  // פונקציה ששולחת עדכון ומסירה שגיאה אם השדה מולא
  const handleChange = (field, value) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
    if (value) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "שדה חובה" }));
    }
    if (field === "numCount" && value && !/^\d{5,}$/.test(value)) {
      setErrors((prev) => ({ ...prev, numCount: "חייב להיות לפחות 5 ספרות" }));
    }
  };

  return (
    <>
      <div className="form-box">
        <label>input number of count</label>
        <input
          value={details.numCount || ""}
          onChange={(e) => handleChange("numCount", e.target.value)}
        />
        {errors.numCount && <p className="error">{errors.numCount}</p>}

        <label>input Branch</label>
        <input
          type="number"
          onChange={(e) => handleChange("snif", e.target.value)}
          className={errors.snif ? "error-input" : ""}
        />
        {errors.snif && <p className="error">{errors.snif}</p>}

        <label>name of bank</label>
        <input
          placeholder="inputname of bank"
          type="text"
          onChange={(e) => handleChange("numBank", e.target.value)}
          className={errors.numBank ? "error-input" : ""}
        />
        {errors.numBank && <p className="error">{errors.numBank}</p>}
        <div className="detail-section">
          <h3 className="section-title">אישור ניהול חשבון</h3>
          <label className="file-upload-wrapper">
            {/* אם יש קובץ קיים מהטיוטה, נציג הודעה ירוקה */}
            {details.hasExistingbankApprovalFile &&
              !details.bankApprovalFile && (
                <p style={{ color: "green", fontSize: "0.8em" }}>
                  ✅ קובץ כבר קיים בטיוטה (אין חובה להעלות שוב)
                </p>
              )}
            <span className="upload-icon">📁</span>
            <span>לחץ כאן להעלאת מסמך אישור בנק</span>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) =>
                setDetails((prev) => ({
                  ...prev,
                  bankApprovalFile: e.target.files[0],
                }))
              }
            />
            {details.bankApprovalFile && (
              <div className="file-name-display">
                ✅ קובץ נבחר: {details.bankApprovalFile.name}
              </div>
            )}
          </label>
          {errors.bankApprovalFile && (
            <div className="error">{errors.bankApprovalFile}</div>
          )}
        </div>
        {/* אישור שליחת הטופס */}
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => {
              setIsChecked(e.target.checked);
              setDetails((prev) => ({
                ...prev,
                confirmTerms: e.target.checked,
              }));
              if (e.target.checked)
                setErrors((prev) => ({ ...prev, checked: null }));
            }}
          />
          I confirm sending the form and agree to the terms.
          {errors.checked && <p className="error">{errors.checked}</p>}
        </label>
      </div>
    </>
  );
};

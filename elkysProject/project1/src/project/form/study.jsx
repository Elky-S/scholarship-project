import "./style.css";
import { useState, useEffect } from "react";

export const Study = ({ setDetails, details, errors, setErrors }) => {
  // פונקציה ששולחת עדכון ומסירה שגיאה אם השדה מולא
  const handleChange = (field, value) => {
    setDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
    // field-מתלבש על השדה הנוכחי ששלחתי ובודק עליו
    if (value) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "שדה חובה" }));
    }
  };

  return (
    <>
      <div className="form-box">
        <form>
          {/*בחירת קורס  */}
          <label>input course</label>
          <select
            value={details.curse || ""}
            onChange={(e) => handleChange("curse", e.target.value)}
            className={`input-style ${errors.curse ? "error-input" : ""}`}
          >
            <option value="">choose your curse...</option>
            <option value="Programming">Programming</option>
            <option value="architecture">architecture</option>
            <option value="accounting">accounting</option>
            <option value="graphics">graphics</option>
            <option value="tax consulting">tax consulting</option>
          </select>
          {errors.curse && <p className="error">{errors.curse}</p>}

          {/* גובה שכר לימוד */}
          <label>input Tuition fees</label>
          <input
            placeholder="Enter amount"
            type="number"
            value={details.TuitionFees || ""}
            onChange={(e) => handleChange("TuitionFees", e.target.value)}
            className={errors.TuitionFees ? "error-input" : ""}
          />
          {errors.TuitionFees && <p className="error">{errors.TuitionFees}</p>}

          {/* הכנסת מספר שנות לימוד */}
          <label>input years of study</label>
          <input
            placeholder="years of study"
            type="number"
            min="0"
            max="9"
            value={details.years || ""}
            onChange={(e) => handleChange("years", e.target.value)}
            className={errors.years ? "error-input" : ""}
          />
          {errors.years && <p className="error">{errors.years}</p>}
        </form>
      </div>
    </>
  );
};

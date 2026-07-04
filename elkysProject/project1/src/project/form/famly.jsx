import "./style.css";
import { useState, useEffect } from "react";

export const Famly = ({ setDetails, details, errors, setErrors }) => {
  // פונקציה לטיפול בשינויי שדות והסרת שגיאות
  const handleChange = (field, value) => {
    setDetails((prev) => ({ ...prev, [field]: value }));

    // וולידציה מיידית: בודק אם הערך ריק או שווה ל-N/A
    if (!value || value === "" || value === "N/A" || value === undefined) {
      setErrors((prev) => ({ ...prev, [field]: "שדה חובה" }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field]; // מסיר את השגיאה אם הכל תקין
        return newErrors;
      });
    }
  };

  // פונקציה חדשה לניהול הוספת אחים דינמית
  const handleBrothersCountChange = (value) => {
    handleChange("numChild19", value);

    const count = parseInt(value) || 0;

    setDetails((prev) => {
      let currentBrothers = prev.brothers || [];
      let updatedBrothers = [...currentBrothers];

      if (count > updatedBrothers.length) {
        // הוספת אובייקטים ריקים אם המספר גדל
        for (let i = updatedBrothers.length; i < count; i++) {
          updatedBrothers.push({ name: "", age: "", isMarried: false });
        }
      } else {
        // חיתוך המערך אם המספר קטן
        updatedBrothers = updatedBrothers.slice(0, count);
      }

      return { ...prev, brothers: updatedBrothers };
    });
  };

  // פונקציה לעדכון אח ספציפי בתוך המערך
  const updateBrotherDetail = (index, field, value) => {
    const updatedBrothers = [...details.brothers];
    updatedBrothers[index][field] = value;
    handleChange("brothers", updatedBrothers);
  };

  const onlyLetters = (value) => /^[א-תa-zA-Z\s]*$/.test(value);
  return (
    <>
      <div className="form-box">
        <form>
          <label>input father's name</label>
          <input
            placeholder="input name"
            value={details.fName || ""}
            className={errors.fName ? "error-input" : ""}
            onChange={(e) => {
              if (onlyLetters(e.target.value)) {
                handleChange("fName", e.target.value);
              }
            }}
          />
          {errors.fName && <p className="error">{errors.fName}</p>}
          <br />
          <br />

          <label>input mother's name</label>
          <input
            placeholder="input name"
            value={details.mName || ""}
            onChange={(e) => handleChange("mName", e.target.value)}
            className={errors.mName ? "error-input" : ""}
          />
          {errors.mName && <p className="error">{errors.mName}</p>}
          <br />
          <br />

          <label>number of children</label>
          <input
            placeholder="number of children"
            type="number"
            value={details.numChild || ""}
            onChange={(e) => handleChange("numChild", e.target.value)}
            className={errors.numChild ? "error-input" : ""}
          />
          {errors.numChild && <p className="error">{errors.numChild}</p>}
          <br />
          <br />

          <label>Number of siblings over 18 </label>
          <input
            placeholder="over 18"
            type="number"
            min="0"
            value={details.numChild19 === 0 ? 0 : details.numChild19 || ""}
            onChange={(e) => handleBrothersCountChange(e.target.value)}
            className={errors.numChild19 ? "error-input" : ""}
          />
          {errors.numChild19 && <p className="error">{errors.numChild19}</p>}
          <br />
          <br />
          {/* הצגת שדות האחים במידה והוקלד מספר גדול מ-0 */}
          {details.brothers &&
            details.brothers.map((brother, index) => (
              <div
                key={index}
                className="brother-entry"
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                }}
              >
                <h4>Details for Sibling #{index + 1}</h4>

                <label>Full Name</label>
                <input
                  placeholder="Name"
                  value={brother.name || ""}
                  onChange={(e) =>
                    updateBrotherDetail(index, "name", e.target.value)
                  }
                />

                <label>Age</label>
                <input
                  type="number"
                  placeholder="Age"
                  value={brother.age || ""}
                  onChange={(e) =>
                    updateBrotherDetail(index, "age", e.target.value)
                  }
                />

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  Married?
                  <input
                    type="checkbox"
                    checked={brother.isMarried || false}
                    onChange={(e) =>
                      updateBrotherDetail(index, "isMarried", e.target.checked)
                    }
                  />
                </label>
              </div>
            ))}
        </form>
      </div>
    </>
  );
};

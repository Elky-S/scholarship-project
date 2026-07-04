import { useSelector } from "react-redux";
import "./style.css";
import { selecCurrent } from "../redux/Users";
import { useEffect, useState } from "react";
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";

export const Name = ({ setDetails, details, errors, setErrors }) => {
  const fill = useSelector(selecCurrent);
  const [isReady, setIsReady] = useState(false);
  // --- שינוי 1: State חדש לגבולות העיר ---
  const [cityDataObj, setCityDataObj] = useState({
    location: null,
    bounds: null,
  });
  const [cityBounds, setCityBounds] = useState(null);
  const [cityCenter, setCityCenter] = useState(null); // הוספנו עוגן מיקום
  const [streetDisplay, setStreetDisplay] = useState("");
  useEffect(() => {
    const checkGoogle = () => {
      if (window.google?.maps?.places) {
        setIsReady(true);
      } else {
        setTimeout(checkGoogle, 300);
      }
    };
    checkGoogle();
  }, []);

  // --- חדש: שחזור ערכי עיר ורחוב מהטיוטה לתוך ה-Inputs של גוגל ---
  useEffect(() => {
    // אם יש עיר בטיוטה והתיבה כרגע ריקה - נטען אותה
    if (details.city && !cityValue) {
      setCityValue(details.city, false);
    }

    // אם יש רחוב בטיוטה והתצוגה כרגע ריקה - נטען אותה
    if (details.street && !streetDisplay) {
      setStreetDisplay(details.street);
      // מעדכנים גם את הערך הפנימי שגוגל מחזיק
      setStreetValue(details.street, false);
    }
  }, [details.city, details.street]);
  useEffect(() => {
    if (fill && !details.name) {
      setDetails((prev) => ({
        ...prev,
        name: fill.firstName || "",
        lastName: fill.lastName || "",
        id: fill.idNumber || "",
      }));
    }
  }, [fill]);

  // הגדרת השלמה אוטומטית לעיר
  const {
    ready: cityReady,
    value: cityValue,
    suggestions: { status: cityStatus, data: cityData },
    setValue: setCityValue,
    clearSuggestions: clearCitySuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["(cities)"],
      componentRestrictions: { country: "il" },
    },
    debounce: 300,
    initOnMount: isReady,
  });

  // הגדרת השלמה אוטומטית לרחוב
  const {
    ready: streetReady,
    value: streetValue,
    suggestions: { status: streetStatus, data: streetData },
    setValue: setStreetValue,
    clearSuggestions: clearStreetSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["address"],
      componentRestrictions: { country: "il" },
      bounds: cityBounds,
      location: cityCenter,
      radius: 5000, // רדיוס של 2 ק"מ מהמרכז (גוגל משלב את זה עם ה-bounds)
      strictBounds: true, // חובה להשאיר true
    },
    debounce: 300,
    initOnMount: isReady,
  });

  // --- שינוי 3: עדכון בחירת העיר כדי לשלוף גבולות ---
  const handleCitySelect = async (description) => {
    setCityValue(description, false);
    clearCitySuggestions();

    try {
      const results = await getGeocode({ address: description });
      const { viewport, location } = results[0].geometry;

      // המרה ל-Literal - זה השלב הקריטי!
      const bounds = {
        north: viewport.getNorthEast().lat(),
        south: viewport.getSouthWest().lat(),
        east: viewport.getNorthEast().lng(),
        west: viewport.getSouthWest().lng(),
      };

      setCityBounds(bounds);
      setCityCenter({ lat: location.lat(), lng: location.lng() }); // שומרים את המרכז

      setDetails((prev) => ({ ...prev, city: description, street: "" }));
      setStreetDisplay(""); // איפוס התצוגה
      setStreetValue("");
    } catch (error) {
      console.error("שגיאה בשליפת נתוני העיר:", error);
      setCityBounds(null);
    }

    if (description) setErrors((prev) => ({ ...prev, city: null }));
  };

  const handleStreetSelect = async (description) => {
    // התיקון כאן: שימוש בשמות המשתנים החדשים
    clearStreetSuggestions();

    try {
      const results = await getGeocode({ address: description });
      const streetName =
        results[0].address_components.find((c) => c.types.includes("route"))
          ?.long_name || description;

      setStreetDisplay(streetName); // המשתמש רואה רק "הרצל"
      setStreetValue(description, false); // גוגל מקבל את הכתובת המלאה
      setDetails((prev) => ({ ...prev, street: streetName }));
      setErrors((prev) => ({ ...prev, street: null }));
    } catch (error) {
      console.warn(
        "Geocoding failed (Check if Geocoding API is enabled), using raw description",
      );
      setStreetDisplay(description);
      setDetails((prev) => ({ ...prev, street: description }));
    }
  };

  const handleChange = (field, value) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
    if (value) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  return (
    <div className="form-box">
      <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
        <label>input name</label>
        <input value={details.name || fill?.firstName || ""} readOnly />
        <br />
        <br />

        <label>input last name</label>
        <input value={details.lastName || fill?.lastName || ""} readOnly />
        <br />
        <br />

        <label>input id</label>
        <input
          value={details.id || fill?.idNumber || ""}
          readOnly
          type="number"
        />
        <br />
        <br />

        <label>input Date of Birth</label>
        <input
          type="Date"
          value={details.date || ""}
          onChange={(e) => handleChange("date", e.target.value)}
          className={errors.date ? "error-input" : ""}
        />
        {errors.date && <div className="error">{errors.date}</div>}
        <br />
        <br />

        {/* שדה עיר */}
        <label>City</label>
        <div style={{ position: "relative" }}>
          <input
            placeholder="התחילי להקליד עיר..."
            value={cityValue}
            onChange={(e) => setCityValue(e.target.value)}
            disabled={!cityReady}
            className={errors.city ? "error-input" : ""}
          />
          {cityStatus === "OK" && (
            <ul className="suggestions-list" style={suggestionStyle}>
              {cityData.map((s) => (
                <li
                  key={s.place_id}
                  onClick={() => handleCitySelect(s.description)}
                  style={itemStyle}
                >
                  {s.description}
                </li>
              ))}
            </ul>
          )}
        </div>
        {errors.city && <div className="error">{errors.city}</div>}
        <br />
        <br />

        {/* שדה רחוב */}
        <label>Street</label>
        <div style={{ position: "relative" }}>
          <input
            placeholder={details.city ? "הקלידי רחוב..." : "בחרי עיר קודם"}
            value={streetDisplay}
            onChange={(e) => {
              const val = e.target.value;
              setStreetDisplay(val); // המשתמש רואה מה שהוא מקליד

              // ה"נעילה": אנחנו שולחים לגוגל את הרחוב + העיר שנבחרה
              if (details.city) {
                setStreetValue(`${val}, ${details.city}`);
              } else {
                setStreetValue(val);
              }
            }}
            disabled={!details.city || !streetReady}
            className={errors.street ? "error-input" : ""}
          />
          {streetStatus === "OK" && (
            <ul className="suggestions-list" style={suggestionStyle}>
              {streetData.map((s) => {
                // אופציונלי: חיתוך שם העיר מההצעות כדי שיראה נקי
                const cleanDescription = s.description.split(",")[0];
                return (
                  <li
                    key={s.place_id}
                    onClick={() => handleStreetSelect(s.description)}
                    style={itemStyle}
                  >
                    {cleanDescription}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {errors.street && <div className="error">{errors.street}</div>}
        <br />
        <br />

        <label>House Number</label>
        <input
          type="text"
          placeholder="input House Number"
          value={details.houseNumber || ""}
          onChange={(e) => handleChange("houseNumber", e.target.value)}
        />
        <br />
        <br />

        <label>Phone Number</label>
        <input
          placeholder="05X-XXXXXXX"
          type="text"
          value={details.mobilePhone || ""}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val) && val.length <= 10) {
              handleChange("mobilePhone", val);
            }
          }}
          className={errors.mobilePhone ? "error-input" : ""}
        />
        {errors.mobilePhone && (
          <div className="error">{errors.mobilePhone}</div>
        )}
        <br />
        <br />

        {/* העלאת קבצים */}
        <div className="file-upload-container">
          <label>צילום תעודת זהות:</label>
          {/* אם יש קובץ קיים מהטיוטה, נציג הודעה ירוקה */}
          {details.hasExistingIdCard && !details.idCardFile && (
            <p style={{ color: "green", fontSize: "0.8em" }}>
              ✅ קובץ כבר קיים בטיוטה (אין חובה להעלות שוב)
            </p>
          )}
          <label
            className={`custom-file-upload ${errors.idCardFile ? "error-border" : ""}`}
          >
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                setDetails((prev) => ({ ...prev, idCardFile: file }));
                if (file) setErrors((prev) => ({ ...prev, idCardFile: null }));
              }}
            />
            {details.idCardFile ? "🔄 החלף קובץ" : "📁 בחר קובץ להעלאה"}
          </label>
          {details.idCardFile && (
            <div className="file-name-info">
              נבחר: {details.idCardFile.name}
            </div>
          )}
          {errors.idCardFile && (
            <div className="error">{errors.idCardFile}</div>
          )}
        </div>
      </form>
    </div>
  );
};

const suggestionStyle = {
  position: "absolute",
  zIndex: 9999,
  background: "white",
  width: "100%",
  border: "1px solid #ccc",
  listStyle: "none",
  padding: 0,
  margin: 0,
  maxHeight: "200px",
  overflowY: "auto",
  color: "black",
  textAlign: "right",
  direction: "rtl",
};

const itemStyle = {
  padding: "10px",
  cursor: "pointer",
  borderBottom: "1px solid #eee",
  color: "black",
};

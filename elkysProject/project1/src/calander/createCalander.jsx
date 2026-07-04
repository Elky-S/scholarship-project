import "./calendar-full.css";
import Swal from "sweetalert2";
export const CreateCalander = ({
  setName,
  setFlag,
  name,
  basicCalender,
  setBasicCalender,
}) => {
  const save = (e) => {
    e.preventDefault(); // מונע מהדף להתרענן
    // 2. בדיקה אם השם ריק
    if (!name || typeof name !== "string" || name.trim() === "") {
      Swal.fire({
        title: "שכחת משהו...",
        text: "חובה להזין שם כדי ליצור לוח שנה חדש",
        icon: "error",
        confirmButtonText: "הבנתי",
        confirmButtonColor: "#d33",
      });
      return; // עוצר את הפונקציה כאן ולא ממשיך לשמירה
    }
    const str = JSON.stringify(basicCalender);
    localStorage.setItem(name, str);
    setFlag(true);
  };
  const login = (e) => {
    e.preventDefault(); // מונע מהדף להתרענן
    if (savedData) {
      setBasicCalender(JSON.parse(localStorage.getItem(name)));
      setFlag(true);
    } else {
      Swal.fire({
        title: "לוח לא נמצא",
        text: "אנא בחר שם קיים מהרשימה",
        icon: "warning",
      });
    }
  };
  return (
    <>
      <div className="allform">
        <form className="form1" onSubmit={save}>
          <h1>ליצירת לוח חדש</h1>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="name of my calander"
            value={name || ""}
          ></input>
          <br></br>
          <br></br>
          <button onClick={save}>create</button>
        </form>
        <form className="form1">
          <h1>כניסה ללוח שלי</h1>
          <select onChange={(e) => setName(e.target.value)}>
            <option>בחר לוח שנה</option>
            {Object.keys(localStorage).map((key) => {
              return <option>{key}</option>;
            })}
          </select>
          <button onClick={login}>כניסה</button>
        </form>
      </div>
    </>
  );
};

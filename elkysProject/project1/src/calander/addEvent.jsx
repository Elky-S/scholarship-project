import Swal from "sweetalert2";
import { useState, useRef } from "react";
import "./calendar-full.css";
export const AddEvent = ({
  basicCalender,
  setBasicCalender,
  setBackColor,
  setLettersColor,
  setDayColor,
  name,
}) => {
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const newEvent = useRef();
  const newEmoji = useRef();
  const add = () => {
    const nMonth = [...basicCalender.Mounths];
    const days = [...nMonth[month].Days];
    const eventt = [...days[day].events];
    if (eventt.length < 3) {
      eventt.push({
        type: newEmoji.current.value,
        text: newEvent.current.value,
      });
      nMonth[month].Days[day].events = eventt;
      setBasicCalender({ ...basicCalender, Mounths: nMonth });
      const str1 = JSON.stringify(basicCalender);
      localStorage.setItem(name, str1);
      Swal.fire({
        title: "🤩מעולה!",
        text: "The event was added",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "🫤אוופס",
        text: "מספר אירועים מוגבל",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
  return (
    <>
      <h3 className="section-title">בחר את התאריך הרצוי </h3>
      <select
        onChange={(event) => setMonth(event.target.value)}
        className="select"
      >
        {basicCalender.Mounths.map((x, i) => (
          <option value={i}>{x.name}</option>
        ))}
      </select>

      {month ? (
        <select
          onChange={(event) => setDay(event.target.value)}
          className="select"
        >
          {basicCalender.Mounths[month].Days.map((x, i) => (
            <option value={i}>{x.name}</option>
          ))}
        </select>
      ) : null}
      <input
        className="input"
        placeholder="addEvent"
        ref={newEvent}
        id="setting"
      />
      <input className="input" placeholder="emoji" ref={newEmoji} />
      <button onClick={add}>הוסף אירוע חדש</button>
      <h3 className="section-title">עיצוב הלוח</h3>
      <div className="color-row">
        <div className="color-item">
          <label>בחר צבע לרקע הלוח</label>
          <input type="color" onBlur={(e) => setBackColor(e.target.value)} />
        </div>

        <div className="color-item">
          <label>בחר צבע ללוח</label>
          <input type="color" onBlur={(e) => setDayColor(e.target.value)} />
        </div>

        <div className="color-item">
          <label>בחר צבע לאותיות</label>
          <input
            type="color"
            onBlur={(e) => {
              setLettersColor(e.target.value);
            }}
          />
        </div>
      </div>
    </>
  );
};

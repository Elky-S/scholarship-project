import "./calendar-full.css";
import { useState } from "react";

export const ReadyCalander = ({
  basicCalender,
  name,
  backColor,
  lettersColor,
  dayColor,
}) => {
  //    כרטסיות חודשים
  //   כאן אנחנו שומרים את האינדקס (המיקום במערך) של החודש שנבחר.
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(null);

  //   פונקציה חכמה מסוג "מתג" (Toggle)
  //   אם המשתמש לוחץ על חודש שכבר נבחר, מאפס ל-null (מבטל את הבחירה). אם הוא לוחץ על חודש אחר, מעדכן לאינדקס החדש
  const handleTabClick = (index) => {
    setSelectedMonthIndex((prev) => (prev === index ? null : index));
  };
  // מצב שבו כל החודשים מוצגים.
  const handleClearFilter = () => setSelectedMonthIndex(null);
  // התצוגה בפועל- לפי אינדקס- או מראה את החודש הנוכחי או את הכל
  const monthsToDisplay =
    selectedMonthIndex === null
      ? basicCalender.Mounths
      : [basicCalender.Mounths[selectedMonthIndex]];

  return (
    <>
      <h1>{name}</h1>

      {/* כרטיסיות חודש וכפתור הצגה מלאה */}
      <div className="tabs-scroll">
        {basicCalender.Mounths.map((month, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`tab ${index === selectedMonthIndex ? "active" : ""}`}
            style={{
              backgroundColor:
                index === selectedMonthIndex ? backColor : "#f2f2f2",
              color: index === selectedMonthIndex ? "white" : lettersColor,
              borderColor: index === selectedMonthIndex ? backColor : "#ccc",
            }}
          >
            {month.name}
          </button>
        ))}

        {/* כפתור "הצג את כל החודשים" תמיד מוצג */}
        <button
          onClick={handleClearFilter}
          className={`tab show-all ${selectedMonthIndex === null ? "disabled" : ""}`}
          disabled={selectedMonthIndex === null}
        >
          הצג את כל החודשים
        </button>
      </div>

      {/* תצוגת הלוח */}
      {monthsToDisplay.map((month, mIndex) => (
        <div
          key={mIndex}
          className="m"
          style={{
            backgroundColor: backColor,
            color: lettersColor,
            borderColor: dayColor,
          }}
        >
          <h2>{month.name}</h2>
          <div className="allD">
            {Array.from({ length: month.Days[0].dayOfWeek - 1 }, (_, i) => (
              <div
                key={`start-${i}`}
                className="d"
                style={{
                  backgroundColor: dayColor,
                  borderColor: backColor,
                  lettersColor: lettersColor,
                }}
              ></div>
            ))}
            {/*מעבר על מערך הימים של אותו חודש וייצור עבור כל יום משבצת(div). */}
            {month.Days.map((day, i) => (
              <div
                key={`day-${i}`}
                className="d"
                style={{
                  backgroundColor: dayColor,
                  borderColor: backColor,
                  lettersColor: lettersColor,
                }}
              >
                <h3>{day.name}</h3>
                {/* רינדור אירועים בתוך יום (map מקונן) */}
                {/* לכל יום יש מערך משלו של אירועים */}
                {day.events.map((even, j) => (
                  <div key={`event-${j}`} className="e">
                    <h3>
                      {even.text}
                      {even.type}
                    </h3>
                  </div>
                ))}
              </div>
            ))}
            {/* מילוי ימים ריקים בסוף החודש (Array.from) */}
            {/* כדי לשמור על מבנה Grid (טבלה) סימטרי של 7 עמודות */}
            {Array.from(
              { length: 7 - month.Days[month.Days.length - 1].dayOfWeek },
              (_, i) => (
                <div
                  key={`end-${i}`}
                  className="d"
                  style={{
                    backgroundColor: dayColor,
                    borderColor: backColor,
                    lettersColor: lettersColor,
                  }}
                ></div>
              ),
            )}
          </div>
        </div>
      ))}
    </>
  );
};

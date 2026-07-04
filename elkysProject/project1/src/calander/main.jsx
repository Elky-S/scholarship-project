import { ReadyCalander } from "./calander";
import "./calendar-full.css";
import { useState } from "react";
import { CreateCalander } from "./createCalander";
import { AddEvent } from "./addEvent";
export const Main = () => {
  const [name, setName] = useState("");
  const [backColor, setBackColor] = useState();
  const [lettersColor, setLettersColor] = useState();
  const [dayColor, setDayColor] = useState();
  const [flag, setFlag] = useState(false);
  const [basicCalender, setBasicCalender] = useState({
    Mounths: [
      {
        name: "תשרי",
        Days: [
          {
            name: "א",
            dayOfWeek: 3,
            events: [{ type: "🍯", text: "א דראש השנה" }],
          },
          {
            name: "ב",
            dayOfWeek: 4,
            events: [{ type: "🍯", text: "ב דראש השנה" }],
          },
          {
            name: "ג",
            dayOfWeek: 5,
            events: [{ type: "❌", text: "צום גדליה" }],
          },
          { name: "ד", dayOfWeek: 6, events: [] },
          {
            name: "ה",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "ו", dayOfWeek: 1, events: [] },
          { name: "ז", dayOfWeek: 2, events: [] },
          { name: "ח", dayOfWeek: 3, events: [] },
          { name: "ט", dayOfWeek: 4, events: [] },
          {
            name: "י",
            dayOfWeek: 5,
            events: [{ type: "📖", text: "יום כיפור" }],
          },
          { name: "יא", dayOfWeek: 6, events: [] },
          {
            name: "יב",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "יג", dayOfWeek: 1, events: [] },
          { name: "יד", dayOfWeek: 2, events: [] },
          {
            name: "טו",
            dayOfWeek: 3,
            events: [{ type: "🌿", text: "חג הסוכות" }],
          },
          {
            name: "טז",
            dayOfWeek: 4,
            events: [{ type: "🌿", text: "חוהמ סוכות" }],
          },
          {
            name: "יז",
            dayOfWeek: 5,
            events: [{ type: "🌿", text: "חוהמ סוכות" }],
          },
          {
            name: "יח",
            dayOfWeek: 6,
            events: [{ type: "🌿", text: "חוהמ סוכות" }],
          },
          {
            name: "יט",
            dayOfWeek: 7,
            events: [
              { type: "🕯️🕯️", text: "שבת קודש" },
              { type: "🌿", text: "חוהמ סוכות" },
            ],
          },
          {
            name: "כ",
            dayOfWeek: 1,
            events: [{ type: "🌿", text: "חוהמ סוכות" }],
          },
          {
            name: "כא",
            dayOfWeek: 2,
            events: [{ type: "🌿", text: "הושענא רבה" }],
          },
          {
            name: "כב",
            dayOfWeek: 3,
            events: [{ type: "🕍", text: "שמחת תורה" }],
          },
          { name: "כג", dayOfWeek: 4, events: [] },
          { name: "כד", dayOfWeek: 5, events: [] },
          { name: "כה", dayOfWeek: 6, events: [] },
          {
            name: "כו",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "כז", dayOfWeek: 1, events: [] },
          { name: "כח", dayOfWeek: 2, events: [] },
          { name: "כט", dayOfWeek: 3, events: [] },
          {
            name: "ל",
            dayOfWeek: 4,
            events: [{ type: "🌙", text: "א דראש חודש חשוון" }],
          },
        ],
      },
      {
        name: "חשוון",
        Days: [
          {
            name: "א",
            dayOfWeek: 5,
            events: [{ type: "🌙", text: "ב דראש חודש חשוון" }],
          },
          { name: "ב", dayOfWeek: 6, events: [] },
          {
            name: "ג",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "ד", dayOfWeek: 1, events: [] },
          { name: "ה", dayOfWeek: 2, events: [] },
          { name: "ו", dayOfWeek: 3, events: [] },
          {
            name: "ז",
            dayOfWeek: 4,
            events: [{ type: "🌧️", text: "משיב הרוח" }],
          },
          { name: "ח", dayOfWeek: 5, events: [] },
          { name: "ט", dayOfWeek: 6, events: [] },
          {
            name: "י",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          {
            name: "יא",
            dayOfWeek: 1,
            events: [{ type: "🪦", text: "יום פטירת רחל אמנו" }],
          },
          { name: "יב", dayOfWeek: 2, events: [] },
          { name: "יג", dayOfWeek: 3, events: [] },
          { name: "יד", dayOfWeek: 4, events: [] },
          { name: "טו", dayOfWeek: 5, events: [] },
          { name: "טז", dayOfWeek: 6, events: [] },
          {
            name: "יז",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "יח", dayOfWeek: 1, events: [] },
          { name: "יט", dayOfWeek: 2, events: [] },
          { name: "כ", dayOfWeek: 3, events: [] },
          { name: "כא", dayOfWeek: 4, events: [] },
          { name: "כב", dayOfWeek: 5, events: [] },
          { name: "כג", dayOfWeek: 6, events: [] },
          {
            name: "כד",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "כה", dayOfWeek: 1, events: [] },
          { name: "כו", dayOfWeek: 2, events: [] },
          { name: "כז", dayOfWeek: 3, events: [] },
          { name: "כח", dayOfWeek: 4, events: [] },
          { name: "כט", dayOfWeek: 5, events: [] },
        ],
      },
      {
        name: "כסלו",
        Days: [
          {
            name: "א",
            dayOfWeek: 6,
            events: [{ type: "🌙", text: "ראש חודש כסליו" }],
          },
          {
            name: "ב",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "ג", dayOfWeek: 1, events: [] },
          { name: "ד", dayOfWeek: 2, events: [] },
          { name: "ה", dayOfWeek: 3, events: [] },
          { name: "ו", dayOfWeek: 4, events: [] },
          { name: "ז", dayOfWeek: 5, events: [] },
          { name: "ח", dayOfWeek: 6, events: [] },
          {
            name: "ט",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "י", dayOfWeek: 1, events: [] },
          { name: "יא", dayOfWeek: 2, events: [] },
          { name: "יב", dayOfWeek: 3, events: [] },
          { name: "יג", dayOfWeek: 4, events: [] },
          { name: "יד", dayOfWeek: 5, events: [] },
          { name: "טו", dayOfWeek: 6, events: [] },
          {
            name: "טז",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "יז", dayOfWeek: 1, events: [] },
          { name: "יח", dayOfWeek: 2, events: [] },
          { name: "יט", dayOfWeek: 3, events: [] },
          { name: "כ", dayOfWeek: 4, events: [] },
          { name: "כא", dayOfWeek: 5, events: [] },
          { name: "כב", dayOfWeek: 6, events: [] },
          {
            name: "כג",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "כד", dayOfWeek: 1, events: [] },
          { name: "כה", dayOfWeek: 2, events: [{ type: "🍩", text: "חנוכה" }] },
          { name: "כו", dayOfWeek: 3, events: [{ type: "🍩", text: "חנוכה" }] },
          { name: "כז", dayOfWeek: 4, events: [{ type: "🍩", text: "חנוכה" }] },
          { name: "כח", dayOfWeek: 5, events: [{ type: "🍩", text: "חנוכה" }] },
          { name: "כט", dayOfWeek: 6, events: [{ type: "🍩", text: "חנוכה" }] },
          {
            name: "ל",
            dayOfWeek: 7,
            events: [
              { type: "🍩", text: "חנוכה" },
              { type: "🌙", text: "ראש חודש טבת" },
            ],
          },
        ],
      },

      {
        name: "טבת",
        Days: [
          {
            name: "א",
            dayOfWeek: 1,
            events: [
              { type: "🍩", text: "חנוכה" },
              { type: "🌙", text: "ראש חודש טבת" },
            ],
          },
          { name: "ב", dayOfWeek: 2, events: [{ type: "🍩", text: "חנוכה" }] },
          { name: "ג", dayOfWeek: 3, events: [] },
          { name: "ד", dayOfWeek: 4, events: [] },
          { name: "ה", dayOfWeek: 5, events: [] },
          { name: "ו", dayOfWeek: 6, events: [] },
          {
            name: "ז",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "ח", dayOfWeek: 1, events: [] },
          { name: "ט", dayOfWeek: 2, events: [] },
          {
            name: "י",
            dayOfWeek: 3,
            events: [{ type: "❌", text: "צום עשרה בטבת" }],
          },
          { name: "יא", dayOfWeek: 4, events: [] },
          { name: "יב", dayOfWeek: 5, events: [] },
          { name: "יג", dayOfWeek: 6, events: [] },
          {
            name: "יד",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "טו", dayOfWeek: 1, events: [] },
          { name: "טז", dayOfWeek: 2, events: [] },
          { name: "יז", dayOfWeek: 3, events: [] },
          { name: "יח", dayOfWeek: 4, events: [] },
          { name: "יט", dayOfWeek: 5, events: [] },
          { name: "כ", dayOfWeek: 6, events: [] },
          {
            name: "כא",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "כב", dayOfWeek: 1, events: [] },
          { name: "כג", dayOfWeek: 2, events: [] },
          { name: "כד", dayOfWeek: 3, events: [] },
          { name: "כה", dayOfWeek: 4, events: [] },
          { name: "כו", dayOfWeek: 5, events: [] },
          { name: "כז", dayOfWeek: 6, events: [] },
          {
            name: "כח",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "כט", dayOfWeek: 1, events: [] },
        ],
      },
      {
        name: "שבט",
        Days: [
          {
            name: "א",
            dayOfWeek: 2,
            events: [{ type: "🌙", text: "ראש חודש שבט" }],
          },
          { name: "ב", dayOfWeek: 3, events: [] },
          { name: "ג", dayOfWeek: 4, events: [] },
          { name: "ד", dayOfWeek: 5, events: [] },
          { name: "ה", dayOfWeek: 6, events: [] },
          {
            name: "ו",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "ז", dayOfWeek: 1, events: [] },
          { name: "ח", dayOfWeek: 2, events: [] },
          { name: "ט", dayOfWeek: 3, events: [] },
          { name: "י", dayOfWeek: 4, events: [] },
          { name: "יא", dayOfWeek: 5, events: [] },
          { name: "יב", dayOfWeek: 6, events: [] },
          {
            name: "יג",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "יד", dayOfWeek: 1, events: [] },
          {
            name: "טו",
            dayOfWeek: 2,
            events: [{ type: "🧺", text: "טו בשבט" }],
          },
          { name: "טז", dayOfWeek: 3, events: [] },
          { name: "יז", dayOfWeek: 4, events: [] },
          { name: "יח", dayOfWeek: 5, events: [] },
          { name: "יט", dayOfWeek: 6, events: [] },
          {
            name: "כ",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "כא", dayOfWeek: 1, events: [] },
          { name: "כב", dayOfWeek: 2, events: [] },
          { name: "כג", dayOfWeek: 3, events: [] },
          { name: "כד", dayOfWeek: 4, events: [] },
          { name: "כה", dayOfWeek: 5, events: [] },
          { name: "כו", dayOfWeek: 6, events: [] },
          {
            name: "כז",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "כח", dayOfWeek: 1, events: [] },
          { name: "כט", dayOfWeek: 2, events: [] },
          {
            name: "ל",
            dayOfWeek: 3,
            events: [{ type: "🌙", text: "ראש חודש אדר" }],
          },
        ],
      },

      {
        name: "אדר",
        Days: [
          {
            name: "א",
            dayOfWeek: 4,
            events: [{ type: "🌙", text: "ראש חודש אדר" }],
          },
          { name: "ב", dayOfWeek: 5, events: [] },
          { name: "ג", dayOfWeek: 6, events: [] },
          {
            name: "ד",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "ה", dayOfWeek: 1, events: [] },
          { name: "ו", dayOfWeek: 2, events: [] },
          { name: "ז", dayOfWeek: 3, events: [] },
          { name: "ח", dayOfWeek: 4, events: [] },
          { name: "ט", dayOfWeek: 5, events: [] },
          { name: "י", dayOfWeek: 6, events: [] },
          {
            name: "יא",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "יב", dayOfWeek: 1, events: [] },
          {
            name: "יג",
            dayOfWeek: 2,
            events: [{ type: "🤡", text: "פורים דפרזין" }],
          },
          {
            name: "יד",
            dayOfWeek: 3,
            events: [{ type: "🤡", text: "פורים דמוקפין" }],
          },
          { name: "טו", dayOfWeek: 4, events: [] },
          { name: "טז", dayOfWeek: 5, events: [] },
          { name: "יז", dayOfWeek: 6, events: [] },
          {
            name: "יח",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "יט", dayOfWeek: 1, events: [] },
          { name: "כ", dayOfWeek: 2, events: [] },
          { name: "כא", dayOfWeek: 3, events: [] },
          { name: "כב", dayOfWeek: 4, events: [] },
          { name: "כג", dayOfWeek: 5, events: [] },
          { name: "כד", dayOfWeek: 6, events: [] },
          {
            name: "כה",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "כו", dayOfWeek: 1, events: [] },
          { name: "כז", dayOfWeek: 2, events: [] },
          { name: "כח", dayOfWeek: 3, events: [] },
          { name: "כט", dayOfWeek: 4, events: [] },
        ],
      },
      {
        name: "ניסן",
        Days: [
          {
            name: "א",
            dayOfWeek: 5,
            events: [{ type: "🌙", text: "ראש חודש ניסן" }],
          },
          { name: "ב", dayOfWeek: 6, events: [] },
          {
            name: "ג",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "ד", dayOfWeek: 1, events: [] },
          { name: "ה", dayOfWeek: 2, events: [] },
          { name: "ו", dayOfWeek: 3, events: [] },
          { name: "ז", dayOfWeek: 4, events: [] },
          { name: "ח", dayOfWeek: 5, events: [] },
          { name: "ט", dayOfWeek: 6, events: [] },
          {
            name: "י",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "יא", dayOfWeek: 1, events: [] },
          { name: "יב", dayOfWeek: 2, events: [] },
          { name: "יג", dayOfWeek: 3, events: [] },
          { name: "יד", dayOfWeek: 4, events: [] },
          {
            name: "טו",
            dayOfWeek: 5,
            events: [{ type: "🍷", text: "יום טוב פסח" }],
          },
          {
            name: "טז",
            dayOfWeek: 6,
            events: [{ type: "🍷", text: "א דחול המועד" }],
          },
          {
            name: "יז",
            dayOfWeek: 7,
            events: [{ type: "🍷", text: "ב דחול המועד" }],
          },
          {
            name: "יח",
            dayOfWeek: 1,
            events: [{ type: "🍷", text: "ג דחול המועד" }],
          },
          {
            name: "יט",
            dayOfWeek: 2,
            events: [{ type: "🍷", text: "ד דחול המועד" }],
          },
          {
            name: "כ",
            dayOfWeek: 3,
            events: [{ type: "🍷", text: "ה דחול המועד" }],
          },
          {
            name: "כא",
            dayOfWeek: 4,
            events: [{ type: "🍷", text: "שביעי של פסח" }],
          },
          { name: "כב", dayOfWeek: 5, events: [] },
          { name: "כג", dayOfWeek: 6, events: [] },
          {
            name: "כד",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "כה", dayOfWeek: 1, events: [] },
          { name: "כו", dayOfWeek: 2, events: [] },
          { name: "כז", dayOfWeek: 3, events: [] },
          { name: "כח", dayOfWeek: 4, events: [] },
          { name: "כט", dayOfWeek: 5, events: [] },
          {
            name: "ל",
            dayOfWeek: 6,
            events: [{ type: "🌙", text: "ראש חודש אייר" }],
          },
        ],
      },

      {
        name: "אייר",
        Days: [
          {
            name: "א",
            dayOfWeek: 7,
            events: [
              { type: "🕯️🕯️", text: "שבת קודש" },
              { type: "🌙", text: "ראש חודש אייר" },
            ],
          },
          { name: "ב", dayOfWeek: 1, events: [] },
          { name: "ג", dayOfWeek: 2, events: [] },
          { name: "ד", dayOfWeek: 3, events: [] },
          { name: "ה", dayOfWeek: 4, events: [] },
          { name: "ו", dayOfWeek: 5, events: [] },
          { name: "ז", dayOfWeek: 6, events: [] },
          {
            name: "ח",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "ט", dayOfWeek: 1, events: [] },
          { name: "י", dayOfWeek: 2, events: [] },
          { name: "יא", dayOfWeek: 3, events: [] },
          { name: "יב", dayOfWeek: 4, events: [] },
          { name: "יג", dayOfWeek: 5, events: [] },
          { name: "יד", dayOfWeek: 6, events: [] },
          {
            name: "טו",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "טז", dayOfWeek: 1, events: [] },
          { name: "יז", dayOfWeek: 2, events: [] },
          {
            name: "יח",
            dayOfWeek: 3,
            events: [{ type: "🔥", text: "לג בעומר" }],
          },
          { name: "יט", dayOfWeek: 4, events: [] },
          { name: "כ", dayOfWeek: 5, events: [] },
          { name: "כא", dayOfWeek: 6, events: [] },
          {
            name: "כב",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "כג", dayOfWeek: 1, events: [] },
          { name: "כד", dayOfWeek: 2, events: [] },
          { name: "כה", dayOfWeek: 3, events: [] },
          { name: "כו", dayOfWeek: 4, events: [] },
          { name: "כז", dayOfWeek: 5, events: [] },
          { name: "כח", dayOfWeek: 6, events: [] },
          {
            name: "כט",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
        ],
      },
      {
        name: "סיוון",
        Days: [
          {
            name: "א",
            dayOfWeek: 1,
            events: [{ type: "🌙", text: "ראש חודש סיון" }],
          },
          { name: "ב", dayOfWeek: 2, events: [] },
          { name: "ג", dayOfWeek: 3, events: [] },
          { name: "ד", dayOfWeek: 4, events: [] },
          { name: "ה", dayOfWeek: 5, events: [] },
          {
            name: "ו",
            dayOfWeek: 6,
            events: [{ type: "🍰", text: "יום טוב שבועות" }],
          },
          {
            name: "ז",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "ח", dayOfWeek: 1, events: [] },
          { name: "ט", dayOfWeek: 2, events: [] },
          { name: "י", dayOfWeek: 3, events: [] },
          { name: "יא", dayOfWeek: 4, events: [] },
          { name: "יב", dayOfWeek: 5, events: [] },
          { name: "יג", dayOfWeek: 6, events: [] },
          {
            name: "יד",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "טו", dayOfWeek: 1, events: [] },
          { name: "טז", dayOfWeek: 2, events: [] },
          { name: "יז", dayOfWeek: 3, events: [] },
          { name: "יח", dayOfWeek: 4, events: [] },
          { name: "יט", dayOfWeek: 5, events: [] },
          { name: "כ", dayOfWeek: 6, events: [] },
          {
            name: "כא",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "כב", dayOfWeek: 1, events: [] },
          { name: "כג", dayOfWeek: 2, events: [] },
          { name: "כד", dayOfWeek: 3, events: [] },
          { name: "כה", dayOfWeek: 4, events: [] },
          { name: "כו", dayOfWeek: 5, events: [] },
          { name: "כז", dayOfWeek: 6, events: [] },
          {
            name: "כח",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "כט", dayOfWeek: 1, events: [] },
          {
            name: "ל",
            dayOfWeek: 2,
            events: [{ type: "🌙", text: "ראש חודש תמוז" }],
          },
        ],
      },

      {
        name: "תמוז",
        Days: [
          {
            name: "א",
            dayOfWeek: 3,
            events: [{ type: "🌙", text: "ראש חודש תמוז" }],
          },
          { name: "ב", dayOfWeek: 4, events: [] },
          { name: "ג", dayOfWeek: 5, events: [] },
          { name: "ד", dayOfWeek: 6, events: [] },
          {
            name: "ה",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "ו", dayOfWeek: 1, events: [] },
          { name: "ז", dayOfWeek: 2, events: [] },
          { name: "ח", dayOfWeek: 3, events: [] },
          { name: "ט", dayOfWeek: 4, events: [] },
          { name: "י", dayOfWeek: 5, events: [] },
          { name: "יא", dayOfWeek: 6, events: [] },
          {
            name: "יב",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "יג", dayOfWeek: 1, events: [] },
          { name: "יד", dayOfWeek: 2, events: [] },
          { name: "טו", dayOfWeek: 3, events: [] },
          { name: "טז", dayOfWeek: 4, events: [] },
          {
            name: "יז",
            dayOfWeek: 5,
            events: [{ type: "❌", text: "צום שבעה עשר בתמוז" }],
          },
          { name: "יח", dayOfWeek: 6, events: [] },
          {
            name: "יט",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "כ", dayOfWeek: 1, events: [] },
          { name: "כא", dayOfWeek: 2, events: [] },
          { name: "כב", dayOfWeek: 3, events: [] },
          { name: "כג", dayOfWeek: 4, events: [] },
          { name: "כד", dayOfWeek: 5, events: [] },
          { name: "כה", dayOfWeek: 6, events: [] },
          {
            name: "כו",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "כז", dayOfWeek: 1, events: [] },
          { name: "כח", dayOfWeek: 2, events: [] },
          { name: "כט", dayOfWeek: 3, events: [] },
        ],
      },
      {
        name: "אב",
        Days: [
          {
            name: "א",
            dayOfWeek: 4,
            events: [{ type: "🌙", text: "ראש חודש אב" }],
          },
          { name: "ב", dayOfWeek: 5, events: [] },
          { name: "ג", dayOfWeek: 6, events: [] },
          {
            name: "ד",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "ה", dayOfWeek: 1, events: [] },
          { name: "ו", dayOfWeek: 2, events: [] },
          { name: "ז", dayOfWeek: 3, events: [] },
          { name: "ח", dayOfWeek: 4, events: [] },
          {
            name: "ט",
            dayOfWeek: 5,
            events: [{ type: "❌", text: "צום תשעה באב" }],
          },
          { name: "י", dayOfWeek: 6, events: [] },
          {
            name: "יא",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "יב", dayOfWeek: 1, events: [] },
          { name: "יג", dayOfWeek: 2, events: [] },
          { name: "יד", dayOfWeek: 3, events: [] },
          { name: "טו", dayOfWeek: 4, events: [] },
          { name: "טז", dayOfWeek: 5, events: [] },
          { name: "יז", dayOfWeek: 6, events: [] },
          {
            name: "יח",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "יט", dayOfWeek: 1, events: [] },
          { name: "כ", dayOfWeek: 2, events: [] },
          { name: "כא", dayOfWeek: 3, events: [] },
          { name: "כב", dayOfWeek: 4, events: [] },
          { name: "כג", dayOfWeek: 5, events: [] },
          { name: "כד", dayOfWeek: 6, events: [] },
          {
            name: "כה",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "כו", dayOfWeek: 1, events: [] },
          { name: "כז", dayOfWeek: 2, events: [] },
          { name: "כח", dayOfWeek: 3, events: [] },
          { name: "כט", dayOfWeek: 4, events: [] },
          {
            name: "ל",
            dayOfWeek: 5,
            events: [{ type: "🌙", text: "ראש חודש אלול" }],
          },
        ],
      },

      {
        name: "אלול",
        Days: [
          {
            name: "א",
            dayOfWeek: 6,
            events: [{ type: "🌙", text: "ראש חודש אלול" }],
          },
          {
            name: "ב",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "ג", dayOfWeek: 1, events: [] },
          { name: "ד", dayOfWeek: 2, events: [] },
          { name: "ה", dayOfWeek: 3, events: [] },
          { name: "ו", dayOfWeek: 4, events: [] },
          { name: "ז", dayOfWeek: 5, events: [] },
          { name: "ח", dayOfWeek: 6, events: [] },
          {
            name: "ט",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "י", dayOfWeek: 1, events: [] },
          { name: "יא", dayOfWeek: 2, events: [] },
          { name: "יב", dayOfWeek: 3, events: [] },
          { name: "יג", dayOfWeek: 4, events: [] },
          { name: "יד", dayOfWeek: 5, events: [] },
          { name: "טו", dayOfWeek: 6, events: [] },
          {
            name: "טז",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "יז", dayOfWeek: 1, events: [] },
          { name: "יח", dayOfWeek: 2, events: [] },
          { name: "יט", dayOfWeek: 3, events: [] },
          { name: "כ", dayOfWeek: 4, events: [] },
          { name: "כא", dayOfWeek: 5, events: [] },
          { name: "כב", dayOfWeek: 6, events: [] },
          {
            name: "כג",
            dayOfWeek: 7,
            events: [{ type: "🕯️🕯️", text: "שבת קודש" }],
          },
          { name: "כד", dayOfWeek: 1, events: [] },
          { name: "כה", dayOfWeek: 2, events: [] },
          { name: "כו", dayOfWeek: 3, events: [] },
          { name: "כז", dayOfWeek: 4, events: [] },
          { name: "כח", dayOfWeek: 5, events: [] },
          { name: "כט", dayOfWeek: 6, events: [] },
        ],
      },
    ],
  });

  return (
    <>
      {!flag ? (
        <CreateCalander
          setBasicCalender={setBasicCalender}
          setName={setName}
          setFlag={setFlag}
          name={name}
          basicCalender={basicCalender}
        ></CreateCalander>
      ) : (
        <>
          <a href="#setting" class="settings-link">
            הגדרות לוח
          </a>
          <ReadyCalander
            basicCalender={basicCalender}
            name={name}
            backColor={backColor}
            lettersColor={lettersColor}
            dayColor={dayColor}
          >
            setting
          </ReadyCalander>
          <AddEvent
            setBackColor={setBackColor}
            setDayColor={setDayColor}
            basicCalender={basicCalender}
            setBasicCalender={setBasicCalender}
            name={name}
            setLettersColor={setLettersColor}
          ></AddEvent>
          <a href="#" class="settings-link">
            חזרה לראש הלוח{" "}
          </a>
        </>
      )}
    </>
  );
};

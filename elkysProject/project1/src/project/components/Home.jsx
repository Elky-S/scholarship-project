import { selecCurrent } from "../redux/Users";
import { useSelector } from "react-redux";
import "./home.css";
import {
  FaUniversity,
  FaUserGraduate,
  FaInfoCircle,
  FaBullhorn,
  FaUser,
  FaBell,
  FaBook,
  FaGraduationCap,
} from "react-icons/fa";
import React from "react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

// **ייבוא התמונות מתיקייה באותה תיקייה כמו Home.jsx**
import siver1 from "./pic/ss.jpeg";
import grafic from "./pic/gr.jpeg";
import math from "./pic/m.jpeg";
import adr from "./pic/ad.jpeg";
import olpan from "./pic/ol.jpeg";
import hand from "./pic/h.jpeg";
//מערך תמונות וכיתובים:
const images = [
  { src: siver1, title: "Cyber ​​and information security" },
  { src: grafic, title: "Graphic design" },
  { src: math, title: "Mathematics" },
  { src: adr, title: "Architecture" },
  { src: olpan, title: "Studio and sound" },
  { src: hand, title: "programming" },
];

// מערך חדשות ועדכונים
const newsTexts = [
  `In the coming weeks, 
  a new round of scholarships is expected to open for students studying at recognized academic institutions.
   The scholarships are intended for diverse fields of study, with an emphasis on professions in demand in the economy,
    and socio-economic status will also be taken into account.`,

  `Please note: Scholarship applications will only be processed after all required documents,
   including study certificates, diplomas, and relevant references,
    are attached. Incomplete or incorrect applications may be rejected without the possibility of appeal.`,

  `In the coming month, supplementary courses and professional trainings will be announced
   that allow for expanding eligibility for existing scholarships.
   It is recommended to follow the announcements and register in time,
   since the number of places is limited.`,

  `The system is updated regularly according to new procedures
    and guidelines from the funding bodies. We recommend entering
    the “News and Updates” area at least once a week
    to stay up to date with any changes or important announcements.`,

  `New students in the system are asked to ensure
     that all of their personal and academic details are entered accurately.
     Inaccuracies may cause a delay in processing the application
     or its rejection due to inconsistency with the data in the system. `,
];
export const Home = () => {
  const navigate = useNavigate();
  // עדכונים וחדשות מתחלף
  const [currentNews, setCurrentNews] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev === newsTexts.length - 1 ? 0 : prev + 1));
    }, 4000); // מתחלף כל 4 שניות

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      <div className="home-container">
        {/* Hero-card עם הכפתור */}
        <div className="hero-card">
          <div className="hero-icons">
            <FaBook className="hero-icon" />
            <FaGraduationCap className="hero-icon" />
            <FaUserGraduate className="hero-icon" />
          </div>
          <h1>Studies • Scholarships • Students</h1>
          <button
            className="main-btn"
            onClick={() => {
              navigate("/apply");
            }}
          >
            To submit a scholarship application
          </button>
        </div>

        {/* System-card */}
        <div className="system-card">
          <h2>
            {" "}
            System messages <FaBell className="system-icon"></FaBell>{" "}
          </h2>
          <p>
            The system is expected to undergo a significant upgrade in the
            coming days.
            <br />
            There may be slowdowns or temporary unavailability.{" "}
          </p>
        </div>

        {/* פס כותרת */}
        <div className="strip-row">
          <h2>Professions eligible for scholarships </h2>
          <FaUniversity className="strip-icon" />
        </div>

        {/* שורת תמונות */}
        <div className="cards-row">
          {images.map((item, i) => (
            <div className="image-card" key={i}>
              <div className="image-box">
                <img src={item.src} alt={item.title} />

                {/* שכבת כיתוב */}
                <div className="image-overlay">
                  <span>{item.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* info-section */}
        <div className="info-section">
          <div className="info-grid two-cols">
            <div className="info-box">
              <FaUserGraduate className="info-icon" />
              <h3>Supplementary Courses </h3>
              <p>
                You can take additional courses to expand your knowledge and
                eligibility for scholarships.
              </p>
            </div>
            <div className="info-box">
              <FaInfoCircle className="info-icon" />
              <h3>Important Information</h3>
              <p>
                Make sure that all required documents are attached to the
                application. Incomplete applications will not be processed.{" "}
              </p>
            </div>
          </div>
        </div>
        {/* חדשות ועדכונים */}
        <div className="wide-card">
          <FaBullhorn className="info-icon" />
          <h2>News And Updates </h2>

          <p className="news-text">
            <div className="news-dots">
              {newsTexts.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentNews ? "active" : ""}`}
                ></span>
              ))}
            </div>
            <br />
            {newsTexts[currentNews]}
          </p>
        </div>
      </div>
    </div>
  );
};

export const Name = () => {
  const n = useSelector(selecCurrent);
  return (
    <>
      Hello {n?.firstName} <FaUser></FaUser>
    </>
  );
};

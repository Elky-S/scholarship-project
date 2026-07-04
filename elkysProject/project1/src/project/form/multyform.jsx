import react, { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { selecCurrent } from "../redux/Users";
import { saveFamly, saveName, saveStudy } from "../redux/Requests";
import "../components/css/apply.css";
import api from "../api";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const MultiForm = (props) => {
  let steps = react.Children.toArray(props.children);
  const [num, setNum] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selecCurrent);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // --- 1. State מרכזי עם דגלים לקבצים ---
  const [details, setDetails] = useState({
    name: "",
    lastName: "",
    id: "",
    date: "",
    city: "",
    street: "",
    mobilePhone: "",
    idCardFile: null,
    email: "",
    fName: "",
    mName: "",
    numChild: "",
    numChild19: "",
    brothers: [],
    curse: "",
    TuitionFees: "",
    years: "", // מתחיל ריק כדי שיהיה חובה למלא
    numCount: "",
    snif: "",
    numBank: "",
    confirmTerms: false,
    bankApprovalFile: null,

    // דגלים לזיהוי קבצים קיימים בטיוטה
    hasExistingIdCard: false,
    hasExistingBankApproval: false,
  });

  const clean = (val) =>
    val === "N/A" || val === "undefined" || !val ? "" : val;

  // --- 2. וולידציה חכמה (מתחשבת בדגלים) ---
  const validateStep = () => {
    let newErrors = {};

    if (num === 0) {
      if (!details.name) newErrors.name = "שדה חובה";
      if (!details.lastName) newErrors.lastName = "שדה חובה";
      if (!details.date) newErrors.date = "שדה חובה";
      if (!details.city) newErrors.city = "יש לבחור עיר";
      if (!details.street) newErrors.street = "יש לבחור רחוב";
      if (!details.mobilePhone || !/^05\d{8}$/.test(details.mobilePhone))
        newErrors.mobilePhone = "מספר לא תקין";

      // בדיקת קובץ: רק אם אין קובץ חדש וגם אין קובץ קודם בטיוטה
      if (!details.idCardFile && !details.hasExistingIdCard) {
        newErrors.idCardFile = "חובה לצרף תצלום ת.ז.";
      }
    }

    if (num === 1) {
      if (!details.fName) newErrors.fName = "שדה חובה";
      if (!details.mName) newErrors.mName = "שדה חובה";
      if (details.numChild === "" || details.numChild === undefined)
        newErrors.numChild = "שדה חובה";
      if (details.numChild19 === "" || details.numChild19 === undefined)
        newErrors.numChild19 = "שדה חובה";
    }

    if (num === 2) {
      if (!details.curse) newErrors.curse = "שדה חובה";
      if (!details.TuitionFees) newErrors.TuitionFees = "שדה חובה";
      if (!details.years || details.years === "" || details.years <= 0) {
        newErrors.years = "שדה חובה";
      }
    }

    if (num === 3) {
      if (!details.numCount) newErrors.numCount = "מספר חשבון חובה";
      if (!details.snif) newErrors.snif = "מספר סניף חובה";
      if (!details.numBank) newErrors.numBank = "מספר בנק חובה";
      if (!details.confirmTerms) newErrors.checked = "חובה לאשר תקנון";

      // בדיקת קובץ בנק: רק אם אין חדש וגם אין בטיוטה
      if (!details.bankApprovalFile && !details.hasExistingBankApproval) {
        newErrors.bankApprovalFile = "חובה לצרף אישור ניהול חשבון";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- 3. טעינת טיוטה ועדכון הדגלים ---
  const loadDraftToState = (draft) => {
    if (!draft) return;

    setDetails((prev) => ({
      ...prev,
      name:
        clean(draft.personalInfo?.firstName) || currentUser?.firstName || "",
      lastName:
        clean(draft.personalInfo?.lastName) || currentUser?.lastName || "",
      id: clean(draft.personalInfo?.idNumber) || currentUser?.idNumber || "",
      email: clean(draft.personalInfo?.email) || currentUser?.email || "",
      date: clean(draft.personalInfo?.birthDate)
        ? draft.personalInfo.birthDate.split("T")[0]
        : "",
      city: clean(draft.personalInfo?.city),
      street: clean(draft.personalInfo?.street),
      mobilePhone: clean(draft.personalInfo?.mobilePhone),
      fName: clean(draft.familyInfo?.fatherFirstName),
      mName: clean(draft.familyInfo?.motherFirstName),
      numChild: clean(draft.familyInfo?.under18BrothersCount),
      numChild19: clean(draft.familyInfo?.over21MarriedBrothersCount),
      brothers: draft.familyInfo?.brothers || [],
      curse: clean(draft.studyInfo?.major),
      TuitionFees: clean(draft.studyInfo?.annualTuition),
      years: clean(draft.studyInfo?.yearsOfStudy),
      numCount: clean(draft.bankInfo?.accountNumber),
      snif: clean(draft.bankInfo?.branchNumber),
      numBank: clean(draft.bankInfo?.bankNumber),

      // בדיקה אם קיימים קבצים בשרת
      hasExistingIdCard: !!(
        draft.personalInfo?.idCardFile &&
        draft.personalInfo.idCardFile !== "N/A"
      ),
      hasExistingBankApproval: !!(
        draft.bankInfo?.bankApprovalFile &&
        draft.bankInfo.bankApprovalFile !== "N/A"
      ),

      // הקבצים ב-State נשארים null (הם יתמלאו רק אם המשתמש יעלה קובץ חדש)
      idCardFile: null,
      bankApprovalFile: null,
    }));
    setErrors({});
  };

  // --- 4. פונקציות עזר (שמירה ושליחה) ---
  useEffect(() => {
    const checkAndLoadDraft = async () => {
      if (!currentUser) return;
      try {
        const res = await api.get("/requests/draft");
        if (res.data && res.data.personalInfo) {
          Swal.fire({
            title: "נמצאה טיוטה שמורה",
            text: "האם תרצה לשחזר את הנתונים?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "כן, שחזר",
            cancelButtonColor: "#d33",
            confirmButtonColor: "#05807f",
          }).then((result) => {
            if (result.isConfirmed) loadDraftToState(res.data);
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkAndLoadDraft();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && !details.name) {
      setDetails((prev) => ({
        ...prev,
        name: currentUser.firstName || prev.name,
        lastName: currentUser.lastName || prev.lastName,
        id: currentUser.idNumber || currentUser.id || prev.id,
        email: currentUser.email || prev.email,
      }));
    }
  }, [currentUser]);

  const buildFormData = () => {
    const formData = new FormData();
    formData.append("personalInfo[firstName]", details.name);
    formData.append("personalInfo[lastName]", details.lastName);
    formData.append("personalInfo[idNumber]", details.id);
    formData.append("personalInfo[birthDate]", details.date);
    formData.append("personalInfo[city]", details.city);
    formData.append("personalInfo[street]", details.street);
    formData.append("personalInfo[mobilePhone]", details.mobilePhone);
    formData.append("personalInfo[email]", details.email);
    if (details.idCardFile) formData.append("idCardFile", details.idCardFile);

    formData.append("familyInfo[under18BrothersCount]", details.numChild);
    formData.append("familyInfo[fatherFirstName]", details.fName);
    formData.append("familyInfo[motherFirstName]", details.mName);
    formData.append(
      "familyInfo[over21MarriedBrothersCount]",
      details.numChild19,
    );
    formData.append("familyInfo[brothers]", JSON.stringify(details.brothers));

    formData.append("studyInfo[major]", details.curse);
    formData.append("studyInfo[annualTuition]", details.TuitionFees);
    formData.append("studyInfo[yearsOfStudy]", details.years);

    formData.append("bankInfo[accountNumber]", details.numCount);
    formData.append("bankInfo[branchNumber]", details.snif);
    formData.append("bankInfo[bankNumber]", details.numBank);
    if (details.bankApprovalFile)
      formData.append("bankApprovalFile", details.bankApprovalFile);

    return formData;
  };

  const handleSaveDraft = async () => {
    try {
      const formData = buildFormData();
      await api.post("/requests/submit?draft=true", formData);
      Swal.fire("נשמר", "הטיוטה נשמרה בהצלחה.", "success");
    } catch (err) {
      swal("שגיאה", "נכשל בשמירה", "error");
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const formData = buildFormData();
      await api.post("/requests/submit?draft=false", formData);
      await Swal.fire("הצלחה!", "הבקשה הוגשה בהצלחה!", "success");
      navigate("/apply");
    } catch (err) {
      swal("שגיאה", err.response?.data?.message || "שגיאה בשרת", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const prev = () => {
    if (num > 0) setNum(num - 1);
  };

  const next = () => {
    if (!validateStep()) {
      Swal.fire({
        icon: "error",
        title: "חסרים פרטים",
        text: "אנא מלאי את כל שדות החובה בשלב זה",
      });
      return;
    }

    const { idCardFile, bankApprovalFile, ...onlyTextDetails } = details;
    if (num === 0) dispatch(saveName(onlyTextDetails));
    if (num === 1) dispatch(saveFamly(onlyTextDetails));
    if (num === 2) dispatch(saveStudy(onlyTextDetails));

    if (num === steps.length - 1) {
      handleSubmit();
    } else {
      setNum(num + 1);
      setErrors({});
    }
  };

  const currentChild = () => {
    return react.cloneElement(steps[num], {
      setDetails,
      details,
      errors,
      setErrors,
    });
  };

  return (
    <div className="mainDiv">
      <div className="stpDiv">
        {steps.map((_, i) => (
          <button key={i} className={`step ${num === i ? "active-step" : ""}`}>
            {i + 1}
          </button>
        ))}
      </div>
      <div className="frmDiv">{currentChild()}</div>
      <div className="multi-buttons">
        <button className="btn" onClick={prev} disabled={num === 0}>
          חזור
        </button>
        <button
          className="btn"
          style={{ backgroundColor: "#6c757d" }}
          onClick={handleSaveDraft}
        >
          שמור טיוטה
        </button>
        <button
          type="button"
          className="btn"
          onClick={next}
          disabled={isSubmitting}
        >
          {num === steps.length - 1 ? "שלח בקשה סופית" : "הבא"}
        </button>
      </div>
    </div>
  );
};

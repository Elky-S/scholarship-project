import GrantRequest from "../models/GrantRequest.js";
import { sendStatusEmail } from "../services/emailService.js";
import User from "../models/User.js"; // ודאי שהשורה הזו קיימת למעלה!
// 2. עדכון סטטוס בקשה (אישור/דחייה)
// 1. שליפת כל הבקשות (עבור המנהל)
export const getAllRequests = async (req, res) => {
  try {
    let query = { isDraft: false }; // מנהל רואה רק בקשות שהוגשו סופית

    // 1. סינון לפי סטטוס (למשל: ?status=בהמתנה)
    if (req.query.status) {
      query.status = req.query.status;
    }

    // 2. סינון לפי עיר
    if (req.query.city) {
      // מחפש את המילה שהוקלדה בתוך כל מחרוזת הכתובת (לא משנה אותיות גדולות/קטנות)
      query["personalInfo.city"] = { $regex: req.query.city, $options: "i" };
    }

    // 3. סינון לפי מספר אחים (מינימום)
    if (req.query.minBrothers) {
      query["familyInfo.under18BrothersCount"] = {
        $gte: Number(req.query.minBrothers),
      };
    }

    // 4. חיפוש מתקדם: תעודת זהות או שם (כאן הקסם קורה)
    if (req.query.search) {
      const searchTerm = req.query.search;

      // אנחנו מחפשים משתמשים שמתאימים לשם או לת"ז
      const users = await User.find({
        $or: [
          { idNumber: { $regex: searchTerm, $options: "i" } },
          { firstName: { $regex: searchTerm, $options: "i" } },
          { lastName: { $regex: searchTerm, $options: "i" } },
        ],
      }).select("_id");

      const userIds = users.map((u) => u._id);
      query.userId = { $in: userIds };
    }

    // 5. הרצת השאילתה עם ה-Populate
    const requests = await GrantRequest.find(query)
      .populate("userId", "firstName lastName idNumber email")
      .sort({ submittedAt: -1 }); // הכי חדשים למעלה

    res.json(requests);
  } catch (error) {
    console.error("Filter Error:", error);
    res
      .status(500)
      .json({ message: "שגיאה בשליפת הנתונים", error: error.message });
  }
};
// 2. עדכון סטטוס בקשה (אישור/דחייה)
// 2. עדכון סטטוס בקשה (אישור/דחייה) ושליחת מייל לסטודנט
export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // 1. שליפת המסמך הנוכחי כדי לבדוק סטטוס קודם (עבור לוגיקת Re-Approved)
    const currentDoc = await GrantRequest.findById(id);
    if (!currentDoc) {
      return res.status(404).json({ message: "בקשה לא נמצאה" });
    }

    // בדיקה האם מדובר באישור מחדש (היה דחוי ועכשיו מאושר)
    const isReApproved = currentDoc.status === "דחוי" && status === "מאושר";

    // 2. עדכון הסטטוס בבסיס הנתונים
    // שימוש ב-populate כדי להביא את פרטי המשתמש המקורי (הסטודנט) מהמודל User
    const updatedRequest = await GrantRequest.findByIdAndUpdate(
      id,
      { status: status },
      { returnDocument: "after" },
    ).populate("userId", "email firstName");

    if (!updatedRequest) {
      return res.status(404).json({ message: "שגיאה בעדכון הבקשה" });
    }

    // 3. שליחת מייל עדכון לסטודנט
    // חשוב: אנחנו לוקחים את האימייל מ-updatedRequest.userId (בעל הבקשה)
    // ולא מ-req.user (המנהל המחובר כרגע)
    if (updatedRequest.userId && updatedRequest.userId.email) {
      const studentEmail = updatedRequest.userId.email;
      const studentName = updatedRequest.userId.firstName;
      // קריאה לפונקציה ששולחת את המייל בפועל
      // אנחנו מעבירים את המייל והשם של הסטודנט שנשלפו מה-populate
      sendStatusEmail(studentEmail, studentName, status, isReApproved).catch(
        (err) => console.error("❌ שגיאה בשליחת מייל עדכון:", err),
      );
      console.log(
        `📧 מייל עדכון סטטוס נשלח לסטודנט: ${studentEmail} (סטטוס חדש: ${status}, אישור מחדש: ${isReApproved})`,
      );
    } else {
      console.warn(
        "⚠️ לא ניתן לשלוח מייל: לא נמצא אימייל עבור המשתמש שפתח את הבקשה",
      );
    }

    // 4. החזרת תשובה למנהל שביצע את הפעולה
    res.json({
      message: `הסטטוס עודכן ל-${status} בהצלחה`,
      updatedRequest,
    });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({
      message: "שגיאה בעדכון הסטטוס",
      error: error.message,
    });
  }
};
// שליפת טיוטה קיימת למשתמש המחובר
export const getMyDraft = async (req, res) => {
  try {
    const draft = await GrantRequest.findOne({
      userId: req.user._id,
      isDraft: true,
    });
    if (!draft) return res.json(null);
    res.json(draft);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// יצירה או עדכון של טיוטה/בקשה
export const saveRequest = async (req, res) => {
  try {
    // 1. הגדרת פונקציית העזר בתחילת הבלוק
    // תיקון באג ה-Hoisting: אנחנו מגדירים אותה לפני שמשתמשים בה
    const getVal = (parent, child) => {
      const flatKey = `${parent}[${child}]`;
      if (req.body[flatKey] !== undefined) return req.body[flatKey];
      if (req.body[parent] && req.body[parent][child] !== undefined)
        return req.body[parent][child];
      return undefined;
    };

    // 2. זיהוי המשתמש (הביטוח נגד "חטיפת" הזהות של המנהל)
    // אנחנו לוקחים את תעודת הזהות שהוקלדה בטופס ומחפשים את המשתמש ב-DB
    const idFromForm = getVal("personalInfo", "idNumber");
    let userId = req.user?._id;

    if (idFromForm) {
      const userFromDb = await User.findOne({ idNumber: idFromForm });
      if (userFromDb) {
        // אם מצאנו משתמש שמתאים לת"ז בטופס, נשתמש ב-ID שלו (הסטודנט)
        userId = userFromDb._id;
      }
    }

    // אם אין ID מהטוקן וגם לא מצאנו לפי ת"ז - עוצרים כאן
    if (!userId)
      return res.status(401).json({ message: "לא זוהה משתמש במערכת" });

    // 3. בניית אובייקט הנתונים מה-Body
    const updateData = {
      userId: userId,
      isDraft: req.query.draft === "true",
      personalInfo: {
        birthDate: getVal("personalInfo", "birthDate"),
        city: getVal("personalInfo", "city"),
        street: getVal("personalInfo", "street"),
        mobilePhone: getVal("personalInfo", "mobilePhone"),
        firstName: getVal("personalInfo", "name"),
        lastName: getVal("personalInfo", "lastName"),
        idNumber: idFromForm,

        // המייל כאן נשמר בבקשה עצמה, אבל השליחה תתבצע לפי המייל הרשמי מה-DB
        email: getVal("personalInfo", "email"),
      },
      familyInfo: {
        fatherFirstName: getVal("familyInfo", "fatherFirstName") || "N/A",
        motherFirstName: getVal("familyInfo", "motherFirstName") || "N/A",
        under18BrothersCount: Number(
          getVal("familyInfo", "under18BrothersCount") || 0,
        ),
        over21MarriedBrothersCount: Number(
          getVal("familyInfo", "over21MarriedBrothersCount") || 0,
        ),
      },
      studyInfo: {
        major: getVal("studyInfo", "major"),
        yearsOfStudy: Number(getVal("studyInfo", "yearsOfStudy") || 0),
        annualTuition: Number(getVal("studyInfo", "annualTuition") || 0),
        institution: getVal("studyInfo", "institution") || "N/A",
      },
      bankInfo: {
        bankNumber: getVal("bankInfo", "bankNumber"),
        branchNumber: getVal("bankInfo", "branchNumber"),
        accountNumber: getVal("bankInfo", "accountNumber"),
        accountHolderId: getVal("bankInfo", "accountHolderId"),
      },
      documents: {
        idCardFile: req.files?.idCardFile?.[0]?.path,
        bankApprovalFile: req.files?.bankApprovalFile?.[0]?.path,
        studyApprovalFile: req.files?.studyApprovalFile?.[0]?.path,
        parentIdCardFile: req.files?.parentIdCardFile?.[0]?.path,
      },
    };

    // עיבוד מערך האחים (מרהיב מחרוזת JSON חזרה למערך)
    const rawBrothers = getVal("familyInfo", "brothers");
    try {
      updateData.familyInfo.brothers =
        typeof rawBrothers === "string"
          ? JSON.parse(rawBrothers)
          : rawBrothers || [];
    } catch (e) {
      updateData.familyInfo.brothers = [];
    }

    // קביעת סטטוס
    updateData.status = updateData.isDraft ? "טיוטה" : "בהמתנה";
    if (!updateData.isDraft) updateData.submittedAt = Date.now();

    // 4. עדכון או יצירה בבסיס הנתונים
    const request = await GrantRequest.findOneAndUpdate(
      { userId: userId, isDraft: true },
      { $set: updateData },
      {
        returnDocument: "after",
        upsert: true,
        runValidators: !updateData.isDraft,
      },
    );

    // 5. מנגנון שליחת המייל (מבוצע רק אם זו הגשה סופית ולא טיוטה)
    if (!updateData.isDraft) {
      try {
        // שליפה של המשתמש מה-DB כדי לקבל את המייל האמיתי שאיתו נרשם
        const userOwner = await User.findById(userId);

        if (userOwner && userOwner.email) {
          // שימוש בפרטים מה-DB מבטיח שהמייל יגיע לסטודנט ולא למנהל
          await sendStatusEmail(userOwner.email, userOwner.firstName, "בהמתנה");
          console.log(`✅ Mail sent successfully to: ${userOwner.email}`);
        }
      } catch (emailError) {
        console.error(
          "❌ Email process failed but request was saved:",
          emailError,
        );
      }
    }

    res.status(200).json({ message: "הבקשה נשמרה בהצלחה", request });
  } catch (error) {
    console.error("Save Error:", error.message);
    res
      .status(500)
      .json({ message: "שגיאה בתהליך השמירה", error: error.message });
  }
};
// שליפת הבקשה האחרונה שהוגשה (עבור דף סטטוס)
export const getMyRequestStatus = async (req, res) => {
  try {
    const request = await GrantRequest.findOne({
      userId: req.user._id,
      isDraft: false, // אנחנו רוצים בקשה סופית, לא טיוטה
    }).sort({ submittedAt: -1 }); // מביא את הכי חדשה

    if (!request) {
      return res.status(404).json({ message: "לא נמצאה בקשה מוגשת" });
    }
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    res.json(request);
  } catch (error) {
    res
      .status(500)
      .json({ message: "שגיאה בשליפת הסטטוס", error: error.message });
  }
};

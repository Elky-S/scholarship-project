import mongoose from "mongoose";

const grantRequestSchema = new mongoose.Schema(
  {
    // קישור למשתמש שהגיש את הבקשה
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // פרטים אישיים (נוסף על מה שיש במשתמש)
    personalInfo: {
      birthDate: { type: Date, required: true },
      city: { type: String, required: true },
      street: { type: String, required: true },
      houseNumber: { type: String },
      mobilePhone: { type: String, required: true },
      homePhone: { type: String }, // אופציונאלי
      zipCode: { type: String }, // אתגר: מיקוד
    },

    // פרטי משפחה
    familyInfo: {
      fatherFirstName: { type: String, required: true },
      motherFirstName: { type: String, required: true },
      under18BrothersCount: { type: Number, default: 0 },
      over21MarriedBrothersCount: { type: Number, default: 0 },
      brothers: [
        {
          name: String,
          age: Number,
          isMarried: Boolean,
        },
      ],
    },

    // פרטי לימודים
    studyInfo: {
      major: { type: String, required: true }, // מגמה
      institution: { type: String }, // מוסד
      yearsOfStudy: { type: Number, required: true },
      annualTuition: { type: Number, required: true }, // שכר שנתי
    },

    // פרטי בנק
    bankInfo: {
      accountHolderId: { type: String },
      bankNumber: { type: String, required: true },
      branchNumber: { type: String, required: true },
      accountNumber: { type: String, required: true },
    },
    // בתוך grantRequestSchema
    documents: {
      idCardFile: String, // נתיב לקובץ ת"ז ספח סטודנט
      parentIdCardFile: String, // נתיב לקובץ ת"ז הורים
      studyApprovalFile: String, // אישור לימודים
      bankApprovalFile: String, // אישור ניהול חשבון
    },

    // בתוך ה-Schema שלך, שדרגי את שדה ה-documents:

    isDraft: { type: Boolean, default: false }, // האם זו טיוטה או בקשה סופית
    // ניהול סטטוס וקבצים
    status: {
      type: String,
      enum: ["בהמתנה", "מאושר", "דחוי", "טיוטה"],
      default: "בהמתנה",
    },
    submittedAt: { type: Date, default: Date.now },
    emailForUpdates: { type: String }, // לאתגר עדכוני אימייל
  },
  { timestamps: true },
);

const GrantRequest = mongoose.model("GrantRequest", grantRequestSchema);
export default GrantRequest;

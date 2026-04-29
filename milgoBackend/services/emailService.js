import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// 1. הגדרת הטרנספורטר
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 2. הפונקציה לשליחת המייל - הוספנו את הפרמטר isReApproved
export const sendStatusEmail = async (
  to,
  firstName,
  status,
  isReApproved = false,
) => {
  const subject =
    status === "בהמתנה" ? "בקשתך למלגה התקבלה!" : "עדכון לגבי סטטוס הבקשה שלך";

  // קביעת צבעים
  const colors = { מאושר: "#05807f", דחוי: "#d9534f", בהמתנה: "#f0ad4e" };
  const mainColor = colors[status] || "#6c757d";

  // בניית תוכן ההודעה לפי הסטטוס
  let messageContent = "";

  if (status === "מאושר") {
    if (isReApproved) {
      // נוסח מיוחד למקרה של אישור לאחר דחייה
      messageContent = `
        <br><br>
        רצינו לעדכן כי לאחר עיון נוסף ובחינה מחודשת של הנתונים בבקשתך, 
        אנו שמחים לבשר לך כי <strong>בסופו של דבר המלגה אושרה!</strong><br><br>
        את המלגה תקבלו ישירות לפרטי חשבון הבנק שהזנתם במערכת בזמן הקרוב.<br>
        אנו מאחלים לכם הצלחה רבה בהמשך הלימודים.
      `;
    } else {
      // נוסח רגיל לבקשה שאושרה בפעם הראשונה
      messageContent = `
              <br><br>
        אנו שמחים לבשר לך כי לאחר בדיקת הנתונים, <strong>בקשתך למלגה התקבלה ואושרה!</strong><br><br>
        את המלגה תקבלו ישירות לפרטי חשבון הבנק שהזנתם במערכת בזמן הקרוב.<br>
        אנו מאחלים לכם הצלחה רבה בהמשך הלימודים ובכלל.
      `;
    }
  } else if (status === "דחוי") {
    messageContent = `
            <br><br>

      אנו מצטערים להודיע כי לאחר בחינה מעמיקה של הבקשה, <strong>לא נוכל לקבל את בקשתך למלגה</strong> בשלב זה.<br><br>
      לצערנו, עקב מגבלות תקציב וקריטריונים שונים, לא התאפשר לנו לאשר את המענק.<br>
      אנו מאחלים לך הצלחה רבה בהמשך הדרך ובשאר האפיקים.
    `;
  } else {
    messageContent = `
            <br><br>

      רצינו לעדכן שסטטוס הבקשה שלך עודכן ל: <strong>${status}</strong>.<br>
      הבקשה הועברה לבדיקת המנהלים. נעדכן אותך בהמשך.
    `;
  }

  // בניית ה-HTML המעוצב (נשאר אותו דבר, רק משתמש ב-messageContent המעודכן)
  const htmlContent = `
    <div dir="rtl" style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 15px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="background-color: ${mainColor}; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">עדכון ממערכת המלגות</h1>
        </div>
        <div style="padding: 40px; color: #333333; line-height: 1.8; text-align: right;">
            <h2 style="color: ${mainColor}; margin-top: 0;">שלום ${firstName},</h2>
            <div style="font-size: 16px; color: #444;">
                ${messageContent}
            </div>
            
            <div style="text-align: center; margin: 40px 0;">
                <a href="http://localhost:3000/status" style="background-color: ${mainColor}; color: #ffffff; padding: 15px 35px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; display: inline-block;">
                   לכניסה לאזור האישי
                </a>
            </div>
            
            <p style="font-size: 14px; color: #777; border-top: 1px solid #eee; padding-top: 20px;">
                בברכה,<br>
                צוות קרן המלגות
            </p>
        </div>
        <div style="background-color: #f1f3f5; padding: 15px; text-align: center; font-size: 11px; color: #999;">
            הודעה זו נשלחה באופן אוטומטי, נא לא להשיב למייל זה.
        </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"מערכת המלגות" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    });
    console.log(`✅ Success: Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

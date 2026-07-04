import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  // מתחיל תמיד כ-null. העדכון יתבצע רק אחרי אימות מול השרת (ב-Main.jsx)
  current: null,
};
export const userSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    //הוספת משתמש
    add: (state, action) => {
      //משתנה בוליאני המכיל האם המשתמש קיים או לא
      const exsist = state.userList.some(
        (u) => u.userPhone === action.payload.userPhone,
      );
      // -אם לא קיים
      if (!exsist) {
        //הוספה למערך
        state.userList.push(action.payload);
      }
    },
    //מעבר למשתנה הנוכחי
    setCurrent: (state, action) => {
      state.current = action.payload; // action.payload הוא האובייקט מהשרת
    },
  },
});
export const selectAlleUsers = (state) => state.user.userList;
export const selecCurrent = (state) => state.user.current;
//יצוא הפעולות
export const { add, setCurrent } = userSlice.actions;
export default userSlice.reducer;

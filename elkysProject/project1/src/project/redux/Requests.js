import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requestsList: [],
  count: 0,
  current: {},
};

const requests = createSlice({
  name: "request",
  initialState,
  reducers: {
    add: (state, action) => {
      state.count++;
      const newRequest = {
        id: state.count,
        status: "waiting",
        ...action.payload,
      };
      state.requestsList.push(newRequest);
    },
    allow: (state, action) => {
      const req = state.requestsList.find((i) => i._id == action.payload);
      if (req) req.status = "מאושר";
    },
    reject: (state, action) => {
      const req = state.requestsList.find((i) => i._id == action.payload);
      if (req) req.status = "reject";
    },
    saveName: (state, action) => {
      state.current.saveName = { ...state.current.saveName, ...action.payload };
    },
    saveFamly: (state, action) => {
      state.current.saveFamly = {
        ...state.current.saveFamly,
        ...action.payload,
      };
    },
    saveStudy: (state, action) => {
      state.current.saveStudy = {
        ...state.current.saveStudy,
        ...action.payload,
      };
    },
    saveBank: (state, action) => {
      state.current.saveBank = { ...state.current.saveBank, ...action.payload };
    },
    setAllRequests: (state, action) => {
      state.requestsList = action.payload; // מעדכן את המערך בכל הבקשות מהשרת
    },
  },
});

export const {
  add,
  allow,
  reject,
  saveName,
  saveFamly,
  saveStudy,
  saveBank,
  setAllRequests,
} = requests.actions;

// selectors — מחוץ ל־reducers
export const selectRequests = (state) => state.request.requestsList;

export const selectNotAllowed = (state) => state.request.requestsList;
export const selecReqCurrent = (state) => state.request.current;

export default requests.reducer;

import { configureStore } from "@reduxjs/toolkit";
import userSlice from './redux/Users'
import requests from './redux/Requests'

const store = configureStore({
    // כל הסלייסים שיצרנו - יהיו מאוחדים לרדיוסר אחד
    // reducer - מילה שמורה
    // configureStore מאפיין של אובייקט הפרמטר של הפונקציה
    reducer: {
        user: userSlice,
        request: requests

    }
})
export default store 
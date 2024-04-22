import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/loginSlice";
import headerReducer from "./slice/headerSlice.ts";
import notificationReducer from "./slice/notificationSlice.ts";

const rootReducer = combineReducers({
  auth: authReducer,
  header: headerReducer,
  notification: notificationReducer
});

export default rootReducer;

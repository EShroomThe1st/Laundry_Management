import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/loginSlice";
import headerReducer from "./slice/headerSlice.ts";

const rootReducer = combineReducers({
  auth: authReducer,
  header: headerReducer,
});

export default rootReducer;

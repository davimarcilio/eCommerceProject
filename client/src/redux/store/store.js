import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../login/loginSlice";
export default configureStore({
  reducer: { user: loginSlice },
});

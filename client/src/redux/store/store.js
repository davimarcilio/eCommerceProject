import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import loginSlice from "../user/userSlice";
export default configureStore({
  reducer: { user: loginSlice },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});

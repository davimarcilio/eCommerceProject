import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userEditSlice from "../user/userEditSlice";
import loginSlice from "../user/userSlice";
export default configureStore({
  reducer: { user: loginSlice, userEdit: userEditSlice },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});

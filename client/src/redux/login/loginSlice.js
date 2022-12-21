import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    value: 0,
  },
  reducers: {
    login: (state, { payload }) => {},
  },
});

// Action creators are generated for each case reducer function
export const { login } = counterSlice.actions;

export default loginSlice.reducer;

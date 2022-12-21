import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const loginUser = createAsyncThunk(
  "http://localhost:3000/user/login",
  async (payload) => {
    try {
      const responseLogin = await axios.post(
        "http://localhost:3000/user/login",
        {
          email: payload.email,
          password: payload.password,
        }
      );
      const responseUser = await axios.get(
        `http://localhost:3000/user/${responseLogin.data._id}`,
        {
          headers: {
            "authorization-token": responseLogin.data.authorizationToken,
          },
        }
      );

      return {
        user: responseUser.data,
        authToken: responseLogin.data.authorizationToken,
      };
    } catch (error) {
      return { error };
    }
  }
);
export const loginSlice = createSlice({
  name: "login",
  initialState: {
    status: "not authorized",
    user: { name: "Login" },
    logged: false,
    error: "",
    authToken: "",
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "authorized";
        // Add any fetched posts to the array
        // console.log(action.payload);
        state.user = action.payload.user;
        state.logged = true;
        state.authToken = action.payload.authToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

// Action creators are generated for each case reducer function
export const { login } = loginSlice.actions;

export default loginSlice.reducer;

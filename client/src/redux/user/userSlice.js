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
        `http://localhost:3000/join/usercart/${responseLogin.data._id}`,
        {
          headers: {
            "authorization-token": responseLogin.data.authorizationToken,
          },
        }
      );
      return {
        user: responseUser.data,
        success: responseLogin.data.message,
        authToken: responseLogin.data.authorizationToken,
      };
    } catch (error) {
      return { error: error.response.data };
    }
  }
);

export const loginLocalUser = createAsyncThunk(
  "http://localhost:3000/user/login",
  async (payload) => {
    try {
      const responseUser = await axios.get(
        `http://localhost:3000/join/usercart/${localStorage.getItem("")}`,
        {
          headers: {
            // "authorization-token": responseLogin.data.authorizationToken,
          },
        }
      );
      return {
        user: responseUser.data,
        // success: responseLogin.data.message,
        // authToken: responseLogin.data.authorizationToken,
      };
    } catch (error) {
      return { error: error.response.data };
    }
  }
);
export const registerUser = createAsyncThunk(
  "http://localhost:3000/user/add",
  async (payload) => {
    try {
      const responseRegister = await axios.post(
        "http://localhost:3000/user/add",
        payload
      );
      await axios.post("http://localhost:3000/cart/create", {
        userId: responseRegister.data.doc._id,
      });
      return {
        user: responseRegister,
      };
    } catch (error) {
      return { error: error.response.data };
    }
  }
);
export const loginSlice = createSlice({
  name: "login",
  initialState: {
    status: "not authorized",
    user: {},
    logged: false,
    error: "",
    authToken: "",
  },

  reducers: {
    reset: (state) => {
      state.status = "not authorized";
      state.user = {};
      state.logged = false;
      state.error = "";
      state.authToken = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "authorized";
        if (!!action.payload.user) {
          state.user = action.payload.user;
          state.logged = true;
          state.authToken = action.payload.authToken;
          localStorage.setItem("authorization-token", action.payload.authToken);
          state.error = action.payload.success;
        }
        if (!!action.payload.error) {
          state.error = action.payload.error;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      });
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "created";
        if (!!action.payload.user) {
          state.user = action.payload.user.data.doc;
          state.error = action.payload.user.data.success;
        }
        if (!!action.payload.error) {
          state.error = action.payload.error;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = loginSlice.actions;

export default loginSlice.reducer;

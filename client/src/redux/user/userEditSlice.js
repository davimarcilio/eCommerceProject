import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";
export function removeEmptyFilter(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null && v !== "")
  );
}
export const updateUser = createAsyncThunk(
  "http://localhost:3000/user/update",
  async (payload) => {
    try {
      const userId = payload._id;
      delete payload._id;
      const treatedPayload = removeEmptyFilter(payload);
      const responseUserUpdate = await axios.patch(
        `http://localhost:3000/user/update/${userId}`,
        {
          ...treatedPayload,
        },
        {
          headers: {
            "authorization-token": localStorage.getItem("authorization-token"),
          },
        }
      );
      return {
        success: responseUserUpdate.data,
      };
    } catch (error) {
      return { error: error.response.data };
    }
  }
);

export const editUserSlice = createSlice({
  name: "editUser",
  initialState: {
    zipDataCep: {},
    zip: "",
    city: "",
    states: "",
    address: "",
    number: "",
    name: "",
    email: "",
    phone: "",
    success: "",
    status: "",
  },

  reducers: {
    reset: (state) => {
      state.zipDataCep = {};
      state.zip = "";
      state.city = "";
      state.states = "";
      state.address = "";
      state.number = "";
      state.name = "";
      state.email = "";
      state.phone = "";
      state.success = "";
      state.status = "";
    },
    addName: (state, { payload }) => {
      state.name = payload;
    },
    addEmail: (state, { payload }) => {
      state.email = payload;
    },
    addPhone: (state, { payload }) => {
      state.phone = payload;
    },
    addState: (state, { payload }) => {
      state.states = payload;
    },
    addNumber: (state, { payload }) => {
      state.number = payload;
    },
    addZip: (state, { payload }) => {
      state.zip = payload;
    },
    addCity: (state, { payload }) => {
      state.city = payload;
    },
    addAddress: (state, { payload }) => {
      state.address = payload;
    },

    addDataCep: (state, { payload }) => {
      state.zipDataCep = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "updated";
        if (!!action.payload.success) {
          state.success = action.payload.success;
        }
        if (!!action.payload.error) {
          state.success = action.payload.error;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.success = action.payload.error;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  reset,
  addState,
  addDataCep,
  addCity,
  addAddress,
  addNumber,
  addZip,
  addName,
  addEmail,
  addPhone,
} = editUserSlice.actions;

export default editUserSlice.reducer;

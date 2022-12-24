import { createSlice } from "@reduxjs/toolkit";

export const editUserSlice = createSlice({
  name: "editUser",
  initialState: {
    zipDataCep: {},
    zip: "",
    city: "",
    states: "",
    address: "",
    number: "",
  },

  reducers: {
    reset: (state) => {
      state.zipDataCep = {};
      state.zip = "";
      state.city = "";
      state.states = "";
      state.address = "";
      state.number = "";
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
} = editUserSlice.actions;

export default editUserSlice.reducer;

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
    name: "",
    email: "",
    phone: "",
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

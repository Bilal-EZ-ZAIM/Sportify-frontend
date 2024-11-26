import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// Initial state
// État initial
const initialState = {
  counter: 2,
};

// Create the slice
// Création de la slice
const couterSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getCounter(state) {
      console.log(state.counter);
    },
  },
});

export const { getCounter } = couterSlice.actions;

export default couterSlice.reducer;

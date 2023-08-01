import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  units: [],
};
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUnits: (state, action) => {
      const { payload } = action;
      state.units = payload;
    },
  },
});

export const { setUnits } = appSlice.actions;
export default appSlice.reducer;

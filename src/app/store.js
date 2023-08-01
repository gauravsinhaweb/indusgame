import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./feature/appSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
  },
});

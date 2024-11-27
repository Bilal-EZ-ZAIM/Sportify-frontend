import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import eventSlice from "../features/eventSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    event: eventSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

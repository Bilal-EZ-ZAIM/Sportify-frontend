import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import eventSlice from "../features/eventSlice";
import Participantslice from '../features/participantSlice';
const store = configureStore({
  reducer: {
    auth: authSlice,
    event: eventSlice,
    participant : Participantslice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

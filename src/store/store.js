import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { calendarSlice } from "./calendar/calendarSlice";
import { uiSlice } from "./ui/uiSlice";

export const store = configureStore({
  // ! Evitar error: A non-serializable value was detected in the state, in the path
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer,
  },
});

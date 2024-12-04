import { configureStore } from "@reduxjs/toolkit";
import loadersReducer from "./loaderSlice";
import userReducer from "./userSlice";
import tooltipHeightSlice from "./tooltipHeightSlice";

const store = configureStore({
  reducer: {
    loader: loadersReducer,
    user: userReducer,
    tooltipHeight: tooltipHeightSlice,
  },
});

export default store;

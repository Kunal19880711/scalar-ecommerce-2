import { configureStore } from "@reduxjs/toolkit";
import loadersReducer from "./loaderSlice";
import userReducer from "./userSlice";
import tooltipHeightSlice from "./tooltipHeightSlice";
import toasterSlice from "./toasterSlice";

const store = configureStore({
  reducer: {
    loader: loadersReducer,
    user: userReducer,
    tooltipHeight: tooltipHeightSlice,
    toaster: toasterSlice,
  },
});

export default store;

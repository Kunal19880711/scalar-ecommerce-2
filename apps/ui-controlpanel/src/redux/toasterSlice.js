import { createSlice } from "@reduxjs/toolkit";

const toasterSlice = createSlice({
  name: "toaster",
  initialState: {
    msg: "",
    severity: null,
    time: 0,
  },
  reducers: {
    setToaster: (state, action) => {
      state.msg = action.payload.msg;
      state.severity = action.payload.severity;
      state.time = new Date().getTime();
    },
  },
});

export const { setToaster } = toasterSlice.actions;
export default toasterSlice.reducer;

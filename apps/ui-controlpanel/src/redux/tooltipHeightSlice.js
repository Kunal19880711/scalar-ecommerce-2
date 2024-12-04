import { createSlice } from "@reduxjs/toolkit";

const tooltipHeightSlice = createSlice({
  name: "tooltipHeight",
  initialState: {
    tooltipHeight: 0,
  },
  reducers: {
    setTooltipHeight: (state, action) => {
      state.tooltipHeight = action.payload;
    },
  },
});

export const { setTooltipHeight } = tooltipHeightSlice.actions;
export default tooltipHeightSlice.reducer;

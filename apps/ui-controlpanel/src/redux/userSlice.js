import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { viewCurrentUser } from "../api/user";
import { hideLoading, showLoading } from "./loaderSlice";

export const checkUserSession = createAsyncThunk(
  "user/checkUserSession",
  async (_, { dispatch }) => {
    try {
      dispatch(showLoading());
      const response = await viewCurrentUser();
      dispatch(setUser(response?.data));
      dispatch(hideLoading());
    } catch (err) {
      dispatch(logout());
    } finally {
      dispatch(hideLoading());
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    initializing: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setInitializing: (state, action) => {
      state.initializing = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setInitializing, logout } = userSlice.actions;
export default userSlice.reducer;

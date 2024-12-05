import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateCurrentUser, viewCurrentUser } from "../api/user";
import { hideLoading, showLoading } from "./loaderSlice";

export const checkUserSession = createAsyncThunk(
  "user/checkUserSession",
  async (_, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await viewCurrentUser();
      dispatch(setUser(response?.data));
    } catch (error) {
      dispatch(logout());
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async (data, { dispatch }) => {
    dispatch(showLoading());
    try {
      const response = await updateCurrentUser(data);
      dispatch(setUser(response?.data));
      return true;
    } catch (error) {
      dispatch(setUpdateUserError(error.response.data.message));
      return false;
    } finally {
      dispatch(hideLoading());
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    updateUserError: null,
    initializing: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.updateUserError = null;
    },
    setUpdateUserError: (state, action) => {
      state.updateUserError = action.payload;
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

export const { setUser, setUpdateUserError, setInitializing, logout } =
  userSlice.actions;
export default userSlice.reducer;

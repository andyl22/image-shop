import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import Cookie from "js-cookie";

const checkForUser = () => {
  const user = Cookie.get("user");
  if (user) {
    const parsedUser = JSON.parse(user);
    return {
      username: parsedUser.username,
      id: parsedUser.id,
    };
  }
  return { username: null, id: null };
};

const initialState = { user: checkForUser() };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user.username = null;
      state.user.id = null;
    },
    login: (state) => {
      const user = checkForUser();
      state.user.username = user.username;
      state.user.id = user.id;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

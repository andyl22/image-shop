import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import Cookie from "js-cookie";
import { postHTTP } from "../../utilities/fetchAPIs";

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
      Cookie.remove("user");
      postHTTP("/user/logout");
      return { ...state, user: { username: null, id: null } };
    },
    login: (state) => {
      const user = checkForUser();
      return { ...state, user: { username: user.username, id: user.id } };
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;

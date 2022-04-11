import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import { debounce } from "lodash";
import { saveState } from "../utilities/localStorage";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer
  }
});

const debouncedSaveCart = debounce(saveState, 1000);

store.subscribe(() => {
  debouncedSaveCart(store.getState().cart);
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;

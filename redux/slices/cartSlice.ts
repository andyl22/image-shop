import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Item {
  id: number;
  quantity: number;
  name: String;
}

interface CartState {
  cart: {
    items: Item[];
    total: number;
  };
}

const initialState: CartState = { cart: { items: [], total: 0 } };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state) => {
      state.cart.items = [
        ...state.cart.items,
        { id: 1, quantity: 2, name: "test" },
      ];
    },
  },
});

export const { add } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;

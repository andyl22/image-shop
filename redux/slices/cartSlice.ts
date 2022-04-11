import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Item {
  id: number;
  name: String;
  quantity: number;
  price: number;
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
    add: (state, payload) => {
      state.cart.items = [...state.cart.items, payload.payload];
    },
  },
});

export const { add } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;

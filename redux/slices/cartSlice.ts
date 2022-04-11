import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Item {
  name: String;
  quantity: number;
  price: number;
}

interface CartState {
  cart: {
    items: { [key: string]: Item };
    total: number;
  };
}

const initialState: CartState = { cart: { items: {}, total: 0 } };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, payload) => {
      const { id, name, quantity, price } = payload.payload;
      if (id in state.cart.items) {
        const itemsList = state.cart.items;
        itemsList[id].quantity += quantity;
      } else {
        state.cart.items = {
          ...state.cart.items,
          [id]: { name: name, quantity: quantity, price: price },
        };
      }
      state.cart.total += quantity * price;
    },
  },
});

export const { add } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../../utilities/localStorage";
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

const lStorageCart = loadState();

const initialState: CartState = lStorageCart ? lStorageCart : { cart: { items: {}, total: 0 } };

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
        state.cart.items[id] = {name: name, quantity: quantity, price: price};
      }
      state.cart.total += quantity * price;
    },
    decrease: (state, payload) => {
      const { id, quantity, price } = payload.payload;
      state.cart.items[id].quantity -= quantity;
      state.cart.total -= quantity * price;
    },
    remove: (state, payload) => {
      const { id } = payload.payload;
      state.cart.total -=
        state.cart.items[id].price * state.cart.items[id].quantity;
      delete state.cart.items[id];
    },
    set: (state, payload) => {
      let prevQuantity = 0;
      const { id, name, quantity, price } = payload.payload;
      if(state.cart.items[id]) prevQuantity = state.cart.items[id].quantity;
      state.cart.items[id] = {name: name, quantity: quantity, price: price};
      state.cart.total += (quantity - prevQuantity) * price;
    }
  }
});

export const { add, decrease, remove, set } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;

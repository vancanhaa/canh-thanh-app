import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAddNewCart,
  fetchCart,
  fetchChangeCart,
} from "../actions/cart.action";

const cartInitialState = {
  cart: {
    id: "",
    products: [
      {
        id: "",
        name: "",
        imageUrl: "",
        color: "",
        size: "",
        quantity: 0,
        price: 0,
      },
    ],
  },
  fetchingCart: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    getDataCart: (state, action) => {},
  },
  extraReducers: (builder) => {
    //fetchCart
    builder.addCase(fetchCart.pending, (state, action) => {
      state.fetchingCart = true;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.fetchingCart = false;
      state.cart = action.payload;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.fetchingCart = false;
      state.cart = {
        id: "",
        products: [
          {
            id: "",
            name: "",
            imageUrl: "",
            color: "",
            size: "",
            quantity: 0,
            price: 0,
          },
        ],
      };
    });

    //fetchChangeCart
    builder.addCase(fetchChangeCart.pending, (state, action) => {
      state.fetchingCart = true;
    });
    builder.addCase(fetchChangeCart.fulfilled, (state, action) => {
      state.fetchingCart = false;
      state.cart = action.payload;
    });
    builder.addCase(fetchChangeCart, (state, action) => {
      state.fetchingCart = false;
    });

    //fetchAddNewCart
    builder.addCase(fetchAddNewCart.pending, (state, action) => {
      state.fetchingCart = true;
    });
    builder.addCase(fetchAddNewCart.fulfilled, (state, action) => {
      state.fetchingCart = false;
      state.cart = action.payload;
    });
    builder.addCase(fetchAddNewCart.rejected, (state, action) => {
      state.fetchingCart = false;
    });
  },
});

export const cartReducer = cartSlice.reducer;

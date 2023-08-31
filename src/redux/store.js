import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./slices/cartSlice";
import wishSlice from "./slices/wishSlice"

const store = configureStore({
    reducer:{
        cart: cartSlice,
        wish:wishSlice,
    },
});

export default store;
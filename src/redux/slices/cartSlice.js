import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const loadCartItemsFromLocalStorage = () => {
  const cartItems = localStorage.getItem('cartItems');
  if (cartItems) {
    const parsedItems = JSON.parse(cartItems);
    if (Array.isArray(parsedItems)) {
      return parsedItems;
    }
  }
  return [];
};

const saveCartItemsToLocalStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

const calculateTotalQuantity = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

const calculateTotalAmount = (cartItems) => {
  return cartItems.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    ...initialState,
    cartItems: loadCartItemsFromLocalStorage(),
    totalQuantity: calculateTotalQuantity(loadCartItemsFromLocalStorage()),
    totalAmount: calculateTotalAmount(loadCartItemsFromLocalStorage()),
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);

      state.totalQuantity++;

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price);
      }

      state.totalAmount = calculateTotalAmount(state.cartItems);

      saveCartItemsToLocalStorage(state.cartItems);
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = calculateTotalQuantity(state.cartItems);
      }

      state.totalAmount = calculateTotalAmount(state.cartItems);

      saveCartItemsToLocalStorage(state.cartItems);
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

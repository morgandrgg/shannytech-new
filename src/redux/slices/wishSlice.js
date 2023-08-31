import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const loadwishItemsFromLocalStorage = () => {
  const wishItems = localStorage.getItem('wishItems');
  if (wishItems) {
    const parsedItems = JSON.parse(wishItems);
    if (Array.isArray(parsedItems)) {
      return parsedItems;
    }
  }
  return [];
};

const savewishItemsToLocalStorage = (wishItems) => {
  localStorage.setItem('wishItems', JSON.stringify(wishItems));
};

const calculateTotalQuantity = (wishItems) => {
  return wishItems.reduce((total, item) => total + item.quantity, 0);
};

const calculateTotalAmount = (wishItems) => {
  return wishItems.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );
};

const wishSlice = createSlice({
  name: 'wish',
  initialState: {
    ...initialState,
    wishItems: loadwishItemsFromLocalStorage(),
    totalQuantity: calculateTotalQuantity(loadwishItemsFromLocalStorage()),
    totalAmount: calculateTotalAmount(loadwishItemsFromLocalStorage()),
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.wishItems.find((item) => item.id === newItem.id);

      state.totalQuantity++;

      if (!existingItem) {
        state.wishItems.push({
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

      state.totalAmount = calculateTotalAmount(state.wishItems);

      savewishItemsToLocalStorage(state.wishItems);
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.wishItems.find((item) => item.id === id);

      if (existingItem) {
        state.wishItems = state.wishItems.filter((item) => item.id !== id);
        state.totalQuantity = calculateTotalQuantity(state.wishItems);
      }

      state.totalAmount = calculateTotalAmount(state.wishItems);

      savewishItemsToLocalStorage(state.wishItems);
    },
  },
});

export const wishActions = wishSlice.actions;

export default wishSlice.reducer;

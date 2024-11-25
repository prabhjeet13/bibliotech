import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array to store cart items
  totalItems: 0, // Total number of items in the cart
  totalPrice: 0, // Total price of all items in the cart
  error: null, // Store error message if any
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { book, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.ISBN === book.ISBN);
      
      // Check if the quantity to add is more than available stock
      if (quantity > book.quantity) {
        state.error = `Cannot add more than ${book.quantity} items to the cart.`;
        return; // Exit early, no changes to the state
      }

      if (existingItem) {
        // If the item already exists, update its quantity
        if (existingItem.quantity + quantity <= book.quantity) {
          existingItem.quantity += quantity;
        } else {
          state.error = `Cannot add more than ${book.quantity} items to the cart.`;
          return;
        }
      } else {
        // Add a new item to the cart
        if (quantity <= book.quantity) {
          state.items.push({ ...book, quantity });
        } else {
          state.error = `Cannot add more than ${book.quantity} items to the cart.`;
          return;
        }
      }

      state.totalItems += quantity;
      state.totalPrice += book.price * quantity;
      state.error = null; // Reset error if operation is successful
    },
    removeItem: (state, action) => {
      const { ISBN } = action.payload;
      const existingItem = state.items.find((item) => item.ISBN === ISBN);

      if (existingItem) {
        state.totalItems -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;

        // Remove the item from the cart
        state.items = state.items.filter((item) => item.ISBN !== ISBN);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

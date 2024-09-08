import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  cart: [],
  total: 0,
  amount: 0,
  loading: false,
  error: null,
  singleItem: [],
  filtered: [],
};
// something coming

export const Allitems = createAsyncThunk(
  'Allitems',
  async (_, { rejectWithValue }) => {
    try {
      const allitems = await axios.get('https://dummyjson.com/products');
      return allitems.data;
    } catch (error) {
      return rejectWithValue(error) || 'Invalid Api response';
    }
  }
);

export const SingleItem = createAsyncThunk(
  'singleItem',
  async (id, { rejectWithValue }) => {
    try {
      const singleItem = await axios.get(
        `https://dummyjson.com/products/${id}`
      );
      return singleItem.data;
    } catch (error) {
      return rejectWithValue(error) || 'Invalid Api response';
    }
  }
);
export const SearchItems = createAsyncThunk(
  'searchTerm',
  async (search, { rejectWithValue }) => {
    try {
      const singleItem = await axios.get(
        `https://dummyjson.com/products/search?q=${search}`
      );

      return singleItem.data;
    } catch (error) {
      return rejectWithValue(error) || 'Invalid Api response';
    }
  }
);

const calculateTotal = (cart) => {
  return cart.reduce(
    (acc, item) => {
      acc.total += item.price * item.quantity;
      acc.amount += item.quantity;
      return acc;
    },
    { total: 0, amount: 0 }
  );
};

const AllItemSlice = createSlice({
  name: 'AllSlice',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      const { total, amount } = calculateTotal(state.cart);
      state.total = total;
      state.amount = amount;
    },
    increment: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity += 1;
        const { total, amount } = calculateTotal(state.cart);
        state.total = total;
        state.amount = amount;
      }
    },
    decrement: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cart = state.cart.filter((i) => i.id !== item.id);
        }
        const { total, amount } = calculateTotal(state.cart);
        state.total = total;
        state.amount = amount;
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      const { total, amount } = calculateTotal(state.cart);
      state.total = total;
      state.amount = amount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Allitems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Allitems.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(Allitems.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(SingleItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SingleItem.fulfilled, (state, action) => {
        state.loading = false;
        state.singleItem = action.payload;
      })
      .addCase(SingleItem.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(SearchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SearchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.filtered = action.payload;
      })
      .addCase(SearchItems.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { actions, reducer } = AllItemSlice;
export const { addToCart, increment, decrement, removeFromCart } =
  AllItemSlice.actions;
export default reducer;

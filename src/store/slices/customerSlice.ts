import { createSlice } from '@reduxjs/toolkit';
import { Customers } from '@/types/customerTypes';

interface CustomerState {
  selectedCustomer: Customers | null;
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  selectedCustomer: null,
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
    setCustomerLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCustomerError: (state, action) => {
      state.error = action.payload;
    },
    clearSelectedCustomer: state => {
      state.selectedCustomer = null;
    },
  },
});

export const { setSelectedCustomer, setCustomerLoading, setCustomerError, clearSelectedCustomer } = customerSlice.actions;

export default customerSlice.reducer;

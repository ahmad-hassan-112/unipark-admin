import { createSlice } from '@reduxjs/toolkit';
import { Campus } from '@/types/campusTypes';

interface CampusState {
  selectedCampus: Campus | null;
  loading: boolean;
  error: string | null;
}

const initialState: CampusState = {
  selectedCampus: null,
  loading: false,
  error: null,
};

const campusSlice = createSlice({
  name: 'campus',
  initialState,
  reducers: {
    setSelectedCampus: (state, action) => {
      state.selectedCampus = action.payload;
    },
    setCampusLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCampusError: (state, action) => {
      state.error = action.payload;
    },
    clearSelectedCampus: state => {
      state.selectedCampus = null;
    },
  },
});

export const { setSelectedCampus, setCampusLoading, setCampusError, clearSelectedCampus } = campusSlice.actions;

export default campusSlice.reducer;

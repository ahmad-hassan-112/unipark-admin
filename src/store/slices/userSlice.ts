import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  data: {
    data: {
      fullName: string;
      first_name: string;
      last_name: string;
      email: string;
      profile_image: string;
    };
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: state => {
      state.data = null;
    },
  },
});

export const { setUser, setLoading, setError, logout } = userSlice.actions;

export default userSlice.reducer;

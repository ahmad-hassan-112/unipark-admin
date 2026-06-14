import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import customerReducer from './slices/customerSlice';
import campusReducer from './slices/campusSlice';

const rootReducer = combineReducers({
  user: userReducer,
  customer: customerReducer,
  campus: campusReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

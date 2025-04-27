import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import vendorReducer from './vendor/vendorSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  vendor: vendorReducer,
});

// Configure Redux Persist
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['user'], // Only persist user state by default
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create the persistor
export const persistor = persistStore(store);
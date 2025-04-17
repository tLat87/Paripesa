import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { persistConfig } from './persistConfig';
import { combineReducers } from 'redux';
import userReducer from './slices/userSlice';
import moodReducer from './slices/moodSlice';
import completedTasksReducer from './slices/plannerSlice';
import savedQuotesReducer from './slices/quoteSlice';

const rootReducer = combineReducers({
  user: userReducer,
  mood: moodReducer,
  completedTasks: completedTasksReducer,
  savedQuotes:savedQuotesReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

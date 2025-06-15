import { configureStore } from '@reduxjs/toolkit';
import resumeFormReducer from './slices/resumeFormSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    resumeForm: resumeFormReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['resumeForm/setResumeData', 'resumeForm/loadSavedResume'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.date', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['resumeForm.date', 'resumeForm.timestamp'],
      },
      immutableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
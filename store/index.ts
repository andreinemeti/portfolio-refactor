import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';

export const makeStore = () => configureStore({
  reducer: { projects: projectsReducer }
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

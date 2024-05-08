import { configureStore } from '@reduxjs/toolkit';

import { Slice as LayoutSlice } from './store/layoutSlice';


export const makeStore = () => configureStore({
  reducer: {
    layout: LayoutSlice.reducer,
  },
});

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

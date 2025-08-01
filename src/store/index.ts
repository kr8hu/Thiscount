//Redux
import { configureStore } from '@reduxjs/toolkit';

//Reducer
import couponReducer from './reducers/couponReducer';


/**
 * configureStore
 * 
 */
export const store = configureStore({
  reducer: {
    coupons: couponReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

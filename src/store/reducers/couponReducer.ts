//Redux
import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';

//Store - types
import ICoupon from '../../interfaces/Coupon';
import ICouponState from '../../interfaces/CouponState';

//Store - actions
import {
    loadCoupons,
    loadCoupon,
    addCoupon,
    removeCoupon,
    clearCoupons
} from '../actions/couponActions';


/**
 * initialState
 * 
 */
const initialState: ICouponState = {
    coupons: [],
    loading: false,
    error: null,
};


/**
 * couponSlice
 * 
 */
const couponSlice = createSlice({
    name: 'coupons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //add
            .addCase(addCoupon.fulfilled, (state: any, action: PayloadAction<ICoupon>) => {
                state.coupons.push(action.payload);
            })
            //load all
            .addCase(loadCoupons.pending, (state: any) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadCoupons.fulfilled, (state: any, action: PayloadAction<ICoupon[]>) => {
                state.loading = false;
                state.coupons = action.payload;
            })
            .addCase(loadCoupons.rejected, (state: any, action: any) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to load coupons';
            })
            //load 
            .addCase(loadCoupon.fulfilled, (state: any, action: PayloadAction<ICoupon>) => {
                state.loading = false;

                const existingIndex = state.coupons.findIndex((c: ICoupon) => c.id === action.payload.id);

                if (existingIndex !== -1) {
                    state.coupons[existingIndex] = action.payload;
                } else {
                    state.coupons.push(action.payload);
                }
            })
            .addCase(loadCoupon.rejected, (state: any, action: any) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to load coupon';
            })
            //remove
            .addCase(removeCoupon.fulfilled, (state: any, action: PayloadAction<string>) => {
                state.coupons = state.coupons.filter((c: ICoupon) => c.id !== action.payload);
            })
            //clear
            .addCase(clearCoupons.fulfilled, (state: any) => {
                state.coupons = state.coupons = [];
            });
    },
});

export default couponSlice.reducer;
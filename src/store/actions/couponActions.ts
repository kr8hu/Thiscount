//Redux
import {
    createAsyncThunk
} from '@reduxjs/toolkit';

//Store - types
import ICoupon from '../../interfaces/Coupon';

//Services
import CouponService from '../../services/CouponService';


//Actions
export const SET_COUPONS = 'SET_COUPONS';
export const ADD_COUPON = 'ADD_COUPON';
export const FIND_COUPON = 'FIND_COUPON';
export const FIND_COUPONS = 'FIND_COUPONS';
export const REMOVE_COUPON = 'REMOVE_COUPON';
export const CLEAR_COUPONS = 'CLEAR_COUPONS';
export const SET_LOADING = 'SET_LOADING';


/**
 * addCoupon
 * 
 * @param coupon 
 * @returns 
 */
export const addCoupon = createAsyncThunk(ADD_COUPON, async (coupon: ICoupon) => {
    await CouponService.create(coupon);
    return coupon;
}
);

/**
 * loadCoupons
 * 
 * @returns 
 */
export const loadCoupons = createAsyncThunk(FIND_COUPONS, async () => {
    const coupons = await CouponService.findAll();
    return coupons;
});

/**
 * loadCoupon
 * 
 * @returns 
 */
export const loadCoupon = createAsyncThunk(FIND_COUPON, async (id: string) => {
    const coupon = await CouponService.find(id);
    return coupon;
});

/**
 * removeCoupon
 * 
 * @param id 
 * @returns 
 */
export const removeCoupon = createAsyncThunk(REMOVE_COUPON, async (id: string) => {
    await CouponService.delete(id);
    return id;
}
);

/**
 * clearCoupons
 * 
 * @param id 
 * @returns 
 */
export const clearCoupons = createAsyncThunk(CLEAR_COUPONS, async () => {
    await CouponService.clear();
}
);
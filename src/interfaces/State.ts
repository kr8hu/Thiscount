//Interfaces
import ICoupon from "./Coupon";


export default interface IState {
    coupons: ICoupon[];
    sortProperty: string;
    expiredVisibility: boolean;
} 

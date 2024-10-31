//Interfaces
import IState from '../../interfaces/State';
import ICoupon from '../../interfaces/Coupon';
import IReducerAction from '../../interfaces/ReducerAction';

//Shared
import {
    appName,
    actionTypes,
} from '../../shared/const';


/**
 * reducer
 * 
 * A state objektum frissítése a műveletnek megfelelően.
 * 
 * @param state 
 * @param action 
 * @returns 
 */
export const reducer = (state: IState, action: IReducerAction) => {
    switch (action.type) {
        case actionTypes.app.ADD_COUPON:
            return {
                ...state,
                coupons: state.coupons.concat(action.payload)
            }
        case actionTypes.app.DELETE_COUPON:
            return {
                ...state,
                coupons: state.coupons.filter((coupon: ICoupon) => coupon.id !== action.payload)
            }
        case actionTypes.app.SET_COUPONS:
            return {
                ...state,
                coupons: action.payload
            }
        case actionTypes.app.SET_SORT_PROPERTY:
            return {
                ...state,
                sortProperty: action.payload
            }
        case actionTypes.app.SET_EXPIRED_VISIBILITY:
            return {
                ...state,
                expiredVisibility: action.payload
            }
        default:
            return state
    }
}

export const initialState: IState = {
    coupons: [],
    sortProperty: localStorage.getItem(`${appName}__sortProperty`) ?? "id",
    expiredVisibility: localStorage.getItem(`${appName}__expiredVisibility`)?.toLowerCase() === "true" ? true : false,
}
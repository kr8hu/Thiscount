/**
 * App version
 * 
 */
export const appName = "thiscount";
export const appVersion = "1.1.1";
export const versionCode = 3;


/**
 * notificationTitle
 * 
 */
export const notificationTitle = appName.charAt(0).toUpperCase() + appName.slice(1);


/**
 * App settings
 * 
 */
export const appSettings = {
    onPressDuration: 1000,
    onPressVibrationDuration: 500,
}


/**
 * Action Types
 * 
 */
export const actionTypes = {
    app: {
        ADD_COUPON: 'APP_ADD_COUPON',
        SET_COUPONS: 'APP_SET_COUPONS',
        DELETE_COUPON: 'APP_DELETE_COUPON',
        SET_SORT_PROPERTY: 'APP_SET_SET_SORT_PROPERTY',
        SET_EXPIRED_VISIBILITY: 'APP_SET_EXPIRED_VISIBILITY'
    }
}


/**
 * Animation Types
 * 
 */
export const animationTypes = {
    LIFT: "lift",
    SLIDE: "slide",
    FADE: "fade"
}

//React
import { useContext } from 'react';

//Context
import { AppContext } from '../../context/App';

//Onsen UI
import { Page } from 'react-onsenui';

//Layouts
import EditorLayout from '../../layouts/EditorLayout';

//Interfaces
import ICoupon from '../../interfaces/Coupon';

//Services
import CouponService from '../../services/CouponService';

//Shared
import { actionTypes } from '../../shared/const';
import { generateRandomString } from '../../shared/utils';

//Styles
//import styles from './Create.module.css';


/**
 * Props
 * 
 */
interface Props {
    navigator: any;
}


/**
 * Create
 * 
 * Létrehozás oldal
 */
function Create({ navigator }: Props) {
    /**
     * Context
     * 
     */
    const { appState, setAppState } = useContext(AppContext);


    /**
     * addCoupon
     * 
     */
    const addCoupon = (data: ICoupon) => {
        const couponsLength = appState.coupons.length;
        const date = data.expiry + "T00:00:00";
        const formattedDate = date.replace(/-/g, '/').replace('T', ' ');
        const id = (couponsLength+1) +  generateRandomString();

        const coupon: ICoupon = {
            id,
            name: data.name,
            code: data.code,
            expiry: new Date(formattedDate).toISOString()
        }

        CouponService.create(coupon);
        setAppState(actionTypes.app.ADD_COUPON, coupon);

        navigator.popPage();
    }


    return (
        <Page>
            <EditorLayout
                title="Kupon felvétele"
                onSubmit={addCoupon} />
        </Page>
    )
}

export default Create;
//React
import { useContext } from 'react';

//Redux
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';

//Redux - actions
import { addCoupon } from '../../store/actions/couponActions';

//Context
import { AppContext } from '../../context/App';

//Onsen UI
import { Page } from 'react-onsenui';

//Layouts
import EditorLayout from '../../layouts/EditorLayout';

//Interfaces
import ICoupon from '../../interfaces/Coupon';

//Shared
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
     * dispatch
     * 
     */
    const dispatch = useDispatch<AppDispatch>();
    /**
     * Context
     * 
     */
    const { appState } = useContext(AppContext);


    /**
     * createCoupon
     * 
     */
    const createCoupon = (data: ICoupon) => {
        const couponsLength = appState.coupons.length;
        const date = data.expiry + "T00:00:00";
        const formattedDate = date.replace(/-/g, '/').replace('T', ' ');
        const id = (couponsLength + 1) + generateRandomString();

        const coupon: ICoupon = {
            id,
            name: data.name,
            code: data.code,
            expiry: new Date(formattedDate).toISOString()
        }

        dispatch(addCoupon(coupon));

        navigator.popPage();
    }


    return (
        <Page>
            <EditorLayout
                title="Kupon felvétele"
                onSubmit={createCoupon} />
        </Page>
    )
}

export default Create;
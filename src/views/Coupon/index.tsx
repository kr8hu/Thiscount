//Onsen UI
import { Page } from 'react-onsenui';

//Layouts
import CouponLayout from '../../layouts/CouponLayout';

//Styles
//import styles from './Coupon.module.css';


/**
 * Props
 */
interface Props {
    navigator: any;
    id: string;
}

/**
 * Coupon
 * 
 * Kupon nézet
 */
function Coupon({ navigator, id }: Props) {
    return (
        <Page>
            <CouponLayout id={id} />
        </Page>
    )
}

export default Coupon;
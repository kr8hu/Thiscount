//React
import { useContext } from 'react';

//Context
import { AppContext } from '../../context/App';

//Onsen UI
import ons from 'onsenui';
import { Page } from 'react-onsenui';

//Views
import Create from '../Create';
import Settings from '../Settings';

//Components
import Coupon from '../Coupon';
import Coupons from '../../components/Coupons';

//Layouts
import HeaderLayout from '../../layouts/HeaderLayout';

//Interfaces
import IHeaderButton from '../../interfaces/HeaderButton';
import ICoupon from '../../interfaces/Coupon';

//Services
import CouponService from '../../services/CouponService';

//Shared
import {
    actionTypes,
    notificationTitle
} from '../../shared/const';

import { calculateTimeLeft } from '../../shared/utils';

//Styles
//import styles from './Home.module.css';


/**
 * Props
 * 
 */
interface Props {
    navigator: any;
}


/**
 * Home
 * 
 * Kezdőoldal
 */
function Home({ navigator }: Props) {
    /**
     * Variables
     * 
     */
    const headerButtons: IHeaderButton[] = [
        {
            icon: "fa-plus",
            onClick: () => openEditor()
        },
        {
            icon: "fa-gear",
            onClick: () => openSettings()
        }
    ];


    /**
     * Context
     * 
     */
    const { appState, setAppState } = useContext(AppContext);


    /**
     * openEditor
     * 
     */
    const openEditor = () => {
        navigator.pushPage({
            component: Create
        });
    }


    /**
     * openSettings
     * 
     */
    const openSettings = () => {
        navigator.pushPage({
            component: Settings
        });
    }


    /**
     * viewSelectedCoupon
     * 
     * @param id 
     */
    const viewSelectedCoupon = (id: string) => {
        navigator.pushPage({
            component: Coupon,
            props: { id }
        })
    }


    /**
     * filterCoupons
     * 
     * @param coupon 
     */
    const filterCoupons = (coupon: ICoupon) => {
        if (appState.expiredVisibility) return true;

        const couponExpiryDate = new Date(coupon.expiry);
        const couponTimeLeft = calculateTimeLeft(couponExpiryDate).timeLeft;

        if (couponTimeLeft < 0)
            return false;
        else
            return true;
    }


    /**
     * removeSelectedCoupon
     * 
     */
    const removeSelectedCoupon = async (id: string) => {
        const coupon = await CouponService.find(id);

        if (coupon) {
            ons.notification.confirm({
                title: notificationTitle,
                message: `Biztosan törölni szeretnéd a '${coupon.name}' kupont?`,
                buttonLabels: ["Mégse", "Törlés"]
            })
                .then((result: any) => {
                    if (result === 0) return;

                    CouponService.delete(id);
                    setAppState(actionTypes.app.DELETE_COUPON, id);
                })
                .catch((error: any) => {
                    ons.notification.alert(`${error}`);
                })
        }
    }


    return (
        <Page>
            <HeaderLayout
                title="home_title"
                buttons={headerButtons}>
                <Coupons
                    src={appState.coupons}
                    filter={filterCoupons}
                    onSelect={viewSelectedCoupon}
                    onPress={removeSelectedCoupon} />
            </HeaderLayout>
        </Page>
    )
}

export default Home;
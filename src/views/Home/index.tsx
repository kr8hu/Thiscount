//React
import { useContext } from 'react';

//Redux
import { useDispatch, useSelector } from 'react-redux';

//Store
import { AppDispatch, RootState } from '../../store';
import { loadCoupon, removeCoupon } from '../../store/actions/couponActions';

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

//Shared
import {
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
     * dispatch
     * 
     */
    const dispatch = useDispatch<AppDispatch>();


    /**
     * coupons
     * 
     */
    const { coupons, loading, error } = useSelector((state: RootState) => state.coupons);


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
    const { appState } = useContext(AppContext);


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
        try {
            const coupon = await dispatch(loadCoupon(id)).unwrap();

            const confirmed: any = await ons.notification.confirm({
                title: notificationTitle,
                message: `Biztosan törölni szeretnéd a '${coupon.name}' kupont?`,
                buttonLabels: ["Mégse", "Törlés"]
            });

            if (confirmed === 0) return;

            dispatch(removeCoupon(id));
        } catch (error: any) {
            ons.notification.alert(`${error}`);
        }
    }


    /**
     * renderCoupons
     * 
     * @returns 
     */
    const renderCoupons = () => {
        if (loading) return <p>Betöltés...</p>;
        if (error) return <p>Hiba: {error}</p>;

        return (
            <Coupons
                src={coupons}
                filter={filterCoupons}
                onSelect={viewSelectedCoupon}
                onPress={removeSelectedCoupon} />
        )
    }

    return (
        <Page>
            <HeaderLayout
                title="home_title"
                buttons={headerButtons}>
                {renderCoupons()}
            </HeaderLayout>
        </Page>
    )
}

export default Home;
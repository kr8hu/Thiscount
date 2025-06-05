//React
import {
    useState,
    useEffect
} from 'react';

//Redux
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { loadCoupon } from '../../store/actions/couponActions';

//Capacitor
import { Clipboard } from '@capacitor/clipboard';

//Onsen UI
import ons from 'onsenui';

//Components
import Text from '../../components/Text';
import Countdown from '../../components/Countdown';
import BackButton from '../../components/BackButton';
import Background from '../../components/Background';

//Interfaces
import ICoupon from "../../interfaces/Coupon";

//Styles
import styles from './CouponLayout.module.css';


/**
 * Props
 */
interface Props {
    id: string;
}


/**
 * CouponLayout
 * 
 * Kupon nézet
 */
function CouponLayout({ id }: Props) {
    /**
     * dispatch
     * 
     */
    const dispatch = useDispatch<AppDispatch>();


    /**
     * Variables
     * 
     */
    const initialCoupon: ICoupon = {
        id: '',
        name: "",
        code: "",
        expiry: "",
    }


    /**
     * States
     * 
     */
    const [coupon, setCoupon] = useState<ICoupon>(initialCoupon);


    /**
     * findCouponById
     * 
     */
    const findCouponById = async (id: string) => {
        const result = await dispatch(loadCoupon(id)).unwrap();

        if (result) {
            setCoupon(result);
        }
    }


    /**
     * copyToClipboard
     * 
     */
    const copyToClipboard = async (e: any) => {
        //Toast beállításai
        const toastSettings = {
            timeout: 3000
        };

        //Kód
        const string = e.target.textContent;

        //Másolás vágólapra
        Clipboard.write({ string }).then(() => {
            ons.notification.toast("Másolva a vágólapra", toastSettings);
        }).catch(() => {
            ons.notification.toast("Hiba a vágólapra másolás közben", toastSettings);
        });
    }


    /**
     * Effects
     * 
     */
    useEffect(() => {
        findCouponById(id);
        //eslint-disable-next-line
    }, [id]);


    return (
        <div className={styles.container}>
            {/* Vissza gomb */}
            <BackButton />

            {/* Háttér */}
            <Background />

            {/* Tartalom */}
            <div className={styles.row}>
                <div className={styles.col}>
                    <Text
                        className={styles.title}
                        node="coupon_layout_countdown" />

                    <Countdown
                        className={styles.countdown}
                        expiry={coupon.expiry} />
                </div>

                <div className={styles.col}>
                    <div className={styles.wrapper}>
                        <Text
                            className={styles.title}
                            node="coupon_layout_name" />

                        <Text className={styles.name}>
                            {coupon.name}
                        </Text>

                        <Text
                            className={styles.title}
                            node="coupon_layout_code" />

                        <div className={styles.codearea} onClick={copyToClipboard}>
                            <Text className={styles.code}>
                                {coupon.code}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CouponLayout;
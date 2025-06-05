//React
import { useEffect, useState } from 'react';

//Capacitor
import { Haptics } from '@capacitor/haptics';

//Components
import Text from '../Text';
import Countdown from '../Countdown';

//Shared
import { appSettings } from '../../shared/const';

//Styles
import styles from './Coupon.module.css';


let pressTimer: any;

/**
 * Props
 * 
 */
interface Props {
    id: string;
    name: string;
    code: string;
    expiry: string;
    onClick?: (id: string) => any;
    onPress?: (id: string) => any;
}


/**
 * Coupon
 * 
 * @param name 
 * @param code 
 * @param expiry 
 */
function Coupon({ id, name, code, expiry, onClick, onPress }: Props) {
    /**
     * Startes
     * 
     */
    const [isLongPressed, setIsLongPressed] = useState<boolean>(false);


    /**
     * startTouch
     * 
     */
    const startTouch = () => {
        pressTimer = setTimeout(() => {
            setIsLongPressed(true);
        }, appSettings.onPressDuration);
    };


    /**
     * endTouch
     * 
     */
    const endTouch = () => {
        clearTimeout(pressTimer);
        setIsLongPressed(false);
    };


    /**
     * Effects
     * 
     */
    useEffect(() => {
        if (id === undefined || onPress === undefined) return;

        if (isLongPressed === true) {
            Haptics.vibrate({ duration: appSettings.onPressVibrationDuration });
            onPress(id);
            setIsLongPressed(false);
        }
    }, [id, isLongPressed, onPress]);


    return (
        <div
            className={styles.container}
            onClick={() => onClick ? onClick(id) : null}
            onMouseDown={startTouch}
            onMouseUp={endTouch}
            onMouseLeave={endTouch}
            onTouchStart={startTouch}
            onTouchEnd={endTouch}>
            <div className={styles.row}>
                <div className={styles.col}>
                    <Text className={styles.name}>
                        {name}
                    </Text>
                </div>
                <div className={styles.col}>
                    <Countdown expiry={expiry} />
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.col}>
                    <Text className={styles.code}>
                        {code}
                    </Text>
                </div>
            </div>
        </div>
    )
}

export default Coupon;

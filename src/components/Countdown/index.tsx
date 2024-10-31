//React
import {
    useEffect,
    useState
} from 'react';

//Onsen UI
import { ProgressCircular } from 'react-onsenui';

//Components
import Text from '../Text';

//Interfaces
import ICountdown from '../../interfaces/Countdown';

//Shared
import { calculateTimeLeft } from '../../shared/utils';

//Styles
import styles from './Countdown.module.css';


/**
 * Props
 * 
 */
interface Props {
    className?: any;
    expiry: string;
}


/**
 * Countdown
 * 
 * @param expiry 
 * @returns 
 */
function Countdown({ className, expiry }: Props) {
    //Számláló alap értékei
    const initialValues: ICountdown = {
        timeLeft: -1,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };


    /**
     * States
     * 
     */
    const [time, setTime] = useState<ICountdown>(initialValues);


    /**
     * Effects
     * 
     */
    useEffect(() => {
        const expiryDate = new Date(expiry);

        const timer = setInterval(() => {
            const timeLeft = calculateTimeLeft(expiryDate);
            setTime(timeLeft);
        }, 1000);

        return () => clearInterval(timer);
        //eslint-disable-next-line
    }, [expiry]);


    /**
     * renderCountdown
     * 
     */
    const renderCountdown = () => {
        return (
            <>
                <Text className={styles.counter}>
                    {String(time.days).padStart(2, '0')}
                </Text>
                <Text className={styles.counter}>
                    {String(time.hours).padStart(2, '0')}
                </Text>
                <Text className={styles.counter}>
                    {String(time.minutes).padStart(2, '0')}
                </Text>
                <Text className={styles.counter}>
                    {String(time.seconds).padStart(2, '0')}
                </Text>
            </>
        )
    }


    /**
     * renderPlaceholder
     * 
     * @returns 
     */
    const renderPlaceholder = () => {
        if (time.timeLeft === -1) {
            return <ProgressCircular indeterminate />
        }

        return (
            <Text
                className={styles.counter}
                data-expired={time.timeLeft === -1 ? "true" : "false"}
                node="countdown_expired" />
        )
    }


    return (
        <div
            className={`${styles.container} ${className}`}
            data-expire={time.timeLeft < 0 ? "expired" : (time.days === 5 ? "in-time" : (time.days < 5 ? "soon" : "later"))}>
            {time.timeLeft > 0 ? renderCountdown() : renderPlaceholder()}
        </div>
    );
};

export default Countdown;

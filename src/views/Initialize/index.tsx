//React
import {
    useEffect,
    useState
} from 'react';

//Redux
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { loadCoupons } from '../../store/actions/couponActions';

//Onsen UI
import ons from 'onsenui';
import { Page } from 'react-onsenui';

//Views
import Home from '../Home';

//Components
import Text from '../../components/Text';
import Background from '../../components/Background';

//Services
import CouponService from '../../services/CouponService';

//Local
import {
    loadingProgress,
    loadingStates
} from './const';

//Shared
import {
    appName,
} from '../../shared/const';
import xml from '../../shared/strings.xml';

//Axios
import axios from 'axios';

//Styles
import styles from './Initialize.module.css';


/**
 * Interfaces
 */
interface Props {
    navigator: any;
}


/**
 * Initialize
 * 
 * @returns 
 */
function Initialize({ navigator }: Props) {
    /**
     * dispatch
     * 
     */
    const dispatch = useDispatch<AppDispatch>();

    /**
     * delayTime
     * 
     */
    const delayTime: number = 750;


    /**
     * States
     * 
     */
    const [progressId, setProgressId] = useState<number>(loadingProgress.init);
    const [backgroundScale, setBackgroundScale] = useState<number>(1);
    const [backgroundRotate, setBackgroundRotate] = useState<number>(0);


    /**
     * backgroundStyles
     * 
     */
    const backgroundStyles = {
        transform: `rotate(${backgroundRotate}deg) scale(${backgroundScale})`
    }


    /**
     * loadStringsXml
     * 
     * Szövegeket tartalmazó XML fájl betöltése
     */
    const loadStringsXml = async () => {
        const config = {
            method: 'GET',
            url: xml,
            headers: {
                'Content-Type': 'application/xml; charset=utf-8'
            },
        }

        const response = await axios.request(config);

        if (response) {
            //Szöveges tartalmak tárolása a localStorageban
            localStorage.setItem(`${appName}_strings`, response.data);

            //Betöltési folyamat léptetése
            setTimeout(() => setProgressId(current => current + 1), delayTime);
        }
    }


    /**
     * initializeStores
     * 
     * Alaphelyzetbe állítja az adatokat tároló storeokat
     */
    const initializeStores = async () => {
        try {
            const couponStore = await CouponService.initialize();

            if (couponStore) {
                //Betöltési folyamat léptetése
                setTimeout(() => setProgressId(current => current + 1), delayTime);
            }
        } catch (e) {
            ons.notification.alert("hiba tötént");
            return;
        }
    }

    /**
     * initCoupons
     * 
     */
    const initCoupons = async () => {
        dispatch(loadCoupons());
        setTimeout(() => setProgressId(current => current + 1), delayTime);
    }


    /**
     * openApplication
     * 
     * Átirányítás a kezdőoldalra
     */
    const openApplication = () => {
        setTimeout(() => {
            navigator.resetPage({
                component: Home
            });
        }, 1500);
    }



    /**
     * useEffect
     * 
     * Betöltési folyamat vezérlése
     */
    useEffect(() => {
        //Betöltési fázisokban lefutó funkciók
        switch (progressId) {
            case loadingProgress.init:
                setBackgroundScale(loadingStates.length);
                setBackgroundRotate(90);
                setTimeout(() => setProgressId(current => current + 1), delayTime);
                return;

            case loadingProgress.texts:
                loadStringsXml();
                return;

            case loadingProgress.stores:
                initializeStores();
                return;

            case loadingProgress.coupons:
                initCoupons();
                return;

            default:
                setProgressId(loadingStates.length - 1);
                setTimeout(() => openApplication(), delayTime * 2);
                return;
        }
        //eslint-disable-next-line
    }, [progressId]);


    return (
        <Page>
            <div className={styles.container}>
                <Background
                    className={styles.background}
                    style={backgroundStyles} />

                <Text
                    className={styles.title}
                    node="appname" />
                <Text
                    className={styles.progress}>
                    {loadingStates[progressId].description}
                </Text>
            </div>
        </Page>
    )
}

export default Initialize;

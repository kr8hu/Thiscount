//React
import {
    useEffect,
    useState,
    useRef
} from 'react';

//Components
import Text from '../../components/Text';
import HeaderButtons from './HeaderButtons';
import BackButton from '../../components/BackButton';
import Background from '../../components/Background';

//Interfaces
import IHeaderButton from '../../interfaces/HeaderButton';

//Styles
import styles from './HeaderLayout.module.css';


/**
 * Props
 * 
 */
interface Props {
    title: string;
    backButton?: boolean;
    buttons?: IHeaderButton[];
    children: React.ReactNode | React.ReactNode[];
}


/**
 * HeaderLayout
 * 
 * Fejléces nézet
 */
function HeaderLayout({ children, title, backButton, buttons }: Props) {
    /**
     * Refs
     * 
     */
    const bodyRef = useRef<HTMLDivElement | null>(null);


    /**
     * States
     * 
     */
    const [extended, setExtended] = useState<boolean>(true);
    const [scrollHeight, setScrollHeight] = useState<number>(0);


    /**
     * scrollHeightListener
     * 
     * @param e 
     */
    const scrollHeightListener = (e: any) => {
        setScrollHeight(e.target.scrollTop);
    }


    /**
     * Effects
     * 
     */
    useEffect(() => {
        const elem = bodyRef.current;

        elem?.addEventListener('scroll', scrollHeightListener);

        return () => {
            elem?.removeEventListener('scroll', scrollHeightListener);
        }
    }, []);


    useEffect(() => {
        if ((scrollHeight > 200) && (extended === true)) {
            setExtended(false);
        }
        else if ((scrollHeight < 200) && (extended === false)) {
            setExtended(true);
        }
    }, [extended, scrollHeight]);


    return (
        <div className={styles.container} data-extended={extended}>
            {/* Vissza gomb */}
            {backButton && <BackButton />}

            {/* Háttér */}
            <Background className={styles.background} />

            {/* Taralom */}
            <div className={styles.row}>
                <div className={styles.col}>
                    <div className={styles.hrow}>
                        <div className={styles.hcol} data-fullwidth={buttons ? "false" : "true"}>
                            <Text
                                className={styles.title}
                                node={title} />
                        </div>
                        {
                            buttons &&
                            (
                                <div className={styles.hcol}>
                                    <HeaderButtons buttons={buttons} />
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={styles.col}>
                    <div ref={bodyRef} className={styles.body}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderLayout;
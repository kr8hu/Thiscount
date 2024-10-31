//React
import React, {
    useEffect,
    useState
} from 'react';

//Onsen UI
import * as Ons from 'react-onsenui';

//Styles
import styles from './Popup.module.css';



/**
 * Props
 * 
 */
interface Props {
    isOpen: boolean;
    children: React.ReactNode | React.ReactNode[];
    onCancel?: (status: boolean) => any;
}


/**
 * Popup
 * 
 * @param isOpen 
 * @param children 
 * @param onCancel 
 * @returns 
 */
function Popup({ isOpen, children, onCancel }: Props) {
    /**
     * States
     * 
     */
    const [state, setState] = useState<boolean>(isOpen);


    useEffect(() => {
        setState(isOpen);
    }, [isOpen]);


    /**
     * onDialogCancel
     * 
     */
    const onDialogCancel = () => {
        setState(false);

        if (onCancel) {
            onCancel(false);
        }
    }


    return (
        <Ons.Dialog
            isCancelable
            onCancel={onDialogCancel}
            isOpen={state}
            style={{ height: "100%" }}>
            <Ons.Page>
                <div className={styles.container}>
                    {children}
                </div>
            </Ons.Page>
        </Ons.Dialog>
    )
}

export default Popup;

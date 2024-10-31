//Onsen UI
import * as Ons from 'react-onsenui';

//Styles
import styles from './BackButton.module.css';


/**
 * BackButton
 *  
 */
function BackButton() {
    return (
        <div className={styles.container}>
            <Ons.BackButton />
        </div>
    )
}

export default BackButton;
//React
import { CSSProperties } from 'react';

//Styles
import styles from './Background.module.css';


/**
 * Props
 * 
 */
interface Props {
    className?: any;
    style?: CSSProperties
}


/**
 * Background
 * 
 * @returns 
 */
function Background({ className, style }: Props) {
    return (
        <div className={`${styles.container} ${className}`} style={style}>
            <div className={styles.layer} />
        </div>
    )
}

export default Background;
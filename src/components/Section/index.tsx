//React
import React from 'react';

//Components
import Text from '../Text';

//Styles
import styles from './Section.module.css';


/**
 * Props
 * 
 */
interface Props {
    className?: any;
    titleNode: string;
    descriptionNode?: string;
    children: React.ReactNode | React.ReactNode[];
    onClick?: () => any;
}


/**
 * Section
 * 
 * @param param0 
 * @returns 
 */
function Section({ className, titleNode, descriptionNode, children, onClick }: Props) {
    return (
        <div
            className={`${styles.container} ${className}`}
            onClick={() => onClick ? onClick() : null}>
            {/* Címsor */}
            <Text
                className={styles.title}
                node={titleNode} />

            {/* Leírás */}
            {descriptionNode &&
                (
                    <Text
                        className={styles.description}
                        node={descriptionNode} />
                )
            }

            {/* Tartalom */}
            <div className={styles.children}>
                {children}
            </div>
        </div>
    )
}

export default Section;

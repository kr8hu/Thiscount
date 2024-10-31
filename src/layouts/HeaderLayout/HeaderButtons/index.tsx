//Onsen UI
import { Icon } from "react-onsenui";

//Components
import Text from "../../../components/Text";

//Interfaces
import IHeaderButton from "../../../interfaces/HeaderButton";

//Styles
import styles from "./HeaderButtons.module.css";


/**
 * Props
 * 
 */
interface Props {
    buttons: IHeaderButton[];
}


/**
 * HeaderButtons
 * 
 * @returns 
 */
function HeaderButtons({ buttons }: Props) {
    /**
     * renderButtons
     * 
     * @returns 
     */
    const renderButtons = () => {
        return buttons.map((button: IHeaderButton, idx: number) => {
            return (
                <div
                    key={idx}
                    className={styles.button}
                    onClick={() => button.onClick ? button.onClick() : null}>
                    <Icon
                        icon={button.icon}
                        fixedWidth />

                    {button.text &&
                        (
                            <Text>
                                {button.text}
                            </Text>
                        )
                    }
                </div>
            )
        })
    }


    return (
        <div className={styles.container}>
            {renderButtons()}
        </div>
    )
}

export default HeaderButtons;

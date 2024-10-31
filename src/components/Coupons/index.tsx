//React
import { useContext } from "react";

//Context
import { AppContext } from "../../context/App";

//Components
import Text from "../Text";
import Coupon from "../Coupon";

//Interfaces
import ICoupon from "../../interfaces/Coupon";

//Shared
import { sortByProperty } from "../../shared/utils";

//Styles
import styles from "./Coupons.module.css";


/**
 * Props
 * 
 */
interface Props {
    src: ICoupon[];
    filter?: (coupon: ICoupon) => boolean;
    onSelect?: (id: string) => any;
    onPress?: (id: string) => any;
}


/**
 * Coupons
 * 
 * @param src
 */
function Coupons({ src, filter, onSelect, onPress }: Props) {
    /**
     * Context
     * 
     */
    const { appState } = useContext(AppContext);


    /**
     * placeholder
     * 
     */
    const placeholder = <Text className={styles.placeholder} node="coupons_placeholder" />


    /**
     * renderCoupons
     * 
     * @returns 
     */
    const renderCoupons = () => {
        return src
            .filter((coupon: ICoupon) => filter ? filter(coupon) : true)
            .sort(sortByProperty(appState.sortProperty, false))
            .map((coupon: ICoupon) => {
                return (
                    <Coupon
                        key={coupon.id}
                        id={coupon.id}
                        name={coupon.name}
                        code={coupon.code}
                        expiry={coupon.expiry}
                        onClick={(id: string) => onSelect ? onSelect(id) : null}
                        onPress={(id: string) => onPress ? onPress(id) : null} />
                )
            });
    }

    return (
        <div className={styles.container}>
            {src.length > 0 ? renderCoupons() : placeholder}
        </div>
    )
}

export default Coupons;
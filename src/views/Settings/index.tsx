//React
import { useContext } from 'react';

//Redux
import { useDispatch } from 'react-redux';

//Store
import { AppDispatch } from '../../store';
import {
    clearCoupons,
    loadCoupons,
    removeCoupon
} from '../../store/actions/couponActions';

//Context
import { AppContext } from '../../context/App';

//Onsen UI
import ons from 'onsenui';
import { Page } from 'react-onsenui';

//Views
import About from '../About';

//Components
import SettingSections from './SettingSections';

//Layouts
import HeaderLayout from '../../layouts/HeaderLayout';

//Interfaces
import ISection from '../../interfaces/Section';
import ICoupon from '../../interfaces/Coupon';
import IHeaderButton from '../../interfaces/HeaderButton';
import IOnsActionSheet from '../../interfaces/OnsActionSheet';

//Local
import {
    deleteTypes,
    sortPropertyActionSheet,
    couponsForDeletionActionSheet,
    expiredVisibilityActionSheet,
} from './const';

//Shared
import {
    getSortPropertyByText,
    getSortPropertyByID,
    calculateTimeLeft
} from '../../shared/utils';

import {
    appName,
    actionTypes,
} from '../../shared/const';

//Styles
//import styles from './Settings.module.css';


/**
 * Props
 */
interface Props {
    navigator: any;
}


/**
 * Settings
 * 
 * Beállítások nézet
 */
function Settings({ navigator }: Props) {
    /**
     * dispatch
     * 
     */
    const dispatch = useDispatch<AppDispatch>();


    /**
     * useContext
     * 
     */
    const { appState, setAppState } = useContext(AppContext);


    /**
     * headerButtons
     * 
     */
    const headerButtons: IHeaderButton[] = [
        {
            icon: "fa-info",
            onClick: () => navigator.pushPage({ component: About })
        },
    ];


    /**
     * sortPropertyName
     * 
     */
    const sortPropertyName = getSortPropertyByText(appState.sortProperty);


    /**
     * expiredVisibilityStatus
     * 
     */
    const expiredVisibilityStatus = appState.expiredVisibility === true ? "Megjelenítve" : "Elrejtve";


    /**
     * isActionSelected
     * 
     */
    const isActionSelected = (index: number, lastIndex: number) => (index > -1) && (index < lastIndex);


    /**
     * settingSections
     * 
     */
    const settingSections: ISection[] = [
        {
            titleNode: "settings_section_title_sort",
            descriptionNode: "settings_section_description_sort",
            value: sortPropertyName,
            onClick: () => openActionSheet(sortPropertyActionSheet, onSelectSortProperty)
        },
        {
            titleNode: "settings_section_title_expired_visibility",
            descriptionNode: "settings_section_description_expired_visibility",
            value: expiredVisibilityStatus,
            onClick: () => openActionSheet(expiredVisibilityActionSheet, onSelectExpiredVisibility)
        },
        {
            titleNode: "settings_section_title_clear",
            descriptionNode: "settings_section_description_clear",
            value: "Kattints ide az adatok kiválasztásához",
            onClick: () => openActionSheet(couponsForDeletionActionSheet, onSelectCouponsForDeletion)
        },
    ];


    /**
     * openActionSheet
     * 
     * @param actionSheet 
     * @param onSelect 
     */
    const openActionSheet = (actionSheet: IOnsActionSheet, onSelect: any) => {
        ons.openActionSheet(actionSheet)
            .then((index: number) => {
                const lastIndex = actionSheet.buttons.length - 1;
                const actionSelected = isActionSelected(index, lastIndex);

                if (actionSelected) {
                    onSelect(index);
                }
            });
    }


    /**
     * onSelectSortProperty
     * 
     * @param index 
     * @param lastIndex 
     */
    const onSelectSortProperty = (index: number) => {
        const property = getSortPropertyByID(index);

        setAppState(actionTypes.app.SET_SORT_PROPERTY, property);
        localStorage.setItem(`${appName}__sortProperty`, property);
    }


    /**
     * selectPostsForDeletion
     * 
     */
    const onSelectCouponsForDeletion = (index: number) => {
        deleteCouponsHandler(index);
    }


    /**
     * deleteCouponsHandler
     * 
     * @param index 
     */
    const deleteCouponsHandler = (index: number) => {
        switch (index) {
            case deleteTypes.expired: {
                deleteExpiredCoupons()
                break;
            }
            default: {
                dispatch(clearCoupons());
            }
        }
    }


    /**
     * deleteExpiredCoupons
     * 
     */
    const deleteExpiredCoupons = async () => {
        const coupons = await dispatch(loadCoupons()).unwrap();

        if (coupons) {
            const filteredCoupons = coupons.filter((coupon: ICoupon) => calculateTimeLeft(new Date(coupon.expiry)).timeLeft < 0);

            filteredCoupons.forEach((coupon: ICoupon) => {
                dispatch(removeCoupon(coupon.id));
            });
        }
    }


    /**
     * onSelectExpiredVisibility
     * 
     */
    const onSelectExpiredVisibility = (index: number) => {
        setAppState(actionTypes.app.SET_EXPIRED_VISIBILITY, Boolean(index));
        localStorage.setItem(`${appName}__expiredVisibility`, `${Boolean(index)}`);

    }


    return (
        <Page>
            <HeaderLayout
                backButton
                title="settings_title"
                buttons={headerButtons}>
                <SettingSections sections={settingSections} />
            </HeaderLayout>
        </Page>
    )
}

export default Settings;
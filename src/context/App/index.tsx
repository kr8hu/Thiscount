//React
import {
    createContext,
    useReducer,
} from 'react';

//Reducer
import {
    reducer,
    initialState
} from './reducer';

//Interfaces
import ICoupon from '../../interfaces/Coupon';


/**
 * Interfaces 
 * 
 */
interface Props {
    children: any;
}

interface IAppState {
    coupons: ICoupon[];
    sortProperty: string;
    expiredVisibility: boolean;
}

interface IAppContext {
    appState: IAppState;
    setAppState: (type: any, payload: any) => void;
}


/**
 * AppContext 
 * 
 */
export const AppContext = createContext<IAppContext>({
    appState: initialState,
    setAppState: () => null
});


/**
 * AppProvider 
 * 
 */
export const AppProvider = (props: Props) => {
    const [appState, dispatch] = useReducer(reducer, initialState);
    const setAppState = (type: any, payload: any) => dispatch({ type, payload });


    return (
        <AppContext.Provider value={{
            appState,
            setAppState
        }}>
            {props.children}
        </AppContext.Provider>
    )
}
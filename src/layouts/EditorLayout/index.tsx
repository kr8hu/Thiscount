//React
import {
    useEffect,
    useState
} from 'react';

//Redux
import { useDispatch } from 'react-redux';

//Store
import { AppDispatch } from '../../store';
import { loadCoupon } from '../../store/actions/couponActions';

//Components
import InputSections from './InputSections';

import Text from '../../components/Text';
import BackButton from '../../components/BackButton';
import Background from '../../components/Background';

//Hooks
import { useForm } from '../../hooks/useForm';

//Interfaces
import ICoupon from '../../interfaces/Coupon';

//Styles
import styles from './EditorLayout.module.css';


/**
 * Props
 * 
 */
interface Props {
    id?: string;
    title?: string;
    onSubmit: (data: any) => any;
}


/**
 * EditorLayout
 * 
 * @returns 
 */
function EditorLayout({ id, title, onSubmit }: Props) {
    /**
     * dispatch
     * 
     */
    const dispatch = useDispatch<AppDispatch>();


    /**
     * Variables
     * 
     */
    const initialValues: ICoupon = {
        id: '',
        name: '',
        code: '',
        expiry: ''
    }


    /**
     * States
     * 
     */
    const [state, setState] = useState<ICoupon>(initialValues)


    /**
     * Hooks
     * 
     */
    const [values, handleChange] = useForm(state);


    /**
     * findCoupon
     * 
     * @param id 
     */
    const findCoupon = async (id: string) => {
        const coupon: ICoupon = await dispatch(loadCoupon(id)).unwrap();

        if (coupon) {
            setState(coupon);
        }
    }


    /**
     * submitForm
     * 
     */
    const submitForm = () => {
        onSubmit(values);
    }


    /**
     * Effects
     * 
     */
    useEffect(() => {
        if (id === undefined) return;

        findCoupon(id);
        //eslint-disable-next-line
    }, [id]);


    /**
     * renderInput
     * 
     * @param name 
     * @param type 
     * @param value 
     * @param onChange 
     * @returns 
     */
    const renderInput = (name: string, type: string, value: any, onChange?: any) => {
        if (type === "select") {
            return null;
        }

        return <input name={name} type={type} onChange={handleChange} value={value} />
    }


    //Szekciók
    const sections = [
        {
            titleNode: "editor_layout_section_title_name",
            descriptionNode: "editor_layout_section_description_name",
            onChange: handleChange,
            value: renderInput("name", "text", values.name)
        },
        {
            titleNode: "editor_layout_section_title_code",
            descriptionNode: "editor_layout_section_description_code",
            onChange: handleChange,
            value: renderInput("code", "text", values.code)
        },
        {
            titleNode: "editor_layout_section_title_expiry",
            descriptionNode: "editor_layout_section_description_expiry",
            onChange: handleChange,
            value: renderInput("expiry", "date", values.expiry)
        }
    ];


    return (
        <div className={styles.container}>
            {/* Vissza gomb */}
            <BackButton />

            {/* Háttér */}
            <Background />

            {/* Tartalom */}
            <div className={styles.row}>
                <div className={styles.col}>
                    {title &&
                        (
                            <Text className={styles.title}>
                                {title}
                            </Text>
                        )
                    }
                </div>
                <div className={styles.col}>
                    <form
                        className={styles.form}
                        onSubmit={(e: any) => e.preventDefault()}>
                        {/* Input mezők */}
                        <InputSections sections={sections} />

                        {/* Submit gomb */}
                        <button
                            type="submit"
                            className={styles.submit}
                            onClick={submitForm}>
                            <Text
                                className={styles.submitText}
                                node="editor_layout_submit" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditorLayout;

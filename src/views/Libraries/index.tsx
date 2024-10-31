//React
import { useState } from 'react';

//Onsen UI
import {
    Page,
} from 'react-onsenui';

//Components
import Popup from '../../components/Popup';
import LibrarySections from './LibrariesSections';

//Layouts
import HeaderLayout from '../../layouts/HeaderLayout';

//Intefaces
import ISection from '../../interfaces/Section';

//Local
import { licenses } from './const';

//Styles
//import styles from './Libraries.module.css';


/**
 * Props
 */
interface Props {
    navigator: any;
}


/**
 * Libraries
 * 
 * Harmadik féltől származó könyvtárak nézete
 */
function Libraries({ navigator }: Props) {
    /**
     * States
     * 
     */
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [popupContent, setPopupContent] = useState<any>(null);


    /**
     * librarySections
     * 
     */
    const librarySections: ISection[] = [
        {
            titleNode: "libraries_section_title_capacitor",
            descriptionNode: "libraries_section_description_capacitor",
            onClick: () => setPopup(licenses.capacitor)
        },
        {
            titleNode: "libraries_section_title_onsenui",
            descriptionNode: "libraries_section_description_onsenui",
            onClick: () => setPopup(licenses.onsenui)
        },
        {
            titleNode: "libraries_section_title_axios",
            descriptionNode: "libraries_section_description_axios",
            onClick: () => setPopup(licenses.axios)
        },
        {
            titleNode: "libraries_section_title_react",
            descriptionNode: "libraries_section_description_react",
            onClick: () => setPopup(licenses.react)
        },
        {
            titleNode: "libraries_section_title_react-dom",
            descriptionNode: "libraries_section_description_react-dom",
            onClick: () => setPopup(licenses.react)
        },
        {
            titleNode: "libraries_section_title_react-onsenui",
            descriptionNode: "libraries_section_description_react-onsenui",
            onClick: () => setPopup(licenses.react_onsenui)
        },
        {
            titleNode: "libraries_section_title_typescript",
            descriptionNode: "libraries_section_description_typescript",
            onClick: () => setPopup(licenses.typescript)
        },
        {
            titleNode: "libraries_section_title_roboto",
            descriptionNode: "libraries_section_description_roboto",
            onClick: () => setPopup(licenses.roboto)
        },
        {
            titleNode: "libraries_section_title_background",
            descriptionNode: "libraries_section_description_background"
        },
    ];


    /**
     * setPopup
     * 
     * @param content 
     */
    const setPopup = (content: any) => {
        setIsOpen(true);
        setPopupContent(content);
    }


    return (
        <Page>
            <HeaderLayout
                backButton
                title="libraries_title">
                <LibrarySections
                    sections={librarySections} />
                <Popup
                    isOpen={isOpen}
                    onCancel={setIsOpen}>
                    {popupContent}
                </Popup>
            </HeaderLayout>
        </Page>
    )
}

export default Libraries;
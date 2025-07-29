//Onsen UI
import {
    Page,
} from 'react-onsenui';

//Capacitor
import { Browser } from '@capacitor/browser';

//Components
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
     * placeholderText
     * 
     */
    const placeholderText = "Licensz megtekintése";


    /**
     * librarySections
     * 
     */
    const librarySections: ISection[] = [
        {
            titleNode: "libraries_section_title_capacitor",
            descriptionNode: "libraries_section_description_capacitor",
            value: placeholderText,
            onClick: () => openInAppBrowser(licenses.capacitor)
        },
        {
            titleNode: "libraries_section_title_onsenui",
            descriptionNode: "libraries_section_description_onsenui",
            value: placeholderText,
            onClick: () => openInAppBrowser(licenses.onsenui)
        },
        {
            titleNode: "libraries_section_title_axios",
            descriptionNode: "libraries_section_description_axios",
            value: placeholderText,
            onClick: () => openInAppBrowser(licenses.axios)
        },
        {
            titleNode: "libraries_section_title_react",
            descriptionNode: "libraries_section_description_react",
            value: placeholderText,
            onClick: () => openInAppBrowser(licenses.react)
        },
        {
            titleNode: "libraries_section_title_react-dom",
            descriptionNode: "libraries_section_description_react-dom",
            value: placeholderText,
            onClick: () => openInAppBrowser(licenses.reactdom)
        },
        {
            titleNode: "libraries_section_title_react-onsenui",
            descriptionNode: "libraries_section_description_react-onsenui",
            value: placeholderText,
            onClick: () => openInAppBrowser(licenses.onsenui)
        },
        {
            titleNode: "libraries_section_title_typescript",
            descriptionNode: "libraries_section_description_typescript",
            value: placeholderText,
            onClick: () => openInAppBrowser(licenses.typescript)
        },
        {
            titleNode: "libraries_section_title_roboto",
            descriptionNode: "libraries_section_description_roboto",
            value: placeholderText,
            onClick: () => openInAppBrowser(licenses.roboto)
        },
        {
            titleNode: "libraries_section_title_background",
            descriptionNode: "libraries_section_description_background"
        },
    ];


    /**
     * openInAppBrowser
     * 
     * @param url 
     */
    const openInAppBrowser = async (url: any) => {
        await Browser.open({ url });
    }


    return (
        <Page>
            <HeaderLayout
                backButton
                title="libraries_title">
                <LibrarySections
                    sections={librarySections} />
            </HeaderLayout>
        </Page>
    )
}

export default Libraries;
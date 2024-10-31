//Onsen UI
import { Page } from 'react-onsenui';

//Views
import Libraries from '../Libraries';

//Components
import AboutSections from './AboutSections';

//Layouts
import HeaderLayout from '../../layouts/HeaderLayout';

//Intefaces
import ISection from '../../interfaces/Section';

//Shared
import {
    appVersion,
    versionCode,
} from '../../shared/const';

//Styles
//import styles from './About.module.css';


/**
 * Props
 */
interface Props {
    navigator: any;
}


/**
 * About
 * 
 * Névjegy nézet
 */
function About({ navigator }: Props) {
    /**
     * appVersions
     * 
     */
    const appVersions = `${appVersion} (${versionCode})`;


    /**
     * aboutSections
     * 
     */
    const aboutSections: ISection[] = [
        {
            titleNode: "about_section_title_version",
            value: appVersions,
        },
        {
            titleNode: "about_section_title_thirdpartylibraries",
            descriptionNode: "about_section_description_thirdpartylibraries",
            onClick: () => navigator.pushPage({ component: Libraries })
        },
    ];


    return (
        <Page>
            <HeaderLayout
                backButton
                title="about_title">
                <AboutSections sections={aboutSections} />
            </HeaderLayout>
        </Page>
    )
}

export default About;
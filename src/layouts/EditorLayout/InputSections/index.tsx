//Components
import Section from '../../../components/Section';

//Interfaces
import ISection from '../../../interfaces/Section';

//Styles
import styles from './InputSections.module.css';


/**
 * Props
 * 
 */
interface Props {
    sections: ISection[];
}

/**
 * InputSections
 * 
 * @param sections 
 * @returns 
 */
function InputSections({ sections }: Props) {

    /**
     * renderSections
     * 
     * @returns 
     */
    const renderSections = () => {
        return sections.map((section: ISection, idx: number) => {
            return (
                <Section
                    key={idx}
                    className={styles.section}
                    titleNode={section.titleNode}
                    descriptionNode={section.descriptionNode}>
                    {section.value}
                </Section>
            )
        })
    }


    return (
        <div className={styles.container}>
            {renderSections()}
        </div>
    )
}

export default InputSections;

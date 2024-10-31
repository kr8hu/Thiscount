//Components
import Text from '../../../components/Text';
import Section from '../../../components/Section';

//Interfaces
import ISection from '../../../interfaces/Section';

//Styles
import styles from './AboutSections.module.css';


/**
 * Props
 */
interface Props {
    sections: ISection[];
}


/**
 * AboutSections
 * 
 */
function AboutSections({ sections }: Props) {

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
                    descriptionNode={section.descriptionNode}
                    onClick={section.onClick}>
                    <Text>
                        {section.value}
                    </Text>
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

export default AboutSections;
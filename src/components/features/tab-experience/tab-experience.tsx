import React, {useState} from 'react';
import styles from './tab-experience.module.scss';

interface TabsProps {
  components: [],
  style: 'item-experience',
  title: 'Ceiba software',
}

interface TabExperienceProps {
  content: {
    title: string,
    tabs: TabsProps[]
  }
}

const TabExperience:React.FC<TabExperienceProps> = props => {
  const {
    tabs, title
  } = props.content;
  const [active, setActive] = useState(0);

  return (
    <section className={styles.tab_experience} id={title.replace(' ', '-')?.toLocaleLowerCase()?.trim()}>
      <div className={`container ${ styles.container }`}>
        <h2>{title}</h2>
        <div className={` ${ styles.tabs }`}>
          <div className={styles.header_buttons}>
            {
              tabs && tabs.map((item, index) => (
                <button key={'title-tab-experience-' + index} className={`${ styles.tab_button } ${ index === active ? styles.active : '' }`} onClick={() => setActive(index)}>{item.title}</button>
              ))
            }
          </div>
          <div className={styles.content}>
            {
              tabs && tabs[active].components?.map(child => child)
            }
          </div>
        </div>
      </div>

    </section>
  );
};

TabExperience.defaultProps = {content: {
  tabs: [],
  title: ''
}};

export default TabExperience;

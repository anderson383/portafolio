import { Interweave } from 'interweave';
import React from 'react';
import styles from './item-experience.module.scss';
interface ItemExperienceProps {
  content: {
    style: string;
    name: string;
    title:string;
    link: string;
    subtitle: string;
    description: string;
    image: {
      url: string
    }
  }
  locale: string
  page: string
}

const ItemExperience:React.FC<ItemExperienceProps> = props => {
  const {
    title, description
  } = props.content;

  return (
    <div className={styles.experience}>
      <div className={styles.header}>
        <Interweave
          tagName='div'
          content={title}
          attributes={{ className: styles.title }}
        />
      </div>
      <div className={styles.content}>
        <Interweave
          tagName='div'
          content={description}
          attributes={{ className: styles.description }}
        />
      </div>
    </div>
  );
};

ItemExperience.defaultProps = {
  content: {
    description: '',
    image: {url: ''},
    link: '',
    name: '',
    style: '',
    subtitle: '',
    title: ''
  },
  locale: '',
  page: ''
};

export default ItemExperience;

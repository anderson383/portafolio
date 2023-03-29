import React from 'react';
import styles from './item-experience.module.scss';
import { Interweave } from 'interweave';
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

  console.log(props.content);

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
      <p>Item experience</p>
    </div>
  );
};

ItemExperience.defaultProps = {
  content: {
    image: {url: ''},
    link: '',
    name: '',
    style: '',
    description: '',
    subtitle: '',
    title: ''
  },
  locale: '',
  page: ''
};

export default ItemExperience;

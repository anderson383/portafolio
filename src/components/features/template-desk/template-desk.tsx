import { Interweave } from 'interweave';
import styles from './template-desk.module.scss';
interface TemplateDeskProps {
  content: {
    name: string;
    title: string;
    link: string;
    description: string;
    image: {
      url: string;
    }
    secondImage: {
      url: string;
    }
  }
}

const TemplateDesk:React.FC<TemplateDeskProps> = ({content}) => {
  const {
    title, image, name, secondImage, link, description
  } = content;

  console.log(name);
  const interweaveTransformLinks = (node: HTMLElement) => {
    if (node.tagName === 'a' || node.tagName === 'A') {
      const url = node.getAttribute('href');

      return (
        <>
          <a className={styles.images} href={url} target='_blank'>
            <div className={styles.desk}>
              <img src={image?.url} alt="" />
            </div>
            <div className={styles.mobile}>
              <img src={secondImage?.url} alt="" />
            </div>
          </a>
        </>
      );
    }
  };

  const interweaveTransformIconsLinks = (node: HTMLElement) => {
    if (node.tagName === 'a' || node.tagName === 'A') {
      const url = node.getAttribute('href');
      const contentUrl = node.childNodes[0].textContent;

      if (url.includes('github.com')) {
        return (
          <>
            <a href={url} target='_blank'>
              <img src="/img/icon-github.svg" alt="" width={30} />
              {contentUrl}
            </a>
          </>
        );
      }
    }
  };

  return (
    <section id={name?.toLowerCase().trim()} className="container">
      <div className={styles.title}>
        <Interweave
          tagName='div'
          content={title}
        />
      </div>
      <div className={styles.content_project}>
        <Interweave
          tagName='div'
          content={link}
          transform={interweaveTransformLinks}
        />
        <div className={styles.description}>
          <Interweave
            tagName='div'
            content={description}
            transform={interweaveTransformIconsLinks}
          />
        </div>
      </div>
    </section>
  );
};

TemplateDesk.defaultProps = {content: {
  description: '',
  image: {url: ''},
  link: '',
  name: '',
  secondImage: {url: ''},
  title: ''
}};

export default TemplateDesk;

import {
  useEffect, useState
} from 'react';
import axiosIntance from '@/services/config/axios/AxiosConfig';
import { Interweave } from 'interweave';
import styles from './banner.module.scss';
import { useLottie } from 'lottie-react';
interface BannerProps {
  content: {
    style: string;
    name: string;
    title:string;
    link: string;
    subtitle: string;
    image: {
      url: string
    }
  }
  locale: string
  page: string
}

export const Banner:React.FC<BannerProps> = props => {
  const {
    image, title, subtitle, link
  } = props.content;
  const [jsonAnimation, setJsonAnimation] = useState('');

  const interweaveTransformLinks = (node: HTMLElement) => {
    if (node.tagName === 'a' || node.tagName === 'A') {
      const content = node.childNodes[0].textContent;
      const url = node.getAttribute('href');

      return (
        <>
          <a
            className={styles.btn_cv}
            href={url}
            target="_blank"
          >
            <img
              alt={'arrow right'}
              className="mx-2 mb-1"
              id="svgClose"

              src="/img/cv-icon.svg"
              width="35"
              height="35"
            />
            {content}
          </a>
        </>
      );
    }
  };

  useEffect(() => {
    axiosIntance.get(image.url, {responseType: 'json'}).then(resp => {
      setJsonAnimation(resp.data);
    });
  }, []);

  const options = {
    animationData: jsonAnimation,
    height: 430,
    loop: true
  };

  const { View } = useLottie(options, {
    height: 430,
    width: 430
  });

  return (
    <section className={styles.banner} id={'inicio'}>
      <>
        <img className={styles.img_letf} src="/img/bg-banner.svg" alt="" />
        <img className={styles.img_right} src="/img/bg-banner-2.svg" alt="" />
        <img className={styles.ellipse_2} src="/img/ellipse-2.svg" alt="" />
      </>
      <div className={styles.image_banner}>
        <img className={styles.ellipse_1} src="/img/ellipse-1.svg" alt="" />
        { View }
      </div>
      <div className={styles.info}>
        <Interweave
          tagName='div'
          content={title}
          attributes={{ className: styles.title }}
        />
        <div className={styles.subtitle}>
          <p style={{
            animationTimingFunction: `2s steps(${ subtitle.length + 2 }, start)`,
            width: subtitle.length - 3 + 'ch'
          }}>{subtitle}</p>
          <Interweave
            tagName='div'
            content={link}
            transform={interweaveTransformLinks}
          />
        </div>
      </div>
    </section>
  );
};

Banner.defaultProps = {
  content: {
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
export default Banner;

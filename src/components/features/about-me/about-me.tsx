import {
  useEffect, useState
} from 'react';
import axiosIntance from '@/services/config/axios/AxiosConfig';
import { Interweave } from 'interweave';
import styles from './about-me.module.scss';
import { useLottie } from 'lottie-react';

interface AboutMeProps {
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

const AboutMe:React.FC<AboutMeProps> = props => {
  const {
    title, subtitle, image, description
  } = props.content;

  const [jsonAnimation, setJsonAnimation] = useState({
    urlIconGit: '',
    urlMainImage: ''
  });

  useEffect(() => {
    axiosIntance.get(image.url, {responseType: 'json'}).then(resp => {
      setJsonAnimation(last => ({
        ...last,
        urlMainImage: resp.data
      }));
    });

    axiosIntance.get('https://lottie.host/6a52efa3-38ea-4dcd-8e48-968f1042aa6b/bRaMeUp92U.json', {responseType: 'json'}).then(resp => {
      setJsonAnimation(last => ({
        ...last,
        urlIconGit: resp.data
      }));
    });
  }, []);

  const options = {
    animationData: jsonAnimation.urlMainImage,
    height: 430,
    loop: true
  };

  const option2 = {
    animationData: jsonAnimation.urlIconGit,
    height: 430,
    loop: true
  };

  const { View: ViewAboutMe } = useLottie(options, {
    height: 466,
    width: 466
  });

  const { View: ViewGitIcon } = useLottie(option2, {
    height: 66,
    width: 66
  });

  return (
    <div className={styles.about_me + ' '}>
      <img className={styles.icon_bg_3}src="/img/ellipse-about-me-3.svg" alt="" />
      <div className="container">

        <div className={styles.title}>
          <Interweave
            tagName='div'
            content={title}
          />
        </div>

        <div className={styles.content}>
          <div className="">
            <img className={styles.icon_bg_1}src="/img/ellipse-about-me-1.png" alt="" />
            <img className={styles.icon_bg_2}src="/img/ellipse-about-me-2.png" alt="" />
          </div>
          <div className={styles.text}>
            <Interweave
              tagName='div'
              content={description}
            />
          </div>
          <div className={styles.image}>
            {ViewAboutMe}
          </div>
        </div>

        <div className={styles.footer}>
          {
            ViewGitIcon
          }
        </div>
      </div>
    </div>
  );
};

AboutMe.defaultProps = {
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

export default AboutMe;

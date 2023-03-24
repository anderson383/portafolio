import {
  Animator, batch, FadeIn
} from 'react-scroll-motion';
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
    link_2: string;
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
    title, image, description, link, link_2
  } = props.content;

  const [jsonAnimation, setJsonAnimation] = useState({
    urlIconGit: '',
    urlLinkedin: '',
    urlMainImage: ''
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [mainImageResp, iconGitResp, iconLinkedinResp] = await Promise.all([
          axiosIntance.get(image.url, { responseType: 'json' }),
          axiosIntance.get('https://lottie.host/6a52efa3-38ea-4dcd-8e48-968f1042aa6b/bRaMeUp92U.json', { responseType: 'json' }),
          axiosIntance.get('https://lottie.host/47b885a9-26bf-4ecc-b6df-8e6c85fe381b/dFPehGwu7s.json', { responseType: 'json' })
        ]);

        setJsonAnimation(last => ({
          ...last,
          urlIconGit: iconGitResp.data,
          urlLinkedin: iconLinkedinResp.data,
          urlMainImage: mainImageResp.data
        }));
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const { View: ViewAboutMe } = useLottie({
    animationData: jsonAnimation.urlMainImage,
    height: 430,
    loop: true
  }, {
    height: 466,
    width: 466
  });

  const { View: ViewGitIcon } = useLottie({
    animationData: jsonAnimation.urlIconGit,
    height: 430,
    loop: true
  }, {
    height: 55,
    width: 55
  });

  const { View: ViewLinkIcon } = useLottie({
    animationData: jsonAnimation.urlLinkedin,
    height: 430,
    loop: true
  }, {
    height: 77,
    width: 77
  });

  const interweaveTransformLinks = (node: HTMLElement, icon: React.ReactNode, titleAncla:string) => {
    if (node.tagName === 'a' || node.tagName === 'A') {
      const content = node.childNodes[0].textContent;
      const url = node.getAttribute('href');

      return (
        <a href={url} target="_blank" title={titleAncla}>
          { icon }
        </a>
      );
    }
  };

  const ZoomInScrollOut = batch(FadeIn());

  return (

    // <ScrollPage>
    <div className={styles.about_me + ' '} id='sobre-mi'>
      <img className={styles.icon_bg_3}src="/img/ellipse-about-me-3.svg" alt="" />
      <div className="container">

        <div className={styles.title}>
          <Animator animation={ZoomInScrollOut} >
            <Interweave
              tagName='div'
              content={title}
            />
          </Animator>
        </div>

        <div className={styles.content}>
          <Animator animation={ZoomInScrollOut} >
            <div className="">
              <img className={styles.icon_bg_1}src="/img/ellipse-about-me-1.png" alt="" />
              <img className={styles.icon_bg_2}src="/img/ellipse-about-me-2.png" alt="" />
            </div>
          </Animator>
          <Animator animation={ZoomInScrollOut} >
            <div className={styles.text}>
              <Interweave
                tagName='div'
                content={description}
              />
            </div>
          </Animator>
          <Animator animation={ZoomInScrollOut} >

            <div className={styles.image}>
              {ViewAboutMe}
            </div>
          </Animator>
        </div>

        <div className={styles.footer}>
          <Interweave
            tagName='div'
            content={link_2}
            transform={node => interweaveTransformLinks(node, ViewLinkIcon, 'Linkedin')}
          />
          <Interweave
            tagName='div'
            content={link}
            transform={node => interweaveTransformLinks(node, ViewGitIcon, 'Git Hub')}
          />
        </div>
      </div>
    </div>

  // </ScrollPage>
  );
};

AboutMe.defaultProps = {
  content: {
    description: '',
    image: {url: ''},
    link: '',
    link_2: '',
    name: '',
    style: '',
    subtitle: '',
    title: ''
  },
  locale: '',
  page: ''
};

export default AboutMe;

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
    image, title, subtitle
  } = props.content;
  const [jsonAnimation, setJsonAnimation] = useState('');

  useEffect(() => {
    axiosIntance.get(image.url, {responseType: 'json'}).then(resp => {
      setJsonAnimation(resp.data);
    });
  }, []);

  const options = {
    animationData: jsonAnimation,
    loop: true
  };

  const { View } = useLottie(options);

  return (
    <div className={styles.banner}>
      <div className={styles.image_banner}>
        { View }
      </div>
      <div className={styles.info}>
        <Interweave
          tagName='div'
          content={title}
          attributes={{ className: styles.title }}
        />
        <div className={styles.subtitle}>
          {subtitle}
        </div>
      </div>
    </div>
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

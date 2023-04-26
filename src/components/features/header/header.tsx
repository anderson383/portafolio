import {
  useEffect, useState
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {Link as LinkScroll} from 'react-scroll';
import { MenuProps } from '@/services/repositories/contentful.repository';
import styles from './header.module.scss';

import { useRouter } from 'next/router';

interface HeaderProps {
  name: string
  logo: string
  menu: MenuProps[]

}

export const Header:React.FC<HeaderProps> = ({
  logo, menu
}) => {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isOpenLocales, setIsOpenLocales] = useState(false);

  const handleLocaleChange = (language: string) => {
    // router.push(router.route, router.asPath, { locale: language });
    const {
      pathname, asPath, query
    } = router;

    router.push({
      pathname,
      query
    }, asPath, { locale: language });
  };

  useEffect(() => {
    const handleScroll = () => setIsFixed(window.pageYOffset > 0);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  console.log(menu);

  return (
    <header className={`${ styles.header_container } ${ isFixed ? styles.fixxed : '' }`} >
      <div className={`${ styles.header }  container`}>
        <div className={styles.logo}>
          <Image
            src={logo}
            width={90}
            height={40}
            alt='logo-ander'
            className='pero podemos programas muy facilmente con este metodo :v'
          />
        </div>
        <nav>
          <button className={styles.button_menu} onClick={() => setOpenMenu(!openMenu)}>
            <img src="/img/icon-hamburguer.svg" alt="" width={40} />
          </button>
          <ul className={`${ styles.menu_mobile } ${ openMenu ? styles.menu_active : '' }`}>
            {
              menu.map((menuItem, index) => (
                <li key={index}>
                  <Link
                    href={menuItem.fields.link}
                    className={router.asPath === menuItem.fields.link ? styles.link_active : ''}
                  >
                    {menuItem.fields.name}
                  </Link>
                </li>
              ))
            }
          </ul>

          <ul className={`${ styles.menu_desk } `}>
            {
              menu.map((menuItem, index) => (
                <li key={index + 'menu-items'}>
                  <LinkScroll
                    spy={true}
                    smooth
                    duration={200}
                    className={styles.link_active}
                    to={menuItem.fields.name.replace(' ', '-')?.toLocaleLowerCase().trim()}
                  >{menuItem.fields.name}</LinkScroll>
                  {/* <Link
                    scroll
                    href={menuItem.fields.link}
                    className={router.asPath === menuItem.fields.link ? styles.link_active : ''}
                  >
                    {menuItem.fields.name}
                  </Link> */}
                </li>
              ))
            }
            <li className={styles.locales}>
              <button onClick={() => setIsOpenLocales(islocale => !islocale)}>
                <img src="https://img.icons8.com/nolan/64/language.png"/>
              </button>
              <ul className={`${ styles.showLocales } ${ isOpenLocales ? styles.isShowLocales : '' }`}>
                <li>
                  <button
                    onClick={() => handleLocaleChange('en')}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLocaleChange('es')}
                  >
                    Spanish
                  </button>
                </li>
              </ul>

            </li>
          </ul>
          {/* <div className={styles.darkInput}>
            <input type="radio" />
          </div> */}
        </nav>
      </div>

    </header>
  );
};

export default Header;

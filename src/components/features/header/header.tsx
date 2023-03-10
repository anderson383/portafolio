import Image from 'next/image';
import { MenuProps } from '@/services/repositories/contentful.repository';
import styles from './header.module.scss';
import { useState } from 'react';

interface HeaderProps {
  name: string
  logo: string
  menu: MenuProps[]

}

export const Header:React.FC<HeaderProps> = ({
  logo, menu
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className={styles.header + ' container'}>
      <div className={styles.logo}>
        <Image
          src={logo}
          width={90}
          height={40}
          alt='logo-ander'
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
                <a className='link-1' href={menuItem.fields.link}>{menuItem.fields.name}</a>
              </li>
            ))
          }
        </ul>

        <ul className={`${ styles.menu_desk } `}>
          {
            menu.map((menuItem, index) => (
              <li key={index + '222'}>
                <a className='link-1' href={menuItem.fields.link}>{menuItem.fields.name}</a>
              </li>
            ))
          }
        </ul>
        <div className={styles.darkInput}>
          <input type="radio" />
        </div>
      </nav>
    </header>
  );
};

export default Header;

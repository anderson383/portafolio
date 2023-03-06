import Image from 'next/image';
import { MenuProps } from '@/services/repositories/contentful.repository';
import styles from './header.module.scss';

interface HeaderProps {
  name: string
  logo: string
  menu: MenuProps[]

}

export const Header:React.FC<HeaderProps> = ({
  logo, menu
}) => {
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
        <ul className={styles.menu}>
          {
            menu.map((menuItem, index) => (
              <li key={index}>
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

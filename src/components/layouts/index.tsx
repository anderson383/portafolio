import Footer from '../features/footer';
import Header from '../features/header';
import { HeaderProps } from '@/services/repositories/contentful.repository';
import styles from './publicLayout.module.scss';

interface PublicLayoutProps {
  children: React.ReactNode;
  headerData: HeaderProps
}

export const PublicLayout:React.FC<PublicLayoutProps> = ({
  children, headerData
}) => {
  return (
    <>
      <div >
        <Header
          name={headerData.fields.name}
          logo={headerData.fields.logo.fields.file.url}
          menu={headerData.fields.menu}
        />
        <main className={styles.publicLayout}>
          {
            children
          }
        </main>
        <Footer />
      </div>
    </>
  );
};

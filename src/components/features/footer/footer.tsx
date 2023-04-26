import styles from './footer.module.scss';
const Footer = () => {
  const date = new Date();

  return (
    <footer className={styles.footer}>
      <a href="https://github.com/anderson383/portafolio" target='_blank'>
        Designed & Built by Anderson Sepulveda
        <p>{
          date.getFullYear()
        } - Colombia v1.1</p>
      </a>
    </footer>
  );
};

export default Footer;

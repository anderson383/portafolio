import styles from './footer.module.scss';
const Footer = () => {
  const date = new Date();

  return (
    <footer className={styles.footer}>
      <a href="">
        Designed & Built by Anderson Sepulveda
        <p>{
          date.getFullYear()
        } - Colombia v1.0</p>
      </a>
    </footer>
  );
};

export default Footer;

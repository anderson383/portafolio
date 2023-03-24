import styles from './footer.module.scss';
const Footer = () => {
  const date = new Date();

  return (
    <footer className={styles.footer}>
      <a href="">
        Designed & Built by Anderson Sepulveda
        <p>{
          date.getFullYear()
        }</p>
      </a>
    </footer>
  );
};

export default Footer;

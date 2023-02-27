import { Link } from "react-router-dom";
import styles from "./footer.module.css";
import catHead from "../../assets/cat-head.webp";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerNav}>
        <div>
          <Link to={"/"} className={styles.logoWrapper}>
            <img src={catHead} alt="cat logo" />
            <div>
              <span>Meow</span> Gallery
            </div>
          </Link>
          <p>MeowGallery, the best place to find cat photos.</p>
        </div>
        <div className={styles.footerListWrapper}>
          <div className={styles.footerList}>
            <p>Navigation</p>
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/gallery"}>Gallery</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerList}>
            <p>Company</p>
            <ul>
              <li>
                <Link to={"/"}>About</Link>
              </li>
              <li>
                <Link to={"/"}>Terms and conditions</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        <p>© MeowGallery 2023. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

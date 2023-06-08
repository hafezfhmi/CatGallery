import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import { CgProfile } from "react-icons/cg";

import MobileNav from "../MobileNav";
import Button from "../Button";
import Popover from "../Popover";
import styles from "./navbar.module.css";
import catLogo from "../../assets/cat-head.webp";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const userCtx = useUserContext();

  useEffect(() => {
    function navScroll() {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", navScroll);

    return () => {
      window.removeEventListener("scroll", navScroll);
    };
  }, []);

  const handleLogout = () => {
    userCtx.logout();
  };

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.navbarWrapper}>
        <Link to={"/"} className={styles.logoWrapper}>
          <img src={catLogo} alt="cat logo" />
          <div>
            <span>Meow</span>Gallery
          </div>
        </Link>

        <nav>
          <ul className={styles.navList}>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/gallery"}>Gallery</Link>
            </li>

            {!userCtx.isLoggedIn ? (
              <>
                <li>
                  <Link to={"/auth/login"}>Log in</Link>
                </li>
                <Button to={"/auth/signup"} label="Sign up" />
              </>
            ) : (
              <>
                <li>
                  <Link to={"/image/create"}>Create</Link>
                </li>

                <Popover
                  trigger={
                    <li className={styles.navProfile}>
                      <Link to={`/user/${userCtx.user.id}`}>
                        <CgProfile />
                      </Link>
                    </li>
                  }
                >
                  <ul className={styles.navPopoverList}>
                    <li>
                      <Link to={`/user/${userCtx.user.id}`}>Profile</Link>
                    </li>
                    <li onClick={handleLogout}>Log out</li>
                  </ul>
                </Popover>
              </>
            )}
          </ul>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UseUserContext } from "../../context/userContext";
import { CgProfile } from "react-icons/cg";

import MobileNav from "../MobileNav";
import Button from "../Button";
import Popover from "../Popover";
import styles from "./navbar.module.css";
import catLogo from "../../assets/cat-head.webp";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const userCtx = UseUserContext();

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  }, []);

  const handleLogout = () => {
    userCtx.logout();
  };

  return (
    <nav className={styles.navbar + " " + (scrolled ? styles.scrolled : "")}>
      <div className={styles.wrapper}>
        <Link to={"/"} className={styles.logoWrapper}>
          <img src={catLogo} alt="cat logo" />
          <div>
            {/* <span>Meow</span> Gallery */}
            <span>Meow</span>Gallery
          </div>
        </Link>

        <ul className={styles.nav}>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/gallery"}>Gallery</Link>
          </li>
          {userCtx.isLoggedIn ? (
            <Popover
              trigger={
                <li className={styles.navProfile}>
                  <Link to={"/profile"}>
                    <CgProfile />
                  </Link>
                </li>
              }
            >
              <ul className={styles.navPopoverList}>
                <li>
                  <Link to={"/profile"}>Profile</Link>
                </li>
                <li onClick={handleLogout}>Log out</li>
              </ul>
            </Popover>
          ) : (
            <>
              <li>
                <Link to={"login"}>Log in</Link>
              </li>
              <Button to={"signup"} label="Sign up" />
            </>
          )}
        </ul>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;

import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { useUserContext } from "../../context/userContext";
import Button from "../Button";
import styles from "./mobileNav.module.css";

const MobileNav = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const userCtx = useUserContext();

  const handleShowMobileNav = () => {
    setShowMobileNav((prevVal) => !prevVal);
  };

  const handleClickNav = () => {
    setShowMobileNav(false);
  };

  const handleLogout = () => {
    userCtx.logout();
  };

  return (
    <>
      <nav
        className={`${styles.mobileNav} ${showMobileNav ? styles.active : ""}`}
      >
        <ul className={styles.navList}>
          <li>
            <Link to={"/"} onClick={handleClickNav}>
              Home
            </Link>
          </li>
          <li>
            <Link to={"/gallery"} onClick={handleClickNav}>
              Gallery
            </Link>
          </li>

          {!userCtx.isLoggedIn ? (
            <>
              <li>
                <Link to={"/auth/login"} onClick={handleClickNav}>
                  Log in
                </Link>
              </li>
              <Button
                to={"/auth/signup"}
                label="Sign up"
                onClick={handleClickNav}
              />
            </>
          ) : (
            <>
              <li>
                <Link to={"/image/create"} onClick={handleClickNav}>
                  Create
                </Link>
              </li>
              <li>
                <Link to={`/user/${userCtx.user.id}`} onClick={handleClickNav}>
                  Profile
                </Link>
              </li>
              <li onClick={handleLogout}>Log out</li>
            </>
          )}
        </ul>
      </nav>

      <AiOutlineMenu
        className={styles.burgerButton}
        onClick={handleShowMobileNav}
      />
    </>
  );
};

export default MobileNav;

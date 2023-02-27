import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./root.module.css";

const Root = () => {
  return (
    <div className={styles.root}>
      <Navbar />
      <main className={styles.mainContainer}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;

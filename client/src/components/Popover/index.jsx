import { useState, useEffect, useRef } from "react";
import styles from "./popover.module.css";

const Popover = ({ trigger, children }) => {
  const [position, setPosition] = useState({
    direction: "Bottom",
    align: "Right",
  });

  const triggerElement = useRef();
  const popoverElement = useRef();

  useEffect(() => {
    // Check if there is enough space for the popover to render below the trigger element
    const triggerRect = triggerElement.current.getBoundingClientRect();
    const popoverRect = popoverElement.current.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (triggerRect.bottom + popoverRect.height > viewportHeight) {
      // If there is not enough space below the trigger, try rendering the popover above the trigger
      setPosition((prevState) => ({ ...prevState, direction: "Top" }));
    } else if (triggerRect.left - popoverRect.width < 0) {
      // If there is not enough space to the left of the trigger, try rendering the popover to the right of the trigger
      setPosition((prevState) => ({ ...prevState, align: "Right" }));
    } else if (triggerRect.right + popoverRect.width > viewportWidth) {
      // If there is not enough space to the right of the trigger, try rendering the popover to the left of the trigger
      setPosition((prevState) => ({ ...prevState, align: "Left" }));
    }
  }, []);

  return (
    <div className={styles.popoverWrapper}>
      <div ref={triggerElement}>{trigger}</div>
      <div
        className={
          styles.popover +
          " " +
          styles[`popover${position.direction}`] +
          " " +
          styles[`popover${position.align}`]
        }
        ref={popoverElement}
      >
        {children}
      </div>
    </div>
  );
};

export default Popover;

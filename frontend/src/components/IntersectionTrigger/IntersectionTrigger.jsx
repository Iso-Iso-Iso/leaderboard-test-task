import { useEffect, useRef } from "react";
import { Loader } from "../ui/Loader/Loader";
import styles from "./intersectionTrigger.module.css";

export const IntersectionTrigger = ({ onIntersect, scrollAreaRef }) => {
  const triggerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin: "0px", threshold: 0, root: scrollAreaRef.current },
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      if (triggerRef.current) {
        observer.unobserve(triggerRef.current);
      }
    };
  }, [onIntersect]);

  return (
    <div ref={triggerRef} className={styles.trigger}>
      <Loader />
    </div>
  );
};

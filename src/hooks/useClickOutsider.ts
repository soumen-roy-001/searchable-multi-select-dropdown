import { useEffect, useRef } from "react";

const useClickOutsider = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isClickedOutside = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback && callback();
        return;
      }
    };
    document.addEventListener("click", isClickedOutside);
    return () => {
      document.removeEventListener("click", isClickedOutside);
    };
  }, []);

  return ref;
};
export default useClickOutsider;

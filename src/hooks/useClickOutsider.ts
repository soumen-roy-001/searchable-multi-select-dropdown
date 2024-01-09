import { useEffect, RefObject } from "react";

const useClickOutsider = (
  ref: RefObject<HTMLDivElement>,
  handler: (value: boolean) => void
) => {
  useEffect(() => {
    const isClickedOutside = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler(false);
      }
    };
    document.addEventListener("click", isClickedOutside);
    return () => {
      document.removeEventListener("click", isClickedOutside);
    };
  }, [ref, handler]);
};
export default useClickOutsider;

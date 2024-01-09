import { useState, useEffect, useRef } from "react";

const useDebounce = (keyword: string, delay: number = 500) => {
  const [debouncedKeyword, setDebouncedKeyword] = useState<string>("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>();
  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedKeyword(keyword), delay);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [keyword, delay]);

  return debouncedKeyword;
};

export default useDebounce;

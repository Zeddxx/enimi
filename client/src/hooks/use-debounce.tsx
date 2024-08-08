import React from "react";

function useDebounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T {
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const debounceFunc = React.useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        func(...args);
      }, wait);
    },
    [func, wait]
  );

  return debounceFunc as T;
}

export default useDebounce;

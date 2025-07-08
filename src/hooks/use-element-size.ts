import { useState, useLayoutEffect, useCallback } from 'react';

type Size = {
  width: number;
  height: number;
};

export function useElementSize<T extends HTMLElement = HTMLDivElement>(): [
  (node: T | null) => void,
  Size,
] {
  const [ref, setRef] = useState<T | null>(null);
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  const handleSize = useCallback(() => {
    if (ref) {
      setSize({
        width: ref.offsetWidth,
        height: ref.offsetHeight,
      });
    }
  }, [ref]);

  useLayoutEffect(() => {
    handleSize();
    if (typeof ResizeObserver === 'function' && ref) {
      let resizeObserver: ResizeObserver | null = new ResizeObserver(handleSize);
      resizeObserver.observe(ref);
      return () => {
        if (resizeObserver) {
          resizeObserver.disconnect();
          resizeObserver = null;
        }
      };
    } else {
      window.addEventListener('resize', handleSize);
      return () => {
        window.removeEventListener('resize', handleSize);
      };
    }
  }, [ref, handleSize]);

  return [setRef, size];
}

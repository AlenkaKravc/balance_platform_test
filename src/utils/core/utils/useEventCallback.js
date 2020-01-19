import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

const useEnhancedEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const useEventCallback = fn => {
  const ref = useRef(fn);

  useEnhancedEffect(() => {
    ref.current = fn;
  });

  return useCallback(event => {
    return ref.current(event);
  }, []);
};

export default useEventCallback;

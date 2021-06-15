import { useEffect, useState, useCallback } from 'react';

function useWindowWidth() {
  const getWindowWidth = useCallback(() => window.innerWidth, []);
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    function handleScreenResize() {
      setWindowWidth(getWindowWidth());
    }

    let resizeDelay;

    function resizer() {
      if (!resizeDelay) {
        resizeDelay = setTimeout(() => {
          resizeDelay = null;
          handleScreenResize();
        }, 500);
      }
    }

    window.addEventListener('resize', resizer, false);

    return () => window.removeEventListener('resize', handleScreenResize);
  }, [getWindowWidth]);

  return windowWidth;
}

export default useWindowWidth;

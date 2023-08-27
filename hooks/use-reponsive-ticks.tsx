import { useEffect, useState } from 'react';

export const useResponsiveTicks = () => {
  const getNumTicks = () => {
    if (typeof window === 'undefined') {
      return 8;
    }

    const width = window.innerWidth;

    switch (true) {
      case width <= 480:
        return 2.5;
      case width <= 768:
        return 4;
      default:
        return 8;
    }
  };

  const [numTicks, setNumTicks] = useState(8);

  useEffect(() => {
    setNumTicks(getNumTicks());

    const handleResize = () => {
      setNumTicks(getNumTicks());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return numTicks;
};

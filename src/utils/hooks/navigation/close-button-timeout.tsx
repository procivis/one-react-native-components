import { useEffect, useState } from 'react';

export const useCloseButtonTimeout = (active: boolean, closeButtonHandler: () => void) => {
  const [closeTimeout, setCloseTimeout] = useState(5);

  useEffect(() => {
    if (!active) {
      return;
    }

    const interval = setInterval(() => {
      setCloseTimeout((prev) => {
        const next = prev - 1;
        return next > 0 ? next : 0;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [active]);

  useEffect(() => {
    if (active && closeTimeout === 0) {
      closeButtonHandler();
    }
  }, [closeTimeout, active, closeButtonHandler]);

  return { closeTimeout };
};

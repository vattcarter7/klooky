import { useEffect } from 'react';

export const useOutsideHandler = (ref, fn, timeout = null) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (timeout) {
          setTimeout(() => {
            fn();
          }, timeout);
        } else {
          fn();
        }
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, fn, timeout]);
};

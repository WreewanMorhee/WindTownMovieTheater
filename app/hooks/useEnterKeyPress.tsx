import { useEffect } from 'react';

function useEnterKeyPress(callback: (value: KeyboardEvent) => void) {
    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            callback(event);  
          }
      }
    

  useEffect(() => {

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [callback]);

  return null;
}

export default useEnterKeyPress;

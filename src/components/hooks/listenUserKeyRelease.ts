import { useEffect } from 'react';

const useKeyRelease = (targetKey: string, callback: () => void) => {
    useEffect(() => {
        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key === targetKey) {
                console.log(`Key ${targetKey} was release`);
                callback();
            }
        };

        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [targetKey, callback]);

    return;
};

export default useKeyRelease;
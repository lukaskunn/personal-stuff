import { useEffect } from 'react';

const useKeyPress = (targetKey: string, callback: () => void) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === targetKey) {
                console.log(`Key ${targetKey} was pressed`);
                callback();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [targetKey, callback]);

    return;
};

export default useKeyPress;
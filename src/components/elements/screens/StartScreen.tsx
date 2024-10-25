import React, { useState } from 'react';

interface StartScreenProps {
    fetchPhrases: () => void;
    setIsStarted: (isStarted: boolean) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ fetchPhrases, setIsStarted }) => {
    const [label, setLabel] = useState('Click to start');

    const handleStart = async () => {
        fetchPhrases();
        for (let i = 1; i <= 3; i++) {
            setLabel(i.toString());
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        setIsStarted(true);
    };

    return (
        <div onClick={handleStart} className="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-pointer">
            <span className={`${label !== 'Click to start' ? 'text-[45px] font-bold' : 'text-[18px]'}`}>{label}</span>
        </div>
    );
};

export default StartScreen;
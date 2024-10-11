import React from 'react'

interface StartScreenProps {
    fetchPhrases: () => void;
}
const StartScreen: React.FC<StartScreenProps> = ({ fetchPhrases }) => {

    const handleStart = () => {
        fetchPhrases();
    }

    return (
        <div onClick={handleStart} className="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-pointer">
            Click to start
        </div>
    )
}

export default StartScreen
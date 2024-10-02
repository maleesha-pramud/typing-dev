'use client'
import React, { useState, useEffect } from 'react';

function TypingTest() {
    const typingPhrases = [
        "The quick brown fox jumps over the lazy dog.",
        "Pack my box with five dozen liquor jugs.",
        "How razorback-jumping frogs can level six piqued gymnasts!",
        "The five boxing wizards jump quickly.",
        "Sphinx of black quartz, judge my vow.",
        "Cozy lummox gives smart squid who asks for job pen.",
        "The jay, pig, fox, zebra and my wolves quack!",
        "Bright vixens jump; dozy fowl quack.",
        "Grumpy wizards make toxic brew for the evil queen and jack.",
        "The quick brown fox jumps over the lazy dog."
    ]

    const [text, setText] = useState(typingPhrases[0]);
    const [userInput, setUserInput] = useState('');
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0);

    useEffect(() => {
        if (isTyping && userInput.length > currentCharIndex) {
            const isCorrect = userInput[currentCharIndex] === text[currentCharIndex];
            setCurrentCharIndex(currentCharIndex + 1);
            setAccuracy((accuracy * currentCharIndex + (isCorrect ? 1 : 0)) / (currentCharIndex + 1));
        }
    }, [userInput, currentCharIndex, isTyping, text]);

    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setUserInput(event.target.value);
        if (!isTyping) {
            setIsTyping(true);
            setStartTime(Date.now());
        }
    };

    const handleFinish = () => {
        setIsTyping(false);
        setEndTime(Date.now());
        const timeTakenInSeconds = (endTime - startTime) / 1000;
        const wordsTyped = userInput.split(' ').length;
        setWpm(Math.round(wordsTyped / (timeTakenInSeconds / 60)));
    };

    const handleRestart = () => {
        setUserInput('');
        setCurrentCharIndex(0);
        setIsTyping(false);
        setStartTime(0);
        setEndTime(0);
        setWpm(0);
        setAccuracy(0);
        setText(typingPhrases[Math.floor(Math.random() * typingPhrases.length)]);
    };

    return (
        <div>
            <h1>Typing Test</h1>
            <p>{text}</p>
            <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                className='text-black'
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        handleFinish();
                    }
                }}
            />
            <p>WPM: {wpm}</p>
            <p>Accuracy: {accuracy}%</p>
            <button onClick={handleRestart}>Restart</button>
        </div>
    );
}

export default TypingTest;
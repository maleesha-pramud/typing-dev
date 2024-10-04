'use client'
import React, { useState, useEffect } from 'react';
import phraseGenerator from '@/utils/phraseGenerator';

function TypingTest() {
    const [phrasesArray, setPhrasesArray] = useState<string[]>();

    const [phrase, setPhrase] = useState<any>(null);
    const [userInput, setUserInput] = useState('');
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const [startCountDown, setStartCountDown] = useState<NodeJS.Timeout>();
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0);

    useEffect(() => {
        if (isTyping) {
            if (userInput.length > currentCharIndex) {
                const isCorrect = userInput[currentCharIndex] === phrase.string[currentCharIndex];
                // console.log(userInput[currentCharIndex], phrase.string[currentCharIndex]);
                if (isCorrect) {
                    handleMakeCharCorrect(currentCharIndex);
                    // console.log(phrase.string.length, userInput.length)
                    if (phrase.string.length === userInput.length) {
                        handleFinish();
                    }
                } else {
                    handleMakeCharIncorrect(currentCharIndex);
                }
                setCurrentCharIndex(currentCharIndex + 1);
                setAccuracy((accuracy * currentCharIndex + (isCorrect ? 100 : 0)) / (currentCharIndex + 1));
            }
        }
    }, [userInput, isTyping, phrase]);

    useEffect(() => {
        if (phrasesArray && phrasesArray.length > 0) {
            setPhrase({
                string: phrasesArray[0],
                array: phrasesArray[0].split('')
            });
        }

    }, [phrasesArray])

    const handleMakeCharIncorrect = (index: number) => {
        const phraseContainer = document.getElementById('phrase');
        if (phraseContainer) {
            const charElement = phraseContainer.children[index];
            if (charElement) {
                charElement.classList.add('text-red-500', 'bg-red-500', 'bg-opacity-20');
            }
        }
    }

    const handleMakeCharCorrect = (index: number) => {
        const phraseContainer = document.getElementById('phrase');
        if (phraseContainer) {
            const charElement = phraseContainer.children[index];
            if (charElement) {
                charElement.classList.remove('text-red-500', 'bg-red-500', 'bg-opacity-20');
                charElement.classList.add('text-green-500');
            }
        }
    }

    const handleMakeAllNormal = () => {
        const phraseContainer = document.getElementById('phrase');
        if (phraseContainer) {
            for (let i = 0; i < phraseContainer.children.length; i++) {
                phraseContainer.children[i].classList.remove('text-red-500', 'bg-red-500', 'bg-opacity-20');
                phraseContainer.children[i].classList.remove('text-green-500');
            }
        }
    }

    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setUserInput(event.target.value);
        if (!isTyping) {
            setIsTyping(true);
            const intervalId = setInterval(() => {
                setSecondsElapsed((prevSeconds) => prevSeconds + 1);
            }, 1000);
            setStartCountDown(intervalId);
        }
    };

    const handleFinish = () => {
        console.log('finished')
        setIsTyping(false);
        clearInterval(startCountDown);
        const wordsTyped = userInput.split(' ').length;
        setWpm(Math.round(wordsTyped / (secondsElapsed / 60)));
    };

    const handleRestart = () => {
        setUserInput('');
        setCurrentCharIndex(0);
        setIsTyping(false);
        setSecondsElapsed(0);
        clearInterval(startCountDown);
        setWpm(0);
        setAccuracy(0);
        handleGetNextPhrase();
        handleMakeAllNormal();
    };

    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (isTyping) {
                handleFinish();
            } else {
                handleRestart();
            }
        }
    }

    const fetchPhrases = async () => {
        const generatedPhrase = await phraseGenerator(100, 'programmer', 'easy');
        const trimmedPhrases = generatedPhrase.map((phrase: string) => phrase.trim());
        console.log(trimmedPhrases);
        setPhrasesArray(trimmedPhrases);
    };

    const handleGetNextPhrase = () => {
        if(!phrasesArray) return;
        const index = phrasesArray.findIndex((item) => item === phrase?.string) + 1;
        console.log('index',index)
        if (index < phrasesArray.length) {
            setPhrase({
                string: phrasesArray[index],
                array: phrasesArray[index].split('')
            });
        } else {
            fetchPhrases();
        }
    }

    return (
        <div className='p-[50px]'>
            <p className='text-[20px] text-gray-400' id='phrase'>
                {phrase?.array?.map((item: string, index: number) => (
                    <span key={index} className=''>{item}</span>
                ))}
            </p>
            <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                className='w-full px-4 py-2 text-white bg-[#0a0a0ae8]'
                onKeyDown={handleEnterPress}
            />
            <div className="mt-5">
                <p>WPM: {wpm}</p>
                <p>Accuracy: {accuracy}%</p>
                <p>TIme: {secondsElapsed}</p>
                <div className="flex justify-end gap-4 items-center">
                    {!phrase ? (
                        <button onClick={fetchPhrases} className='px-4 py-2 rounded-[6px] bg-gray-400 text-black'>Start</button>
                    ) : (
                        <button onClick={handleRestart} className='px-4 py-2 rounded-[6px] bg-gray-400 text-black'>Restart</button>
                    )}
                    {isTyping && (
                        <button onClick={handleFinish} className='px-4 py-2 rounded-[6px] bg-gray-400 text-black'>Finish</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TypingTest;
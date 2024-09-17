import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import swipeIcon from '../../assets/swipe-icon.svg';
import './PlayScreen.css';

Chart.register(ArcElement, Tooltip, Legend);

function PlayScreen({ selectedCollection, setScreen }) {
    const [wordIndex, setWordIndex] = useState(0);
    const [knownWords, setKnownWords] = useState([]);
    const [unknownWords, setUnknownWords] = useState([]);
    const [swipeCount, setSwipeCount] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [retryMode, setRetryMode] = useState(false);
    const [touchStartX, setTouchStartX] = useState(null);
    const [touchEndX, setTouchEndX] = useState(null);
    const [animationClass, setAnimationClass] = useState('');

    const words = retryMode ? unknownWords : selectedCollection.words;

    const handleSwipeLeft = () => {
        const currentWord = words[wordIndex];
        if (!unknownWords.includes(currentWord)) {
            setUnknownWords((prev) => [...prev, currentWord]);
        }

        setAnimationClass('slide-out-left');
        setTimeout(() => goToNextWord(), 500);
    };

    const handleSwipeRight = () => {
        const currentWord = words[wordIndex];
        if (!knownWords.includes(currentWord)) {
            setKnownWords((prev) => [...prev, currentWord]);
        }

        if (retryMode) {
            setUnknownWords((prev) => prev.filter((word) => word !== currentWord));
        }

        setAnimationClass('slide-out-right');
        setTimeout(() => goToNextWord(), 500);
    };

    const goToNextWord = () => {
        setSwipeCount((prev) => prev + 1);
        setIsFlipped(false);
        setAnimationClass('');

        if (swipeCount + 1 >= words.length) return;

        setWordIndex((prev) => (prev + 1) % words.length);
    };

    const toggleFlip = () => {
        setIsFlipped((prev) => !prev);
    };

    const retryUnlearnedWords = () => {
        setRetryMode(true);
        setWordIndex(0);
        setSwipeCount(0);
        setKnownWords([]);
    };

    const getKnownPercentage = () => {
        const totalWords = retryMode ? unknownWords.length : selectedCollection.words.length;
        return totalWords > 0 ? Math.round((knownWords.length / totalWords) * 100) : 0;
    };

    const getUnknownPercentage = () => {
        const totalWords = retryMode ? unknownWords.length : selectedCollection.words.length;
        const unknownCount = totalWords - knownWords.length;
        return totalWords > 0 ? Math.round((unknownCount / totalWords) * 100) : 0;
    };

    const handleTouchStart = (e) => {
        setTouchStartX(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEndX(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStartX && touchEndX) {
            const difference = touchStartX - touchEndX;
            if (difference > 50) {
                handleSwipeLeft();
            } else if (difference < -50) {
                handleSwipeRight();
            }
        }
        setTouchStartX(null);
        setTouchEndX(null);
    };

    const data = {
        labels: ['Known', 'Still Learning'],
        datasets: [
            {
                data: [getKnownPercentage(), getUnknownPercentage()],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    return (
        <div className="container play-screen">
            <div className="top-bar">
                <i className="fa-solid fa-xmark fa-2x text-mode-color" onClick={() => setScreen('collectionDetails')}></i>
            </div>

            <div className="counters">
                <span className='counter unknown-words-counter'>{unknownWords.length}</span>
                <span className='collection-descr'>{Math.min(swipeCount + 1, words.length)}/{words.length}</span>
                <span className='counter known-words-counter'>{knownWords.length}</span>
            </div>

            {swipeCount < words.length ? (
                <div
                    className="card-container"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className={`word-card ${isFlipped ? 'flipped' : ''} ${animationClass}`}>
                        <div className="card-face front">
                            <strong>{words[wordIndex]?.word}</strong>
                        </div>
                        <div className="card-face back">
                            <strong>{words[wordIndex]?.definition || 'No definition available'}</strong>
                        </div>
                        <i className="fa-solid fa-arrows-rotate flip-icon text-mode-color" onClick={toggleFlip}></i>
                    </div>
                    <div className='game-navigation-content'>
                        <span className='text-mode-color'>Swipe left to mark as Still learning</span>
                        <span className='text-mode-color'>Swipe right to mark as Known</span>
                        <div className="swipe-controls">
                            <img src={swipeIcon} alt="Swipe Icon" className='text-mode-color' />
                            <div className="swipe-buttons">
                                <button onClick={handleSwipeLeft} className='btn text-mode-color'>Still Learning</button>
                                <button onClick={handleSwipeRight} className='btn text-mode-color'>Known</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="stats-container">
                    <div className="chart-container">
                        <Doughnut data={data} />
                        <div>
                            <p>{getKnownPercentage()}% - Known</p>
                            <p>{getUnknownPercentage()}% - Still Learning</p>
                        </div>
                        {unknownWords.length > 0 && (
                            <button className="retry-button btn text-mode-color" onClick={retryUnlearnedWords}>
                                Retry Unlearned Words
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PlayScreen;

import React, { useState } from 'react';
import swipeIcon from '../../assets/swipe-icon.svg';
import closeIcon from '../../assets/close.svg';
import flipIcon from '../../assets/flip.svg';
import './PlayScreen.css';

function PlayScreen({ selectedCollection, setScreen }) {
    const [wordIndex, setWordIndex] = useState(0);
    const [knownWords, setKnownWords] = useState([]);
    const [unknownWords, setUnknownWords] = useState([]);
    const [swipeDirection, setSwipeDirection] = useState(null);
    const [swipeCount, setSwipeCount] = useState(0);

    const words = selectedCollection.words;

    const handleSwipeLeft = () => {
        setSwipeDirection('left');
        const currentWord = words[wordIndex];
        setUnknownWords((prev) => [...prev, currentWord]);

        setTimeout(() => goToNextWord(), 500);
    };

    const handleSwipeRight = () => {
        setSwipeDirection('right');
        const currentWord = words[wordIndex];
        setKnownWords((prev) => [...prev, currentWord]);

        setTimeout(() => goToNextWord(), 500);
    };

    const goToNextWord = () => {
        setSwipeDirection(null);
        setSwipeCount((prev) => prev + 1);

        if (swipeCount + 1 >= words.length) {
            return;
        }

        setWordIndex((prev) => (prev + 1) % words.length);
    };

    return (
        <div className="container play-screen">
            <div className="top-bar">
                <img src={closeIcon} alt="Close Icon" onClick={() => setScreen('collectionDetails')} />
            </div>

            <div className="counters">
                <span className='counter unknown-words-counter'>{unknownWords.length}</span>
                <span className='collection-descr'>{Math.min(swipeCount + 1, words.length)}/{words.length}</span> {/* Limit the count */}
                <span className='counter known-words-counter'>{knownWords.length}</span>
            </div>

            {swipeCount < words.length ? (
                <div className="card-container">
                    <div className={`word-card ${swipeDirection === 'left' ? 'slide-out-left' : swipeDirection === 'right' ? 'slide-out-right' : ''}`}>
                        <strong>{words[wordIndex]?.word}</strong>
                        <img src={flipIcon} alt='Flip card' className='flip-icon' />
                    </div>
                    <div className='game-navigation-content'>
                        <span>Swipe left to mark as Still learning</span>
                        <span>Swipe right to mark as Known</span>
                        <div className="swipe-controls">
                            <img src={swipeIcon} alt="Swipe Icon" />
                            <div className="swipe-buttons">
                                <button onClick={handleSwipeLeft} className='btn'>Still Learning</button>
                                <button onClick={handleSwipeRight} className='btn'>Known</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>All words have been marked as Known or Still Learning</p>
            )}
        </div>
    );
}

export default PlayScreen;

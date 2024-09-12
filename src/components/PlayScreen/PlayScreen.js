import React, { useState } from 'react';
import swipeIcon from '../../assets/swipe-icon.svg';
import closeIcon from '../../assets/close.svg';
import './PlayScreen.css';

function PlayScreen({ selectedCollection, setScreen }) {
    const [wordIndex, setWordIndex] = useState(0);
    const [knownWords, setKnownWords] = useState([]);
    const [unknownWords, setUnknownWords] = useState([]);
    const [activeWords, setActiveWords] = useState(selectedCollection.words);

    const handleSwipeLeft = () => {
        const currentWord = activeWords[wordIndex];
        setUnknownWords((prev) => [...prev, currentWord]);

        goToNextWord();
    };

    const handleSwipeRight = () => {
        const currentWord = activeWords[wordIndex];
        setKnownWords((prev) => [...prev, currentWord]);

        setActiveWords((prevWords) => prevWords.filter((_, i) => i !== wordIndex));

        goToNextWord();
    };

    const goToNextWord = () => {
        if (activeWords.length > 1) {
            setWordIndex((prev) => (prev + 1) % activeWords.length);
        } else {
            setWordIndex(0);
        }
    };

    return (
        <div className="container play-screen">
            <div className="top-bar">
                <img src={closeIcon} alt="Close Icon" onClick={() => setScreen('collectionDetails')} />
            </div>

            <div className="counters">
                <span className='counter unknown-words-counter'>{unknownWords.length}</span>
                <span className='collection-descr'>{activeWords.length}</span>
                <span className='counter known-words-counter'>{knownWords.length}</span>
            </div>

            {activeWords.length > 0 ? (
                <div className="card-container">
                    <div className="word-card">
                        <strong>{activeWords[wordIndex].word}</strong>
                    </div>
                    <div className='game-navigation-content'>
                        <span>Swipe left to mark as Still learning</span>
                        <span>Swipe right to mark as Known</span>
                        <div className="swipe-controls">
                            <img src={swipeIcon} alt="Swipe Icon" />
                            <div className="swipe-buttons">
                                <button onClick={handleSwipeLeft}>Still Learning</button>
                                <button onClick={handleSwipeRight}>Known</button>
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

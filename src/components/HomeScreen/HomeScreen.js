import React from 'react';
import Button from '../Button/Button.js';
import AppHeader from '../AppHeader/AppHeader.js';

function HomeScreen({ collections, openCollection, setScreen }) {
    return (
        <>
            {collections.length === 0 ? (
                <div className='container home-screen'>
                    <AppHeader/>
                    <h1>App Icon</h1>
                    <h2>Welcome to Flip That!</h2>
                    <h2>✔ Create custom flashcards easily</h2>
                    <h2>✔ Track your learning progress</h2>
                    <h2>✔ Interactive memorization sessions</h2>
                    <p className='collection-descr'>You don't have any collections yet.</p>
                    <Button label="Create Collection" onClick={() => setScreen('create')} className='btn' />
                </div>
            ) : (
                <div className='container home-screen-content'>
                    <div className='title-container'>
                        <h1>Your Collections</h1>
                        <Button 
                            label="Add New" 
                            onClick={() => setScreen('create')} 
                            className='link-btn' 
                        />
                    </div>
                    <div className="collection-list">
                        {collections.map((collection, index) => (
                            <div 
                                key={index}
                                className="collection-card"
                                onClick={() => openCollection(collection)}
                            >
                                <div>
                                    <h3 className='collection-name'>{collection.name}</h3>
                                    <p>{collection.words.length} {collection.words.length === 1 ? 'word' : 'words'}</p>
                                </div>
                                <div>
                                    <i className="fa-solid fa-chevron-right fa-lg text-mode-color"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default HomeScreen;

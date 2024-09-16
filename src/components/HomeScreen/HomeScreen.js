import React from 'react';
import arrowRight from '../../assets/arrow-right.svg';
import Button from '../Button/Button.js';

function HomeScreen({ collections, openCollection, setScreen }) {
    return (
        <>
            {collections.length === 0 ? (
                <div className='container home-screen'>
                    <h1>Your Collections</h1>
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
                                    <img src={arrowRight} alt='Arrow right' className='text-mode-color'/>
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

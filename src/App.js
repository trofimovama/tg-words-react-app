import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import './components/HomeScreen/HomeScreen.css';
import './components/Button/Button.css';
import './components/CreateCollectionScreen/CreateCollection.css';
import './components/CollectionDetailsScreen/CollectionDetails.css';
import arrowRight from './assets/arrow-right.svg';
import arrowLeft from './assets/arrow-left.svg';
import editIcon from './assets/edit.svg';
import removeIcon from './assets/delete.svg';
import menuIcon from './assets/menu.svg';

const tg = window.Telegram.WebApp;

function App() {
    const [screen, setScreen] = useState('home');
    const [collections, setCollections] = useState([]);
    const [newCollectionName, setNewCollectionName] = useState('');
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [newWord, setNewWord] = useState('');
    const [newDefinition, setNewDefinition] = useState('');
    const [wordType, setWordType] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {
        tg.ready();
        const savedCollections = localStorage.getItem('collections');
        if (savedCollections) {
            setCollections(JSON.parse(savedCollections));
        }
    }, []);

    useEffect(() => {
        if (collections.length > 0) {
            localStorage.setItem('collections', JSON.stringify(collections));
        }
    }, [collections]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuVisible(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const renderHomeScreen = () => (
        <div className="container home-screen">
            <h1>Your Collections</h1>
            {collections.length === 0 ? (
                <p>You don't have any collections yet.</p>
            ) : (
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
                                <img src={arrowRight} alt='Arrow right'/>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <button className="btn" onClick={() => setScreen('create')}>Create Collection</button>
        </div>
    );    

    const renderCreateCollectionScreen = () => (
        <div className="container new-collection">
            <div className="header">
                <div className='back-btn-container'>
                    <img src={arrowLeft} alt='Arrow left'/>
                    <button className="btn-back" onClick={() => setScreen('home')}>Back</button>
                </div>
                <h1>Create New Collection</h1>
            </div>
            <div>
                <h3 className='new-collection-title'>Enter a name for your new collection. You can rename it later.</h3>
                <input 
                    type="text" 
                    placeholder="Collection Name"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)} 
                />
            </div>
            <button className="btn" onClick={saveNewCollection}>Save</button>
        </div>
    );    

    const saveNewCollection = () => {
        if (newCollectionName.trim()) {
            setCollections([...collections, { name: newCollectionName, words: [] }]);
            setNewCollectionName('');
            setScreen('home');
        }
    };

    const openCollection = (collection) => {
        setSelectedCollection(collection);
        setScreen('collectionDetails');
    };

    const renderCollectionDetailsScreen = () => (
        <div className="container add-word-container">
            <div className='top-collection-name'>
                <div class='section-title'>
                    <h1>{selectedCollection.name}</h1>
                    <img src={menuIcon} alt='Menu icon' onClick={toggleMenu} className='menu' />
                </div>
                {menuVisible && (
                    <div className='edit-remove-group' ref={menuRef}>
                        <div className='edit-group-button'>
                            <img src={editIcon} alt='Edit icon' />
                            <button className="link-btn" onClick={editCollectionName}>Edit Name</button>
                        </div>
                        <div className='remove-group-button'>
                            <img src={removeIcon} alt='Remove icon' />
                            <button className="link-btn" onClick={deleteCollection}>Delete Collection</button>
                        </div>
                    </div>
                )}
            </div>
            
            {selectedCollection.words.length === 0 ? (
                <p className='collection-desc'>You haven't added anything to this collection yet.</p>
            ) : (
            <ul>
                {selectedCollection.words.map((word, index) => (
                <li key={index}>
                    <strong>{word.word}</strong> ({word.type}) - {word.definition}
                </li>
                ))}
            </ul>
            )}
            
            <button className="btn" onClick={() => setScreen('addWord')}>Add Word</button>
        </div>
    );

    const renderAddWordScreen = () => (
        <div className="App container">
            <h1>Add new word</h1>
            <input 
            type="text" 
            placeholder="Word"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)} 
            />
            <input 
            type="text" 
            placeholder="Definition"
            value={newDefinition}
            onChange={(e) => setNewDefinition(e.target.value)} 
            />

            <div className="wordTypeButtons">
            <button 
                className={wordType === 'Verb' ? 'selected' : ''}
                onClick={() => setWordType('Verb')}
            >
                Verb
            </button>
            <button 
                className={wordType === 'Noun' ? 'selected' : ''}
                onClick={() => setWordType('Noun')}
            >
                Noun
            </button>
            <button 
                className={wordType === 'Adj.' ? 'selected' : ''}
                onClick={() => setWordType('Adj.')}
            >
                Adj.
            </button>
            <button 
                className={wordType === 'Adv.' ? 'selected' : ''}
                onClick={() => setWordType('Adv.')}
            >
                Adv.
            </button>
            </div>

            <button className="btn" onClick={addWordToCollection}>Save</button>
            <button className="btn" onClick={() => setScreen('collectionDetails')}>Back</button>
        </div>
    );

    const addWordToCollection = () => {
        if (newWord.trim() && newDefinition.trim() && wordType) {
            const updatedCollection = { 
                ...selectedCollection, 
                words: [...selectedCollection.words, { word: newWord, definition: newDefinition, type: wordType }] 
            };
            setCollections(collections.map(col => col === selectedCollection ? updatedCollection : col));
            setSelectedCollection(updatedCollection);
            setNewWord('');
            setNewDefinition('');
            setWordType('');
            setScreen('collectionDetails');
        } else {
            alert("Please fill out all fields and select a word type.");
        }
    };

    const editCollectionName = () => {
        const newName = prompt('Enter new name for collection:', selectedCollection.name);
        if (newName) {
            setCollections(collections.map((col) => col === selectedCollection ? { ...col, name: newName } : col));
            setSelectedCollection({ ...selectedCollection, name: newName });
        }
    };

    const deleteCollection = () => {
        setCollections(collections.filter((col) => col !== selectedCollection));
        setScreen('home');
    };

    return (
        <div className="App container">
            {screen === 'home' && renderHomeScreen()}
            {screen === 'create' && renderCreateCollectionScreen()}
            {screen === 'collectionDetails' && renderCollectionDetailsScreen()}
            {screen === 'addWord' && renderAddWordScreen()}
        </div>
    );
}

export default App;

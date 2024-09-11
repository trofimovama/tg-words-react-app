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
import playIcon from './assets/play.svg';

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
    const [editNameMode, setEditNameMode] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [editWordIndex, setEditWordIndex] = useState(null);
    const [confirmDeleteWord, setConfirmDeleteWord] = useState(false);

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

    const openEditWordScreen = (wordIndex) => {
        const selectedWord = selectedCollection.words[wordIndex];
        setNewWord(selectedWord.word);
        setNewDefinition(selectedWord.definition);
        setWordType(selectedWord.type);
        setEditWordIndex(wordIndex);
        setScreen('editWord');
    };

    const renderCollectionDetailsScreen = () => (
        <div className="container add-word-container">
            <div className='top-collection-name'>
                <div className='section-title'>
                    <button className="btn-back" onClick={() => setScreen('home')}>
                        <img src={arrowLeft} alt='Arrow left'/> Back
                    </button>
                    <h1>{selectedCollection.name}</h1>
                    <img src={menuIcon} alt='Menu icon' onClick={toggleMenu} className='menu' />
                </div>
                {menuVisible && (
                    <div className='edit-remove-group' ref={menuRef}>
                        <div className='edit-group-button'>
                            <img src={editIcon} alt='Edit icon' />
                            <button className="link-btn" onClick={() => setEditNameMode(true)}>Edit Name</button>
                        </div>
                        <div className='remove-group-button'>
                            <img src={removeIcon} alt='Remove icon' />
                            <button className="link-btn" onClick={() => setConfirmDelete(true)}>Delete Collection</button>
                        </div>
                    </div>
                )}
            </div>
            
            {selectedCollection.words.length === 0 ? (
                <p className='collection-desc'>You haven't added anything to this collection yet.</p>
            ) : (
                <div className='collection-content'>
                    <button className="btn btn-play" onClick={() => console.log("Play")}>
                        <img src={playIcon} alt='Play icon'/>
                        <span>Play</span>
                    </button>
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Search" 
                    />
                    <ul className='word-list'>
                        {selectedCollection.words.map((word, index) => (
                            <li key={index} className='word-item' onClick={() => openEditWordScreen(index)}>
                                <strong>{word.word}</strong> ({word.type}) - {word.definition}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            <button className="btn add-word-btn" onClick={() => setScreen('addWord')}>Add Word</button>
        </div>
    );
    
    const renderAddWordScreen = () => (
        <div className="container add-word-screen">
            <div className='add-word-content'>
                <div className='back-btn-container'>
                    <img src={arrowLeft} alt='Arrow left'/>
                    <button className="btn-back" onClick={() => setScreen('collectionDetails')}>{selectedCollection.name}</button>
                </div>
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
            </div>
            <button className="btn" onClick={addWordToCollection}>Save</button>
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

    const saveEditedWord = () => {
        if (newWord.trim() && newDefinition.trim() && wordType) {
            const updatedWords = [...selectedCollection.words];
            updatedWords[editWordIndex] = { word: newWord, definition: newDefinition, type: wordType };
            const updatedCollection = { ...selectedCollection, words: updatedWords };
            setCollections(collections.map(col => col === selectedCollection ? updatedCollection : col));
            setSelectedCollection(updatedCollection);
            setScreen('collectionDetails');
        } else {
            alert("Please fill out all fields and select a word type.");
        }
    };

    const deleteWord = () => {
        const updatedWords = selectedCollection.words.filter((_, index) => index !== editWordIndex);
        const updatedCollection = { ...selectedCollection, words: updatedWords };
        setCollections(collections.map(col => col === selectedCollection ? updatedCollection : col));
        setSelectedCollection(updatedCollection);
        setConfirmDeleteWord(false);
        setScreen('collectionDetails');
    };

    const renderEditWordScreen = () => (
        <div className="container edit-word-screen">
            <div className='back-btn-container'>
                <img src={arrowLeft} alt='Arrow left'/>
                <button className="btn-back" onClick={() => setScreen('collectionDetails')}>{selectedCollection.name}</button>
            </div>
            <div className='edit-word-title'>
                <h1>Edit Word</h1>
                <img src={removeIcon} alt="Delete icon" onClick={() => setConfirmDeleteWord(true)} />
            </div>
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
            <button className="btn" onClick={saveEditedWord}>Save</button>
        </div>
    );

    const renderDeleteWordConfirmationScreen = () => (
        <div className="container delete-confirmation">
            <div className="header">
                <div className='back-btn-container'>
                    <img src={arrowLeft} alt='Arrow left'/>
                    <button className="btn-back" onClick={() => setConfirmDeleteWord(false)}>Back</button>
                </div>
                <h1>Delete Word</h1>
            </div>
            <div className="confirmation-block">
                <p className="confirm-message">Delete ‘{newWord}’? This action can’t be undone.</p>
                <div className="confirmation-buttons">
                    <button className="btn-cancel" onClick={() => setConfirmDeleteWord(false)}>Cancel</button>
                    <button className="btn-danger" onClick={deleteWord}>Delete</button>
                </div>
            </div>
        </div>
    );

    const renderEditNameScreen = () => (
        <div className="container edit-name-screen">
            <h1>Edit Collection Name</h1>
            <input 
                type="text" 
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)} 
                placeholder="New Collection Name"
            />
            <button className="btn" onClick={saveCollectionName}>Save</button>
        </div>
    );

    const saveCollectionName = () => {
        if (editedName.trim()) {
            const updatedCollection = { ...selectedCollection, name: editedName };
            setCollections(collections.map(col => col === selectedCollection ? updatedCollection : col));
            setSelectedCollection(updatedCollection);
            setEditNameMode(false);
        }
    };

    const deleteCollection = () => {
        setCollections(collections.filter(col => col !== selectedCollection));
        setSelectedCollection(null);
        setConfirmDelete(false);
        setScreen('home');
    };

    const renderDeleteConfirmationScreen = () => (
        <div className="container delete-confirmation">
            <div className="header">
                <div className='back-btn-container'>
                    <img src={arrowLeft} alt='Arrow left'/>
                    <button className="btn-back" onClick={() => setConfirmDelete(false)}>Back</button>
                </div>
                <h1>Delete Collection</h1>
            </div>
            <div className="confirmation-block">
                <p className="confirm-message">Delete ‘{selectedCollection.name}’? This action can’t be undone.</p>
                <div className="confirmation-buttons">
                    <button className="btn-cancel" onClick={() => setConfirmDelete(false)}>Cancel</button>
                    <button className="btn-danger" onClick={deleteCollection}>Delete</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="App container">
            {screen === 'home' && renderHomeScreen()}
            {screen === 'create' && renderCreateCollectionScreen()}
            {screen === 'collectionDetails' && !editNameMode && !confirmDelete && renderCollectionDetailsScreen()}
            {screen === 'addWord' && renderAddWordScreen()}
            {screen === 'editWord' && renderEditWordScreen()}
            {editNameMode && renderEditNameScreen()}
            {confirmDelete && renderDeleteConfirmationScreen()}
            {confirmDeleteWord && renderDeleteWordConfirmationScreen()}
        </div>
    );
}

export default App;

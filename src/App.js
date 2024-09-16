import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import './components/HomeScreen/HomeScreen.css';
import './components/Button/Button.css';
import './components/CreateCollectionScreen/CreateCollection.css';
import './components/CollectionDetailsScreen/CollectionDetails.css';

import HomeScreen from './components/HomeScreen/HomeScreen.js';
import CreateCollectionScreen from './components/CreateCollectionScreen/CreateCollectionScreen.js';
import CollectionDetailsScreen from './components/CollectionDetailsScreen/CollectionDetailsScreen.js';
import AddWordScreen from './components/AddWordScreen/AddWordScreen.js';
import EditWordScreen from './components/EditWordScreen/EditWordScreen.js';
import Button from './components/Button/Button.js';
import Alert from './components/Alert/Alert.js';
import PlayScreen from './components/PlayScreen/PlayScreen.js';

import arrowLeft from './assets/arrow-left.svg';

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
    const [alertMessage, setAlertMessage] = useState(null);
    const [wordInputError, setWordInputError] = useState(false);
    const [definitionInputError, setDefinitionInputError] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {
        tg.ready();
        const savedCollections = localStorage.getItem('collections');
        if (savedCollections) {
            setCollections(JSON.parse(savedCollections));
        }
    }, []);

    useEffect(() => {
        if (collections.length === 0) {
            localStorage.removeItem('collections');
        } else {
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

    useEffect(() => {
        if (screen !== 'addWord') {
            setNewWord('');
            setNewDefinition('');
            setWordType('');
            setWordInputError(false);
        }
    }, [screen]);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const saveNewCollection = () => {
        if (newCollectionName.trim() === '') {
            setAlertMessage('Collection name cannot be empty.');
            return;
        }
        setCollections([...collections, { name: newCollectionName, words: [] }]);
        setNewCollectionName('');
        setScreen('home');
    };

    const openCollection = (collection) => {
        setSelectedCollection(collection);
        setScreen('collectionDetails');
    };

    const openEditWordScreen = (wordIndex) => {
        const selectedWord = selectedCollection.words[wordIndex];

        setNewWord(selectedWord.word || '');
        setNewDefinition(selectedWord.definition || '');
        setWordType(selectedWord.type || '');
        setEditWordIndex(wordIndex);
        setScreen('editWord');
    };
    
    const addWordToCollection = () => {
        let hasError = false;
    
        if (newWord.trim() === '') {
            setWordInputError(true);
            hasError = true;
        } else {
            setWordInputError(false);
        }
    
        if (newDefinition.trim() === '') {
            setDefinitionInputError(true);
            hasError = true;
        } else {
            setDefinitionInputError(false);
        }
    
        if (hasError) return;
    
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
    };
    
    const saveEditedWord = () => {
        const updatedWords = [...selectedCollection.words];
        
        const updatedWord = {
            word: newWord || selectedCollection.words[editWordIndex].word,
            definition: newDefinition !== "" ? newDefinition : selectedCollection.words[editWordIndex].definition,  // Preserve definition if unchanged
            type: wordType || selectedCollection.words[editWordIndex].type
        };
    
        updatedWords[editWordIndex] = updatedWord;
    
        const updatedCollection = { ...selectedCollection, words: updatedWords };
        setCollections(collections.map(col => col === selectedCollection ? updatedCollection : col));
        setSelectedCollection(updatedCollection);
        setScreen('collectionDetails');
    };    

    const deleteWord = () => {
        const updatedWords = selectedCollection.words.filter((_, index) => index !== editWordIndex);
        const updatedCollection = { ...selectedCollection, words: updatedWords };
        setCollections(collections.map(col => col === selectedCollection ? updatedCollection : col));
        setSelectedCollection(updatedCollection);
        setConfirmDeleteWord(false);
        setScreen('collectionDetails');
    };

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
            <div className="back-btn-container">
                <Button
                    label="Back"
                    onClick={() => {
                        setEditNameMode(false);
                        setMenuVisible(false);
                    }}
                    className="link-btn"
                    icon={arrowLeft}
                />
            </div>
            <h1>Edit Collection Name</h1>
            <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder={selectedCollection ? selectedCollection.name : 'New Collection Name'}
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
        const updatedCollections = collections.filter(col => col !== selectedCollection);
    
        setCollections(updatedCollections);
        setSelectedCollection(null);
        setConfirmDelete(false);
        
        if (updatedCollections.length > 0) {
            localStorage.setItem('collections', JSON.stringify(updatedCollections));
        } else {
            localStorage.removeItem('collections');
        }
    
        setScreen('home');
    };

    const renderDeleteConfirmationScreen = () => (
        <div className="container delete-confirmation">
            <div className="header">
                <div className='back-btn-container'>
                    <img src={arrowLeft} alt='Arrow left' />
                    <button className="btn-back" onClick={() => {
                        setConfirmDelete(false)
                        setMenuVisible(false);
                    }}>Back</button>
                </div>
                <h1>{selectedCollection.name}</h1>
            </div>
            <div className="confirmation-block">
                <p className="confirm-message">Delete ‘{selectedCollection.name}’? This action can’t be undone.</p>
                <div className="confirmation-buttons">
                    <button className="link-btn" onClick={() => {
                            setConfirmDelete(false)
                            setMenuVisible(false);
                        }}>Cancel</button>
                    <button className="link-btn" onClick={deleteCollection}>Delete</button>
                </div>
            </div>
        </div>
    );    

    return (
        <div className="App container">
            {screen === 'home' && <HomeScreen collections={collections} openCollection={openCollection} setScreen={setScreen} />}
            {screen === 'create' && <CreateCollectionScreen 
                newCollectionName={newCollectionName}
                setNewCollectionName={setNewCollectionName}
                saveNewCollection={saveNewCollection}
                setScreen={setScreen}
            />}
            {screen === 'collectionDetails' && !editNameMode && !confirmDelete && (
                <CollectionDetailsScreen 
                    selectedCollection={selectedCollection}
                    menuVisible={menuVisible}
                    toggleMenu={toggleMenu}
                    openEditWordScreen={openEditWordScreen}
                    setScreen={setScreen}
                    setConfirmDelete={setConfirmDelete}
                    setEditNameMode={setEditNameMode}
                    menuRef={menuRef}
                />
            )}
            {screen === 'addWord' && (
                <AddWordScreen
                    newWord={newWord}
                    setNewWord={setNewWord}
                    newDefinition={newDefinition}
                    setNewDefinition={setNewDefinition}
                    wordType={wordType}
                    setWordType={setWordType}
                    addWordToCollection={addWordToCollection}
                    setScreen={setScreen}
                    selectedCollection={selectedCollection}
                    wordInputError={wordInputError}
                    definitionInputError={definitionInputError}
                />
            )}
            {screen === 'editWord' && (
                <EditWordScreen
                    newWord={newWord}
                    setNewWord={setNewWord}
                    newDefinition={newDefinition}
                    setNewDefinition={setNewDefinition}
                    wordType={wordType}
                    setWordType={setWordType}
                    saveEditedWord={saveEditedWord}
                    deleteWord={deleteWord}
                    setConfirmDeleteWord={setConfirmDeleteWord}
                    confirmDeleteWord={confirmDeleteWord}
                    selectedCollection={selectedCollection}
                    editWordIndex={editWordIndex}
                    setScreen={setScreen}
                />
            )}
            {screen === 'play' && (
                <PlayScreen 
                    selectedCollection={selectedCollection}
                    setScreen={setScreen}
                />
            )}
            {alertMessage && <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />}
            {editNameMode && renderEditNameScreen()}
            {confirmDelete && renderDeleteConfirmationScreen()}
            {confirmDeleteWord && renderDeleteWordConfirmationScreen()}
        </div>
    );
}

export default App;

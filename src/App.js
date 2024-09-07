import React, { useState, useEffect } from 'react';
import './App.css';
const tg = window.Telegram.WebApp;

function App() {
  const [screen, setScreen] = useState('home');
  const [collections, setCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [newWord, setNewWord] = useState('');
  const [newDefinition, setNewDefinition] = useState('');
  const [wordType, setWordType] = useState('');

  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => {
    tg.close();
  };

  const renderHomeScreen = () => (
    <div className="App">
      <h1>Your Collections</h1>
      {collections.length === 0 ? (
        <p>You don't have any collections yet.</p>
      ) : (
        <ul>
          {collections.map((collection, index) => (
            <li key={index} onClick={() => openCollection(collection)}>{collection.name}</li>
          ))}
        </ul>
      )}
      <button onClick={() => setScreen('create')}>Create Collection</button>
    </div>
  );

  const renderCreateCollectionScreen = () => (
    <div className="App">
      <h1>New Collection</h1>
      <h3>Enter a name for your new collection. You can rename it later.</h3>
      <input 
        type="text" 
        placeholder="Collection Name"
        value={newCollectionName}
        onChange={(e) => setNewCollectionName(e.target.value)} 
      />
      <button onClick={saveNewCollection}>Save</button>
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
    <div className="App">
      <h1>{selectedCollection.name}</h1>
      <button onClick={editCollectionName}>Edit Name</button>
      <button onClick={deleteCollection}>Delete Collection</button>
      
      {selectedCollection.words.length === 0 ? (
        <p>You haven't added anything to this collection yet.</p>
      ) : (
        <ul>
          {selectedCollection.words.map((word, index) => (
            <li key={index}>
              <strong>{word.word}</strong> ({word.type}) - {word.definition}
            </li>
          ))}
        </ul>
      )}
      
      <button onClick={() => setScreen('addWord')}>Add Word</button>
    </div>
  );

  const renderAddWordScreen = () => (
    <div className="App">
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

      <button onClick={addWordToCollection}>Save</button>
      <button onClick={() => setScreen('collectionDetails')}>Back</button>
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
    <div className="App">
      <button onClick={onClose}>Close</button>
      {screen === 'home' && renderHomeScreen()}
      {screen === 'create' && renderCreateCollectionScreen()}
      {screen === 'collectionDetails' && renderCollectionDetailsScreen()}
      {screen === 'addWord' && renderAddWordScreen()}
    </div>
  );
}

export default App;

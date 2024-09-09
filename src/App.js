import React, { useState, useEffect } from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen/HomeScreen.tsx';
import CreateCollectionScreen from './components/CreateCollectionScreen/CreateCollectionScreen.tsx';
import CollectionDetailsScreen from './components/CollectionDetailsScreen/CollectionDetailsScreen.tsx';
import AddWordScreen from './components/AddWordScreen/AddWordScreen.tsx';

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
    <div className="container">
      {screen === 'home' && <HomeScreen collections={collections} onCreateClick={() => setScreen('create')} onOpenCollection={openCollection} />}
      {screen === 'create' && <CreateCollectionScreen newCollectionName={newCollectionName} setNewCollectionName={setNewCollectionName} onSave={saveNewCollection} />}
      {screen === 'collectionDetails' && <CollectionDetailsScreen selectedCollection={selectedCollection} onEdit={editCollectionName} onDelete={deleteCollection} onAddWord={() => setScreen('addWord')} />}
      {screen === 'addWord' && <AddWordScreen newWord={newWord} setNewWord={setNewWord} newDefinition={newDefinition} setNewDefinition={setNewDefinition} wordType={wordType} setWordType={setWordType} onSave={addWordToCollection} onBack={() => setScreen('collectionDetails')} />}
    </div>
  );
}

export default App;

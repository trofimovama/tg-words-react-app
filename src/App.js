import React, { useState, useEffect } from 'react';
import './App.css';
const tg = window.Telegram.WebApp;

function App() {
  const [screen, setScreen] = useState('home'); // Manage which screen to show
  const [collections, setCollections] = useState([]); // Store collections
  const [newCollectionName, setNewCollectionName] = useState('');
  const [selectedCollection, setSelectedCollection] = useState(null); // Selected collection

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
      <p>You haven't added anything to this collection yet.</p>
      <button>Add Word</button>
    </div>
  );

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
    </div>
  );
}

export default App;

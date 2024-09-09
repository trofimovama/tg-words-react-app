import React from 'react';
import Button from '../Button/Button.tsx';
import './CreateCollection.css';

const CreateCollectionScreen = ({ newCollectionName, setNewCollectionName, onSave }) => (
  <div>
    <h1>New Collection</h1>
    <h3>Enter a name for your new collection. You can rename it later.</h3>
    <input 
      type="text" 
      placeholder="Collection Name"
      value={newCollectionName}
      onChange={(e) => setNewCollectionName(e.target.value)} 
    />
    <Button onClick={onSave}>Save</Button>
  </div>
);

export default CreateCollectionScreen;

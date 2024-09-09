// src/components/CollectionDetailsScreen.js
import React from 'react';
import Button from '../Button/Button.tsx';
import './CollectionDetails.css';

const CollectionDetailsScreen = ({ selectedCollection, onEdit, onDelete, onAddWord }) => (
  <div>
    <h1>{selectedCollection.name}</h1>
    <Button onClick={onEdit}>Edit Name</Button>
    <Button onClick={onDelete}>Delete Collection</Button>

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

    <Button onClick={onAddWord}>Add Word</Button>
  </div>
);

export default CollectionDetailsScreen;

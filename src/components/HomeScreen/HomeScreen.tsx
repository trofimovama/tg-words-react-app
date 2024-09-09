import React from 'react';
import Button from '../Button/Button.tsx';

const HomeScreen = ({ collections, onCreateClick, onOpenCollection }) => (
  <div>
    <h1>Your Collections</h1>
    {collections.length === 0 ? (
      <p>You don't have any collections yet.</p>
    ) : (
      <ul>
        {collections.map((collection, index) => (
          <li key={index} onClick={() => onOpenCollection(collection)}>
            {collection.name}
          </li>
        ))}
      </ul>
    )}
    <Button onClick={onCreateClick}>Create Collection</Button>
  </div>
);

export default HomeScreen;

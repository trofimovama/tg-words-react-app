// src/components/AddWordScreen.js
import React from 'react';
import Button from '../Button/Button.tsx';

const AddWordScreen = ({
  newWord, 
  setNewWord, 
  newDefinition, 
  setNewDefinition, 
  wordType, 
  setWordType, 
  onSave, 
  onBack 
}) => (
  <div>
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

    <Button onClick={onSave}>Save</Button>
    <Button onClick={onBack}>Back</Button>
  </div>
);

export default AddWordScreen;

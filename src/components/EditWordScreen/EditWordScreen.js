import React from 'react';
import Button from '../Button/Button.js'; 
import arrowLeft from '../../assets/arrow-left.svg';
import './EditWordScreen.css';

function EditWordScreen({
  newWord,
  setNewWord,
  newDefinition,
  setNewDefinition,
  wordType,
  setWordType,
  saveEditedWord,
  deleteWord,
  setConfirmDeleteWord,
  confirmDeleteWord,
  selectedCollection,
  setScreen
}) {
  if (confirmDeleteWord) {
      return (
          <div className="container delete-confirmation">
              <Button label="Back" onClick={() => setConfirmDeleteWord(false)} />

              <h1>Delete '{newWord}'?</h1>
              <p>This action can’t be undone.</p>

              <Button label="Cancel" className="btn-cancel" onClick={() => setConfirmDeleteWord(false)} />
              <Button label="Delete" className="btn-danger" onClick={deleteWord} />
          </div>
      );
  } else {
      return (
          <div className="container edit-word-screen">
              <Button label={`Back to ${selectedCollection.name}`} onClick={() => setScreen('collectionDetails')} icon={arrowLeft} />
              <h1>Edit '{newWord}'</h1>
              <input 
                  type="text" 
                  name="newWord"
                  placeholder="Word"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
              />
              <input 
                  type="text" 
                  name="newDefinition"
                  placeholder="Definition"
                  value={newDefinition}
                  onChange={(e) => setNewDefinition(e.target.value)}
              />
              <Button label="Save" onClick={saveEditedWord} />
          </div>
      );
  }
}

export default EditWordScreen;

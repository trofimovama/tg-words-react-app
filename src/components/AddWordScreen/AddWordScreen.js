import React from 'react';
import Button from '../Button/Button.js';
import arrowLeft from '../../assets/arrow-left.svg';
import './AddWordScreen.css';

function AddWordScreen({ 
  newWord, 
  setNewWord, 
  newDefinition, 
  setNewDefinition, 
  wordType, 
  setWordType, 
  addWordToCollection, 
  setScreen, 
  selectedCollection 
}) {
  return (
      <div className="container add-word-screen">
          <div>
                <img src={arrowLeft} alt='Arrow left' />
                <Button label={`${selectedCollection.name}`} onClick={() => setScreen('collectionDetails')} className='link-btn' />
                <h1>Add new word</h1>
                <div className='vertical-flex-container'>
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
                    <div className="wordTypeButtons">
                        <Button 
                            label="Verb"
                            className={wordType === 'Verb' ? 'selected' : ''}
                            onClick={() => setWordType('Verb')}
                        />
                        <Button 
                            label="Noun"
                            className={wordType === 'Noun' ? 'selected' : ''}
                            onClick={() => setWordType('Noun')}
                        />
                        <Button 
                            label="Adj."
                            className={wordType === 'Adj.' ? 'selected' : ''}
                            onClick={() => setWordType('Adj.')}
                        />
                        <Button 
                            label="Adv."
                            className={wordType === 'Adv.' ? 'selected' : ''}
                            onClick={() => setWordType('Adv.')}
                        />
                    </div>
                </div>
                
            </div>
            <Button label="Save" onClick={addWordToCollection} className='btn' />
        </div>
  );
}

export default AddWordScreen;

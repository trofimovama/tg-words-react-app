import React from 'react';
import Button from '../Button/Button.js'; 
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
    editWordIndex,
    setScreen
}) {
    const wordBeingEdited = selectedCollection.words[editWordIndex] || {};

    const originalWord = wordBeingEdited.word || '';
    const originalDefinition = wordBeingEdited.definition || '';

    if (confirmDeleteWord) {
        return (
            <div className="container delete-confirmation">
                <div className='edit-word-content'>
                    <div>
                        <i className="fa-solid fa-chevron-left text-mode-color"></i>
                        <Button label="Back" onClick={() => setConfirmDeleteWord(false)} className='link-btn text-mode-color' />
                    </div>
                    <div className='title-container'>
                        <h1>Edit word</h1>
                        <i className="fa-regular fa-trash-can text-mode-color" onClick={() => setConfirmDeleteWord(true)}></i>
                    </div>
                    <input 
                        type="text" 
                        name="newWord"
                        placeholder={originalWord || "Word"}
                        value={newWord === '' ? '' : newWord}
                        onChange={(e) => setNewWord(e.target.value)}
                    />
                </div>
                <div className="confirmation-block">
                    <p className="confirm-message">Delete ‘{originalWord}’? This action can’t be undone.</p>
                    <div className="confirmation-buttons">
                        <button className="link-btn" onClick={() => setConfirmDeleteWord(false)}>Cancel</button>
                        <button className="link-btn" onClick={deleteWord}>Delete</button>
                    </div>
                </div>
                <Button label="Save" onClick={saveEditedWord} className='btn text-mode-color' />
            </div>
        );
    } else {
        return (
            <div className="container edit-word-screen">
                <div className='edit-word-content'>
                    <div className='back-btn-container'>
                        <i className="fa-solid fa-chevron-left text-mode-color"></i>
                        <Button label={selectedCollection.name} onClick={() => setScreen('collectionDetails')} className='link-btn text-mode-color' />
                    </div>
                    <div className='title-container'>
                        <h1>Edit word</h1>
                        <i className="fa-regular fa-trash-can text-mode-color" onClick={() => setConfirmDeleteWord(true)}></i>
                    </div>

                    <input 
                        type="text" 
                        name="newWord"
                        placeholder={originalWord || "Word"}
                        value={newWord === '' ? '' : newWord}
                        onChange={(e) => setNewWord(e.target.value)}
                    />

                    <input 
                        type="text" 
                        name="newDefinition"
                        placeholder={originalDefinition || "Definition"}
                        value={newDefinition === '' ? '' : newDefinition}
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
                
                <Button label="Save" onClick={saveEditedWord} className='btn text-mode-color' />
            </div>
        );
    }
}

export default EditWordScreen;

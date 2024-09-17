import React from 'react';
import { logEvent } from '@amplitude/analytics-browser';
import Button from '../Button/Button.js';
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
    selectedCollection,
    wordInputError,
    definitionInputError,
}) {

    const handleWordTypeClick = (type) => {
        setWordType(type);
        logEvent('WordType Button Clicked:', { wordType: type });
    };

    return (
        <div className="container add-word-screen">
            <div>
                <i className="fa-solid fa-chevron-left text-mode-color"></i>
                <Button
                    label={`${selectedCollection.name}`}
                    onClick={() => setScreen('collectionDetails')}
                    className="link-btn"
                />
                <h1>Add new word</h1>
                <div className="vertical-flex-container">
                    <input
                        type="text"
                        name="newWord"
                        placeholder="Word"
                        value={newWord}
                        onChange={(e) => setNewWord(e.target.value)}
                        className={wordInputError ? 'required-input' : ''}
                    />
                    {wordInputError && (
                        <p className="error-message">Word is required.</p>
                    )}

                    <input
                        type="text"
                        name="newDefinition"
                        placeholder="Definition"
                        value={newDefinition}
                        onChange={(e) => setNewDefinition(e.target.value)}
                        className={definitionInputError ? 'required-input' : ''}
                    />
                    {definitionInputError && (
                        <p className="error-message">Definition is required.</p>
                    )}

                    <div className="wordTypeButtons">
                        <Button
                            label="Verb"
                            className={wordType === 'Verb' ? 'selected' : ''}
                            onClick={() => handleWordTypeClick('Verb')}
                        />
                        <Button
                            label="Noun"
                            className={wordType === 'Noun' ? 'selected' : ''}
                            onClick={() => handleWordTypeClick('Noun')}
                        />
                        <Button
                            label="Adj."
                            className={wordType === 'Adj.' ? 'selected' : ''}
                            onClick={() => handleWordTypeClick('Adj.')}
                        />
                        <Button
                            label="Adv."
                            className={wordType === 'Adv.' ? 'selected' : ''}
                            onClick={() => handleWordTypeClick('Adv.')}
                        />
                    </div>
                </div>
            </div>
            <Button label="Save" onClick={addWordToCollection} className="btn text-mode-color" />
        </div>
    );
}

export default AddWordScreen;

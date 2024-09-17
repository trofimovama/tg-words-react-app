import React from 'react';
import Button from '../Button/Button.js'; 

function CreateCollectionScreen({ newCollectionName, setNewCollectionName, saveNewCollection, setScreen }) {
    return (
        <div className="container new-collection">
            <div className="header">
                <div className='back-btn-container'>
                    <i className="fa-solid fa-chevron-left text-mode-color"></i>
                    <Button label="Back" onClick={() => setScreen('home')} className='link-btn text-mode-color' />
                </div>
                <h1>New Collection</h1>
            </div>
            <div>
                <h3 className='new-collection-title'>Enter a name for your new collection. You can rename it later.</h3>
                <input 
                    type="text" 
                    name="newCollectionName"
                    placeholder="Collection Name"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                />
            </div>
            <Button label="Save" onClick={saveNewCollection} className='btn text-mode-color' />
        </div>
    );
}

export default CreateCollectionScreen;

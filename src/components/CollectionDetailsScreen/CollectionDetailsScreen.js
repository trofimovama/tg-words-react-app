import React, { useEffect } from 'react';
import Button from '../Button/Button.js';
import arrowLeft from '../../assets/arrow-left.svg';
import menuIcon from '../../assets/menu.svg';
import editIcon from '../../assets/edit.svg';
import removeIcon from '../../assets/delete.svg';
import playIcon from '../../assets/play.svg';

function CollectionDetailsScreen({
  selectedCollection,
  menuVisible,
  toggleMenu,
  openEditWordScreen,
  setScreen,
  setConfirmDelete,
  setEditNameMode,
  menuRef
}) {

    useEffect(() => {
        function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            toggleMenu(false);
        }
        }

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef, toggleMenu]);

    return (
        <div className="container add-word-container">
            <div className='top-collection-name'>
                <Button label="Back" onClick={() => setScreen('home')} className='link-btn' icon={arrowLeft} />
                    <div className='section-title'>
                        <h1>{selectedCollection.name}</h1>
                        <img src={menuIcon} alt='Menu icon' onClick={toggleMenu} className='menu' />
                    </div>
                {menuVisible && (
                    <div className='edit-remove-group' ref={menuRef}>
                        <div className='edit-group-button'>
                            <img src={editIcon} alt='Edit icon' />
                            <Button label="Edit Name" onClick={() => setEditNameMode(true)} className='link-btn' />
                        </div>
                        <div className='remove-group-button'>
                            <img src={removeIcon} alt='Remove icon' />
                            <Button label="Delete Collection" onClick={() => setConfirmDelete(true)} className='link-btn' />
                        </div>
                    </div>
                ) }
            </div>

            {selectedCollection.words.length === 0 ? (
                <p className='collection-descr'>You haven't added anything to this collection yet.</p>
            ) : (
                <div className='collection-content'>
                    <Button label="Play" onClick={() => setScreen('play')} className='btn btn-play' icon={playIcon} />
                    <input 
                        type="text" 
                        name="search"
                        className="search-input" 
                        placeholder="Search" 
                        onChange={() => {}}
                    />
                    <ul className='word-list'>
                        {selectedCollection.words.map((word, index) => (
                            <li key={index} className='word-item' onClick={() => openEditWordScreen(index)}>
                                <strong>{word.word}</strong>
                                {word.type && ` (${word.type})`}
                                {word.definition && ` - ${word.definition}`}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <Button label="Add Word" onClick={() => setScreen('addWord')} className='btn' />
        </div>
    );
}

export default CollectionDetailsScreen;

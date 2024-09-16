import React, { useState, useEffect } from 'react';
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
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredWords, setFilteredWords] = useState(selectedCollection.words);

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

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredWords(selectedCollection.words);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = selectedCollection.words.filter(word =>
                word.word.toLowerCase().includes(query) ||
                (word.definition && word.definition.toLowerCase().includes(query)) ||
                (word.type && word.type.toLowerCase().includes(query))
            );
            setFilteredWords(filtered);
        }
    }, [searchQuery, selectedCollection]);

    return (
        <div className="container add-word-container">
            <div className='top-collection-name'>
                <div className='btn-back-container'>
                    <img src={arrowLeft} alt='Arrow left' className='text-mode-color' />
                    <Button label="Back" onClick={() => setScreen('home')} className='link-btn text-mode-color' />
                </div>
                <div className='section-title'>
                    <h1>{selectedCollection.name}</h1>
                    <img src={menuIcon} alt='Menu icon' onClick={toggleMenu} className='menu' />
                </div>
                {menuVisible && (
                    <div className='edit-remove-group' ref={menuRef}>
                        <div className='edit-group-button'>
                            <img src={editIcon} alt='Edit icon' className='text-mode-color' />
                            <Button label="Edit Name" onClick={() => setEditNameMode(true)} className='link-btn' />
                        </div>
                        <div className='remove-group-button'>
                            <img src={removeIcon} alt='Remove icon' className='text-mode-color' />
                            <Button label="Delete Collection" onClick={() => setConfirmDelete(true)} className='link-btn' />
                        </div>
                    </div>
                )}
            </div>

            {selectedCollection.words.length === 0 ? (
                <p className='collection-descr'>You haven't added anything to this collection yet.</p>
            ) : (
                <div className='collection-content'>
                    <Button label="Play" onClick={() => setScreen('play')} className='btn btn-play text-mode-color' icon={playIcon} />
                    
                    <input 
                        type="text" 
                        name="search"
                        className="search-input" 
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <ul className='word-list'>
                        {filteredWords.length > 0 ? (
                            filteredWords.map((word, index) => (
                                <li key={index} className='word-item' onClick={() => openEditWordScreen(index)}>
                                    <strong>{word.word}</strong>
                                    {word.type && ` (${word.type})`}
                                    {word.definition && ` - ${word.definition}`}
                                </li>
                            ))
                        ) : (
                            <li className="word-item">No words match your search.</li>
                        )}
                    </ul>
                </div>
            )}

            <Button label="Add Word" onClick={() => setScreen('addWord')} className='btn text-mode-color' />
        </div>
    );
}

export default CollectionDetailsScreen;

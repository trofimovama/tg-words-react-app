import React from 'react';
import './AppHeader.css';
import threeDots from '../../assets/three-dots.svg';

function AppHeader() {
    return (
        <div className='header-container'>
            <button className='text-mode-color link-btn'>Close</button>
            <div className='title-container'>
                <span className='app-title'>Flip That</span>
                <span>mini app</span>
            </div>
            <img src={threeDots} alt='Menu dots'/>
        </div>
    );
}

export default AppHeader;

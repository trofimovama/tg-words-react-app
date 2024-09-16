import React from 'react';
import './Button.css';

function Button({ label, onClick, className = '', icon }) {
    return (
        <button className={`text-mode-color ${className}`} onClick={onClick}>
            {icon && <img src={icon} alt={`${label} icon`} />}
            {label}
        </button>
    );
}

export default Button;
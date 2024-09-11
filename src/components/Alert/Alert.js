import React from 'react';

function Alert({ message, onClose }) {
    return (
        <div className="alert-container">
            <div className="alert-box">
                <p>{message}</p>
                <button className="btn-close" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default Alert;

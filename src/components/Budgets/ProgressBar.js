import React from 'react';

function ProgressBar({ completed }) {
    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,

    }

    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: "#33f806",
        borderRadius: 'inherit',

    }

    const labelStyles = {
        textAlign: 'center',
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${completed}%`}</span>
            </div>
        </div>
    );
};

export default ProgressBar;
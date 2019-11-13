import React from 'react';
import './countdown.css';
import Letter from '../letter/letter';
import Button from '../playerButton/player-button';

function Countdown() {
    const letters = ['C', 'O', 'U', 'N', 'T', 'D', 'O', 'W', 'N'];
    return (
        <div className="App">
            <body>
                <div className="mainBody">
                    {letters.map((letter, i) => (
                        <Letter key={i} letter={letter} />
                    ))}
                </div>
                <p>Countdown app build in React</p>
                <div className="playerButtons">
                    <Button />
                </div>
            </body>
        </div>
    );
}

export default Countdown;
import React from 'react';
import './countdown.css';
import Letter from '../letter/letter';
import Button from '../playerButton/player-button';
import { Link } from 'react-router-dom';

function Countdown() {
    const letters = ['C', 'O', 'U', 'N', 'T', 'D', 'O', 'W', 'N'];
    return (
        <div className="App">
            <body>
                <div className="mainBody">
                    <Link to={{ pathname: '/settings', state: '20' }}>
                        <button className="resetButton">
                            Settings
                    </button>
                    </Link>
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
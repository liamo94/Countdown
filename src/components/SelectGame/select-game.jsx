import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './select-game.css';
import BackButton from '../BackButton/back-button';

class SelectGame extends Component {
    state = {}
    render() {
        return (
            <div className="selectButtons">
                <BackButton path='/' />
                <h1>Select a game mode...</h1>
                <Link to={{ pathname: '/number', state: '20' }}>
                    <button className="selectButton">
                        Number round
                    </button>
                </Link>
                <NavLink to={{ pathname: '/number', state: '20' }}>
                    <button className="selectButton">
                        Letter round
                    </button>
                </NavLink>
                <NavLink to={{ pathname: '/conundrum', state: '20' }}>
                    <button className="selectButton">
                        Conundrum
                    </button>
                </NavLink>
                <NavLink to={{ pathname: '/number', state: '20' }}>
                    <button className="selectButton">
                        Full game
                    </button>
                </NavLink>
            </div>
        );
    }
}

export default SelectGame;
import React, { Component } from 'react';
import './player-button.css';
import { NavLink } from 'react-router-dom';

class PlayerButton extends Component {
    state = {}
    render() {
        return (
            <NavLink to={{ pathname: '/select', state: '20' }}>
                <button className="playerButton">
                    Play Game
            </button>
            </NavLink>
        );
    }
}

export default PlayerButton;
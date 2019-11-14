import React, { Component } from 'react';
import './letter.css';

class Letter extends Component {
    state = {}
    render() {
        return (
            <div className="letterSquare">
                {this.props.letter}
            </div>
        );
    }
}

export default Letter;
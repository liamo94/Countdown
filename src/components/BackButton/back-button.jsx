import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './back-button.css';

class BackButton extends Component {
    state = {}
    render() {
        return (
            <Link to={{ pathname: this.props.path, state: '20' }}>
                <button className="backButton">
                    Back
                    </button>
            </Link>
        );
    }
}

export default BackButton;
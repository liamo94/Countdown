import React, { Component } from 'react';
import './settings.css';
import BackButton from '../BackButton/back-button';


class Settings extends Component {
    state = {

    }

    render() {
        return (
            <div class="settings">
                <h1>Settings page</h1>
                <BackButton path='/' />
            </div>
        );
    }
}

export default Settings;
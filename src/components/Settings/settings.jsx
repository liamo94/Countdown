import React, { Component } from 'react';
import './settings.css'


class Settings extends Component {
    intervalId = 0;
    state = {
        seconds: 30,
        color: ''
    }
    constructor(props) {
        super(props);
        this.myLoop();
    }
    render() {
        return (
            <React.Fragment>
                <h1>Settings page</h1>
                <div className="timer" id="timer">
                    <h1>{this.state.seconds}</h1>
                </div>
                {/* <div className="outta-time">
                    Outta <br />time
                </div> */}
            </React.Fragment>
        );
    }

    myLoop = () => {
        this.intervalId = setInterval(() => {
            if (this.state.seconds !== 0) {
                this.setState({
                    seconds: this.state.seconds - 1,
                    color: this.getRandomColor()
                });
                document.getElementById('timer').style.border = `5px solid ${this.getRandomColor()}`;
            } else {
                clearInterval(this.intervalId);
                document.getElementById('timer').style.border = `5px solid white`;
            }
        }, 1000)
    }

    getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

}

export default Settings;
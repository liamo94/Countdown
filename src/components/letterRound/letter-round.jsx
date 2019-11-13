import React, { Component } from 'react';
import './letter-round.css';
import BackButton from '../BackButton/back-button';
import { random } from '../../resources/random';


class LetterRound extends Component {
    state = {
        letters: ['', '', '', '', '', '', '', '', ''],
        totalLetters: 0
    }
    constructor(props) {
        super(props);
        this.vowels = ['A', 'E', 'I', 'O', 'U'];
        this.constanants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    }

    handleKeyDown = (event) => {
        switch (event.keyCode) {
            case 67:
                this.constanantClicked();
                break;
            case 86:
                this.constanantClicked();
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
    }
    render() {
        return (
            <div className="letterContainer">
                <BackButton path='/select' />
                <button className="resetButton" onClick={this.reset}>Reset</button>
                <h1>Letter round</h1>
                <p>Pick letters</p>
                <button onClick={this.vowelClicked}>Vowel</button>
                <button onClick={this.constanantClicked}>Constanant</button>
                <div className="letters">
                    {this.state.letters.map((letter, i) => (
                        <HiddenLetter key={i} letter={letter} />
                    ))}
                </div>
            </div>
        );
    }

    vowelClicked = () => {
        if (this.state.totalLetters <= 7) {
            let letters = [...this.state.letters];
            letters[letters.indexOf('')] = random(this.vowels);
            this.setState({
                letters,
                totalLetters: this.state.totalLetters++
            })
        }
    };

    constanantClicked = () => {
        if (this.state.totalLetters <= 7) {
            let letters = [...this.state.letters];
            letters[letters.indexOf('')] = random(this.constanants);
            this.setState({
                letters,
                totalLetters: this.state.totalLetters++
            })
        }
    }

    reset = () => {
        this.setState({
            letters: ['', '', '', '', '', '', '', '', ''],
            totalLetters: 0
        })
    }
}

class HiddenLetter extends Component {
    state = {}
    render() {
        return (
            <div className="hiddenLetterSquare">
                {this.props.letter}
            </div>
        );
    }
}

export default LetterRound;
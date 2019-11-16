import React, { Component } from 'react';
import './letter-round.css';
import BackButton from '../BackButton/back-button';
import { random } from '../../resources/random';
import { getVowels } from '../../resources/vowels';
import { getConstanants } from '../../resources/constanants';
import Timer from '../Timer/timer';


class LetterRound extends Component {
    state = {
        letters: ['', '', '', '', '', '', '', '', ''],
        totalLetters: 0,
        input: '',
        isLoaded: false,
        items: [],
        match: false,
        inputValid: true
    }
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.vowels = getVowels();
        this.constanants = getConstanants();
        this.checkWord = this.checkWord.bind(this);
    }

    handleKeyDown = (event) => {
        if (!!this.state.error) {
            return;
        }
        switch (event.keyCode) {
            case 67:
                this.constanantClicked();
                break;
            case 86:
                this.vowelClicked();
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
        fetch("https://raw.githubusercontent.com/words/an-array-of-english-words/master/words.json")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('Loaded');
                    this.setState({
                        items: result
                    });
                },
                (error) => {
                    console.log('error in rest');
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render() {
        return (
            <div className="letterContainer">
                <BackButton path='/select' />
                <button className="resetButton" onClick={this.reset}>Reset</button>
                {this.state.totalLetters === 9 ? <Timer active={true} /> : null}
                <h1>Letter round</h1>
                <p>Pick letters</p>
                {!!this.state.error ? <h1 className="warning">Internet required to play</h1> : null}
                <button onClick={this.vowelClicked} disabled={!!this.state.error}>Vowel</button>
                <button onClick={this.constanantClicked} disabled={!!this.state.error}>Constanant</button>
                <small><b>Tip</b>: Use <b>V</b> and <b>C</b> to add vowels and constanants</small>
                <div className="letters">
                    {this.state.letters.map((letter, i) => (
                        <HiddenLetter key={i} letter={letter} />
                    ))}
                </div>
                {this.state.totalLetters === 9 ? <InputField input={this.state.input} handleChange={this.handleChange} empty={this.state.input === ''} checkWord={this.checkWord} match={this.state.match} inputValid={this.state.inputValid} /> : null}
            </div>
        );
    }

    vowelClicked = () => {
        if (this.state.totalLetters < 9) {
            let letters = [...this.state.letters];
            letters[letters.indexOf('')] = random(this.vowels);
            this.setState({
                letters,
                totalLetters: this.state.totalLetters + 1
            })
        }
    }

    handleChange = (event) => {
        this.setState({ input: event.target.value.toUpperCase(), inputValid: true, match: false });
        let letters = [...this.state.letters];
        let charArr = event.target.value.toUpperCase().split('');
        for (let i = 0; i < charArr.length; i++) {
            if (letters.indexOf(charArr[i]) < 0) {
                this.setState({ inputValid: false });
                return;
            } else {
                letters.splice(letters.indexOf(charArr[i]), 1);
            }
        }
    }


    constanantClicked = () => {
        if (this.state.totalLetters < 9) {
            let letters = [...this.state.letters];
            letters[letters.indexOf('')] = random(this.constanants);
            this.setState({
                letters,
                totalLetters: this.state.totalLetters + 1
            })
        }
    }

    reset = () => {
        this.setState({
            letters: ['', '', '', '', '', '', '', '', ''],
            totalLetters: 0,
            input: '',
            match: false,
            inputInvalid: false
        })
    }

    showDisplay = () => {
        return (
            <p>Hello</p>
        )
    }

    checkWord = () => {
        this.checkWordUtility(this.state.items, this.state.input.toLowerCase(), 0, this.state.items.length - 1);
    }

    checkWordUtility = (arr, x, start, end) => {
        if (start > end) {
            this.setState({ match: false });
            return false;
        }

        let mid = Math.floor((start + end) / 2);

        if (arr[mid] === x) {
            this.setState({ match: true });
            return true;
        }
        if (arr[mid] > x)
            return this.checkWordUtility(arr, x, start, mid - 1);
        else
            return this.checkWordUtility(arr, x, mid + 1, end);
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

class InputField extends Component {
    state = {}
    render() {
        console.log(this.props);
        return (
            <React.Fragment>
                <p>Now make a word</p>
                <input className="answerInput" type="text" value={this.props.input} maxLength="7" onChange={this.props.handleChange} />
                {this.props.empty}
                {!this.props.inputValid ? <small className="errorText">Letter not available</small> : null}
                <button className="altButton" onClick={this.props.checkWord} disabled={this.props.input === '' || !this.props.inputValid}>Submit word</button>
                <p>{this.props.match ? `Correct, +${this.getPoints()} points` : null}</p>
            </React.Fragment>
        );
    }

    getPoints() {
        return this.props.input.length === 9 ? 18 : this.props.input.length;
    }
}


export default LetterRound;
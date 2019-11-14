import React, { Component } from 'react';
import './letter-round.css';
import BackButton from '../BackButton/back-button';
import { random } from '../../resources/random';
import { getVowels } from '../../resources/vowels';
import { getConstanants } from '../../resources/constanants';


class LetterRound extends Component {
    state = {
        letters: ['', '', '', '', '', '', '', '', ''],
        totalLetters: 0,
        input: '',
        isLoaded: false,
        items: [],
        match : false
    }
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.vowels = getVowels();
        this.constanants = getConstanants();
        this.checkWord = this.checkWord.bind(this);
    }

    handleKeyDown = (event) => {
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
            console.log('result');
          this.setState({
            items: result
          });
        },
        (error) => {
            console.log('error');
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
                <h1>Letter round</h1>
                <p>Pick letters</p>
                <button onClick={this.vowelClicked}>Vowel</button>
                <button onClick={this.constanantClicked}>Constanant</button>
                <small><b>Tip</b>: Use c and v to add vowels and constanants</small>
                <div className="letters">
                    {this.state.letters.map((letter, i) => (
                        <HiddenLetter key={i} letter={letter} />
                    ))}
                </div>
                {this.state.totalLetters === 9 ? <InputField input={this.state.input} handleChange={this.handleChange} empty={this.state.input === ''} checkWord={this.checkWord} match={this.state.match}/> : null }
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
        console.log(event.keyCode);
        if(event.keyCode === 13) {
            this.checkWord();
        }
        this.setState({ input: event.target.value.toUpperCase() });
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
            match : false
        })
    }

    checkWord = () => { 
        this.checkWord2(this.state.items, this.state.input.toLowerCase(), 0, this.state.items.length - 1);
    }

    checkWord2 = (arr, x, start, end) => { 
        if (start > end){
            this.setState({match: false});
            return false;
        }
       
        let mid=Math.floor((start + end)/2); 
       
        if (arr[mid]===x) {
            this.setState({match: true});
            return true; 
        }
        if(arr[mid] > x)  
            return this.checkWord2(arr, x, start, mid-1); 
        else
            return this.checkWord2(arr, x, mid+1, end); 
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
            <input type="text" value={this.props.input} maxLength="7" onChange={this.props.handleChange} />
            {this.props.empty}
            <button className="altButton" onClick={this.props.checkWord}>Submit word</button>
            <p>{this.props.match ? 'Correct' :  'Wrong'}</p>
            </React.Fragment>
        );
    }
}


export default LetterRound;
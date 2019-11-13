import React, { Component } from 'react';
import { conundrum } from '../../resources/dictionarysmall';
import './Conundrum.css';
import BackButton from '../BackButton/back-button';

class Conundrum extends Component {
    state = {
        words: conundrum,
        word: '',
        scrambledWord: '',
        input: '',
        showSolution: false
    }
    componentDidMount() {
        let word = this.random(this.state.words)
        this.setState(
            {
                word,
                scrambledWord: word.split('').sort(() => { return 0.5 - Math.random() }).join('').toUpperCase()
            }
        );
    }

    render() {
        return (
            <div className="conundrum">
                <BackButton path='/select' />
                <h1>Conundrum round</h1>
                <p>Unscramble word</p>
                <div className="word">
                    {this.state.scrambledWord}
                </div>
                <input type="text" value={this.state.input} onChange={this.handleChange} placeholder="Type solution..." maxLength="9" />
                {this.showIfSolutionCorrect()}
                <Solution
                    showIfSolutionCorrect={this.showIfSolutionCorrect}
                    showSolution={this.state.showSolution}
                    onChangeSolution={this.onChangeSolution}
                    word={this.state.word}>
                </Solution>
            </div>
        );
    }

    handleChange = (event) => {
        this.setState({ input: event.target.value.toUpperCase() });
    }

    onChangeSolution = () => {
        this.setState({ showSolution: true });
    }

    showIfSolutionCorrect() {
        let correctSolution = this.state.input.toLowerCase() === this.state.word ? <p>Correct</p> : <p>Incorrect</p>
        return this.state.input.length === 9 ? correctSolution : ' ';
    }

    random(x, y) {
        if (typeof y === "undefined") {
            if (x instanceof Array) {
                let index = Math.floor(Math.random() * x.length);
                return x[index];
            } else {
                return Math.floor(Math.random() * x);
            }
        } else {
            return Math.floor(Math.random() * (y - x) + x);
        }
    }
}

class Solution extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <button onClick={this.props.onChangeSolution}>Show solution</button>
                {this.props.showSolution ? <p className="showSolution">{this.props.word.toUpperCase()}</p> : ''}
            </React.Fragment>
        );
    }
}


export default Conundrum;
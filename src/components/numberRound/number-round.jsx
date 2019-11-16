import React, { Component } from 'react';
import './number-round.css';
import BackButton from '../BackButton/back-button';
import { random } from '../../resources/random';
import Timer from '../Timer/timer';

class NumberRound extends Component {
    constructor(props) {
        super(props);
        this.state = {
            targetNumber: 0,
            numbers: [],
            selectedButton: 0,
            input: '',
            output: '',
            loop: 0
        }
        this.handleChange = this.handleChange.bind(this);
    }
    render() {
        const buttons = [1, 2, 3, 4];
        // console.log(fromNotifications);
        return (
            <div>
                <BackButton path='/select' />
                <button className="resetButton" onClick={this.reset}>Reset</button>
                {this.state.selectedButton !== 0 ? <Timer active={true} /> : null}
                <div className="bigNumbers">
                    <h1>Number round</h1>
                    <h2>How many big numbers?</h2>
                    {buttons.map(button => (
                        <button value={button} key={button} className={this.state.selectedButton === button ? 'activeButton' : ''} onClick={() => { this.bigNumbersSelected(button) }}>{button}</button>
                    ))}
                </div>
                <div className={this.state.targetNumber !== 0 ? 'answerSection animateUp' : 'hidden'}>
                    <Target targetNumber={this.state.targetNumber} />
                    <p>Using numbers</p>
                    {this.state.numbers.map((value, i) => (
                        <span className="values" key={i}>{value}</span>
                    ))}
                    <input className="answerInput" type="text" value={this.state.input} onChange={this.handleChange} placeholder="Type solution..." />
                    <div className={this.getBadgeClasses()}>
                        {this.state.output}
                    </div>
                </div>
            </div>
        );
    }

    getBadgeClasses() {
        let classes = "result ";
        if (isNaN(this.state.output)) {
            classes += 'small ';
        }
        let value = Math.abs(this.state.targetNumber - +this.state.output);
        if (value === 0) {
            return classes += ' targetReached';
        } else if (value < 5) {
            return classes += ' fiveAway';
        } else if (value < 10) {
            return classes += ' tenAway';
        } else return classes;
    }

    bigNumbersSelected = (val) => {
        this.myLoop();
        this.setState({
            targetNumber: random(101, 999),
            numbers: this.selectRandomNumbers(val),
            selectedButton: val,
            input: '',
            output: '',
            loop: 0
        });
    }

    myLoop = () => {
        setTimeout(() => {
            this.setState({
                targetNumber: random(101, 999),
            });
            if (this.state.loop < 30) {
                this.setState({
                    loop: this.state.loop + 1
                });
                this.myLoop();
            }
        }, 5)
    }

    handleChange(event) {
        this.setState({ input: event.target.value, output: this.sum(this.infixToPostfix(event.target.value)) });
    }

    reset = () => {
        this.setState({
            targetNumber: 0,
            numbers: [],
            selectedButton: 0,
            input: '',
            output: '',
            loop: 0
        })
    }

    selectRandomNumbers(totalBigNumbers) {
        let totalNumbers = 6;
        let selectedNumbers = [];
        let smallNumbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
        let bigNumbers = [25, 50, 75, 100];
        for (let i = 0; i < totalBigNumbers; i++) {
            let rnd = random(bigNumbers.length);
            selectedNumbers.push(bigNumbers[rnd]);
            bigNumbers.splice(rnd, 1);
        }
        for (let i = 0; i < (totalNumbers - totalBigNumbers); i++) {
            let rnd = random(smallNumbers.length);
            selectedNumbers.push(smallNumbers[rnd]);
            smallNumbers.splice(rnd, 1);
        }
        return selectedNumbers.sort((x, y) => { return x - y });
    }

    sum(e) {
        let numbers = [...this.state.numbers];
        console.log(e);
        var s = [];
        for (let i = 0; i < e.length; i++) {
            if (!isNaN(e[i]) && (numbers.indexOf(+e[i]) === -1) && e[i] !== '' && e[i] !== ' ') {
                return 'Number not available';
            }
            if (e[i] !== '' && e[i] !== ' ' && !isNaN(e[i])) {
                numbers.splice(numbers.indexOf(+e[i]), 1);
            }

        }
        for (var i in e) {
            var t = e[i], n = +t
            if (n == t)
                s.push(n)
            else {
                var o2 = s.pop(), o1 = s.pop();
                console.log(`${o1} ${o2}`);
                switch (t) {
                    case '+': s.push(o1 + o2); break;
                    case '-': s.push(o1 - o2); break;
                    case '*': s.push(o1 * o2); break;
                    case 'x': s.push(o1 * o2); break;
                    case '/': s.push(o1 / o2); break;
                    default: s.push(o1); break;
                }
            }
            if (s[0] < 0) return `Number can't be negative`;
        }
        return isNaN(s[0]) ? 'Invalid input' : s[0];
    }

    infixToPostfix(infix) {
        const presedences = ["-", "+", "*", "/"];
        infix = infix.split(' ');

        var opsStack = [],
            postfix = [];

        for (let token of infix) {
            // Step 1
            if (!isNaN(token)) {
                postfix.push(token); continue;
            }
            let topOfStack = opsStack[opsStack.length - 1];
            // Step 2
            if (!opsStack.length || topOfStack === "(") {
                opsStack.push(token); continue;
            }
            // Step 3
            if (token === "(") {
                opsStack.push(token); continue;
            }
            // Step 4
            if (token === ")") {
                while (opsStack.length) {
                    let op = opsStack.pop();
                    if (op === "(") break;
                    postfix.push(op);
                }
                continue;
            }
            // Step 5
            let prevPresedence = presedences.indexOf(topOfStack),
                currPresedence = presedences.indexOf(token);
            while (currPresedence < prevPresedence) {
                let op = opsStack.pop();
                postfix.push(op);
                prevPresedence = presedences.indexOf(opsStack[opsStack.length - 1]);
            }
            opsStack.push(token);
        }
        // Step 6
        while (opsStack.length) {
            let op = opsStack.pop();
            if (op === "(") break;
            postfix.push(op);
        }

        return postfix;
    }

    tokenize(exp) {
        return exp
            .replace(/\s/g, "")
            .split(" ")
            .map((token, i) => /^\d$/.test(token) ? +token : token);
    }


}

class Target extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <h2>Target number</h2>
                <div className="target">
                    <span>{this.props.targetNumber}</span>
                </div>
            </React.Fragment>
        );
    }
}


export default NumberRound;
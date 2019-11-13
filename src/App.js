import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Countdown from './components/Countdown/countdown';
import NumberRound from './components/numberRound/number-round';
import SelectGame from './components/SelectGame/select-game';
import Conundrum from './components/Conundrum/Conundrum';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Countdown} exact />
      <Route path="/number" component={NumberRound} />
      <Route path="/select" component={SelectGame} />
      <Route path="/conundrum" component={Conundrum} />
    </BrowserRouter>
  );
}

export default App;

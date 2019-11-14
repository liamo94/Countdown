import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Countdown from './components/Countdown/countdown';
import NumberRound from './components/numberRound/number-round';
import SelectGame from './components/SelectGame/select-game';
import Conundrum from './components/Conundrum/Conundrum';
import LetterRound from './components/letterRound/letter-round';
import Settings from './components/Settings/settings';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Countdown} exact />
      <Route path="/number" component={NumberRound} />
      <Route path="/select" component={SelectGame} />
      <Route path="/conundrum" component={Conundrum} />
      <Route path="/letter" component={LetterRound} />
      <Route path="/settings" component={Settings} />
    </BrowserRouter>
  );
}

export default App;

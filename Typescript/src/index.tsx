import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Game } from './components/game/game';
import './index.css';

ReactDOM.render(
  <Game />,
  document.getElementById('root') as HTMLElement
);

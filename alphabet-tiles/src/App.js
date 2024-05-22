import React, { useState } from 'react';
import './App.css';
import Tile from './components/Tile';

const App = () => {
  const [outputString, setOutputString] = useState('');
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const handleTileClick = (letter) => {
    let newOutput = outputString + letter;
    setOutputString(replaceConsecutiveLetters(newOutput));
  };

  const replaceConsecutiveLetters = (str) => {
    return str.replace(/([A-Z])\1\1+/g, (match) => '_'.repeat(Math.ceil(match.length / 3)));
  };

  return (
    <div className="app">
      <div className="tile-container">
        {alphabet.map((letter) => (
          <Tile key={letter} letter={letter} onClick={handleTileClick} />
        ))}
      </div>
      <div id="outputString">{outputString}</div>
      {
        outputString && <button onClick={() => setOutputString('')} className="clear-button">Clear</button>
      }
    </div>
  );
};

export default App;

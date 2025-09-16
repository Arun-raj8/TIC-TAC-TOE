import { useState } from 'react';
import './App.css';

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {
  const [gameState, setGameState] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameMessage, setGameMessage] = useState('');

  const handleCellClick = index => {
    if (gameState[index] || gameMessage) return;

    const newGameState = [...gameState];
    newGameState[index] = currentPlayer;
    setGameState(newGameState);

    for (let i of winningConditions) {
      const [a, b, c] = i;
      if (
        newGameState[a] &&
        newGameState[a] === newGameState[b] &&
        newGameState[a] === newGameState[c]
      ) {
        setGameMessage(`${currentPlayer} wins!`);
        return;
      }
    }

    if (!newGameState.includes('')) {
      setGameMessage("It's a draw!");
      return;
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const restartGame = () => {
    setGameState(Array(9).fill(''));
    setCurrentPlayer('X');
    setGameMessage('');
  };

  return (
    <div className="game-container">
      <h2>Tic Tac Toe</h2>

      <div className="board">
        {gameState.map((cell, index) => (
          <div className="cell" onClick={() => handleCellClick(index)}>
            {cell}
          </div>
        ))}
      </div>
      <div className="info">
        <p>{gameMessage || `Player ${currentPlayer}'s turn`}</p>
        <button onClick={restartGame}>Restart</button>
      </div>
    </div>
  );
};

export default App;

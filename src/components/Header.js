import { useEffect } from "react";

const Header = ({ handleNewGame, wins, gameInProgress }) => {
  useEffect(() => {
    document.title = `Number of wins: ${wins}`;
  });
  return (
    <header className="header">
      <h4>Wins: {wins}</h4>
      <h3>Memory Game</h3>
      {!gameInProgress && <h4>You win!</h4>}
      <button onClick={handleNewGame}>New Game</button>
    </header>
  );
};

export default Header;

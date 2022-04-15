import useMemoryGame from "../hooks/useMemoryGame";
import Card from "./Card";
import Header from "./Header";

const MemoryGame = ({ assets }) => {
  const [
    cards,
    pickedCards,
    handleCardClick,
    numWins,
    startNewGame,
    gameInProgress,
  ] = useMemoryGame(assets);
  return (
    <>
      <Header
        handleNewGame={startNewGame}
        wins={numWins}
        gameInProgress={gameInProgress}
      />
      <div className="grid">
        {cards.map((card) => {
          const { image, id, matched } = card;
          return (
            <Card
              key={id}
              image={image}
              selected={
                card === pickedCards[0] || card === pickedCards[1] || matched
              }
              onClick={() => handleCardClick(card)}
            />
          );
        })}
      </div>
    </>
  );
};

export default MemoryGame;

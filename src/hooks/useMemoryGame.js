import { useState, useEffect } from "react";
import shuffle from "../utilities/shuffle";
import useAppBadge from "./useAppBadge";

const useMemoryGame = (assets) => {
  const [cards, setCards] = useState(shuffle(assets));
  const [gameState, setGameState] = useState(0);
  const [pickedCards, setPickedCards] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [wins, setWins] = useState(0);
  const [gameInProgress, setGameInProgress] = useState(true);
  const [setBadge, clearBadge] = useAppBadge();

  const handleCardClick = (card) => {
    if (!disabled && !pickedCards.includes(card)) {
      switch (gameState) {
        case 0:
          setGameState(1);
          setPickedCards([...pickedCards, card]);
          return;
        case 1:
          setGameState(2);
          setPickedCards([...pickedCards, card]);
          return;
        default:
          setGameState(0);
          setPickedCards([]);
          return;
      }
    }
  };

  const handleTurn = () => {
    setGameState(0);
    setPickedCards([]);
    setDisabled(false);
  };

  const startNewGame = () => {
    handleTurn();
    setCards(shuffle(assets));
    setGameInProgress(true);
  };

  useEffect(() => {
    let pickTimer;

    // Two cards have been clicked
    if (gameState === 2) {
      // Check if the cards the same
      if (pickedCards[0].image === pickedCards[1].image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickedCards[0].image) {
              // Update card property to reflect match
              return { ...card, matched: true };
            } else {
              // No match
              return card;
            }
          });
        });
        handleTurn();
      } else {
        // Prevent new selections until after delay
        setDisabled(true);
        // Add delay between selections
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }

    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, pickedCards]);

  useEffect(() => {
    const checkWin = cards.filter((card) => !card.matched);
    if (cards.length && checkWin.length < 1) {
      console.log("You win!");
      setWins(wins + 1);
      setBadge();
      handleTurn();
      setGameInProgress(false);
    }
  }, [cards]);

  return [
    cards,
    pickedCards,
    handleCardClick,
    wins,
    startNewGame,
    gameInProgress,
  ];
};

export default useMemoryGame;

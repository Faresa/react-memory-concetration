import React, { useState } from "react";
import { useSpring } from "@react-spring/web";
import "./App.css";
import IntroductionModal from "./components/IndroductionModal/IntroductionModal";
import GameBoard from "./components/GameBoard/GameBoard";
import AllCards from "./components/Card/AllCards";
import arrayShuffle from "array-shuffle";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerOneName, setPlayerOneName] = useState("");
  const [playerTwoName, setPlayerTwoName] = useState("");
  const [restartGame, setRestartGame] = useState(false);
  const [deck, setDeck] = useState(AllCards);

  const { transform, opacity } = useSpring({
    opacity: gameStarted ? 1 : 0,
    transform: `perspective(600px) rotateY(${gameStarted ? 180 : 0}deg)`,
    config: { mass: 5, tension: 200, friction: 80 },
  });

  const gameState = () => {
    setGameStarted((state) => !state);
  };

  const setPlayerNames = (playerOne, playerTwo) => {
    setPlayerOneName(playerOne);
    setPlayerTwoName(playerTwo);
  };

  const exitGame = () => {
    setGameStarted(false);
    setPlayerOneName("Player 1");
    setPlayerTwoName("Player 2");
  };

  const restartAndShuffle = () => {
    for (let i = 0; i < deck.length; i++) {
      deck[i].isMatched = false;
    }
    shuffleDeck();
    setRestartGame(true);
  };

  const shuffleDeck = () => {
    // Shuffle the card 
    const shuffledCards = arrayShuffle(AllCards);
    
    // Select the first 27 cards from the shuffled array
    const selectedCards = shuffledCards.slice(0, 27);
    
    // Duplicate each selected card
    const duplicatedDeck = selectedCards.flatMap((card) => [card, { ...card }]);
    
    // Shuffle the duplicated deck
    const shuffledDeck = arrayShuffle(duplicatedDeck);
    
    setDeck(shuffledDeck);
  };
  

  return (
    <div className="font-sans h-screen flex flex-col">
<nav className="grid grid-cols-3 items-center bg-opacity-50 p-4">
  <div className="col-start-1"></div>
  <h1 className="text-white font-bold text-memory col-start-2 col-span-1 justify-self-center">
    Memory
  </h1>
  <div className="col-start-3 col-span-1 flex justify-end">
    {gameStarted ? (
      <button
        onClick={restartAndShuffle}
        className="bg-orange-400 text-white ml-6 rounded"
      >
        Restart Game
      </button>
    ) : null}
    <button
      onClick={exitGame}
      className="bg-red-700 text-white ml-6  rounded"
    >
      Exit Game
    </button>
  </div>
</nav>

      
      {gameStarted ? (
        <GameBoard
          deck={deck}
          playerOneName={playerOneName}
          playerTwoName={playerTwoName}
          restartGame={restartGame}
          shuffleDeck={shuffleDeck}
          setDeck={setDeck}
       

        />
      ) : (
        <IntroductionModal
          gameState={gameState}
          setPlayerNames={setPlayerNames}
          shuffleDeck={shuffleDeck}
          setDeck={setDeck}
        />
      )}
    </div>
  );
}

export default App;

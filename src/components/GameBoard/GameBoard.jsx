import React, { useEffect, useState } from "react";
import firstPlayerIcon from "../../assets/images/design/player1.svg";
import secondPlayerIcon from "../../assets/images/design/player2.svg";
import Card from "../Card/Card";
import GameConfetti from "./GameConfetti";
import GameOverModal from "./GameOverModal";

function GameBoard({ playerOneName, playerTwoName, restartGame, deck, shuffleDeck }) {
    const [activeCardOne, setActiveCardOne] = useState(null);
    const [activeCardTwo, setActiveCardTwo] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState(1); 
    const [playerOneScore, setPlayerOneScore] = useState(0);
    const [playerTwoScore, setPlayerTwoScore] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [matchedCards, setMatchedCards] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);
    const [secondPlace, setSecondPlace] = useState(null);
    const [gameRestartedNotification, setGameRestartedNotification] = useState(false);

    const target = 4; // Set the target score

    const suitColorMapping = {'Hearts': 'red', 'Diamonds': 'red', 'Clubs': 'black', 'Spades': 'black', 'Joker': 'joker'};

    useEffect(() => {
        // Set all cards in the deck to face down and not matched on unmount
        return () => {
            deck.forEach(card => {
                card.isMatched = false;
            });
        };
    }, [deck]);

    useEffect(() => {
        if (restartGame) {
            // Reset both scores to zero
            setPlayerOneScore(0);
            setPlayerTwoScore(0);
            setMatchedCards([]);
            setGameOver(false);
            setGameRestartedNotification(true);
            // Simulate restarting the game
            setTimeout(() => {
                setGameRestartedNotification(false);
            }, 3000); // Reset the notification after 3 seconds
        }
    }, [restartGame]);

    useEffect(() => {
        // Check for card match when activeCardTwo is set
        if (activeCardTwo) {
            checkForMatch();
        }
    }, [activeCardTwo]);

    function selectedCard(card) {
        if (activeCardOne && !activeCardTwo) {
            setActiveCardTwo(card);
        } else {
            setActiveCardOne(card);
        }
    }

    function checkForMatch() {
        if (activeCardOne === activeCardTwo) {
            // Update player score based on current player
            setCurrentPlayerScore(currentPlayer === 1 ? setPlayerOneScore : setPlayerTwoScore);
    
            // Show confetti animation
            setShowConfetti(true);
    
            // Add matched cards to the matchedCards state
            setMatchedCards([...matchedCards, activeCardOne]);
    
            // Reset active cards after a delay
            setTimeout(() => {
                setActiveCardOne(null);
                setActiveCardTwo(null);
            }, 200);
        } else {
            // Reset active cards after a delay
            setTimeout(() => {
                setActiveCardOne(null);
                setActiveCardTwo(null);
            }, 200);
        }
    
        // Check if any player reaches the target score
        if (playerOneScore >= target || playerTwoScore >= target) {
            // Game over
            const winner = playerOneScore >= target ? playerOneName : playerTwoName;
            const secondPlace = playerOneScore >= target ? playerTwoName : playerOneName;
    
            setGameOver(true);
            setWinner(winner);
            setSecondPlace(secondPlace);
        }
    
        // Change the turns after a delay
        setTimeout(() => {
            setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }, 369);
    }
    

    function setCurrentPlayerScore(updateScore) {
        updateScore(prevScore => prevScore + 2);
    }

    function getCardRank(card) {
        return card ? card.split("_")[0] : null;
    }

    function getCardColor(card) {
        return card ? suitColorMapping[card.split("_")[1]] : null;
    }

    return (
        <div className="grid grid-cols-6 gap-4 items-center mx-auto h-fullbg-white  mb-10 flex-1 w-11/12 font-bold">
            {/* Notification for game restarted */}
            {gameRestartedNotification && (
                <div className="bg-green-500 text-white py-2 px-4 rounded-lg absolute top-0 left-0 right-0 text-center">
                    Game Started! Lets Play
                </div>
            )}

            <div>
                <div className="bg-boardBackground rounded-lg text-xl bg-opacity-25 bg-white  ">
                    <img src={firstPlayerIcon} alt="Player 1" className="w-full h-auto p-4" />
                    <p>{playerOneName || "Player 1"}</p>
                    Score: {playerOneScore}
                </div>
                <button className={`font-bold ${currentPlayer === 1 ? 'bg-green-600 text-white' : 'invisible' } my-4 rounded`}>
                    It's Your Turn
                </button>
            </div>
            <div className="relative bg-boardBackground col-span-4 grid grid-cols-9 gap-1 place-items-center rounded-lg bg-opacity-25 bg-white ">
                {deck.map((cardImage, cardIndex) => (
                    <Card
                        key={cardIndex}
                        card={cardImage}
                        selectedCard={selectedCard}
                        isActive={cardImage.name === activeCardOne || cardImage.name === activeCardTwo}
                        isMatched={matchedCards.includes(cardImage.name)}
                        showConfetti={showConfetti}
                    />
                ))}
                <GameConfetti showConfetti={showConfetti} currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} setShowConfetti={setShowConfetti}/>
            </div>
            <div>
                <div className="bg-boardBackground rounded-lg text-xl bg-opacity-25 bg-white ">
                    <img src={secondPlayerIcon} alt="Player 2" className="w-full h-auto p-4" />
                    <p>{playerTwoName || "Player 2"}</p>
                    Score: {playerTwoScore}
                </div>
                <button className={`font-bold ${currentPlayer === 2 ? 'bg-neutral-200 text-blue-500' : 'invisible' } my-4 rounded`}>
                    It's Your Turn
                </button>
            </div>

            {/* Render the GameOverModal component when the game is over */}
            {gameOver && (
                <GameOverModal
                    firstPlace={winner}
                    firstPlaceScore={winner === playerOneName ? playerOneScore : playerTwoScore}
                    secondPlace={secondPlace}
                    secondPlaceScore={secondPlace === playerOneName ? playerOneScore : playerTwoScore}
                    restartGame={restartGame}
                />
            )}
        </div>
    );
}

export default GameBoard;

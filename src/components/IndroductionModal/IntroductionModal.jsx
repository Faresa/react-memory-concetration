import React, { useState } from "react";
import firstPlayerIcon from "../../assets/images/design/player1.svg";
import secondPlayerIcon from "../../assets/images/design/player2.svg";

function IntroductionModal({ gameState, setPlayerNames, shuffleDeck }) {
    const [playerOneName, setPlayerOneName] = useState("");
    const [playerTwoName, setPlayerTwoName] = useState("");

    function beginGame() {
        setPlayerNames(playerOneName, playerTwoName);
        gameState();
        shuffleDeck();
    }
    return (
        <div className="grid grid-cols-4 items-center bg-opacity-50 place-items-center">
            <div className="bg-boardBackground rounded-lg" />
            <div className="w-full max-w-md col-span-2 ">

                <h1 className="text-4xl font-bold mb-4 text-center">
                    Are you ready to play?
                </h1>

                <div className="grid grid-cols-2 gap-16 mb-4 ">
                    <div>
                        <img
                            src={firstPlayerIcon}
                            alt="Player 1"
                            className="w-full h-auto p-4"
                        />
                        <input
                            type="text"
                            placeholder="Name of player 1"
                            className="w-full p-2 rounded text-black"
                            value={playerOneName}
                            onChange={(e) => setPlayerOneName(e.target.value)}
                        />
                    </div>
                    <div>
                        <img
                            src={secondPlayerIcon}
                            alt="Player 2"
                            className="w-full h-auto p-4"
                        />
                        <input
                            type="text"
                            placeholder="Name of player 2"
                            className="w-full p-2 rounded text-black"
                            value={playerTwoName}
                            onChange={(e) => setPlayerTwoName(e.target.value)}
                        />
                    </div>
                </div>

                {/* Button at the center */}
                <div className="flex justify-center">
                    <button
                        type="button"
                        className="bg-green-500 text-white py-2 px-4 rounded"
                        onClick={beginGame}
                    >
                        Lets Start
                    </button>
                </div>
            </div>
            <div className="bg-boardBackground rounded-lg" />
        </div>
    );
}

export default IntroductionModal;

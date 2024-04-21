import React from "react";
import firstPlayerIcon from "../../assets/images/design/player1.svg";
import secondPlayerIcon from "../../assets/images/design/player2.svg";
import winnerImage from "../../assets/images/design/winner_player.svg"; 

function GameOverModal({ firstPlace, firstPlaceScore, secondPlace, secondPlaceScore }) {
    // Function to handle the click event of the "Play Again" button
    const handleRestartGame = () => {
        // Restart the app by reloading the window
        window.location.reload();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: "#489dda" }}>
            <div className="rounded-lg text-center w-full max-w-md">
                <h3 className="font-bold text-white">Well Done!</h3>
                <h2 className="text-5xl font-bold text-white">{firstPlace}</h2>

                {/* Winner image */}
                <div className="flex justify-center items-center mb-4">
                    
                    <img src={winnerImage} alt="Winner" className="mx-auto w-80 h-40" />
                </div>

                {/* Table */}
                <div className="mb-8">
                    {/* First Row */}
                    
                    <div className="flex text-gray-800 bg-yellow-300 rounded-lg p-2 mb-4">
                        
                        <div className="w-1/4">
                            <img src={firstPlayerIcon} alt="First Place" className="mx-auto mb-4 w-12 h-12" />
                        </div>
                  
                        <div className="w-1/4 flex items-center">1st Place</div>
                        <div className="w-1/4 flex items-center">{firstPlace}</div>
                        <div className="w-1/4 flex items-center">Score: {firstPlaceScore}</div>
                    </div>
                    {/* Second Row */}
                    <div className="flex text-gray-800 bg-white rounded-lg p-2">
                        <div className="w-1/4">
                            <img src={secondPlayerIcon} alt="First Place" className="mx-auto mb-4 w-12 h-12" />
                        </div>
                        <div className="w-1/4 flex items-center">2nd Place</div>
                        <div className="w-1/4 flex items-center">{secondPlace}</div>
                        <div className="w-1/4 flex items-center">Score: {secondPlaceScore}</div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button 
                        onClick={handleRestartGame} // Call handleRestartGame function
                        className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 focus:outline-none"
                    >
                        Play Again
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GameOverModal;

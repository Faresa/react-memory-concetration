import React, { useEffect, useState } from "react";
import cardBack from "../../assets/images/design/cardBack.svg";
import { useSpring, a } from "@react-spring/web";

/**
 * Represents a card component.
 * @param {Object} props - The props passed to the Card component.
 * @param {Object} props.card - The card object containing information about the card.
 * @param {Function} props.selectedCard - The function to handle selecting a card.
 * @param {boolean} props.isActive - Indicates if the card is currently active.
 * @param {boolean} props.isMatched - Indicates if the card is matched with another card.
 * @param {boolean} props.showConfetti - Indicates if the confetti animation should be shown.
 * @returns {JSX.Element} - The JSX element representing the Card component.
 */
function Card({ card, selectedCard, isActive, isMatched, showConfetti }) {
    const [flipped, toggleFlipped] = useState(false);

    const cardRank = card.name;

    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 1, tension: 100, friction: 30, duration: 100 },
    });

    const { matchedCardAnimation } = useSpring({
        matchedCardAnimation: flipped ? 1 : 0,
        config: { mass: 1, tension: 100, friction: 30, duration: 100 },
    });

    /**
     * Handles the selection of a card.
     * Toggles the flipped state of the card and calls the selectedCard function.
     */
    function handleSelectedCard() {
        if (flipped) return;
        toggleFlipped((state) => !state);
        selectedCard(cardRank);
    }

    useEffect(() => {
        setTimeout(() => {
            if (!isActive && !isMatched) {
                toggleFlipped((state) => false);
            }
        }, 500);
    }, [isActive, isMatched]);

    /**
     * Handles mouse enter event for the card.
     * Logs the card information to the console.
     */
    function handleMouseEnter() {
        console.log("Card Info:", card);
    }

    return (
        <div className={`${showConfetti ? 'invisible' : 'visible'} p-1 w-4/6 flex`} onClick={handleSelectedCard} onMouseEnter={handleMouseEnter}>
            <a.img
                src={cardBack}
                className="flex-shrink-0 will-change-[transform,opacity]"
                alt=""
                style={{ opacity: opacity.to((o) => 1 - o), transform }}
            />
            <a.img
                src={card.imageSrc}
                className="flex-shrink-0 ml-[-100%] will-change-[transform,opacity]"
                alt=""
                style={
                    isMatched
                        ? { opacity: matchedCardAnimation.to((o) => 1 - o)}
                        : { opacity, transform, rotateX: "180deg" }
                }
            />
        </div>
    );
}

export default Card;

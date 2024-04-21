/**
 * Represents the names of all the cards.
 * @type {string[]}
 */
const cardNames = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2', 'Joker_1', 'Joker_2'];

/**
 * Represents the suits of the cards.
 * @type {string[]}
 */
const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];

/**
 * Represents an array containing all the card objects.
 * @type {Object[]}
 */
const AllCards = [];

// Dynamically import card images
for (const name of cardNames) {
  if (name.startsWith('Joker')) {
    import(`../../assets/images/cards/${name}.svg`).then(imageSrc => {
      AllCards.push({ name, imageSrc: imageSrc.default, isMatched: false });
    });
  } else {
    for (const suit of suits) {
      import(`../../assets/images/cards/${name}_${suit}.svg`).then(imageSrc => {
        AllCards.push({ name: `${name}_${suit}`, imageSrc: imageSrc.default, isMatched: false });
      });
    }
  }
}

export default AllCards;

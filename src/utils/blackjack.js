const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const ranks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

function createDeck() {
  let deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ rank, suit });
    }
  }
  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function getCardString(card) {
  return card.rank + " of " + card.suit;
}

function getHandValue(hand) {
  let value = 0;
  let aceCount = 0;
  for (let card of hand) {
    if (card.rank === "A") {
      aceCount++;
      value += 11;
    } else if (["J", "Q", "K"].includes(card.rank)) {
      value += 10;
    } else {
      value += parseInt(card.rank);
    }
  }
  while (value > 21 && aceCount > 0) {
    value -= 10;
    aceCount--;
  }
  return value;
}

function playBlackjack() {
  const deck = createDeck();
  shuffleDeck(deck);

  const playerHand = [deck.pop(), deck.pop()];
  const dealerHand = [deck.pop(), deck.pop()];

  console.log("Welcome to Blackjack!");
  console.log("Your hand: ", playerHand.map(getCardString).join(", "));
  console.log("Dealer's hand: ", getCardString(dealerHand[0]));

  const playerValue = getHandValue(playerHand);
  if (playerValue === 21) {
    console.log("Blackjack! You win!");
    return;
  }

  readline.question(
    'Type "hit" to take another card, or "stand" to hold your hand: ',
    (answer) => {
      while (answer === "hit") {
        playerHand.push(deck.pop());
        console.log("Your hand: ", playerHand.map(getCardString).join(", "));
        const newValue = getHandValue(playerHand);
        if (newValue > 21) {
          console.log("Bust! You lose.");
          return;
        } else if (newValue === 21) {
          console.log("Blackjack! You win!");
          return;
        }
      }

      const dealerValue = getHandValue(dealerHand);
      while (dealerValue < 17) {
        dealerHand.push(deck.pop());
      }
      console.log("Dealer's hand: ", dealerHand.map(getCardString).join(", "));
      if (dealerValue > 21) {
        console.log("Dealer busts, you win!");
      } else if (dealerValue === playerValue) {
        console.log("Push, it's a tie!");
      } else if (dealerValue < playerValue) {
        console.log("You win!");
      } else {
        console.log("You lose.");
      }
      readline.close();
    }
  );
}

playBlackjack();

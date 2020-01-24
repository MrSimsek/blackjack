const { shuffle } = require("./utils");
const { ranks, suits } = require("./constants");

const createCard = (rank, suit) => ({ rank, suit });

const getCardValue = (card, currentTotal) => {
  if (card.rank == "A" && currentTotal < 11) return 11;
  if (card.rank == "A") return 1;
  if (card.rank == "J" || card.rank == "Q" || card.rank == "K") return 10;

  return parseInt(card.rank);
};

const createDeck = () => new Array();

const fillDeck = deck => {
  suits.forEach(suit =>
    ranks.forEach(rank => deck.push(createCard(rank, suit)))
  );
  return deck;
};

const shuffleDeck = deck => shuffle(deck);

const createPlayer = (name, hand) => ({ name, hand });

const getPlayerScore = player =>
  player.hand.reduce((total, card) => total + getCardValue(card, total), 0);

const hit = (player, deck) => player.hand.push(deck.pop());

const initializeDeck = () => shuffleDeck(fillDeck(createDeck()));

const initializePlayers = (deck, playerName) => {
  const dealer = createPlayer("Dealer", [deck.pop()]);
  const player = createPlayer(playerName, [deck.pop(), deck.pop()]);

  return { dealer, player };
};

const showScores = (p1, p2) => {
  console.log("---------------");
  console.log(p1.name, "score:", getPlayerScore(p1));
  p1.hand.forEach(card => {
    console.log(card);
  });
  console.log("");
  console.log(p2.name, "score:", getPlayerScore(p2));
  p2.hand.forEach(card => {
    console.log(card);
  });
  console.log("---------------");
};

module.exports = {
  createCard,
  initializePlayers,
  initializeDeck,
  getPlayerScore,
  hit,
  showScores
};

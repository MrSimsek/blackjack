const {
  initializeDeck,
  initializePlayers,
  hit,
  getPlayerScore,
  showScores
} = require("./functions");

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const playBlackjack = (playerName, delay) => {
  const deck = initializeDeck();

  const { player, dealer } = initializePlayers(deck, playerName);

  const gameLoop = () =>
    rl.question("Hit or Stand? [h/s] ", answer => {
      if (answer === "h") {
        hit(player, deck);

        showScores(dealer, player);

        if (getPlayerScore(player) > 21) {
          console.log("You lost!");
          return rl.close();
        }

        if (getPlayerScore(player) === 21) {
          console.log("You won!");
          return rl.close();
        }

        gameLoop();
      }

      if (answer === "s") {
        while (true) {
          hit(dealer, deck);

          showScores(dealer, player);

          const playerBlackjack = getPlayerScore(player) == 21;
          const dealerBlackjack = getPlayerScore(dealer) == 21;

          if (dealerBlackjack && !playerBlackjack) {
            console.log("You lost!");
            break;
          }

          if (dealerBlackjack && playerBlackjack) {
            console.log("Draw!");
            break;
          }

          if (getPlayerScore(dealer) > 21 && getPlayerScore(player) <= 21) {
            console.log("You won!");
            break;
          }

          if (
            getPlayerScore(dealer) > getPlayerScore(player) &&
            getPlayerScore(dealer) <= 21 &&
            getPlayerScore(player) < 21
          ) {
            console.log("You lost!");
            break;
          }
        }

        return rl.close();
      }
    });

  let countdown = delay;
  console.log(countdown);
  const countdownInterval = setInterval(() => {
    console.log(--countdown);
  }, 1000);

  setTimeout(() => {
    clearInterval(countdownInterval);
    showScores(dealer, player);
    if (getPlayerScore(player) === 21) {
      console.log("You won!");
    } else {
      gameLoop();
    }
  }, delay * 1000);
};

playBlackjack("Deno", 3);

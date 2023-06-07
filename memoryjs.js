// Start game menu
const numbersBtn = document.querySelector(".numbers");
const iconsBtn = document.querySelector(".icons");
const onePlayerBtn = document.querySelector(".one-player");
const twoPlayersBtn = document.querySelector(".two-players");
const threePlayersBtn = document.querySelector(".three-players");
const fourPlayersBtn = document.querySelector(".four-players");
const grid4Btn = document.querySelector(".grid-4");
const grid6Btn = document.querySelector(".grid-6");
const startGameBtn = document.querySelector(".start-game");
const gameStartScreen = document.querySelector(".game-start");
const gameBoard = document.querySelector(".gameboard");

function startGame(btn1, btn2) {
  btn1.addEventListener("click", () => {
    btn1.classList.add("checked");
    btn2.classList.remove("checked");
  });
}

function numbersOfPlayers(btn1, btn2, btn3, btn4) {
  btn1.addEventListener("click", () => {
    btn1.classList.add("checked");
    btn2.classList.remove("checked");
    btn3.classList.remove("checked");
    btn4.classList.remove("checked");
  });
}

startGame(numbersBtn, iconsBtn);
startGame(iconsBtn, numbersBtn);
numbersOfPlayers(onePlayerBtn, twoPlayersBtn, threePlayersBtn, fourPlayersBtn);
numbersOfPlayers(twoPlayersBtn, onePlayerBtn, threePlayersBtn, fourPlayersBtn);
numbersOfPlayers(threePlayersBtn, onePlayerBtn, twoPlayersBtn, fourPlayersBtn);
numbersOfPlayers(fourPlayersBtn, onePlayerBtn, twoPlayersBtn, threePlayersBtn);
startGame(grid4Btn, grid6Btn);
startGame(grid6Btn, grid4Btn);

startGameBtn.addEventListener("click", () => {
  numbersBtn.classList.contains("checked")
    ? gameBoard.classList.add("numbers")
    : gameBoard.classList.add("icons");

  if (onePlayerBtn.classList.contains("checked")) {
    gameBoard.classList.add("solo");
  } else if (twoPlayersBtn.classList.contains("checked")) {
    gameBoard.classList.add("duo");
  } else if (threePlayersBtn.classList.contains("checked")) {
    gameBoard.classList.add("trio");
  } else {
    gameBoard.classList.add("multiplayer");
  }

  grid4Btn.classList.contains("checked")
    ? gameBoard.classList.add("grid-4")
    : gameBoard.classList.add("grid-6");

  newGame();
  gameStartScreen.classList.add("hidden");
  gameBoard.classList.remove("hidden");
});

function hidePlayerDivs() {
  if (threePlayersBtn.classList.contains("checked")) {
    document.querySelector(".player-four").style.display = "none";
    document.querySelector(".player-three").style.display = "flex";
  } else if (twoPlayersBtn.classList.contains("checked")) {
    document.querySelector(".player-three").style.display = "none";
    document.querySelector(".player-four").style.display = "none";
  } else {
    document.querySelector(".player-three").style.display = "block";
    document.querySelector(".player-four").style.display = "block";
  }
}

twoPlayersBtn.addEventListener("click", hidePlayerDivs);
threePlayersBtn.addEventListener("click", hidePlayerDivs);

// Hide initially based on default selection
hidePlayerDivs();

//Menu mobile in game
const modalMenu = document.querySelector(".modal-menu");
const modalSoloGameOver = document.querySelector(".modal-solo-game-over");
const modalMultiGameOver = document.querySelector(
  ".modal-multiplayer-game-over"
);
const menuBtn = document.querySelector(".menu-btn");
const restartBtn = document.querySelectorAll(".restart");
const newGameBtn = document.querySelectorAll(".new-game");
const resumeGameBtn = document.querySelector("#resume-game");
const gameBody = document.querySelector(".game-cards");

menuBtn.addEventListener("click", () => {
  modalMenu.classList.remove("hidden");
});

restartBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalMenu.classList.add("hidden");
    modalSoloGameOver.classList.add("hidden");
    modalMultiGameOver.classList.add("hidden");
    reset();
    gameBoard.classList.contains("numbers")
      ? generateRandomNumbers()
      : generateRandomIcons();
  });
});

newGameBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalMenu.classList.add("hidden");
    modalSoloGameOver.classList.add("hidden");
    modalMultiGameOver.classList.add("hidden");
    gameStartScreen.classList.remove("hidden");
    gameBoard.classList.add("hidden");
    gameBoard.classList.remove(
      "grid-4",
      "grid-6",
      "numbers",
      "icons",
      "solo",
      "duo",
      "trio",
      "multiplayer"
    );
    reset();
    removeCards();
  });
});

resumeGameBtn.addEventListener("click", () => {
  modalMenu.classList.add("hidden");
});

//Generate cards
function createCards() {
  if (gameBoard.classList.contains("grid-4")) {
    for (let i = 0; i < 4; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      gameBody.appendChild(row);
    }
    const rows = document.querySelectorAll(".row");
    rows.forEach((row) => {
      for (let i = 0; i < 4; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        row.appendChild(card);
      }
    });
  } else if (gameBoard.classList.contains("grid-6")) {
    for (let i = 0; i < 6; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      gameBody.appendChild(row);
    }
    const rows = document.querySelectorAll(".row");
    rows.forEach((row) => {
      for (let i = 0; i < 6; i++) {
        const card = document.createElement("div");
        card.classList.add("card", "grid6");
        row.appendChild(card);
      }
    });
  }
}

function removeCards() {
  const rows = document.querySelectorAll(".row");
  rows.forEach((row) => {
    row.remove();
  });
}

function generateRandomNumbers() {
  const cards = document.querySelectorAll(".card");
  let ArrayOf4Cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  let ArrayOf6Cards = [
    1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12,
    12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18,
  ];

  if (gameBoard.classList.contains("grid-4")) {
    cards.forEach((card) => {
      let randomNumber = Math.floor(Math.random() * ArrayOf4Cards.length);
      const p = document.createElement("p");
      p.textContent = ArrayOf4Cards[randomNumber];
      ArrayOf4Cards.splice(randomNumber, 1);
      card.appendChild(p);
    });
  } else {
    cards.forEach((card) => {
      let randomNumber = Math.floor(Math.random() * ArrayOf6Cards.length);
      const p = document.createElement("p");
      p.textContent = ArrayOf6Cards[randomNumber];
      ArrayOf6Cards.splice(randomNumber, 1);
      card.appendChild(p);
    });
  }
}

function generateRandomIcons() {
  const cards = document.querySelectorAll(".card");
  let ArrayOf4Icons = [
    "car-side",
    "car-side",
    "football",
    "football",
    "moon",
    "moon",
    "star",
    "star",
    "snowflake",
    "snowflake",
    "cloud",
    "cloud",
    "bug",
    "bug",
    "heart",
    "heart",
  ];
  let ArrayOf6Icons = [
    "car-side",
    "car-side",
    "football",
    "football",
    "moon",
    "moon",
    "star",
    "star",
    "snowflake",
    "snowflake",
    "cloud",
    "cloud",
    "bug",
    "bug",
    "heart",
    "heart",
    "gamepad",
    "gamepad",
    "dollar-sign",
    "dollar-sign",
    "yen-sign",
    "yen-sign",
    "bicycle",
    "bicycle",
    "anchor",
    "anchor",
    "hashtag",
    "hashtag",
    "house",
    "house",
    "plane",
    "plane",
    "bell",
    "bell",
    "gift",
    "gift",
  ];

  if (gameBoard.classList.contains("grid-4")) {
    cards.forEach((card) => {
      let randomNumber = Math.floor(Math.random() * ArrayOf4Icons.length);
      const i = document.createElement("i");
      i.classList.add("fa-solid", `fa-${ArrayOf4Icons[randomNumber]}`);
      ArrayOf4Icons.splice(randomNumber, 1);
      card.appendChild(i);
    });
  } else {
    cards.forEach((card) => {
      let randomNumber = Math.floor(Math.random() * ArrayOf6Icons.length);
      const i = document.createElement("i");
      i.classList.add("fa-solid", `fa-${ArrayOf6Icons[randomNumber]}`);
      ArrayOf6Icons.splice(randomNumber, 1);
      card.appendChild(i);
    });
  }
}

//Game logic
const movesPlayed = document.querySelector(".moves-played");
const timeElapsed = document.querySelector(".chrono");
const movesTotal = document.querySelector(".moves-total");
const scoreP1 = document.querySelector(".score-p1");
const scoreP2 = document.querySelector(".score-p2");
const scoreP3 = document.querySelector(".score-p3");
const scoreP4 = document.querySelector(".score-p4");
const movesP1 = document.querySelector(".moves-p1");
const movesP2 = document.querySelector(".moves-p2");
const movesP3 = document.querySelector(".moves-p3");
const movesP4 = document.querySelector(".moves-p4");
let moves = 0;
let flippedCards = [];

function game() {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      launchChrono();
      card.classList.add("flip");
      flippedCards.push(card);
      checkPairs();

      if (!card.classList.contains("matched")) {
        nextPlayer();
        playerTurn(player1Turn, player1, player2, player3, player4);
        playerTurn(player2Turn, player2, player1, player3, player4);
        playerTurn(player3Turn, player3, player1, player2, player4);
        playerTurn(player4Turn, player4, player1, player2, player3);
      }

      if (card.classList.contains("matched")) {
        if (player1Turn) {
          scoreP1.textContent = Number(scoreP1.textContent) + 1;
        } else if (player2Turn) {
          scoreP2.textContent = Number(scoreP2.textContent) + 1;
        } else if (player3Turn) {
          scoreP3.textContent = Number(scoreP3.textContent) + 1;
        } else if (player4Turn) {
          scoreP4.textContent = Number(scoreP4.textContent) + 1;
        }
      }
    });
  });
}

function checkPairs() {
  const NumberOfCardsFlipped = document.querySelectorAll(".flip").length;
  const cardsFlipped = document.querySelectorAll(".flip");
  if (
    gameBoard.classList.contains("numbers") &&
    NumberOfCardsFlipped === 2 &&
    flippedCards[0].children[0].innerHTML ===
      flippedCards[1].children[0].innerHTML
  )
    if (gameBoard.classList.contains("numbers")) {
      cardsFlipped.forEach((card) => {
        card.classList.add("matched");
      });
    }

  if (
    gameBoard.classList.contains("icons") &&
    NumberOfCardsFlipped === 2 &&
    flippedCards[0].children[0].classList[1] ===
      flippedCards[1].children[0].classList[1]
  ) {
    cardsFlipped.forEach((card) => {
      card.classList.add("matched");
    });
  }

  if (NumberOfCardsFlipped >= 2) {
    moves++;
    movesPlayed.textContent = moves;
    cardsFlipped.forEach((card) => {
      setTimeout(() => {
        card.classList.remove("flip");
        flippedCards = [];
      }, 600);
    });
  }
}

let player1Turn = true;
let player2Turn = false;
let player3Turn = false;
let player4Turn = false;
const player1 = document.querySelector(".player-one");
const player2 = document.querySelector(".player-two");
const player3 = document.querySelector(".player-three");
const player4 = document.querySelector(".player-four");

function playerTurn(pTurn, p1, p2, p3, p4) {
  if (pTurn) {
    p1.classList.add("active");
    p2.classList.remove("active");
    p3.classList.remove("active");
    p4.classList.remove("active");
  }
}

function nextPlayer() {
  const cards = document.querySelectorAll(".card");
  const NumberOfCardsFlipped = document.querySelectorAll(".flip").length;

  if (NumberOfCardsFlipped === 2) {
    if (gameBoard.classList.contains("duo")) {
      player1Turn
        ? ((player1Turn = false), (player2Turn = true))
        : ((player1Turn = true), (player2Turn = false));
    } else if (gameBoard.classList.contains("trio")) {
      if (player1Turn) {
        player1Turn = false;
        player2Turn = true;
        player3Turn = false;
        return;
      }
      if (player2Turn) {
        player1Turn = false;
        player2Turn = false;
        player3Turn = true;
        return;
      }
      if (player3Turn) {
        player1Turn = true;
        player2Turn = false;
        player3Turn = false;
        return;
      }
    } else if (gameBoard.classList.contains("multiplayer")) {
      if (player1Turn) {
        player1Turn = false;
        player2Turn = true;
        player3Turn = false;
        player4Turn = false;
        return;
      }
      if (player2Turn) {
        player1Turn = false;
        player2Turn = false;
        player3Turn = true;
        player4Turn = false;
        return;
      }
      if (player3Turn) {
        player1Turn = false;
        player2Turn = false;
        player3Turn = false;
        player4Turn = true;
        return;
      }
      if (player4Turn) {
        player1Turn = true;
        player2Turn = false;
        player3Turn = false;
        player4Turn = false;
        return;
      }
    }
  }
}

const chrono = document.querySelector(".timer");
let interval;
let min = 0;
let sec = 1;
let done = false;

function launchChrono() {
  if (!done) {
    done = true;
    interval = setInterval(function () {
      chrono.innerHTML = `${min}:${sec <= 9 ? "0" + sec : sec}`;
      sec++;
      if (sec === 60) {
        min++;
        sec = 0;
      }
    }, 1000);
  }
}

function stopChrono() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const matchedCards = document.querySelectorAll(".matched").length;
      if (matchedCards === 16 && gameBoard.classList.contains("grid-4")) {
        clearInterval(interval);
        timeElapsed.innerHTML = chrono.innerHTML;
        movesTotal.innerHTML = movesPlayed.innerHTML + " Moves";
        if (gameBoard.classList.contains("solo")) {
          setTimeout(() => {
            modalSoloGameOver.classList.remove("hidden");
          }, 200);
        } else {
          setTimeout(() => {
            updateModalMultiplayer();
            modalMultiGameOver.classList.remove("hidden");
          }, 200);
        }
      } else if (
        matchedCards === 36 &&
        gameBoard.classList.contains("grid-6")
      ) {
        clearInterval(interval);
        timeElapsed.innerHTML = chrono.innerHTML;
        movesTotal.innerHTML = movesPlayed.innerHTML + " Moves";
        if (gameBoard.classList.contains("solo")) {
          setTimeout(() => {
            modalSoloGameOver.classList.remove("hidden");
          }, 200);
        } else {
          setTimeout(() => {
            updateModalMultiplayer();
            modalMultiGameOver.classList.remove("hidden");
          }, 200);
        }
      }
    });
  });
}

const winner = document.querySelector("#winner");
const playerOne = document.querySelector(".player1");
const playerTwo = document.querySelector(".player2");
const playerThree = document.querySelector(".player3");
const playerFour = document.querySelector(".player4");

function updateModalMultiplayer() {
  let scores = [];
  if (!gameBoard.classList.contains("solo")) {
    movesP1.textContent = scoreP1.textContent + " Pairs";
    movesP2.textContent = scoreP2.textContent + " Pairs";
    movesP3.textContent = scoreP3.textContent + " Pairs";
    movesP4.textContent = scoreP4.textContent + " Pairs";
    scores.push(scoreP1.textContent);
    scores.push(scoreP2.textContent);
    scores.push(scoreP3.textContent);
    scores.push(scoreP4.textContent);

    const scoreMax = Math.max(...scores);
    const tieOrNot =
      scores.filter((score) => score == Math.max(...scores)).length > 1
        ? "Tie"
        : "No Tie";
    if (tieOrNot === "Tie") {
      winner.textContent = "it's a tie!";
      if (scoreMax == scoreP1.textContent) {
        playerOne.classList.add("active");
      }
      if (scoreMax == scoreP2.textContent) {
        playerTwo.classList.add("active");
      }
      if (scoreMax == scoreP3.textContent) {
        playerThree.classList.add("active");
      }
      if (scoreMax == scoreP4.textContent) {
        playerFour.classList.add("active");
      }
    } else {
      if (scoreMax == scoreP1.textContent) {
        winner.textContent = "Player 1 Wins!";
        playerOne.classList.add("active");
      } else if (scoreMax == scoreP2.textContent) {
        winner.textContent = "Player 2 Wins!";
        playerTwo.classList.add("active");
      } else if (scoreMax == scoreP3.textContent) {
        winner.textContent = "Player 3 Wins!";
        playerThree.classList.add("active");
      } else if (scoreMax == scoreP4.textContent) {
        winner.textContent = "Player 4 Wins!";
        playerFour.classList.add("active");
      }
    }
  }
}

function reset() {
  const cards = document.querySelectorAll(".card");
  player1Turn = true;
  player2Turn = false;
  player3Turn = false;
  player4Turn = false;
  playerOne.classList.remove("active");
  playerTwo.classList.remove("active");
  playerThree.classList.remove("active");
  playerFour.classList.remove("active");
  scoreP1.textContent = 0;
  scoreP2.textContent = 0;
  scoreP3.textContent = 0;
  scoreP4.textContent = 0;
  playerTurn(player1Turn, player1, player2, player3, player4);
  moves = 0;
  movesPlayed.textContent = moves;
  min = 0;
  sec = 1;
  chrono.innerHTML = `0:00`;
  clearInterval(interval);
  done = false;
  cards.forEach((card) => {
    card.innerHTML = "";
    card.classList.remove("flip");
    card.classList.remove("matched");
  });
}

function newGame() {
  createCards();

  gameBoard.classList.contains("numbers")
    ? generateRandomNumbers()
    : generateRandomIcons();
  game();
  playerTurn();
  stopChrono();
}

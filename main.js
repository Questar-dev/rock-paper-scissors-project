

let score = JSON.parse(localStorage.getItem("score")) || {
  win: 0,
  loose: 0,
  tie: 0,
};

showScore();

function play(yourChoice) {
  let arr = ["rock", "scissors", "paper"];
  let compChoice = arr[Math.ceil(Math.random() * 3) - 1];

  let result;

  const emojies = {
    rock: '<img class="emoji" src="./rock-emoji.png" alt="rock-emoji" />',

    paper:
      '<img class="emoji" src="./paper-emoji.png" alt="paper-emoji" />',

    scissors:
      '<img class="emoji" src="./scissors-emoji.png" alt="scissors-emoji" />',
  };

  // Tie
  if (yourChoice == compChoice) {
    updateScore("tie");
    document.querySelector("#result").innerHTML = "Tie";
    document.querySelector("#status").innerHTML =
      `You ${emojies[yourChoice]}, Computer ${emojies[compChoice]}.`;

    return;
  }

  let rules = {
    rock: ["rock", "scissors"],
    scissors: ["scissors", "paper"],
    paper: ["paper", "rock"],
  };

  yourChoice = [rules[yourChoice]];
  compChoice = [rules[compChoice]];

  if (yourChoice[0][1] == "scissors" && compChoice[0][0] == "scissors") {
    yourChoice.push(true);
    compChoice.push(false);
  } else if (yourChoice[0][1] == "paper" && compChoice[0][0] == "paper") {
    yourChoice.push(true);
    compChoice.push(false);
  } else if (yourChoice[0][1] == "rock" && compChoice[0][0] == "rock") {
    yourChoice.push(true);
    compChoice.push(false);
  } else {
    yourChoice.push(false);
    compChoice.push(true);
  }

  if (yourChoice[1]) {
    updateScore("win");
    document.querySelector("#result").innerHTML = "You win.";
    document.querySelector("#status").innerHTML =
      `You ${emojies[yourChoice[0][0]]}, Computer ${emojies[compChoice[0][0]]}.`;
  } else {
    updateScore("loose");
    document.querySelector("#result").innerHTML = "You lose.";
    document.querySelector("#status").innerHTML =
      `You ${emojies[yourChoice[0][0]]}, Computer ${emojies[compChoice[0][0]]}.`;
  }
}
function updateScore(newStatus) {
  switch (newStatus) {
    case "tie":
      score.tie++;
      break;
    case "win":
      score.win++;
      break;
    case "loose":
      score.loose++;
      break;
    case "reset":
      score.win = 0;
      score.tie = 0;
      score.loose = 0;
  }
  showScore();
  localStorage.setItem("score", JSON.stringify(score));
}
function showScore() {
  document.querySelector("#score").innerHTML =
    `Win: ${score.win}, Loose: ${score.loose}, Tie: ${score.tie}`;
}

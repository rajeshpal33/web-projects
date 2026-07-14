let userScore = 0;
let compScore = 0;
const targetScore = 7;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const modal = document.querySelector("#game-over-modal");
const finalMsg = document.querySelector("#final-msg");
const restartBtn = document.querySelector("#restart-btn");

// Dynamic Audio Setup
const clickSound = new Audio();
const winSound = new Audio();
const loseSound = new Audio();

clickSound.src = "click.wav";
winSound.src = "winning.mp3";
loseSound.src = "lose.wav";

const playAudio = (audioElement, fallbackSrc) => {
  if (audioElement) {
    audioElement.currentTime = 0;
    audioElement.play().catch(() => {
      audioElement.src = fallbackSrc;
      audioElement.play().catch(e => console.log("Audio skipped:", fallbackSrc));
    });
  }
}

const genCompChoice = () => {
  const options = ["rock",
    "paper",
    "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
}

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again";
  msg.style.backgroundColor = "#f59e0b";
}

const checkGameOver = () => {
  if (userScore === targetScore) {
    finalMsg.innerText = "Congratulations! You Won! 🏆🎉";
    finalMsg.style.color = "#22c55e";
    modal.style.display = "flex";
    playAudio(winSound, "win.wav");
  } else if (compScore === targetScore) {
    finalMsg.innerText = "Computer Won the Match! 🤖❌";
    finalMsg.style.color = "#ef4444";
    modal.style.display = "flex";
    playAudio(loseSound, "lose.wav");
  }
}

const showWinner = (userWin, userchoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You Win! Your ${userchoice} beats ${compChoice}`;
    msg.style.backgroundColor = "#22c55e";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost! ${compChoice} beats your ${userchoice}`;
    msg.style.backgroundColor = "#ef4444";
  }
  checkGameOver();
}

const playGame = (userchoice) => {
  if (userScore === targetScore || compScore === targetScore) return;

  playAudio(clickSound, "click.wav");

  const compChoice = genCompChoice();

  if (userchoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userchoice === "rock") {
      userWin = compChoice === "paper" ? false: true;
    } else if (userchoice === "paper") {
      userWin = compChoice === "scissors" ? false: true;
    } else {
      userWin = compChoice === "rock" ? false: true;
    }
    showWinner(userWin, userchoice, compChoice);
  }
}

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userchoice = choice.getAttribute("id");
    playGame(userchoice);
  });
});

restartBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = "0";
  compScorePara.innerText = "0";
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";
  modal.style.display = "none";
});

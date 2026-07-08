const clickSound = new Audio("onclick.wav");

let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newbtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // playerX, playerO
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

const resetGame = () => {
  turnO = true;
  enableboxes();
  msgContainer.classList.add("hide");
  count = 0;
};

boxes.forEach((box) => {

  box.addEventListener("click", () => {

    clickSound.currentTime = 0;
    clickSound.play().catch(err => console.log("Audio not loaded yet"));

    if (turnO) {
      // playerO
      box.innerText = "O";
      turnO = false;
    } else {
      // playerX
      box.innerText = "X";
      turnO = true;
    }

    // isse ek box par dobara click krne se wo change nhi hoga!!
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }

  });

});

// Game end hone ke baad koi button touch na kr paye!!
const disableboxes = () => {

  for (let box of boxes) {
    box.disabled = true;
  }

};

const enableboxes = () => {

  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("winner");
  }

};

const gameDraw = () => {
  msg.innerText = "Match-Draw !!";
  msgContainer.classList.remove("hide");
};


const showWinner = (Winner) => {

  msg.innerText = `Congratulations, Winner is ${Winner}`;
  msgContainer.classList.remove("hide");

  confetti();

  disableboxes();

};

const checkWinner = () => {

  for (let pattern of winPatterns) {

    // console.log(pattern[0], pattern[1], pattern[2]);

    // console.log(
    //   boxes[pattern[0]].innerText,
    //   boxes[pattern[1]].innerText,
    //   boxes[pattern[2]].innerText
    // );

    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {

      if (pos1Val === pos2Val && pos2Val === pos3Val) {

        boxes[pattern[0]].classList.add("winner");
        boxes[pattern[1]].classList.add("winner");
        boxes[pattern[2]].classList.add("winner");

        showWinner(pos1Val);

        return true;
      }
    }
  }

};

newbtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);

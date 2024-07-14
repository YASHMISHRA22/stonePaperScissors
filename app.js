let userScore = 0;
let compScore = 0;
let userWin = null;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#commentry");

const userScorePara = document.querySelector("#userScore");
const compScorePara = document.querySelector("#compScore");

const undo = document.querySelector("#undo");
const reset = document.querySelector("#reset");
const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
    msg.style.color = "white";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const playGame = (userChoice) => {
  //Generate computer choice
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    //Draw Game
    drawGame();
  } else {
    userWin = true;
    if (userChoice === "rock") {
      //scissors, paper
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      //rock, scissors
      userWin = compChoice === "scissors" ? false : true;
    } else {
      //rock, paper
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
const resetGame = () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
};
document.querySelector("#reset").addEventListener("click", resetGame);
 
const undoGame = () => {
  if(userWin===true && userScore>=0 ){
    userScore--;
  } else if(userWin===false  && compScore>=0) {
    compScore--;
  };
  if(userScore>=0){
    userScorePara.innerHTML=userScore;
  }
  if(compScore>=0){
    compScorePara.innerHTML=compScore;
  }
  userWin=null;
  
};
document.querySelector("#undo").addEventListener("click",undoGame);

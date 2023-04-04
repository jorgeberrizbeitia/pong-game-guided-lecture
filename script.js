// *** Global Variables ***

const gameScreen = document.querySelector("#game-screen");
const ball = document.querySelector("#ball");
const paddle = document.querySelector("#paddle");

// starting values (assigned here instead of .css so they can be easily accesible on first DOM manipulation)
let ballX = 10;
let ballY = 10;
let wallWidth = 600 // same as css (offsetWidth could work too)
let wallHeight = 800 // same as css (offsetHeight could work too)
let isBallGoingDown = true;
let isBallGoingRight = true;

let paddleX = 200;
let paddleY = 700;

let isGameGoing = true;

// *** Functions ***

function ballMovement() {
  // ballX++;
  // ballY++;

  if (isBallGoingRight === true) {
    ballX += 3;
  } else {
    ballX -= 3;
  }

  if (isBallGoingDown === true) {
    ballY += 3;
  } else {
    ballY -= 3;
  }
}

function ballUpdates() {
  ball.style.top = `${ballY}px`;
  ball.style.left = `${ballX}px`;
}

function ballWallCollision() {
  if (ballX > wallWidth) {
    console.log("collision right side");
    isBallGoingRight = false;
  } else if (ballY > wallHeight) {
    console.log("collision bottom side");
    // isBallGoingDown = false;
    isGameGoing = false;
  } else if (ballX < 0) {
    console.log("collision left side");
    isBallGoingRight = true;
  } else if (ballY < 0) {
    console.log("collision top side");
    isBallGoingDown = true;
  }
}

function paddleUpdates() {
  paddle.style.left = `${paddleX}px`;
}

function ballPaddleCollision() {
  if (ballY > paddleY && ballX > paddleX && ballX < paddleX + 200) {
    console.log("ball collided with paddle");
    isBallGoingDown = false;
  }
}

function gameOver() {
  console.log("game is over! :(")
  alert("Game Over") // example of finishing the game
}

//*** game loop function with recursion effect ***

function gameLoop() {
  // console.log("game running")

  // 1. Here is where Element positions are changed
  // ballY++
  // ballX++
  ballMovement();
  ballWallCollision();
  ballPaddleCollision();

  // 2. Here is where Element positions are updated
  // ball.style.top = `${ballY}px`
  // ball.style.left = `${ballX}px`
  ballUpdates();
  paddleUpdates();

  // 3. Here is where recursion happends
  if (isGameGoing === true) {
    // if above doesn't happen, the recursion effect will end...
    requestAnimationFrame(gameLoop);
  } else {
    // ... and instead, execute a fina function to trigger game over
    gameOver()
  }
}

// *** Event Listeners ***

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    paddleX += 40;
  } else if (event.key === "ArrowLeft") {
    paddleX -= 40;
  }
});

gameLoop(); // start game on first load

